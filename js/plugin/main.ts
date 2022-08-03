import "./browser-player";

import { ConnectionMixin } from "./connection";
import { ScreenSaverMixin } from "./screensaver";
import { MediaPlayerMixin } from "./mediaPlayer";
import { CameraMixin } from "./camera";
import { RequireInteractMixin } from "./require-interact";
import { FullyMixin } from "./fullyKiosk";
import { BrowserStateMixin } from "./browser";
import { ServicesMixin } from "./services";
import { ActivityMixin } from "./activity";
import "./popups";
import { PopupMixin } from "./popups";
import pjson from "../../package.json";
import "./popup-card";
import { AutoSettingsMixin } from "./frontend-settings";
import { BrowserIDMixin } from "./browserID";

/*
  TODO:
  - More pictures for documentation
  x Fix nomenclature
    x Command -> Service
    x Device -> Browser
  - Popups
    X Basic popups
    x Styling
    X Timeout
    X Fullscreen
    x Popup-card
    x Auto-close
    x Forms that are forwarded to service calls
  x Motion/occupancy tracker
  x Information about interaction requirement
  x Information about fullykiosk
  - Commands
    x Change targets from the frontend
    x Send browser ID to the backend in service calls?
    x Rename browser_mod commands to browser_mod services
    x Framework
    x ll-custom handling
    - Commands
      x popup
      x close_popup
      x more-info
      x navigate
      o lovelace-reload?
        o Not needed
      x window-reload
      o screensaver ?
        o Refer to automations instead
      x sequence
      x delay
      x javascript eval
      o toast?
        o Replaced with popups with timeout
    x Redesign services to target devices
  x frontend editor for popup cards
    o also screensavers
  x Saved frontend settings
    X Framework
    x Save sidebar
    x Kiosk mode
    x Default dashboard
    o Screensaver?
    x Favicon templates
    x Title templates
  - Tweaks
    - Quickbar tweaks (ctrl+enter)?
    x Card-mod preload
  x Video player
  x Media_seek
  o Screensavers
  x IMPORTANT: FIX DEFAULT HIDING OF ENTITIES
    o NOFIX. Home Assistant bug
  X Check functionality with CAST - may need to add frontend part as a lovelace resource
  */
export class BrowserMod extends ServicesMixin(
  PopupMixin(
    ActivityMixin(
      BrowserStateMixin(
        CameraMixin(
          MediaPlayerMixin(
            ScreenSaverMixin(
              AutoSettingsMixin(
                FullyMixin(
                  RequireInteractMixin(
                    ConnectionMixin(BrowserIDMixin(EventTarget))
                  )
                )
              )
            )
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
