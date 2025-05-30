const SCREEN_STATE_ID = "browser_mod-screen_state";
export const ScreenSaverMixin = (SuperClass) => {
  class ScreenSaverMixinClass extends SuperClass {
    private _panel;
    private _listeners = {};
    private _brightness = 255;
    private _screen_state;

    constructor() {
      super();

      const panel = (this._panel = document.createElement("div"));
      document.body.append(panel);
      panel.classList.add("browser-mod-blackout");
      panel.attachShadow({ mode: "open" });

      const styleEl = document.createElement("style");
      panel.shadowRoot.append(styleEl);
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
      `;

      this.addEventListener("command-screen_off", () => this._screen_off());
      this.addEventListener("command-screen_on", (ev) => this._screen_on(ev));

      this.addEventListener("fully-update", () => this.send_screen_status());
      this.addEventListener("browser-mod-disconnected", () => this._screen_save_state());
      this.addEventListener("browser-mod-ready", () => this._screen_restore_state());
    }

    send_screen_status() {
      this._screen_state = !this._panel.hasAttribute("dark");
      let screen_brightness = this._brightness;
      if (this.fully) {
        this._screen_state = this.fully_screen;
        screen_brightness = this.fully_brightness;
      }

      this.sendUpdate({ screen_on: this._screen_state, screen_brightness });
    }

    private _screen_save_state() {
      if (this.settings.saveScreenState) {
        let storedScreenState = {
          screen_on: this._screen_state,
          screen_brightness: this._brightness,
        };
        localStorage.setItem(
          SCREEN_STATE_ID,
          JSON.stringify(storedScreenState)
        );
      }
    }

    private _screen_restore_state() {
      if (this.settings.saveScreenState) {
        const storedScreenState = localStorage.getItem(SCREEN_STATE_ID);
        if (storedScreenState) {
          const { screen_on, screen_brightness } = JSON.parse(storedScreenState);
          this._screen_state = screen_on;
          this._brightness = screen_brightness;
          if (this._screen_state) {
            this._screen_on({ detail: { brightness: this._brightness } });
          } else {
            this._screen_off();
          }
        } else {
          this._screen_on();
        }
      } else {
        this._screen_on();
      }
    }

    private _screen_off() {
      if (this.fully) {
        this.fully_screen = false;
      } else {
        this._panel.setAttribute("dark", "");
      }
      this.send_screen_status();

      const l = () => this._screen_on();
      for (const ev of ["pointerdown", "pointermove", "keydown"]) {
        this._listeners[ev] = l;
        window.addEventListener(ev, l);
      }
    }

    private _screen_on(ev = undefined) {
      if (this.fully) {
        this.fully_screen = true;
        if (ev?.detail?.brightness) {
          this.fully_brightness = ev.detail.brightness;
        }
      } else {
        if (ev?.detail?.brightness) {
          this._brightness = ev.detail.brightness;
          this._panel.style.setProperty(
            "--darkness",
            1 - ev.detail.brightness / 255
          );
        }
        this._panel.removeAttribute("dark");
      }
      this.send_screen_status();

      for (const ev of ["pointerdown", "pointermove", "keydown"]) {
        if (this._listeners[ev]) {
          window.removeEventListener(ev, this._listeners[ev]);
          this._listeners[ev] = undefined;
        }
      }
    }
  }
  return ScreenSaverMixinClass;
};
