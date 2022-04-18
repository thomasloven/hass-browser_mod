import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

import { deviceID, setDeviceID } from "card-tools/src/deviceID";
import { fireEvent } from "card-tools/src/event";

import "./browser-player-editor.ts";

import "./types";

class BrowserPlayer extends LitElement {
  @property() hass;

  static getConfigElement() {
    return document.createElement("browser-player-editor");
  }
  static getStubConfig() {
    return {};
  }

  async setConfig(config) {
    while (!window.browser_mod) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    for (const event of [
      "play",
      "pause",
      "ended",
      "volumechange",
      "canplay",
      "loadeddata",
    ])
      window.browser_mod.player.addEventListener(event, () =>
        this.requestUpdate()
      );
  }
  handleMute(ev) {
    window.browser_mod.player_mute();
  }
  handleVolumeChange(ev) {
    const vol = parseFloat(ev.target.value);
    window.browser_mod.player_set_volume(vol);
  }
  handleMoreInfo(ev) {
    fireEvent(
      "hass-more-info",
      { entityId: `media_player.${window.browser_mod.entity_id}` },
      this
    );
  }
  handlePlayPause(ev) {
    if (window.browser_mod.player.paused) window.browser_mod.player_play();
    else window.browser_mod.player_pause();
  }
  setDeviceID() {
    const newID = prompt("Set deviceID", deviceID);
    if (newID !== deviceID) {
      setDeviceID(newID);
      this.requestUpdate();
    }
  }

  render() {
    if (!window.browser_mod) {
      window.setTimeout(() => this.requestUpdate(), 100);
      return html``;
    }
    const player = window.browser_mod.player;
    return html`
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${player.muted ? "mdi:volume-off" : "mdi:volume-high"}
            ></ha-icon>
          </ha-icon-button>
          <ha-slider
            min="0"
            max="1"
            step="0.01"
            ?disabled=${player.muted}
            value=${player.volume}
            @change=${this.handleVolumeChange}
          ></ha-slider>

          ${window.browser_mod.player_state === "stopped"
            ? html`<div class="placeholder"></div>`
            : html`
                <ha-icon-button @click=${this.handlePlayPause} highlight>
                  <ha-icon
                    .icon=${player.paused ? "mdi:play" : "mdi:pause"}
                  ></ha-icon>
                </ha-icon-button>
              `}
          <ha-icon-button @click=${this.handleMoreInfo}>
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
          </ha-icon-button>
        </div>

        <div class="device-id" @click=${this.setDeviceID}>${deviceID}</div>
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
      ha-icon-button ha-icon {
        display: flex;
      }
    `;
  }
}

(async () => {
  while (
    (customElements.get("home-assistant") ?? customElements.get("hc-main")) ===
    undefined
  )
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  if (!customElements.get("browser-player"))
    customElements.define("browser-player", BrowserPlayer);
})();
