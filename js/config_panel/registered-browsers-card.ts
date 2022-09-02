import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

class BrowserModRegisteredBrowsersCard extends LitElement {
  @property() hass;

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.requestUpdate()
    );
  }

  unregister_browser(ev) {
    const browserID = ev.currentTarget.browserID;

    const unregisterCallback = () => {
      if (browserID === window.browser_mod.browserID) {
        window.browser_mod.registered = false;
      } else {
        window.browser_mod.connection.sendMessage({
          type: "browser_mod/unregister",
          browserID,
        });
      }
    };

    window.browser_mod.showPopup(
      "Unregister browser",
      `Are you sure you want to unregister Browser ${browserID}?`,
      {
        right_button: "Yes",
        right_button_action: unregisterCallback,
        left_button: "No",
      }
    );
  }

  register_cast() {
    window.browser_mod.connection.sendMessage({
      type: "browser_mod/register",
      browserID: "CAST",
    });
  }

  render() {
    return html`
      <ha-card header="Registered Browsers" outlined>
        <div class="card-content">
          ${Object.keys(window.browser_mod.browsers).map((d) => {
            const browser = window.browser_mod.browsers[d];
            return html` <ha-settings-row>
              <span slot="heading"> ${d} </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${browser.last_seen}
                ></ha-relative-time>
              </span>
              ${browser.meta && browser.meta !== "default"
                ? html`
                    <a href="config/devices/device/${browser.meta}">
                      <ha-icon-button>
                        <ha-icon .icon=${"mdi:devices"}></ha-icon>
                      </ha-icon-button>
                    </a>
                  `
                : ""}
              <ha-icon-button .browserID=${d} @click=${this.unregister_browser}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </ha-icon-button>
            </ha-settings-row>`;
          })}
        </div>
        ${window.browser_mod.browsers["CAST"] === undefined
          ? html`
              <div class="card-actions">
                <mwc-button @click=${this.register_cast}>
                  Register CAST Browser
                </mwc-button>
              </div>
            `
          : ""}
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-icon-button > * {
        display: flex;
        color: var(--primary-text-color);
      }
    `;
  }
}
customElements.define(
  "browser-mod-registered-browsers-card",
  BrowserModRegisteredBrowsersCard
);
