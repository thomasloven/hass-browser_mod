import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

class BrowserModSettingsCard extends LitElement {
  @property() hass;

  @state() _selectedTab = 0;

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.requestUpdate()
    );
  }

  _handleSwitchTab(ev: CustomEvent) {
    this._selectedTab = parseInt(ev.detail.index, 10);
  }

  render() {
    const level = ["browser", "user", "global"][this._selectedTab];
    return html`
      <ha-card header="Auto settings" outlined>
        <div class="card-content">
          <mwc-tab-bar
            .activeIndex=${this._selectedTab}
            @MDCTabBar:activated=${this._handleSwitchTab}
          >
            <mwc-tab .label=${"Browser"}></mwc-tab>
            <mwc-tab .label=${"User (" + this.hass.user.name + ")"}></mwc-tab>
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
      ({ true: "Enabled", false: "Disabled", undefined: "unset" }[String(val)]);
    const DESC_SET_UNSET = (val) => (val === undefined ? "Unset" : "Set");
    const OVERRIDDEN = (key) => {
      if (level !== "browser" && browser[key] !== undefined)
        return html`<br />Overridden by browser setting`;
      if (level === "global" && user[key] !== undefined)
        return html`<br />Overridden by user setting`;
    };

    return html`
      <ha-settings-row>
        <span slot="heading">Kiosk mode</span>
        <span slot="description"> Hide sidebar and header </span>
        Currenty: ${DESC_BOOLEAN(current.kiosk)} ${OVERRIDDEN("kiosk")}
      </ha-settings-row>
      <ha-settings-row>
        <mwc-button
          @click=${() => window.browser_mod.set_setting("kiosk", true, level)}
        >
          Enable
        </mwc-button>
        <mwc-button
          @click=${() => window.browser_mod.set_setting("kiosk", false, level)}
        >
          Disable
        </mwc-button>
        <mwc-button
          @click=${() =>
            window.browser_mod.set_setting("kiosk", undefined, level)}
        >
          Clear
        </mwc-button>
      </ha-settings-row>

      <ha-settings-row>
        <span slot="heading">Sidebar order</span>
        <span slot="description">Order and visibility of sidebar buttons</span>
        Currenty: ${DESC_SET_UNSET(current.sidebarPanelOrder)}
        ${OVERRIDDEN("sidebarPanelOrder")}
      </ha-settings-row>
      <ha-settings-row>
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
    `;
  }

  _render_user() {
    return html`
      User
      <ha-settings-row>
        <span slot="heading">Kiosk mode</span>
        <span slot="description"> Hide sidebar and header </span>
        Currenty: Overridden
      </ha-settings-row>
      <ha-settings-row>
        <span slot="heading">Set screensaver</span>
        <span slot="description"> Set screensaver card </span>
        <mwc-button>Enable</mwc-button>
        <mwc-button>Disable</mwc-button>
        <mwc-button>Clear</mwc-button>
      </ha-settings-row>
    `;
  }

  _render_browser() {
    return html`
      Browser
      <ha-settings-row>
        <span slot="heading">Kiosk mode</span>
        <span slot="description"> Hide sidebar and header </span>
        Currenty: Overridden
      </ha-settings-row>
      <ha-settings-row>
        <span slot="heading">Set screensaver</span>
        <span slot="description"> Set screensaver card </span>
        <mwc-button>Enable</mwc-button>
        <mwc-button>Disable</mwc-button>
        <mwc-button>Clear</mwc-button>
      </ha-settings-row>
    `;
  }
}

customElements.define("browser-mod-settings-card", BrowserModSettingsCard);
