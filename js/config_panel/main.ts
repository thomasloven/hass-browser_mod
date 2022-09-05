import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { loadConfigDashboard } from "../helpers";

import "./browser-settings-card";
import "./registered-browsers-card";
import "./frontend-settings-card";

import pjson from "../../package.json";

const bmWindow = window as any;

loadConfigDashboard().then(() => {
  class BrowserModPanel extends LitElement {
    @property() hass;
    @property() narrow;
    @property() connection;

    firstUpdated() {
      window.addEventListener("browser-mod-config-update", () =>
        this.requestUpdate()
      );
    }

    render() {
      if (!window.browser_mod) return html``;
      return html`
        <ha-app-layout>
          <app-header slot="header" fixed>
            <app-toolbar>
              <ha-menu-button
                .hass=${this.hass}
                .narrow=${this.narrow}
              ></ha-menu-button>
              <div main-title>Browser Mod Settings</div>
              <div>
                (${pjson.version})
                <a
                  href="https://github.com/thomasloven/hass-browser_mod/blob/master/README.md"
                  target="_blank"
                >
                  <ha-icon class="icon" .icon=${"mdi:help-circle"}></ha-icon>
                </a>
              </div>
            </app-toolbar>
          </app-header>

          <ha-config-section .narrow=${this.narrow} full-width>
            <browser-mod-browser-settings-card
              .hass=${this.hass}
            ></browser-mod-browser-settings-card>

            ${this.hass.user?.is_admin
              ? html`
                  <browser-mod-registered-browsers-card
                    .hass=${this.hass}
                  ></browser-mod-registered-browsers-card>

                  <browser-mod-frontend-settings-card
                    .hass=${this.hass}
                  ></browser-mod-frontend-settings-card>
                `
              : ""}
          </ha-config-section>
        </ha-app-layout>
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
          }
          a {
            color: var(--primary-text-color);
            text-decoration: none;
          }
        `,
      ];
    }
  }

  customElements.define("browser-mod-panel", BrowserModPanel);
});
