import logging

from .mod_view import setup_view

REQUIREMENTS = ["aiofiles"]

FRONTEND_SCRIPT_URL '/browser_mod.js'

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass, config):
    _LOGGER.error(f"Setting up browser_mod")

    setup_view(hass, FRONTEND_SCRIPT_URL)
    _LOGGER.error(f"Registered frontend script")


    return True
