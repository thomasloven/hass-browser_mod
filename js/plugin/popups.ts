import {
  loadLoadCardHelpers,
  hass_base_el,
} from "../helpers";
import { BrowserModPopup } from "./popup-dialog";

export const PopupMixin = (SuperClass) => {
  return class PopupMixinClass extends SuperClass {
    private _popupElements: BrowserModPopup[] = [];

    constructor() {
      super();

      loadLoadCardHelpers();

      this.addEventListener("browser-mod-popup-opened", this.popupStateListener);
      this.addEventListener("browser-mod-popup-closed", this.popupStateListener);
      window.addEventListener("keydown", this.keydownListener, { capture: true, passive: true });
      this._popupState = false;
    }

    get openPopups(): string[] {
      return this._popupElements
        .filter((popup) => popup.open === true)
        .map((popup) => popup.tag !== undefined ? popup.tag : "standard");
    }

    get popupState() {
      return this._popupElements.some((popup) => popup.open === true);
    }

    private popupStateListener = (ev: CustomEvent) => {
      const popup = ev.detail?.popup;
      if (!popup) return;
      if (ev.type === "browser-mod-popup-closed" || this._popupElements.includes(popup)) {
        this._popupElements = this._popupElements.filter(
          (p) => p !== popup
        );
        // Set the last popup to have background false if any popups remain
        if (this._popupElements.length > 0) {
          const lastIndex = this._popupElements.length - 1;
          this._popupElements[lastIndex].dialog.preventScrimClose = !(this._popupElements[lastIndex].dismissable ?? true);
        }
      }
      if (ev.type === "browser-mod-popup-opened") {
        this._popupElements.forEach((p) => { p.dialog.preventScrimClose = true; });
        this._popupElements.push(popup);
      }
    };

    private keydownListener = (ev: KeyboardEvent) => {
      // Make sure all popups with preventScrimClose set to true receive the escape key event to allow them 
      // to prevent default as multiple popups in the background do not get the event but rely on having
      // seen the escape key event to know to prevent default when wa-dialog fires hide event
      if (ev.key === "Escape" && this._popupElements.length > 0) {
        this._popupElements.forEach((p, index) => {
          if (p.dialog?.preventScrimClose && index !== this._popupElements.length - 1) {
            const waDialog = p.dialog?.shadowRoot?.querySelector("wa-dialog");
            waDialog?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: false }))
          }
        });
      }
    }

    showPopup(params: BrowserModPopupParams) {
      (async () => {
        const base: any = await hass_base_el();
        // Close any existing popup with the same tag to allow open to work
        await this.closePopup({ tag: params.tag ?? "" });
        const dialogTag = params.tag ? 
          `browser-mod-popup-${params.tag}` : "browser-mod-popup";
        showBrowserModPopup(base, dialogTag, params);
      })();
    }

    async closePopup(args) {
      const { all, tag } = args;
      if (all === true) {
        this._popupElements.forEach(async (popup) => await popup.closeDialog());
        // Wait to allow popups to be removed from DOM before proceeding to avoid issues with multiple popups and same tag
        await new Promise((resolve) => setTimeout(resolve, 100));
        this._popupElements = [];
      } else if (typeof tag === "string") {
        const dialogTag =
          tag != "" ?
            `browser-mod-popup-${tag}` :
            "browser-mod-popup";
        const popup = this._popupElements.find(
          (p) => p.nodeName.toLowerCase() === dialogTag
        );
        await popup?.closeDialog();
        // Wait to allow popup to be removed from DOM before proceeding to avoid issues with multiple popups and same tag
        await new Promise((resolve) => setTimeout(resolve, 100));
        await popup?.updateComplete;
      } else {
        const popup = this._popupElements.pop();
        await popup?.closeDialog();
        // Wait to allow popup to be removed from DOM before proceeding to avoid issues with multiple popups and same tag
        await new Promise((resolve) => setTimeout(resolve, 100));
        await popup?.updateComplete;
      }
    }

    async showMoreInfo(entityId, view = "info", large = false, ignore_popup_card = undefined, close = false) {
      const base = await hass_base_el();
      if (close) {
        // Provide a close option as the empty entity id method can cause issues
        // with camera stream audio tracks staying active
        const dialog: any = base.shadowRoot.querySelector(
          "ha-more-info-dialog"
        );
        if (dialog) dialog.closeDialog();
        return;
      }
      base.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: { entityId, view, ignore_popup_card },
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

    setPopupStyle(args) {
      const { all, tag, style, direction } = args;
      if (all === true) {
        this._popupElements.forEach((popup) => {
          style ? popup._setStyleAttribute(style) : popup._cycleStyleAttributes(direction);
        });
      } else if (typeof tag === "string") {
        const dialogTag =
          tag != "" ?
            `browser-mod-popup-${tag}` :
            "browser-mod-popup";
        const popup = this._popupElements.find(
          (p) => p.nodeName.toLowerCase() === dialogTag
        );
        style ? popup?._setStyleAttribute(style) : popup?._cycleStyleAttributes(direction);
      } else {
        const popup = this._popupElements.slice(-1)[0];
        style ? popup?._setStyleAttribute(style) : popup?._cycleStyleAttributes(direction);
      }
    }
  };
};

export interface BrowserModPopupParams {
  title: string;
  content?: any;
  [key: string]: any;
}

const customElementClassCache: Record<string, typeof BrowserModPopup> = {};

export function setCustomElementClass(dialogTag: string): void {
  if (customElementClassCache[dialogTag]) {
    return;
  }

  // Dynamically create a new class extending BrowserModPopup
  class DynamicPopup extends BrowserModPopup {}

  // Register the custom element if not already defined
  if (!customElements.get(dialogTag)) {
    customElements.define(dialogTag, DynamicPopup);
  }

  customElementClassCache[dialogTag] = DynamicPopup;
}

export const showBrowserModPopup = (
  element: HTMLElement,
  dialogTag: string,
  BrowserModPopupParams: BrowserModPopupParams
): void => {
  setCustomElementClass(dialogTag);
  element.dispatchEvent(
    new CustomEvent("show-dialog", {
      detail: {
        dialogTag,
        dialogImport: () => { return customElements.whenDefined(dialogTag) },
        dialogParams: BrowserModPopupParams,
      }
    })
  );
};