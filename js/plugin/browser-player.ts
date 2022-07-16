import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

import "./browser-player-editor.ts";

import "./types";

class BrowserPlayer extends LitElement {
  @property() hass;

  player;

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
    this.player = window.browser_mod.player;

    for (const event of [
      "play",
      "pause",
      "ended",
      "volumechange",
      "canplay",
      "loadeddata",
    ])
      this.player.addEventListener(event, () => this.requestUpdate());
  }
  handleMute(ev) {
    this.player.muted = !this.player.muted;
  }
  handleVolumeChange(ev) {
    const volume_level = parseFloat(ev.target.value);
    this.player.volume = volume_level;
  }
  handleMoreInfo(ev) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          entityId: window.browser_mod.deviceEntities?.player,
        },
      })
    );
  }
  handlePlayPause(ev) {
    if (!this.player.src || this.player.paused || this.player.ended)
      this.player.play();
    else this.player.pause();
  }

  render() {
    if (!window.browser_mod) {
      window.setTimeout(() => this.requestUpdate(), 100);
      return html``;
    }
    return html`
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${this.player.muted ? "mdi:volume-off" : "mdi:volume-high"}
            ></ha-icon>
          </ha-icon-button>
          <ha-slider
            min="0"
            max="1"
            step="0.01"
            ?disabled=${this.player.muted}
            value=${this.player.volume}
            @change=${this.handleVolumeChange}
          ></ha-slider>

          ${window.browser_mod.player_state === "stopped"
            ? html`<div class="placeholder"></div>`
            : html`
                <ha-icon-button @click=${this.handlePlayPause} highlight>
                  <ha-icon
                    .icon=${!this.player.src ||
                    this.player.ended ||
                    this.player.paused
                      ? "mdi:play"
                      : "mdi:pause"}
                  ></ha-icon>
                </ha-icon-button>
              `}
          <ha-icon-button @click=${this.handleMoreInfo}>
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
          </ha-icon-button>
        </div>

        <div class="device-id">${window.browser_mod.deviceID}</div>
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
  while (!window.browser_mod) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  await window.browser_mod.connectionPromise;

  if (!customElements.get("browser-player"))
    customElements.define("browser-player", BrowserPlayer);
})();
