import { blankVideoUrl } from "../helpers";

export const RequireInteractMixin = (SuperClass) => {
  return class RequireInteractMixinClass extends SuperClass {
    private _videoInteractionResolve;
    private _audioInteractionResolve;
    private _video: HTMLVideoElement;
    public videoInteraction = new Promise<any>((resolve) => {
      this._videoInteractionResolve = resolve;
    });
    public audioInteraction = new Promise((resolve) => {
      this._audioInteractionResolve = resolve;
    });

    constructor() {
      super();

      this.addEventListener("browser-mod-user-ready", () => {
        this.entitiesReady().then(() => {
          if (this.playerEnabled || this.cameraEnabled) {
            this.show_indicator(this.playerEnabled);
          }
        }).catch((err) => {
          console.warn(`Browser Mod: Failed to wait for browser entities to be ready. Player will be unavailable. Error: ${err}`);
        });
      });
    }

    async show_indicator(audioRequired) {
      await this.connectionPromise;

      if (!this.registered) return;

      const interactElement = document.createElement("div");
      document.body.append(interactElement);

      interactElement.classList.add("browser-mod-require-interaction");
      interactElement.attachShadow({ mode: "open" });

      const styleEl = document.createElement("style");
      interactElement.shadowRoot.append(styleEl);
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
        :host {
          right: 20px;
          bottom: 20px;
        }
        ha-icon {
          --mdc-icon-size: 30px;
        }
        ha-icon::before {
          content: "";
        }
      }
      `;

      var interactIcon = undefined
      if (!this.settings.hideInteractIcon) {
        interactIcon = document.createElement("ha-icon");
        interactElement.shadowRoot.append(interactIcon);
        (interactIcon as any).icon = "mdi:gesture-tap";
      }

      // There may be two interaction levels, audio and video.
      // Muted video can usually be played without user interaction,
      // but unmuted audio requires user interaction.
      const video = (this._video = document.createElement("video"));
      video.setAttribute("playsinline", "");
      const source = document.createElement("source");
      source.setAttribute("type", "video/mp4");
      source.setAttribute("src", blankVideoUrl());
      video.append(source);
      video.muted = true;
      interactElement.shadowRoot.append(video);
      const vPlay = video.play();
      if (vPlay !== undefined) {
        vPlay
          .then(() => {
            this._videoInteractionResolve();
            video.pause();
            if (audioRequired) {
              video.muted = false;
              video.currentTime = 0;
              const aPlay = video.play();
              if (aPlay !== undefined) {
                aPlay
                  .then(() => {
                    this._audioInteractionResolve();
                    video.pause();
                  })
                  .catch((e) => {
                    // If audio can't be played due to no interaction, error is NotAllowedError
                  });
              }
            }
          })
          .catch((e) => { 
              // If video can't be played due to no interaction, error is NotAllowedError
          });
      }

      window.addEventListener(
        "pointerdown",
        () => {
          this._videoInteractionResolve();
          this._audioInteractionResolve();
        },
        { once: true }
      );
      window.addEventListener(
        "touchstart",
        () => {
          this._videoInteractionResolve();
          this._audioInteractionResolve();
        },
        { once: true }
      );

      if (this.fully) {
        this._videoInteractionResolve();
        this._audioInteractionResolve();
      }

      const interactPromisesRequired = audioRequired ? 
        [this.videoInteraction, this.audioInteraction] : [this.videoInteraction];
      Promise.all(interactPromisesRequired).then(() => {
        interactElement.remove();
      });
    }
  };
};
