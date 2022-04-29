import { deviceID } from "card-tools/src/deviceID";
import { hass, provideHass } from "card-tools/src/hass";

export class BrowserModConnection {
  hass;
  connection;

  async connect() {
    const isCast = document.querySelector("hc-main") !== null;
    if (!isCast) {
      while (!window.hassConnection)
        await new Promise((resolve) => window.setTimeout(resolve, 100));
      this.connection = (await window.hassConnection).conn;
    } else {
      this.connection = hass().connection;
    }

    this.connection.subscribeMessage((msg) => this.msg_callback(msg), {
      type: "browser_mod/connect",
      deviceID: deviceID,
    });

    provideHass(this);
  }

  get connected() {
    return this.connection !== undefined;
  }

  msg_callback(message) {
    console.log(message);
  }

  sendUpdate(data) {
    if (!this.connected) return;
    this.connection.sendMessage({
      type: "browser_mod/update",
      deviceID,
      data,
    });
  }
}
