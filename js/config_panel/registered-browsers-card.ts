import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { frontendSettingsAdaptiveDialogStyle } from "../helpers";

class BrowserModRegisteredBrowsersCard extends LitElement {
  @property() hass;

  @state() _entity_registry?: any[];

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
      {
        title: "Unregister browser",
        adaptive: true,
        content: `Are you sure you want to unregister Browser ${browserID}?`,
        right_button: "Unregister",
        right_button_variant: "danger",
        right_button_appearance: "accent",
        right_button_action: unregisterCallback,
        left_button: "Cancel",
        left_button_variant: "neutral",
        left_button_appearance: "plain",
        popup_styles: [ { style: "all", styles: frontendSettingsAdaptiveDialogStyle } ],
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
          <ha-row-item>
            <span slot="headline">Auto-register</span>
            <span slot="supporting-text">
              Automatically register all new Browsers
            </span>
            <ha-switch
              slot="end"
              .checked=${window.browser_mod?.global_settings["autoRegister"] ===
              true}
              @change=${this.toggle_auto_register}
            ></ha-switch>
          </ha-row-item>
          <ha-row-item class="lock-register">
            <span slot="headline">Lock register</span>
            <span slot="supporting-text">
              Disable registering or unregistering of all Browsers
            </span>
            <ha-switch
              slot="end"
              .checked=${window.browser_mod?.global_settings["lockRegister"] ===
              true}
              @change=${this.toggle_lock_register}
            ></ha-switch>
          </ha-row-item>

          ${Object.keys(window.browser_mod.browsers).map((d) => {
            const browser = window.browser_mod.browsers[d];
            const device = this._find_entity(d);
            return html` <ha-row-item>
              <span slot="headline">
                ${d} ${device?.name_by_user ? `(${device.name_by_user})` : ""}
              </span>
              <span slot="supporting-text">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${browser.last_seen}
                ></ha-relative-time>
              </span>
              ${device
                ? html`
                    <a href="config/devices/device/${device.id}" slot="end">
                      <ha-icon-button>
                        <ha-icon .icon=${"mdi:devices"}></ha-icon>
                      </ha-icon-button>
                    </a>
                  `
                : ""}
              <ha-icon-button slot="end"
                .browserID=${d}
                @click=${this.toggle_lock_browser}
              >
                <ha-icon
                  .icon=${browser.locked ? "mdi:lock" : "mdi:lock-open-variant"}
                ></ha-icon>
              </ha-icon-button>
              <ha-icon-button slot="end" .browserID=${d} @click=${this.unregister_browser}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </ha-icon-button>
            </ha-row-item>`;
          })}
        </div>
        ${window.browser_mod.browsers["CAST"] === undefined
          ? html`
              <div class="card-actions">
                <ha-button
                  appearance="plain"
                  @click=${this.register_cast}  
                >
                  Register CAST Browser
                </ha-button>
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
      ha-card .card-content {
        --ha-row-item-gap: var(--ha-space-2);
        --ha-row-item-padding-block: var(--ha-space-1);
      }
      .lock-register {
        margin-bottom: var(--ha-space-4);
      }
    `;
  }
}
customElements.define(
  "browser-mod-registered-browsers-card",
  BrowserModRegisteredBrowsersCard
);
