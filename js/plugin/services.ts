import { getLovelaceRoot, hass_base_el } from "../helpers";
import structuredClone from "@ungap/structured-clone";

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
      this._service_action({ service, data, target: {} });
    }

    async _service_action({ service, data, target }) {
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
        data.browser_id !== undefined || data.user_id !== undefined
      ) {
        const d = { ...data };
        const t = { ...target };
        if (d.browser_id === "THIS") d.browser_id = this.browserID;
        if (d.user_id === "THIS" && this.user) d.user_id = this.user.id;
        if (d.browser_entities === "THIS") d.browser_entities = this.browserEntities;
        // CALL HOME ASSISTANT SERVICE
        const [domain, srv] = _service.split(".");
        return this.hass.callService(domain, srv, d, t);
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
          // Promote icon actions to data so they can be made callable
          // by the following code
          if (data.icons) {
            data.icons.forEach((icon, index) => {
              data[`icon_${index}_action`] = icon.action;
            });
          }
          const { title, content, ...d } = data;
          for (const [k, v] of Object.entries<any>(d)) {
            if (k.endsWith("_action")) {
              let actions = v; // Force Closure. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures#creating_closures_in_loops_a_common_mistake
              let key = k; // If required use key in anonymous function to avoid closure issue as per above comment
              d[k] = (ext_data?) => {
                if (!Array.isArray(actions)) {
                  actions = [actions];
                }
                actions.forEach((actionItem) => {
                  var { action, service, target, data } = actionItem as any;
                  service = (action === undefined || action === "call-service") ? service : action;
                  this._service_action({
                    service,
                    target,
                    data: { ...data, ...ext_data },
                  });
                });
              };
            }
          }
          // Move icon actions back to icons
          if (d.icons) {
            // Need to clone to be able to update icons array
            d.icons = structuredClone(d.icons);
            d.icons.forEach((icon, index) => {
              d.icons[index].action = d[`icon_${index}_action`];
              delete d[`icon_${index}_action`];
            });
          }
          this.showPopup(title, content, d);
          break;

        case "notification":
          {
            data.action_action = data.action;
            delete data.action;
            var { message, action_text, action_action, duration, dismissable } =
              data;
            let act = undefined;
            act = {
              text: action_text,
              action: (ext_data?) => {
                if (action_action && action_text) {
                  if (!Array.isArray(action_action)) {
                    action_action = [action_action];
                  }
                  action_action.forEach((actionItem) => {
                    var { action, service, target, data } = actionItem;
                    service = (action === undefined || action === "call-service") ? service : action;
                    this._service_action({
                      service,
                      target,
                      data: { ...data, ...ext_data },
                    });
                  })
                }
              }
            };
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
          await this.closePopup();
          break;

        case "navigate":
          this.browser_navigate(data.path);
          break;

        case "refresh":
          {
            if (window.caches) {
              let cacheDeletePromises = [];
              const cacheNames = await window.caches.keys();
              cacheNames.forEach((cacheName) => {
                cacheDeletePromises.push(window.caches.delete(cacheName));
              });
              await Promise.all(cacheDeletePromises);
              window.location.reload();
            } else {
              window.location.href = window.location.href;
            }
          }
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
            let root = await getLovelaceRoot(document);
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
