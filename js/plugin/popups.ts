import { LitElement, html, css } from "lit";
import { property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { repeat } from "lit/directives/repeat.js";
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  provideHass,
  loadLoadCardHelpers,
  hass_base_el,
  selectTree,
  getMoreInfoDialog,
  getMoreInfoDialogHADialog
} from "../helpers";
import { loadHaForm } from "../helpers";
import { ObjectSelectorMonitor } from "../object-selector-monitor";
import { icon } from "./types";

const CLOSE_POPUP_ACTIONS = new Set(["assist"]);

class BrowserModPopup extends LitElement {
  @property() open;
  @property() content;
  @property() title;
  @property({ reflect: true }) actions;
  @property({ reflect: true }) card;
  @property() right_button;
  @property() right_button_variant;
  @property() right_button_appearance;
  @property() right_button_close;
  @property() left_button;
  @property() left_button_variant;
  @property() left_button_appearance;
  @property() left_button_close;
  @property() dismissable;
  @property({ type: Array}) icons: icon[];
  @property({ reflect: true }) timeout_hide_progress;
  @property({ reflect: true }) wide;
  @property({ reflect: true }) fullscreen;
  @property({ reflect: true }) classic;
  @property() _style;
  @property() _formDataValid;
  @query("ha-dialog") dialog: any;
  _autoclose;
  _autocloseListener;
  _actions;
  timeout;
  _timeoutStart;
  _timeoutTimer;
  _resolveClosed;
  _formdata;
  card_mod;
  _allowNestedMoreInfo;
  _objectSelectorMonitor: ObjectSelectorMonitor;
 
  connectedCallback() {
    super.connectedCallback();
    this._objectSelectorMonitor = new ObjectSelectorMonitor(
      this,
      (value: boolean) => { this._formDataValid = value }
    );
  }

  async closeDialog() {
    this.open = false;
    this._objectSelectorMonitor.stopMonitoring();
    this.card?.remove?.();
    this.card = undefined;
    clearInterval(this._timeoutTimer);
    if (this._autocloseListener) {
      window.browser_mod.removeEventListener(
        "browser-mod-activity",
        this._autocloseListener
      );
      this._autocloseListener = undefined;
    }
    this._actions?.dismiss_action?.();
    if ((this as any)._cardMod?.[0]) {
      (this as any)._cardMod[0].styles = "";
    }
    this.dispatchEvent(
      new CustomEvent("browser-mod-style-hass-more-info-dialog", {
        bubbles: false,
        composed: false,
        cancelable: false,
        detail: {
          apply: false,
        },
      })
    );
  }

  openDialog() {
    this.open = true;
    this.dialog?.show();
    if (this.timeout) {
      this._timeoutStart = new Date().getTime();
      this._timeoutTimer = setInterval(() => {
        const ellapsed = new Date().getTime() - this._timeoutStart;
        const progress = (ellapsed / this.timeout) * 100;
        if (!this.timeout_hide_progress) {
          this.style.setProperty("--progress", `${progress}%`);
        }
        if (ellapsed >= this.timeout) {
          clearInterval(this._timeoutTimer);
          this._timeout();
        }
      }, 10);
    }
    this._autocloseListener = undefined;
    if (this._autoclose) {
      this._autocloseListener = () => this.dialog.close();
      window.browser_mod.addEventListener(
        "browser-mod-activity",
        this._autocloseListener,
        { once: true }
      );
    }

    customElements.whenDefined("card-mod").then(() => {
      (customElements.get("card-mod") as any)?.applyToElement?.(
        this,
        "more-info",
        this.card_mod?.style ? 
          { style: this.card_mod.style, debug: this.card_mod?.debug ?? false } : 
          { style: "{}", debug: this.card_mod?.debug ?? false } ,
        {},
        true,
        "browser_mod-card_mod"
      );
    });

    this.updateComplete.then(() => {
      if (this.card) {
        selectTree(this.content, "$").then((el) => {
          if (!el) return;
          const styleEl = document.createElement("style");
          styleEl.classList.add("browser-mod-style");
          styleEl.innerHTML = `
          ha-card {
            box-shadow: none !important;
            border: none !important;
          }`;
          el.appendChild(styleEl);
        });
      }
      if (this._formdata) {
        setTimeout(() => this._objectSelectorMonitor.startMonitoring(), 0);
      }
    });
  }

  async _build_card(config) {
    const helpers = await window.loadCardHelpers();
    const card = await helpers.createCardElement(config);
    card.hass = window.browser_mod.hass;
    provideHass(card);
    this.content = card;
    if (!customElements.get(card.localName)) {
      customElements.whenDefined(card.localName).then(() => {
        this._build_card(config);
      });
    }
    card.addEventListener("ll-rebuild", () => {
      this._build_card(config);
    });
  }

  _setFormdata(schema) {
    for (const i of schema) {
        if (i["schema"]) {
          this._setFormdata(i["schema"]);
        } else if (i.name && i.default !== undefined) {
          this._formdata[i.name] = i.default;
        }
      }
   }

  async setupDialog(
    title,
    content,
    {
      right_button = undefined,
      right_button_variant = "brand",
      right_button_appearance = "plain",
      right_button_action = undefined,
	    right_button_close = true,
      left_button = undefined,
      left_button_variant = "brand",
      left_button_appearance = "plain",
      left_button_action = undefined,
	    left_button_close = true,
      dismissable = true,
      dismiss_action = undefined,
      timeout = undefined,
      timeout_action = undefined,
      timeout_hide_progress = undefined,
      size = undefined,
      style = undefined,
      autoclose = false,
      card_mod = undefined,
      allow_nested_more_info = true,
      icon = undefined,
      icon_title = undefined,
      icon_action = undefined,
      icon_close = true,
      icon_class = undefined,
      icons = undefined,
    } = {}
  ) {
    this._formdata = undefined;
    this._formDataValid = true;
    this.title = title;
    this.card = undefined;
    this.card_mod = card_mod;
    if (content && content instanceof HTMLElement) {
      // HTML Element content
      this.content = content;
    } else if (content && Array.isArray(content)) {
      // Form content
      loadHaForm();
      const form: any = document.createElement("ha-form");
      form.schema = content;
      form.computeLabel = (s) => s.label ?? s.name;
      form.hass = window.browser_mod.hass;
      this._formdata = {};
      this._setFormdata(content);
      form.data = this._formdata;
      provideHass(form);
      form.addEventListener("value-changed", (ev) => {
        this._formdata = { ...ev.detail.value };
        form.data = this._formdata;
      });
      form.addEventListener("closing", (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
      });
      this.content = form;
    } else if (content && typeof content === "object") {
      // Card content
      this.card = true;
      await this._build_card(content);
    } else {
      // Basic HTML content
      this.content = unsafeHTML(content);
    }

    this.right_button = right_button;
    this.right_button_variant = right_button_variant;
    this.right_button_appearance = right_button_appearance;
	  this.right_button_close = right_button_close;
    this.left_button = left_button;
    this.left_button_variant = left_button_variant;
    this.left_button_appearance = left_button_appearance;
	  this.left_button_close = left_button_close;
    this.actions = right_button === undefined ? undefined : "";

    this.dismissable = dismissable;
    this.timeout = timeout;
    this.timeout_hide_progress = timeout_hide_progress;
    this._actions = {
      right_button_action,
      left_button_action,
      dismiss_action,
      timeout_action,
    };
    this.wide = size === "wide" ? "" : undefined;
    this.fullscreen = size === "fullscreen" ? "" : undefined;
    this.classic = size === "classic" ? "" : undefined;
    this._style = style;
    this._autoclose = autoclose;
    this._allowNestedMoreInfo = allow_nested_more_info;
    if (icons) {
      this.icons = [];
      const iconDefaults = { 
        icon: undefined,
        title: undefined,
        action: undefined,
        close: true,
        class: undefined
      }
      icons.forEach((icon, index) => {
        this.icons[index] = { ...iconDefaults, ...icon }
      });
    } else if (icon) {
      this.icons = [
        { 
          icon: icon, 
          title: icon_title, 
          action: icon_action,
          close: icon_close,
          class: icon_class,
        }
      ];
    } else {
      this.icons = [];
    }
  }

  async do_close() {
    const action = this._actions?.dismiss_action;
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.dialog?.close();
    action?.(this._formdata);
    this._objectSelectorMonitor.stopMonitoring()
  }

  async _primary() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
	  if (this.right_button_close === true) await this.do_close();
    this._actions?.right_button_action?.(this._formdata);
  }
  async _secondary() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    if (this.left_button_close === true) await this.do_close();
    this._actions?.left_button_action?.(this._formdata);
  }
  async _timeout() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.do_close();
    this._actions?.timeout_action?.();
  }
  async _icon_action(index) {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    if (this.icons?.[index]?.close) await this.do_close();
    await this.icons?.[index]?.action?.();
  }

  render() {
    if (!this.open) return html``;

    return html`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        .heading=${this.title !== undefined}
        hideActions
        flexContent
        .scrimClickAction=${this.dismissable ? "close" : ""}
        .escapeKeyAction=${this.dismissable ? "close" : ""}
      >
        ${this.timeout && !this.timeout_hide_progress
          ? html` <div slot="heading" class="progress"></div> `
          : ""}
        ${this.title
          ? html`
              <ha-dialog-header slot="heading">
                ${this.dismissable
                  ? html`
                      <ha-icon-button
                        dialogAction="cancel"
                        slot="navigationIcon"
                      >
                        <ha-icon .icon=${"mdi:close"}></ha-icon>
                      </ha-icon-button>
                    `
                  : ""}
                <span slot="title" .title="${this.title}">${this.title}</span>
                ${this.icons 
                  ?
                    repeat(
                      this.icons,
                      (icon, index) => html`
                        <ha-icon-button
                          slot="actionItems"
                          title=${icon.title ?? ""}
                          @click=${() => { this.blur(); this._icon_action(index)} }
                          class=${ifDefined(icon.class)}
                        >
                          <ha-icon .icon=${icon.icon}></ha-icon>
                        </ha-icon-button>
                      `
                    )
                  : "" }
              </ha-dialog-header>
            `
          : html``}

        <div class="content" tabindex="-1" dialogInitialFocus>
          <div class="container">${this.content}</div>
          ${this.right_button !== undefined || this.left_button !== undefined
            ? html`
                <div class="buttons">
                  ${this.left_button !== undefined
                    ? html`
                        <ha-button
                          variant=${this.left_button_variant}
                          appearance=${this.left_button_appearance}
                          @click=${this._secondary}
                          class="action-button"
                        >${this.left_button}</ha-button>
                      `
                    : html`<div></div>`}
                  ${this.right_button !== undefined
                    ? html`
                        <ha-button
                          variant=${this.right_button_variant}
                          appearance=${this.right_button_appearance}
                          @click=${this._primary}
                          class="action-button"
                          ?disabled=${!this._formDataValid}
                        >${this.right_button}</ha-button>
                      `
                    : ""}
                </div>
              `
            : ""}
        </div>
        <style>
          :host {
            ${this._style}
          }
        </style>
      </ha-dialog>
    `;
  }

  static get styles() {
    return css`
      /* Classes from haStyleDialog */
      ha-dialog {
        --mdc-dialog-min-width: var(--popup-min-width, 560px);
        --mdc-dialog-max-width: var(--popup-max-width, 600px);
        --justify-action-buttons: space-between;
      }

      ha-dialog .form {
        color: var(--primary-text-color);
      }

      a {
        color: var(--primary-color);
      }

      ha-dialog {
        --dialog-surface-position: static;
        --dialog-content-position: static;
        --vertical-align-dialog: flex-start;
        --dialog-surface-margin-top: 40px;
        --dialog-content-padding: 0;

        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
        --padding-x: var(--popup-padding-x, 24px);
        --padding-y: var(--popup-padding-y, 20px);
      }
      .content {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-focus-ring-color: rgba(0, 0, 0, 0);
        outline: none !important;
      }
      .content .container {
        padding: 8px 24px 20px 24px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-focus-ring-color: rgba(0, 0, 0, 0);
        outline: none !important;
      }
      :host([card]) .content .container {
        padding: 8px 8px 20px 8px;
      }
      .content .buttons {
        box-sizing: border-box;
        display: flex;
        padding: 8px 16px 8px 24px;
        justify-content: space-between;
        padding-bottom: 8px;
        background-color: var(--mdc-theme-surface, #fff);
        border-top: 1px solid var(--divider-color);
        position: sticky;
        bottom: 0px;
      }
      .progress {
        position: relative;
      }

      .progress::before {
        content: "";
        position: absolute;
        left: 0;
        width: calc(100% - var(--progress, 60%));
        top: 0;
        height: 5px;
        background: var(--primary-color);
        z-index: 10;
      }

      ha-icon-button > * {
        display: flex;
      }

      ha-dialog-header > span {
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: default;
      }

      :host([wide]) ha-dialog {
        --mdc-dialog-max-width: 90vw;
      }
      :host([wide]) .content {
        width: calc(90vw - 2 * var(--padding-x));
      }

      :host([classic]) ha-dialog {
        --dialog-surface-margin-top: 40px;
        --mdc-dialog-min-height: 10%;
        --mdc-dialog-max-height: 100%;
        --vertical-align-dialog: flex-start;
        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
      }

      :host([fullscreen]) ha-dialog {
        --mdc-dialog-min-width: 100vw;
        --mdc-dialog-max-width: 100vw;
        --mdc-dialog-min-height: 100%;
        --mdc-dialog-max-height: 100%;
        --mdc-shape-medium: 0px;
        --vertical-align-dialog: flex-end;
        --ha-dialog-border-radius: 0px;
        --dialog-surface-margin-top: 0px;
      }
      :host([fullscreen]) .content {
        height: calc(
          100vh - var(--header-height) - var(--footer-height) - 2 *
            var(--padding-y) - 16px
        );
      }

      @media all and (max-width: 450px), all and (max-height: 500px) {
        ha-dialog {
          --mdc-dialog-min-width: 97vw;
          --mdc-dialog-max-width: 97vw;
          --mdc-dialog-min-height: 100%;
          --mdc-dialog-max-height: 100%;
          --vertical-align-dialog: flex-end;
          --ha-dialog-border-radius: 0;
        }
        :host([wide]) .content {
          width: 100vw;
        }
      }

      @media all and (min-width: 600px) and (min-height: 501px) {
        ha-dialog {
          --dialog-surface-margin-top: 40px;
        }
      }
    `;
  }
}

if (!customElements.get("browser-mod-popup"))
  customElements.define("browser-mod-popup", BrowserModPopup);

export const PopupMixin = (SuperClass) => {
  return class PopupMixinClass extends SuperClass {
    private _popupEl: any;

    constructor() {
      super();

      loadLoadCardHelpers();

      this._popupEl = document.createElement("browser-mod-popup");
      document.body.append(this._popupEl);

      this._popupEl.addEventListener("hass-more-info", async (ev) => {
        ev.stopPropagation();
        const base = await hass_base_el();
        if (this._popupEl?._allowNestedMoreInfo) {
          if (ev.detail?.ignore_popup_card === undefined) {
            ev.detail.ignore_popup_card = true;
          }
        } else {
          this._popupEl.do_close();
        }
        base.dispatchEvent(ev);
        this._popupEl.dispatchEvent(
          new CustomEvent("browser-mod-style-hass-more-info-dialog", {
            bubbles: false,
            composed: false,
            cancelable: false,
            detail: {
              apply: true,
            },
          })
        );
      });

      this._popupEl.addEventListener("browser-mod-style-hass-more-info-dialog", async (ev: CustomEvent) => {
        if (!this._popupEl?._allowNestedMoreInfo) return;
        const hassMoreInfoDialog = await getMoreInfoDialog(ev.detail?.apply);
        if (hassMoreInfoDialog) {
          let styleEl = hassMoreInfoDialog.shadowRoot.querySelector("#browser-mod-style");
          if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = "browser-mod-style";
            styleEl.innerHTML = `
            :host([browser-mod-nested]) ha-dialog {
              position: fixed !important;
              z-index: 999 !important;
            }`;
            hassMoreInfoDialog.shadowRoot.appendChild(styleEl);
          }
          if (ev.detail?.apply) {
            hassMoreInfoDialog.setAttribute("browser-mod-nested", "");
          } else {
            hassMoreInfoDialog.removeAttribute("browser-mod-nested");
          }
        }
      });

      this._popupEl.addEventListener("hass-action", async (ev: CustomEvent) => {
        const actionType = ev.detail.action;
        if (actionType) {
          const actionConfig = ev.detail?.config?.[`${actionType}_action`];        
          if (actionConfig) {
            if (actionConfig.action === "more-info") {
              ev.stopPropagation();
              this.showMoreInfo(
                actionConfig.entity ? actionConfig.entity : ev.detail.config.entity,
                actionConfig.large ?? false,
                actionConfig.ignore_popup_card ?? false,
              );
              return;
            } else if (CLOSE_POPUP_ACTIONS.has(actionConfig.action)){
              this._popupEl.do_close();
            }
          }
        }
        ev.stopPropagation();
        const base = await hass_base_el();
        base.dispatchEvent(ev);
      });

      this._popupEl.addEventListener("show-dialog", async (ev) => {
        ev.stopPropagation();
        const base = await hass_base_el();
        base.dispatchEvent(ev);
      });

      const historyListener = async (ev) => {
        const popupState = ev.state?.browserModPopup;
        if (popupState) {
          if (!popupState.open) {
            if (this._popupEl?.open && this._popupEl?.dismissable)
              await this._popupEl.do_close();
          }
        }
      };
      window.addEventListener("popstate", historyListener);
      const locationListener = async (ev) => {
        if (this._popupEl?.open)
            await this._popupEl.do_close();
      };
      window.addEventListener("location-changed", locationListener);

      this._contextProviderValues = [];
      // Pass on the context request to hass base element as we are outside its DOM tree
      // Not using @lit/context as it does not work on older devices
      // Rather we patch through to hass base, first providing the last known context value
      // to manage any issues with cards and contexts. e.g. history card.
      this._popupEl.addEventListener("context-request", async (ev) => {
        const value = (ev.context in this._contextProviderValues) ? this._contextProviderValues[ev.context] : {};
        ev.callback(value, (value: any, unsubscribe: any) => { void(0); });
        const base = await hass_base_el() as any;
        base.__contextProviders[ev.context].onContextRequest(ev);
        this._contextProviderValues[ev.context] =base.__contextProviders[ev.context].value;
      });
    }

    showPopup(...args) {
      (async () => {
        if (this._popupEl.open) await this._popupEl.do_close();
        if (history.state?.browserModPopup === undefined) {
          history.replaceState(
            {
              browserModPopup: {
                open: false,
              },
            },
            ""
          );
        }
        history.pushState(
          {
            browserModPopup: {
              open: true,
            },
          },
          ""
        );
        await this._popupEl.setupDialog(...args);
        this._popupEl.openDialog();
      })();
    }

    async closePopup(...args) {
      this._popupEl.closeDialog();
      // Prefer closing ha-dialog directly as this is better for issues when webRTC is used on dialog
      const haDialog = await getMoreInfoDialogHADialog();
      if (haDialog) {
        haDialog.close();
      } else {
        this.showMoreInfo("");
      }
    }

    async showMoreInfo(entityId, large = false, ignore_popup_card = undefined) {
      const base = await hass_base_el();
      base.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: { entityId, ignore_popup_card },
        })
      );
      if (large) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        const dialog: any = base.shadowRoot.querySelector(
          "ha-more-info-dialog"
        );
        if (dialog) dialog.large = true;
      }
      if (this._popupEl?.open) {
        this._popupEl.dispatchEvent(
          new CustomEvent("browser-mod-style-hass-more-info-dialog", {
            bubbles: false,
            composed: false,
            cancelable: false,
            detail: {
              apply: true,
            },
          })
        );
      }
    }
  };
};

/*
service: browser_mod.popup
data:
  title: closer
  content:
    - selector:
        select:
          options:
            - a
            - b
            - c
            - d
            - e
            - f
            - g
            - h
            */

/*
ha-select $ mwc-menu $ mwc-menu-surface $: |
  div.mdc - menu - surface {
    position: fixed;
  }

*/
