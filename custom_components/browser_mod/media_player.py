import logging
from homeassistant.components.media_player import MediaPlayerDevice

from homeassistant.components.websocket_api import event_message

from . import DOMAIN

_LOGGER = logging.getLogger(__name__)

async def async_setup_platform(hass, config, async_add_devices, discovery_info=None):
    def adder(hass, deviceID, connection, cid):
        player = BrowserModPlayer(hass, deviceID)
        if connection:
            player.ws_connect(connection, cid)
        async_add_devices([player])
        return player
    hass.data[DOMAIN]["adders"].append(adder)

    for k,v in hass.data[DOMAIN]["aliases"].items():
        devices = hass.data[DOMAIN]["devices"]
        devices[v] = BrowserModPlayer(hass, v, k)
        async_add_devices([devices[v]])

class BrowserModPlayer(MediaPlayerDevice):

    def __init__(self, hass, deviceID, alias=None):
        self.hass = hass
        self.deviceID = deviceID
        self.alias = alias
        self.player_state = {}
        self.browser_state = {}
        _LOGGER.error(f"Create player {deviceID}({alias})")

    @property
    def name(self):
        return self.alias or self.deviceID.replace('-','_')

    @property
    def device_state_attributes(self):
        return {
                "player": self.player_state,
                "browser": self.browser_state,
                }

    def ws_connect(self, connection, cid):
        self.cid = cid
        self.connection = connection
        _LOGGER.error(f"Connecting player {self.entity_id}")
        connection.send_message(event_message(cid, {"command": "update"}))
        pass

    def ws_update(self, browser, player):
        self.browser_state = browser
        self.player_state = player
        pass
