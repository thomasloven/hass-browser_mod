import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { until } from 'lit/directives/until.js';
import { property, state } from "lit/decorators.js";
import { LovelaceGridOptions } from "../types";
import structuredClone from "@ungap/structured-clone";
import { BrowserModBadgeEditor } from "./badge-editor";

export class BrowserModBadge extends LitElement {
  @property() hass;
  @state() _config;
  @property({ type: Boolean, reflect: true}) preview = false;
  @state() _badgeEntities;

  private _badge : Promise<any>;
  private _entitiesResolved: Boolean;

  constructor() {
    super();
    this._badge = window.loadCardHelpers().then((ch) => {
      return ch.createBadgeElement({ type: "entity", entity: "sun.sun" });
    });
    this._badge.then((badge) => {
      // Force load of badge editor
      badge.constructor.getConfigElement();
    });
    this._entitiesResolved = false;
  }

  static getConfigElement() {
    return document.createElement("browser-mod-badge-editor");
  }

  static getStubConfig(hass, entities): Record<string, unknown> {
    return { entity: "browser_entities.browserID" };
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._badgeEntities = window.browser_mod?.browserEntities || {};
    this.addEventListener("browser-mod-entities-update", (ev: CustomEvent) => {
      this._badgeEntities = window.browser_mod?.browserEntities || {};
      this._replaceEntities();
    });
  }
  
  setConfig(config): void {
    this._config = structuredClone(config);
    delete this._config.type;
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has("hass")) {
      if (this._badge) {
        this._badge.then((badge) => badge.hass = this.hass);
      }
    }
    if (changedProperties.has("preview")) {
      if (this._badge) {
        this._badge.then((badge) => badge.preview = this.preview);
      }
    }
    if (changedProperties.has("_config")) {
      this._replaceEntities();
      this._badge.then((badge) => badge.setConfig(this._config));
    }
  }

  private _getEntity(browserEntity: string): string | null {
    return this._haveEntity(browserEntity)
      ? this._badgeEntities[browserEntity.split(".")[1]].entity_id
      : null;
  }
  
  private _haveEntity(browserEntity: string): boolean {
    if (!this._badgeEntities) return false;
    const type = browserEntity.split(".")[1];
    if (!type) return false;
    return Object.keys(this._badgeEntities).some((e) => e === type);
  }

  private _haveEntities(): boolean {
    return this._badgeEntities && Object.keys(this._badgeEntities).length > 0;
  }

  private _replaceEntities(): void {
    if (!this._config || !this._haveEntities()) return;
    const configJSON = JSON.stringify(this._config);
    const replacedConfigJSON = configJSON.replace(
      /\b(browser_entities\.[\w.-]+)\b/g,
      (match) => {
        return this._getEntity(match) ?? match;
      }
    );
    this._entitiesResolved = !replacedConfigJSON.includes("browser_entities.");
    this._config = JSON.parse(replacedConfigJSON);
  }

  render(): unknown {
    if (!this._badge) return nothing;
    const error = !this._haveEntities() ? 
      "Browser entities unavailable" : 
      !this._entitiesResolved ? "Entity not enabled for this Browser" : null;
    if (error) return html`
        <ha-badge
        class="error"
        .hass=${this.hass}
        >
          <ha-icon slot="icon" icon="mdi:alert-circle"></ha-icon>
          <div class="content">${error}</div>
        </ha-badge>
      `;
    return html`${until(this._badge, html`<span>Loading...</span>`)}`;
  }

  static get styles() {
    return css`
      ha-badge.error {
        --badge-color: red;
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

  if (!customElements.get("browser-mod-badge-editor"))  {
    customElements.define("browser-mod-badge-editor", BrowserModBadgeEditor);
  }

  if (!customElements.get("browser-mod-badge")) {
    customElements.define("browser-mod-badge", BrowserModBadge);
    (window as any).customBadges.push({
      type: "browser-mod-badge",
      name: "Browser Mod Badge",
      preview: true,
      description:
        "Provides access to local Browser Mod entities using a badge.",
    });
  }
});
