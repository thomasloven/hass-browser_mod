import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { provideHass, loadLoadCardHelpers, hass_base_el } from "../helpers";
import { loadHaForm } from "../helpers";

class BrowserModPopup extends LitElement {
  @property() open;
  @property() content;
  @property() title;
  @property({ reflect: true }) actions;
  @property({ reflect: true }) card;
  @property() right_button;
  @property() left_button;
  @property() dismissable;
  @property({ reflect: true }) wide;
  @property({ reflect: true }) fullscreen;
  @property() _style;
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

  async closeDialog() {
    this.open = false;
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
  }

  openDialog() {
    this.open = true;
    this.dialog?.show();
    if (this.timeout) {
      this._timeoutStart = new Date().getTime();
      this._timeoutTimer = setInterval(() => {
        const ellapsed = new Date().getTime() - this._timeoutStart;
        const progress = (ellapsed / this.timeout) * 100;
        this.style.setProperty("--progress", `${progress}%`);
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
        this.card_mod?.style ?? ""
      );
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

  async setupDialog(
    title,
    content,
    {
      right_button = undefined,
      right_button_action = undefined,
      left_button = undefined,
      left_button_action = undefined,
      dismissable = true,
      dismiss_action = undefined,
      timeout = undefined,
      timeout_action = undefined,
      size = undefined,
      style = undefined,
      autoclose = false,
      card_mod = undefined,
    } = {}
  ) {
    this._formdata = undefined;
    this.title = title;
    this.card = undefined;
    this.card_mod = card_mod;
    if (content && content instanceof HTMLElement) {
      this.content = content;
    } else if (content && Array.isArray(content)) {
      loadHaForm();
      const form: any = document.createElement("ha-form");
      form.schema = content;
      form.computeLabel = (s) => s.label ?? s.name;
      form.hass = window.browser_mod.hass;
      this._formdata = {};
      for (const i of content) {
        if (i.name && i.default !== undefined) {
          this._formdata[i.name] = i.default;
        }
      }
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
      // Create a card from config in content
      this.card = true;
      this._build_card(content);
    } else {
      // Basic HTML content
      this.content = unsafeHTML(content);
    }

    this.right_button = right_button;
    this.left_button = left_button;
    this.actions = right_button === undefined ? undefined : "";

    this.dismissable = dismissable;
    this.timeout = timeout;
    this._actions = {
      right_button_action,
      left_button_action,
      dismiss_action,
      timeout_action,
    };
    this.wide = size === "wide" ? "" : undefined;
    this.fullscreen = size === "fullscreen" ? "" : undefined;
    this._style = style;
    this._autoclose = autoclose;
  }

  async do_close() {
    const action = this._actions?.dismiss_action;
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.dialog?.close();
    action?.(this._formdata);
  }

  async _primary() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.do_close();
    this._actions?.right_button_action?.(this._formdata);
  }
  async _secondary() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.do_close();
    this._actions?.left_button_action?.(this._formdata);
  }
  async _timeout() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.do_close();
    this._actions?.timeout_action?.();
  }

  render() {
    if (!this.open) return html``;

    return html`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        .heading=${this.title !== undefined}
        ?hideActions=${this.actions === undefined}
        .scrimClickAction=${this.dismissable ? "close" : ""}
        .escapeKeyAction=${this.dismissable ? "close" : ""}
      >
        ${this.timeout
          ? html` <div slot="heading" class="progress"></div> `
          : ""}
        ${this.title
          ? html`
              <div slot="heading">
                <ha-header-bar>
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
                  <div slot="title" class="main-title">${this.title}</div>
                </ha-header-bar>
              </div>
            `
          : html``}

        <div class="content">${this.content}</div>

        ${this.right_button !== undefined
          ? html`
              <mwc-button
                slot="primaryAction"
                .label=${this.right_button}
                @click=${this._primary}
                class="action-button"
              ></mwc-button>
            `
          : ""}
        ${this.left_button !== undefined
          ? html`
              <mwc-button
                slot="secondaryAction"
                .label=${this.left_button}
                @click=${this._secondary}
                class="action-button"
              ></mwc-button>
            `
          : ""}
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
      ha-dialog {
        z-index: 10;
        --mdc-dialog-min-width: var(--popup-min-width, 400px);
        --mdc-dialog-max-width: var(--popup-max-width, 600px);
        --mdc-dialog-heading-ink-color: var(--primary-text-color);
        --mdc-dialog-content-ink-color: var(--primary-text-color);
        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
        --padding-x: var(--popup-padding-x, 24px);
        --padding-y: var(--popup-padding-y, 20px);
        --justify-action-buttons: space-between;

        --dialog-box-shadow: 0px 0px 0px
          var(--popup-border-width, var(--ha-card-border-width, 2px))
          var(
            --popup-border-color,
            var(--ha-card-border-color, var(--divider-color, #e0e0e0))
          );
        --mdc-theme-surface: var(
          --popup-background-color,
          var(--ha-card-background, var(--card-background-color, white))
        );
      }
      :host([wide]) ha-dialog {
        --mdc-dialog-max-width: 90vw;
      }
      :host([fullscreen]) ha-dialog {
        --mdc-dialog-min-width: 100vw;
        --mdc-dialog-max-width: 100vw;
        --mdc-dialog-min-height: 100%;
        --mdc-dialog-max-height: 100%;
        --mdc-shape-medium: 0px;
        --vertial-align-dialog: flex-end;
        --ha-dialog-border-radius: 0px;
      }
      .progress::before {
        content: "";
        position: absolute;
        left: 0;
        width: calc(100% - var(--progress, 60%));
        top: 0;
        height: 2px;
        background: var(--primary-color);
        z-index: 10;
      }

      ha-header-bar {
        --mdc-theme-on-primary: var(--primary-text-color);
        --mdc-theme-primary: var(--mdc-theme-surface);
        flex-shrink: 0;
        display: block;
      }

      ha-icon-button > * {
        display: flex;
      }
      .main-title {
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: default;
      }
      .content {
        margin: -20px -24px;
        padding: var(--padding-y) var(--padding-x);
        --header-height: 64px;
        --footer-height: 0px;
      }
      .content:first-child {
        --header-height: 0px;
      }

      :host([card]) .content {
        --padding-x: var(--popup-padding-x, 0px);
        --padding-y: var(--popup-padding-y, 0px);
        --ha-card-box-shadow: none;
      }
      :host([actions]) .content {
        --footer-height: 54px;
      }
      :host([wide]) .content {
        width: calc(90vw - 2 * var(--padding-x));
      }
      :host([fullscreen]) .content {
        height: calc(
          100vh - var(--header-height) - var(--footer-height) - 2 *
            var(--padding-y) - 16px
        );
      }

      .action-button {
        margin-bottom: -24px;
      }

      @media all and (max-width: 450px), all and (max-height: 500px) {
        ha-dialog {
          --mdc-dialog-min-width: 97vw;
          --mdc-dialog-max-width: 97vw;
          --mdc-shape-medium: 0px;
        }
        :host([wide]) .content {
          width: 100vw;
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
        this._popupEl.do_close();
        // this._popupEl.style.display = "none";
        base.dispatchEvent(ev);
      });

      const historyListener = async (ev) => {
        const popupState = ev.state?.browserModPopup;
        if (popupState) {
          if (!popupState.open) {
            if (this._popupEl?.open && this._popupEl?.dismissable)
              this._popupEl.do_close();
          }
        }
      };
      window.addEventListener("popstate", historyListener);
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

    closePopup(...args) {
      this._popupEl.closeDialog();
      this.showMoreInfo("");
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
    }
  };
};
