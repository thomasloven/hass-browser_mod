import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

import "./popup-card-editor";
import { getLovelaceRoot, hass_base_el } from "../helpers";

class PopupCard extends LitElement {
  @property() hass;
  @state() _config;
  @property({ type: Boolean, reflect: true}) preview = false;
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

  setConfig(config) {
    this._config = config;
    (async () => {
      const ch = await window.loadCardHelpers();
      this._element = await ch.createCardElement(config.card);
      this._element.hass = this.hass;
    })();
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
    this.setHidden(!this.preview);
    if (!this.preview) return html``;
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

  private setHidden(hidden: boolean): void {
    if (this.hasAttribute('hidden') !== hidden) {
      this.toggleAttribute('hidden', hidden);
      this.dispatchEvent(
        new Event('card-visibility-changed', {
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  static get styles() {
    return css`
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

function popupCardMatch(card, entity, viewIndex, curView) {
  return card.type === 'custom:popup-card' &&
         card.entity === entity &&
         (viewIndex === curView || card.popup_card_all_views);
}

function findPopupCardConfig(lovelaceRoot, entity) {
  const lovelaceConfig = lovelaceRoot?.lovelace?.config;
  if (lovelaceConfig) {
    const curView = lovelaceRoot?._curView ?? 0;
    // Place current view at the front of the view index lookup array.
    // This allows the current view to be checked first for local cards, 
    // and then the rest of the views for global cards, keeping current view precedence.
    let viewLookup = Array.from(Array(lovelaceConfig.views.length).keys())
    viewLookup.splice(curView, 1);
    viewLookup.unshift(curView);
    for (const viewIndex of viewLookup) {
      const view = lovelaceConfig.views[viewIndex];
      if (view.cards) {
        for (const card of view.cards) {
          if (popupCardMatch(card, entity, viewIndex, curView)) return card;
          // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
          if (card.cards) {
            for (const subCard of card.cards) {
              if (popupCardMatch(subCard, entity, viewIndex, curView)) return subCard;
            }
          }
        }
      }
      if (view.sections) {
        for (const section of view.sections) {
          if (section.cards) {
            for (const card of section.cards) {
              if (popupCardMatch(card, entity, viewIndex, curView)) return card;
              // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
              if (card.cards) {
                for (const subCard of card.cards) {
                  if (popupCardMatch(subCard, entity, viewIndex, curView)) return subCard;
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
}

window.addEventListener("browser-mod-bootstrap", async (ev: CustomEvent) =>  {
  ev.stopPropagation();
  while (!window.browser_mod) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  await window.browser_mod.connectionPromise;

  if (!customElements.get("popup-card"))
    customElements.define("popup-card", PopupCard);

  let lovelaceRoot = await getLovelaceRoot(document);

  window.addEventListener("location-changed", async () => {
    lovelaceRoot = await getLovelaceRoot(document);
  });

  window.addEventListener("hass-more-info", (ev: CustomEvent) => {
    if (ev.detail?.ignore_popup_card || !ev.detail?.entityId || !lovelaceRoot) return;
    const cardConfig = findPopupCardConfig(lovelaceRoot, ev.detail?.entityId);
    if (cardConfig) {
      ev.stopPropagation();
      ev.preventDefault();
      let properties = { ...cardConfig }
      delete properties.card;
      delete properties.entity;
      delete properties.type;
      window.browser_mod?.service("popup", {
        content: cardConfig.card,
        ...properties,
      });
      setTimeout(
        () =>
          lovelaceRoot.dispatchEvent(
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
  });
});
