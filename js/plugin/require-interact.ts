export const RequireInteractMixin = (SuperClass) => {
  return class RequireInteractMixinClass extends SuperClass {
    private _interactionResolve;
    public firstInteraction = new Promise((resolve) => {
      this._interactionResolve = resolve;
    });

    constructor() {
      super();

      window.addEventListener("pointerdown", this._interactionResolve);

      this.show_indicator();
    }

    async show_indicator() {
      await this.connectionPromise;

      if (!this.registered) return;

      const interactSymbol = document.createElement("div");
      document.body.append(interactSymbol);

      interactSymbol.classList.add("browser-mod-require-interaction");
      interactSymbol.attachShadow({ mode: "open" });

      const styleEl = document.createElement("style");
      interactSymbol.shadowRoot.append(styleEl);
      styleEl.innerHTML = `
      :host {
        position: fixed;
        right: 8px;
        bottom: 8px;
        color: var(--warning-color, red);
        opacity: 0.5;
        --mdc-icon-size: 48px;
      }`;

      const icon = document.createElement("ha-icon");
      interactSymbol.shadowRoot.append(icon);
      (icon as any).icon = "mdi:gesture-tap";

      await this.firstInteraction;
      interactSymbol.remove();
    }
  };
};
