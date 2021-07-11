export const BrowserModMediaPlayerMixin = (C) =>
  class extends C {
    constructor() {
      super();
      this.player = new Audio();

      for (const event of ["play", "pause", "ended", "volumechange"]) {
        this.player.addEventListener(event, () => this.player_update());
      }

      window.addEventListener(
        "click",
        () => {
          if (!this.player.ended) this.player.play();
        },
        {
          once: true,
        }
      );
    }

    player_update(ev) {
      this.sendUpdate({
        player: {
          volume: this.player.volume,
          muted: this.player.muted,
          src: this.player.src,
          state: this.player_state,
        },
      });
    }

    get player_state() {
      if (!this.player.src) return "stopped";
      if (this.player.ended) return "stopped";
      if (this.player.paused) return "paused";
      return "playing";
    }

    player_play(src) {
      if (src) this.player.src = src;
      this.player.play();
    }
    player_pause() {
      this.player.pause();
    }
    player_stop() {
      this.player.pause();
      this.player.src = null;
    }
    player_set_volume(level) {
      if (level === undefined) return;
      this.player.volume = level;
    }
    player_mute(mute) {
      if (mute === undefined) mute = !this.player.muted;
      this.player.muted = Boolean(mute);
    }
  };
