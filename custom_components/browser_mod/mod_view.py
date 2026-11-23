from dataclasses import dataclass
from pathlib import Path
from shutil import copyfile
from tempfile import TemporaryDirectory

from homeassistant.core import HomeAssistant
from homeassistant.components.frontend import (
    add_extra_js_url,
    async_register_built_in_panel,
    async_remove_panel,
    remove_extra_js_url,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.lovelace.resources import ResourceStorageCollection
from homeassistant.const import EVENT_HOMEASSISTANT_STOP

from .const import (
    BROWSER_PANEL_URL,
    CONFIG_PANEL_URL,
    DATA_FRONTEND_ASSET_SNAPSHOT,
    DOMAIN,
    FRONTEND_SCRIPT_URL,
)
from .helpers import get_version

import logging

_LOGGER = logging.getLogger(__name__)
FRONTEND_SETTINGS_PANEL_PATH = "browser-mod"
CONFIG_PANEL_PATH = "browser-mod-config"


@dataclass
class FrontendAssetSnapshot:
    """Frontend assets and version captured for this Home Assistant process."""

    directory: TemporaryDirectory
    version: str
    frontend_script_path: str
    browser_panel_path: str
    config_panel_path: str

    def cleanup(self) -> None:
        """Remove the temporary asset snapshot."""
        self.directory.cleanup()


def _create_frontend_asset_snapshot(hass: HomeAssistant) -> FrontendAssetSnapshot:
    """Copy frontend assets outside the directory HACS updates in place."""
    directory = TemporaryDirectory(prefix=f"{DOMAIN}-frontend-")
    source_directory = Path(hass.config.path(f"custom_components/{DOMAIN}"))
    snapshot_directory = Path(directory.name)

    try:
        version = get_version(hass)
        paths = {}
        for url in (FRONTEND_SCRIPT_URL, BROWSER_PANEL_URL, CONFIG_PANEL_URL):
            filename = url.removeprefix("/")
            source_path = source_directory / filename
            destination_path = snapshot_directory / filename
            copyfile(source_path, destination_path)

            # aiohttp can serve a sibling pre-compressed asset when supported by
            # the browser, so it must be kept with the snapshot as well.
            compressed_source = source_path.with_suffix(f"{source_path.suffix}.gz")
            if compressed_source.is_file():
                copyfile(
                    compressed_source,
                    destination_path.with_suffix(f"{destination_path.suffix}.gz"),
                )
            paths[url] = str(destination_path)
    except Exception:
        directory.cleanup()
        raise

    return FrontendAssetSnapshot(
        directory=directory,
        version=version,
        frontend_script_path=paths[FRONTEND_SCRIPT_URL],
        browser_panel_path=paths[BROWSER_PANEL_URL],
        config_panel_path=paths[CONFIG_PANEL_URL],
    )


async def async_get_frontend_asset_snapshot(
    hass: HomeAssistant,
) -> FrontendAssetSnapshot:
    """Return the frontend asset snapshot for this Home Assistant process."""
    if snapshot := hass.data.get(DATA_FRONTEND_ASSET_SNAPSHOT):
        return snapshot

    snapshot = await hass.async_add_executor_job(_create_frontend_asset_snapshot, hass)
    hass.data[DATA_FRONTEND_ASSET_SNAPSHOT] = snapshot

    async def async_cleanup_snapshot(_event) -> None:
        await hass.async_add_executor_job(snapshot.cleanup)

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, async_cleanup_snapshot)
    return snapshot


async def async_setup_static_paths(hass: HomeAssistant) -> None:
    """Register static paths backed by the process-lifetime asset snapshot."""
    snapshot = await async_get_frontend_asset_snapshot(hass)
    try:
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(FRONTEND_SCRIPT_URL, snapshot.frontend_script_path, True),
                StaticPathConfig(BROWSER_PANEL_URL, snapshot.browser_panel_path, True),
                StaticPathConfig(CONFIG_PANEL_URL, snapshot.config_panel_path, True),
            ]
        )
    except RuntimeError:
        # Static paths may have been registered by a previous config-entry
        # instance before the integration was re-added without an HA restart.
        pass


async def async_setup_view(hass: HomeAssistant):
    snapshot = await async_get_frontend_asset_snapshot(hass)
    version = snapshot.version
    frontend_script_url = FRONTEND_SCRIPT_URL + "?" + version

    # Add the Browser Mod controller as an extra module URL.
    add_extra_js_url(hass, frontend_script_url)

    # Register the Browser Mod Browser Panel.
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
                "module_url": BROWSER_PANEL_URL + "?" + version,
            }
        },
    )

    # Register the Browser Mod Config panel.
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
    snapshot = await async_get_frontend_asset_snapshot(hass)
    remove_extra_js_url(hass, FRONTEND_SCRIPT_URL + "?" + snapshot.version)
    async_remove_panel(hass, FRONTEND_SETTINGS_PANEL_PATH, warn_if_unknown=False)
    async_remove_panel(hass, CONFIG_PANEL_PATH, warn_if_unknown=False)
