import logging
from homeassistant.components.media_player import MediaPlayerDevice

from .const import DOMAIN, DATA_DEVICES, DATA_ADDERS, DATA_ALIASES
from .connection import BrowserModEntity

_LOGGER = logging.getLogger(__name__)


async def async_setup_platform(hass, config, async_add_devices, discovery_info=None):
    def adder(hass, deviceID, connection, cid):
        player = BrowserModPlayer(hass, deviceID)
        if connection:
            player.ws_connect(connection, cid)
        async_add_devices([player])
        return player
    hass.data[DOMAIN][DATA_ADDERS].append(adder)

    for k,v in hass.data[DOMAIN][DATA_ALIASES].items():
        devices = hass.data[DOMAIN][DATA_DEVICES]
        devices[v] = BrowserModPlayer(hass, v, k)
        async_add_devices([devices[v]])


class BrowserModPlayer(MediaPlayerDevice, BrowserModEntity):

    def __init__(self, hass, deviceID, alias=None):
        super().__init__(hass, deviceID, alias)
        _LOGGER.error(f"Create player {deviceID}({alias})")

    @property
    def device_state_attributes(self):
        return {
                "player": self.ws_data.get("player"),
                "browser": self.ws_data.get("browser"),
                }

