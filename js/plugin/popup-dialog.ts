import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { repeat } from "lit/directives/repeat.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import structuredClone from "@ungap/structured-clone";

import {
  ensureArray,
  provideHass,
  selectTree,
} from "../helpers";
import { loadHaForm } from "../helpers";
import { ObjectSelectorMonitor } from "../object-selector-monitor";
import { DialogWidth, HaButtonElement, IconProps, PopupStyle } from "../types/types";
import { BrowserModPopupParams } from "./popups";
export class BrowserModPopup extends LitElement {
  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) width: DialogWidth = "medium";
  @property({ type: Boolean }) preventScrimClose: boolean = false;
  @property({ type: String }) headerTitle: string = "";
  @property({ type: String }) headerSubtitle: string = "";
  @property({ type: String }) headerSubtitlePosition: "above" | "below" = "below";
  @property({ type: Object }) content: any;
  @property({ type: Object }) rightBtn: HaButtonElement = {} as HaButtonElement;
  @property({ type: Object }) leftBtn: HaButtonElement = {} as HaButtonElement;
  @property({ type: Object }) Icon: IconProps = {} as IconProps;
  @property({ type: Array }) icons: IconProps[] = [];
  @property({ type: Boolean }) flexContent: boolean = false;
  @property({ type: Boolean }) dismissable: boolean = true;
  @property({ type: String }) dismissIcon: string = "";
  @property({ type: String }) tag: string = "";
  @property({ type: Number }) timeout: number = 0;
  @property({ type: Boolean }) timeoutHideProgress: boolean = false;
  @property({ attribute: false }) dismissAction?: (formdata?: any) => void;
  @property({ attribute: false }) timeoutAction?: () => void;
  @property({ type: Object }) cardMod: { style?: string; debug?: boolean } = {};
  @property({ type: String }) initialStyle: string = "normal";
  @property({ type: String }) _style: string = "";
  @property({ type: Array }) _styleAttributes: Record<string, boolean> = {};
  @state() _open: boolean = false;
  @state() _bodyScrolled: boolean = false;
  @state() _popupStyles: PopupStyle[] = [];
  @state() _formdata: any;
  @state() _formDataValid: boolean = true;
  @state() _card: boolean = false;
  @state() _styleSequence: string[] = ["wide", "normal"];
  @state() _styleSequenceIndex: number = 0;
  @state() _narrow: boolean = false;

  private _timeoutTimer: ReturnType<typeof setInterval> | null = null;
  private _timeoutStart: number = 0;
  private _autoclose: boolean = false;
  private _autocloseListener: (() => void) | null = null;
  private _objectSelectorMonitor!: ObjectSelectorMonitor;
  private _resizeObserver: ResizeObserver;

  public showDialog = async (args: BrowserModPopupParams): Promise<void> => {
    const headerTitle = args.title;
    const headerSubtitle = args.subtitle;
    const content = args.content;
    if (args.title) delete args.title;
    if (args.subtitle) delete args.subtitle;
    if (args.content) delete args.content;
    await this.setupDialog(headerTitle, headerSubtitle, content, args as Object);
    await this.updateComplete;
    this._open = true;
  };

  _handleShow = async (): Promise<void> => {
    this._initializeTimeout();
    this._setupAutoclose();
    this._applyCardMod();
    await this._handleCardAndFormSetup();
    this._checkViewportMargin();
    this._dispatchOpenEvent();
  }

  private _initializeTimeout = (): void => {
    if (!this.timeout) return;

    this._timeoutStart = Date.now();
    this._timeoutTimer = setInterval(() => {
      const elapsed = Date.now() - this._timeoutStart;
      if (elapsed >= this.timeout) {
        if (this._timeoutTimer) {
          clearInterval(this._timeoutTimer);
          this._timeoutTimer = null;
        }
        this._timeout();
      } else if (!this.timeoutHideProgress) {
        this.style.setProperty("--progress", `${(elapsed / this.timeout) * 100}%`);
      }
    }, 10);
  }

  private _setupAutoclose = (): void => {
    this._autocloseListener = null;
    if (!this._autoclose) return;

    this._autocloseListener = () => { this._open = false; };
    window.browser_mod.addEventListener(
      "browser-mod-activity",
      this._autocloseListener,
      { once: true }
    );
  }

  private _applyCardMod = (): void => {
    customElements.whenDefined("card-mod").then(() => {
      const cardModElement = customElements.get("card-mod") as any;
      if (!cardModElement?.applyToElement) return;

      const tagName = this.tag ? `browser-mod-popup-${this.tag}` : "more-info";
      const styleConfig = this.cardMod?.style
        ? { style: this.cardMod.style, debug: this.cardMod.debug ?? false }
        : { style: "{}", debug: this.cardMod?.debug ?? false };

      cardModElement.applyToElement(
        this,
        tagName,
        styleConfig,
        {},
        true,
        "browser_mod-card_mod"
      );
    });
  }

  private _handleCardAndFormSetup = async (): Promise<void> => {
    await this.updateComplete;

    if (this._card) {
      const el = await selectTree(this.content, "$");
      if (el) {
        const styleEl = document.createElement("style");
        styleEl.classList.add("browser-mod-style");
        styleEl.innerHTML = `
          ha-card {
            box-shadow: none !important;
            border: none !important;
          }`;
        el.appendChild(styleEl);
      }
    }

    if (this._formdata) {
      setTimeout(() => this._objectSelectorMonitor.startMonitoring(), 0);
    }
  }

  private _dispatchOpenEvent = (): void => {
    window.browser_mod.dispatchEvent(
      new CustomEvent("browser-mod-popup-opened", {
        detail: { popup: this },
      })
    );
  }

  _handleAfterShow = () => {
    // Placeholder for post-show actions
  };

  _updateStyleAttributes = (newStyle: string): void => {
    if (newStyle == "initial") newStyle = this.initialStyle;
    // Clear previous style attributes
    Object.keys(this._styleAttributes).forEach((key) => {
      this._styleAttributes[key] = false;
    });
    this._styleAttributes[newStyle] = true;
    this._popupStyles?.forEach((style) => {
      if (style.style === newStyle) {
        style.include_styles?.forEach((s) => {
          this._styleAttributes[s] = true;
        });
      }
    });
    // Copy array so lit picks up change
    this._styleAttributes = structuredClone(this._styleAttributes);
  }

  _setStyleAttribute = (newStyle: string): void => {
    this._updateStyleAttributes(newStyle);
    const index = this._styleSequence.indexOf(newStyle);
    this._styleSequenceIndex = index >= 0 ? index : 0;
  }

  _cycleStyleAttributes = (dir: string = "forward"): void => {
    const length = this._styleSequence.length;
    if (length === 0) return;

    if (dir === "forward") {
      this._styleSequenceIndex = (this._styleSequenceIndex + 1) % length;
    } else {
      this._styleSequenceIndex = (this._styleSequenceIndex - 1 + length) % length;
    }
    this._updateStyleAttributes(this._styleSequence[this._styleSequenceIndex]);
  }

  _timeout = (): void => {
    const timeoutAction = this.timeoutAction;
    this.dismissAction = undefined;
    this._close();
    timeoutAction?.();
  };

  _iconAction = async (index: number): Promise<void> => {
    this.dismissAction = undefined;
    const icon = this.icons?.[index];
    if (icon?.close) this._close();
    await icon?.action?.(index);
  }

  _buttonAction = async (button: HaButtonElement): Promise<void> => {
    if (this.dismissAction) this.dismissAction = undefined;
    if (button.isCloseable === true) await this._close();
    button.action?.(this._formdata);
  }

  public _close = (): void => {
    const action = this.dismissAction;
    this.dismissAction = undefined;
    this._open = false;
    action?.(this._formdata);
    this._objectSelectorMonitor?.stopMonitoring();
  }

  _handleAfterHide = () => {
    this._objectSelectorMonitor.stopMonitoring();
    if (this._timeoutTimer) {
      clearInterval(this._timeoutTimer);
      this._timeoutTimer = null;
    }
    if (this._autocloseListener) {
      window.browser_mod.removeEventListener(
        "browser-mod-activity",
        this._autocloseListener
      );
      this._autocloseListener = null;
    }
    this.dismissAction?.();
    if ((this as any)._cardMod?.[0]) {
      (this as any)._cardMod[0].styles = "";
    }
    window.browser_mod.dispatchEvent(
      new CustomEvent("browser-mod-popup-closed",
        {
          detail: {
            popup: this,
          },
        }
      )
    );
    Object.keys(this._styleAttributes).forEach((key) => {
      key.split(" ").forEach((k) => this.removeAttribute(k));
    });
    this._styleAttributes = {};
    this._styleSequenceIndex = 0;
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    return true;
  }

  private _setFormdata = (schema: any[]): void => {
    for (const item of schema) {
      if (item["schema"]) {
        this._setFormdata(item["schema"]);
      } else if (item.name && item.default !== undefined) {
        this._formdata[item.name] = item.default;
      }
    }
  }

  private _setupResizeObserver() {
    // Check viewport margin on window resize
    this._resizeObserver = new ResizeObserver(() => {
      this._checkViewportMargin();
    });

    // Observe window size changes
    this._resizeObserver.observe(document.body);

    // Initial check
    this._checkViewportMargin();
  }

  private _checkViewportMargin() {
    const MARGIN_THRESHOLD = 50; // px
    const windowWidth = window.innerWidth;

    // Get the dialog element to read its actual styles
    const dialogElement = this.shadowRoot?.querySelector('ha-dialog') as HTMLElement;
    if (!dialogElement) return;

    const computedStyle = getComputedStyle(dialogElement);
    let dialogMinWidth = 580; // default
    let dialogMaxWidth = 580; // default

    // Parse min/max width from CSS variables
    const minWidthStr = computedStyle.getPropertyValue('--mdc-dialog-min-width').trim();
    const maxWidthStr = computedStyle.getPropertyValue('--mdc-dialog-max-width').trim();

    // Only parse if not in narrow mode (not 100vw)
    if (minWidthStr && !minWidthStr.includes('100vw')) {
      const parsed = parseFloat(minWidthStr);
      if (!isNaN(parsed)) {
        dialogMinWidth = minWidthStr.includes('vw') ? (parsed / 100) * windowWidth : parsed;
      }
    }
    if (maxWidthStr && !maxWidthStr.includes('100vw')) {
      const parsed = parseFloat(maxWidthStr);
      if (!isNaN(parsed)) {
        dialogMaxWidth = maxWidthStr.includes('vw') ? (parsed / 100) * windowWidth : parsed;
      }
    }

    // Use the configured width
    const dialogWidth = Math.max(dialogMinWidth, dialogMaxWidth);

    // Calculate horizontal margin (space on both sides combined)
    const totalHorizontalMargin = windowWidth - dialogWidth;

    // Set narrow attribute if total margin is too small
    // This means there's less than MARGIN_THRESHOLD pixels on each side
    const shouldBeNarrow = totalHorizontalMargin <= (MARGIN_THRESHOLD * 2);

    if (this._narrow !== shouldBeNarrow) {
      this._narrow = shouldBeNarrow;
    }
  }

  private _build_card = async (config: any): Promise<void> => {
    try {
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
    } catch (error) {
      console.error("Failed to build card:", error);
      this.content = unsafeHTML(`<p>Error loading card</p>`);
    }
  }
  
  private _handleBodyScroll = (ev: Event): void => {
    this._bodyScrolled = (ev.target as HTMLDivElement).scrollTop > 0;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has("open") && this.open !== this._open) {
      this._open = this.open;
    }
    if (changedProperties.has("_styleAttributes")) {
      Object.keys(this._styleAttributes).forEach((key) => {
        if (this._styleAttributes[key]) {
          key.split(" ").forEach((k) => this.setAttribute(k, ""));
        } else {
          key.split(" ").forEach((k) => this.removeAttribute(k));
        }
      });
    }
    if (changedProperties.has("_narrow")) {
      if (this._narrow) {
        this.setAttribute("narrow", "");
      } else {
        this.removeAttribute("narrow");
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this._objectSelectorMonitor = new ObjectSelectorMonitor(
      this,
      (value: boolean) => { this._formDataValid = value }
    );

    if (!this._styleAttributes || Array.isArray(this._styleAttributes)) {
      this._styleAttributes = {};
    }
    Object.keys(this._styleAttributes).forEach((key) => {
      this._styleAttributes[key] = false;
    });

    this._setupResizeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._open = false;
  }

  async setupDialog(
    headerTitle: string,
    headerSubtitle: string,
    content: any,
    {
      style = "",
      dismissable = true,
      dismiss_icon = undefined,
      dismiss_action = undefined,
      popup_styles = [],
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
      icon = undefined,
      icon_title = undefined,
      icon_action = undefined,
      icon_close = true,
      icon_class = undefined,
      icons = undefined,
      tag = undefined,
      timeout = undefined,
      timeout_action = undefined,
      timeout_hide_progress = undefined,
      autoclose = false,
      size = undefined,
      initial_style = undefined,
      card_mod = undefined,
      style_sequence = undefined,
    } = {}
  ) {
    this._formdata = undefined;
    this._formDataValid = true;
    this.headerTitle = headerTitle;
    this.headerSubtitle = headerSubtitle;
    this._card = false;
    this.cardMod = card_mod;
    this.initialStyle = initial_style ?? size ?? "normal";
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
      this._card = true;
      await this._build_card(content);
    } else {
      // Basic HTML content
      this.content = unsafeHTML(content);
    }
    this.tag = tag;
    this.timeout = timeout;
    this.timeoutHideProgress = timeout_hide_progress;
    this._style = style;
    this._popupStyles = popup_styles;
    this._styleSequence = ensureArray(style_sequence ?? []);
    this._styleSequence = this._styleSequence.length > 0 ? this._styleSequence : ["wide", "normal"];
    this._setStyleAttribute(this.initialStyle);

    this.dismissable = dismissable;
    this.dismissIcon = dismiss_icon;
    this._autoclose = autoclose;
    this.dismissAction = dismiss_action;
    this.timeoutAction = timeout_action;

    this.icons = this._setupIcons(icons, icon, icon_title, icon_close, icon_class, icon_action);

    this.rightBtn = this._createButton(
      right_button,
      right_button_variant,
      right_button_appearance,
      right_button_close,
      right_button_action
    );
    this.leftBtn = this._createButton(
      left_button,
      left_button_variant,
      left_button_appearance,
      left_button_close,
      left_button_action
    );
  }

  private _setupIcons(
    icons: any,
    icon: any,
    icon_title: any,
    icon_close: any,
    icon_class: any,
    icon_action: any
  ): IconProps[] {
    const iconDefaults: IconProps = {
      icon: "",
      title: "",
      close: true,
      class: "",
      action: undefined
    };

    if (icons) {
      return icons.map((iconItem: any) => ({ ...iconDefaults, ...iconItem }));
    } else if (icon) {
      return [{
        icon: icon,
        title: icon_title,
        close: icon_close,
        class: icon_class,
        action: icon_action
      }];
    }
    return [];
  }

  private _createButton(
    label: any,
    variant: any = "brand",
    appearance: any = "plain",
    isCloseable: any = true,
    action: any = undefined
  ): HaButtonElement {
    return {
      label: label ?? undefined,
      variant: variant ?? "brand",
      appearance: appearance ?? "plain",
      isCloseable: isCloseable ?? true,
      action: action ?? undefined
    } as HaButtonElement;
  }

  render() {
    if (!this._open) return html``;

    return html`
      <ha-dialog
        open
        @closed=${this._handleAfterHide}
        .heading=${this.headerTitle !== undefined}
        hideActions
        flexContent
        .scrimClickAction=${this.dismissable ? "close" : ""}
        .escapeKeyAction=${this.dismissable ? "close" : ""}
      >
        ${this.timeout && !this.timeoutHideProgress
        ? html` <div slot="heading" class="progress"></div> `
        : ""}
        ${this.headerTitle
        ? html`
              <ha-dialog-header slot="heading">
                ${this.dismissable
            ? html`
                      <ha-icon-button
                        dialogAction="cancel"
                        slot="navigationIcon"
                      >
                        <ha-icon 
                          .icon=${this.dismissIcon || "mdi:close"}>
                        </ha-icon>
                      </ha-icon-button>
                    `
            : ""}
                <span 
                  slot="title" 
                  @click=${() => { this._cycleStyleAttributes() }} 
                  .title="${this.headerTitle}"
                  class="title"
                >${this.headerTitle}</span>
                ${this.icons
            ?
            repeat(
              this.icons,
              (_icon, index) => index,
              (icon, index) => html`
                        <ha-icon-button
                          slot="actionItems"
                          title=${icon.title ?? ""}
                          @click=${() => { this.blur(); this._iconAction(index) }}
                          class=${ifDefined(icon.class)}
                        >
                          <ha-icon .icon=${icon.icon}></ha-icon>
                        </ha-icon-button>
                      `
            )
            : ""}
              </ha-dialog-header>
            `
        : html``}

        <div class="content" tabindex="-1" dialogInitialFocus>
          <div class="container">${this.content}</div>
          ${this.leftBtn.label !== undefined || this.rightBtn.label !== undefined
        ? html`
                <div class="buttons">
                  ${this.leftBtn.label
            ? html`<ha-button
                        variant="${this.leftBtn.variant}"
                        appearance="${this.leftBtn.appearance}"
                        size="${this.leftBtn.size}"
                        @click=${this._buttonAction.bind(this, this.leftBtn)}
                      >
                        ${this.leftBtn.label}
                      </ha-button>`
            : html`<div/>`}
                  ${this.rightBtn.label
            ? html`<ha-button
                        variant="${this.rightBtn.variant}"
                        appearance="${this.rightBtn.appearance}"
                        size="${this.rightBtn.size}"
                        @click=${this._buttonAction.bind(this, this.rightBtn)}
                      >
                        ${this.rightBtn.label}
                      </ha-button>`
            : html`<div/>`}
        </div>
              `
        : ""}
        </div>
        <style>
          ${this.getDynamicStyles()}
        </style>
      </ha-dialog>
    `;
  }

  private getDynamicStyles(): string {
    const baseStyle = this._style ? `:host { ${this._style} }` : "";

    const popupStyles = this._popupStyles
      ?.filter((style) => style.styles)
      .map((style) => {
        const selector = style.style === 'all' ? ':host' : `:host([${style.style}])`;
        return `${selector} { ${style.styles} }`;
      })
      .join("\n") ?? "";

    return `${baseStyle}\n${popupStyles}`;
  }

    static get styles() {
    return css`
      /* Styles adapted from Home Assistant more-info dialog */

      /* Smooth transitions for responsive changes */
      :host {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      ha-dialog {
        /* Dialog sizing - matching HA more-info */
        --mdc-dialog-min-width: var(--popup-min-width, 580px);
        --mdc-dialog-max-width: var(--popup-max-width, 580px);
        --mdc-dialog-max-height: calc(100% - 72px);

        /* Dialog positioning */
        --dialog-surface-position: static;
        --dialog-content-position: static;
        --vertical-align-dialog: flex-start;
        --dialog-surface-margin-top: max(40px, var(--safe-area-inset-top, 0px));
        --dialog-content-padding: 0;

        /* Dialog appearance */
        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
        --padding-x: var(--popup-padding-x, 24px);
        --padding-y: var(--popup-padding-y, 20px);

        /* Action buttons */
        --justify-action-buttons: space-between;

        /* Z-index */
        --dialog-z-index: 8;

        /* Smooth animations for size/position changes */
        transition:
          min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          min-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          margin-top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Animate dialog surface */
      ha-dialog::part(surface) {
        transition:
          border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          margin 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      ha-dialog .form {
        color: var(--primary-text-color);
      }

      a {
        color: var(--primary-color);
      }

      /* Scrollbar styling - matching HA */
      .ha-scrollbar::-webkit-scrollbar {
        width: 0.4rem;
        height: 0.4rem;
      }

      .ha-scrollbar::-webkit-scrollbar-thumb {
        border-radius: var(--ha-border-radius-sm, 4px);
        background: var(--scrollbar-thumb-color);
      }

      .content {
        /* Content layout - matching HA more-info */
        display: flex;
        flex-direction: column;
        outline: none;
        flex: 1;
        overflow: hidden;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-focus-ring-color: rgba(0, 0, 0, 0);

        /* Smooth transitions for content */
        transition:
          width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .content .container {
        padding: 8px 24px 20px 24px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-focus-ring-color: rgba(0, 0, 0, 0);
        outline: none !important;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        display: block;

        /* Smooth padding animation */
        transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Child view layout - matching HA more-info */
      .child-view {
        display: flex;
        flex-direction: column;
        flex: 1;
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
        background-color: var(--ha-dialog-surface-background, var(--mdc-theme-surface, #fff));
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
      .title {
        /* Title styling - matching HA more-info */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        -webkit-user-select: none;
        user-select: none;
      }

      .title .main {
        color: var(--primary-text-color);
        font-size: var(--ha-font-size-xl, 22px);
        line-height: var(--ha-line-height-condensed, 1.2);
      }

      .title .breadcrumb {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-m, 16px);
        line-height: var(--ha-line-height-condensed, 1.2);
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

      /* Dynamic narrow mode - triggered when viewport margin <= 50px */
      /* Animation applied automatically via ha-dialog transitions */
      :host([narrow]) ha-dialog {
        --mdc-dialog-min-width: 100vw;
        --mdc-dialog-max-width: 100vw;
        --mdc-dialog-min-height: 100%;
        --mdc-dialog-max-height: 100%;
        --vertical-align-dialog: flex-end;
        --ha-dialog-border-radius: 0;
        --dialog-surface-margin-top: 0px;
      }

      :host([narrow][wide]) .content {
        width: 100vw;
      }

      /* Smooth scale animation for narrow transition */
      @keyframes narrowEnter {
        from {
          transform: scale(0.95);
          opacity: 0.9;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes narrowExit {
        from {
          transform: scale(1);
          opacity: 1;
        }
        to {
          transform: scale(0.95);
          opacity: 0.9;
        }
      }

      /* Apply subtle animation when entering narrow mode */
      :host([narrow]) .content {
        animation: narrowEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
  }
}