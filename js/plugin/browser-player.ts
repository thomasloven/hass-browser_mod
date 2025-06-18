import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

import "./browser-player-editor.ts";

import "./types";

class BrowserPlayer extends LitElement {
  @property() hass;
  @property({ attribute: "edit-mode", reflect: true }) editMode;

  static getConfigElement() {
    return document.createElement("browser-player-editor");
  }
  static getStubConfig() {
    return {};
  }

  _reconnect() {
    if (!window.browser_mod?.registered) {
      if (this.parentElement.localName === "hui-card-preview") {
        this.removeAttribute("hidden");
      } else {
        this.setAttribute("hidden", "");
      }
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    await window.browser_mod?.connectionPromise;
    this._reconnect();
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
      window.browser_mod?._audio_player?.addEventListener(event, () =>
        this.requestUpdate()
      );
    window.browser_mod?._video_player?.addEventListener(event, () =>
      this.requestUpdate()
    );
    window.browser_mod?.addEventListener("browser-mod-ready", () =>
      this._reconnect()
    );
  }
  handleMute(ev) {
    window.browser_mod.player.muted = !window.browser_mod.player.muted;
  }
  handleVolumeChange(ev) {
    const volume_level = parseFloat(ev.target.value);
    window.browser_mod.player.volume = volume_level / 100;
  }
  handleMoreInfo(ev) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          entityId: window.browser_mod.browserEntities?.player,
        },
      })
    );
  }
  handlePlayPause(ev) {
    if (
      !window.browser_mod.player.src ||
      window.browser_mod.player.paused ||
      window.browser_mod.player.ended
    ) {
      window.browser_mod.player.play();
      window.browser_mod._show_video_player();
    } else {
      window.browser_mod.player.pause();
    }
  }
  handleVolumeDown(ev) {
    window.browser_mod.player.volume = Math.max(window.browser_mod.player.volume - 0.1, 0);
  }
  handleVolumeUp(ev) {
    window.browser_mod.player.volume = Math.min(window.browser_mod.player.volume + 0.1, 1);
  }
  handleReload(ev) {
    const wasPlaying = window.browser_mod.player.src && !window.browser_mod.player.paused && !window.browser_mod.player.ended
    window.browser_mod.player.load();
    if (wasPlaying) {
      window.browser_mod.player.play();
    }
  }

  render() {
    if (!window.browser_mod) {
      window.setTimeout(() => this.requestUpdate(), 100);
      return html``;
    }
    if (!window.browser_mod?.registered) {
      return html`
        <ha-card>
          <ha-alert> This browser is not registered to Browser Mod. </ha-alert>
        </ha-card>
      `;
    }
    return html`
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${window.browser_mod.player.muted
                ? "mdi:volume-off"
                : "mdi:volume-high"}
            ></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${this.handleVolumeDown}>
            <ha-icon .icon=${"mdi:volume-minus"}></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${this.handleVolumeUp}>
            <ha-icon .icon=${"mdi:volume-plus"}></ha-icon>
          </ha-icon-button>
          <ha-slider
            labeled
            min="0"
            max="100"
            step="1"
            ?disabled=${window.browser_mod.player.muted}
            value=${window.browser_mod.player.volume * 100}
            @change=${this.handleVolumeChange}
          ></ha-slider>

          ${window.browser_mod.player_state === "stopped"
            ? html`<div class="placeholder"></div>`
            : html`
                <ha-icon-button @click=${this.handlePlayPause} highlight>
                  <ha-icon
                    .icon=${!window.browser_mod.player.src ||
                    window.browser_mod.player.ended ||
                    window.browser_mod.player.paused
                      ? "mdi:play"
                      : "mdi:pause"}
                  ></ha-icon>
                </ha-icon-button>
              `}
          <ha-icon-button @click=${this.handleReload}>
            <ha-icon .icon=${"mdi:reload"}></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${this.handleMoreInfo}>
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
          </ha-icon-button>
        </div>

        <div class="browser-id">${window.browser_mod.browserID}</div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host([hidden]) {
        display: none;
      }
      :host([edit-mode="true"]) {
        display: block !important;
      }
      paper-icon-button[highlight] {
        color: var(--accent-color);
      }
      .card-content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .placeholder {
        width: 24px;
        padding: 8px;
      }
      .browser-id {
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
      ha-slider {
        flex-grow: 2;
        flex-shrink: 2;
        width: 100%;
      }
    `;
  }
}

if (!customElements.get("browser-player"))
  customElements.define("browser-player", BrowserPlayer);
