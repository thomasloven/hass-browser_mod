import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { loadConfigDashboard } from "../helpers";

import "./registered-browsers-card";
import "./frontend-settings-card";

import pjson from "../../package.json";

const bmWindow = window as any;

loadConfigDashboard().then(() => {
  class BrowserModConfigPanel extends LitElement {
    @property() hass;
    @property() narrow;
    @property() connection;

    @property({type: Array}) entityRegistry?: any[];

    firstUpdated() {
      window.addEventListener("browser-mod-config-update", () => {
        this.requestUpdate();
        this._fetch_entity_registry();
      });
      this._fetch_entity_registry();
    }

    async _fetch_entity_registry() {
      if (this.entityRegistry) return;

      this.entityRegistry = await this.hass.callWS({
        type: "config/device_registry/list",
      });
    }

    render() {
      if (!window.browser_mod) return html``;
      return html`
        <ha-top-app-bar-fixed
          .backButton=${true}
        >
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${pjson.version})
            <a
              href="https://github.com/thomasloven/hass-browser_mod/blob/master/README.md"
              target="_blank"
            >
              <ha-icon class="icon" .icon=${"mdi:help-circle"}></ha-icon>
            </a>
          </div>
          <div class="content ha-scrollbar">
            <ha-config-section .narrow=${this.narrow} full-width>
              ${this.hass.user?.is_admin
                ? html`
                    <browser-mod-registered-browsers-card
                      .hass=${this.hass}
                      .entityRegistry=${this.entityRegistry}
                    ></browser-mod-registered-browsers-card>

                    <browser-mod-frontend-settings-card
                      .hass=${this.hass}
                      .entityRegistry=${this.entityRegistry}
                    ></browser-mod-frontend-settings-card>
                  `
                : ""}
            </ha-config-section>
          </div>
        </ha-top-app-bar-fixed>
      `;
    }

    static get styles() {
      return [
        ...((customElements.get("ha-config-dashboard") as any)?.styles ?? []),
        css`
          :host {
            --app-header-background-color: var(--sidebar-background-color);
            --app-header-text-color: var(--sidebar-text-color);
            --app-header-border-bottom: 1px solid var(--divider-color);
            --ha-card-border-radius: var(--ha-config-card-border-radius, 8px);
          }
          ha-config-section {
            padding: 16px 0;
            direction: ltr;
          }
          a {
            color: var(--primary-text-color);
            text-decoration: none;
          }
        `,
      ];
    }
  }

  customElements.define("browser-mod-config-panel", BrowserModConfigPanel);
});
