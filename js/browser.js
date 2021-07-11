import { fireEvent } from "card-tools/src/event";

export const BrowserModBrowserMixin = (C) =>
  class extends C {
    constructor() {
      super();
      document.addEventListener("visibilitychange", () => this.sensor_update());
      window.addEventListener("location-changed", () => this.sensor_update());

      window.setInterval(() => this.sensor_update(), 10000);
    }

    sensor_update() {
      const update = async () => {
        const battery = navigator.getBattery
          ? await navigator.getBattery()
          : undefined;
        this.sendUpdate({
          browser: {
            path: window.location.pathname,
            visibility: document.visibilityState,
            userAgent: navigator.userAgent,
            currentUser: this._hass && this._hass.user && this._hass.user.name,
            fullyKiosk: this.isFully,
            width: window.innerWidth,
            height: window.innerHeight,
            battery_level: this.isFully
              ? window.fully.getBatteryLevel()
              : battery
              ? battery.level * 100
              : undefined,
            charging: this.isFully
              ? window.fully.isPlugged()
              : battery
              ? battery.charging
              : undefined,
            darkMode:
              this._hass && this._hass.themes && this._hass.themes.darkMode,
            userData: this._hass && this._hass.user,
            config: this.config,
          },
        });
      };
      update();
    }

    do_navigate(path) {
      if (!path) return;
      history.pushState(null, "", path);
      fireEvent(
        "location-changed",
        {},
        document.querySelector("home-assistant")
      );
    }
  };
