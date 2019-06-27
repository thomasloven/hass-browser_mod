import logging
from homeassistant.components.media_player import (
        SUPPORT_PLAY, SUPPORT_PLAY_MEDIA,
        SUPPORT_PAUSE, SUPPORT_STOP,
        SUPPORT_VOLUME_SET, SUPPORT_VOLUME_MUTE,
        MediaPlayerDevice,
    )
from homeassistant.const import (
        STATE_UNAVAILABLE,
        STATE_PAUSED,
        STATE_PLAYING,
        STATE_IDLE,
        STATE_UNKNOWN,
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

    @property
    def device_state_attributes(self):
        return {
                **self._ws_data.get("browser", {}),
                }

    @property
    def _player_data(self):
        return self._ws_data.get("player", {});

    @property
    def state(self):
        if not self._ws_connection:
            return STATE_UNAVAILABLE
        state = self._player_data.get("state", "unknown")
        return {
                "playing": STATE_PLAYING,
                "paused": STATE_PAUSED,
                "stopped": STATE_IDLE,
                }.get(state, STATE_UNKNOWN)
    @property
    def supported_features(self):
        return (
            SUPPORT_PLAY | SUPPORT_PLAY_MEDIA |
            SUPPORT_PAUSE | SUPPORT_STOP |
            SUPPORT_VOLUME_SET | SUPPORT_VOLUME_MUTE
            )
    @property
    def volume_level(self):
        return self._player_data.get("volume", 0)
    @property
    def is_volume_muted(self):
        return self._player_data.get("muted", False)
    @property
    def media_content_id(self):
        return self._player_data.get("src", "")

    def set_volume_level(self, volume):
        self.ws_send("set_volume", volume_level=volume)
    def mute_volume(self, mute):
        self.ws_send("mute", mute=mute)

    def play_media(self, media_type, media_id, **kwargs):
        self.ws_send("play", media_content_id=media_id)
    def media_play(self):
        self.ws_send("play")
    def media_pause(self):
        self.ws_send("pause")
    def media_stop(self):
        self.ws_send("stop")


