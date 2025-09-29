import { html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";
import { breakCamelCase, capitalize, selectTree } from "../../helpers";

export class BrowserModTileCardEditor extends LitElement {
  @property() hass;
  @state() _config;
  @state() _tileCardEntities;
  
  @queryAsync("hui-tile-card-editor")
  private _tileCardEditor: Promise<any>;

  private _tileCardConfig;

  connectedCallback(): void {
    super.connectedCallback();

    this._tileCardEntities = window.browser_mod?.browserEntities || {};
    this.addEventListener("browser-mod-entities-update", (ev: CustomEvent) => {
      this._tileCardEntities = window.browser_mod?.browserEntities || {};
    });
  }
  
  setConfig(config): void {
    this._config = config;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.updateComplete.then(() => {
      this._tileCardEditor?.then(async (editor) => {
        let selector = null;
        let attempts = 0;
        while (!selector && attempts < 10) {
          selector = await selectTree(editor, "$ ha-form $ ha-selector");
          if (!selector) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            attempts++;
          }
        }
        selector?.style.setProperty("display", "none");
      });
    });
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (_changedProperties.has("_config")) {
      this._tileCardEditor?.then((editor) => {
        this._tileCardConfig = { 
          ...this._config, 
          entity: this._getEntity(this._config.entity)
        };
        editor.setConfig(this._tileCardConfig);
      });
    }
  }

  private _getEntity(browserEntity: string): string | null {
    return this._haveEntity(browserEntity)
      ? this._tileCardEntities[browserEntity.split(".")[1]].entity_id
      : null;
  }
  
  private _haveEntity(browserEntity: string): boolean {
    if (!this._tileCardEntities) return false;
    const type = browserEntity.split(".")[1];
    if (!type) return false;
    return Object.keys(this._tileCardEntities).some((e) => e === type);
  }

  protected render(): unknown {
    if (!this._config) return nothing;
    const entitySelect = this._renderEntitySelect();
    const tileCardEditor = html`<hui-tile-card-editor
        .hass=${this.hass}
        .config=${this._config}
        @config-changed=${this._tileCardConfigChanged}
      ></hui-tile-card-editor>`;
    return html`
      <div class="entity-select">
        ${entitySelect}
      </div>
      <div class="tile-card-editor">
        ${tileCardEditor}
      </div>`;
  }

  private _renderEntitySelect(): TemplateResult {
    const entitySelectsSchema = [
      {
        name: "entity",
        label: "Browser Entity",
        selector: {
          select: {
            mode: "dropdown",
            required: true,
            options: Object.keys(this._tileCardEntities || {}).map((e) => {
              return {
                value: `browser_entities.${e}`, 
                label: capitalize(breakCamelCase(e.replace(/_/g, " ")))
              };
            }),
          }
        } 
      }
    ];
    return html`<ha-form
      .hass=${this.hass}
      .schema=${entitySelectsSchema}
      .data=${this._config}
      @value-changed=${this._entityChanged}
    ></ha-form>`;
  }

  private _tileCardConfigChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._config = { ...ev.detail.config, entity: this._config.entity };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  private _entityChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const newEntity = ev.detail.value?.entity;
    if (newEntity && newEntity !== this._config.entity) {
      this._config = { ...this._config, entity: newEntity };
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
  }
}