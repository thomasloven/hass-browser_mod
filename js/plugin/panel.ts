import { selectTree } from "../helpers";

export const PanelStateMixin = (SuperClass) => {
  return class PanelStateMixinClass extends SuperClass {
    private _isUpdating = false;

    constructor() {
      super();
      window.addEventListener("location-changed", () =>
        setTimeout(() => {
          this._panel_state_update()
        }, 1000)
      );

      window.addEventListener("popstate", () =>
        setTimeout(() => {
          this._panel_state_update()
        }, 1000)
      );

      this.addEventListener("browser-mod-ready", () =>
        setTimeout(() => {
          this._panel_state_update()
        }, 1000)
      );

      this.connectionPromise.then(() => this._panel_state_update());
    }

    async _getPanel(document) {
      let _panel = await _getPanel(document);
      while (_panel === null) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          _panel = await _getPanel(document);
      }
      return _panel;
      
      async function _getPanel(document) {
        let panel = await selectTree(
          document,
          "home-assistant $ home-assistant-main $ partial-panel-resolver>*"
        );
        if (!panel) {
          panel = await selectTree(
            document,
            "hc-main $ hc-lovelace"
          );
        }
        if (!panel) {
          panel = await selectTree(
            document,
            "hc-main $ hc-lovelace"
          );
        }
        return panel;
      }
    }

    _getPanelNameTranslationKey = (panel) => {
      if (panel?.url_path === "lovelace") {
        return "panel.states" as const;
      }

      if (panel?.url_path === "profile") {
        return "panel.profile" as const;
      }

      return `panel.${panel?.title}` as const;
    };

    _panelTitle(panel) {
      if (panel?.hass?.localize) {
        const translationKey = this._getPanelNameTranslationKey(panel.panel);
        return panel.hass.localize(translationKey) || panel.panel?.title || "";
      }
      return panel?.panel?.title || "";
    }

    _panelAttributes(panel) {
      return {
        panelTitle: this._panelTitle(panel),
        panelUrlPath: panel?.panel?.url_path || "",
        panelComponentName: panel?.panel?.component_name || "",
        panelIcon: panel?.panel?.icon || "",
      };
    }

    async _viewAttributes(panel) {
      if (panel?.panel?.component_name !== "lovelace") return {};
      let cnt = 0;
      while (!panel.shadowRoot?.querySelector("hui-root") && cnt < 10) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        cnt++;
      }
      const lovelace = panel.shadowRoot.querySelector("hui-root");
      if (!lovelace) return {};
      const _curView = lovelace._curView || 0;
      return {
        viewTitle: lovelace.config?.views?.[_curView]?.title || "",
        viewUrlPath: lovelace.config?.views?.[_curView]?.path || "",
        viewNarrow: lovelace.narrow,
      };
    }

    _panel_state_update() {
      const update = async () => {
        this._isUpdating = true;
        const panel = await this._getPanel(document);
        const panelAttributes = this._panelAttributes(panel);
        const viewAttributes = await this._viewAttributes(panel);
        const fullTitle = panelAttributes.panelTitle + (viewAttributes.viewTitle ? ` - ${viewAttributes.viewTitle}` : "");
        const fullUrlPath = panelAttributes.panelUrlPath + (viewAttributes.viewUrlPath ? `/${viewAttributes.viewUrlPath}` : "");
        this.sendUpdate({
          panel: {
            title: fullTitle,
            attributes: {
              ...panelAttributes,
              ...viewAttributes,
              fullUrlPath: fullUrlPath,
              popupOpen: window.browser_mod?._popupEl?.open || false,
            }
          }
        });
        this._isUpdating = false;
      };
      if (!this._isUpdating)
        update();
    }
  };
};
