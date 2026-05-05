const ID_STORAGE_KEY = "browser_mod-browser-id";
const ID_STORAGE_KEY_LOVELACE_PLAYER = "lovelace-player-device-id"
const SYNC_SESSION_STORAGE_KEY = "browser_mod-sync-session";

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
      // If the connection is still open, but the BrowserID has disappeared - recall it from the backend
      // This happens e.g. when the frontend cache is reset in the Companion app
      // Also tries session-based recall if a session mapping was stored server-side
      if (!this.connection) return;
      const result = await this.connection.sendMessagePromise({
        type: "browser_mod/recall_id",
      });
      if (result) {
        const browserID = result.browserID ?? result;
        localStorage[ID_STORAGE_KEY] = browserID;
        // If the ID was recovered via a session mapping, reflect that in the sync flag
        if (result.via_session) {
          localStorage.setItem(SYNC_SESSION_STORAGE_KEY, "true");
        }
      }
    }

    get browserID() {
      if (document.querySelector("hc-main")) return "CAST";
      if (localStorage[ID_STORAGE_KEY]) {
        // set lovelace-player-device-id as used by card-tools, state-switch
        localStorage[ID_STORAGE_KEY_LOVELACE_PLAYER] = localStorage[ID_STORAGE_KEY];
        return localStorage[ID_STORAGE_KEY];
      }
      this.browserID = "";
      this.recall_id();
      return this.browserID;
    }
    set browserID(id) {
      function _createBrowserID() {
        const s4 = () => {
          return Math.floor((1 + Math.random()) * 100000)
            .toString(16)
            .substring(1);
        };
        return "browser_mod_" + (window.fully?.getDeviceId() ? window.fully.getDeviceId().replace(/-/g,'_') : `${s4()}${s4()}_${s4()}${s4()}`);
      }

      if (id === "") id = _createBrowserID();
      const oldID = localStorage[ID_STORAGE_KEY];
      localStorage[ID_STORAGE_KEY] = id;
      // set lovelace-player-device-id as used by card-tools, state-switch
      localStorage[ID_STORAGE_KEY_LOVELACE_PLAYER] = localStorage[ID_STORAGE_KEY];

      this.browserIDChanged(oldID, id);
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
