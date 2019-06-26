import logging
import voluptuous as vol

from homeassistant.components.websocket_api import websocket_command, result_message, event_message, async_register_command

from .mod_view import setup_view

DOMAIN = "browser_mod"

FRONTEND_SCRIPT_URL = "/browser_mod.js"

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass, config):
    _LOGGER.error(f"Setting up browser_mod")

    setup_view(hass, FRONTEND_SCRIPT_URL)
    _LOGGER.error(f"Registered frontend script")

    aliases = {}
    for d in config[DOMAIN].get("devices", {}):
        name = config[DOMAIN]["devices"][d].get("name", None)
        if name:
            aliases[name] = d

    hass.data[DOMAIN] = {
        "devices": {},
        "aliases": aliases,
        "adders": [],
        }

    await hass.helpers.discovery.async_load_platform("media_player", DOMAIN, {}, config)

    _LOGGER.error(f"Set up media_player")
    _LOGGER.error(hass.data[DOMAIN]["adders"])

    async_register_command(hass, handle_connect)
    async_register_command(hass, handle_update)
    _LOGGER.error(f"Registered connect ws command")

    return True



@websocket_command({
    vol.Required("type"): "browser_mod/connect",
    vol.Required("deviceID"): str,
})
def handle_connect(hass, connection, msg):
    _LOGGER.error(f"Got connection {msg}")

    devices = hass.data[DOMAIN]["devices"]
    deviceID = msg["deviceID"]
    if deviceID in devices:
        devices[deviceID].connect(connection, msg["id"])
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
        devices[deviceID].update(msg.get("browser", None), msg.get("player", None))
