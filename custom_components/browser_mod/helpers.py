import logging

from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    DOMAIN,
)


_LOGGER = logging.getLogger(__name__)


class BrowserModEntity(CoordinatorEntity):
    def __init__(self, coordinator, deviceID, name):
        super().__init__(coordinator)
        self.deviceID = deviceID
        self._name = name

    @property
    def _data(self):
        return self.coordinator.data or {}

    @property
    def device_info(self):
        return {
            "identifiers": {(DOMAIN, self.deviceID)},
            "name": self.deviceID,
            "manufacturer": "Browser Mod",
        }

    @property
    def extra_state_attributes(self):
        return {
            "type": "browser_mod",
            "deviceID": self.deviceID,
        }

    @property
    def name(self):
        return self._name

    @property
    def has_entity_name(self):
        return True

    @property
    def entity_registry_visible_default(self):
        return False

    @property
    def unique_id(self):
        return f"{self.deviceID}-{self._name.replace(' ','_')}"
