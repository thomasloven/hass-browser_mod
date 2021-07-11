export const FullyKioskMixin = (C) =>
  class extends C {
    get isFully() {
      return window.fully !== undefined;
    }

    constructor() {
      super();

      if (!this.isFully) return;

      this._fullyMotion = false;
      this._motionTimeout = undefined;

      for (const ev of [
        "screenOn",
        "screenOff",
        "pluggedAC",
        "pluggedUSB",
        "onBatteryLevelChanged",
        "unplugged",
        "networkReconnect",
        "onMotion",
      ]) {
        window.fully.bind(ev, `window.browser_mod.fully_update("${ev}");`);
      }

      window.fully.bind(
        "onScreensaverStart",
        `window.browser_mod.fully_screensaver = true; window.browser_mod.screen_update();`
      );
      window.fully.bind(
        "onScreensaverStop",
        `window.browser_mod.fully_screensaver = false; window.browser_mod.screen_update();`
      );

      this._keepingAlive = false;
    }

    fully_update(event) {
      if (!this.isFully) return;
      if (event === "screenOn") {
        window.clearTimeout(this._keepAliveTimer);
        if (!this._keepingAlive) this.screen_update();
      } else if (event === "screenOff") {
        this.screen_update();
        this._keepingAlive = false;
        if (this.config.force_stay_awake) {
          this._keepAliveTimer = window.setTimeout(() => {
            this._keepingAlive = true;
            window.fully.turnScreenOn();
            window.fully.turnScreenOff();
          }, 270000);
        }
      } else if (event === "onMotion") {
        this.fullyMotionTriggered();
      }

      this.sendUpdate({
        fully: {
          battery: window.fully.getBatteryLevel(),
          charging: window.fully.isPlugged(),
          motion: this._fullyMotion,
          ip: window.fully.getIp4Address(),
        },
      });
    }

    startCamera() {
      if (this._fullyCameraTimer !== undefined) return;
      this._fullyCameraTimer = window.setInterval(() => {
        this.sendUpdate({
          camera: window.fully.getCamshotJpgBase64(),
        });
      }, 200);
    }
    stopCamera() {
      window.clearInterval(this._fullyCameraTimer);
      this._fullyCameraTimer = undefined;
    }

    fullyMotionTriggered() {
      if (this._keepingAlive) return;
      this._fullyMotion = true;
      this.startCamera();
      clearTimeout(this._motionTimeout);
      this._motionTimeout = setTimeout(() => {
        this._fullyMotion = false;
        this.stopCamera();
        this.fully_update();
      }, 5000);
      this.fully_update();
    }
  };
