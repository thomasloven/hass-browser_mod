import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { LovelaceCard, LovelaceCardConfig } from "../types";
import "./quick-bar-plus-card-editor";

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

interface QuickBarPlusConfig extends LovelaceCardConfig {
  title?: string;
  categories?: QuickBarCategory[];
  show_search?: boolean;
  placeholder?: string;
  quick_bar_card_id?: string;
  keyboard_shortcut?: string;
}

export class QuickBarPlusCard extends LitElement implements LovelaceCard {
  @property() hass;
  @state() _config: QuickBarPlusConfig;
  @property({ type: Boolean, reflect: true }) preview = false;
  @state() private _quickBar: any;
  @state() private _opened = false;
  private _keyboardHandler?: (ev: KeyboardEvent) => void;

  static getConfigElement() {
    return document.createElement("quick-bar-plus-card-editor");
  }

  static getStubConfig(hass, entities): QuickBarPlusConfig {
    return {
      title: "Quick Bar Plus",
      show_search: true,
      placeholder: "Search or select an action...",
      categories: [
        {
          name: "Navigation",
          items: [
            {
              label: "Dashboard",
              icon: "mdi:view-dashboard",
              navigation_path: "/lovelace/0"
            },
            {
              label: "Settings",
              icon: "mdi:cog",
              navigation_path: "/config/dashboard"
            }
          ]
        },
        {
          name: "Quick Actions",
          items: [
            {
              label: "Turn off all lights",
              icon: "mdi:lightbulb-off",
              service: "light.turn_off",
              service_data: { entity_id: "all" }
            }
          ]
        }
      ]
    };
  }

  setConfig(config: QuickBarPlusConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = {
      show_search: true,
      placeholder: "Search or select an action...",
      ...config
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._setupKeyboardShortcut();
    
    // Listen for programmatic open events
    this.addEventListener("quick-bar-open", () => {
      this._openQuickBar();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeKeyboardShortcut();
  }

  private _setupKeyboardShortcut(): void {
    if (!this._config?.keyboard_shortcut) return;
    
    this._keyboardHandler = (ev: KeyboardEvent) => {
      if (this._matchesShortcut(ev, this._config.keyboard_shortcut!)) {
        ev.preventDefault();
        this._openQuickBar();
      }
    };
    
    window.addEventListener("keydown", this._keyboardHandler);
  }

  private _removeKeyboardShortcut(): void {
    if (this._keyboardHandler) {
      window.removeEventListener("keydown", this._keyboardHandler);
      this._keyboardHandler = undefined;
    }
  }

  private _matchesShortcut(ev: KeyboardEvent, shortcut: string): boolean {
    const parts = shortcut.toLowerCase().split("+").map(p => p.trim());
    const key = parts[parts.length - 1];
    const modifiers = parts.slice(0, -1);
    
    // Check if the key matches (handle special keys)
    const keyMatches = ev.key.toLowerCase() === key || 
                       (key === "ctrl" && (ev.ctrlKey || ev.metaKey)) ||
                       (key === "alt" && ev.altKey) ||
                       (key === "shift" && ev.shiftKey);
    
    if (!keyMatches && ev.key.toLowerCase() !== key) return false;
    
    // Check modifiers
    const ctrlRequired = modifiers.includes("ctrl") || modifiers.includes("control");
    const altRequired = modifiers.includes("alt");
    const shiftRequired = modifiers.includes("shift");
    const metaRequired = modifiers.includes("meta") || modifiers.includes("cmd");
    
    const ctrlPressed = ev.ctrlKey || (ctrlRequired && ev.metaKey);
    const altPressed = ev.altKey;
    const shiftPressed = ev.shiftKey;
    const metaPressed = ev.metaKey;
    
    return (
      (!ctrlRequired || ctrlPressed) &&
      (!altRequired || altPressed) &&
      (!shiftRequired || shiftPressed) &&
      (!metaRequired || metaPressed) &&
      (ctrlRequired ? ctrlPressed : !ctrlPressed || metaPressed) &&
      (altRequired ? altPressed : !altPressed) &&
      (shiftRequired ? shiftPressed : !shiftPressed)
    );
  }

  getCardSize(): number {
    return 1;
  }

  public openQuickBar(): void {
    this._openQuickBar();
  }

  private _openQuickBar(): void {
    this._opened = true;
    this.requestUpdate();
  }

  private _closeQuickBar(): void {
    this._opened = false;
    this.requestUpdate();
  }

  private _handleSearch(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();
    
    // Filter items based on search
    const items = this.shadowRoot?.querySelectorAll(".quick-bar-item");
    items?.forEach((item: any) => {
      const label = item.textContent?.toLowerCase() || "";
      item.style.display = label.includes(searchTerm) ? "" : "none";
    });
  }

  private _renderDialog() {
    if (!this._opened) return html``;

    return html`
      <div class="quick-bar-plus-dialog">
        <div class="backdrop" @click=${this._closeQuickBar}></div>
        <div class="dialog-content">
          <div class="dialog-header">
            <h2>${this._config.title || "Quick Bar Plus"}</h2>
            <ha-icon-button @click=${this._closeQuickBar}>
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.show_search ? html`
            <div class="search-box">
              <ha-textfield
                .placeholder=${this._config.placeholder}
                @input=${this._handleSearch}
              >
                <ha-icon slot="leadingIcon" icon="mdi:magnify"></ha-icon>
              </ha-textfield>
            </div>
          ` : ""}
          <div class="categories">
            ${this._renderCategories()}
          </div>
        </div>
      </div>
    `;
  }

  private _renderCategories() {
    if (!this._config.categories) return html``;
    
    return this._config.categories.map(
      (category) => html`
        <div class="category">
          <div class="category-name">${category.name}</div>
          <div class="category-items">
            ${category.items.map(
              (item) => html`
                <div
                  class="quick-bar-item"
                  @click=${() => this._handleItemClick(item)}
                >
                  ${item.icon ? html`<ha-icon icon="${item.icon}"></ha-icon>` : ""}
                  <span>${item.label}</span>
                </div>
              `
            )}
          </div>
        </div>
      `
    );
  }

  private _handleItemClick(item: QuickBarItem): void {
    if (item.navigation_path) {
      window.history.pushState(null, "", item.navigation_path);
      window.dispatchEvent(new Event("location-changed"));
    } else if (item.service) {
      // Validate service format (domain.service)
      const serviceParts = item.service.split(".");
      if (serviceParts.length === 2) {
        this.hass.callService(
          serviceParts[0],
          serviceParts[1],
          item.service_data || {}
        );
      } else {
        console.error(`Invalid service format: ${item.service}. Expected format: domain.service`);
      }
    }
    this._closeQuickBar();
  }

  render() {
    if (!this._config) {
      return html``;
    }

    return html`
      ${this._renderDialog()}
      <ha-card @click=${this._openQuickBar}>
        <div class="card-content">
          <div class="icon-container">
            <ha-icon icon="mdi:feature-search"></ha-icon>
          </div>
          <div class="text-content">
            <div class="title">${this._config.title || "Quick Bar Plus"}</div>
            <div class="subtitle">Click to open quick actions</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        cursor: pointer;
      }

      ha-card {
        padding: 16px;
        transition: background-color 0.2s;
      }

      ha-card:hover {
        background-color: var(--secondary-background-color);
      }

      .card-content {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icon-container ha-icon {
        --mdc-icon-size: 48px;
        color: var(--primary-color);
      }

      .text-content {
        flex: 1;
      }

      .title {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .quick-bar-plus-dialog {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 100px;
      }

      .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
      }

      .dialog-content {
        position: relative;
        background: var(--card-background-color);
        border-radius: 8px;
        width: 600px;
        max-width: 90vw;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
      }

      .dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid var(--divider-color);
      }

      .dialog-header h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
      }

      .search-box {
        padding: 16px;
        border-bottom: 1px solid var(--divider-color);
      }

      .search-box ha-textfield {
        width: 100%;
      }

      .categories {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }

      .category {
        margin-bottom: 24px;
      }

      .category:last-child {
        margin-bottom: 0;
      }

      .category-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .category-items {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .quick-bar-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .quick-bar-item:hover {
        background-color: var(--secondary-background-color);
      }

      .quick-bar-item ha-icon {
        --mdc-icon-size: 24px;
        color: var(--primary-color);
      }

      .quick-bar-item span {
        font-size: 16px;
        color: var(--primary-text-color);
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

  if (!customElements.get("quick-bar-plus-card")) {
    customElements.define("quick-bar-plus-card", QuickBarPlusCard);
    (window as any).customCards = (window as any).customCards || [];
    (window as any).customCards.push({
      type: "custom:quick-bar-plus-card",
      name: "Quick Bar Plus",
      preview: true,
      description: "A customizable quick bar with categories and custom actions."
    });

    // Store reference to card instances for global keyboard shortcut
    (window as any).quickBarPlusCards = (window as any).quickBarPlusCards || [];
    
    // Set up global keyboard shortcut listener (Ctrl+K by default)
    let globalShortcutHandler: ((ev: KeyboardEvent) => void) | null = null;
    
    const setupGlobalShortcut = () => {
      // Remove old handler if exists
      if (globalShortcutHandler) {
        window.removeEventListener("keydown", globalShortcutHandler);
      }
      
      globalShortcutHandler = (ev: KeyboardEvent) => {
        // Check for Ctrl+K (or Cmd+K on Mac)
        if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "k") {
          ev.preventDefault();
          
          // Find the first quick bar card and open it
          const cards = document.querySelectorAll("quick-bar-plus-card");
          if (cards.length > 0) {
            (cards[0] as any).openQuickBar();
          }
        }
      };
      
      window.addEventListener("keydown", globalShortcutHandler);
    };
    
    setupGlobalShortcut();
  }
});
