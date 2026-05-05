import logging
import voluptuous as vol
from datetime import datetime, timezone

from homeassistant.components.websocket_api import (
    event_message,
    async_register_command,
)

from homeassistant.components import websocket_api

from homeassistant.core import callback

from .const import (
    BROWSER_ID,
    DATA_STORE,
    WS_CONNECT,
    WS_LOG,
    WS_RECALL_ID,
    WS_REGISTER,
    WS_SETTINGS,
    WS_STORE_SESSION,
    WS_DELETE_SESSION,
    WS_UNREGISTER,
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
        """Connect to Browser Mod and subscribe to settings updates."""
        browserID = msg[BROWSER_ID]
        store = hass.data[DOMAIN][DATA_STORE]

        @callback
        def send_update(data):
            connection.send_message(event_message(msg["id"], {"result": data}))

        store_listener = store.add_listener(send_update)

        def close_connection():
            store_listener()
            dev = getBrowser(hass, browserID, create=False)
            if dev:
                dev.close_connection(hass, connection)

        connection.subscriptions[msg["id"]] = close_connection
        connection.send_result(msg["id"])

        if store.get_browser(browserID).registered:
            dev = getBrowser(hass, browserID)
            dev.update_settings(hass, store.get_browser(browserID).asdict())
            dev.open_connection(hass, connection, msg["id"])
            await store.set_browser(
                browserID,
                last_seen=datetime.now(tz=timezone.utc).isoformat(),
            )
        send_update(store.asdict())

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_REGISTER,
            vol.Required("browserID"): str,
            vol.Optional("data"): dict,
        }
    )
    @websocket_api.async_response
    async def handle_register(hass, connection, msg):
        """Register a Browser."""
        browserID = msg[BROWSER_ID]
        store = hass.data[DOMAIN][DATA_STORE]

        browserSettings = {"registered": True}
        data = msg.get("data", {})
        if "last_seen" in data:
            del data["last_seen"]
        if BROWSER_ID in data:
            # Change ID of registered browser
            newBrowserID = data[BROWSER_ID]
            del data[BROWSER_ID]

            # Copy data from old browser and delete it from store
            if oldBrowserSettings := store.get_browser(browserID):
                browserSettings = oldBrowserSettings.asdict()
            await store.delete_browser(browserID)

            # Delete the old Browser device
            deleteBrowser(hass, browserID)

            # Use the new browserID from now on
            browserID = newBrowserID

        # Create and/or update Browser device
        dev = getBrowser(hass, browserID)
        dev.update_settings(hass, data)

        # Create or update store data
        if data is not None:
            browserSettings.update(data)
        await store.set_browser(browserID, **browserSettings)

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_UNREGISTER,
            vol.Required("browserID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_unregister(hass, connection, msg):
        """Unregister a Browser."""
        browserID = msg[BROWSER_ID]
        store = hass.data[DOMAIN][DATA_STORE]

        deleteBrowser(hass, browserID)
        await store.delete_browser(browserID)

        connection.send_result(msg["id"])

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_UPDATE,
            vol.Required("browserID"): str,
            vol.Optional("data"): dict,
        }
    )
    @websocket_api.async_response
    async def handle_update(hass, connection, msg):
        """Receive state updates from a Browser."""
        browserID = msg[BROWSER_ID]
        store = hass.data[DOMAIN][DATA_STORE]

        if store.get_browser(browserID).registered:
            dev = getBrowser(hass, browserID)
            dev.update(hass, msg.get("data", {}))

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_SETTINGS,
            vol.Required("key"): str,
            vol.Optional("value"): vol.Any(int, str, bool, list, object, None),
            vol.Optional("user"): str,
        }
    )
    @websocket_api.async_response
    async def handle_settings(hass, connection, msg):
        """Change user or global settings."""
        store = hass.data[DOMAIN][DATA_STORE]
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
            vol.Required("type"): WS_RECALL_ID,
        }
    )
    def handle_recall_id(hass, connection, msg):
        """Recall browserID of Browser with the current connection."""
        store = hass.data[DOMAIN][DATA_STORE]

        # First try: look up by login session (refresh token)
        # This must run before the connection lookup so that via_session is
        # accurately reported; a connection-based hit would mask the session
        # mapping and prevent the frontend from setting the sync flag.
        refresh_token_id = connection.refresh_token_id
        if refresh_token_id:
            browserID = store.get_session_browser_id(refresh_token_id)
            if browserID:
                connection.send_message(
                    websocket_api.result_message(
                        msg["id"], {"browserID": browserID, "via_session": True}
                    )
                )
                return

        # Second try: look up by active connection
        dev = getBrowserByConnection(hass, connection)
        if dev:
            connection.send_message(
                websocket_api.result_message(
                    msg["id"], {"browserID": dev.browserID, "via_session": False}
                )
            )
            return

        connection.send_message(websocket_api.result_message(msg["id"], None))

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_STORE_SESSION,
            vol.Required("browserID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_store_session(hass, connection, msg):
        """Store a login-session -> browserID mapping for the current connection."""
        store = hass.data[DOMAIN][DATA_STORE]
        refresh_token_id = connection.refresh_token_id
        if refresh_token_id:
            await store.set_session_browser_map(refresh_token_id, msg[BROWSER_ID])
        connection.send_result(msg["id"])

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_DELETE_SESSION,
        }
    )
    @websocket_api.async_response
    async def handle_delete_session(hass, connection, msg):
        """Remove the login-session -> browserID mapping for the current connection."""
        store = hass.data[DOMAIN][DATA_STORE]
        refresh_token_id = connection.refresh_token_id
        if refresh_token_id:
            await store.delete_session_browser_map(refresh_token_id)
        connection.send_result(msg["id"])

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_LOG,
            vol.Required("message"): str,
        }
    )
    def handle_log(hass, connection, msg):
        """Print a debug message."""
        _LOGGER.info(f"LOG MESSAGE: {msg['message']}")

    async_register_command(hass, handle_connect)
    async_register_command(hass, handle_register)
    async_register_command(hass, handle_unregister)
    async_register_command(hass, handle_update)
    async_register_command(hass, handle_settings)
    async_register_command(hass, handle_recall_id)
    async_register_command(hass, handle_store_session)
    async_register_command(hass, handle_delete_session)
    async_register_command(hass, handle_log)
