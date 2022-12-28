import { hass_base_el, selectTree } from "../helpers";

export const ServicesMixin = (SuperClass) => {
  return class ServicesMixinClass extends SuperClass {
    constructor() {
      super();
      const cmds = [
        "sequence",
        "delay",
        "popup",
        "more_info",
        "close_popup",
        "notification",
        "navigate",
        "refresh",
        "set_theme",
        "console",
        "javascript",
      ];
      for (const service of cmds) {
        this.addEventListener(`command-${service}`, (ev) => {
          this.service(service, ev.detail);
        });
      }

      document.body.addEventListener("ll-custom", (ev: CustomEvent) => {
        if (ev.detail.browser_mod) {
          this._service_action(ev.detail.browser_mod);
        }
      });
    }

    async service(service, data) {
      this._service_action({ service, data });
    }

    async _service_action({ service, data }) {
      if (data === undefined) data = {};
      if (!service) {
        console.error(
          "Browser Mod: Service parameter not specified in service call."
        );
        return;
      }
      let _service: String = service;
      if (
        (!_service.startsWith("browser_mod.") && _service.includes(".")) ||
        data.browser_id !== undefined
      ) {
        const d = { ...data };
        if (d.browser_id === "THIS") d.browser_id = this.browserID;
        // CALL HOME ASSISTANT SERVICE
        const [domain, srv] = _service.split(".");
        return this.hass.callService(domain, srv, d);
      }

      if (_service.startsWith("browser_mod.")) {
        _service = _service.substring(12);
      }

      switch (_service) {
        case "sequence":
          for (const a of data.sequence) await this._service_action(a);
          break;
        case "delay":
          await new Promise((resolve) => setTimeout(resolve, data.time));
          break;

        case "more_info":
          const { entity, large, ignore_popup_card } = data;
          this.showMoreInfo(entity, large, ignore_popup_card);
          break;

        case "popup":
          const { title, content, ...d } = data;
          for (const [k, v] of Object.entries(d)) {
            if (k.endsWith("_action")) {
              d[k] = (ext_data?) => {
                const { service, data } = v as any;
                this._service_action({
                  service,
                  data: { ...data, ...ext_data },
                });
              };
            }
          }
          this.showPopup(title, content, d);
          break;

        case "notification":
          {
            const { message, action_text, action, duration, dismissable } =
              data;
            let act = undefined;
            if (action && action_text) {
              act = {
                text: action_text,
                action: (ext_data?) => {
                  const { service, data } = action;
                  this._service_action({
                    service,
                    data: { ...data, ...ext_data },
                  });
                },
              };
            }

            const base = await hass_base_el();
            base.dispatchEvent(
              new CustomEvent("hass-notification", {
                detail: {
                  message,
                  action: act,
                  duration,
                  dismissable,
                },
              })
            );
          }
          break;

        case "close_popup":
          this.closePopup();
          break;

        case "navigate":
          this.browser_navigate(data.path);
          break;

        case "refresh":
          window.location.href = window.location.href;
          break;

        case "set_theme":
          {
            const detail = { ...data };
            if (detail.theme === "auto") detail.theme = undefined;
            if (detail.dark === "auto") detail.dark = undefined;
            if (detail.dark === "light") detail.dark = false;
            if (detail.dark === "dark") detail.dark = true;
            if (detail.primaryColor && Array.isArray(detail.primaryColor)) {
              const [r, g, b] = detail.primaryColor;
              detail.primaryColor =
                "#" +
                ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            if (detail.accentColor && Array.isArray(detail.accentColor)) {
              const [r, g, b] = detail.accentColor;
              detail.accentColor =
                "#" +
                ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }

            const base = await hass_base_el();
            base.dispatchEvent(new CustomEvent("settheme", { detail }));
          }
          break;

        case "console":
          if (
            Object.keys(data).length > 1 ||
            (data && data.message === undefined)
          )
            console.dir(data);
          else console.log(data.message);
          break;

        case "javascript":
          // Reload Lovelace function
          const lovelace_reload = async () => {
            let root = await selectTree(
              document,
              "home-assistant$home-assistant-main$ha-panel-lovelace$hui-root"
            );
            if (!root)
              root = await selectTree(
                document,
                "hc-main $ hc-lovelace $ hui-view"
              );
            if (!root)
              root = await selectTree(
                document,
                "hc-main $ hc-lovelace $ hui-panel-view"
              );

            if (root) root.dispatchEvent(new CustomEvent("config-refresh"));
          };

          const log = async (message) =>
            this.connection.sendMessage({ type: "browser_mod/log", message });

          const code = `
          "use strict";
          ${data.code}
          `;

          const fn = new Function(
            "hass",
            "data",
            "service",
            "log",
            "lovelace_reload",
            code
          );
          fn(this.hass, data, window.browser_mod.service, log, lovelace_reload);
          break;
      }
    }
  };
};
