export const ScreenSaverMixin = (SuperClass) => {
  class ScreenSaverMixinClass extends SuperClass {

    private _panel;
    private _listeners = {};
    private _brightness = 255;

    constructor() {
      super();

      const panel = this._panel = document.createElement("div")
      panel.setAttribute("browser-mod", "");
      panel.attachShadow({ mode: "open" });
      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
        :host {
          background: rgba(0,0,0, var(--darkness));
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          display: block;
          pointer-events: none;
        }
        :host([dark]) {
          background: rgba(0,0,0,1);
        }
      `
      panel.shadowRoot.appendChild(styleEl);
      document.body.appendChild(panel);

      this.addEventListener("command-screen_off", () => this._screen_off());
      this.addEventListener("command-screen_on", (ev) => this._screen_on(ev));

      this.connectionPromise.then(() => this._screen_on());
    }

    private _screen_off() {
      this._panel.setAttribute("dark", "");

      this.sendUpdate({
        screen_on: false,
        screen_brightness: 0,
      });

      const l = () => this._screen_on();
      for (const ev of ["pointerdown", "pointermove", "keydown"]) {
        this._listeners[ev] = l;
        window.addEventListener(ev, l);
      }
    }

    private _screen_on(ev=undefined) {
      if (ev?.detail?.brightness) {
        this._brightness = ev.detail.brightness;
        this._panel.style.setProperty("--darkness", 1-ev.detail.brightness/255)
      }
      this._panel.removeAttribute("dark");
      this.sendUpdate({
        screen_on: true,
        screen_brightness: this._brightness,
      });

      for (const ev of ["pointerdown", "pointermove", "keydown"]) {
        if (this._listeners[ev]) {
          window.removeEventListener(ev, this._listeners[ev])
          this._listeners[ev] = undefined;
        }
      }
    }

  }
  return ScreenSaverMixinClass
}

export const BrowserModScreensaverMixin = (C) =>
  class extends C {
    constructor() {
      super();
      this._blackout_panel = document.createElement("div");

      this._screenSaver = undefined;
      this._screenSaverTimer = undefined;
      this._screenSaverTimeOut = 0;

      this._screenSaver = {
        fn: undefined,
        clearfn: undefined,
        timer: undefined,
        timeout: undefined,
        listeners: {},
        active: false,
      };

      this._blackout_panel.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            background: black;
            display: none;
        `;
      document.body.appendChild(this._blackout_panel);
    }

    screensaver_set(fn, clearfn, time) {
      this._ss_clear();
      this._screenSaver = {
        fn,
        clearfn,
        timer: undefined,
        timeout: time,
        listeners: {},
        active: false,
      };
      const l = () => this.screensaver_update();
      for (const event of ["mousemove", "mousedown", "keydown", "touchstart"]) {
        window.addEventListener(event, l);
        this._screenSaver.listeners[event] = l;
      }
      this._screenSaver.timer = window.setTimeout(
        () => this._ss_run(),
        time * 1000
      );
    }

    screensaver_update() {
      if (this._screenSaver.active) {
        this.screensaver_stop();
      } else {
        window.clearTimeout(this._screenSaver.timer);
        this._screenSaver.timer = window.setTimeout(
          () => this._ss_run(),
          this._screenSaver.timeout * 1000
        );
      }
    }

    screensaver_stop() {
      this._ss_clear();
      this._screenSaver.active = false;
      if (this._screenSaver.clearfn) this._screenSaver.clearfn();
      if (this._screenSaver.timeout) {
        this.screensaver_set(
          this._screenSaver.fn,
          this._screenSaver.clearfn,
          this._screenSaver.timeout
        );
      }
    }

    _ss_clear() {
      window.clearTimeout(this._screenSaverTimer);
      for (const [k, v] of Object.entries(this._screenSaver.listeners)) {
        window.removeEventListener(k as any, v as any);
      }
    }

    _ss_run() {
      this._screenSaver.active = true;
      this._screenSaver.fn();
    }

    do_blackout(timeout) {
      this.screensaver_set(
        () => {
          if (this.isFully) {
            if (this.config.screensaver) window.fully.startScreensaver();
            else window.fully.turnScreenOff(true);
          } else {
            this._blackout_panel.style.display = "block";
          }
          this.screen_update();
        },
        () => {
          if ((this._blackout_panel.style.display = "block"))
            this._blackout_panel.style.display = "none";
          if (this.isFully) {
            if (!window.fully.getScreenOn()) window.fully.turnScreenOn();
            window.fully.stopScreensaver();
          }
          this.screen_update();
        },
        timeout || 0
      );
    }

    no_blackout() {
      if (this.isFully) {
        window.fully.turnScreenOn();
        window.fully.stopScreensaver();
      }
      this.screensaver_stop();
    }

    screen_update() {
      this.sendUpdate({
        screen: {
          blackout: this.isFully
            ? this.fully_screensaver !== undefined
              ? this.fully_screensaver
              : !window.fully.getScreenOn()
            : Boolean(this._blackout_panel.style.display === "block"),
          brightness: this.isFully
            ? window.fully.getScreenBrightness()
            : undefined,
        },
      });
    }
  };
