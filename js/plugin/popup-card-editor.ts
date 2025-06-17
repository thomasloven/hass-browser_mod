import { LitElement, html, css, PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { hass_base_el, loadHaForm, selectTree } from "../helpers";
import { ObjectSelectorMonitor } from "../object-selector-monitor";

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
        name: "right_button_close",
        label: "Right button closes popup",
		default: true,
        selector: { boolean: {} },
      },
      {
        name: "left_button_close",
        label: "Left button closes popup",
		default: true,
        selector: { boolean: {} },
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
    name: "popup_card_all_views",
    label: "Popup card is available for use in all views",
    default: false,
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
  @state() _settingsValid = true;
  @state() _showErrors = false;

  @query("hui-card-element-editor") private _cardEditorEl?;

  private _objectSelectorMonitor: ObjectSelectorMonitor;

  get settingsValid() {
    return this._settingsValid
  }

  get showErrors() {
    return this._showErrors;
  }

  setConfig(config) {
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    loadHaForm();
    this._objectSelectorMonitor = new ObjectSelectorMonitor(
      this,
      (value: boolean) => { this._settingsValid = value },
      (value: boolean) => { this._showErrors = value }
    );
  }

  firstUpdated(changedProperties: PropertyValues) {
    this.updateComplete.then(async () => {
      this._objectSelectorMonitor.startMonitoring();
      const base = await hass_base_el();
      const saveButton: HTMLElement = await selectTree(base?.shadowRoot, "hui-dialog-edit-card $ [slot='primaryAction']>mwc-button:nth-child(2) $ button");
      saveButton?.addEventListener("click", this._handleClickAwayFromSettings.bind(this));
      const showCodeEditorButton: HTMLElement = await selectTree(base?.shadowRoot, "hui-dialog-edit-card $ [slot='secondaryAction'] $ button");
      showCodeEditorButton?.addEventListener("click", this._handleClickAwayFromSettings.bind(this));
    });
  }

  override async getUpdateComplete(): Promise<boolean> {
    // wait for ha-form to be ready
    const formReady = new Promise((resolve) => {
      const checkReady = () => {
        const form: LitElement = this.shadowRoot?.querySelector("ha-form");
        if (form) {
          resolve(form.updateComplete);
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
    return Promise.all([formReady, super.getUpdateComplete()]).then(() => true)
  }

  _handleClickAwayFromSettings(ev: MouseEvent) {
    if (!this._settingsValid) {
      ev.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("hass-notification", {
          detail: {
            message: `Settings are not valid. Please fix the errors before
              before continuing.`,
          },
          bubbles: true,
          composed: true,
        })
      )
      return;
    }
  }
  
  _handleSwitchTab(ev: CustomEvent) {
    this._selectedTab = ev.detail.name == "settings" ? 0 : 1;
    if (this._selectedTab === 1) { // 1 is the card tab
      this._objectSelectorMonitor.stopMonitoring();
    } else {
      // setTimeout is used to ensure that the card editor is cleared
      // before the object selectors are monitored again.
      // This is necessary because the card editor will have its own ha-form
      setTimeout(() => this._objectSelectorMonitor.startMonitoring(), 0);
    }
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
            <sl-tab slot="nav" .panel=${"card"} .active=${this._selectedTab==1} @click=${this._handleClickAwayFromSettings}>Card</sl-tab>
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
      <ha-alert
        .hass=${this.hass}
        alert-type="error"
        .hidden=${!this._showErrors}
        >Settings are not valid. Please check the following fields for errors:
        <ul>
          ${this._objectSelectorMonitor.objectSelectors.map(
            (s) => (s.isValid === false) ? html`<li>${s.label}</li>` : ""
          )}
        </ul>
      </ha-alert>
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
