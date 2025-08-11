import { LitElement } from "lit";
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
        const dialogTag = params.popup_dialog_tag ? 
          `browser-mod-popup-${params.popup_dialog_tag}` : "browser-mod-popup";
        showBrowserModPopup(base, dialogTag, params);
      })();
    }

    async closePopup(args) {
      const { all, popup_dialog_tag } = args;
      if (all === true) {
        this._popupElements.forEach((popup) => popup.closeDialog());
        this._popupElements = [];
      } else if (typeof popup_dialog_tag === "string") {
        const dialogTag =
          popup_dialog_tag != "" ?
            `browser-mod-popup-${popup_dialog_tag}` :
            "browser-mod-popup";
        const popup = this._popupElements.find(
          (p) => p.nodeName.toLowerCase() === dialogTag
        );
        popup?.closeDialog();
      } else {
        this._popupElements.pop()?.closeDialog();
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
    }
  };
};

export interface BrowserModPopupParams {
  title: string;
  content?: any;
  [key: string]: any;
}

const customElementClassCache: Record<string, typeof BrowserModPopup> = {};

export function setCustomElementClass(dialogTag: string): typeof BrowserModPopup {
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