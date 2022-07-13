from homeassistant.components.light import LightEntity, ColorMode

from .helpers import setup_platform, BrowserModEntity
from .const import DOMAIN, DATA_ADDERS


async def async_setup_platform(
    hass, config_entry, async_add_entities, discoveryInfo=None
):
    hass.data[DOMAIN][DATA_ADDERS]["light"] = async_add_entities


async def async_setup_entry(hass, config_entry, async_add_entities):
    await async_setup_platform(hass, {}, async_add_entities)


class BrowserModLight(BrowserModEntity, LightEntity):
    def __init__(self, coordinator, deviceID, device):
        BrowserModEntity.__init__(self, coordinator, deviceID, "Screen")
        LightEntity.__init__(self)
        self.device = device

    @property
    def entity_registry_visible_default(self):
        return True

    @property
    def is_on(self):
        return self._data.get("screen_on", None)

    @property
    def supported_color_modes(self):
        return {ColorMode.BRIGHTNESS}

    @property
    def color_mode(self):
        return ColorMode.BRIGHTNESS

    @property
    def brightness(self):
        return self._data.get("screen_brightness", 1)

    def turn_on(self, **kwargs):
        self.device.send("screen_on", **kwargs)

    def turn_off(self, **kwargs):
        self.device.send("screen_off")
