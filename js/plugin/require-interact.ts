export const RequireInteractMixin = (SuperClass) => {
  return class RequireInteractMixinClass extends SuperClass {
    private _interactionResolve;
    public firstInteraction = new Promise((resolve) => {
      this._interactionResolve = resolve;
    });

    constructor() {
      super();

      this.show_indicator();
    }

    async show_indicator() {
      await this.connectionPromise;

      if (!this.registered) return;

      if (this.settings.hideInteractIcon) return;

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
      }
      ha-icon::before {
        content: "Browser\\00a0Mod";
        font-size: 0.75rem;
        position: absolute;
        right: 0;
        bottom: 90%;
      }
      video {
        display: none;
      }
      @media all and (max-width: 450px), all and (max-height: 500px) {
        ha-icon {
          --mdc-icon-size: 30px;
        }
        ha-icon::before {
          content: "";
        }
      }
      `;

      const icon = document.createElement("ha-icon");
      interactSymbol.shadowRoot.append(icon);
      (icon as any).icon = "mdi:gesture-tap";

      // If we are allowed to play a video, we can assume no interaction is needed
      const video = (this._video = document.createElement("video"));
      interactSymbol.shadowRoot.append(video);
      const vPlay = video.play();
      if (vPlay) {
        vPlay
          .then(() => {
            this._interactionResolve();
            video.pause();
          })
          .catch((e) => {
            // if (e.name === "AbortError") {
            // this._interactionResolve();
            // }
          });
        video.pause();
      }

      window.addEventListener(
        "pointerdown",
        () => {
          this._interactionResolve();
        },
        { once: true }
      );
      window.addEventListener(
        "touchstart",
        () => {
          this._interactionResolve();
        },
        { once: true }
      );

      if (this.fully) this._interactionResolve();

      await this.firstInteraction;
      interactSymbol.remove();
    }
  };
};
