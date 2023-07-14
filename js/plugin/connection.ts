import { hass, provideHass } from "../helpers";

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
      if (window.browser_mod_log === undefined) return;
      const dt = new Date();
      console.log(`${dt.toLocaleTimeString()}`, ...args);

      this.connection.sendMessage({
        type: "browser_mod/log",
        message: args[0],
      });
    }

    private fireEvent(event, detail = undefined) {
      this.dispatchEvent(new CustomEvent(event, { detail, bubbles: true }));
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
      this._connectionResolve = undefined;
    }

    private update_config(cfg) {
      this.LOG("Receive:", cfg);

      let update = false;
      if (!this.registered && cfg.browsers?.[this.browserID]) {
        update = true;
      }
      this._data = cfg;

      if (!this.registered && this.global_settings["autoRegister"] === true)
        this.registered = true;

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

      window.addEventListener("connection-status", (ev: CustomEvent) => {
        if (ev.detail === "connected") {
          this.connected = true;
          this.fireEvent("browser-mod-connected");
          window.setTimeout(() => this.sendUpdate({}), 1000);
        }
        if (ev.detail === "disconnected") {
          this.connected = false;
          this.fireEvent("browser-mod-disconnected");
        }
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

    get browser_locked() {
      return this.browsers?.[this.browserID]?.locked;
    }

    set registered(reg) {
      (async () => {
        if (reg) {
          if (this.registered || this.global_settings["lockRegister"]) return;
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
        type: "browser_mod/register",
        browserID: this.browserID,
        data: {
          ...this.browsers[this.browserID],
          ...newData,
        },
      });
    }

    get global_settings() {
      const settings = {};
      const global = this._data?.settings ?? {};
      for (const [k, v] of Object.entries(global)) {
        if (v !== null) settings[k] = v;
      }
      return settings;
    }
    get user_settings() {
      const settings = {};
      const user = this._data?.user_settings?.[this.hass?.user?.id] ?? {};
      for (const [k, v] of Object.entries(user)) {
        if (v !== null) settings[k] = v;
      }
      return settings;
    }
    get browser_settings() {
      const settings = {};
      const browser = this.browsers?.[this.browserID]?.settings ?? {};
      for (const [k, v] of Object.entries(browser)) {
        if (v !== null) settings[k] = v;
      }
      return settings;
    }

    get settings() {
      return {
        ...this.global_settings,
        ...this.browser_settings,
        ...this.user_settings,
      };
    }

    set_setting(key, value, level) {
      switch (level) {
        case "global": {
          this.connection.sendMessage({
            type: "browser_mod/settings",
            key,
            value,
          });
          break;
        }
        case "user": {
          const user = this.hass.user.id;
          this.connection.sendMessage({
            type: "browser_mod/settings",
            user,
            key,
            value,
          });
          break;
        }
        case "browser": {
          const settings = this.browsers[this.browserID]?.settings;
          settings[key] = value;
          this._reregister({ settings });
          break;
        }
      }
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

    browserIDChanged(oldID, newID) {
      this.fireEvent("browser-mod-config-update");

      if (
        this.browsers?.[oldID] !== undefined &&
        this.browsers?.[this.browserID] === undefined
      ) {
        (async () => {
          await this.connection.sendMessage({
            type: "browser_mod/register",
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
