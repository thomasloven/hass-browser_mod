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
      document.body,
      "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"
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

  _toggle_afj() {
    window.setTimeout(() => {
      const afj = this.shadowRoot.querySelector("#afj") as any;
      afj.checked = true;
      afj.count = (afj.count ?? 0) + 1;
      if (afj.count && afj.count > 5) {
        afj.disabled = true;
        const afj_heading = this.shadowRoot.querySelector(
          "#afj_heading"
        ) as any;
        const afj_description = this.shadowRoot.querySelector(
          "#afj_description"
        ) as any;
        afj_description.innerHTML =
          "Something went wrong. Please try again later.";
      }
    }, 500 + Math.random() * 2500);
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

          ${new Date().getMonth() == 3 && new Date().getDate() < 8
            ? html`
                <ha-expansion-panel
                  .header=${"Extra boring settings"}
                  .secondary=${"Nothing to see here"}
                  leftChevron
                >
                  <ha-settings-row>
                    <span slot="heading" id="afj_heading"
                      >Allow April fools jokes</span
                    >
                    <span slot="description" id="afj_description">
                      By enabling this, I consent to any April Fools Jokes
                      messing with my frontend.
                    </span>
                    <span
                      explanation="Oh hi!
                      You found my April fools joke! Well done!
                      Don't worry. This actually does ABSOLUTELY NOTHING.
                      It's just a toggle connected to nothing."
                    ></span>
                    <ha-switch
                      id="afj"
                      .checked=${true}
                      @change=${this._toggle_afj}
                    ></ha-switch>
                  </ha-settings-row>
                </ha-expansion-panel>
              `
            : ``}

          <ha-expansion-panel
            .header=${"Title template"}
            .secondary=${"Jinja template for the browser window/tab title"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"titleTemplate"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Favicon template"}
            .secondary=${"Jinja template for the browser favicon"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"faviconTemplate"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Hide sidebar"}
            .secondary=${"Completely remove the sidebar from all panels"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideSidebar"}
              .settingSelector=${{ boolean: {}, label: "Hide sidebar" }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Hide header"}
            .secondary=${"Completely remove the header from all panels"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideHeader"}
              .settingSelector=${{ boolean: {}, label: "Hide header" }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default dashboard"}
            .secondary=${`The dashboard that is showed when navigating to ${location.origin}`}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultPanel"}
              .settingSelector=${dashboardSelector}
              .default=${"lovelace"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Sidebar order"}
            .secondary=${"Order and visibility of sidebar items."}
            leftChevron
          >
            <ha-settings-row>
              <ol slot="heading">
                <li>Click EDIT</li>
                <li>Set up the sidebar as you want it</li>
                <li>Do NOT click DONE</li>
                <li>Add a new setting or edit an old one</li>
                <li>Click RESTORE</li>
              </ol>
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
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Sidebar title"}
            .secondary=${"The title at the top of the sidebar"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"sidebarTitle"}
              .settingSelector=${{ text: {} }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Hide interaction icon"}
            .secondary=${"Hide the icon showing that Browser Mod will not work fully until interacted with"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideInteractIcon"}
              .settingSelector=${{
                boolean: {},
                label: "Hide interaction icon",
              }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
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
