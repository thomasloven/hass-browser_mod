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
      }
      if (ev.type === "browser-mod-popup-opened") {
        this._popupElements.push(popup);
      }
    };

    showPopup(params: BrowserModPopupParams) {
      (async () => {
        const base: any = await hass_base_el();
        const dialogTag = params.tag ?
          `browser-mod-popup-${params.tag}`.toLowerCase() : "browser-mod-popup";
        showBrowserModPopup(base, dialogTag, params);
      })();
    }

    async closePopup(args) {
      const { all, tag } = args;
      if (all === true) {
        this._popupElements.forEach((popup) => popup._close());
        this._popupElements = [];
      } else if (typeof tag === "string") {
        const dialogTag =
          tag != "" ?
            `browser-mod-popup-${tag}` :
            "browser-mod-popup";
        const popup = this._popupElements.find(
          (p) => p.nodeName.toLowerCase() === dialogTag
        );
        popup?._close();
      } else {
        this._popupElements.pop()?._close();
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
        if (dialog) dialog._close();
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
  // Dynamically create a new class extending BrowserModPopup
  class DynamicPopup extends BrowserModPopup { }

  customElements.define(dialogTag, DynamicPopup);
  customElementClassCache[dialogTag] = DynamicPopup;
}

export const showBrowserModPopup = (
  element: HTMLElement,
  dialogTag: string,
  BrowserModPopupParams: BrowserModPopupParams
): void => {
  setCustomElementClass(dialogTag);
  if (dialogTag !== 'browser-mod-popup') {
    (async () => {
      await customElements.whenDefined(dialogTag);
      let dialogElement = document.body.querySelector(dialogTag) as BrowserModPopup;

      if (!dialogElement) {
        dialogElement = document.createElement(dialogTag) as BrowserModPopup;
        document.body.appendChild(dialogElement);
      }

      await dialogElement.showDialog(BrowserModPopupParams);
    })();
    return;
  }

  element.dispatchEvent(
    new CustomEvent("show-dialog", {
      detail: {
        dialogTag,
        dialogImport: async () => {
          await customElements.whenDefined(dialogTag);
          return customElements.get(dialogTag);
        },
        dialogParams: BrowserModPopupParams,
      }
    })
  );
};