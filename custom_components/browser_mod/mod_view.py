from homeassistant.core import HomeAssistant
from homeassistant.components.frontend import (
    add_extra_js_url,
    async_register_built_in_panel,
    async_remove_panel,
    remove_extra_js_url,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.lovelace.resources import ResourceStorageCollection

from .const import DOMAIN, FRONTEND_SCRIPT_URL, BROWSER_PANEL_URL, CONFIG_PANEL_URL
from .helpers import get_version

import logging

_LOGGER = logging.getLogger(__name__)
FRONTEND_SETTINGS_PANEL_PATH = "browser-mod"
CONFIG_PANEL_PATH = "browser-mod-config"

async def async_setup_view(hass: HomeAssistant):

    version = await hass.async_add_executor_job(get_version, hass)
    frontend_script_url = FRONTEND_SCRIPT_URL + "?" + version

    # Serve the Browser Mod controller and add it as extra_module_url
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                FRONTEND_SCRIPT_URL,
                hass.config.path("custom_components/browser_mod/browser_mod.js"),
                True,
            )
        ]
    )
    add_extra_js_url(hass, frontend_script_url)

    # Serve the Browser Mod Browser Panel and register it as a panel
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                BROWSER_PANEL_URL,
                hass.config.path("custom_components/browser_mod/browser_mod_browser_panel.js"),
                True,
            )
        ]
    )
    async_remove_panel(hass, FRONTEND_SETTINGS_PANEL_PATH, warn_if_unknown=False)
    async_register_built_in_panel(
        hass=hass,
        component_name="custom",
        sidebar_title="Browser Mod",
        sidebar_icon="mdi:server",
        frontend_url_path=FRONTEND_SETTINGS_PANEL_PATH,
        require_admin=False,
        config={
            "_panel_custom": {
                "name": "browser-mod-browser-panel",
                "js_url": BROWSER_PANEL_URL + "?" + version,
            }
        },
    )

    # Serve the Browser Mod Config panel and register it as a panel
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                CONFIG_PANEL_URL,
                hass.config.path("custom_components/browser_mod/browser_mod_config_panel.js"),
                True,
            )
        ]
    )
    async_remove_panel(hass, CONFIG_PANEL_PATH, warn_if_unknown=False)
    async_register_built_in_panel(
        hass=hass,
        component_name="custom",
        frontend_url_path=CONFIG_PANEL_PATH,
        require_admin=True,
        config_panel_domain=DOMAIN,
        config={
            "_panel_custom": {
                "name": "browser-mod-config-panel",
                "module_url": CONFIG_PANEL_URL + "?" + version,
            }
        },
    )

    # Also load Browser Mod as a lovelace resource so it's accessible to Cast
    resources = hass.data["lovelace"].resources
    resourceUrl = FRONTEND_SCRIPT_URL + "?automatically-added" + "&" + version
    if resources:
        if not resources.loaded:
            await resources.async_load()
            resources.loaded = True

        frontend_added = False
        for r in resources.async_items():
            if r["url"].startswith(FRONTEND_SCRIPT_URL):
                frontend_added = True
                if not r["url"].endswith(version):
                    if isinstance(resources, ResourceStorageCollection):
                        await resources.async_update_item(
                            r["id"], 
                            {
                                "res_type": "module", 
                                "url": resourceUrl
                            }
                        )
                    else:
                        # not the best solution, but what else can we do
                        r["url"] = resourceUrl
                
                continue

        if not frontend_added:
            if getattr(resources, "async_create_item", None):
                await resources.async_create_item(
                    {
                        "res_type": "module",
                        "url": resourceUrl,
                    }
                )
            elif getattr(resources, "data", None) and getattr(
                resources.data, "append", None
            ):
                resources.data.append(
                    {
                        "type": "module",
                        "url": resourceUrl,

                    }
                )


async def async_unload_view(hass: HomeAssistant):
    version = await hass.async_add_executor_job(get_version, hass)
    remove_extra_js_url(hass, FRONTEND_SCRIPT_URL + "?" + version)
    async_remove_panel(hass, FRONTEND_SETTINGS_PANEL_PATH, warn_if_unknown=False)
    async_remove_panel(hass, CONFIG_PANEL_PATH, warn_if_unknown=False)