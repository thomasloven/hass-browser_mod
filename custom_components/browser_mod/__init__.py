import logging

from .store import BrowserModStore
from .mod_view import async_setup_view
from .connection import async_setup_connection
from .const import DOMAIN, DATA_BROWSERS, DATA_ADDERS, DATA_STORE
from .service import async_setup_services

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):

    store = BrowserModStore(hass)
    await store.load()

    hass.data[DOMAIN] = {
        DATA_BROWSERS: {},
        DATA_ADDERS: {},
        DATA_STORE: store,
    }

    return True


async def async_setup_entry(hass, config_entry):

    for domain in ["sensor", "binary_sensor", "light", "media_player", "camera"]:
        hass.async_create_task(
            hass.config_entries.async_forward_entry_setup(config_entry, domain)
        )

    await async_setup_connection(hass)
    await async_setup_view(hass)
    await async_setup_services(hass)

    return True
