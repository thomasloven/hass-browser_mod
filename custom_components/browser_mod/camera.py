import base64

from homeassistant.components.camera import Camera

from .entities import BrowserModEntity
from .const import DOMAIN, DATA_ADDERS

import logging

LOGGER = logging.Logger(__name__)


async def async_setup_platform(
    hass, config_entry, async_add_entities, discoveryInfo=None
):
    hass.data[DOMAIN][DATA_ADDERS]["camera"] = async_add_entities


async def async_setup_entry(hass, config_entry, async_add_entities):
    await async_setup_platform(hass, {}, async_add_entities)


class BrowserModCamera(BrowserModEntity, Camera):
    def __init__(self, coordinator, browserID):
        BrowserModEntity.__init__(self, coordinator, browserID, None)
        Camera.__init__(self)

    @property
    def unique_id(self):
        return f"{self.browserID}-camera"

    @property
    def entity_registry_visible_default(self):
        return True

    def camera_image(self, width=None, height=None):
        if "camera" not in self._data:
            return None
        return base64.b64decode(self._data["camera"].split(",")[-1])
