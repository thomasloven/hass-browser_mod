import logging
import homeassistant.helpers.config_validation as cv
from homeassistant.const import Platform

from .store import BrowserModStore
from .mod_view import async_setup_view
from .connection import async_setup_connection
from .const import DOMAIN, DATA_BROWSERS, DATA_ADDERS, DATA_STORE
from .service import async_setup_services
from .helpers import get_version

_LOGGER = logging.getLogger(__name__)


CONFIG_SCHEMA = cv.empty_config_schema(DOMAIN)

PLATFORMS = [
    Platform.SENSOR,
    Platform.BINARY_SENSOR,
    Platform.LIGHT,
    Platform.MEDIA_PLAYER,
    Platform.CAMERA
]

async def async_setup(hass, config):

    store = BrowserModStore(hass)
    await store.load()

    version = await hass.async_add_executor_job(get_version, hass)
    await store.set_version(version)

    hass.data[DOMAIN] = {
        DATA_BROWSERS: {},
        DATA_ADDERS: {},
        DATA_STORE: store,
    }

    return True


async def async_setup_entry(hass, config_entry):

    await hass.config_entries.async_forward_entry_setups(config_entry, PLATFORMS)

    await async_setup_connection(hass)
    await async_setup_view(hass)
    await async_setup_services(hass)

    return True
