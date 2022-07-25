export const ServicesMixin = (SuperClass) => {
  return class ServicesMixinClass extends SuperClass {
    /*
      Structure of service call:
        service: <service>
        [data: <data>]

      Sequence:
        service: browser_mod.sequence
        data:
          sequence:
            - <service call>
            - <service call>
            - ...

      Delay
        service: browser_mod.delay
        data:
          time: <number>

      Popup:
        service: browser_mod.popup
        data:
          [title: <string>]
          [content: <string | Lovelace Card Configuration>]
          [size: <NORMAL/wide/fullscreen>]
          [right_button: <string>]
          [right_button_action: <service call>]
          [left_button: <string>]
          [left_button_action: <service call>]
          [dismissable: <TRUE/false>]
          [dismiss_action: <service call>]
          [timeout: <number>]
          [timeout_action: <service call>]
          [style: <string>]

      More-info:
        service: browser_mod.more_info
        data:
          entity: <string>
          [large: <true/FALSE>]
          [ignore_popup_card: <true/FALSE>]

      Close popup:
        service: browser_mod.close_popup

      Navigate to path:
        service: browser_mod.navigate
        data:
          path: <string>

      Refresh browser:
        service: browser_mod.refresh

      Browser console print:
        service: browser_mod.console
        data:
          message: <string>

      Run javascript:
        service: browser_mod.javascript
        data:
          code: <string>
    */

    constructor() {
      super();
      const cmds = [
        "sequence",
        "delay",
        "popup",
        "more_info",
        "close_popup",
        "navigate",
        "refresh",
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
              d[k] = () => this._service_action(v as any);
            }
          }
          this.showPopup(title, content, d);
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

        case "console":
          console.log(data.message);
          break;

        case "javascript":
          const code = `
          "use strict";
          // Insert global definitions here
          const hass = (document.querySelector("home-assistant") || document.querySelector("hc-main")).hass;
          ${data.code}
          `;
          const fn = new Function(code);
          fn();
          break;
      }
    }
  };
};
