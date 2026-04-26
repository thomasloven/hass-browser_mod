const GO2RTC_WHIP_PATH = "api/webrtc";

export const Go2rtcMixin = (SuperClass) => {
  return class Go2rtcMixinClass extends SuperClass {
    private _go2rtcPeerConnection?: RTCPeerConnection;
    private _go2rtcStream?: MediaStream;
    private _go2rtcResourceUrl?: string;
    private _go2rtcBaseUrl?: string;
    private _go2rtcPublishKey?: string;
    private _go2rtcStartToken = 0;
    private _go2rtcReconnectTimer?: number;
    public go2rtcError;
    public go2rtcState;

    constructor() {
      super();
      this.go2rtcError = undefined;
      this.go2rtcState = "stopped";

      this.addEventListener("browser-mod-user-ready", () =>
        this._go2rtc_update()
      );
      this.addEventListener("browser-mod-config-update", () =>
        this._go2rtc_update()
      );
      window.addEventListener("beforeunload", () => {
        this._go2rtc_stop(false);
      });
    }

    private get _go2rtc_configured_base_url() {
      const value = this.settings?.go2rtcBaseUrl;
      if (typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    }

    private _go2rtc_endpoint(baseUrl: string) {
      const url = new URL(baseUrl, window.location.origin);
      const path = url.pathname.replace(/\/+$/, "");

      if (!path.endsWith(`/${GO2RTC_WHIP_PATH}`)) {
        url.pathname = `${path}/${GO2RTC_WHIP_PATH}`.replace(/\/+/g, "/");
      }

      url.searchParams.set("dst", this.browserID);
      return url;
    }

    private _go2rtc_publish_key(baseUrl: string) {
      return [
        baseUrl,
        this.browserID,
        this.settings?.cameraResolution ?? "",
      ].join("\n");
    }

    private _go2rtc_video_constraints(): MediaTrackConstraints | boolean {
      if (!this.settings?.cameraResolution) return true;

      const resMatch = this.settings.cameraResolution.match(/(\d+)\s*x\s*(\d+)/i);
      if (!resMatch) return true;

      return {
        width: { ideal: parseInt(resMatch[1], 10) },
        height: { ideal: parseInt(resMatch[2], 10) },
      };
    }

    private async _go2rtc_wait_for_ice(pc: RTCPeerConnection) {
      if (pc.iceGatheringState === "complete") return;

      await Promise.race([
        new Promise<void>((resolve) => {
          const done = () => {
            if (pc.iceGatheringState !== "complete") return;
            pc.removeEventListener("icegatheringstatechange", done);
            resolve();
          };
          pc.addEventListener("icegatheringstatechange", done);
        }),
        new Promise<void>((resolve) => window.setTimeout(resolve, 5000)),
      ]);
    }

    private _go2rtc_schedule_reconnect(baseUrl: string, publishKey: string) {
      window.clearTimeout(this._go2rtcReconnectTimer);
      this._go2rtcReconnectTimer = window.setTimeout(() => {
        if (
          this._go2rtc_configured_base_url === baseUrl &&
          this._go2rtc_publish_key(baseUrl) === publishKey
        ) {
          this._go2rtc_restart(baseUrl, publishKey);
        }
      }, 5000);
    }

    private async _go2rtc_update() {
      await this.connectionPromise;

      const baseUrl = this._go2rtc_configured_base_url;
      if (!baseUrl || !this.registered || !this.cameraEnabled) {
        this._go2rtc_stop();
        return;
      }

      const publishKey = this._go2rtc_publish_key(baseUrl);
      if (
        this._go2rtcPublishKey === publishKey &&
        (this._go2rtcPeerConnection ||
          this.go2rtcState === "starting" ||
          this.go2rtcState === "error")
      ) {
        return;
      }

      await this._go2rtc_restart(baseUrl, publishKey);
    }

    private async _go2rtc_restart(baseUrl: string, publishKey: string) {
      this._go2rtc_stop(false);
      await this._go2rtc_start(baseUrl, publishKey);
    }

    private async _go2rtc_start(baseUrl: string, publishKey: string) {
      const token = ++this._go2rtcStartToken;
      const endpoint = this._go2rtc_endpoint(baseUrl);
      const pc = new RTCPeerConnection();
      let stream: MediaStream | undefined;

      this._go2rtcBaseUrl = baseUrl;
      this._go2rtcPublishKey = publishKey;
      this.go2rtcState = "starting";
      this.go2rtcError = undefined;
      this.fireBrowserEvent("browser-mod-config-update");

      pc.addEventListener("connectionstatechange", () => {
        this.go2rtcState = pc.connectionState;
        this.fireBrowserEvent("browser-mod-config-update");

        if (["failed", "disconnected"].includes(pc.connectionState)) {
          this._go2rtc_schedule_reconnect(baseUrl, publishKey);
        }
      });

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Browser does not support mediaDevices.getUserMedia");
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: this._go2rtc_video_constraints(),
          audio: false,
        });

        for (const track of stream.getTracks()) {
          pc.addTrack(track, stream);
        }

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await this._go2rtc_wait_for_ice(pc);

        if (!pc.localDescription?.sdp) {
          throw new Error("No local SDP available");
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/sdp",
          },
          body: pc.localDescription.sdp,
        });

        if (!response.ok) {
          throw new Error(
            `go2rtc WHIP publish failed: ${response.status} ${await response.text()}`
          );
        }

        const answer = await response.text();
        await pc.setRemoteDescription({ type: "answer", sdp: answer });

        if (token !== this._go2rtcStartToken) {
          pc.close();
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        this._go2rtcPeerConnection = pc;
        this._go2rtcStream = stream;
        const resourceUrl = response.headers.get("Location");
        this._go2rtcResourceUrl = resourceUrl
          ? new URL(resourceUrl, endpoint).toString()
          : undefined;
        this.go2rtcState = "connected";
        this.fireBrowserEvent("browser-mod-config-update");
      } catch (err) {
        pc.close();
        stream?.getTracks().forEach((track) => track.stop());

        if (token !== this._go2rtcStartToken) return;

        this.go2rtcState = "error";
        this.go2rtcError = err;
        this.fireBrowserEvent("browser-mod-config-update");
        console.warn("Browser Mod: go2rtc publish failed", err);
        this._go2rtc_schedule_reconnect(baseUrl, publishKey);
      }
    }

    private _go2rtc_stop(notify = true) {
      window.clearTimeout(this._go2rtcReconnectTimer);
      this._go2rtcStartToken += 1;

      if (this._go2rtcResourceUrl) {
        fetch(this._go2rtcResourceUrl, { method: "DELETE" }).catch(() => {});
      }

      this._go2rtcPeerConnection?.close();
      this._go2rtcStream?.getTracks().forEach((track) => track.stop());

      this._go2rtcPeerConnection = undefined;
      this._go2rtcStream = undefined;
      this._go2rtcResourceUrl = undefined;
      this._go2rtcBaseUrl = undefined;
      this._go2rtcPublishKey = undefined;

      if (notify && this.go2rtcState !== "stopped") {
        this.go2rtcState = "stopped";
        this.fireBrowserEvent("browser-mod-config-update");
      }
    }
  };
};
