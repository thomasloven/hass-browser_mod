import logging
import voluptuous as vol

from homeassistant.components.websocket_api import websocket_command, result_message, event_message, async_register_command

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

def setup_connection(hass):
    async_register_command(hass, handle_connect)
    async_register_command(hass, handle_update)
    _LOGGER.error(f"Registered connect ws command")



@websocket_command({
    vol.Required("type"): "browser_mod/connect",
    vol.Required("deviceID"): str,
})
def handle_connect(hass, connection, msg):
    _LOGGER.error(f"Got connection {msg}")

    devices = hass.data[DOMAIN]["devices"]
    deviceID = msg["deviceID"]
    if deviceID in devices:
        devices[deviceID].ws_connect(connection, msg["id"])
    else:
        adder = hass.data[DOMAIN]["adders"][0]
        devices[deviceID] = adder(hass, deviceID, connection, msg["id"])
    connection.send_message(result_message(msg["id"]))


@websocket_command({
    vol.Required("type"): "browser_mod/update",
    vol.Required("deviceID"): str,
    vol.Optional("browser"): dict,
    vol.Optional("player"): dict,
})
def handle_update(hass, connection, msg):
    devices = hass.data[DOMAIN]["devices"]
    deviceID = msg["deviceID"]
    if deviceID in devices:
        devices[deviceID].ws_update(msg.get("browser", None), msg.get("player", None))
