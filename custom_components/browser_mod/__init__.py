import logging
import homeassistant.helpers.config_validation as cv
from homeassistant.const import Platform

from .store import BrowserModStore
from .mod_view import async_setup_view, async_unload_view
from .connection import async_setup_connection
from .const import DOMAIN, DATA_BROWSERS, DATA_ADDERS, DATA_STORE
from .frontend_patch import async_restore_frontend_patches, async_setup_frontend_patches
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
    await store.cleanup_session_map(hass)

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
    await async_setup_frontend_patches(hass)

    return True


async def async_unload_entry(hass, config_entry):

    unload_ok = await hass.config_entries.async_unload_platforms(config_entry, PLATFORMS)
    await async_unload_view(hass)
    await async_restore_frontend_patches(hass)

    return unload_ok
