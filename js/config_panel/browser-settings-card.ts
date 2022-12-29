import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

class BrowserModRegisteredBrowsersCard extends LitElement {
  @property() hass;
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

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.requestUpdate()
    );
  }

  render() {
    return html`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${window.browser_mod?.connected
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
          ${this.dirty
            ? html`
                <ha-alert alert-type="warning">
                  It is strongly recommended to refresh your browser window
                  after changing any of the settings in this box.
                </ha-alert>
              `
            : ""}
        </div>
        <div class="card-content">
          <ha-settings-row>
            <span slot="heading">Register</span>
            <span slot="description"
              >Enable this browser as a Device in Home Assistant</span
            >
            <ha-switch
              .checked=${window.browser_mod?.registered}
              @change=${this.toggleRegister}
              .disabled=${window.browser_mod?.browser_locked ||
              window.browser_mod?.global_settings["autoRegister"] ||
              window.browser_mod?.global_settings["lockRegister"]}
            ></ha-switch>
          </ha-settings-row>

          <ha-settings-row>
            <span slot="heading">Browser ID</span>
            <span slot="description"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-textfield
              .value=${window.browser_mod?.browserID}
              @change=${this.changeBrowserID}
              .disabled=${window.browser_mod?.browser_locked}
            ></ha-textfield>
          </ha-settings-row>

          ${window.browser_mod?.registered
            ? html`
                ${this._renderSuspensionAlert()}
                <ha-settings-row>
                  <span slot="heading">Enable camera</span>
                  <span slot="description"
                    >Get camera input from this browser (hardware
                    dependent)</span
                  >
                  <ha-switch
                    .checked=${window.browser_mod?.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                    .disabled=${window.browser_mod?.browser_locked}
                  ></ha-switch>
                </ha-settings-row>
                ${window.browser_mod?.cameraError
                  ? html`
                      <ha-alert alert-type="error">
                        Setting up the device camera failed. Make sure you have
                        allowed use of the camera in your browser.
                      </ha-alert>
                    `
                  : ""}
                ${this._renderInteractionAlert()}
                ${this._renderFKBSettingsInfo()}
              `
            : ""}
        </div>
      </ha-card>
    `;
  }

  private _renderSuspensionAlert() {
    if (!this.hass.suspendWhenHidden) return html``;
    return html`
      <ha-alert alert-type="warning" title="Auto closing connection">
        Home Assistant will close the websocket connection to the server
        automatically after 5 minutes of inactivity.<br /><br />
        While decreasing network trafic and memory usage, this may cause
        problems for browser_mod operation.
        <br /><br />
        If you find that some things stop working for this Browser after a time,
        try going to your
        <a
          href="/profile"
          style="text-decoration: underline; color: var(--primary-color);"
          >Profile Settings</a
        >
        and disabling the option
        "${this.hass.localize("ui.panel.profile.suspend.header") ||
        "Automatically close connection"}".
      </ha-alert>
    `;
  }

  private _renderInteractionAlert() {
    return html`
      <ha-alert title="Interaction requirement">
        For privacy reasons many browsers require the user to interact with a
        webpage before allowing audio playback or video capture. This may affect
        the
        <code>media_player</code> and <code>camera</code> components of Browser
        Mod. <br /><br />

        If you ever see a
        <ha-icon
          icon="mdi:gesture-tap"
          style="color: var(--warning-color);"
        ></ha-icon>
        symbol at the bottom right corner of the screen, please tap or click
        anywhere on the page. This should allow Browser Mod to work again.
      </ha-alert>
    `;
  }

  private _renderFKBSettingsInfo() {
    if (!window.browser_mod?.fully || !this.getFullySettings()) return html``;
    return html`
      ${window.browser_mod?.fully && this.getFullySettings()
        ? html` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`
        : ""}
    `;
  }

  private getFullySettings() {
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
    if (window.fully.getBooleanSetting("preventSleepWhileScreenOff") !== "true")
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

  static get styles() {
    return css`
      .card-header {
        display: flex;
        justify-content: space-between;
      }
      ha-textfield {
        width: 250px;
        display: block;
        margin-top: 8px;
      }
    `;
  }
}
customElements.define(
  "browser-mod-browser-settings-card",
  BrowserModRegisteredBrowsersCard
);
