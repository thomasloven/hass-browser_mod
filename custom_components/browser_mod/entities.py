import logging

from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    DOMAIN,
)


_LOGGER = logging.getLogger(__name__)


class BrowserModEntity(CoordinatorEntity):
    def __init__(self, coordinator, browserID, name, icon=None):
        super().__init__(coordinator)
        self.browserID = browserID
        self._name = name
        self._icon = icon

    @property
    def _data(self):
        return self.coordinator.data or {}

    @property
    def device_info(self):
        config_url = {}
        if ip := self._data.get("browser", {}).get("ip_address"):
            config_url = {"configuration_url": f"http://{ip}:2323"}
        return {
            "identifiers": {(DOMAIN, self.browserID)},
            "name": self.browserID,
            "manufacturer": "Browser Mod",
            **config_url,
        }

    @property
    def extra_state_attributes(self):
        return {
            "type": "browser_mod",
            "browserID": self.browserID,
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
        return f"{self.browserID}-{self._name.replace(' ','_')}"

    @property
    def icon(self):
        return self._icon
