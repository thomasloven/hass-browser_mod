import { blankVideoUrl, popSoundUrl } from "../helpers";

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
    private _interactElement: HTMLElement;

    constructor() {
      super();

      this.addEventListener("browser-mod-user-ready", () => {
        this.entitiesReady().then(() => {
          if ((this.playerEnabled || this.cameraEnabled) && !this._versionNotificationPending) {
            this._audioRequired = this.playerEnabled;
            this.setupInteraction();
          }
        }).catch((err) => {
          console.warn(`Browser Mod: Failed to wait for browser entities to be ready. Player will be unavailable. Error: ${err}`);
        });
      }, { once: true });
    }

    private _clearInteract() {
      this._video.remove();
      this._video = undefined;
      this._interactElement.remove();
      this._interactElement = undefined;
      this.fireBrowserEvent("command-screen_on", { brightness: 255 });
    }

    private _checkInteraction(onerror = undefined) {
      // There may be two interaction levels, audio and video.
      // Muted video can usually be played without user interaction,
      // but unmuted audio requires user interaction.
      const vPlay = this._video.play();
      if (vPlay !== undefined) {
        vPlay
          .then(() => {
            this._videoInteractionResolve();
            this._video.pause();
            if (this._audioRequired) {
              this._video.muted = false;
              this._video.currentTime = 0;
              const aPlay = this._video.play();
              if (aPlay !== undefined) {
                aPlay
                  .then(() => {
                    this._audioInteractionResolve();
                    this._video.pause();
                  })
                  .catch((e) => {
                    if (onerror && !this.settings.hideInteractIcon) {
                      onerror();
                    } else {
                      this._clearInteract();
                    }
                  });
              }
            }
          })
          .catch((e) => {
            if (onerror && !this.settings.hideInteractIcon) {
              onerror();
            } else {
              this._clearInteract();
            }
          });
      }
    }

    minimalInteraction() {
      if (!this._interactElement) return;
      const interactText = document.createElement("span");
      interactText.textContent = "Browser Mod";
      this._interactElement.shadowRoot.append(interactText);
      const interactIcon = document.createElement("ha-icon");
      interactIcon.setAttribute("id", "tap");
      (interactIcon as any).icon = "mdi:gesture-tap";
      this._interactElement.shadowRoot.append(interactIcon);

      this._interactElement.setAttribute("minimal", "");
      const onerror = this.settings.fullInteraction ? () => this.fullInteraction() : undefined;
      this._interactElement.addEventListener(
        "pointerdown",
        () => {
          this._checkInteraction(onerror);
        },
        { once: true }
      );
      this._interactElement.addEventListener(
        "touchstart",
        () => {
          this._checkInteraction(onerror);
        },
        { once: true }
      );
    }

    fullInteraction() {
      if (!this._interactElement) return;
      const closeIconButton = document.createElement("ha-icon-button");
      closeIconButton.setAttribute("id", "close");
      const closeIcon = document.createElement("ha-icon");
      closeIcon.setAttribute("icon", "mdi:close");
      closeIconButton.append(closeIcon);
      closeIconButton.addEventListener("pointerdown", () => {
        this._clearInteract();
      });
      closeIconButton.addEventListener("touchstart", () => {
        this._clearInteract();
      });
      this._interactElement.shadowRoot.append(closeIconButton);
      const source = document.createElement("source");
      source.setAttribute("type", "audio/mp3");
      source.setAttribute("src", popSoundUrl());
      this._video.replaceChild(source, this._video.firstChild);
      this._video.load();
      this._video.addEventListener("loadeddata", () => {
        this._video.setAttribute("controls", "");
        this.fireBrowserEvent("command-screen_on", { brightness: 127 });
        this._interactElement.removeAttribute("minimal");
        this._interactElement.setAttribute("full", "");
      });
      this._video.addEventListener("play", () => {
        this._video.addEventListener("ended", () => {
          window.setTimeout(() => {
            this.fireBrowserEvent("command-screen_on", { brightness: 255 });
            this._videoInteractionResolve();
            this._audioInteractionResolve();
          }, 250);
        });
      });
      this._video.addEventListener("error", (e) => {
        this.fireBrowserEvent("command-screen_on", { brightness: 255 });
        this._clearInteract();
        const service = "browser_mod.notification";
        const message = "Browser Mod: error checking ability to play audio.";
        this.callService(service, { message });
        console.log(message, e.toString());
      });
    }

    async setupInteraction() {
      await this.connectionPromise;

      if (!this.registered) return;

      this._interactElement = document.createElement("div");
      document.body.append(this._interactElement);

      this._interactElement.classList.add("browser-mod-require-interaction");
      this._interactElement.attachShadow({ mode: "open" });

      const styleEl = document.createElement("style");
      this._interactElement.shadowRoot.append(styleEl);
      styleEl.innerHTML = `
      :host {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        color: var(--warning-color, red);
        opacity: 0.5;
        z-index: 99999;
        --icon-inset: 8px;
        --mdc-icon-size: 48px;
      }
      :host([minimal]) {
        display: grid;
        grid-template-areas: "close" "video" "icon" "text";
        grid-template-rows: min-content 1fr min-content min-content;
      }
      :host([full]) {
        display: grid;
        grid-template-areas: "close" "video" "icon" "text";
        grid-template-rows: min-content 1fr min-content 1fr;
        --mdc-icon-size: 250px;
        opacity: 1.0;
      }
      #tap {
        grid-area: icon;
        justify-self: self-end;
        padding-right: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
      }
      :host([full]) #tap {
        justify-self: center;
        align-self: self-start;
      }
      #close {
        grid-area: close;
        display: none;
      }
      :host([full]) #close {
        display: inherit;
        justify-self: self-start;
        align-self: self-start;
        --mdc-icon-size: 48px;
        color: var(--white-color, white);
        padding-top: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        padding-left: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        --mdc-ripple-hover-opacity: 0.2;
        --mdc-ripple-press-opacity: 0.33;
      }
      span {
        grid-area: text;
        align-self: end;
        justify-self: self-end;
        padding-bottom: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        padding-right: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        font-size: 0.75rem;
      }
      :host([full]) span {
        align-self: self-start;
        justify-self: center;
        font-size: 1.75em;
      }
      video {
        grid-area: video;
        display: none;
      }
      :host([full]) video {
        display: inherit;
        justify-self: center;
        align-self: self-end;
        width: 250px;
        scale: 1.2;
      }
      @media all and (max-width: 450px), all and (max-height: 500px) {
        :host {
          --icon-inset: 20px;
          --mdc-icon-size: 30px;
        }
        #tap {
          padding-bottom: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        }
        span {
          display: none;
        }
      }
      `;

      this._video = document.createElement("video");
      this._video.setAttribute("playsinline", "");
      const source = document.createElement("source");
      source.setAttribute("type", "video/mp4");
      source.setAttribute("src", blankVideoUrl());
      this._video.append(source);
      this._video.muted = true;
      this._interactElement.shadowRoot.append(this._video);

      this._checkInteraction(() => this.minimalInteraction());

      if (this.fully) {
        this._videoInteractionResolve();
        this._audioInteractionResolve();
      }

      const interactPromisesRequired = this._audioRequired ? 
        [this.videoInteraction, this.audioInteraction] : [this.videoInteraction];
      Promise.all(interactPromisesRequired).then(() => {
        this._clearInteract();
      });
    }
  };
};
