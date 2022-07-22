import { selectTree } from "../helpers";

export const AutoSettingsMixin = (SuperClass) => {
  return class AutoSettingsMixinClass extends SuperClass {
    _faviconTemplateSubscription;
    _titleTemplateSubscription;
    __currentTitle = undefined;

    constructor() {
      super();

      this._auto_settings_setup();
      this.addEventListener("browser-mod-config-update", () =>
        this._auto_settings_setup()
      );

      window.addEventListener("location-changed", () => {
        this._updateTitle();
        setTimeout(() => this._updateTitle(), 500);
        setTimeout(() => this._updateTitle(), 1000);
        setTimeout(() => this._updateTitle(), 5000);
      });
    }

    async _auto_settings_setup() {
      await this.connectionPromise;

      const settings = this.settings;

      // Sidebar panel order and hiding
      if (settings.sidebarPanelOrder) {
        localStorage.setItem("sidebarPanelOrder", settings.sidebarPanelOrder);
      }
      if (settings.sidebarHiddenPanels) {
        localStorage.setItem(
          "sidebarHiddenPanels",
          settings.sidebarHiddenPanels
        );
      }

      // Hide sidebar
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

      // Hide header
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

      // Favicon template
      if (settings.faviconTemplate !== undefined) {
        (async () => {
          if (this._faviconTemplateSubscription) {
            this._faviconTemplateSubscription();
          }
          this._faviconTemplateSubscription = undefined;
          this._faviconTemplateSubscription =
            await this.connection.subscribeMessage(this._updateFavicon, {
              type: "render_template",
              template: settings.faviconTemplate,
              variables: {},
            });
        })();
      }

      // Title template
      if (settings.titleTemplate !== undefined) {
        (async () => {
          if (this._titleTemplateSubscription) {
            this._titleTemplateSubscription();
          }
          this._titleTemplateSubscription = undefined;
          this._titleTemplateSubscription =
            await this.connection.subscribeMessage(
              this._updateTitle.bind(this),
              {
                type: "render_template",
                template: settings.titleTemplate,
                variables: {},
              }
            );
        })();
      }
    }

    get _currentFavicon() {
      const link: any = document.head.querySelector("link[rel~='icon']");
      return link?.href;
    }

    _updateFavicon({ result }) {
      // TEMP: Template for testing
      /*
        {% if is_state("light.bed_light", "on") %}
        /local/workspace/test/icons/green.png
        {% else %}
        /local/workspace/test/icons/red.png
        {% endif %}
      */
      const link: any = document.head.querySelector("link[rel~='icon']");
      link.href = result;
      window.browser_mod.fireEvent("browser-mod-favicon-update");
    }

    get _currentTitle() {
      return this.__currentTitle;
    }

    _updateTitle(data = undefined) {
      if (data) this.__currentTitle = data.result;
      if (this.__currentTitle) document.title = this.__currentTitle;
      window.browser_mod.fireEvent("browser-mod-favicon-update");
    }
  };
};
