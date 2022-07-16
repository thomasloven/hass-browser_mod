import logging

from homeassistant.components.websocket_api import event_message
from homeassistant.helpers import device_registry, entity_registry

from .const import DOMAIN, DATA_ADDERS
from .coordinator import Coordinator
from .sensor import BrowserSensor
from .light import BrowserModLight
from .binary_sensor import BrowserBinarySensor
from .media_player import BrowserModPlayer
from .camera import BrowserModCamera

_LOGGER = logging.getLogger(__name__)


class BrowserModDevice:
    """A Browser_mod device."""

    def __init__(self, hass, deviceID):
        """ """
        self.deviceID = deviceID
        self.coordinator = Coordinator(hass, deviceID)
        self.entities = {}
        self.data = {}
        self.settings = {}
        self.connection = None

        self.update_entities(hass)

    def update(self, hass, newData):
        self.data.update(newData)
        self.update_entities(hass)
        self.coordinator.async_set_updated_data(self.data)

    def update_settings(self, hass, settings):
        self.settings = settings
        self.update_entities(hass)

    def update_entities(self, hass):
        """Create all entities associated with the device."""

        coordinator = self.coordinator
        deviceID = self.deviceID

        def _assert_browser_sensor(type, name, *properties):
            if name in self.entities:
                return
            adder = hass.data[DOMAIN][DATA_ADDERS][type]
            cls = {"sensor": BrowserSensor, "binary_sensor": BrowserBinarySensor}[type]
            new = cls(coordinator, deviceID, name, *properties)
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

        if "screen" not in self.entities:
            adder = hass.data[DOMAIN][DATA_ADDERS]["light"]
            new = BrowserModLight(coordinator, deviceID, self)
            adder([new])
            self.entities["screen"] = new

        if "player" not in self.entities:
            adder = hass.data[DOMAIN][DATA_ADDERS]["media_player"]
            new = BrowserModPlayer(coordinator, deviceID, self)
            adder([new])
            self.entities["player"] = new

        if "camera" not in self.entities and self.settings.get("camera"):
            adder = hass.data[DOMAIN][DATA_ADDERS]["camera"]
            new = BrowserModCamera(coordinator, deviceID)
            adder([new])
            self.entities["camera"] = new
        if "camera" in self.entities and not self.settings.get("camera"):
            er = entity_registry.async_get(hass)
            er.async_remove(self.entities["camera"].entity_id)
            del self.entities["camera"]

    def send(self, command, **kwargs):
        """Send a command to this device."""
        if self.connection is None:
            return

        connection, cid = self.connection

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
        """Delete device and associated entities."""
        dr = device_registry.async_get(hass)
        er = entity_registry.async_get(hass)

        for e in self.entities.values():
            er.async_remove(e.entity_id)

        self.entities = {}

        device = dr.async_get_device({(DOMAIN, self.deviceID)})
        dr.async_remove_device(device.id)


def getDevice(hass, deviceID, *, create=True):
    """Get or create device by deviceID."""
    devices = hass.data[DOMAIN]["devices"]
    if deviceID in devices:
        return devices[deviceID]

    if not create:
        return None

    devices[deviceID] = BrowserModDevice(hass, deviceID)
    return devices[deviceID]


def deleteDevice(hass, deviceID):
    devices = hass.data[DOMAIN]["devices"]
    if deviceID in devices:
        devices[deviceID].delete(hass)
        del devices[deviceID]
