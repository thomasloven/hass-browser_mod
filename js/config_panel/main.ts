import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { loadDevTools } from "./helpers";

const bmWindow = window as any;

loadDevTools().then(() => {
  class BrowserModPanel extends LitElement {
    @property() hass;
    @property() narrow;
    @property() connection;
    @property() dirty = false;

    toggleRegister() {
      if (!window.browser_mod?.connected) return;
      window.browser_mod.registered = !window.browser_mod.registered;
      this.dirty = true;
    }
    changeBrowserID(ev) {
      window.browser_mod.browserID = ev.target.value;
      this.dirty = true;
    }
    toggleCameraEnabled() {
      window.browser_mod.cameraEnabled = !window.browser_mod.cameraEnabled;
      this.dirty = true;
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

    firstUpdated() {
      window.browser_mod.addEventListener("browser-mod-config-update", () =>
        this.requestUpdate()
      );
    }

    getFullySettings() {
      if (!window.browser_mod.fully) return null;
      const retval = [];
      const wcs = [];
      // Web Content Settings
      // Autoplay Videos
      if (window.fully.getBooleanSetting("autoplayVideos") !== "true")
        wcs.push(html`<li>Autoplay Videos</li>`);
      // Autoplay Audio
      if (window.fully.getBooleanSetting("autoplayAudio") !== "true")
        wcs.push(html`<li>Autoplay Audio</li>`);
      // Enable Webcam Access (PLUS)
      if (window.fully.getBooleanSetting("webcamAccess") !== "true")
        wcs.push(html`<li>Enable Webcam Access (PLUS)</li>`);

      if (wcs.length !== 0) {
        retval.push(html`<li>Web Content Settings</li>
          <ul>
            ${wcs}
          </ul>`);
      }

      // Advanced Web Settings
      // Enable JavaScript Interface (PLUS)
      if (window.fully.getBooleanSetting("websiteIntegration") !== "true")
        retval.push(html`<li>Advanced Web Settings</li>
          <ul>
            <li>Enable JavaScript Interface (PLUS)</li>
          </ul>`);

      // Device Management
      // Keep Screen On
      if (window.fully.getBooleanSetting("keepScreenOn") !== "true")
        retval.push(html`<li>Device Management</li>
          <ul>
            <li>Keep Screen On</li>
          </ul>`);

      // Power Settings
      // Prevent from Sleep while Screen Off
      if (
        window.fully.getBooleanSetting("preventSleepWhileScreenOff") !== "true"
      )
        retval.push(html`<li>Power Settings</li>
          <ul>
            <li>Prevent from Sleep while Screen Off</li>
          </ul>`);

      const md = [];
      // Motion Detection (PLUS)
      // Enable Visual Motion Detection
      if (window.fully.getBooleanSetting("motionDetection") !== "true")
        md.push(html`<li>Enable Visual Motion Detection</li>`);
      // Turn Screen On on Motion
      if (window.fully.getBooleanSetting("screenOnOnMotion") !== "true")
        md.push(html`<li>Turn Screen On on Motion</li>`);
      // Exit Screensaver on Motion
      if (window.fully.getBooleanSetting("stopScreensaverOnMotion") !== "true")
        md.push(html`<li>Exit Screensaver on Motion</li>`);

      if (md.length !== 0) {
        retval.push(html`<li>Motion Detection (PLUS)</li>
          <ul>
            ${md}
          </ul>`);
      }

      // Remote Administration (PLUS)
      // Enable Remote Administration
      if (window.fully.getBooleanSetting("remoteAdmin") !== "true")
        retval.push(html`<li>Remote Administration (PLUS)</li>
          <ul>
            <li>Enable Remote Administration</li>
          </ul>`);

      return retval.length ? retval : null;
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
                ${this.dirty
                  ? html`
                      <ha-alert alert-type="warning">
                        It is strongly recommended to refresh your browser
                        window after changing any of the settings in this box.
                      </ha-alert>
                    `
                  : ""}
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
                  <span slot="heading">BrowserID</span>
                  <span slot="description"
                    >A unique identifier for this browser-device
                    combination.</span
                  >
                  <ha-textfield
                    .value=${window.browser_mod?.browserID}
                    @change=${this.changeBrowserID}
                  ></ha-textfield>
                </ha-settings-row>

                ${window.browser_mod?.registered
                  ? html`
                      ${this.hass.suspendWhenHidden
                        ? html`<ha-alert
                            alert-type="warning"
                            title="Auto closing connection"
                          >
                            Home Assistant will close the websocket connection
                            to the server automatically after 5 minutes of
                            inactivity.<br /><br />
                            While decreasing network trafic and memory usage,
                            this may cause problems for browser_mod operation.
                            <br /><br />
                            If you find that some things stop working for this
                            Browser after a time, try going to your
                            <a
                              href="/profile"
                              style="text-decoration: underline; color: var(--primary-color);"
                              >Profile Settings</a
                            >
                            and disabling the option
                            "${this.hass.localize(
                              "ui.panel.profile.suspend.header"
                            ) || "Automatically close connection"}".
                          </ha-alert>`
                        : ""}
                      <ha-settings-row>
                        <span slot="heading">Enable camera</span>
                        <span slot="description"
                          >Get camera input from this browser (hardware
                          dependent)</span
                        >
                        <ha-switch
                          .checked=${window.browser_mod?.cameraEnabled}
                          @change=${this.toggleCameraEnabled}
                        ></ha-switch>
                      </ha-settings-row>
                      <ha-alert title="Interaction requirement">
                        For security reasons many browsers require the user to
                        interact with a webpage before allowing audio playback
                        or video capture. This may affect the
                        <code>media_player</code> and
                        <code>camera</code> components of Browser Mod.
                        <br /><br />

                        If you ever see a
                        <ha-icon icon="mdi:gesture-tap"></ha-icon> symbol at the
                        bottom right corner of the screen, please tap or click
                        anywhere on the page. This should allow Browser Mod to
                        work again.
                      </ha-alert>
                      ${window.browser_mod?.fully && this.getFullySettings()
                        ? html` <ha-alert title="FullyKiosk Browser">
                            You are using FullyKiosk Browser. It is recommended
                            to enable the following settings:
                            <ul>
                              ${this.getFullySettings()}
                            </ul>
                          </ha-alert>`
                        : ""}
                    `
                  : ""}
              </div>
            </ha-card>

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
                    <ha-icon-button
                      .browserID=${d}
                      @click=${this.unregister_browser}
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
