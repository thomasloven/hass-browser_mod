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

    const pjson = require('../package.json');
    console.info(`%cBROWSER_MOD ${pjson.version} IS INSTALLED
    %cDeviceID: ${deviceID}`,
    "color: green; font-weight: bold", "");
  }

  msg_callback(msg) {
    const handlers = {
      update: (msg) => this.update(msg),
      debug: (msg) => this.debug(msg),

      play: (msg) => this.player_play(msg.media_content_id),
      pause: (msg) => this.player_pause(),
      stop: (msg) => this.player_stop(),
      set_volume: (msg) => this.player_set_volume(msg.volume_level),
      mute: (msg) => this.player_mute(msg.mute),

      toast: (msg) => this.do_toast(msg.message, msg.duration),
      popup: (msg) => this.do_popup(msg),
      "close-popup": (msg) => this.do_close_popup(),
      "more-info": (msg) => this.do_more_info(msg.entity_id, msg.large),

      navigate: (msg) => this.do_navigate(msg.navigation_path),
      "set-theme": (msg) => this.set_theme(msg),
      "lovelace-reload": (msg) => this.lovelace_reload(msg),
      "window-reload": () => window.location.reload(false),

      blackout: (msg) => this.do_blackout(msg.time ? parseInt(msg.time) : undefined),
      "no-blackout": (msg) => {
        if(msg.brightness && this.isFully) {
          window.fully.setScreenBrightness(msg.brightness);
        }
        this.no_blackout()
      },
    };

    handlers[msg.command](msg);
  }

  debug(msg) {
    popUp(`deviceID`, {type: "markdown", content: `# ${deviceID}`})
    alert(deviceID);
  }

  set_theme(msg){
    if(!msg.theme) msg.theme = "default";
    fireEvent("settheme", {theme: msg.theme}, document.querySelector("home-assistant"));
  }

  lovelace_reload(msg) {
    const ll = lovelace_view();
    if (ll)
      fireEvent("config-refresh", {}, ll);
  }

  update(msg=null) {
    if(msg) {
      if(msg.name) {
        this.entity_id = msg.name.toLowerCase();
      }
      if(msg.camera) {
        this.setup_camera();
      }
    }
    this.player_update();
    this.fully_update();
    this.screen_update();
    this.sensor_update();
  }

}


const bases = [customElements.whenDefined('home-assistant'), customElements.whenDefined('hc-main')];
Promise.race(bases).then(() => {
  window.browser_mod = window.browser_mod || new BrowserMod();
});
