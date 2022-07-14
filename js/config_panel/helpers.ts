// Loads in ha-config-dashboard which is used to copy styling
// Also provides ha-settings-row
export const loadDevTools = async () => {
  if (customElements.get("ha-config-dashboard")) return;
  const ppResolver = document.createElement("partial-panel-resolver");
  const routes = (ppResolver as any).getRoutes([
    {
      component_name: "config",
      url_path: "a",
    },
  ]);
  await routes?.routes?.a?.load?.();
  const configRouter = document.createElement("ha-panel-config");
  await (configRouter as any)?.routerOptions?.routes?.dashboard?.load?.(); // Load ha-config-dashboard
  await (configRouter as any)?.routerOptions?.routes?.cloud?.load?.(); // Load ha-settings-row
  await customElements.whenDefined("ha-config-dashboard");
};
