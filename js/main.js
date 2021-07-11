import { deviceID } from "card-tools/src/deviceID";
import { lovelace_view } from "card-tools/src/hass";
import { popUp } from "card-tools/src/popup";
import { fireEvent } from "card-tools/src/event";
import "./browser-player";

import { BrowserModConnection } from "./connection";
import { BrowserModMediaPlayerMixin } from "./mediaPlayer";
import { FullyKioskMixin } from "./fullyKiosk";
import { BrowserModCameraMixin } from "./camera";
import { BrowserModScreensaverMixin } from "./screensaver";
import { BrowserModPopupsMixin } from "./popups";
import { BrowserModBrowserMixin } from "./browser";
import pjson from "../package.json";

const ext = (baseClass, mixins) =>
  mixins.reduceRight((base, mixin) => mixin(base), baseClass);

class BrowserMod extends ext(BrowserModConnection, [
  BrowserModBrowserMixin,
  BrowserModPopupsMixin,
  BrowserModScreensaverMixin,
  BrowserModCameraMixin,
  FullyKioskMixin,
  BrowserModMediaPlayerMixin,
]) {
  constructor() {
    super();
    this.entity_id = deviceID.replace("-", "_");
    this.cast = document.querySelector("hc-main") !== null;
    this.connect();

    document.body.addEventListener("ll-custom", (ev) => {
      if (ev.detail.browser_mod) {
        this.msg_callback(ev.detail.browser_mod);
      }
    });

    console.info(
      `%cBROWSER_MOD ${pjson.version} IS INSTALLED
    %cDeviceID: ${deviceID}`,
      "color: green; font-weight: bold",
      ""
    );
  }

  async msg_callback(msg) {
    const handlers = {
      update: (msg) => this.update(msg),
      debug: (msg) => this.debug(msg),

      play: (msg) => this.player_play(msg.media_content_id),
      pause: (msg) => this.player_pause(),
      stop: (msg) => this.player_stop(),
      "set-volume": (msg) => this.player_set_volume(msg.volume_level),
      mute: (msg) => this.player_mute(msg.mute),

      toast: (msg) => this.do_toast(msg.message, msg.duration),
      popup: (msg) => this.do_popup(msg),
      "close-popup": (msg) => this.do_close_popup(),
      "more-info": (msg) => this.do_more_info(msg.entity_id, msg.large),

      navigate: (msg) => this.do_navigate(msg.navigation_path),
      "set-theme": (msg) => this.set_theme(msg),
      "lovelace-reload": (msg) => this.lovelace_reload(msg),
      "window-reload": () => window.location.reload(),

      blackout: (msg) =>
        this.do_blackout(msg.time ? parseInt(msg.time) : undefined),
      "no-blackout": (msg) => {
        if (msg.brightness && this.isFully) {
          window.fully.setScreenBrightness(msg.brightness);
        }
        this.no_blackout();
      },

      "call-service": (msg) => this.call_service(msg),
      commands: async (msg) => {
        for (const m of msg.commands) {
          await this.msg_callback(m);
        }
      },
      delay: async (msg) =>
        await new Promise((resolve) => {
          window.setTimeout(resolve, msg.seconds * 1000);
        }),
    };

    await handlers[msg.command.replace("_", "-")](msg);
  }

  debug(msg) {
    popUp(`deviceID`, { type: "markdown", content: `# ${deviceID}` });
    alert(deviceID);
  }

  set_theme(msg) {
    if (!msg.theme) msg.theme = "default";
    fireEvent(
      "settheme",
      { theme: msg.theme },
      document.querySelector("home-assistant")
    );
  }

  lovelace_reload(msg) {
    const ll = lovelace_view();
    if (ll) fireEvent("config-refresh", {}, ll);
  }

  call_service(msg) {
    const _replaceThis = (data) => {
      if (typeof data === "string" && data === "this") return deviceID;
      if (Array.isArray(data)) return data.map(_replaceThis);
      if (data.constructor == Object) {
        for (const key in data) data[key] = _replaceThis(data[key]);
      }
      return data;
    };
    const [domain, service] = msg.service.split(".", 2);
    let service_data = _replaceThis(
      JSON.parse(JSON.stringify(msg.service_data))
    );
    this._hass.callService(domain, service, service_data);
  }

  update(msg = null) {
    if (msg) {
      if (msg.name) {
        this.entity_id = msg.name.toLowerCase();
      }
      if (msg.camera && !this.isFully) {
        this.setup_camera();
      }
      this.config = { ...this.config, ...msg };
    }
    this.player_update();
    this.fully_update();
    this.screen_update();
    this.sensor_update();
  }
}

const bases = [
  customElements.whenDefined("home-assistant"),
  customElements.whenDefined("hc-main"),
];
Promise.race(bases).then(() => {
  window.setTimeout(() => {
    window.browser_mod = window.browser_mod || new BrowserMod();
  }, 1000);
});
