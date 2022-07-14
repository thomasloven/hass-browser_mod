import { fireEvent } from "card-tools/src/event";
import { ha_element } from "card-tools/src/hass";

export const BrowserStateMixin = (SuperClass) => {
  return class BrowserStateMixinClass extends SuperClass {
    constructor() {
      super();
      document.addEventListener("visibilitychange", () =>
        this._browser_state_update()
      );
      window.addEventListener("location-changed", () =>
        this._browser_state_update()
      );

      this.connectionPromise.then(() => this._browser_state_update());
    }

    _browser_state_update() {
      const update = async () => {
        const battery = (<any>navigator).getBattery?.();
        this.sendUpdate({
          browser: {
            path: window.location.pathname,
            visibility: document.visibilityState,
            userAgent: navigator.userAgent,
            currentUser: this.hass?.user?.name,
            fullyKiosk: this.isFully || false,
            width: window.innerWidth,
            height: window.innerHeight,
            battery_level:
              window.fully?.getBatteryLevel() ?? battery?.level * 100,
            charging: window.fully?.isPlugged() ?? battery?.charging,
            darkMode: this.hass?.themes?.darkMode,
            userData: this.hass?.user,
            ip_address: window.fully?.getIp4Address(),
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
};
