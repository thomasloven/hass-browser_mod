import { deviceID } from "card-tools/src/deviceID";
import { hass, provideHass } from "card-tools/src/hass";

export class BrowserModConnection {
  async connect() {
    const isCast = document.querySelector("hc-main") !== null;
    if (!isCast) {
      if (!window.hassConnection) {
        window.setTimeout(() => this.connect(), 100);
        return;
      } else {
        this._connection = (await window.hassConnection).conn;
      }
    } else {
      this._connection = hass().connection;
    }

    this._connection.subscribeMessage((msg) => this.msg_callback(msg), {
      type: "browser_mod/connect",
      deviceID: deviceID,
    });

    this._hass_patched = false;
    provideHass(this);
  }

  set hass(hass) {
    this._hass = hass;
  }

  get connected() {
    return this._connection !== undefined;
  }

  msg_callback(message) {
    console.log(message);
  }

  sendUpdate(data) {
    if (!this.connected) return;
    this._connection.sendMessage({
      type: "browser_mod/update",
      deviceID,
      data,
    });
  }
}
