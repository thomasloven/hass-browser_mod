import { hass, provideHass } from "../helpers";

const ID_STORAGE_KEY = "browser_mod-device-id";

export const ConnectionMixin = (SuperClass) => {
  class BrowserModConnection extends SuperClass {
    public hass;
    public connection;
    private _data;
    public connected = false;
    private _connectionResolve;
    public connectionPromise = new Promise(resolve => { this._connectionResolve = resolve; });

    LOG(...args) {
      const dt = new Date();
      console.log(`${dt.toLocaleTimeString()}`, ...args);
    }

    private fireEvent(event, detail = undefined) {
      this.dispatchEvent(new CustomEvent(event, { detail }));
    }

    private incoming_message(msg) {
      if (msg.command) {
        this.LOG("Command:", msg);
        this.fireEvent(`command-${msg.command}`, msg)
      } else if (msg.result) {
        this.update_config(msg.result);
      }
      this._connectionResolve?.();
    }

    private update_config(cfg) {
      this.LOG("Receive:", cfg);

      let update = false;
      if (!this.registered && cfg.devices?.[this.deviceID]) {
        update = true;
      }
      this._data = cfg;

      if (!this.connected) {
        this.connected = true;
        this.fireEvent("browser-mod-connected");
      }

      this.fireEvent("browser-mod-config-update");

      if (update) this.sendUpdate({});
    }

    async connect() {
      const conn = (await hass()).connection;
      this.connection = conn;

      // Subscribe to configuration updates
      conn.subscribeMessage((msg) => this.incoming_message(msg), {
        type: "browser_mod/connect",
        deviceID: this.deviceID,
      });

      // Keep connection status up to date
      conn.addEventListener("disconnected", () => {
        this.connected = false;
        this.fireEvent("browser-mod-disconnected");
      });
      conn.addEventListener("ready", () => {
        this.connected = true;
        this.fireEvent("browser-mod-connected");
        this.sendUpdate({});
      });

      provideHass(this);
    }

    get config() {
      return this._data?.config ?? {};
    }

    get devices() {
      return this._data?.devices ?? [];
    }

    get registered() {
      return this.devices?.[this.deviceID] !== undefined;
    }

    set registered(reg) {
      (async () => {
        if (reg) {
          if (this.registered) return;
          await this.connection.sendMessage({
            type: "browser_mod/register",
            deviceID: this.deviceID,
          });
        } else {
          if (!this.registered) return;
          await this.connection.sendMessage({
            type: "browser_mod/unregister",
            deviceID: this.deviceID,
          });
        }
      })();
    }

    get meta() {
      if (!this.registered) return null;
      return this.devices[this.deviceID].meta;
    }
    set meta(value) {
      (async () => {
        await this.connection.sendMessage({
          type: "browser_mod/reregister",
          deviceID: this.deviceID,
          data: {
            ...this.devices[this.deviceID],
            meta: value,
          }
        })
      })()
    }

    sendUpdate(data) {
      if (!this.connected || !this.registered) return;

      const dt = new Date();
      this.LOG("Send:", data);

      this.connection.sendMessage({
        type: "browser_mod/update",
        deviceID: this.deviceID,
        data,
      });
    }

    get deviceID() {
      if (localStorage[ID_STORAGE_KEY]) return localStorage[ID_STORAGE_KEY];
      this.deviceID = "";
      return this.deviceID;
    }
    set deviceID(id) {
      function _createDeviceID() {
        const s4 = () => {
          return Math.floor((1 + Math.random()) * 100000)
            .toString(16)
            .substring(1);
        };
        return window.fully?.getDeviceId() ?? `${s4()}${s4()}-${s4()}${s4()}`;
      }

      if (id === "") id = _createDeviceID();
      const oldID = localStorage[ID_STORAGE_KEY];
      localStorage[ID_STORAGE_KEY] = id;

      this.fireEvent("browser-mod-config-update");

      if (this.devices?.[oldID] !== undefined && this.devices?.[this.deviceID] === undefined) {
        (async () => {
          await this.connection.sendMessage({
            type: "browser_mod/reregister",
            deviceID: oldID,
            data: {
              ...this.devices[oldID],
              deviceID: this.deviceID,
            }
          })
        })()
      }

      // TODO: Send update to backend to update device
    }
  }

  return BrowserModConnection;
}
