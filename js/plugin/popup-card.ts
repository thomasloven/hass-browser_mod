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
    if (ev.detail?.entityId === this._config.entity) {
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
              detail: { entityID: "." },
            })
          ),
        50
      );
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("hass")) {
      if (this._element) this._element.hass = this.hass;
    }
  }

  render() {
    if (!this.editMode) return html``;
    return html` <ha-card>
      <div>
        <h2>${this._config.title}</h2>
      </div>
      ${this._element}</ha-card
    >`;
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
      h2 {
        padding-left: 16px;
        padding-top: 16px;
        margin: 0;
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
