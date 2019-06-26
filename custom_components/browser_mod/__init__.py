import logging

from .mod_view import setup_view
from .connection import setup_connection
from .const import DOMAIN

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

    setup_connection(hass)

    return True
