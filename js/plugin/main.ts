import "./event-target-polyfill.js";
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
