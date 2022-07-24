import logging

from homeassistant.components.websocket_api import event_message
from homeassistant.helpers import device_registry, entity_registry

from .const import DATA_BROWSERS, DOMAIN, DATA_ADDERS
from .coordinator import Coordinator
from .sensor import BrowserSensor
from .light import BrowserModLight
from .binary_sensor import BrowserBinarySensor, ActivityBinarySensor
from .media_player import BrowserModPlayer
from .camera import BrowserModCamera

_LOGGER = logging.getLogger(__name__)


class BrowserModBrowser:
    """A Browser_mod browser."""

    def __init__(self, hass, browserID):
        """ """
        self.browserID = browserID
        self.coordinator = Coordinator(hass, browserID)
        self.entities = {}
        self.data = {}
        self.settings = {}
        self._connections = []

        self.update_entities(hass)

    def update(self, hass, newData):
        self.data.update(newData)
        self.update_entities(hass)
        self.coordinator.async_set_updated_data(self.data)

    def update_settings(self, hass, settings):
        self.settings = settings
        self.update_entities(hass)

    def update_entities(self, hass):
        """Create all entities associated with the browser."""

        coordinator = self.coordinator
        browserID = self.browserID

        def _assert_browser_sensor(type, name, *properties):
            if name in self.entities:
                return
            adder = hass.data[DOMAIN][DATA_ADDERS][type]
            cls = {"sensor": BrowserSensor, "binary_sensor": BrowserBinarySensor}[type]
            new = cls(coordinator, browserID, name, *properties)
            adder([new])
            self.entities[name] = new

        _assert_browser_sensor("sensor", "path", "Browser path")
        _assert_browser_sensor("sensor", "visibility", "Browser visibility")
        _assert_browser_sensor("sensor", "userAgent", "Browser userAgent")
        _assert_browser_sensor("sensor", "currentUser", "Browser user")
        _assert_browser_sensor("sensor", "width", "Browser width", "px")
        _assert_browser_sensor("sensor", "height", "Browser height", "px")
        if self.data.get("browser", {}).get("battery_level", None) is not None:
            _assert_browser_sensor(
                "sensor", "battery_level", "Browser battery", "%", "battery"
            )

        _assert_browser_sensor("binary_sensor", "darkMode", "Browser dark mode")
        _assert_browser_sensor("binary_sensor", "fullyKiosk", "Browser FullyKiosk")
        if self.data.get("browser", {}).get("charging", None) is not None:
            _assert_browser_sensor("binary_sensor", "charging", "Browser charging")

        if "activity" not in self.entities:
            adder = hass.data[DOMAIN][DATA_ADDERS]["binary_sensor"]
            new = ActivityBinarySensor(coordinator, browserID)
            adder([new])
            self.entities["activity"] = new

        if "screen" not in self.entities:
            adder = hass.data[DOMAIN][DATA_ADDERS]["light"]
            new = BrowserModLight(coordinator, browserID, self)
            adder([new])
            self.entities["screen"] = new

        if "player" not in self.entities:
            adder = hass.data[DOMAIN][DATA_ADDERS]["media_player"]
            new = BrowserModPlayer(coordinator, browserID, self)
            adder([new])
            self.entities["player"] = new

        if "camera" not in self.entities and self.settings.get("camera"):
            adder = hass.data[DOMAIN][DATA_ADDERS]["camera"]
            new = BrowserModCamera(coordinator, browserID)
            adder([new])
            self.entities["camera"] = new
        if "camera" in self.entities and not self.settings.get("camera"):
            er = entity_registry.async_get(hass)
            er.async_remove(self.entities["camera"].entity_id)
            del self.entities["camera"]

        self.send(
            None, deviceEntities={k: v.entity_id for k, v in self.entities.items()}
        )

    def send(self, command, **kwargs):
        """Send a command to this browser."""
        if self.connection is None:
            return

        for (connection, cid) in self.connection:
            connection.send_message(
                event_message(
                    cid,
                    {
                        "command": command,
                        **kwargs,
                    },
                )
            )

    def delete(self, hass):
        """Delete browser and associated entities."""
        dr = device_registry.async_get(hass)
        er = entity_registry.async_get(hass)

        for e in self.entities.values():
            er.async_remove(e.entity_id)

        self.entities = {}

        device = dr.async_get_device({(DOMAIN, self.browserID)})
        dr.async_remove_device(device.id)

    @property
    def connection(self):
        return self._connections

    @connection.setter
    def connection(self, con):
        self._connections.append(con)


def getBrowser(hass, browserID, *, create=True):
    """Get or create browser by browserID."""
    browsers = hass.data[DOMAIN][DATA_BROWSERS]
    if browserID in browsers:
        return browsers[browserID]

    if not create:
        return None

    browsers[browserID] = BrowserModBrowser(hass, browserID)
    return browsers[browserID]


def deleteBrowser(hass, browserID):
    browsers = hass.data[DOMAIN][DATA_BROWSERS]
    if browserID in browsers:
        browsers[browserID].delete(hass)
        del browsers[browserID]
