import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { provideHass, loadLoadCardHelpers } from "../helpers";

class BrowserModPopup extends LitElement {
  @property() open;
  @property() content;
  @property() title;
  @property({ reflect: true }) actions;
  @property({ reflect: true }) card;
  @property() primary_action;
  @property() secondary_action;
  @property() dismissable;

  closeDialog() {
    this.open = false;
  }

  openDialog() {
    this.open = true;
  }

  async setupDialog(
    title,
    content,
    {
      primary_action = undefined,
      secondary_action = undefined,
      dismissable = true,
    }
  ) {
    this.dismissable = dismissable;
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
      this.content = unsafeHTML(content);
    }
    if (primary_action) {
      this.primary_action = primary_action;
      this.secondary_action = secondary_action;
      this.actions = "";
    } else {
      this.primary_action = undefined;
      this.secondary_action = undefined;
      this.actions = undefined;
    }
  }

  _primary_clicked() {
    this.closeDialog();
    const eval2 = eval;
    this.primary_action?.callback?.();
  }
  _secondary_clicked() {
    this.closeDialog();
    const eval2 = eval;
    this.secondary_action?.callback?.();
  }

  render() {
    if (!this.open) return html``;

    return html`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        .heading=${this.title !== undefined}
        ?hideActions=${this.actions === undefined}
        .scrimClickAction=${this.dismissable ? undefined : ""}
        .escapeKeyAction=${this.dismissable ? undefined : ""}
      >
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

        ${this.primary_action !== undefined
          ? html`
              <mwc-button
                slot="primaryAction"
                .label=${this.primary_action.label}
                @click=${this._primary_clicked}
              ></mwc-button>
            `
          : ""}
        ${this.secondary_action !== undefined
          ? html`
              <mwc-button
                slot="secondaryAction"
                .label=${this.secondary_action.label}
                @click=${this._secondary_clicked}
              ></mwc-button>
            `
          : ""}
      </ha-dialog>
    `;
  }

  static get styles() {
    return css`
      ha-dialog {
        --mdc-dialog-min-width: 400px;
        --mdc-dialog-max-width: 600px;
        --mdc-dialog-heading-ink-color: var(--primary-text-color);
        --mdc-dialog-content-ink-color: var(--primary-text-color);
        --justify-action-buttons: space-between;

        --mdc-dialog-box-shadow: 0px 0px 0px var(--ha-card-border-width, 1px)
          var(--ha-card-border-color, var(--divider-color, #e0e0e0));
        --ha-dialog-border-radius: 8px;
        --mdc-theme-surface: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
      }

      app-toolbar {
        flex-shrink: 0;
        color: var(--primary-text-color);
        background-color: var(--sidebar-background-color);
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
        margin: -20px -24px;
        padding: 20px 24px;
      }

      :host([card]) .content {
        padding: 0;
      }
      :host([actions]) .content {
        border-bottom: 1px solid var(--divider-color);
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
      this._popupEl.setupDialog(...args);
      this._popupEl.openDialog();
    }

    closePopup(...args) {
      this._popupEl.closeDialog();
    }
  };
};
