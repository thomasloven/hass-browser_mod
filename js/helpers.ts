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
  return Promise.race([
    _selectTree(root, path, all),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(TIMEOUT_ERROR)), timeout)
    ),
  ]).catch((err) => {
    if (!err.message || err.message !== TIMEOUT_ERROR) throw err;
    return null;
  });
}

export async function hass_base_el() {
  await Promise.race([
    customElements.whenDefined("home-assistant"),
    customElements.whenDefined("hc-main"),
  ]);

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
  const routes = (ppResolver as any).getRoutes([
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
// Also provides ha-settings-row
export const loadConfigDashboard = async () => {
  await customElements.whenDefined("partial-panel-resolver");
  const ppResolver = document.createElement("partial-panel-resolver");
  const routes = (ppResolver as any).getRoutes([
    {
      component_name: "config",
      url_path: "a",
    },
  ]);
  await routes?.routes?.a?.load?.();
  await customElements.whenDefined("ha-panel-config");
  const configRouter: any = document.createElement("ha-panel-config");
  await configRouter?.routerOptions?.routes?.dashboard?.load?.(); // Load ha-config-dashboard
  await configRouter?.routerOptions?.routes?.general?.load?.(); // Load ha-settings-row
  await configRouter?.routerOptions?.routes?.entities?.load?.(); // Load ha-data-table
  await customElements.whenDefined("ha-config-dashboard");
};

export const loadDeveloperToolsTemplate = async () => {
  await customElements.whenDefined("partial-panel-resolver");
  await customElements.whenDefined("partial-panel-resolver");
  const ppResolver = document.createElement("partial-panel-resolver");
  const routes = (ppResolver as any).getRoutes([
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
