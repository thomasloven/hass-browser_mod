from .const import FRONTEND_SCRIPT_URL, DATA_EXTRA_MODULE_URL, SETTINGS_PANEL_URL


def setup_view(hass):
    url_set = hass.data[DATA_EXTRA_MODULE_URL]
    url_set.add(FRONTEND_SCRIPT_URL)

    hass.components.frontend.async_register_built_in_panel(
        component_name="custom",
        sidebar_title="Browser Mod",
        sidebar_icon="mdi:server",
        frontend_url_path="browser-mod",
        require_admin=True,
        config={
            "_panel_custom": {
                "name": "browser-mod-panel",
                "js_url": SETTINGS_PANEL_URL,
            }
        },
    )

    hass.http.register_static_path(
        FRONTEND_SCRIPT_URL,
        hass.config.path("custom_components/browser_mod/browser_mod.js"),
    )
    hass.http.register_static_path(
        SETTINGS_PANEL_URL,
        hass.config.path("custom_components/browser_mod/browser_mod_panel.js"),
    )
