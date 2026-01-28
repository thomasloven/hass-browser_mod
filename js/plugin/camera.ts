export const CameraMixin = (SuperClass) => {
  return class CameraMixinClass extends SuperClass {
    private _cameraVideo;
    private _canvas;
    private _framerate;
    public cameraError;

    // TODO: Enable WebRTC?
    // https://levelup.gitconnected.com/establishing-the-webrtc-connection-videochat-with-javascript-step-3-48d4ae0e9ea4

    constructor() {
      super();
      this._framerate = 2;
      this.cameraError = false;

      // Wait for user settings to be ready before accessing this.settings
      this.addEventListener("browser-mod-user-ready", () => {
        this._setup_camera();
      }, { once: true });
    }

    async _setup_camera() {
      if (this._cameraVideo) return;
      await this.connectionPromise;
      await this.videoInteraction;
      if (!this.cameraEnabled) return;
      if (this.fully) return this.update_camera();

      const div = document.createElement("div");
      document.body.append(div);
      div.classList.add("browser-mod-camera");
      div.attachShadow({ mode: "open" });

      const styleEl = document.createElement("style");
      div.shadowRoot.append(styleEl);
      styleEl.innerHTML = `
      :host {
        display: none;
      }`;

      const video = (this._cameraVideo = document.createElement("video"));
      div.shadowRoot.append(video);
      video.autoplay = true;
      video.playsInline = true;
      video.style.display = "none";

      const canvas = (this._canvas = document.createElement("canvas"));
      div.shadowRoot.append(canvas);
      canvas.style.display = "none";

      if (!navigator.mediaDevices) {
        this.cameraError = true;
        this.fireBrowserEvent("browser-mod-config-update");
        return;
      }

      try {
        // Parse camera resolution from settings
        let videoConstraints: MediaTrackConstraints | boolean = true;
        if (this.settings?.cameraResolution) {
          const resMatch = this.settings.cameraResolution.match(/(\d+)\s*x\s*(\d+)/i);
          if (resMatch) {
            const width = parseInt(resMatch[1], 10);
            const height = parseInt(resMatch[2], 10);
            videoConstraints = {
              width: { ideal: width },
              height: { ideal: height }
            };
          }
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false,
        });

        video.srcObject = stream;
        video.play();
        this.update_camera();
      } catch (e) {
        if (e.name !== "NotAllowedError") throw e;
        else {
          this.cameraError = true;
          this.fireBrowserEvent("browser-mod-config-update");
        }
      }
    }

    async update_camera() {
      if (!this.cameraEnabled) {
        const stream = this._cameraVideo?.srcObject;
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
          this._cameraVideo.srcObject = undefined;
        }
        return;
      }
      if (this.fully) {
        this.sendUpdate({
          camera: this.fully_camera,
        });
      } else if (this._cameraVideo?.videoWidth) {
        const video = this._cameraVideo;
        const width = video.videoWidth;
        const height = video.videoHeight;
        this._canvas.width = width;
        this._canvas.height = height;
        const context = this._canvas.getContext("2d");
        context.drawImage(video, 0, 0, width, height);

        this.sendUpdate({
          camera: this._canvas.toDataURL("image/jpeg"),
        });
      }

      const interval = Math.round(1000 / this._framerate);
      setTimeout(() => this.update_camera(), interval);
    }
  };
};
