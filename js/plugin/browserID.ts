const ID_STORAGE_KEY = "browser_mod-browser-id";
const ID_STORAGE_KEY_LOVELACE_PLAYER = "lovelace-player-device-id"
const ID_COOKIE_KEY = "browser_mod-browser-id";
// 400 days in seconds - the practical maximum accepted by browsers
const COOKIE_MAX_AGE = 400 * 24 * 60 * 60;

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAge: number): void {
  const secure = window.location.protocol === "https:" ? ";Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)};max-age=${maxAge};path=/;SameSite=Strict${secure}`;
}

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
            _clear.apply(this);
            this.setItem(ID_STORAGE_KEY, browserId);
            this.setItem("suspendWhenHidden", suspendWhenHidden);
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
      // This happens e.g. when the frontend cache is reset in the Compainon app
      if (!this.connection) return;
      const recalledID = await this.connection.sendMessagePromise({
        type: "browser_mod/recall_id",
      });
      if (recalledID) {
        localStorage[ID_STORAGE_KEY] = recalledID;
        setCookie(ID_COOKIE_KEY, recalledID, COOKIE_MAX_AGE);
      }
    }

    get browserID() {
      if (document.querySelector("hc-main")) return "CAST";
      // Prefer cookie storage as it is more resistant to Apple's ITP
      // than localStorage which may be cleared after 7 days of inactivity.
      const cookieID = getCookie(ID_COOKIE_KEY);
      if (cookieID) {
        // Keep localStorage in sync for backward compatibility
        localStorage[ID_STORAGE_KEY] = cookieID;
        localStorage[ID_STORAGE_KEY_LOVELACE_PLAYER] = cookieID;
        return cookieID;
      }
      if (localStorage[ID_STORAGE_KEY]) {
        // Migrate existing localStorage value into cookie
        setCookie(ID_COOKIE_KEY, localStorage[ID_STORAGE_KEY], COOKIE_MAX_AGE);
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
      // Store in cookie as primary persistence (more resistant to ITP than localStorage)
      setCookie(ID_COOKIE_KEY, id, COOKIE_MAX_AGE);

      this.browserIDChanged(oldID, id);
    }

    protected browserIDChanged(oldID, newID) {}
  };
};
