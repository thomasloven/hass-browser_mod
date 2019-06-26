import logging
from homeassistant.components.media_player import MediaPlayerDevice

from homeassistant.components.websocket_api import event_message

from . import DOMAIN

_LOGGER = logging.getLogger(__name__)

async def async_setup_platform(hass, config, async_add_devices, discovery_info=None):
    def adder(hass, deviceID, connection, cid):
        player = BrowserModPlayer(hass, deviceID)
        if connection:
            player.connect(connection, cid)
        _LOGGER.error(player)
        return player
    hass.data[DOMAIN]["adders"].append(adder)

class BrowserModPlayer(MediaPlayerDevice):

    def __init__(self, hass, deviceID, alias=None):
        self.hass = hass
        self.deviceID = deviceID
        self.alias = alias
        _LOGGER.error(f"Create player {deviceID}")

    def connect(self, connection, cid):
        self.cid = cid
        self.connection = connection
        _LOGGER.error(f"Connecting player {cid}")
        connection.send_message(event_message(cid, {"command": "update"}))
        pass

    def update(self, browser, player):
        _LOGGER.error(f"{self.deviceID}: {browser} {player}")
        pass
