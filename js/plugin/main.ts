import "./browser-player";

// import { BrowserModConnection } from "./connection";
import { ConnectionMixin } from "./connection";
import { ScreenSaverMixin } from "./screensaver";
import { MediaPlayerMixin } from "./mediaPlayer";
import { CameraMixin } from "./camera";
import { RequireInteractMixin } from "./require-interact";
import { FullyMixin } from "./fullyKiosk";
import { BrowserStateMixin } from "./browser";
import { ServicesMixin } from "./services";
import "./popups";
import { PopupMixin } from "./popups";
import pjson from "../../package.json";

/*
  TODO:
  - Popups
    X Basic popups
    - Card-mod integration
    X Timeout
    X Fullscreen
  - Information about interaction requirement
  - Information about fullykiosk
  - Commands
    - Framework
    - ll-custom handling
    - Commands
      x popup
      x close_popup
      - more-info
      - navigate
      - lovelace-reload
      - window-reload
      - screensaver
      - sequence
      - delay
      - toast?
    - Redesign services to target devices
  - frontend editor for popup cards
    - also screensavers
  - Tweaks
    - Save sidebar
    - Save sidebar per user
    - Kiosk mode
    - Kiosk mode per user
    - Favicon templates
    - Title templates
    - Quickbar tweaks (ctrl+enter)?
  - Video player?
  - Media_seek
  - Screensavers
  */
export class BrowserMod extends ServicesMixin(
  PopupMixin(
    BrowserStateMixin(
      CameraMixin(
        MediaPlayerMixin(
          ScreenSaverMixin(
            FullyMixin(RequireInteractMixin(ConnectionMixin(EventTarget)))
          )
        )
      )
    )
  )
) {
  constructor() {
    super();
    this.connect();

    // document.body.addEventListener("ll-custom", (ev) => {
    //   if ((ev as CustomEvent).detail.browser_mod) {
    //     this.msg_callback((ev as CustomEvent).detail.browser_mod);
    //   }
    // });

    console.info(
      `%cBROWSER_MOD ${pjson.version} IS INSTALLED
    %cDeviceID: ${this.deviceID}`,
      "color: green; font-weight: bold",
      ""
    );
  }

  // async msg_callback(msg) {
  //   const handlers = {
  //     update: (msg) => this.update(msg),
  //     debug: (msg) => this.debug(msg),

  //     play: (msg) => this.player_play(msg.media_content_id),
  //     pause: (msg) => this.player_pause(),
  //     stop: (msg) => this.player_stop(),
  //     "set-volume": (msg) => this.player_set_volume(msg.volume_level),
  //     mute: (msg) => this.player_mute(msg.mute),

  //     toast: (msg) => this.do_toast(msg.message, msg.duration),
  //     popup: (msg) => this.do_popup(msg),
  //     "close-popup": (msg) => this.do_close_popup(),
  //     "more-info": (msg) => this.do_more_info(msg.entity_id, msg.large),

  //     navigate: (msg) => this.do_navigate(msg.navigation_path),
  //     "set-theme": (msg) => this.set_theme(msg),
  //     "lovelace-reload": (msg) => this.lovelace_reload(msg),
  //     "window-reload": () => window.location.reload(),

  //     blackout: (msg) =>
  //       this.do_blackout(msg.time ? parseInt(msg.time) : undefined),
  //     "no-blackout": (msg) => {
  //       if (msg.brightness && this.isFully) {
  //         (window as any).fully.setScreenBrightness(msg.brightness);
  //       }
  //       this.no_blackout();
  //     },

  //     "call-service": (msg) => this.call_service(msg),
  //     commands: async (msg) => {
  //       for (const m of msg.commands) {
  //         await this.msg_callback(m);
  //       }
  //     },
  //     delay: async (msg) =>
  //       await new Promise((resolve) => {
  //         window.setTimeout(resolve, msg.seconds * 1000);
  //       }),
  //   };

  //   await handlers[msg.command.replace("_", "-")](msg);
  // }

  // debug(msg) {
  //   popUp(`deviceID`, { type: "markdown", content: `# ${deviceID}` });
  //   alert(deviceID);
  // }

  // set_theme(msg) {
  //   if (!msg.theme) msg.theme = "default";
  //   fireEvent("settheme", { theme: msg.theme }, ha_element());
  // }

  // lovelace_reload(msg) {
  //   const ll = lovelace_view();
  //   if (ll) fireEvent("config-refresh", {}, ll);
  // }

  // call_service(msg) {
  //   const _replaceThis = (data) => {
  //     if (data === "this") return deviceID;
  //     if (Array.isArray(data)) return data.map(_replaceThis);
  //     if (data.constructor == Object) {
  //       for (const key in data) data[key] = _replaceThis(data[key]);
  //     }
  //     return data;
  //   };
  //   const [domain, service] = msg.service.split(".", 2);
  //   let service_data = _replaceThis(
  //     JSON.parse(JSON.stringify(msg.service_data))
  //   );
  //   this.hass.callService(domain, service, service_data);
  // }

  // // update(msg = null) {
  // //   if (msg) {
  // //     if (msg.name) {
  // //       this.entity_id = msg.name.toLowerCase();
  // //     }
  // //     if (msg.camera && !this.isFully) {
  // //       this.setup_camera();
  // //     }
  // //     this.config = { ...this.config, ...msg };
  // //   }
  // //   this.player_update();
  // //   this.fully_update();
  // //   this.screen_update();
  // //   this.sensor_update();
  // // }
}

// (async () => {
//   await hass_loaded();

if (!window.browser_mod) window.browser_mod = new BrowserMod();
// })();
