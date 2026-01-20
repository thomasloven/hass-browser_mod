import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { loadDeveloperToolsTemplate, selectTree } from "../helpers";
import { SidebarSettingsCustomSelector } from "./sidebar-settings-custom-selector";

import "./browser-mod-settings-table";

loadDeveloperToolsTemplate();

class BrowserModFrontendSettingsCard extends LitElement {
  @property() hass;

  @state() _dashboards = [];
  @state() _panels = {};

  @state() _editSidebar = false;
  @state() _hassUserHasSidebarSettings = false;
  _savedSidebar = { panelOrder: [], hiddenPanels: [] };
  _sidebarSettingsCustomSelector: SidebarSettingsCustomSelector;

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.requestUpdate()
    );
    this._sidebarSettingsCustomSelector = new SidebarSettingsCustomSelector(this);
  }

  updated(changedProperties) {
    if (
      changedProperties.has("hass") &&
      changedProperties.get("hass") === undefined
    ) {
      (async () => {
        this._dashboards = await this.hass.callWS({
          type: "lovelace/dashboards/list",
        });
        this._panels = this.hass.panels;
        this.checkHassUserSidebarSettings();
     })();
    }
  }

  expandedChanged(ev) {
    if (ev.detail.expanded) {
      const target = ev.target;
      target?.updateComplete.then(() => {
        const table = target?.querySelector(
          "browser-mod-settings-table"
        ) as any;
        table?.showTable();
      });
    }
  }

  async checkHassUserSidebarSettings () {
    const userData = await this.hass?.callWS({
      type: 'frontend/get_user_data', 
      key: 'sidebar'
    })
    this._hassUserHasSidebarSettings = (userData && userData.value?.panelOrder);
  }

  async clearHassUserSidebarSettings() {
    const clearSettings = () => { 
      this.hass.callWS({
        type: 'frontend/set_user_data', 
        key: 'sidebar',
        value: {}
      })
      this.checkHassUserSidebarSettings();
      window.browser_mod?.showPopup(
        {
          title: "Sidebar settings",
          content: "Sidebar settings cleared",
          right_button: "OK"
        }
      )
    };
    window.browser_mod?.showPopup(
      {
        title: "Sidebar settings",
        content: "Clear sidebar settings synced in this user's Home Assistant profile?",
        right_button: "Clear",
        right_button_variant: "danger",
        right_button_appearance: "accent",
        right_button_action: clearSettings,
        left_button: "Cancel",
        left_button_variant: "neutral",
        left_button_appearance: "plain",
      }
    );
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
    const pl = Object.values(this._panels)
      .filter((p: { url_path: string, title: string }) => {
        if (!p.title) return false;
        return true;
      }).map((p: { url_path: string, title: string }) => {
        return { value: p.url_path, label: this.hass.localize?.(`panel.${p.title}`) || p.title };
      });
    const panels = [{ value: "lovelace", label: this.hass.localize?.("panel.states") || "lovelace (default)" }, ...pl]
    return html`
      <ha-card header="Frontend Settings" outlined>
        <div class="card-content">
          <ha-alert alert-type="warning" title="Please note:">
            The settings in this section severely alter the way the Home
            Assistant frontend works and looks. It is very easy to forget that
            you made a change here when you switch devices or users.
            <p>
              Do not report any issues to Home Assistant before clearing
              <b>EVERY</b> setting here and thoroughly clearing all your browser
              caches. Failure to do so means you risk wasting a lot of people's
              time, and you will be severely and rightfully ridiculed.
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
                      >Allow April Fool's jokes</span
                    >
                    <span slot="description" id="afj_description">
                      By enabling this, I consent to any April Fool's Jokes
                      messing with my frontend.
                    </span>
                    <span
                      explanation="Oh hi!
                      You found my April Fool's joke! Well done!
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
            @expanded-changed=${this.expandedChanged}
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
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"faviconTemplate"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Kiosk mode"}
            .secondary=${"Use Home Assistant in kiosk mode."}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"kioskMode"}
              .settingSelector=${{ boolean: {}, label: "Kiosk mode" }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Hide sidebar"}
            .secondary=${"Hide sidebar and remove sidebar menu icon from all panels."}
            @expanded-changed=${this.expandedChanged}
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
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideHeader"}
              .settingSelector=${{ boolean: {}, label: "Hide header" }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Overlay icon"}
            .secondary=${"An overlay icon with action to show on selected panels."}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"overlayIcon"}
              .settingSelector=${{ schema:
                [
                  {
                    name: "icon",
                    label: "Icon",
                    selector: { icon: {} }
                  },
                  {
                    name: "title",
                    label: "Title",
                    selector: { text: {} },
                  },
                  {
                    name: "action",
                    label: "Action",
                    selector: { object: {} },
                  },
                  {
                    name: "panels",
                    label: "Show on panels",
                    selector: { select: { multiple: true, options: panels,mode: "dropdown" } }
                  },
                  {
                    type: "grid",
                    schema: [
                      {
                        name: "top",
                        label: "Top (px)",
                        selector: { number: {} },
                      },
                      {
                        name: "left",
                        label: "Left (px)",
                        selector: { number: {} },
                      },
                      {
                        name: "bottom",
                        label: "Bottom (px)",
                        selector: { number: {} },
                      },
                      {
                        name: "right",
                        label: "Right (px)",
                        selector: { number: {} },
                      },
                    ],
                  },
                  {
                    name: "class",
                    label: "Class",
                    selector: { text: {} }
                  },
                  {
                    name: "style",
                    label: "CSS style",
                    selector: { text: { multiline: true } },
                  },
                ]
              }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default dashboard"}
            .secondary=${`The dashboard that is shown when navigating to ${location.origin}`}
            @expanded-changed=${this.expandedChanged}
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
            .header=${"Default action"}
            .secondary=${`Home Assistant action that executes when browser is opened or refreshed.`}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultAction"}
              .settingSelector=${{ object: {} }}
              .default=${ {} }
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          ${this._sidebarSettingsCustomSelector?.dialogAvaliable ?
            html`
            <ha-expansion-panel
              .header=${"Sidebar order"}
              .secondary=${"Order and visibility of sidebar items."}
              @expanded-changed=${this.expandedChanged}
              leftChevron
            >
              ${this._hassUserHasSidebarSettings ? 
                html`
                <ha-settings-row>
                  <span slot="heading">Sidebar user settings</span>
                  <div slot="description" style="display: flex;">
                    <span>
                    This user has sidebar settings synced to Home Assistant user profile. 
                    It is recommend to clear these settings to allow Browser Mod settings to 
                    take precedence. To check other Home Assistant users, login as that user
                    and check back at this panel.
                    </span>
                    <ha-button
                      variant="danger"
                      appearance="filled"
                      @click=${() => this.clearHassUserSidebarSettings()}
                    >Clear</ha-button>
                  </div>
                </ha-settings-row>` 
                : "" 
              }
              <browser-mod-settings-table
                .hass=${this.hass}
                .settingKey=${"sidebarPanelOrder"}
                .settingSelector=${
                  {
                    custom: this._sidebarSettingsCustomSelector,
                  }
                }
                .default=${"lovelace"}
              ></browser-mod-settings-table>
            </ha-expansion-panel>` 
          :
            html`
          <ha-expansion-panel
            .header=${"Sidebar order"}
            .secondary=${"Order and visibility of sidebar items."}
            @expanded-changed=${this.expandedChanged}
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
              <ha-button
                appearance="plain"
                @click=${() => this.toggleEditSidebar()}>
                  ${this._editSidebar ? "Restore" : "Edit"}
              </ha-button>
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
            `}
          <ha-expansion-panel
            .header=${"Sidebar title"}
            .secondary=${"The title at the top of the sidebar"}
            @expanded-changed=${this.expandedChanged}
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
            @expanded-changed=${this.expandedChanged}
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
          <ha-expansion-panel
            .header=${"Full user interaction"}
            .secondary=${"Use full user interaction if required."}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"fullInteraction"}
              .settingSelector=${{
                boolean: {},
                label: "Use full user interaction",
              }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Save screen state"}
            .secondary=${"Save screen state when browser is disconnected"}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"saveScreenState"}
              .settingSelector=${{
                boolean: {},
                label: "Save screen state",
              }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Camera resolution"}
            .secondary=${"Set the resolution for the camera. Format: width x height (e.g., 1920 x 1080)"}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"cameraResolution"}
              .settingSelector=${{
                text: { 
                  placeholder: "1920 x 1080",
                },
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
