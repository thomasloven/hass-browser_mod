import pjson from "../../package.json";
import { selectTree } from "../helpers";

export const VersionMixin = (SuperClass) => {
  return class VersionMixinClass extends SuperClass {
    _version: string;
    _notificationPending: boolean = false;

    constructor() {
      super();
      this._version = pjson.version;
      this.addEventListener("browser-mod-connected", async () => {
        await this._checkVersion();
      });
      this.addEventListener("browser-mod-disconnected", () => {
        this._notificationPending = false;
      });
    }

    async _checkVersion() {
      if (this._data?.version && this._data.version !== this._version) {
        if (!this._notificationPending) {
          this._notificationPending = true;
          await this._loaclNotification(
            this._data.version,
            this._version
          )
        }
      }
    }

    async _loaclNotification(serverVersion, clientVersion) {
      // Wait for any other notifications to expire
      let haToast;
      do {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        haToast = await selectTree(
                document.body,
                "home-assistant $ notification-manager $ ha-toast",
                false,
                1000)
      } while (haToast);
      const service = "browser_mod.notification";
      const message = `Browser Mod version mismatch! Browser: ${clientVersion}, Home Assistant: ${serverVersion}`;
      const data = {
        message: message,
        duration: -1, // 60 seconds
        dismissable: true,
        action_text: "Reload",
        browser_id: "THIS",
        action: {
          service: "browser_mod.refresh",
          data: {
            browser_id: "THIS",
          },
        },
      }
      await this.service(service, data);
    }
  };
};
