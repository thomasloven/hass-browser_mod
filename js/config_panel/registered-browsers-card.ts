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
      console.log(browserID, window.browser_mod.browserID);
      if (browserID === window.browser_mod.browserID) {
        console.log("Unregister self");
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
      `Are you sure you want to unregister browser ${browserID}?`,
      {
        right_button: "Yes",
        right_button_action: unregisterCallback,
        left_button: "No",
      }
    );
  }

  render() {
    return html`
      <ha-card header="Registered Browsers" outlined>
        <div class="card-content">
          ${Object.keys(window.browser_mod.browsers).map(
            (d) => html` <ha-settings-row>
              <span slot="heading"> ${d} </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${window.browser_mod.browsers[d].last_seen}
                ></ha-relative-time>
              </span>
              <ha-icon-button .browserID=${d} @click=${this.unregister_browser}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </ha-icon-button>
            </ha-settings-row>`
          )}
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-icon-button > * {
        display: flex;
      }
    `;
  }
}
customElements.define(
  "browser-mod-registered-browsers-card",
  BrowserModRegisteredBrowsersCard
);
