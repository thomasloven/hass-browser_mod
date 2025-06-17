import { LitElement } from "lit";
import { debounce } from "./helpers";

export type ObjectSelector  
  = {
    element: LitElement;
    name: string;
    label: string;
    isValid?: boolean;
    errorMsg?: string | string[];
  };

export class ObjectSelectorMonitor {
  private element: LitElement;
  private _settingsValid = true;
  private _showErrors = false;
  private _settingsValidCallback?: (value: boolean) => void;
  private _showErrorsCallback?: (value: boolean) => void;
  private _objectSelectors?: ObjectSelector[] = undefined;

  constructor(
    element: LitElement,
    settingsValidCallback?: (value: boolean) => void,
    showErrorsCallback?: (value: boolean) => void
  ) {
    this.element = element;
    this._settingsValidCallback = settingsValidCallback;
    this._showErrorsCallback = showErrorsCallback;
  }

  get objectSelectors() {
    return this._objectSelectors ?? [];
  }

  set showErrors(value: boolean) {
    this._showErrors = value;
    this._showErrorsCallback?.(value);
  }

  get showErrors() {
    return this._showErrors;
  }

  set settingsValid(value: boolean) {
    this._settingsValid = value;
    this._settingsValidCallback?.(value);
  }

  get settingsValid() {
    return this._settingsValid;
  }
  
  private _debounceShowErrors = debounce(() => {
    if (!this._settingsValid) {
      this.showErrors = true;
    }
  }, 2000);

  private _formObjectSelectors = (form: LitElement): ObjectSelector[] => {
    var objectSelectors: ObjectSelector[] = [];
    const selectors = form?.shadowRoot?.querySelectorAll("ha-selector");
    selectors?.forEach((selector) => {
        if ((selector as any)?.selector.hasOwnProperty("object")) {
        const objectSelector: ObjectSelector = {
            element: selector as LitElement,
            name: (selector as any).name,
            label: (selector as any).label,
        };
        objectSelectors.push(objectSelector);
        }
    });
    const grid = form?.shadowRoot?.querySelectorAll("ha-form-grid");
    grid?.forEach((grid: LitElement) => {
        if (grid.shadowRoot) {
        const forms = grid.shadowRoot.querySelectorAll("ha-form");
        forms.forEach((subForm: LitElement) => {
            const subSelectors = this._formObjectSelectors(subForm);
            objectSelectors.push(...subSelectors);
        });
        }
    });
    return objectSelectors;
  };

  startMonitoring() {
    if (this._objectSelectors === undefined) {
      this._objectSelectors = this._formObjectSelectors(
        this.element?.shadowRoot?.querySelector("ha-form")
      );
    }
    this.objectSelectors.map((selector) => {
      selector.element?.addEventListener("value-changed", (ev: CustomEvent) => {
        selector.isValid = ev.detail.isValid;
        selector.errorMsg = ev.detail.errorMsg;
        this.settingsValid = this.objectSelectors.every(
          (s) => s.isValid !== false
        );
        if (this.settingsValid) {
          this.showErrors = false;
          this._debounceShowErrors.cancel();
        } else {
          this._debounceShowErrors(); 
        }
      });
    });
  }

  stopMonitoring() {
    this.objectSelectors.map((selector) => {
      selector.element?.removeEventListener("value-changed", () => {});
    });
    this.showErrors = false;
    this.settingsValid = true;
    this._objectSelectors = undefined;
    this._debounceShowErrors.cancel();
  }
}