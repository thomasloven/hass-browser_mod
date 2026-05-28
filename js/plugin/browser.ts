import { debounce, hass_base_el } from "../helpers";

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

      window.addEventListener("popstate", () =>
        // Use setTimeout as recommended by https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
        setTimeout(() => {
          this._browser_state_update()
        },0)
      );

      this.addEventListener("fully-update", () => this._browser_state_update());
      this.addEventListener("browser-mod-ready", () =>
        this._browser_state_update()
      );
      this.addEventListener("browser-mod-user-ready", () =>
        this._browser_state_update()
      );

      this.connectionPromise.then(() => this._browser_state_update());

      window.addEventListener(
        'resize',
        debounce(function(this: BrowserStateMixinClass) {
          this._browser_state_update()
        }.bind(this), 500)
      );
    }

    _browser_state_update() {
      const update = async () => {
        const battery = (<any>navigator).getBattery
          ? await (<any>navigator).getBattery()
          : undefined;
        this.sendUpdate({
          browser: {
            path: window.location.pathname,
            visibility: document.visibilityState,
            userAgent: navigator.userAgent,
            currentUser: this.user?.name,
            fullyKiosk: this.fully || false,
            width: window.innerWidth,
            height: window.innerHeight,
            battery_level:
              window.fully?.getBatteryLevel() ?? battery?.level * 100,
            charging: window.fully?.isPlugged() ?? battery?.charging,
            darkMode: this.hass?.themes?.darkMode,

            userData: this.user,
            ip_address: window.fully?.getIp4Address(),
            fully_data: this.fully_data,
          },
        });
      };
      update();
    }

    async browser_navigate(navigation_path) {
      if (!navigation_path) return;
      const hassBaseEl = await hass_base_el();
      const action = { action: "navigate", navigation_path };
      hassBaseEl.dispatchEvent(new CustomEvent("hass-action", { detail: { config: {tap_action: action}, action: "tap" } }));
    }
  };
};
