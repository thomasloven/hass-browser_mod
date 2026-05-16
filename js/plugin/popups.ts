import { Unpromise } from "@watchable/unpromise";
import {
  loadLoadCardHelpers,
  hass_base_el,
  BROWSER_MOD_CLOSE_ANCHOR,
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

    private _prunePopupElements() {
      this._popupElements = this._popupElements.filter((popup) => popup?.isConnected);
    }

    private _findLastOpenPopup(predicate: (popup: BrowserModPopup) => boolean = () => true) {
      return this._popupElements
        .slice()
        .reverse()
        .find((popup) => popup.open === true && predicate(popup));
    }

    private popupStateListener = (ev: CustomEvent) => {
      this._prunePopupElements();
      const popup = ev.detail?.popup;
      if (!popup) return;
      if (ev.type === "browser-mod-popup-closed" && this._popupElements.includes(popup)) {
        this._popupElements = this._popupElements.filter(
          (p) => p !== popup
        );
      }
      if (ev.type === "browser-mod-popup-opened" && !this._popupElements.includes(popup)) {
        this._popupElements.push(popup);
      }
    };

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
      this._prunePopupElements();
      const _closePopup = async (popup) => {
        const tag = popup.tag !== undefined && popup.tag !== "" ? popup.tag : "standard";
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        let onClose: ((ev: CustomEvent) => void) | undefined;
        const result = await Unpromise.race([
          new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => {
              if (onClose) this.removeEventListener('browser-mod-popup-closed', onClose);
              this.dispatchEvent(
                new CustomEvent("browser-mod-popup-closed", {
                  detail: { popup },
                })
              );
              console.warn(`Browser Mod: Popup with tag "${tag}" did not close within timeout period`);
              resolve();
            }, 5000);
          }),
          new Promise<void>(async (resolve) => {
            onClose = (ev: CustomEvent) => {
              if (ev.detail?.popup !== popup) return;
              if (onClose) this.removeEventListener('browser-mod-popup-closed', onClose);
              if (timeoutId !== undefined) clearTimeout(timeoutId);
              resolve();
            };
            this.addEventListener('browser-mod-popup-closed', onClose);
            // Use BROWSER_MOD_CLOSE_ANCHOR to trigger the close action on the popup's dialog, 
            // which ensures that the underlying dialog's close event is properly dispatched and handled
            const closeAnchor = popup.dialog?.querySelector(`[data-close-anchor="${BROWSER_MOD_CLOSE_ANCHOR}"]`);
            if (closeAnchor) {
              closeAnchor.click();
            } else {
              // Fallback to directly calling closeDialog if the anchor is not found
              popup.closeDialog();
            }
          })
        ]);
      }

      const { all, tag } = args;
      if (all === true) {
        const openPopups = this._popupElements.filter((popup) => popup.open === true);
        await Promise.all(openPopups.map((popup) => _closePopup(popup)));
      } else if (typeof tag === "string") {
        const dialogTag =
          tag != "" ?
            `browser-mod-popup-${tag}` :
            "browser-mod-popup";
        const popup = this._findLastOpenPopup(
          (p) => p.nodeName.toLowerCase() === dialogTag
        );
        // Wait for the popup's dialog to close before proceeding
        if (popup?.dialog) {
          await _closePopup(popup);
        }
      } else {
        const popup = this._findLastOpenPopup();
        // Wait for the popup's dialog to close before proceeding
        if (popup?.dialog) {
            await _closePopup(popup);
        }
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
