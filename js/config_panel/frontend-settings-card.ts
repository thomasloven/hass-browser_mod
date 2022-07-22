import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { loadDeveloperToolsTemplate } from "../helpers";

loadDeveloperToolsTemplate();

class BrowserModFrontendSettingsCard extends LitElement {
  @property() hass;

  @state() _selectedTab = 0;

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.requestUpdate()
    );
    window.browser_mod.addEventListener("browser-mod-favicon-update", () =>
      this.requestUpdate()
    );
  }

  _handleSwitchTab(ev: CustomEvent) {
    this._selectedTab = parseInt(ev.detail.index, 10);
  }

  render() {
    const level = ["browser", "user", "global"][this._selectedTab];
    return html`
      <ha-card header="Frontend settings" outlined>
        <div class="card-content">
        <ha-alert alert-type="warning">
          <p>
            Please note: The settings in this section severely change the way the Home
            Assistant frontend works and looks. It is very easy to forget that
            you made a setting here when you switch devices or user.
          </p>
          <p>
            Do not report any issues to Home Assistant before clearing
            <b>EVERY</b> setting here and thouroghly clearing all your browser
            caches. Failure to do so means you risk wasting a lot of peoples
            time, and you will be severly and rightfully ridiculed.
          </p>
          </ha-alert>
          <p>
          Global settings are applied for all users and browsers.</br>
          User settings are applied to the current user and overrides any Global settings.</br>
          Browser settings are applied for the current browser and overrides any User or Global settings.
          </p>
          <mwc-tab-bar
            .activeIndex=${this._selectedTab}
            @MDCTabBar:activated=${this._handleSwitchTab}
          >
            <mwc-tab .label=${"Browser"}></mwc-tab>
            <ha-icon .icon=${"mdi:chevron-double-right"}></ha-icon>
            <mwc-tab .label=${"User (" + this.hass.user.name + ")"}></mwc-tab>
            <ha-icon .icon=${"mdi:chevron-double-right"}></ha-icon>
            <mwc-tab .label=${"Global"}></mwc-tab>
          </mwc-tab-bar>

          ${this._render_settings(level)}
        </div>
      </ha-card>
    `;
  }

  _render_settings(level) {
    const global = window.browser_mod.global_settings;
    const user = window.browser_mod.user_settings;
    const browser = window.browser_mod.browser_settings;
    const current = { global, user, browser }[level];

    const DESC_BOOLEAN = (val) =>
      ({ true: "Enabled", false: "Disabled", undefined: "Unset" }[String(val)]);
    const DESC_SET_UNSET = (val) => (val === undefined ? "Unset" : "Set");
    const OVERRIDDEN = (key) => {
      if (level !== "browser" && browser[key] !== undefined)
        return html`<br />Overridden by browser setting`;
      if (level === "global" && user[key] !== undefined)
        return html`<br />Overridden by user setting`;
    };

    return html`
      <div class="box">
        <ha-settings-row>
          <span slot="heading">Favicon template</span>
          ${OVERRIDDEN("faviconTemplate")}
          <img src="${window.browser_mod._currentFavicon}" class="favicon" />
        </ha-settings-row>
        <ha-code-editor
          .hass=${this.hass}
          .value=${current.faviconTemplate}
          @value-changed=${(ev) => {
            const tpl = ev.detail.value || undefined;
            window.browser_mod.set_setting("faviconTemplate", tpl, level);
          }}
        ></ha-code-editor>
        <ha-settings-row>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting(
                "faviconTemplate",
                undefined,
                level
              )}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Title template</span>
          ${OVERRIDDEN("titleTemplate")}
        </ha-settings-row>
        <ha-code-editor
          .hass=${this.hass}
          .value=${current.titleTemplate}
          @value-changed=${(ev) => {
            const tpl = ev.detail.value || undefined;
            window.browser_mod.set_setting("titleTemplate", tpl, level);
          }}
        ></ha-code-editor>
        <ha-settings-row>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting("titleTemplate", undefined, level)}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Hide Sidebar</span>
          <span slot="description">Hide the sidebar and hamburger menu</span>
          Currently: ${DESC_BOOLEAN(current.hideSidebar)}
          ${OVERRIDDEN("hideSidebar")}
        </ha-settings-row>
        <ha-settings-row>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting("hideSidebar", true, level)}
          >
            Enable
          </mwc-button>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting("hideSidebar", false, level)}
          >
            Disable
          </mwc-button>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting("hideSidebar", undefined, level)}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Hide Header</span>
          <span slot="description">Hide the header on all pages</span>
          Currently: ${DESC_BOOLEAN(current.hideHeader)}
          ${OVERRIDDEN("hideHeader")}
        </ha-settings-row>
        <ha-settings-row>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting("hideHeader", true, level)}
          >
            Enable
          </mwc-button>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting("hideHeader", false, level)}
          >
            Disable
          </mwc-button>
          <mwc-button
            @click=${() =>
              window.browser_mod.set_setting("hideHeader", undefined, level)}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Sidebar order</span>
          <span slot="description">
            Order and visibility of sidebar buttons
          </span>
          Currently: ${DESC_SET_UNSET(current.sidebarPanelOrder)}
          ${OVERRIDDEN("sidebarPanelOrder")}
        </ha-settings-row>
        <ha-settings-row>
          <span slot="description">
            Clearing this does NOT restore the original default order.
          </span>
          <mwc-button
            @click=${() => {
              window.browser_mod.set_setting(
                "sidebarPanelOrder",
                localStorage.getItem("sidebarPanelOrder"),
                level
              );
              window.browser_mod.set_setting(
                "sidebarHiddenPanels",
                localStorage.getItem("sidebarHiddenPanels"),
                level
              );
            }}
          >
            Set
          </mwc-button>
          <mwc-button
            @click=${() => {
              window.browser_mod.set_setting(
                "sidebarPanelOrder",
                undefined,
                level
              );
              window.browser_mod.set_setting(
                "sidebarHiddenPanels",
                undefined,
                level
              );
            }}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Default dashboard</span>
          <span slot="description"
            >The dashboard that's displayed by default</span
          >
          Currently: ${DESC_SET_UNSET(current.defaultPanel)}
          ${OVERRIDDEN("defaultPanel")}
        </ha-settings-row>
        <ha-settings-row>
          <span slot="description">
            Clearing this does NOT restore the original default dashboard.
          </span>
          <mwc-button
            @click=${() => {
              window.browser_mod.set_setting(
                "defaultPanel",
                localStorage.getItem("defaultPanel"),
                level
              );
            }}
          >
            Set
          </mwc-button>
          <mwc-button
            @click=${() => {
              window.browser_mod.set_setting("defaultPanel", undefined, level);
            }}
          >
            Clear
          </mwc-button>
        </ha-settings-row>
      </div>
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
        margin: 0 -8px;
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
