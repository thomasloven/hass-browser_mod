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
          [right_button: <string>]
          [right_button_action: <service call>]
          [left_button: <string>]
          [left_button_action: <service call>]
          [dismissable: <TRUE/false>]
          [dismiss_action: <service call>]
          [timeout: <number>]
          [timeout_action: <service call>]

        Close popup
          service: browser_mod.close_popup

        Javascript console print
          service: browser_mod.console
          data:
            message: <string>
    */

    constructor() {
      super();
      const cmds = ["sequence", "delay", "popup", "close_popup"];
      for (const service of cmds) {
        this.addEventListener(`command-${service}`, (ev) => {
          this._service_action({
            service,
            data: ev.detail,
          });
        });
      }

      document.body.addEventListener("ll-custom", (ev: CustomEvent) => {
        if (ev.detail.browser_mod) {
          this._service_action(ev.detail.browser_mod);
        }
      });
    }

    async _service_action({ service, data }) {
      let _service: String = service;
      if (!_service.startsWith("browser_mod.") && _service.includes(".")) {
        // CALL HOME ASSISTANT SERVICE
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

        case "console":
          console.log(data.message);
          break;
      }
    }
  };
};
