import { hass, provideHass } from "../helpers";

export const ConnectionMixin = (SuperClass) => {
  class BrowserModConnection extends SuperClass {
    public hass;
    public connection;
    public ready = false;

    private _data;
    private _connected = false;
    private _connectionResolve;

    public connectionPromise = new Promise((resolve) => {
      this._connectionResolve = resolve;
    });
    public browserEntities = {};

    LOG(...args) {
      if (window.browser_mod_log === undefined) return;
      const dt = new Date();
      console.log(`${dt.toLocaleTimeString()}`, ...args);

      if (this._connected) {
        try {
          this.connection.sendMessage({
            type: "browser_mod/log",
            message: args[0],
          });
        } catch (err) {
         console.log("Browser Mod: Error sending log:", err);
        }
      }
    }

    // Propagate internal browser event
    private fireBrowserEvent(event, detail = undefined) {
      this.dispatchEvent(new CustomEvent(event, { detail, bubbles: true }));
    }

    /*
     * Main state flags explained:
     * * `connected` and `disconnected` refers to WS connection,
     * * `ready` refers to established communication between browser and component counterpart.
     */

    // Component and frontend are mutually ready
    private onReady = () => {
      this.ready = true;
      this.LOG("Integration ready: browser_mod loaded and update received");
      this.fireBrowserEvent("browser-mod-ready");
      window.setTimeout(() => this.sendUpdate({}), 1000);
    }

    // WebSocket has connected
    private onConnected = () => {
      this._connected = true;
      this.LOG("WebSocket connected");
    }

    // WebSocket has disconnected
    private onDisconnected = () => {
      this.ready = false;
      this._connected = false;
      this.LOG("WebSocket disconnected");
      this.fireBrowserEvent("browser-mod-disconnected");
    }

    // Handle incoming message
    private incoming_message(msg) {
      // Set that have a connection. Allows logging
      if (!this._connected) {
        this.onConnected();
      }
      // Handle messages
      if (msg.command) {
        this.LOG("Command:", msg);
        this.fireBrowserEvent(`command-${msg.command}`, msg);
      } else if (msg.browserEntities) {
        this.browserEntities = msg.browserEntities;
      } else if (msg.result) {
        this.update_config(msg.result);
      }
      // Resolve first connection promise
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

      // Check for readiness (of component and browser)
      if (!this.ready) {
        this.onReady();
      }
      this.fireBrowserEvent("browser-mod-config-update");

      if (update) this.sendUpdate({});
    }

    async connect() {
      const conn = (await hass()).connection;
      this.connection = conn;

      const connectBrowserModComponent = () => {
        this.LOG("Subscribing to browser_mod/connect events");
        conn.subscribeMessage((msg) => this.incoming_message(msg), {
          type: "browser_mod/connect",
          browserID: this.browserID,
        });
      };

      // Initial connect component subscription
      connectBrowserModComponent();
      // If this fails, then:
      // Observe `component_loaded` to track when `browser_mod` is dynamically added
      conn.subscribeEvents((haEvent) => {
        if (haEvent.data?.component === "browser_mod") {
          this.LOG("Detected browser_mod component load");
          connectBrowserModComponent();
        }
      }, "component_loaded");

      // Keep connection status up to date
      conn.addEventListener("ready", () => {
        this.onConnected();
      });
      conn.addEventListener("disconnected", () => {
        this.onDisconnected();
      });
      window.addEventListener("connection-status", (ev: CustomEvent) => {
        if (ev.detail === "connected") {
          this.onConnected();
        }
        if (ev.detail === "disconnected") {
          this.onDisconnected();
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
      if (!this.ready || !this.registered) return;

      const dt = new Date();

      this.LOG("Send:", data);
      try {
        this.connection.sendMessage({
          type: "browser_mod/update",
          browserID: this.browserID,
          data,
        })
      } catch (err) {
        // As we are not sure of connection state, just log to console
        console.log("Browser Mod: Error sending update:", err);
      }
    }

    browserIDChanged(oldID, newID) {
      this.fireBrowserEvent("browser-mod-config-update");

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
