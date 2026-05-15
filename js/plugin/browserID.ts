const ID_STORAGE_KEY = "browser_mod-browser-id";
const ID_STORAGE_KEY_LOVELACE_PLAYER = "lovelace-player-device-id";
const SYNC_SESSION_STORAGE_KEY = "browser_mod-sync-session";

const isValidBrowserID = (id: unknown): boolean => {
  return (
    typeof id === "string" &&
    id.trim() !== "" &&
    id !== "undefined" &&
    id !== "null"
  );
};

export const BrowserIDMixin = (SuperClass) => {
  return class BrowserIDMixinClass extends SuperClass {
    constructor() {
      super();

      if (Storage) {
        if (!Storage.prototype.browser_mod_patched) {
          const _clear = Storage.prototype.clear;
          Storage.prototype.clear = function () {
            const browserId = this.getItem(ID_STORAGE_KEY);
            const suspendWhenHidden = this.getItem("suspendWhenHidden");
            const syncSession = this.getItem(SYNC_SESSION_STORAGE_KEY);
            _clear.apply(this);
            this.setItem(ID_STORAGE_KEY, browserId);
            this.setItem("suspendWhenHidden", suspendWhenHidden);
            if (syncSession !== null) this.setItem(SYNC_SESSION_STORAGE_KEY, syncSession);
          };
          Storage.prototype.browser_mod_patched = true;
        }
      } 

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const newBrowserID = urlParams.get("BrowserID");
      if (newBrowserID != null) this.browserID = newBrowserID;
    }

    async recall_id() {
      // Recall the BrowserID from the backend when it has disappeared from localStorage.
      // This happens e.g. when the frontend cache is reset in the Companion app, or on
      // first load when a session mapping was stored server-side.
      // Wait for the WebSocket connection to be ready before sending the request.
      await this.connectionPromise;
      const result = await this.connection.sendMessagePromise({
        type: "browser_mod/recall_id",
      });
      if (result && isValidBrowserID(result.browserID)) {
        this.browserID = result.browserID;
        // If the ID was recovered via a session mapping, reflect that in the sync flag
        if (result.via_session) {
          localStorage.setItem(SYNC_SESSION_STORAGE_KEY, "true");
        }
      }
    }

    get browserID() {
      if (document.querySelector("hc-main")) return "CAST";
      const browserID = localStorage[ID_STORAGE_KEY];
      if (isValidBrowserID(browserID)) {
        // set lovelace-player-device-id as used by card-tools, state-switch
        localStorage[ID_STORAGE_KEY_LOVELACE_PLAYER] = browserID;
        return browserID;
      }
      this.browserID = "";
      return this.browserID;
    }
    set browserID(id: unknown) {
      function _createBrowserID() {
        const s4 = () => {
          return Math.floor((1 + Math.random()) * 100000)
            .toString(16)
            .substring(1);
        };
        return "browser_mod_" + (window.fully?.getDeviceId() ? window.fully.getDeviceId().replace(/-/g,'_') : `${s4()}${s4()}_${s4()}${s4()}`);
      }

      let browserID = typeof id === "string" ? id.trim() : "";
      if (browserID === "") browserID = _createBrowserID();
      if (!isValidBrowserID(browserID)) return;
      const oldID = localStorage[ID_STORAGE_KEY];
      if (browserID === oldID) return;
      localStorage[ID_STORAGE_KEY] = browserID;
      // set lovelace-player-device-id as used by card-tools, state-switch
      localStorage[ID_STORAGE_KEY_LOVELACE_PLAYER] = localStorage[ID_STORAGE_KEY];

      this.browserIDChanged(oldID, browserID);
    }

    get syncSession() {
      return localStorage.getItem(SYNC_SESSION_STORAGE_KEY) === "true";
    }

    set syncSession(value: boolean) {
      if (value) {
        localStorage.setItem(SYNC_SESSION_STORAGE_KEY, "true");
        this.store_session();
      } else {
        localStorage.removeItem(SYNC_SESSION_STORAGE_KEY);
        this.delete_session();
      }
    }

    async store_session() {
      if (!this.connection) return;
      await this.connection.sendMessagePromise({
        type: "browser_mod/store_session",
        browserID: this.browserID,
      });
    }

    async delete_session() {
      if (!this.connection) return;
      await this.connection.sendMessagePromise({
        type: "browser_mod/delete_session",
      });
    }

    protected browserIDChanged(oldID, newID) {}
  };
};
