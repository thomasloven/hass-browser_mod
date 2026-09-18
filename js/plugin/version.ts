import pjson from "../../package.json";
import { compareVersions } from "compare-versions";
import { hass_base_el, selectTree } from "../helpers";

export const VersionMixin = (SuperClass) => {
  return class VersionMixinClass extends SuperClass {
    _browserVersion: string;
    _versionNotificationPending: boolean = false;
    _reloadIntervalId?: number;

    constructor() {
      super();
      this._browserVersion = pjson.version;
      this.addEventListener("browser-mod-ready", async () => {
        await this._checkVersion();
      });
      this.addEventListener("browser-mod-disconnected", () => {
        this._versionNotificationPending = false;
        this._clearReloadInterval();
      });
    }

    async _checkVersion() {
      const serverVersion = this._data?.version;
      if (serverVersion && serverVersion !== this._browserVersion) {
        if (!this._versionNotificationPending) {
          this._versionNotificationPending = true;
          const cmp = compareVersions(serverVersion, this._browserVersion);
          if (cmp < 0) {
            // The integration was updated, but Home Assistant has not restarted yet.
            await this._restartNotification();
          } else {
            // The browser is still using an older cached frontend bundle.
            await this._reloadNotification(serverVersion, this._browserVersion);
          }
        }
      }
    }

    private _clearReloadInterval() {
      if (this._reloadIntervalId !== undefined) {
        clearInterval(this._reloadIntervalId);
        this._reloadIntervalId = undefined;
      }
    }

    async _waitForNoToast() {
      let haToast;
      do {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        haToast = await selectTree(
          document.body,
          "home-assistant $ notification-manager $ ha-toast",
          false,
          1000
        );
      } while (haToast);
    }

    async _restartNotification() {
      await this._waitForNoToast();
      const hassInstance = this.hass;
      // Non-admin users cannot restart Home Assistant.
      if (!hassInstance?.user?.is_admin) return;

      const message =
        "Restart of Home Assistant is required to finish downloading or updating Browser Mod";
      const action = {
        text: "Restart",
        action: async () => {
          const base = await hass_base_el();
          const helpers = await (window as any).loadCardHelpers?.();
          if (helpers?.showConfirmationDialog) {
            const confirmed = await helpers.showConfirmationDialog(base, {
              title: hassInstance.localize("ui.dialogs.restart.restart.confirm_title"),
              text: hassInstance.localize("ui.dialogs.restart.restart.confirm_description"),
              confirmText: hassInstance.localize("ui.dialogs.restart.restart.confirm_action"),
              destructive: true,
            });
            if (!confirmed) return;
          }
          this.hass.callService("homeassistant", "restart");
        },
      };

      const base = await hass_base_el();
      base.dispatchEvent(
        new CustomEvent("hass-notification", {
          detail: {
            message,
            action,
            duration: -1,
            dismissable: true,
          },
        })
      );
    }

    async _reloadNotification(serverVersion, clientVersion) {
      await this._waitForNoToast();
      this._clearReloadInterval();

      let seconds = 60;
      const base = await hass_base_el();
      const activateReload = () => {
        this._clearReloadInterval();
        this.service("browser_mod.refresh", {});
      };
      const dismiss = () => this._clearReloadInterval();
      const messageBase = `Browser Mod has been updated to ${serverVersion}. Browser is running ${clientVersion}. Reloading in... `;
      const showToast = () => {
        const message = `${messageBase}${seconds === 60 ? "" : `${seconds}s`}`;
        base.dispatchEvent(
          new CustomEvent("hass-notification", {
            detail: {
              id: "browser-mod-reload",
              message,
              action: {
                text: "Reload Now",
                action: activateReload,
                primary: true,
              },
              secondaryAction: {
                text: "Cancel",
                action: dismiss,
              },
              duration: -1,
              dismiss,
            },
          })
        );
      };

      showToast();

      let reloadTickRunning = false;
      this._reloadIntervalId = window.setInterval(async () => {
        if (reloadTickRunning) return;
        reloadTickRunning = true;
        try {
          const first = seconds === 60;
          seconds--;
          if (seconds <= 0) {
            activateReload();
            return;
          }

          const toastMessage = await selectTree(
            base,
            "$ notification-manager $ ha-toast[data-notification-key='identified-browser-mod-reload'] $",
            false,
            950
          );
          if (toastMessage) {
            let style = toastMessage.querySelector("style[data-browser-mod-style]");
            if (!style && first) {
              style = document.createElement("style");
              style.setAttribute("data-browser-mod-style", "");
              toastMessage.prepend(style);
            }
            if (style) {
              style.textContent = `
                span.message::after {
                  content: "${seconds}s";
                }
              `;
            } else {
              showToast();
            }
          } else {
            showToast();
          }
        } finally {
          reloadTickRunning = false;
        }
      }, 1000);
    }
  };
};
