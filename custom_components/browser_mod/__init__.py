import logging

from .store import BrowserModStore
from .mod_view import async_setup_view
from .connection import async_setup_connection
from .const import DOMAIN, DATA_DEVICES, DATA_ADDERS, DATA_STORE

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):

    store = BrowserModStore(hass)
    await store.load()

    hass.data[DOMAIN] = {
        DATA_DEVICES: {},
        DATA_ADDERS: {},
        DATA_STORE: store,
    }

    return True


async def async_setup_entry(hass, config_entry):

    await hass.config_entries.async_forward_entry_setup(config_entry, "sensor")
    await hass.config_entries.async_forward_entry_setup(config_entry, "binary_sensor")
    await hass.config_entries.async_forward_entry_setup(config_entry, "light")
    await hass.config_entries.async_forward_entry_setup(config_entry, "media_player")
    await hass.config_entries.async_forward_entry_setup(config_entry, "camera")

    await async_setup_connection(hass)
    await async_setup_view(hass)

    return True
