"""Patch HA frontend websocket handlers to inject Browser Mod defaultPanel overrides.

The HA frontend determines the default panel via this priority chain:
  1. hass.userData?.default_panel  (from frontend/subscribe_user_data key "core")
  2. hass.systemData?.default_panel (from frontend/subscribe_system_data key "core")
  3. localStorage "defaultPanel"    (legacy)
  4. "home"                         (built-in default)

Browser Mod stores defaultPanel at three levels:
  - Global-level:  settings.defaultPanel
  - Browser-level: browsers[browserID].settings.defaultPanel
  - User-level:    user_settings[userID].defaultPanel

This module overrides the four relevant HA websocket handlers so that BM's
defaultPanel values are injected into the responses before they reach the browser:
  - frontend/subscribe_user_data  (key "core") → global-level or browser/user-level
  - frontend/get_user_data        (key "core") → global-level or browser/user-level
  - frontend/subscribe_system_data (key "core") → global-level
  - frontend/get_system_data      (key "core") → global-level

The browser identity is resolved by looking up the connection in DATA_BROWSERS —
the live registry of registered browsers maintained by BrowserModBrowser.  Only
registered browsers appear in DATA_BROWSERS, so any unregistered connection (which
cannot have browser-level settings) correctly returns None.  This approach does not
require the "syncSession" / session_browser_map mechanism.
"""

import logging

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import async_register_command
from homeassistant.components.websocket_api.const import DOMAIN as WS_DOMAIN
from homeassistant.core import HomeAssistant

from .const import DATA_BROWSERS, DATA_FRONTEND_PATCHES, DATA_STORE, DOMAIN

_LOGGER = logging.getLogger(__name__)

_PATCHED_COMMANDS = [
    "frontend/subscribe_user_data",
    "frontend/get_user_data",
    "frontend/subscribe_system_data",
    "frontend/get_system_data",
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _resolve_browser_id(hass, connection):
    """Resolve browserID by finding a registered browser whose connection matches.

    Returns the browserID string if a registered BrowserModBrowser has this
    connection open, otherwise None.

    Only registered browsers are tracked in DATA_BROWSERS, so unregistered
    connections — which cannot have browser-level settings — always return None.
    This lookup does not require the syncSession / session_browser_map mechanism.
    """
    browsers = hass.data.get(DOMAIN, {}).get(DATA_BROWSERS, {})
    for browser_id, browser in browsers.items():
        if any(c[0] == connection for c in browser.connection):
            return browser_id
    return None


def _get_user_data_default_panel(bm_store, browser_id, user_id):
    """Return the defaultPanel to inject into userData, or None.

    Priority: global-level > browser-level > user-level > None.

    browser_id is only non-None when the connection belongs to a registered
    browser (resolved via DATA_BROWSERS), so no additional registration check
    is needed here.
    """
    global_settings = bm_store.get_global_settings()
    if global_settings.defaultPanel not in (None, ""):
        return global_settings.defaultPanel

    if browser_id is not None:
        browser = bm_store.get_browser(browser_id)
        if browser.settings.defaultPanel not in (None, ""):
            return browser.settings.defaultPanel

    user_settings = bm_store.get_user_settings(user_id)
    if user_settings.defaultPanel not in (None, ""):
        return user_settings.defaultPanel

    return None


def _get_system_data_default_panel(bm_store):
    """Return the global defaultPanel to inject into systemData, or None."""
    global_settings = bm_store.get_global_settings()
    if global_settings.defaultPanel in (None, ""):
        return None
    return global_settings.defaultPanel


def _inject_user_default_panel(ha_value, bm_store, browser_id, user_id):
    """Return ha_value with BM's defaultPanel injected if applicable."""
    dp = _get_user_data_default_panel(bm_store, browser_id, user_id)
    if dp is None:
        return ha_value
    return {**(ha_value or {}), "default_panel": dp}


def _inject_system_default_panel(ha_value, bm_store):
    """Return ha_value with BM's global defaultPanel injected if applicable."""
    dp = _get_system_data_default_panel(bm_store)
    if dp is None:
        return ha_value
    return {**(ha_value or {}), "default_panel": dp}


# ---------------------------------------------------------------------------
# Setup / teardown
# ---------------------------------------------------------------------------


async def async_setup_frontend_patches(hass: HomeAssistant) -> None:
    """Override HA frontend websocket handlers to inject Browser Mod defaultPanel."""
    from homeassistant.components.frontend.storage import (
        async_system_store,
        async_user_store,
    )

    ws_handlers = hass.data.get(WS_DOMAIN, {})

    # Save the originals so we can restore them on unload.
    saved = {cmd: ws_handlers[cmd] for cmd in _PATCHED_COMMANDS if cmd in ws_handlers}
    hass.data[DOMAIN][DATA_FRONTEND_PATCHES] = saved

    # -----------------------------------------------------------------------
    # frontend/subscribe_user_data
    # -----------------------------------------------------------------------

    @websocket_api.websocket_command(
        {vol.Required("type"): "frontend/subscribe_user_data", vol.Optional("key"): str}
    )
    @websocket_api.async_response
    async def patched_subscribe_user_data(hass, connection, msg):
        key = msg.get("key")
        user_id = connection.user.id
        ha_store = await async_user_store(hass, user_id)

        if key != "core":
            # Pass through: replicate HA's own handler for non-"core" keys.
            def on_data_update_passthrough():
                data = ha_store.data
                connection.send_event(
                    msg["id"],
                    {"value": data.get(key) if key is not None else data},
                )

            connection.subscriptions[msg["id"]] = ha_store.async_subscribe(
                key, on_data_update_passthrough
            )
            on_data_update_passthrough()
            connection.send_result(msg["id"])
            return

        # "core" key: inject BM defaultPanel.
        bm_store = hass.data.get(DOMAIN, {}).get(DATA_STORE)

        def get_merged_value():
            ha_value = ha_store.data.get("core") or {}
            if bm_store is None:
                return ha_value
            browser_id = _resolve_browser_id(hass, connection)
            return _inject_user_default_panel(ha_value, bm_store, browser_id, user_id)

        def send_core_event():
            connection.send_event(msg["id"], {"value": get_merged_value()})

        ha_unsub = ha_store.async_subscribe("core", send_core_event)

        bm_unsub = None
        if bm_store is not None:
            # Re-push the event whenever BM settings change (e.g. after
            # the user changes the defaultPanel setting in the UI).
            bm_unsub = bm_store.add_listener(lambda _data: send_core_event())

        def unsubscribe():
            ha_unsub()
            if bm_unsub is not None:
                bm_unsub()

        connection.subscriptions[msg["id"]] = unsubscribe
        send_core_event()
        connection.send_result(msg["id"])

    # -----------------------------------------------------------------------
    # frontend/get_user_data
    # -----------------------------------------------------------------------

    @websocket_api.websocket_command(
        {vol.Required("type"): "frontend/get_user_data", vol.Optional("key"): str}
    )
    @websocket_api.async_response
    async def patched_get_user_data(hass, connection, msg):
        ha_store = await async_user_store(hass, connection.user.id)
        key = msg.get("key")

        if key != "core":
            # Pass through for non-"core" keys or when no key is provided.
            data = ha_store.data
            connection.send_result(
                msg["id"],
                {"value": data.get(key) if key is not None else data},
            )
            return

        bm_store = hass.data.get(DOMAIN, {}).get(DATA_STORE)
        ha_value = ha_store.data.get("core") or {}

        if bm_store is not None:
            browser_id = _resolve_browser_id(hass, connection)
            ha_value = _inject_user_default_panel(
                ha_value, bm_store, browser_id, connection.user.id
            )

        connection.send_result(msg["id"], {"value": ha_value})

    # -----------------------------------------------------------------------
    # frontend/subscribe_system_data
    # -----------------------------------------------------------------------

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "frontend/subscribe_system_data",
            vol.Required("key"): str,
        }
    )
    @websocket_api.async_response
    async def patched_subscribe_system_data(hass, connection, msg):
        key = msg["key"]
        ha_store = await async_system_store(hass)

        if key != "core":
            # Pass through for non-"core" keys.
            def on_system_data_update_passthrough():
                connection.send_event(msg["id"], {"value": ha_store.data.get(key)})

            connection.subscriptions[msg["id"]] = ha_store.async_subscribe(
                key, on_system_data_update_passthrough
            )
            on_system_data_update_passthrough()
            connection.send_result(msg["id"])
            return

        # "core" key: inject BM global defaultPanel.
        bm_store = hass.data.get(DOMAIN, {}).get(DATA_STORE)

        def get_merged_system_value():
            ha_value = ha_store.data.get("core") or {}
            if bm_store is None:
                return ha_value
            return _inject_system_default_panel(ha_value, bm_store)

        def send_system_core_event():
            connection.send_event(msg["id"], {"value": get_merged_system_value()})

        ha_unsub = ha_store.async_subscribe("core", send_system_core_event)

        bm_unsub = None
        if bm_store is not None:
            bm_unsub = bm_store.add_listener(lambda _data: send_system_core_event())

        def unsubscribe():
            ha_unsub()
            if bm_unsub is not None:
                bm_unsub()

        connection.subscriptions[msg["id"]] = unsubscribe
        send_system_core_event()
        connection.send_result(msg["id"])

    # -----------------------------------------------------------------------
    # frontend/get_system_data
    # -----------------------------------------------------------------------

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "frontend/get_system_data",
            vol.Required("key"): str,
        }
    )
    @websocket_api.async_response
    async def patched_get_system_data(hass, connection, msg):
        key = msg["key"]
        ha_store = await async_system_store(hass)

        if key != "core":
            connection.send_result(msg["id"], {"value": ha_store.data.get(key)})
            return

        bm_store = hass.data.get(DOMAIN, {}).get(DATA_STORE)
        ha_value = ha_store.data.get("core") or {}

        if bm_store is not None:
            ha_value = _inject_system_default_panel(ha_value, bm_store)

        connection.send_result(msg["id"], {"value": ha_value})

    # Register all patched handlers — these overwrite the existing HA entries
    # in hass.data["websocket_api"], which is the same dict referenced by every
    # active ActiveConnection.handlers, so all connections see the new handlers
    # immediately.
    async_register_command(hass, patched_subscribe_user_data)
    async_register_command(hass, patched_get_user_data)
    async_register_command(hass, patched_subscribe_system_data)
    async_register_command(hass, patched_get_system_data)

    _LOGGER.debug(
        "Browser Mod: frontend websocket handlers patched for defaultPanel injection"
    )


async def async_restore_frontend_patches(hass: HomeAssistant) -> None:
    """Restore the original HA frontend websocket handlers on integration unload."""
    saved = hass.data.get(DOMAIN, {}).get(DATA_FRONTEND_PATCHES)
    if not saved:
        return

    ws_handlers = hass.data.get(WS_DOMAIN, {})
    for cmd, handler_schema in saved.items():
        ws_handlers[cmd] = handler_schema

    hass.data[DOMAIN].pop(DATA_FRONTEND_PATCHES, None)
    _LOGGER.debug("Browser Mod: frontend websocket handlers restored")
