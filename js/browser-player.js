import { LitElement, html, css } from "card-tools/src/lit-element";
import { deviceID } from "card-tools/src/deviceID"
import { moreInfo } from "card-tools/src/more-info"
import "./browser-player-editor.js"

const bases = [customElements.whenDefined('home-assistant-main'), customElements.whenDefined('hui-view')];
Promise.race(bases).then(() => {

const LitElement = customElements.get('home-assistant-main')
  ? Object.getPrototypeOf(customElements.get('home-assistant-main'))
  : Object.getPrototypeOf(customElements.get('hui-view'));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class BrowserPlayer extends LitElement {

  static get properties() {
    return {
      hass: {},
    };
  }

  static getConfigElement() {
    return document.createElement("browser-player-editor");
  }
  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    this._config = config;
  }
  handleMute(ev) {
    window.browser_mod.mute({});
  }
  handleVolumeChange(ev) {
    const vol = parseFloat(ev.target.value);
    window.browser_mod.set_volume({volume_level: vol});
  }
  handleMoreInfo(ev) {
    moreInfo("media_player."+window.browser_mod.entity_id);
  }
  handlePlayPause(ev) {
    if (window.browser_mod.player.paused)
      window.browser_mod.play({});
    else
      window.browser_mod.pause({});
  }

  render() {
    if(!window.browser_mod) {
      window.setTimeout(() => this.requestUpdate(), 100);
      return html``;
    }
    const player = window.browser_mod.player;
    return html`
    <ha-card>
      <div class="card-content">
      <ha-icon-button
        .icon=${player.muted
          ? "mdi:volume-off"
          : "mdi:volume-high"
        }
        @click=${this.handleMute}
      ></ha-icon-button>
      <ha-paper-slider
        min=0
        max=1
        step=0.01
        ?disabled=${player.muted}
        value=${player.volume}
        @change=${this.handleVolumeChange}
      ></ha-paper-slider>

      ${window.browser_mod.player_state === "stopped"
        ? html`<div class="placeholder"></div>`
        : html`
          <paper-icon-button
            .icon=${player.paused
              ? "mdi:play"
              : "mdi:pause"
            }
            @click=${this.handlePlayPause}
            highlight
          ></paper-icon-button>
          `}
      <paper-icon-button
        .icon=${"mdi:settings"}
        @click=${this.handleMoreInfo}
      ></paper-icon-button>
      </div>

      <div class="device-id">
      ${deviceID}
      </div>

    </ha-card>
    `;
  }

  static get styles() {
    return css`
    paper-icon-button[highlight] {
      color: var(--accent-color);
    }
    .card-content {
      display: flex;
      justify-content: center;
    }
    .placeholder {
      width: 24px;
      padding: 8px;
    }
    .device-id {
      opacity: 0.7;
      font-size: xx-small;
      margin-top: -10px;
      user-select: all;
      -webkit-user-select: all;
      -moz-user-select: all;
      -ms-user-select: all;
    }
    `
  }

}

if(!customElements.get("browser-player"))
  customElements.define("browser-player", BrowserPlayer);
});
