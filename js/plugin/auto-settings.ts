import { selectTree } from "../helpers";

export const AutoSettingsMixin = (SuperClass) => {
  return class AutoSettingsMixinClass extends SuperClass {
    constructor() {
      super();

      this._auto_settings_setup();
    }

    async _auto_settings_setup() {
      await this.connectionPromise;

      const settings = this.settings;

      if (settings.sidebarPanelOrder) {
        localStorage.setItem("sidebarPanelOrder", settings.sidebarPanelOrder);
      }
      if (settings.sidebarHiddenPanels) {
        localStorage.setItem(
          "sidebarHiddenPanels",
          settings.sidebarHiddenPanels
        );
      }

      if (settings.hideSidebar === true) {
        selectTree(
          document.body,
          "home-assistant$home-assistant-main$app-drawer-layout"
        ).then((el) => el.style.setProperty("--app-drawer-width", "0px"));
        selectTree(
          document.body,
          "home-assistant$home-assistant-main$app-drawer-layout app-drawer"
        ).then((el) => el.remove());
      }
      if (settings.hideHeader === true) {
        customElements.whenDefined("app-header-layout").then(() => {
          const appHeader = customElements.get("app-header").prototype;
          const _attached = appHeader.attached;
          appHeader.attached = function () {
            _attached.bind(this)();
            this.style.setProperty("display", "none");
          };
        });
      }
    }
  };
};
