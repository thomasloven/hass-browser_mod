import logging
import voluptuous as vol
from datetime import datetime, timezone

from homeassistant.components.websocket_api import (
    event_message,
    async_register_command,
)

from homeassistant.components import websocket_api

from .const import (
    WS_CONNECT,
    WS_REGISTER,
    WS_UNREGISTER,
    WS_REREGISTER,
    WS_UPDATE,
    DOMAIN,
)

from .browser import getBrowser, deleteBrowser, getBrowserByConnection

_LOGGER = logging.getLogger(__name__)


async def async_setup_connection(hass):
    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_CONNECT,
            vol.Required("browserID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_connect(hass, connection, msg):
        browserID = msg["browserID"]
        store = hass.data[DOMAIN]["store"]

        def listener(data):
            connection.send_message(event_message(msg["id"], {"result": data}))

        store_listener = store.add_listener(listener)

        def unsubscriber():
            store_listener()
            dev = getBrowser(hass, browserID, create=False)
            if dev:
                dev.close_connection(connection)

        connection.subscriptions[msg["id"]] = unsubscriber
        connection.send_result(msg["id"])

        if store.get_browser(browserID).enabled:
            dev = getBrowser(hass, browserID)
            dev.update_settings(hass, store.get_browser(browserID).asdict())
            dev.open_connection(connection, msg["id"])
            await store.set_browser(
                browserID, last_seen=datetime.now(tz=timezone.utc).isoformat()
            )
        listener(store.asdict())

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_REGISTER,
            vol.Required("browserID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_register(hass, connection, msg):
        browserID = msg["browserID"]
        store = hass.data[DOMAIN]["store"]
        await store.set_browser(browserID, enabled=True)
        connection.send_result(msg["id"])

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_UNREGISTER,
            vol.Required("browserID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_unregister(hass, connection, msg):
        browserID = msg["browserID"]
        store = hass.data[DOMAIN]["store"]

        deleteBrowser(hass, browserID)
        await store.delete_browser(browserID)

        connection.send_result(msg["id"])

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_REREGISTER,
            vol.Required("browserID"): str,
            vol.Required("data"): dict,
        }
    )
    @websocket_api.async_response
    async def handle_reregister(hass, connection, msg):
        browserID = msg["browserID"]
        store = hass.data[DOMAIN]["store"]

        data = msg["data"]
        del data["last_seen"]
        browserSettings = {}

        if "browserID" in data:
            newBrowserID = data["browserID"]
            del data["browserID"]

            oldBrowserSetting = store.get_browser(browserID)
            if oldBrowserSetting:
                browserSettings = oldBrowserSetting.asdict()
            await store.delete_browser(browserID)

            deleteBrowser(hass, browserID)

            browserID = newBrowserID

        if (dev := getBrowser(hass, browserID, create=False)) is not None:
            dev.update_settings(hass, data)

        browserSettings.update(data)
        await store.set_browser(browserID, **browserSettings)

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_UPDATE,
            vol.Required("browserID"): str,
            vol.Optional("data"): dict,
        }
    )
    @websocket_api.async_response
    async def handle_update(hass, connection, msg):
        browserID = msg["browserID"]
        store = hass.data[DOMAIN]["store"]

        if store.get_browser(browserID).enabled:
            dev = getBrowser(hass, browserID)
            dev.update(hass, msg.get("data", {}))

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "browser_mod/settings",
            vol.Required("key"): str,
            vol.Optional("value"): vol.Any(int, str, bool, list, object, None),
            vol.Optional("user"): str,
        }
    )
    @websocket_api.async_response
    async def handle_settings(hass, connection, msg):
        store = hass.data[DOMAIN]["store"]
        if "user" in msg:
            # Set user setting
            await store.set_user_settings(
                msg["user"], **{msg["key"]: msg.get("value", None)}
            )
        else:
            # Set global setting
            await store.set_global_settings(**{msg["key"]: msg.get("value", None)})
        pass

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "browser_mod/recall_id",
        }
    )
    def handle_recall_id(hass, connection, msg):
        dev = getBrowserByConnection(hass, connection)
        if dev:
            connection.send_message(
                websocket_api.result_message(msg["id"], dev.browserID)
            )
        connection.send_message(websocket_api.result_message(msg["id"], None))

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "browser_mod/log",
            vol.Required("message"): str,
        }
    )
    def handle_log(hass, connection, msg):
        _LOGGER.info("LOG MESSAGE")
        _LOGGER.info(msg["message"])

    async_register_command(hass, handle_connect)
    async_register_command(hass, handle_register)
    async_register_command(hass, handle_unregister)
    async_register_command(hass, handle_reregister)
    async_register_command(hass, handle_update)
    async_register_command(hass, handle_settings)
    async_register_command(hass, handle_recall_id)
    async_register_command(hass, handle_log)
