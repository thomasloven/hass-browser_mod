import { LitElement, html, css } from "lit";
import { property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { provideHass, loadLoadCardHelpers, hass_base_el } from "../helpers";

let aaa = 0;

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

  async closeDialog() {
    this.open = false;
    clearInterval(this._timeoutTimer);
    if (this._autocloseListener) {
      window.browser_mod.removeEventListener(
        "browser-mod-activity",
        this._autocloseListener
      );
      this._autocloseListener = undefined;
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
        if (ellapsed >= this.timeout) this._timeout();
      }, 10);
    }
    this._autocloseListener = undefined;
    if (this._autoclose) {
      this._autocloseListener = this._dismiss.bind(this);
      window.browser_mod.addEventListener(
        "browser-mod-activity",
        this._autocloseListener
      );
    }
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
    } = {}
  ) {
    this.title = title;
    if (content && typeof content === "object") {
      // Create a card from config in content
      this.card = true;
      const helpers = await window.loadCardHelpers();
      const card = await helpers.createCardElement(content);
      card.hass = window.browser_mod.hass;
      provideHass(card);
      this.content = card;
    } else {
      // Basic HTML content
      this.card = undefined;
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

  async _primary() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.closeDialog();
    this._actions?.right_button_action?.();
  }
  async _secondary() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.closeDialog();
    this._actions?.left_button_action?.();
  }
  async _dismiss() {
    await this.closeDialog();
    this._actions?.dismiss_action?.();
  }
  async _timeout() {
    if (this._actions?.dismiss_action) this._actions.dismiss_action = undefined;
    await this.closeDialog();
    this._actions?.timeout_action?.();
  }

  render() {
    if (!this.open) return html``;

    return html`
      <ha-dialog
        open
        .heading=${this.title !== undefined}
        ?hideActions=${this.actions === undefined}
        .scrimClickAction=${this.dismissable ? this._dismiss : ""}
        .escapeKeyAction=${this.dismissable ? this._dismiss : ""}
      >
        ${this.timeout
          ? html` <div slot="heading" class="progress"></div> `
          : ""}
        ${this.title
          ? html`
              <app-toolbar slot="heading">
                ${this.dismissable
                  ? html`
                      <ha-icon-button dialogAction="cancel">
                        <ha-icon .icon=${"mdi:close"}></ha-icon>
                      </ha-icon-button>
                    `
                  : ""}
                <div class="main-title">${this.title}</div>
              </app-toolbar>
            `
          : html``}

        <div class="content">${this.content}</div>

        ${this.right_button !== undefined
          ? html`
              <mwc-button
                slot="primaryAction"
                .label=${this.right_button}
                @click=${this._primary}
              ></mwc-button>
            `
          : ""}
        ${this.left_button !== undefined
          ? html`
              <mwc-button
                slot="secondaryAction"
                .label=${this.left_button}
                @click=${this._secondary}
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
        --mdc-dialog-min-width: var(--popup-min-width, 400px);
        --mdc-dialog-max-width: var(--popup-max-width, 600px);
        --mdc-dialog-heading-ink-color: var(--primary-text-color);
        --mdc-dialog-content-ink-color: var(--primary-text-color);
        --justify-action-buttons: space-between;

        --mdc-dialog-box-shadow: 0px 0px 0px
          var(--popup-border-width, var(--ha-card-border-width, 2px))
          var(
            --popup-border-color,
            var(--ha-card-border-color, var(--divider-color, #e0e0e0))
          );
        --ha-dialog-border-radius: var(--popup-border-radius, 8px);
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

      app-toolbar {
        flex-shrink: 0;
        color: var(--primary-text-color);
        background-color: var(
          --popup-header-background-color,
          var(--popup-background-color, --sidebar-background-color)
        );
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
      .content {
        --padding-x: 24px;
        --padding-y: 20px;
        margin: -20px -24px;
        padding: var(--padding-y) var(--padding-y);
        --header-height: 64px;
        --footer-height: 0px;
      }
      .content:first-child {
        --header-height: 0px;
      }

      :host([card]) .content {
        --padding-x: 0px;
        --padding-y: 0px;
      }
      :host([actions]) .content {
        border-bottom: 1px solid var(--popup-border-color, var(--divider-color));
        --footer-height: 54px;
      }
      :host([wide]) .content {
        width: calc(90vw - 2 * var(--padding-x));
      }
      :host([fullscreen]) .content {
        height: calc(
          100vh - var(--header-height) - var(--footer-height) - 2 *
            var(--padding-y)
        );
      }

      @media all and (max-width: 450px), all and (max-height: 500px) {
        ha-dialog {
          --mdc-dialog-min-width: 100vw;
          --mdc-dialog-max-width: 100vw;
          --mdc-dialog-min-height: 100%;
          --mdc-dialog-max-height: 100%;
          --mdc-shape-medium: 0px;
          --vertial-align-dialog: flex-end;
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

      // const historyListener = async (ev) => {
      //   const popupState = ev.state?.browserModPopup;
      //   if (popupState) {
      //     if (popupState.open) {
      //       this._popupEl.setupDialog(...popupState.args);
      //       this._popupEl.openDialog();
      //     } else {
      //       this._popupEl.closeDialog();
      //     }
      //   }
      // };
      // window.addEventListener("popstate", historyListener);
    }

    showPopup(...args) {
      // if (history.state?.browserModPopup === undefined) {
      //   history.replaceState(
      //     {
      //       browserModPopup: {
      //         open: false,
      //       },
      //     },
      //     ""
      //   );
      // }
      // history.pushState(
      //   {
      //     browserModPopup: {
      //       open: true,
      //       args,
      //     },
      //   },
      //   ""
      // );
      this._popupEl.setupDialog(...args).then(() => this._popupEl.openDialog());
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
