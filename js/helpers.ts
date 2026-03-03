import { Unpromise } from "@watchable/unpromise";

const TIMEOUT_ERROR = "SELECTTREE-TIMEOUT";

export async function await_element(el, hard = false) {
  if (el.localName?.includes("-"))
    await customElements.whenDefined(el.localName);
  if (el.updateComplete) await el.updateComplete;
  if (hard) {
    if (el.pageRendered) await el.pageRendered;
    if (el._panelState) {
      let rounds = 0;
      while (el._panelState !== "loaded" && rounds++ < 5)
        await new Promise((r) => setTimeout(r, 100));
    }
  }
}

async function _selectTree(root, path, all = false) {
  let el = [root];
  if (typeof path === "string") {
    path = path.split(/(\$| )/);
  }
  while (path[path.length - 1] === "") path.pop();
  for (const [i, p] of path.entries()) {
    const e = el[0];
    if (!e) return null;

    if (!p.trim().length) continue;

    await_element(e);
    el = p === "$" ? [e.shadowRoot] : e.querySelectorAll(p);
  }
  return all ? el : el[0];
}

export async function selectTree(root, path, all = false, timeout = 10000) {
  return Unpromise.race([
    _selectTree(root, path, all),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(TIMEOUT_ERROR)), timeout)
    ),
  ]).catch((err) => {
    if (!err.message || err.message !== TIMEOUT_ERROR) throw err;
    return null;
  });
}

export async function getLovelaceRoot(document) {
  let _lovelaceRoot = await _getLovelaceRoot(document);
  while (_lovelaceRoot === null) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    _lovelaceRoot = await _getLovelaceRoot(document);
  }
  return _lovelaceRoot || null;
  
  async function _getLovelaceRoot(document)
  {  let root = await selectTree(
      document,
      "home-assistant$home-assistant-main$ha-panel-lovelace$hui-root"
    );
    if (!root) {
      let panel = await selectTree(
        document,
        "home-assistant$home-assistant-main$partial-panel-resolver>*"
      );
      if (panel?.localName !== "ha-panel-lovelace")
        return false;
    }
    if (!root)
      root = await selectTree(
        document,
        "hc-main $ hc-lovelace $ hui-view"
      );
    if (!root)
      root = await selectTree(
        document,
        "hc-main $ hc-lovelace $ hui-panel-view"
      );
    return root;
  }
}

export async function hass_base_el() {
  const customElement = customElements.get("home-assistant") ??
    customElements.get("hc-main");
  if (customElement === undefined) {
    await Unpromise.race([
      customElements.whenDefined("home-assistant"),
      customElements.whenDefined("hc-main"),
    ]);
  }
  
  const element = customElements.get("home-assistant")
    ? "home-assistant"
    : "hc-main";

  while (!document.querySelector(element))
    await new Promise((r) => window.setTimeout(r, 100));
  return document.querySelector(element);
}

export async function hass() {
  const base: any = await hass_base_el();
  while (!base.hass) await new Promise((r) => window.setTimeout(r, 100));
  return base.hass;
}

export async function provideHass(el) {
  const base: any = await hass_base_el();
  base.provideHass(el);
}

export const loadLoadCardHelpers = async () => {
  if (window.loadCardHelpers !== undefined) return;

  await customElements.whenDefined("partial-panel-resolver");
  const ppResolver = document.createElement("partial-panel-resolver");
  const routes = (ppResolver as any)._getRoutes([
    {
      component_name: "lovelace",
      url_path: "a",
    },
  ]);
  await routes?.routes?.a?.load?.();
  // Load resources
  try {
    const llPanel = document.createElement("ha-panel-lovelace");
    (llPanel as any).hass = await hass();
    (llPanel as any).panel = { config: { mode: "yaml" } };
    await (llPanel as any)._fetchConfig(false);
  } catch (e) {}
};

export const loadHaForm = async () => {
  if (customElements.get("ha-form")) return;
  await loadLoadCardHelpers();
  const helpers = await window.loadCardHelpers();
  if (!helpers) return;
  const card = await helpers.createCardElement({ type: "button" });
  if (!card) return;
  await card.constructor.getConfigElement();
};

// Loads in ha-config-dashboard which is used to copy styling
// Also provides ha-md-list-item
export const loadConfigDashboard = async () => {
  await customElements.whenDefined("partial-panel-resolver");
  const ppResolver = document.createElement("partial-panel-resolver");
  const routes = (ppResolver as any)._getRoutes([
    {
      component_name: "config",
      url_path: "a",
    },
  ]);
  await routes?.routes?.a?.load?.();
  await customElements.whenDefined("ha-panel-config");
  const configRouter: any = document.createElement("ha-panel-config");
  await configRouter?.routerOptions?.routes?.dashboard?.load?.(); // Load ha-config-dashboard
  await configRouter?.routerOptions?.routes?.network?.load?.(); // Load ha-md-list-item
  await customElements.whenDefined("ha-config-dashboard");
};

export const loadDeveloperToolsTemplate = async () => {
  await customElements.whenDefined("partial-panel-resolver");
  await customElements.whenDefined("partial-panel-resolver");
  const ppResolver = document.createElement("partial-panel-resolver");
  const routes = (ppResolver as any)._getRoutes([
    {
      component_name: "developer-tools",
      url_path: "a",
    },
  ]);
  await routes?.routes?.a?.load?.();
  const dtRouter: any = document.createElement("developer-tools-router");
  await dtRouter?.routerOptions?.routes?.template?.load?.();
  await customElements.whenDefined("developer-tools-template");
};

export const loadHaDialog = async () => {
  if (customElements.get("ha-dialog")) return;
  const haEl = await hass_base_el();
  if (!haEl) return;
  const ch = await window.loadCardHelpers();
  window.addEventListener("show-dialog", _showDialogHandler, { once: true, capture: true});
  ch.showAlertDialog(haEl, {});
  async function _showDialogHandler(ev) {
    if (ev.detail?.dialogTag === "dialog-box") {
      ev.stopPropagation();
      ev.detail?.dialogImport?.();
      window.setTimeout(() => {
        if (!customElements.get("ha-dialog")) {
          console.warn("Browser Mod: Failed to load ha-dialog, popups will not work");
        }
      }, 1000);
    }
  }
}

export function throttle(timeout) {
  return function (target, propertyKey, descriptor) {
    const fn = descriptor.value;
    let cooldown = undefined;
    descriptor.value = function (...rest) {
      if (cooldown) return;
      cooldown = setTimeout(() => (cooldown = undefined), timeout);
      return fn.bind(this)(...rest);
    };
  };
}

export function runOnce(restart = false) {
  return function (target, propertyKey, descriptor) {
    const fn = descriptor.value;
    let running = undefined;
    const newfn = function (...rest) {
      if (restart && running === false) running = true;
      if (running !== undefined) return;
      running = false;

      const retval = fn.bind(this)(...rest);
      if (running) {
        running = undefined;
        return newfn.bind(this)(...rest);
      } else {
        running = undefined;
        return retval;
      }
    };
    descriptor.value = newfn;
  };
}

export async function waitRepeat(fn, times, delay) {
  while (times--) {
    await fn();
    await new Promise((r) => setTimeout(r, delay));
  }
}

export function blankVideoUrl() {
  return "data:video/mp4;base64,AAAAGGZ0eXBpc29tAAAAAGlzb21tcDQxAAAACGZyZWUAAAAmbWRhdCELUCh9wBQ+4cAhC1AAfcAAPuHAIQtQAH3AAD7hwAAAAlNtb292AAAAbG12aGQAAAAAxzFHd8cxR3cAAV+QAAAYfQABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAG2lvZHMAAAAAEA0AT////xX/DgQAAAACAAABxHRyYWsAAABcdGtoZAAAAAfHMUd3xzFHdwAAAAIAAAAAAAAYfQAAAAAAAAAAAAAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAWBtZGlhAAAAIG1kaGQAAAAAxzFHd8cxR3cAAKxEAAAL/xXHAAAAAAA0aGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAFNvdW5kIE1lZGlhIEhhbmRsZXIAAAABBG1pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAAyHN0YmwAAABkc3RzZAAAAAAAAAABAAAAVG1wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAACsRAAAAAAAMGVzZHMAAAAAA4CAgB8AQBAEgICAFEAVAAYAAAANdQAADXUFgICAAhIQBgECAAAAGHN0dHMAAAAAAAAAAQAAAAMAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAADAAAAAQAAABRzdHN6AAAAAAAAAAoAAAADAAAAFHN0Y28AAAAAAAAAAQAAACg=";
}

export function popSoundUrl() {
  return "data:audio/mp3;base64,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";
}

export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  wait: number,
  immediate = false
) => {
  let timeout: number | undefined;
  const debouncedFunc = (...args: T): void => {
    const later = () => {
      timeout = undefined;
      func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) {
      func(...args);
    }
  };
  debouncedFunc.cancel = () => {
    clearTimeout(timeout);
  };
  return debouncedFunc;
};

type NonNullUndefined<T> = T extends undefined
  ? never
  : T extends null
    ? never
    : T;

/**
 * Ensure that the input is an array or wrap it in an array
 * @param value - The value to ensure is an array
 */
export function ensureArray(value: undefined): undefined;
export function ensureArray(value: null): null;
export function ensureArray<T>(
  value: T | T[] | readonly T[]
): NonNullUndefined<T>[];
export function ensureArray(value) {
  if (value === undefined || value === null || Array.isArray(value)) {
    return value;
  }
  return [value];
}

export const capitalize = (s: string): string => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";

export const breakCamelCase = (s: string): string => (s && String(s).replace(/([a-z])([A-Z])/g, '$1 $2')) || "";

export function compare_deep(a: any, b: any) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (!(a instanceof Object && b instanceof Object)) return false;
  for (const x in a) {
    if (!a.hasOwnProperty(x)) continue;
    if (!b.hasOwnProperty(x)) return false;
    if (a[x] === b[x]) continue;
    if (typeof a[x] !== "object") return false;
    if (!compare_deep(a[x], b[x])) return false;
  }
  for (const x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (!a.hasOwnProperty(x)) return false;
  }
  return true;
}
