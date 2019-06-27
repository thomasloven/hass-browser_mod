import logging
from homeassistant.components.media_player import (
        SUPPORT_PLAY, SUPPORT_PLAY_MEDIA, SUPPORT_PAUSE, SUPPORT_STOP,
        SUPPORT_VOLUME_SET, SUPPORT_VOLUME_MUTE,
        MediaPlayerDevice,
    )
from homeassistant.const import (
        STATE_UNAVAILABLE,
        STATE_PAUSED,
        STATE_PLAYING,
        STATE_IDLE,
    )

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
                "player": self._ws_data.get("player"),
                "browser": self._ws_data.get("browser"),
                }

    @property
    def state(self):
        if not self._ws_connection:
            return STATE_UNAVAILABLE
        return STATE_IDLE
        return None
    @property
    def supported_features(self):
        return 0
    @property
    def volume_level(self):
        return 0
    @property
    def is_volume_mutes(self):
        return False
    @property
    def media_content_id(self):
        return ""

    def set_volume_level(self, volume):
        pass
    def mute_volume(self, mute):
        pass

    def play_media(self, media_type, media_id, **kwargs):
        pass
    def media_play(self):
        pass
    def media_pause(self):
        pass
    def media_stop(self):
        pass


