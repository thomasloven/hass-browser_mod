import { deviceID } from "card-tools/src/deviceID";
import { hass, provideHass } from "card-tools/src/hass";

const hassWindow: any = window;

export class BrowserModConnection {
  _connection;
  _hass;

  async connect() {
    const isCast = document.querySelector("hc-main") !== null;
    if (!isCast) {
      while (!hassWindow.hassConnection)
        await new Promise((resolve) => window.setTimeout(resolve, 100));
      this._connection = (await hassWindow.hassConnection).conn;
    } else {
      this._connection = hass().connection;
    }

    this._connection.subscribeMessage((msg) => this.msg_callback(msg), {
      type: "browser_mod/connect",
      deviceID: deviceID,
    });

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
