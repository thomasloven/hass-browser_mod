import { css, html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";
import { breakCamelCase, capitalize, selectTree } from "../../helpers";

export class BrowserModBadgeEditor extends LitElement {
  @property() hass;
  @state() _config;
  @state() _badgeEntities;

  @queryAsync("hui-entity-badge-editor")
  private _badgeEditor: Promise<any>;

  private _badgeConfig;

  connectedCallback(): void {
    super.connectedCallback();

    this._badgeEntities = window.browser_mod?.browserEntities || {};
    this.addEventListener("browser-mod-entities-update", (ev: CustomEvent) => {
      this._badgeEntities = window.browser_mod?.browserEntities || {};
    });
  }
  
  setConfig(config): void {
    this._config = config;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.updateComplete.then(() => {
      this._badgeEditor?.then(async (editor) => {
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
      this._badgeEditor?.then((editor) => {
        this._badgeConfig = { 
          ...this._config,
          entity: this._getEntity(this._config.entity)
        };
        editor.setConfig(this._badgeConfig);
      });
    }
  }

  private _getEntity(browserEntity: string): string | null {
    if (this._haveEntity(browserEntity)) {
      const entityKey = browserEntity.split(".")[1];
      return entityKey && this._badgeEntities[entityKey].enabled ? this._badgeEntities[entityKey].entity_id : "";
    }
    return "";
  }
  
  private _haveEntity(browserEntity: string): boolean {
    if (!browserEntity || !this._badgeEntities) return false;
    const type = browserEntity.split(".")[1];
    if (!type) return false;
    return Object.keys(this._badgeEntities).some((e) => e === type);
  }

  protected render(): unknown {
    if (!this._config) return nothing;
    const entitySelect = this._renderEntitySelect();
    const badgeEditor = html`<hui-entity-badge-editor
        .hass=${this.hass}
        .config=${this._config}
        @config-changed=${this._badgeConfigChanged}
      ></hui-entity-badge-editor>`;
    return html`
      <div class="entity-select">
        ${entitySelect}
      </div>
      <div class="badge-editor">
        ${badgeEditor}
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
            options: Object.keys(this._badgeEntities || {}).map((e) => {
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
      .computeLabel=${(s) => s.label ?? s.name}
      @value-changed=${this._entityChanged}
    ></ha-form>`;
  }

  private _badgeConfigChanged(ev: CustomEvent): void {
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

  static get styles() {
    return css`
      .entity-select {
        margin-bottom: 24px;
      }
    `;
  }
}