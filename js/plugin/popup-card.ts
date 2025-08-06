import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

import "./popup-card-editor";
import { getLovelaceRoot, hass_base_el } from "../helpers";
import { repeat } from "lit/directives/repeat.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { icon } from "./types";

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
      this._element.preview = this.preview;
    })();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("hass")) {
      if (this._element) {
        this._element.hass = this.hass;
      }
    }
    if (changedProperties.has("preview")) {
      if (this._element) {
        this._element.preview = this.preview;
      }
    }
  }

  getCardSize() {
    return 0;
  }

  render() {
    this.setHidden(!this.preview);
    if (!this.preview) return html``;
    return html` <ha-card>
      <div class="header">
        ${this._config.dismissable
          ? html`
              <ha-icon-button>
                <ha-icon .icon=${"mdi:close"}></ha-icon>
              </ha-icon-button>
            `
          : ""}
        <div class="main-title">${this._config.title}</div>
        ${this._config.icons
          ? repeat(
              this._config.icons,
              (icon: icon, index) => html`
              <ha-icon-button
                .title=${icon.title ?? ""}
                class=${ifDefined(icon.class)}
              >
                <ha-icon 
                  .icon=${icon.icon ?? ""}
                >
                </ha-icon>
              </ha-icon-button>
            `
            )
          : 
          this._config.icon ?
            html`
              <ha-icon-button
                .title=${this._config.icon_title ?? ""}
                class=${ifDefined(this._config.icon_class)}
              >
                <ha-icon 
                  .icon=${this._config.icon}
                >
                </ha-icon>
              </ha-icon-button>
            ` : "" 
          }
      </div>
      <div class="content">
        ${this._element}
      </div>
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
                      <ha-button
                        variant=${this._config.left_button_variant ?? "brand"}
                        appearance=${this._config.left_button_appearance ?? "plain"}
                      >${this._config.left_button}</ha-button>
                    `
                  : ""}
              </span>
              <span>
                ${this._config.right_button !== undefined
                  ? html`
                      <ha-button
                        variant=${this._config.right_button_variant ?? "brand"}
                        appearance=${this._config.right_button_appearance ?? "plain"}
                      >${this._config.right_button}</ha-button>
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
      .header {
        color: var(--primary-text-color);
        background-color: var(
          --popup-header-background-color,
          var(--popup-background-color, --sidebar-background-color)
        );
        display: var(--layout-horizontal_-_display, flex);
        flex-direction: var(--layout-horizontal_-_flex-direction, row);
        align-items: var(--layout-center_-_align-items);
        padding: 12px;
        font-size: var(--app-toolbar-font-size, 20px);
      }
      ha-icon-button > * {
        display: flex;
      }
      .main-title {
        flex: 1;
        font-size: var(--ha-font-size-xl);
        line-height: var(--ha-line-height-condensed);
        font-weight: var(--ha-font-weight-normal);
        padding: 10px 4px;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mdc-dialog__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0px;
        padding: 8px 16px 8px 24px;
        border-top: 1px solid var(--divider-color);
      }

      .content {
        padding: 8px 8px 20px 8px;
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

  let rootMutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.removedNodes) {
          if (node instanceof Element && node.localName === "hui-root") {
            lovelaceRoot = null;
          }
        }        
        for (const node of mutation.addedNodes) {
          if (node instanceof Element && node.localName === "hui-root") {
            lovelaceRoot = node;
          }
        }  
      }
    }
  });
  let lovelaceRoot = await getLovelaceRoot(document);
  if (rootMutationObserver && lovelaceRoot?.parentNode) {
    rootMutationObserver.observe(lovelaceRoot.parentNode, {
      childList: true,
    });
  }

  // popstate will get fired on window.browser_mod?.service("popup", ...) but as this popstate
  // is not currently cleared there is no way to distinguish this event properly at this time.
  // Hence, setting lovelaceRoot on all popstate which captures, for examople, UI back from History Panel.
  ['popstate','location-changed'].forEach(event => 
    window.addEventListener(event, async (ev) => {
      lovelaceRoot = await getLovelaceRoot(document);
    })
  );

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
