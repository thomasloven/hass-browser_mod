from dataclasses import dataclass
from functools import cache
from hashlib import sha256
from pathlib import Path

from aiohttp import web

from homeassistant.components.frontend import (
    add_extra_js_url,
    async_register_built_in_panel,
    async_remove_panel,
    remove_extra_js_url,
)
from homeassistant.components.http import HomeAssistantView
from homeassistant.components.lovelace.resources import ResourceStorageCollection
from homeassistant.core import HomeAssistant

from .const import (
    BROWSER_PANEL_URL,
    CONFIG_PANEL_URL,
    DATA_STORE,
    DOMAIN,
    FRONTEND_SCRIPT_URL,
)

FRONTEND_SETTINGS_PANEL_PATH = "browser-mod"
CONFIG_PANEL_PATH = "browser-mod-config"
_DATA_FRONTEND_SCRIPT_URL = "frontend_script_url"
_DATA_FRONTEND_VIEW_REGISTERED = "frontend_view_registered"


@dataclass(frozen=True)
class _FrontendScript:
    body: bytes
    etag: str


@dataclass(frozen=True)
class _FrontendSnapshot:
    scripts: dict[str, _FrontendScript]
    revision: str


@cache
def _load_frontend_snapshot(
    config_dir: str, runtime_version: str
) -> _FrontendSnapshot:
    """Load the frontend that belongs to this Python process.

    The cache intentionally lasts for the lifetime of the imported Python
    module. HACS may replace the files on disk before Home Assistant restarts,
    but the running backend must continue serving the frontend it started
    with. A restart imports this module again and creates a new snapshot.
    """
    component_dir = Path(config_dir) / "custom_components" / "browser_mod"
    script_files = {
        FRONTEND_SCRIPT_URL: component_dir / "browser_mod.js",
        BROWSER_PANEL_URL: component_dir / "browser_mod_browser_panel.js",
        CONFIG_PANEL_URL: component_dir / "browser_mod_config_panel.js",
    }

    revision = sha256(runtime_version.encode())
    scripts = {}
    for url, path in script_files.items():
        body = path.read_bytes()
        digest = sha256(body).hexdigest()
        scripts[url] = _FrontendScript(body=body, etag=digest)
        revision.update(url.encode())
        revision.update(body)

    return _FrontendSnapshot(
        scripts=scripts,
        revision=revision.hexdigest()[:16],
    )


class BrowserModScriptView(HomeAssistantView):
    """Serve a process-lifetime snapshot of the Browser Mod frontend."""

    requires_auth = False  # module scripts are fetched without auth headers
    url = FRONTEND_SCRIPT_URL
    name = "browser_mod:frontend"
    extra_urls = [BROWSER_PANEL_URL, CONFIG_PANEL_URL]

    def __init__(self, snapshot: _FrontendSnapshot):
        self._scripts = snapshot.scripts

    async def get(self, request: web.Request) -> web.Response:
        script = self._scripts.get(request.path)
        if script is None:
            raise web.HTTPNotFound()

        headers = {
            "Cache-Control": "no-cache",
            "ETag": f'"{script.etag}"',
        }
        if request.if_none_match and any(
            etag.value in ("*", script.etag) for etag in request.if_none_match
        ):
            return web.Response(status=304, headers=headers)

        return web.Response(
            body=script.body,
            content_type="text/javascript",
            headers=headers,
        )


async def async_setup_view(hass: HomeAssistant):
    runtime_version = hass.data[DOMAIN][DATA_STORE].get_version()
    snapshot = await hass.async_add_executor_job(
        _load_frontend_snapshot,
        hass.config.config_dir,
        runtime_version,
    )
    frontend_script_url = FRONTEND_SCRIPT_URL + "?" + snapshot.revision

    # Serve the scripts captured by this backend process. The content revision
    # changes only after a restart loads a new frontend snapshot.
    if not hass.data[DOMAIN].get(_DATA_FRONTEND_VIEW_REGISTERED):
        hass.http.register_view(BrowserModScriptView(snapshot))
        hass.data[DOMAIN][_DATA_FRONTEND_VIEW_REGISTERED] = True
    add_extra_js_url(hass, frontend_script_url)
    hass.data[DOMAIN][_DATA_FRONTEND_SCRIPT_URL] = frontend_script_url

    # Register the Browser Mod Browser Panel
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
                "module_url": BROWSER_PANEL_URL + "?" + snapshot.revision,
            }
        },
    )

    # Register the Browser Mod Config panel
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
                "module_url": CONFIG_PANEL_URL + "?" + snapshot.revision,
            }
        },
    )

    # Also load Browser Mod as a lovelace resource so it's accessible to Cast
    resources = hass.data["lovelace"].resources
    resourceUrl = (
        FRONTEND_SCRIPT_URL
        + "?automatically-added"
        + "&"
        + snapshot.revision
    )
    if resources:
        if not resources.loaded:
            await resources.async_load()
            resources.loaded = True

        frontend_added = False
        for r in resources.async_items():
            if r["url"].startswith(FRONTEND_SCRIPT_URL):
                frontend_added = True
                if not r["url"].endswith(snapshot.revision):
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
    frontend_script_url = hass.data[DOMAIN].pop(
        _DATA_FRONTEND_SCRIPT_URL, None
    )
    if frontend_script_url is not None:
        remove_extra_js_url(hass, frontend_script_url)
    async_remove_panel(hass, FRONTEND_SETTINGS_PANEL_PATH, warn_if_unknown=False)
    async_remove_panel(hass, CONFIG_PANEL_PATH, warn_if_unknown=False)
