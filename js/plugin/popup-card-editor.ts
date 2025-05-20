import { LitElement, html, css } from "lit";
import { property, query, state } from "lit/decorators.js";
import { loadHaForm } from "../helpers";

const configSchema = [
  {
    name: "entity",
    label: "Entity",
    selector: { entity: {} },
  },
  {
    name: "title",
    label: "Title",
    selector: { text: {} },
  },
  {
    name: "size",
    selector: {
      select: { mode: "dropdown", options: ["normal", "classic", "wide", "fullscreen"] },
    },
  },
  {
    type: "grid",
    schema: [
      {
        name: "right_button",
        label: "Right button",
        selector: { text: {} },
      },
      {
        name: "left_button",
        label: "Left button",
        selector: { text: {} },
      },
    ],
  },
  {
    type: "grid",
    schema: [
      {
        name: "right_button_action",
        label: "Right button action",
        selector: { object: {} },
      },
      {
        name: "left_button_action",
        label: "Left button action",
        selector: { object: {} },
      },
    ],
  },
  {
    type: "grid",
    schema: [
      {
        name: "dismissable",
        label: "User dismissable",
        selector: { boolean: {} },
      },
      {
        name: "timeout",
        label: "Auto close timeout (ms)",
        selector: { number: { mode: "box" } },
      },
    ],
  },
  {
    name: "timeout_hide_progress" ,
    label: "Hide timeout progress bar",
    selector: { boolean: {} },
  },
  {
    type: "grid",
    schema: [
      {
        name: "dismiss_action",
        label: "Dismiss action",
        selector: { object: {} },
      },
      {
        name: "timeout_action",
        label: "Timeout action",
        selector: { object: {} },
      },
    ],
  },
  {
    name: "allow_nested_more_info",
    label: "Allow nested more-info dialogs",
    default: true,
    selector: { boolean: {} },
  },
  {
    name: "style",
    label: "CSS style",
    selector: { text: { multiline: true } },
  },
];

class PopupCardEditor extends LitElement {
  @state() _config;

  @property() lovelace;
  @property() hass;

  @state() _selectedTab = 0;
  @state() _cardGUIMode = true;
  @state() _cardGUIModeAvailable = true;

  @query("hui-card-element-editor") private _cardEditorEl?;

  setConfig(config) {
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    loadHaForm();
  }

  _handleSwitchTab(ev: CustomEvent) {
    this._selectedTab = ev.detail.name == "settings" ? 0 : 1;
  }

  _configChanged(ev: CustomEvent) {
    ev.stopPropagation();
    if (!this._config) return;
    this._config = { ...ev.detail.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  _cardConfigChanged(ev: CustomEvent) {
    ev.stopPropagation();
    if (!this._config) return;
    const card = { ...ev.detail.config };
    this._config = { ...this._config, card };
    this._cardGUIModeAvailable = ev.detail.guiModeAvailable;

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _toggleCardMode(ev) {
    this._cardEditorEl?.toggleMode();
  }
  _deleteCard(ev) {
    if (!this._config) return;
    this._config = { ...this._config };
    delete this._config.card;

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }
  _cardGUIModeChanged(ev: CustomEvent) {
    ev.stopPropagation();
    this._cardGUIMode = ev.detail.guiMode;
    this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="toolbar">
          <sl-tab-group
            @sl-tab-show=${this._handleSwitchTab}
          >
            <sl-tab slot="nav" .panel=${"settings"} .active=${this._selectedTab==0}>Settings</sl-tab>
            <sl-tab slot="nav" .panel=${"card"} .active=${this._selectedTab==1}>Card</sl-tab>
          </sl-tab-group>
        </div>
        <div id="editor">
          ${[this._renderSettingsEditor, this._renderCardEditor][
            this._selectedTab
          ].bind(this)()}
        </div>
      </div>
    `;
  }

  _renderSettingsEditor() {
    return html`<div class="box">
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${configSchema}
        .computeLabel=${(s) => s.label ?? s.name}
        @value-changed=${this._configChanged}
      ></ha-form>
    </div>`;
  }

  _renderCardEditor() {
    return html`
      <div class="box cards">
        ${this._config.card
          ? html`
              <div class="toolbar">
                <mwc-button
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${!this._cardEditorEl || this._cardGUIMode
                    ? "Show code editor"
                    : "Show visual editor"}
                </mwc-button>
                <mwc-button
                  .title=${"Change card type"}
                  @click=${this._deleteCard}
                >
                  Change card type
                </mwc-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${this._config.card}
                @config-changed=${this._cardConfigChanged}
                @GUImode-changed=${this._cardGUIModeChanged}
              ></hui-card-element-editor>
            `
          : html`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardConfigChanged}
              ></hui-card-picker>
            `}
      </div>
    `;
  }

  static get styles() {
    return css`
      sl-tab-group {
        margin-bottom: 16px;
      }

      sl-tab {
        flex: 1;
      }

      sl-tab::part(base) {
        width: 100%;
        justify-content: center;
      }
    
      .box {
        margin-top: 8px;
        border: 1px solid var(--divider-color);
        padding: 12px;
      }
      .box .toolbar {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        gap: 8px;
      }
      .gui-mode-button {
        margin-right: auto;
      }
    `;
  }
}

window.addEventListener("browser-mod-bootstrap", async (ev: CustomEvent) => {
  ev.stopPropagation();
  while (!window.browser_mod) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  await window.browser_mod.connectionPromise;

  if (!customElements.get("popup-card-editor")) {
    customElements.define("popup-card-editor", PopupCardEditor);
    (window as any).customCards = (window as any).customCards || [];
    (window as any).customCards.push({
      type: "popup-card",
      name: "Popup card",
      preview: false,
      description:
        "Replace the more-info dialog for a given entity in the view that includes this card. (Browser Mod)",
    });
  }
});
