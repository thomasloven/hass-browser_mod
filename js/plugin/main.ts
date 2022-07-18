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
  - Fix nomenclature
    x Command -> Service
    x Device -> Browser
  - Popups
    X Basic popups
    - Card-mod integration
    X Timeout
    X Fullscreen
  - Motion/occupancy tracker
  x Information about interaction requirement
  x Information about fullykiosk
  - Commands
    x Rename browser_mod commands to browser_mod services
    x Framework
    x ll-custom handling
    - Commands
      x popup
      x close_popup
      - more-info
      - navigate
      - lovelace-reload
      - window-reload
      - screensaver
      x sequence
      x delay
      - javascript eval
      - toast?
    x Redesign services to target devices
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

    console.info(
      `%cBROWSER_MOD ${pjson.version} IS INSTALLED
    %cBrowserID: ${this.browserID}`,
      "color: green; font-weight: bold",
      ""
    );
  }
}

if (!window.browser_mod) window.browser_mod = new BrowserMod();
