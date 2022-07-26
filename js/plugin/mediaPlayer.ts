export const MediaPlayerMixin = (SuperClass) => {
  return class MediaPlayerMixinClass extends SuperClass {
    public player;
    private _player_enabled;
    private _player_update_cooldown;

    constructor() {
      super();

      this.player = new Audio();
      this._player_enabled = false;

      for (const ev of ["play", "pause", "ended", "volumechange"]) {
        this.player.addEventListener(ev, () => this._player_update());
      }
      for (const ev of ["timeupdate"]) {
        this.player.addEventListener(ev, () => this._player_update_choked());
      }

      this.firstInteraction.then(() => {
        this._player_enabled = true;
        if (!this.player.ended) this.player.play();
      });

      this.addEventListener("command-player-play", (ev) => {
        if (ev.detail?.media_content_id)
          this.player.src = ev.detail.media_content_id;
        this.player.play();
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

      this.connectionPromise.then(() => this._player_update());
    }

    private _player_update_choked() {
      if (this._player_update_cooldown) return;
      this._player_update_cooldown = window.setTimeout(
        () => (this._player_update_cooldown = undefined),
        3000
      );
      this._player_update();
    }

    private _player_update() {
      const state = this._player_enabled
        ? this.player.src
          ? this.player.ended
            ? "stopped"
            : this.player.paused
            ? "paused"
            : "playing"
          : "stopped"
        : "unavailable";
      this.sendUpdate({
        player: {
          volume: this.player.volume,
          muted: this.player.muted,
          src: this.player.src,
          state,
          media_duration: this.player.duration,
          media_position: this.player.currentTime,
        },
      });
    }
  };
};
