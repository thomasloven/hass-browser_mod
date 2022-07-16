import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { loadDevTools } from "./helpers";

const bmWindow = window as any;

loadDevTools().then(() => {
  class BrowserModPanel extends LitElement {
    @property() hass;
    @property() narrow;
    @property() connection;

    toggleRegister() {
      if (!window.browser_mod?.connected) return;
      window.browser_mod.registered = !window.browser_mod.registered;
    }
    changeDeviceID(ev) {
      window.browser_mod.deviceID = ev.target.value;
    }
    toggleCameraEnabled() {
      window.browser_mod.cameraEnabled = !window.browser_mod.cameraEnabled;
    }

    unregister_device(ev) {
      const deviceID = ev.currentTarget.deviceID;

      const unregisterCallback = () => {
        console.log(deviceID, window.browser_mod.deviceID);
        if (deviceID === window.browser_mod.deviceID) {
          console.log("Unregister self");
          window.browser_mod.registered = false;
        } else {
          window.browser_mod.connection.sendMessage({
            type: "browser_mod/unregister",
            deviceID,
          });
        }
      };

      window.browser_mod.showPopup(
        "Unregister device",
        `Are you sure you want to unregister device ${deviceID}?`,
        {
          primary_action: "Yes",
          secondary_action: "No",
          callbacks: {
            primary_action: unregisterCallback,
          },
        }
      );
    }

    firstUpdated() {
      window.browser_mod.addEventListener("browser-mod-config-update", () =>
        this.requestUpdate()
      );
    }

    render() {
      return html`
        <ha-app-layout>
          <app-header slot="header" fixed>
            <app-toolbar>
              <ha-menu-button
                .hass=${this.hass}
                .narrow=${this.narrow}
              ></ha-menu-button>
              <div main-title>Browser Mod Settings</div>
            </app-toolbar>
          </app-header>

          <ha-config-section .narrow=${this.narrow} full-width>
            <ha-card outlined>
              <h1 class="card-header">
                <div class="name">This Browser</div>
                ${bmWindow.browser_mod?.connected
                  ? html`
                      <ha-icon
                        class="icon"
                        .icon=${"mdi:check-circle-outline"}
                        style="color: var(--success-color, green);"
                      ></ha-icon>
                    `
                  : html`
                      <ha-icon
                        class="icon"
                        .icon=${"mdi:circle-outline"}
                        style="color: var(--error-color, red);"
                      ></ha-icon>
                    `}
              </h1>
              <div class="card-content">
                <p>Settings that apply to this browser.</p>
                <p>
                  It is strongly recommended to refresh your browser window
                  after any change to those settings.
                </p>
              </div>
              <div class="card-content">
                <ha-settings-row>
                  <span slot="heading">Enable</span>
                  <span slot="description"
                    >Enable this browser as a Device in Home Assistant</span
                  >
                  <ha-switch
                    .checked=${window.browser_mod?.registered}
                    @change=${this.toggleRegister}
                  ></ha-switch>
                </ha-settings-row>

                <ha-settings-row>
                  <span slot="heading">DeviceID</span>
                  <span slot="description"
                    >A unique identifier for this browser-device
                    combination.</span
                  >
                  <ha-textfield
                    .value=${window.browser_mod?.deviceID}
                    @change=${this.changeDeviceID}
                  ></ha-textfield>
                </ha-settings-row>

                <ha-settings-row>
                  <span slot="heading">Enable camera</span>
                  <span slot="description"
                    >Get camera input from this device (hardware
                    dependent)</span
                  >
                  <ha-switch
                    .checked=${window.browser_mod?.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                  ></ha-switch>
                </ha-settings-row>
              </div>
            </ha-card>

            <ha-card header="Registered devices" outlined>
              <div class="card-content">
                ${Object.keys(window.browser_mod.devices).map(
                  (d) => html` <ha-settings-row>
                    <span slot="heading"> ${d} </span>
                    <span slot="description">
                      Last connected:
                      <ha-relative-time
                        .hass=${this.hass}
                        .datetime=${window.browser_mod.devices[d].last_seen}
                      ></ha-relative-time>
                    </span>
                    <ha-icon-button
                      .deviceID=${d}
                      @click=${this.unregister_device}
                    >
                      <ha-icon .icon=${"mdi:delete"}></ha-icon>
                    </ha-icon-button>
                  </ha-settings-row>`
                )}
              </div>
            </ha-card>

            <ha-card outlined header="Tweaks">
              <div class="card-content">
                <ha-settings-row>
                  <span slot="heading">User sidebar</span>
                  <span slot="description"
                    >Save sidebar as default for current user
                    (${this.hass.user.name})</span
                  >
                  <mwc-button>Save</mwc-button>
                </ha-settings-row>
                <ha-settings-row>
                  <span slot="heading">Global sidebar</span>
                  <span slot="description"
                    >Save sidebar as default for all users</span
                  >
                  <mwc-button>Save</mwc-button>
                </ha-settings-row>
              </div>
            </ha-card>
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
          .card-header {
            display: flex;
            justify-content: space-between;
          }
          .card-actions {
            display: flex;
          }
          .spacer {
            flex-grow: 1;
          }
          ha-textfield {
            width: 250px;
            display: block;
            margin-top: 8px;
          }
          .option {
            display: flex;
            margin-top: 16px;
          }
          .option h3 {
            flex-grow: 1;
            margin: 0;
          }
          .option ha-switch {
            margin-top: 0.25em;
            margin-right: 7px;
            margin-left: 0.5em;
          }
          ha-icon-button > * {
            display: flex;
          }
        `,
      ];
    }
  }

  customElements.define("browser-mod-panel", BrowserModPanel);
});
