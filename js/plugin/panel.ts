import { selectTree } from "../helpers";

export const PanelStateMixin = (SuperClass) => {
  return class PanelStateMixinClass extends SuperClass {
    private _isUpdating = false;

    constructor() {
      super();
      [
        'popstate',
        'location-changed'
      ].forEach(event => {
        window.addEventListener(event, () =>
          setTimeout(() => {
            this._panel_state_update()
          }, 1000)
        );
      });

      [
        'browser-mod-ready',
        'browser-mod-popup-opened',
        'browser-mod-popup-closed'
      ].forEach(event => {
        this.addEventListener(event, () =>
          setTimeout(() => {
            this._panel_state_update()
          }, 1000)
        );
      });

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
        panelUrlPath: panel?.route?.prefix?.replace(/^\/|\/$/g, "") || "",
        panelComponentName: panel?.panel?.component_name || "",
        panelIcon: panel?.panel?.icon || "",
        panelNarrow: panel?.narrow || false,
        panelRequireAdmin: panel?.panel?.require_admin || false,
      };
    }

    async _viewAttributes(panel) {
      if (panel?.panel?.component_name !== "lovelace") {
        return {
          viewTitle: "",
          viewUrlPath: panel?.route?.path?.replace(/^\/|\/$/g, "") || "",
          viewNarrow: panel?.narrow || false,
        };
      }
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
        viewUrlPath: lovelace.config?.views?.[_curView]?.path || `${_curView}`,
        viewNarrow: lovelace.narrow,
      };
    }

    _panel_state_update() {
      const update = async () => {
        this._isUpdating = true;
        const panel = await this._getPanel(document);
        const panelAttributes = this._panelAttributes(panel);
        const viewAttributes = await this._viewAttributes(panel);
        const fullTitle = [];
        if (panelAttributes.panelTitle) {
          fullTitle.push(panelAttributes.panelTitle);
        }
        if (viewAttributes.viewTitle) {
          fullTitle.push(viewAttributes.viewTitle);
        }
        const fullUrlPath = [];
        if (panelAttributes.panelUrlPath) {
          fullUrlPath.push(panelAttributes.panelUrlPath);
        }
        if (viewAttributes.viewUrlPath) {
          fullUrlPath.push(viewAttributes.viewUrlPath);
        }
        this.sendUpdate({
          panel: {
            title: fullTitle.join(" - "),
            attributes: {
              ...panelAttributes,
              ...viewAttributes,
              fullUrlPath: fullUrlPath.join("/"),
              popupOpen: window.browser_mod?.popupState,
              openPopups: window.browser_mod?.openPopups,
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
