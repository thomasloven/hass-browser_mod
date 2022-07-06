import { fireEvent } from "card-tools/src/event";
import { load_lovelace, lovelace } from "card-tools/src/hass";

export const BrowserModBrowserMixin = (C) =>
  class extends C {
    constructor() {
      super();

      const isCast = document.querySelector("hc-main") !== null;
      if (!isCast) load_lovelace();

      document.addEventListener("visibilitychange", () => this.sensor_update());
      window.addEventListener("location-changed", () => this.sensor_update());

      window.setInterval(() => this.sensor_update(), 10000);

      this.is_observer_setup = false;
    }

    setup_observer() {
      if (this.is_observer_setup) return;
      this.is_observer_setup = true;

      if (!lovelace() || !lovelace().config) return;
      const browser_mod_config = lovelace().config.browser_mod;
      if (!browser_mod_config || !browser_mod_config.elements) return;

      var observer = new MutationObserver(() => this.sensor_update());

      browser_mod_config.elements.forEach(function(element) {
        var el = document.querySelector(element);
        if (!el) return;
        observer.observe(el, { attributes : true });
      });
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
            elements: this.get_elements(),
          },
        });
      };
      update();
    }

    get_elements() {
      this.setup_observer();

      if (!lovelace() || !lovelace().config) return;
      const browser_mod_config = lovelace().config.browser_mod;
      if (!browser_mod_config || !browser_mod_config.elements) return;
      var result = {};

      browser_mod_config.elements.forEach(function(element) {
        result[element] = {};
        var el = document.querySelector(element);
        if (!el) return;
        var attrs = el.attributes;
        for (var i = 0; i < attrs.length; i++) {
          result[element][attrs[i].name] = attrs[i].value;
        }
      });

      return result;
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

    do_dispatch_event(msg) {
      console.log(msg);
      if (!msg.event_object || !msg.event_type) return;
      if (["MouseEvent", "TouchEvent", "FocusEvent", "KeyboardEvent", "WheelEvent", "InputEvent", "CompositionEvent"].indexOf(msg.event_object) < 0) return;
      var ev_obj = eval(msg.event_object);
      var ev = new ev_obj(msg.event_type, msg.event_options);
      window.dispatchEvent(ev);
    }
  };
