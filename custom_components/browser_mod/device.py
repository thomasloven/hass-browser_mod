import logging

from homeassistant.components.websocket_api import event_message
from homeassistant.helpers import device_registry, entity_registry

from .const import DOMAIN, DATA_ADDERS
from .coordinator import Coordinator
from .sensor import BrowserSensor
from .light import BrowserModLight
from .binary_sensor import BrowserBinarySensor
from .media_player import BrowserModPlayer

_LOGGER = logging.getLogger(__name__)

BROWSER_SENSORS = {
    "battery_level", ()
}



class BrowserModDevice:
    """ A Browser_mod device. """

    def __init__(self, hass, deviceID):
        """ """
        self.deviceID = deviceID
        self.coordinator = Coordinator(hass, deviceID)
        self.entities = []
        self.data = {}
        self.setup_sensors(hass)
        self.connection = None

    def setup_sensors(self, hass):
        """ Create all entities associated with the device. """

        coordinator = self.coordinator
        deviceID = self.deviceID

        sensors = [
            ("battery_level", "Browser battery", "%", "battery"),
            ("path", "Browser path"),
            ("userAgent", "Browser userAgent"),
            ("visibility", "Browser visibility"),
            ("currentUser", "Browser user"),
            ("height", "Browser height", "px"),
            ("width", "Browser width", "px"),
        ]
        adder = hass.data[DOMAIN][DATA_ADDERS]["sensor"]
        new = [BrowserSensor(coordinator, deviceID, *s) for s in sensors]
        adder(new)
        self.entities += new

        binary_sensors = [
            ("charging", "Browser charging"),
            ("darkMode", "Browser dark mode"),
            ("fullyKiosk", "Browser FullyKiosk"),
        ]
        adder = hass.data[DOMAIN][DATA_ADDERS]["binary_sensor"]
        new = [BrowserBinarySensor(coordinator, deviceID, *s) for s in binary_sensors]
        adder(new)
        self.entities += new

        adder = hass.data[DOMAIN][DATA_ADDERS]["light"]
        new = [BrowserModLight(coordinator, deviceID, self)]
        adder(new)
        self.entities += new

        adder = hass.data[DOMAIN][DATA_ADDERS]["media_player"]
        new = [BrowserModPlayer(coordinator, deviceID, self)]
        adder(new)
        self.entities += new

    def send(self, command, **kwargs):
        """ Send a command to this device. """
        if self.connection is None: return

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
        """ Delete device and associated entities. """
        dr = device_registry.async_get(hass)
        er = entity_registry.async_get(hass)

        for e in self.entities:
            er.async_remove(e.entity_id)

        device = dr.async_get_device({(DOMAIN, self.deviceID)})
        dr.async_remove_device(device.id)


def getDevice(hass, deviceID):
    """ Get or create device by deviceID. """
    devices = hass.data[DOMAIN]["devices"]
    if deviceID in devices:
        return devices[deviceID]

    devices[deviceID] = BrowserModDevice(hass, deviceID)
    return devices[deviceID]