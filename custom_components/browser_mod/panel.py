from homeassistant.components.sensor import SensorEntity
from homeassistant.helpers.entity import EntityCategory

from .const import DOMAIN, DATA_ADDERS
from .entities import BrowserModEntity


async def async_setup_platform(
    hass, config_entry, async_add_entities, discoveryInfo=None
):
    hass.data[DOMAIN][DATA_ADDERS]["sensor"] = async_add_entities


async def async_setup_entry(hass, config_entry, async_add_entities):
    await async_setup_platform(hass, {}, async_add_entities)


class PanelSensor(BrowserModEntity, SensorEntity):
    def __init__(
        self,
        coordinator,
        browserID,
        name,
        unit_of_measurement=None,
        device_class=None,
        icon=None,
    ):
        BrowserModEntity.__init__(self, coordinator, browserID, name, icon)
        SensorEntity.__init__(self)
        self._device_class = device_class
        self._unit_of_measurement = unit_of_measurement

    @property
    def native_value(self):
        val = self._data.get("panel", {}).get("title", None)
        if len(str(val)) > 255:
            val = str(val)[:250] + "..."
        return val

    @property
    def device_class(self):
        return self._device_class

    @property
    def native_unit_of_measurement(self):
        return self._unit_of_measurement

    @property
    def entity_category(self):
        return EntityCategory.DIAGNOSTIC

    @property
    def extra_state_attributes(self):
        retval = super().extra_state_attributes

        retval.update(self._data.get("panel", {}).get("attributes", {}))

        return retval
