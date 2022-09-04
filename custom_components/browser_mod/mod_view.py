from homeassistant.components.frontend import add_extra_js_url

from .const import FRONTEND_SCRIPT_URL, SETTINGS_PANEL_URL

import logging

_LOGGER = logging.getLogger(__name__)


async def async_setup_view(hass):

    # Serve the Browser Mod controller and add it as extra_module_url
    hass.http.register_static_path(
        FRONTEND_SCRIPT_URL,
        hass.config.path("custom_components/browser_mod/browser_mod.js"),
    )
    add_extra_js_url(hass, FRONTEND_SCRIPT_URL)

    # Serve the Browser Mod Settings panel and register it as a panel
    hass.http.register_static_path(
        SETTINGS_PANEL_URL,
        hass.config.path("custom_components/browser_mod/browser_mod_panel.js"),
    )
    hass.components.frontend.async_register_built_in_panel(
        component_name="custom",
        sidebar_title="Browser Mod",
        sidebar_icon="mdi:server",
        frontend_url_path="browser-mod",
        require_admin=False,
        config={
            "_panel_custom": {
                "name": "browser-mod-panel",
                "js_url": SETTINGS_PANEL_URL,
            }
        },
    )

    # Also load Browser Mod as a lovelace resource so it's accessible to Cast
    resources = hass.data["lovelace"]["resources"]
    if resources:
        if not resources.loaded:
            await resources.async_load()
            resources.loaded = True

        frontend_added = False
        for r in resources.async_items():
            if r["url"].startswith(FRONTEND_SCRIPT_URL):
                frontend_added = True
                continue

            # While going through the resources, also preload card-mod if it is found
            if "card-mod.js" in r["url"]:
                add_extra_js_url(hass, r["url"])

        if not frontend_added:
            if getattr(resources, "async_create_item", None):
                await resources.async_create_item(
                    {
                        "res_type": "module",
                        "url": FRONTEND_SCRIPT_URL + "?automatically-added",
                    }
                )
            elif getattr(resources, "data", None) and getattr(
                resources.data, "append", None
            ):
                resources.data.append(
                    {
                        "type": "module",
                        "url": FRONTEND_SCRIPT_URL + "?automatically-added",
                    }
                )
