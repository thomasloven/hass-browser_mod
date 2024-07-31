import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

import "./popup-card-editor";

class PopupCard extends LitElement {
  @property() hass;
  @state() _config;
  @property({ attribute: "edit-mode", reflect: true }) editMode;
  @state() _element;

  static getConfigElement() {
    return document.createElement("popup-card-editor");
  }

  static getStubConfig(hass, entities) {
    const entity = entities[0];
    return {
      entity,
      title: "Custom popup",
      dismissable: true,
      card: { type: "markdown", content: "This replaces the more-info dialog" },
    };
  }

  constructor() {
    super();
    this.popup = this.popup.bind(this);
  }

  setConfig(config) {
    this._config = config;
    (async () => {
      const ch = await window.loadCardHelpers();
      this._element = await ch.createCardElement(config.card);
      this._element.hass = this.hass;
    })();
  }

  async connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hass-more-info", this.popup);

    if (this.parentElement.localName === "hui-card-preview") {
      this.editMode = true;
    }
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("hass-more-info", this.popup);
  }

  popup(ev: CustomEvent) {
    if (
      ev.detail?.entityId === this._config.entity &&
      !ev.detail?.ignore_popup_card
    ) {
      ev.stopPropagation();
      ev.preventDefault();
      const config = { ...this._config };
      delete config.card;

      window.browser_mod?.service("popup", {
        content: this._config.card,
        ...this._config,
      });
      setTimeout(
        () =>
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              cancelable: false,
              detail: { entityId: "" },
            })
          ),
        10
      );
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("hass")) {
      if (this._element) this._element.hass = this.hass;
    }
  }

  getCardSize() {
    return 0;
  }

  render() {
    if (!this.editMode) return html``;
    return html` <ha-card>
      <div class="app-toolbar">
        ${this._config.dismissable
          ? html`
              <ha-icon-button>
                <ha-icon .icon=${"mdi:close"}></ha-icon>
              </ha-icon-button>
            `
          : ""}
        <div class="main-title">${this._config.title}</div>
      </div>
      ${this._element}
      <style>
        :host {
        ${this._config.style}
        }
      </style>
      ${this._config.right_button !== undefined ||
      this._config.left_button !== undefined
        ? html`
            <footer class="mdc-dialog__actions">
              <span>
                ${this._config.left_button !== undefined
                  ? html`
                      <mwc-button
                        .label=${this._config.left_button}
                      ></mwc-button>
                    `
                  : ""}
              </span>
              <span>
                ${this._config.right_button !== undefined
                  ? html`
                      <mwc-button
                        .label=${this._config.right_button}
                      ></mwc-button>
                    `
                  : ""}
              </span>
            </footer>
          `
        : ""}
    </ha-card>`;
  }

  static get styles() {
    return css`
      :host {
        display: none !important;
      }
      :host([edit-mode="true"]) {
        display: block !important;
        border: 1px solid var(--primary-color);
      }
      ha-card {
        background-color: var(
          --popup-background-color,
          var(--ha-card-background, var(--card-background-color, white))
        );
      }
      .app-toolbar {
        color: var(--primary-text-color);
        background-color: var(
          --popup-header-background-color,
          var(--popup-background-color, --sidebar-background-color)
        );
        display: var(--layout-horizontal_-_display);
        flex-direction: var(--layout-horizontal_-_flex-direction);
        align-items: var(--layout-center_-_align-items);
        height: 64px;
        padding: 0 16px;
        font-size: var(--app-toolbar-font-size, 20px);
      }
      ha-icon-button > * {
        display: flex;
      }
      .main-title {
        margin-left: 16px;
        line-height: 1.3em;
        max-height: 2.6em;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mdc-dialog__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 52px;
        margin: 0px;
        padding: 8px;
        border-top: 1px solid transparent;
      }
    `;
  }
}

(async () => {
  while (!window.browser_mod) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  await window.browser_mod.connectionPromise;

  if (!customElements.get("popup-card"))
    customElements.define("popup-card", PopupCard);
})();
