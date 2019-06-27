import {deviceID} from "/card-tools/deviceId"
class BrowserMod {

  constructor() {
    window.hassConnection.then((conn) => this.connect(conn.conn));
    this.player = new Audio();

    this.player.addEventListener("ended", this.update.bind(this));
    this.player.addEventListener("play", this.update.bind(this));
    this.player.addEventListener("pause", this.update.bind(this));
    this.player.addEventListener("volumechange", this.update.bind(this));
  }

  connect(conn) {
    console.log("Connection opened. Connecting to browser_mod");
    this.conn = conn
    conn.subscribeMessage((msg) => this.callback(msg), {
      type: 'browser_mod/connect',
      deviceID: deviceID,
      });
    console.log("Connected");
    console.log(this.connection);
  }

  callback(msg) {
    console.log("Got ws message");
    console.log(msg);
    switch (msg.command) {
      case "update":
        this.update(msg);
        break;

      case "play":
        this.play(msg);
        break;
      case "pause":
        this.pause(msg);
        break;
      case "stop":
        this.stop(msg);
        break;
      case "set_volume":
        this.set_volume(msg);
        break;
      case "mute":
        this.mute(msg);
        break;
    }
  }

  get player_state() {
    if (!this.player.src) return "stopped";
    if (this.player.ended) return "stopped";
    if (this.player.paused) return "paused";
    return "playing";
  }

  play(msg) {
    const src = msg.media_content_id;
    if(src)
      this.player.src = src;
    this.player.play();
  }
  pause(msg) {
    this.player.pause();
  }
  stop(msg) {
    this.player.pause();
    this.player.src = null;
  }
  set_volume(msg) {
    if (msg.volume_level === undefined) return;
    this.player.volume = msg.volume_level;
  }
  mute(msg) {
    this.player.muted = Boolean(msg.mute)
  }


  update() {
    if(!this.conn) return;

    this.conn.sendMessage({
      type: 'browser_mod/update',
      deviceID: deviceID,
      data: {
        browser: {

        },
        player: {
          volume: this.player.volume,
          muted: this.player.muted,
          src: this.player.src,
          state: this.player_state,
        },
      },
    });

  }

}

window.browser_mod = new BrowserMod();

