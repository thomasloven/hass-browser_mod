import logging
import voluptuous as vol

from homeassistant.components.websocket_api import websocket_command, result_message, async_register_command

from .mod_view import setup_view

REQUIREMENTS = ["aiofiles"]

FRONTEND_SCRIPT_URL = '/browser_mod.js'

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass, config):
    _LOGGER.error(f"Setting up browser_mod")

    setup_view(hass, FRONTEND_SCRIPT_URL)
    _LOGGER.error(f"Registered frontend script")

    async_register_command(hass, handle_connect)

    return True



@websocket_command({
    vol.Required('type'): 'browser_mod/connect',
    vol.Required('deviceID'): str,
})
def handle_connect(hass, connection, msg):
    _LOGGER.error(f"Got connection {msg}")

    connection.send_message(result_message(msg['id']))
