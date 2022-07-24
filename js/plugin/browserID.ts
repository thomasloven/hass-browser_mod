const ID_STORAGE_KEY = "browser_mod-browser-id";

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
    }

    get browserID() {
      if (document.querySelector("hc-main")) return "CAST";
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

      this.browserIDChanged(oldID, id);
    }

    protected browserIDChanged(oldID, newID) {}
  };
};
