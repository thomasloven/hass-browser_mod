import { deviceID } from "/card-tools/deviceId";
import { provideHass } from "/card-tools/hass";
import { popUp, closePopUp } from "/card-tools/popup";
import { fireEvent } from "/card-tools/event";
import { moreInfo } from "/card-tools/more-info.js";
import "./browser-player";

class BrowserMod {

  set hass(hass) {
    if(!hass) return;
    this._hass = hass;
    if(this.hassPatched) return;
    const callService = hass.callService;
    const newCallService = (domain, service, serviceData) => {
      if(domain === "browser_mod" && service === "command") {
        if(serviceData.deviceID) {
          const index = serviceData.deviceID.indexOf('this');
          if(index !== -1)
            serviceData.deviceID[index] = deviceID;
        }
      }
      callService(domain, service, serviceData);
    };
    hass.callService = newCallService;

    this.hassPatched = true;
    document.querySelector("home-assistant").hassChanged(hass, hass);
  }

  constructor() {
    window.hassConnection.then((conn) => this.connect(conn.conn));
    this.player = new Audio();

    const updater = this.update.bind(this);
    this.player.addEventListener("ended", updater);
    this.player.addEventListener("play", updater);
    this.player.addEventListener("pause", updater);
    this.player.addEventListener("volumechange", updater);
    document.addEventListener("visibilitychange", updater);
    window.addEventListener("location-changed", updater);
    provideHass(this);
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

      case "popup":
        this.popup(msg);
        break;
      case "close-popup":
        this.close_popup(msg);
        break;
      case "navigate":
        this.navigate(msg);
        break;
      case "more-info":
        this.more_info(msg);
        break;
      case "set-theme":
        this.set_theme(msg);
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
    if (msg.mute === undefined)
      msg.mute = !this.player.muted;
    this.player.muted = Boolean(msg.mute)
  }

  popup(msg){
    if(!msg.title) return;
    if(!msg.card) return;
    popUp(msg.title, msg.card, msg.large, msg.style);
  }
  close_popup(msg){
    closePopUp();
  }
  navigate(msg){
    if(!msg.navigation_path) return;
    history.pushState(null, "", msg.navigation_path);
    fireEvent("location-changed", {}, document.querySelector("home-assistant"));
  }
  more_info(msg){
    if(!msg.entity_id) return;
    moreInfo(msg.entity_id, msg.large);
  }
  set_theme(msg){
    if(!msg.theme) msg.theme = "default";
    fireEvent("settheme", msg.theme, document.querySelector("home-assistant"));
  }


  update(msg=null) {
    if(!this.conn) return;

    if(msg)
      if(msg.entity_id)
        this.entity_id = msg.entity_id;

    this.conn.sendMessage({
      type: 'browser_mod/update',
      deviceID: deviceID,
      data: {
        browser: {
          path: window.location.pathname,
          visibility: document.visibilityState,
          userAgent: navigator.userAgent,
          currentUser: this._hass && this._hass.user && this._hass.user.name,
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

