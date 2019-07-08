import { deviceID } from "/card-tools/deviceId";
import { lovelace_view, provideHass } from "/card-tools/hass";
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

  playOnce(ev) {
    if(window.browser_mod.playedOnce) return;
    window.browser_mod.player.play();
    window.browser_mod.playedOnce = true;
  }

  constructor() {
    window.hassConnection.then((conn) => this.connect(conn.conn));
    this.player = new Audio();
    this.playedOnce = false;

    this.autoclose_popup_active = false;

    const updater = this.update.bind(this);
    this.player.addEventListener("ended", updater);
    this.player.addEventListener("play", updater);
    this.player.addEventListener("pause", updater);
    this.player.addEventListener("volumechange", updater);
    document.addEventListener("visibilitychange", updater);
    window.addEventListener("location-changed", updater);
    window.addEventListener("click", this.playOnce);
    window.addEventListener("mousemove", this.no_blackout.bind(this));
    window.addEventListener("mousedown", this.no_blackout.bind(this));
    window.addEventListener("keydown", this.no_blackout.bind(this));
    window.addEventListener("touchstart", this.no_blackout.bind(this));
    provideHass(this);

    this._blackout = document.createElement("div");
    this._blackout.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: black;
    visibility: hidden;
    `;
    document.body.appendChild(this._blackout);
  }

  connect(conn) {
    this.conn = conn
    conn.subscribeMessage((msg) => this.callback(msg), {
      type: 'browser_mod/connect',
      deviceID: deviceID,
      });
  }

  callback(msg) {
    switch (msg.command) {
      case "update":
        this.update(msg);
        break;

      case "debug":
        this.debug(msg);
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

      case "lovelace-reload":
        this.lovelace_reload(msg);
        break;

      case "blackout":
        this.blackout(msg);
        break;
      case "no-blackout":
        this.no_blackout(msg);
        break;
    }
  }

  get player_state() {
    if (!this.player.src) return "stopped";
    if (this.player.ended) return "stopped";
    if (this.player.paused) return "paused";
    return "playing";
  }

  debug(msg) {
    popUp(`deviceID`, {type: "markdown", content: `# ${deviceID}`})
    alert(deviceID);
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
    if(!msg.title && !msg.auto_close) return;
    if(!msg.card) return;
    popUp(msg.title, msg.card, msg.large, msg.style, msg.auto_close);
    if(msg.auto_close)
      this.autoclose_popup_active = true;
  }
  close_popup(msg){
    this.autoclose_popup_active = false;
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

  lovelace_reload(msg) {
    const ll = lovelace_view();
    if (ll)
      fireEvent("config-refresh", {}, ll);
  }

  blackout(msg){
    this._blackout.style.visibility = "visible";
    this.update();
  }
  no_blackout(msg){
    if(this.autoclose_popup_active)
      return this.close_popup();
    this._blackout.style.visibility = "hidden";
    this.update();
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
          blackout: Boolean(this._blackout.style.visibility === "visible"),
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

