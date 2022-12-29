import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

class BrowserModRegisteredBrowsersCard extends LitElement {
  @property() hass;

  @property() _entity_registry?: any[];

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.requestUpdate()
    );
    this._fetch_entity_registry();
  }

  async _fetch_entity_registry() {
    if (this._entity_registry) return;

    this._entity_registry = await this.hass.callWS({
      type: "config/device_registry/list",
    });
  }

  _find_entity(browserID) {
    if (!this._entity_registry) return undefined;
    return this._entity_registry.find(
      (v) =>
        JSON.stringify(v?.identifiers?.[0]) ===
        JSON.stringify(["browser_mod", browserID])
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

  toggle_lock_browser(ev) {
    const browserID = ev.currentTarget.browserID;
    const browser = window.browser_mod.browsers[browserID];
    window.browser_mod.connection.sendMessage({
      type: "browser_mod/register",
      browserID,
      data: {
        ...browser,
        locked: !browser.locked,
      },
    });
  }

  toggle_auto_register(ev) {
    if (window.browser_mod?.global_settings["autoRegister"])
      window.browser_mod.setSetting("global", null, {
        autoRegister: undefined,
      });
    else window.browser_mod.setSetting("global", null, { autoRegister: true });
  }
  toggle_lock_register(ev) {
    if (window.browser_mod?.global_settings["lockRegister"])
      window.browser_mod.setSetting("global", null, {
        lockRegister: undefined,
      });
    else
      window.browser_mod.setSetting("global", null, {
        lockRegister: true,
        autoRegister: undefined,
      });
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
          <ha-settings-row>
            <span slot="heading">Auto-register</span>
            <span slot="description">
              Automatically register all new Browsers
            </span>
            <ha-switch
              .checked=${window.browser_mod?.global_settings["autoRegister"] ===
              true}
              @change=${this.toggle_auto_register}
            ></ha-switch>
          </ha-settings-row>
          <ha-settings-row>
            <span slot="heading">Lock register</span>
            <span slot="description">
              Disable registering or unregistering of all Browsers
            </span>
            <ha-switch
              .checked=${window.browser_mod?.global_settings["lockRegister"] ===
              true}
              @change=${this.toggle_lock_register}
            ></ha-switch>
          </ha-settings-row>

          ${Object.keys(window.browser_mod.browsers).map((d) => {
            const browser = window.browser_mod.browsers[d];
            const device = this._find_entity(d);
            return html` <ha-settings-row>
              <span slot="heading">
                ${d} ${device?.name_by_user ? `(${device.name_by_user})` : ""}
              </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${browser.last_seen}
                ></ha-relative-time>
              </span>
              ${device
                ? html`
                    <a href="config/devices/device/${device.id}">
                      <ha-icon-button>
                        <ha-icon .icon=${"mdi:devices"}></ha-icon>
                      </ha-icon-button>
                    </a>
                  `
                : ""}
              <ha-icon-button
                .browserID=${d}
                @click=${this.toggle_lock_browser}
              >
                <ha-icon
                  .icon=${browser.locked ? "mdi:lock" : "mdi:lock-open-variant"}
                ></ha-icon>
              </ha-icon-button>
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
