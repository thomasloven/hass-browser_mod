import logging
from homeassistant.components import media_source
from homeassistant.components.media_player import (
    SUPPORT_PLAY,
    SUPPORT_PLAY_MEDIA,
    SUPPORT_PAUSE,
    SUPPORT_STOP,
    SUPPORT_VOLUME_SET,
    SUPPORT_VOLUME_MUTE,
    MediaPlayerEntity,
)
from homeassistant.components.media_player.browse_media import (
    async_process_play_media_url,
)
from homeassistant.components.media_player.const import (
    MEDIA_TYPE_MUSIC,
    MEDIA_TYPE_URL,
    SUPPORT_BROWSE_MEDIA,
)
from homeassistant.const import (
    STATE_UNAVAILABLE,
    STATE_PAUSED,
    STATE_PLAYING,
    STATE_IDLE,
    STATE_UNKNOWN,
)

from .helpers import BrowserModEntity2
from .const import DOMAIN, DATA_ADDERS


async def async_setup_platform(hass, config_entry, async_add_entities, discoveryInfo = None):
    hass.data[DOMAIN][DATA_ADDERS]["media_player"] = async_add_entities

async def async_setup_entry(hass, config_entry, async_add_entities):
    await async_setup_platform(hass, {}, async_add_entities)


class BrowserModPlayer(BrowserModEntity2, MediaPlayerEntity):

    def __init__(self, coordinator, deviceID, device):
        super().__init__(coordinator, deviceID, None)
        self.device = device

    @property
    def unique_id(self):
        return f"{self.deviceID}-player"

    @property
    def state(self):
        state = self._data.get("player", {}).get("state")
        return {
            "playing": STATE_PLAYING,
            "paused": STATE_PAUSED,
            "stopped": STATE_IDLE,
            "unavailable": STATE_UNAVAILABLE,
        }.get(state, STATE_UNKNOWN)

    @property
    def supported_features(self):
        return (
            SUPPORT_PLAY
            | SUPPORT_PLAY_MEDIA
            | SUPPORT_PAUSE
            | SUPPORT_STOP
            | SUPPORT_VOLUME_SET
            | SUPPORT_VOLUME_MUTE
            | SUPPORT_BROWSE_MEDIA
        )

    @property
    def volume_level(self):
        return self._data.get("player", {}).get("volume", 0)

    @property
    def is_volume_muted(self):
        return self._data.get("player", {}).get("muted", False)


    def set_volume_level(self, volume):
        self.device.send("player-set-volume", volume_level=volume)

    def mute_volume(self, mute):
        self.device.send("player-mute", mute=mute)

    async def async_play_media(self, media_type, media_id, **kwargs):
        if media_source.is_media_source_id(media_id):
            media_type = MEDIA_TYPE_URL
            play_item = await media_source.async_resolve_media(self.hass, media_id, self.entity_id)
            media_id = play_item.url
        if media_type in (MEDIA_TYPE_URL, MEDIA_TYPE_MUSIC):
            media_id = async_process_play_media_url(self.hass, media_id)
        self.device.send("player-play", media_content_id=media_id)

    async def async_browse_media(self, media_content_type=None, media_content_id=None):
        """Implement the websocket media browsing helper."""
        return await media_source.async_browse_media(
            self.hass,
            media_content_id,
            content_filter=lambda item: item.media_content_type.startswith("audio/"),
        )

    def media_play(self):
        self.device.send("player-play")

    def media_pause(self):
        self.device.send("player-pause")

    def media_stop(self):
        self.device.send("player-stop")
