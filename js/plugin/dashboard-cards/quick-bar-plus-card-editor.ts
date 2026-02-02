import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

interface QuickBarItem {
  label: string;
  icon?: string;
  action?: string;
  navigation_path?: string;
  service?: string;
  service_data?: any;
}

interface QuickBarCategory {
  name: string;
  items: QuickBarItem[];
}

export class QuickBarPlusCardEditor extends LitElement {
  @property() hass;
  @state() _config;

  setConfig(config): void {
    this._config = {
      show_search: true,
      placeholder: "Search or select an action...",
      categories: [],
      ...config
    };
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const value = ev.detail.value;
    
    if (target.configValue) {
      this._config = {
        ...this._config,
        [target.configValue]: value
      };
      this._fireConfigChanged();
    }
  }

  private _fireConfigChanged(): void {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private _addCategory(): void {
    const categories = [...(this._config.categories || [])];
    categories.push({
      name: "New Category",
      items: []
    });
    this._config = { ...this._config, categories };
    this._fireConfigChanged();
  }

  private _removeCategory(index: number): void {
    const categories = [...(this._config.categories || [])];
    categories.splice(index, 1);
    this._config = { ...this._config, categories };
    this._fireConfigChanged();
  }

  private _updateCategoryName(index: number, name: string): void {
    const categories = [...(this._config.categories || [])];
    categories[index] = { ...categories[index], name };
    this._config = { ...this._config, categories };
    this._fireConfigChanged();
  }

  private _addItem(categoryIndex: number): void {
    const categories = [...(this._config.categories || [])];
    const items = [...(categories[categoryIndex].items || [])];
    items.push({
      label: "New Item",
      icon: "mdi:star"
    });
    categories[categoryIndex] = { ...categories[categoryIndex], items };
    this._config = { ...this._config, categories };
    this._fireConfigChanged();
  }

  private _removeItem(categoryIndex: number, itemIndex: number): void {
    const categories = [...(this._config.categories || [])];
    const items = [...(categories[categoryIndex].items || [])];
    items.splice(itemIndex, 1);
    categories[categoryIndex] = { ...categories[categoryIndex], items };
    this._config = { ...this._config, categories };
    this._fireConfigChanged();
  }

  private _updateItem(categoryIndex: number, itemIndex: number, updates: Partial<QuickBarItem>): void {
    const categories = [...(this._config.categories || [])];
    const items = [...(categories[categoryIndex].items || [])];
    items[itemIndex] = { ...items[itemIndex], ...updates };
    categories[categoryIndex] = { ...categories[categoryIndex], items };
    this._config = { ...this._config, categories };
    this._fireConfigChanged();
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const generalSchema = [
      {
        name: "title",
        label: "Title",
        selector: { text: {} }
      },
      {
        name: "show_search",
        label: "Show Search Box",
        selector: { boolean: {} }
      },
      {
        name: "placeholder",
        label: "Search Placeholder",
        selector: { text: {} }
      }
    ];

    return html`
      <div class="card-config">
        <div class="section">
          <div class="section-header">General Settings</div>
          <ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${generalSchema}
            .computeLabel=${(schema) => schema.label}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <div class="section">
          <div class="section-header">
            Categories
            <ha-icon-button @click=${this._addCategory}>
              <ha-icon icon="mdi:plus"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.categories && this._config.categories.length > 0
            ? repeat(
                this._config.categories,
                (_, index) => index,
                (category: QuickBarCategory, categoryIndex) => html`
                  <div class="category-editor">
                    <div class="category-header">
                      <ha-textfield
                        .value=${category.name}
                        .label=${"Category Name"}
                        @input=${(e) =>
                          this._updateCategoryName(categoryIndex, e.target.value)}
                      ></ha-textfield>
                      <ha-icon-button
                        @click=${() => this._removeCategory(categoryIndex)}
                      >
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>

                    <div class="items-container">
                      <div class="items-header">
                        Items
                        <ha-icon-button
                          @click=${() => this._addItem(categoryIndex)}
                        >
                          <ha-icon icon="mdi:plus"></ha-icon>
                        </ha-icon-button>
                      </div>
                      ${category.items && category.items.length > 0
                        ? repeat(
                            category.items,
                            (_, index) => index,
                            (item: QuickBarItem, itemIndex) => html`
                              <div class="item-editor">
                                <ha-textfield
                                  .value=${item.label}
                                  .label=${"Label"}
                                  @input=${(e) =>
                                    this._updateItem(categoryIndex, itemIndex, {
                                      label: e.target.value
                                    })}
                                ></ha-textfield>
                                <ha-icon-picker
                                  .value=${item.icon || ""}
                                  .label=${"Icon"}
                                  .hass=${this.hass}
                                  @value-changed=${(e) =>
                                    this._updateItem(categoryIndex, itemIndex, {
                                      icon: e.detail.value
                                    })}
                                ></ha-icon-picker>
                                <ha-textfield
                                  .value=${item.navigation_path || ""}
                                  .label=${"Navigation Path"}
                                  .helper=${"e.g., /lovelace/0"}
                                  @input=${(e) =>
                                    this._updateItem(categoryIndex, itemIndex, {
                                      navigation_path: e.target.value
                                    })}
                                ></ha-textfield>
                                <ha-textfield
                                  .value=${item.service || ""}
                                  .label=${"Service"}
                                  .helper=${"e.g., light.turn_off"}
                                  @input=${(e) =>
                                    this._updateItem(categoryIndex, itemIndex, {
                                      service: e.target.value
                                    })}
                                ></ha-textfield>
                                <ha-icon-button
                                  @click=${() =>
                                    this._removeItem(categoryIndex, itemIndex)}
                                >
                                  <ha-icon icon="mdi:delete"></ha-icon>
                                </ha-icon-button>
                              </div>
                            `
                          )
                        : html`<div class="empty-state">
                            No items. Click + to add one.
                          </div>`}
                    </div>
                  </div>
                `
              )
            : html`<div class="empty-state">
                No categories. Click + to add one.
              </div>`}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .section {
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
        color: var(--primary-text-color);
      }

      .category-editor {
        background: var(--card-background-color);
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 12px;
      }

      .category-editor:last-child {
        margin-bottom: 0;
      }

      .category-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }

      .category-header ha-textfield {
        flex: 1;
      }

      .items-container {
        padding-left: 12px;
        border-left: 2px solid var(--divider-color);
      }

      .items-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 12px;
        color: var(--secondary-text-color);
      }

      .item-editor {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr auto;
        gap: 8px;
        align-items: start;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .item-editor:last-child {
        margin-bottom: 0;
      }

      .empty-state {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      ha-textfield,
      ha-icon-picker {
        width: 100%;
      }
    `;
  }
}

customElements.define("quick-bar-plus-card-editor", QuickBarPlusCardEditor);
