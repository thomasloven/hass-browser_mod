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
          [primary_action: <string>]
          [secondary_action: <string>]
          [dismissable: <TRUE/false>]
          [timeout: <number>]
          [callbacks:
            [primary_action: <service call>]
            [secondary_action: <service call>]
            [timeout: <service call>]
            [dismissed: <service call>]
          ]

        Close popup
          service: browser_mod.close_popup

        Javascript console print
          service: browser_mod.console
          data:
            message: <string>
    */

    _service_action({ service, data }) {
      let _service: String = service;
      if (!_service.startsWith("browser_mod.") && _service.includes(".")) {
        // CALL HOME ASSISTANT SERVICE
      }

      if (_service.startsWith("browser_mod.")) {
        _service = _service.substring(12);
      }

      switch (_service) {
        case "popup":
          const { title, content, ...d } = data;
          if (d.callbacks) {
            for (const [k, v] of Object.entries(data.callbacks)) {
              d.callbacks[k] = () => this._service_action(v as any);
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
