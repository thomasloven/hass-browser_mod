import { hass, provideHass } from "../helpers";

const ID_STORAGE_KEY = "browser_mod-browser-id";

export const ConnectionMixin = (SuperClass) => {
  class BrowserModConnection extends SuperClass {
    public hass;
    public connection;
    private _data;
    public connected = false;
    private _connectionResolve;
    public connectionPromise = new Promise((resolve) => {
      this._connectionResolve = resolve;
    });
    public browserEntities = {};

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
        this.fireEvent(`command-${msg.command}`, msg);
      } else if (msg.browserEntities) {
        this.browserEntities = msg.browserEntities;
      } else if (msg.result) {
        this.update_config(msg.result);
      }
      this._connectionResolve?.();
    }

    private update_config(cfg) {
      this.LOG("Receive:", cfg);

      let update = false;
      if (!this.registered && cfg.browsers?.[this.browserID]) {
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
        browserID: this.browserID,
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

    get browsers() {
      return this._data?.browsers ?? [];
    }

    get registered() {
      return this.browsers?.[this.browserID] !== undefined;
    }

    set registered(reg) {
      (async () => {
        if (reg) {
          if (this.registered) return;
          await this.connection.sendMessage({
            type: "browser_mod/register",
            browserID: this.browserID,
          });
        } else {
          if (!this.registered) return;
          await this.connection.sendMessage({
            type: "browser_mod/unregister",
            browserID: this.browserID,
          });
        }
      })();
    }

    private async _reregister(newData = {}) {
      await this.connection.sendMessage({
        type: "browser_mod/reregister",
        browserID: this.browserID,
        data: {
          ...this.browsers[this.browserID],
          ...newData,
        },
      });
    }

    get meta() {
      if (!this.registered) return null;
      return this.browsers[this.browserID].meta;
    }
    set meta(value) {
      this._reregister({ meta: value });
    }

    get cameraEnabled() {
      if (!this.registered) return null;
      return this.browsers[this.browserID].camera;
    }
    set cameraEnabled(value) {
      this._reregister({ camera: value });
    }

    sendUpdate(data) {
      if (!this.connected || !this.registered) return;

      const dt = new Date();
      this.LOG("Send:", data);

      this.connection.sendMessage({
        type: "browser_mod/update",
        browserID: this.browserID,
        data,
      });
    }

    get browserID() {
      if (localStorage[ID_STORAGE_KEY]) return localStorage[ID_STORAGE_KEY];
      this.browserID = "";
      return this.browserID;
    }
    set browserID(id) {
      function _createBrowserID() {
        const s4 = () => {
          return Math.floor((1 + Math.random()) * 100000)
            .toString(16)
            .substring(1);
        };
        return window.fully?.getDeviceId() ?? `${s4()}${s4()}-${s4()}${s4()}`;
      }

      if (id === "") id = _createBrowserID();
      const oldID = localStorage[ID_STORAGE_KEY];
      localStorage[ID_STORAGE_KEY] = id;

      this.fireEvent("browser-mod-config-update");

      if (
        this.browsers?.[oldID] !== undefined &&
        this.browsers?.[this.browserID] === undefined
      ) {
        (async () => {
          await this.connection.sendMessage({
            type: "browser_mod/reregister",
            browserID: oldID,
            data: {
              ...this.browsers[oldID],
              browserID: this.browserID,
            },
          });
        })();
      }
    }
  }

  return BrowserModConnection;
};
