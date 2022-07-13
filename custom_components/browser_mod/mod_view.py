from homeassistant.components.frontend import add_extra_js_url

from .const import FRONTEND_SCRIPT_URL, SETTINGS_PANEL_URL


async def async_setup_view(hass):

    hass.http.register_static_path(
        FRONTEND_SCRIPT_URL,
        hass.config.path("custom_components/browser_mod/browser_mod.js"),
    )
    add_extra_js_url(hass, FRONTEND_SCRIPT_URL)

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
        SETTINGS_PANEL_URL,
        hass.config.path("custom_components/browser_mod/browser_mod_panel.js"),
    )
