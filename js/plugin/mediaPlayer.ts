import { selectTree, throttle } from "../helpers";

export const MediaPlayerMixin = (SuperClass) => {
  class MediaPlayerMixinClass extends SuperClass {
    public player;
    private _audio_player;
    private _video_player;
    private _player_enabled;
    private _canPlayVideo: boolean = false;
    private _canPlayAudio: boolean = false;

    constructor() {
      super();

      this.addEventListener("browser-mod-entities-update", () => {
        this._setup_media_player();
      }, { once: true });
    }

    private _setup_media_player() {
      if (!this.playerEnabled) return;

      this._audio_player = new Audio();
      this._audio_player.muted = true;
      this._video_player = document.createElement("video");
      this._video_player.setAttribute("playsinline", "");
      this._video_player.controls = true;
      this._video_player.style.setProperty("width", "100%");
      this._video_player.muted = true;
      this.player = this._audio_player;
      this._player_enabled = false;
      this.extra = {}

      for (const ev of ["play", "pause", "ended", "volumechange"]) {
        this._audio_player.addEventListener(ev, () => this._player_update());
        this._video_player.addEventListener(ev, () => this._player_update());
      }
      for (const ev of ["timeupdate"]) {
        this._audio_player.addEventListener(ev, () =>
          this._player_update_throttled()
        );
        this._video_player.addEventListener(ev, () =>
          this._player_update_throttled()
        );
      }

      this.videoInteraction.then(() => {
        this._player_enabled = true;
        this._canPlayVideo = true;
        this._player_update()
      });

      this.audioInteraction.then(() => {
        this._canPlayAudio = true;
        this._video_player.muted = false;
        this._audio_player.muted = false;
        this._player_update()
      });

      this.addEventListener("command-player-play", (ev) => {
        if (this.player.src && ev.detail?.media_content_id === undefined) {
          this.player.play();
          this._show_video_player();
          return;
        }
        if (!this.player.src && ev.detail?.media_content_id === undefined) {
          return; // Nothing to play
        }
        if (this.player.src) this.player.pause();
        if (ev.detail?.media_type)
          if (ev.detail?.media_type.startsWith("video"))
            this.player = this._video_player;
          else this.player = this._audio_player;
        if (ev.detail?.media_content_id)
          this.player.src = ev.detail.media_content_id;
        this.extra = ev.detail?.extra;
        this.player.play();
        this._show_video_player();
      });
      this.addEventListener("command-player-pause", (ev) =>
        this.player.pause()
      );
      this.addEventListener("command-player-stop", (ev) => {
        this.player.src = null;
        this.player.pause();
      });
      this.addEventListener("command-player-set-volume", (ev) => {
        if (ev.detail?.volume_level === undefined) return;
        this.player.volume = ev.detail.volume_level;
      });
      this.addEventListener("command-player-mute", (ev) => {
        if (ev.detail?.mute !== undefined)
          this.player.muted = Boolean(ev.detail.mute);
        else this.player.muted = !this.player.muted;
      });
      this.addEventListener("command-player-seek", (ev) => {
        this.player.currentTime = ev.detail.position;
        setTimeout(() => this._player_update(), 10);
      });
      this.addEventListener("command-player-turn-off", (ev) => {
        if (
          this.player === this._video_player &&
          this._video_player.isConnected
        )
          this.closePopup({ tag: "media_player" });
        else if (this.player.src) this.player.pause();
        this.player.src = "";
        this._player_update();
      });

      this._player_update();
    }

    private _show_video_player() {
      if (this.player === this._video_player && this.player.src && !this._video_player.isConnected) {
        selectTree(
          document,
          "home-assistant $ dialog-media-player-browse"
        ).then((el) => el?.closeDialog());
        this.showPopup({
          title: undefined,
          content: this._video_player,
          dismiss_action: () => this._video_player.pause(),
          initial_style: "wide",
          tag: "media_player",
          ...this.extra?.popup
        });
      } else if (
        this.player !== this._video_player &&
        this._video_player.isConnected
      ) {
        this.closePopup({ tag: "media_player" });
      }
    }

    @throttle(3000)
    _player_update_throttled() {
      this._player_update();
    }

    private _player_update() {
      const state = this._player_enabled
        ? !this.player.src || this.player.src === window.location.href
          ? "off"
          : this.player.ended
          ? "stopped"
          : this.player.paused
          ? "paused"
          : "playing"
        : "unavailable";
      this.sendUpdate({
        player: {
          volume: this.player.volume,
          muted: this.player.muted,
          src: this.player.src,
          state,
          media_duration: this.player.duration,
          media_position: this.player.currentTime,
          extra: { ...this.extra, videoInteractionRequired: !this._canPlayVideo, audioInteractionRequired: !this._canPlayAudio }
        },
      });
    }
  }

  return MediaPlayerMixinClass;
};
