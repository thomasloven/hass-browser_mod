import logging

from .mod_view import setup_view
from .connection import setup_connection
from .service import setup_service
from .const import DOMAIN, DATA_DEVICES, DATA_ALIASES, DATA_ADDERS, CONFIG_DEVICES


_LOGGER = logging.getLogger(__name__)

async def async_setup(hass, config):
    _LOGGER.error(f"Setting up browser_mod")

    setup_view(hass)
    _LOGGER.error(f"Registered frontend script")

    aliases = {}
    for d in config[DOMAIN].get(CONFIG_DEVICES, {}):
        name = config[DOMAIN][CONFIG_DEVICES][d].get("name", None)
        if name:
            aliases[name] = d

    hass.data[DOMAIN] = {
        DATA_DEVICES: {},
        DATA_ALIASES: aliases,
        DATA_ADDERS: [],
        }

    await hass.helpers.discovery.async_load_platform("media_player", DOMAIN, {}, config)

    _LOGGER.error(f"Set up media_player")
    _LOGGER.error(hass.data[DOMAIN][DATA_ADDERS])

    setup_connection(hass)

    setup_service(hass)

    return True
