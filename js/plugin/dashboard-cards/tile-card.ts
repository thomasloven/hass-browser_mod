import { html, LitElement, nothing, PropertyValues } from "lit";
import { until } from 'lit/directives/until.js';
import { property, state } from "lit/decorators.js";
import { BrowserModTileCardEditor } from "./tile-card-editor";
import structuredClone from "@ungap/structured-clone";
import { getLovelaceRoot } from "../../helpers";
import { LovelaceGridOptions, LovelaceCard } from "../../types/types";

export class BrowserModTileCard extends LitElement {
  @property() hass;
  @state() _config;
  @property({ type: Boolean, reflect: true}) preview = false;
  @state() _tileCardEntities;

  private _tileCard : Promise<any>;
  private _entitiesResolved: boolean;
  private _privilegedUser: boolean = false;

  constructor() {
    super();
    this._tileCard = window.loadCardHelpers().then((ch) => {
      return ch.createCardElement({ type: "tile", entity: "sun.sun" });
    });
    this._tileCard.then((tileCard) => {
      // Force load of tile card editor
      tileCard.constructor.getConfigElement();
    });
    this._entitiesResolved = false;
  }

  static getConfigElement() {
    return document.createElement("browser-mod-tile-card-editor");
  }

  static getStubConfig(hass, entities): Record<string, unknown> {
    return { entity: "browser_entities.browserID" };
  }

  private get _registered (): boolean { return window.browser_mod?.registered ?? false; }

  connectedCallback(): void {
    super.connectedCallback();

    this._tileCardEntities = window.browser_mod?.browserEntities || {};
    this.addEventListener("browser-mod-entities-update", (ev: CustomEvent) => {
      this._tileCardEntities = window.browser_mod?.browserEntities || {};
      this._replaceEntities();
    });
    getLovelaceRoot(document).then((lovelace) => {
      const currentUser = window.browser_mod?.user;
      const dashboardPrivilegedUsers = lovelace?.config?.browser_mod?.privileged_users ?? [];
      this._privilegedUser = currentUser?.is_admin || dashboardPrivilegedUsers.includes(currentUser?.name) || false;
      this.requestUpdate();
    });
  }

  setConfig(config): void {
    this._config = structuredClone(config);
    delete this._config.type;
  }

  // getCardSize is called early so we use a copy from Frontend code
  getCardSize(): number {
    const featuresPosition =
      this._config && this._featurePosition(this._config);
    const featuresCount = this._config?.features?.length || 0;
    return (
      1 +
      (this._config?.vertical ? 1 : 0) +
      (featuresPosition === "inline" ? 0 : featuresCount)
    );
  }

  // getGridOptions is called early so we use a copy from Frontend code
  getGridOptions(): LovelaceGridOptions {
    const columns = 6;
    let min_columns = 6;
    let rows = 1;
    const featurePosition = this._config && this._featurePosition(this._config);
    const featuresCount = this._config?.features?.length || 0;
    if (featuresCount) {
      if (featurePosition === "inline") {
        min_columns = 12;
      } else {
        rows += featuresCount;
      }
    }

    if (this._config?.vertical) {
      rows++;
      min_columns = 3;
    }
    if (this.preview) {
      const error = this._computeCardError();
      if (error) {
        rows = Math.max(2, rows);
      }
    }
    return {
      columns,
      rows,
      min_columns,
      min_rows: rows,
    };
  }

  _featurePosition(config): string {
    if (config.vertical) {
      return "bottom";
    }
    return config.features_position || "bottom";
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has("hass")) {
      if (this._tileCard) {
        this._tileCard.then((tileCard) => tileCard.hass = this.hass);
      }
    }
    if (changedProperties.has("preview")) {
      if (this._tileCard) {
        this._tileCard.then((tileCard) => tileCard.preview = this.preview);
      }
    }
    if (changedProperties.has("_config")) {
      this._replaceEntities();
      this._tileCard.then((tileCard) => tileCard.setConfig(this._config));
    }
  }

  private _getEntity(browserEntity: string): string | null {
    if (this._haveEntity(browserEntity)) {
      const entityKey = browserEntity.split(".")[1];
      return entityKey && this._tileCardEntities[entityKey].enabled ? this._tileCardEntities[entityKey].entity_id : null;
    }
    return null;
  }
  
  private _haveEntity(browserEntity: string): boolean {
    if (!browserEntity || !this._tileCardEntities) return false;
    const type = browserEntity.split(".")[1];
    if (!type) return false;
    return Object.keys(this._tileCardEntities).some((e) => e === type);
  }

  private _haveEntities(): boolean {
    return this._tileCardEntities && Object.keys(this._tileCardEntities).length > 0;
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

  private _handleErrorClick() {
    window.browser_mod?.service("browser_mod.change_browser_id", {});
  }

  private _computeCardError() {
    if (!this._registered) {
      return {severity: "warning", error: "Browser not registered", handleChangeId: true};
    }
    if (!this._haveEntities()) {
      return {severity: "error", error: "Browser entities unavailable", handleChangeId: true};
    }
    if (!this._entitiesResolved) {
      return {severity: "warning", error: "Entity not enabled for this Browser", handleChangeId: false};
    }
    return null;
  }

  render(): unknown {
    if (!this._tileCard) return nothing;
    const error = this._computeCardError();
    if (error) {
      const errorCard = document.createElement('hui-error-card') as LovelaceCard;
      errorCard.setConfig({
        severity: error.severity,
        error: error.error,
        message: `Entity: ${this._config?.entity}`,
      });
      errorCard.hass = this.hass;
      errorCard.preview = this.preview;
      if (this._privilegedUser && error.handleChangeId) {
        errorCard.addEventListener("click", () => this._handleErrorClick());
        errorCard.style.cursor = "pointer";
      } else {
        errorCard.style.cursor = "default";
      }
      return html`${errorCard}`;
    }
    return html`${until(this._tileCard, html`<span>Loading...</span>`)}`;
  }
}

window.addEventListener("browser-mod-bootstrap", async (ev: CustomEvent) => {
  ev.stopPropagation();
  while (!window.browser_mod) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  await window.browser_mod.connectionPromise;

  if (!customElements.get("browser-mod-tile-card-editor"))  {
    customElements.define("browser-mod-tile-card-editor", BrowserModTileCardEditor);
  }

  if (!customElements.get("browser-mod-tile-card")) {
    customElements.define("browser-mod-tile-card", BrowserModTileCard);
    (window as any).customCards.push({
      type: "browser-mod-tile-card",
      name: "Browser Mod Tile",
      preview: true,
      description:
        "Provides access to local Browser Mod entities using a tile card.",
    });
  }
});
