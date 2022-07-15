export const FullyMixin = (C) => {
  return class FullyMixinClass extends C {
    private _fully_screensaver = false;

    get fully() {
      return window.fully !== undefined;
    }

    constructor() {
      super();

      if (!this.fully) return;

      for (const ev of [
        "screenOn",
        "screenOff",
        "pluggedAC",
        "pluggedUSB",
        "onBatteryLevelChanged",
        "unplugged",
        "networkReconnect",
        "onMotion",
        "onDaydreamStart",
        "onDaydreamStop",
      ]) {
        window.fully.bind(ev, `window.browser_mod.fullyEvent("${ev}");`);
      }

      window.fully.bind(
        "onScreensaverStart",
        `window.browser_mod._fully_screensaver = true; window.browser_mod.fullyEvent();`
      );
      window.fully.bind(
        "onScreensaverStop",
        `window.browser_mod._fully_screensaver = false; window.browser_mod.fullyEvent();`
      );

      return;
    }

    get fully_screen() {
      return this._fully_screensaver === false && window.fully?.getScreenOn();
    }
    set fully_screen(state) {
      if (state) {
        window.fully?.turnScreenOn();
        window.fully?.stopScreensaver();
      } else {
        window.fully?.turnScreenOff();
      }
    }

    get fully_brightness() {
      return window.fully?.getScreenBrightness();
    }
    set fully_brightness(br) {
      window.fully?.setScreenBrightness(br);
    }

    get fully_camera() {
      return window.fully?.getCamshotJpgBase64();
    }

    fullyEvent(event = undefined) {
      this.fireEvent("fully-update", { event });
    }
  };
};
