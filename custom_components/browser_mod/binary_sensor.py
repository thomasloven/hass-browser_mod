from homeassistant.components.binary_sensor import BinarySensorEntity

from .const import DOMAIN, DATA_ADDERS
from .helpers import BrowserModEntity


async def async_setup_platform(
    hass, config_entry, async_add_entities, discoveryInfo=None
):
    hass.data[DOMAIN][DATA_ADDERS]["binary_sensor"] = async_add_entities


async def async_setup_entry(hass, config_entry, async_add_entities):
    await async_setup_platform(hass, {}, async_add_entities)


class BrowserBinarySensor(BrowserModEntity, BinarySensorEntity):
    def __init__(self, coordinator, browserID, parameter, name):
        super().__init__(coordinator, browserID, name)
        self.parameter = parameter

    @property
    def is_on(self):
        data = self._data
        data = data.get("browser", {})
        data = data.get(self.parameter, None)
        return data
