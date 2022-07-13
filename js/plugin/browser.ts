import { fireEvent } from "card-tools/src/event";
import { ha_element } from "card-tools/src/hass";

export const BrowserModBrowserMixin = (C) =>
  class extends C {
    constructor() {
      super();
      document.addEventListener("visibilitychange", () => this.sensor_update());
      window.addEventListener("location-changed", () => this.sensor_update());

      this.addEventListener("browser-mod-connected", () =>
        this.sensor_update()
      );
      // window.setInterval(() => this.sensor_update(), 10000);
    }

    sensor_update() {
      const update = async () => {
        const battery = (<any>navigator).getBattery?.();
        this.sendUpdate({
          browser: {
            path: window.location.pathname,
            visibility: document.visibilityState,
            userAgent: navigator.userAgent,
            currentUser: this.hass?.user?.name,
            fullyKiosk: this.isFully,
            width: window.innerWidth,
            height: window.innerHeight,
            battery_level:
              window.fully?.getBatteryLevel() ?? battery?.level * 100,
            charging: window.fully?.isPlugged() ?? battery?.charging,
            darkMode: this.hass?.themes?.darkMode,
            userData: this.hass?.user,
            // config: this.config,
          },
        });
      };
      update();
    }

    do_navigate(path) {
      if (!path) return;
      history.pushState(null, "", path);
      fireEvent("location-changed", {}, ha_element());
    }
  };
