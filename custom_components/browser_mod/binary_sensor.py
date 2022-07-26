from homeassistant.components.binary_sensor import BinarySensorEntity

from .const import DOMAIN, DATA_ADDERS
from .entities import BrowserModEntity


async def async_setup_platform(
    hass, config_entry, async_add_entities, discoveryInfo=None
):
    hass.data[DOMAIN][DATA_ADDERS]["binary_sensor"] = async_add_entities


async def async_setup_entry(hass, config_entry, async_add_entities):
    await async_setup_platform(hass, {}, async_add_entities)


class BrowserBinarySensor(BrowserModEntity, BinarySensorEntity):
    def __init__(self, coordinator, browserID, parameter, name, icon=None):
        BrowserModEntity.__init__(self, coordinator, browserID, name, icon)
        BinarySensorEntity.__init__(self)
        self.parameter = parameter

    @property
    def is_on(self):
        return self._data.get("browser", {}).get(self.parameter, None)


class ActivityBinarySensor(BrowserModEntity, BinarySensorEntity):
    def __init__(self, coordinator, browserID):
        BrowserModEntity.__init__(self, coordinator, browserID, None)
        BinarySensorEntity.__init__(self)

    @property
    def unique_id(self):
        return f"{self.browserID}-activity"

    @property
    def entity_registry_visible_default(self):
        return True

    @property
    def device_class(self):
        return "motion"

    @property
    def is_on(self):
        return self._data.get("activity", False)
