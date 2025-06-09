import { await_element, waitRepeat, runOnce, selectTree, hass_base_el } from "../helpers";

export const AutoSettingsMixin = (SuperClass) => {
  class AutoSettingsMixinClass extends SuperClass {
    _faviconTemplateSubscription;
    _titleTemplateSubscription;
    _sidebarTitleSubscription;
    // flag to remove legacy Sidebar Settings that hass leaves after migration to user profile
    _removeLegacySidebarSettings: Boolean = false;
    __currentTitle = undefined;

    @runOnce()
    async runHideHeader() {
      while (!(await this._hideHeader()))
        await new Promise((r) => setTimeout(r, 500));
    }

    @runOnce(true)
    async runUpdateTitle() {
      await waitRepeat(() => this._updateTitle(), 3, 500);
    }

    constructor() {
      super();

      const runUpdates = async () => {
        this.runUpdateTitle();
        this.runHideHeader();
      };

      this._auto_settings_setup();
      this.addEventListener("browser-mod-config-update", () => {
        this._auto_settings_setup();
        runUpdates();
      });

      window.addEventListener("location-changed", runUpdates);

      this.addEventListener("browser-mod-ready", this._runDefaultAction, {once: true});
      this._watchEditSidebar();
    }

    async _auto_settings_setup() {
      await this.connectionPromise;

      const settings = this.settings;

      // Sidebar panel order and hiding
      if (settings.sidebarPanelOrder) {
        localStorage.setItem("sidebarPanelOrder", settings.sidebarPanelOrder);
      } else if (this._removeLegacySidebarSettings) {
        localStorage.removeItem("sidebarPanelOrder");
      }
      if (settings.sidebarHiddenPanels) {
        localStorage.setItem(
          "sidebarHiddenPanels",
          settings.sidebarHiddenPanels
        );
      } else if (this._removeLegacySidebarSettings){
        localStorage.removeItem("sidebarHiddenPanels");
      }

      // Default panel
      if (settings.defaultPanel) {
        localStorage.setItem("defaultPanel", `"${settings.defaultPanel}"`);
      }

      // Hide sidebar
      if (settings.hideSidebar === true) {
        selectTree(
          document.body,
          "home-assistant $ home-assistant-main"
        ).then((el) => el?.style?.setProperty("--mdc-drawer-width", "0px"));
        selectTree(
          document.body,
          "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"
        ).then((el) => el?.remove?.());
      }

      // Sidebar title
      if (settings.sidebarTitle) {
        (async () => {
          if (this._sidebarTitleSubscription) {
            this._sidebarTitleSubscription();
          }
          this._sidebarTitleSubscription = undefined;
          this._sidebarTitleSubscription =
            await this.connection.subscribeMessage(this._updateSidebarTitle, {
              type: "render_template",
              template: settings.sidebarTitle,
              variables: {},
            });
        })();
      }

      // Hide header

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

    async _updateSidebarTitle({ result }) {
      let sidebar = undefined;
      let cnt = 0;
      while (!sidebar && cnt++ < 5) {
        sidebar = await selectTree(
          document.body,
          "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar $ .title"
        );
        if (!sidebar) await new Promise((r) => setTimeout(r, 500));
      }
      if (sidebar) sidebar.innerHTML = result;
    }

    get _currentFavicon() {
      const link: any = document.head.querySelector("link[rel~='icon']");
      return link?.href;
    }

    _updateFavicon({ result }) {
      const link: any = document.head.querySelector("link[rel~='icon']");
      link.href = result;
    }

    get _currentTitle() {
      return this.__currentTitle;
    }

    _updateTitle(data = undefined) {
      if (data) this.__currentTitle = data.result;
      if (this.__currentTitle) document.title = this.__currentTitle;
    }

    async _hideHeader() {
      if (
        this.settings.hideHeader !== true &&
        this.settings.hideSidebar !== true
      )
        return true;
      const rootEl = await selectTree(
        document.body,
        "home-assistant $ home-assistant-main $ ha-drawer partial-panel-resolver"
      );
      if (!rootEl) return false;

      let header = await selectTree(
        rootEl,
        "ha-panel-lovelace$hui-root$.header"
      );
      let menuButton;

      if (header) {
        menuButton = header.querySelector("ha-menu-button");
      } else {
        let steps = 0;
        let el = rootEl;
        while (el && el.localName !== "ha-top-app-bar-fixed" && steps++ < 5) {
          await await_element(el, true);
          const next =
            el.querySelector("ha-top-app-bar-fixed") ??
            el.firstElementChild ??
            el.shadowRoot;
          el = next;
        }
        if (el?.localName !== "ha-top-app-bar-fixed") return false;

        header = el.shadowRoot.querySelector("header");
        menuButton = el.querySelector("ha-menu-button");
      }

      if (header && this.settings.hideHeader === true) {
        rootEl.style.setProperty("--header-height", "0px");
        header.style.setProperty("display", "none");
        return true;
      } else if (menuButton && this.settings.hideSidebar === true) {
        menuButton.remove?.();
        return true;
      }
      return false;
    }

    _runDefaultAction() {
      if (this.settings.defaultAction) {
        var action_action = this.settings.defaultAction;
        if (!Array.isArray(action_action)) {
          action_action = [action_action];
        }
        action_action.forEach(async (actionItem) => {
          var { action, service, target, data } = actionItem;
          service = action ?? service;
          this._service_action({
            service,
            target,
            data: data,
          });
        })
      }
    }

    async _watchEditSidebar() {
      let sidebar = undefined;
      let cnt = 0;
      while (!sidebar && cnt++ < 10) {
        sidebar = await selectTree(
          document.body,
          "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"
        );
        if (!sidebar) await new Promise((r) => setTimeout(r, 1000));
      }
      // Home Assistant 2025.6 removed editMode from sidebar
      // so this is the best check to see if sidebar settings dialog is available
      if (sidebar && sidebar.editMode === undefined) {
        // both Sidebar and Profile edit can fire show-dialog for dialog-edit-sidebar
        // so listen on hass main
        const main = await selectTree(
          document.body,
          "home-assistant $ home-assistant-main"
        )
        if (main) {
          main.addEventListener("show-dialog", (ev: any) => {
            if (ev.detail?.dialogTag === "dialog-edit-sidebar") {
              if (ev.detail?.browser_mod_continue) return;
              const evShowDialog = new CustomEvent("show-dialog", { bubbles: true, composed: true, detail: { browser_mod_continue: true, ...ev.detail } })
              ev.stopPropagation();
              window.browser_mod?.showPopup(
                'Edit sidebar',
                'Browser Mod is installed. It is recommend that you use Browser Mod Frontend Settings to manage sidebar settings.',
                {
                  right_button: "Continue",
                  right_button_action: () => { main.dispatchEvent(evShowDialog) },
                  left_button: "Edit with Browser Mod",
                  left_button_action: () => { this.browser_navigate('/browser-mod') },
                  style: 'ha-dialog { position: fixed; z-index: 999; }' // Need to be above open drawer sidebar
                }
              )
            }
          });
        }
        // flag to remove legacy sidebar settings which hass may have left over
        this._removeLegacySidebarSettings = true;
        this._auto_settings_setup();
      }
    }

    getSetting(key) {
      const retval = { global: undefined, browser: {}, user: {} };
      retval.global = this._data.settings?.[key];
      for (const [k, v] of Object.entries(this._data.browsers ?? {})) {
        if ((v as any).settings?.[key] != null)
          retval.browser[k] = (v as any).settings[key];
      }
      for (const [k, v] of Object.entries(this._data.user_settings ?? {})) {
        if (v[key] != null) retval.user[k] = v[key];
      }
      return retval;
    }

    setSetting(type, target, settings) {
      if (type === "global") {
        for (const [key, value] of Object.entries(settings))
          this.connection.sendMessage({
            type: "browser_mod/settings",
            key,
            value,
          });
      } else if (type === "browser") {
        const browser = this._data.browsers[target];
        const newsettings = { ...browser.settings, ...settings };
        this.connection.sendMessage({
          type: "browser_mod/register",
          browserID: target,
          data: {
            ...browser,
            settings: newsettings,
          },
        });
      } else if (type === "user") {
        const user = target;
        for (const [key, value] of Object.entries(settings))
          this.connection.sendMessage({
            type: "browser_mod/settings",
            user,
            key,
            value,
          });
      }
    }
  }
  return AutoSettingsMixinClass;
};
