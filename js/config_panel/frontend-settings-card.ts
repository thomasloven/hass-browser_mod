import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { loadDeveloperToolsTemplate, selectTree } from "../helpers";

import "./browser-mod-settings-table";

loadDeveloperToolsTemplate();

class BrowserModFrontendSettingsCard extends LitElement {
  @property() hass;

  @state() _dashboards = [];

  @state() _editSidebar = false;
  _savedSidebar = { panelOrder: [], hiddenPanels: [] };

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.requestUpdate()
    );
  }

  updated(changedProperties) {
    if (
      changedProperties.has("hass") &&
      changedProperties.get("hass") === undefined
    ) {
      (async () =>
        (this._dashboards = await this.hass.callWS({
          type: "lovelace/dashboards/list",
        })))();
    }
  }

  async toggleEditSidebar() {
    const sideBar: any = await selectTree(
      document,
      "home-assistant $ home-assistant-main $ app-drawer-layout app-drawer ha-sidebar"
    );
    sideBar.editMode = !sideBar.editMode;
    this._editSidebar = sideBar.editMode;
    if (this._editSidebar) {
      this._savedSidebar = {
        panelOrder: sideBar._panelOrder,
        hiddenPanels: sideBar._hiddenPanels,
      };
    } else {
      sideBar._panelOrder = this._savedSidebar.panelOrder ?? [];
      sideBar._hiddenPanels = this._savedSidebar.hiddenPanels ?? [];
      this._savedSidebar = { panelOrder: [], hiddenPanels: [] };
    }
  }

  render() {
    const db = this._dashboards.map((d) => {
      return { value: d.url_path, label: d.title };
    });
    const dashboardSelector = {
      select: {
        options: [{ value: "lovelace", label: "lovelace (default)" }, ...db],
        custom_value: true,
      },
    };
    return html`
      <ha-card header="Frontend Settings" outlined>
        <div class="card-content">
          <ha-alert alert-type="warning" title="Please note:">
            The settings in this section severely change the way the Home
            Assistant frontend works and looks. It is very easy to forget that
            you made a setting here when you switch devices or user.
            <p>
              Do not report any issues to Home Assistant before clearing
              <b>EVERY</b> setting here and thouroghly clearing all your browser
              caches. Failure to do so means you risk wasting a lot of peoples
              time, and you will be severly and rightfully ridiculed.
            </p>
          </ha-alert>
          <p>
            Settings below are applied by first match. I.e. if a matching User
            setting exists, it will be applied. Otherwise any matching Browser
            setting and otherwise the GLOBAL setting if that differs from
            DEFAULT.
          </p>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Title template</span>
            <span slot="description">
              Jinja template for the browser window/tab title
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"titleTemplate"}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Favicon template</span>
            <span slot="description">
              Jinja template for the browser favicon
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"faviconTemplate"}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Hide sidebar</span>
            <span slot="description">
              Completely remove the sidebar from all panels
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"hideSidebar"}
            .settingSelector=${{ boolean: {}, label: "Hide sidebar" }}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Hide header</span>
            <span slot="description">
              Completely remove the header from all panels
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"hideHeader"}
            .settingSelector=${{ boolean: {}, label: "Hide header" }}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Default dashboard</span>
            <span slot="description">
              The dashboard that is showed when navigating to
              ${location.origin}/
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"defaultPanel"}
            .settingSelector=${dashboardSelector}
            .default=${"lovelace"}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Sidebar order</span>
            <span slot="description">
              Order and visibility of sidebar items. <br />Click EDIT and set
              the sidebar up as you want. Then save the settings and finally
              click RESTORE.
            </span>
            <mwc-button @click=${() => this.toggleEditSidebar()}>
              ${this._editSidebar ? "Restore" : "Edit"}
            </mwc-button>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"sidebarPanelOrder"}
            .settingSelector=${{
              plaintext: "Press OK to store the current sidebar order",
            }}
            .default=${"lovelace"}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Sidebar title</span>
            <span slot="description">
              The title at the top of the sidebar
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"sidebarTitle"}
            .settingSelector=${{ text: {} }}
          ></browser-mod-settings-table>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      .box {
        border: 1px solid var(--divider-color);
        padding: 8px;
      }
      .separator {
        border-bottom: 1px solid var(--divider-color);
        margin: 16px -16px 0px;
      }
      img.favicon {
        width: 64px;
        height: 64px;
        margin-left: 16px;
      }
      mwc-tab-bar ha-icon {
        display: flex;
        align-items: center;
      }
    `;
  }
}

customElements.define(
  "browser-mod-frontend-settings-card",
  BrowserModFrontendSettingsCard
);
