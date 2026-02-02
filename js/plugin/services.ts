import { getLovelaceRoot, hass_base_el } from "../helpers";
import structuredClone from "@ungap/structured-clone";
import { findPopupCardConfigByID } from "./popup-card-helpers";
import { findQuickBarCardConfigByID } from "./quick-bar-plus-card-helpers";

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
        "set_popup_style",
        "notification",
        "navigate",
        "refresh",
        "change_browser_id",
        "set_theme",
        "console",
        "javascript",
        "quick_bar",
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
      // Config is frozen by standard cards when called via fire-dom-event 
      // clone to allow modifications
      data = data === undefined ? {} : structuredClone(data);
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
          const { entity, view, large, ignore_popup_card, close } = data;
          this.showMoreInfo(entity, view, large, ignore_popup_card, close);
          break;

        case "popup":
          if (data.popup_card_id) {
            const lovelaceRoot = await getLovelaceRoot(document);
            const popupCard = await findPopupCardConfigByID(lovelaceRoot, data.popup_card_id);
            if (popupCard) {
              let properties = { ...popupCard };
              delete properties.card;
              data = { content: popupCard.card, ...properties, ...data };
            }
          }
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
          this.showPopup({ title, content, ...d });
          break;

        case "quick_bar":
          if (data.quick_bar_card_id) {
            const lovelaceRoot = await getLovelaceRoot(document);
            const quickBarCard = await findQuickBarCardConfigByID(lovelaceRoot, data.quick_bar_card_id);
            if (quickBarCard) {
              // Find the quick bar card element and open it programmatically
              // or create a temporary one with the config
              const cards = document.querySelectorAll("quick-bar-plus-card");
              let foundCard = null;
              
              for (const card of Array.from(cards)) {
                const cardConfig = (card as any)._config;
                if (cardConfig?.quick_bar_card_id === data.quick_bar_card_id) {
                  foundCard = card;
                  break;
                }
              }
              
              if (foundCard) {
                (foundCard as any).openQuickBar();
              } else {
                // Create a temporary card with the config
                const tempCard = document.createElement("quick-bar-plus-card") as any;
                tempCard.setConfig(quickBarCard);
                tempCard.hass = this.hass;
                document.body.appendChild(tempCard);
                tempCard.openQuickBar();
                
                // Remove after dialog is closed
                const checkClosed = setInterval(() => {
                  if (!tempCard._opened) {
                    clearInterval(checkClosed);
                    document.body.removeChild(tempCard);
                  }
                }, 100);
              }
            }
          }
          break;

        case "notification":
          {
            data.action_action = data.action;
            delete data.action;
            var { message, action_text, action_action, duration, dismissable } =
              data;
            let act = undefined;
            if (action_text && action_text.trim()) {
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
          await this.closePopup(data);
          break;

        case "set_popup_style":
          this.setPopupStyle(data);
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

        case "change_browser_id":
          {
            const { current_browser_id, new_browser_id, register, refresh } = data;
            if (current_browser_id === undefined && new_browser_id === undefined) {
              const title = "Change Browser ID";
              const browsers = Object.keys(this.browsers);
              const content = [
                { 
                  name: "current_browser_id", 
                  label: "Current Browser ID", 
                  selector: { text: null },
                  default: this.browserID,
                  disabled: true,
                },
                { 
                  name: "new_browser_id", 
                  label: "New Browser ID",
                  selector: { 
                    select: { options: browsers, custom_value: true, sort: true }
                  },
                },
                {
                  name: "register",
                  label: "Register",
                  selector: {
                    boolean: null
                  },
                  default: this.registered,
                },
                {
                  name: "refresh",
                  label: "Refresh",
                  selector: {
                    boolean: null
                  },
                  default: refresh ?? true,
                }
              ];
              const buttons = {
                left_button: "Cancel",
                right_button: "Change",
                right_button_variant: "danger",
                right_button_appearance: "accent",
                right_button_action: (form_data) => {
                  this.fireBrowserEvent("command-change_browser_id", form_data);
                }
              };
              window.browser_mod?.showPopup({ title, content, ...buttons });
            } else {
              let match = false;
              if (current_browser_id && this.browserID === current_browser_id) {
                match = true;
              } else {
                const identifiers = this.hass?.devices[current_browser_id]?.identifiers;
                if (
                  Array.isArray(identifiers) &&
                  identifiers.length > 0 &&
                  Array.isArray(identifiers[0]) &&
                  identifiers[0].includes(this.browserID)
                ) {
                  match = true;
                }
              }
              if (match) {
                if (new_browser_id && typeof new_browser_id === "string") {
                  const trimmed_new_browser_id = new_browser_id.trim();
                  if (trimmed_new_browser_id !== "" && trimmed_new_browser_id !== this.browserID) {
                    this.browserID = trimmed_new_browser_id;
                  }
                }
                if (register !== undefined && this.registered !== register) {
                  this.registered = register;
                }
                if (refresh) {
                  window.setTimeout(() => {
                    this.fireBrowserEvent("command-refresh", {});
                  }, 100);
                }
              }
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
