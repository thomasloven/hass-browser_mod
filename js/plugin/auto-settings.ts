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
    }
  };
};
