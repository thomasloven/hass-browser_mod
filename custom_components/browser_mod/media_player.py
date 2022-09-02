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
    SUPPORT_SEEK,
    SUPPORT_TURN_OFF,
    SUPPORT_TURN_ON,
)
from homeassistant.const import (
    STATE_UNAVAILABLE,
    STATE_PAUSED,
    STATE_PLAYING,
    STATE_IDLE,
    STATE_UNKNOWN,
    STATE_ON,
    STATE_OFF,
)

from homeassistant.util import dt

from .entities import BrowserModEntity
from .const import DOMAIN, DATA_ADDERS


async def async_setup_platform(
    hass, config_entry, async_add_entities, discoveryInfo=None
):
    hass.data[DOMAIN][DATA_ADDERS]["media_player"] = async_add_entities


async def async_setup_entry(hass, config_entry, async_add_entities):
    await async_setup_platform(hass, {}, async_add_entities)


class BrowserModPlayer(BrowserModEntity, MediaPlayerEntity):
    def __init__(self, coordinator, browserID, browser):
        BrowserModEntity.__init__(self, coordinator, browserID, None)
        MediaPlayerEntity.__init__(self)
        self.browser = browser

    @property
    def unique_id(self):
        return f"{self.browserID}-player"

    @property
    def entity_registry_visible_default(self):
        return True

    @property
    def state(self):
        state = self._data.get("player", {}).get("state")
        return {
            "playing": STATE_PLAYING,
            "paused": STATE_PAUSED,
            "stopped": STATE_IDLE,
            "unavailable": STATE_UNAVAILABLE,
            "on": STATE_ON,
            "off": STATE_OFF,
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
            | SUPPORT_SEEK
            | SUPPORT_TURN_OFF
            | SUPPORT_TURN_ON
        )

    @property
    def volume_level(self):
        return self._data.get("player", {}).get("volume", 0)

    @property
    def is_volume_muted(self):
        return self._data.get("player", {}).get("muted", False)

    @property
    def media_duration(self):
        duration = self._data.get("player", {}).get("media_duration", None)
        return float(duration) if duration is not None else None

    @property
    def media_position(self):
        position = self._data.get("player", {}).get("media_position", None)
        return float(position) if position is not None else None

    @property
    def media_position_updated_at(self):
        return dt.utcnow()

    async def async_set_volume_level(self, volume):
        await self.browser.send("player-set-volume", volume_level=volume)

    async def async_mute_volume(self, mute):
        await self.browser.send("player-mute", mute=mute)

    async def async_play_media(self, media_type, media_id, **kwargs):
        if media_source.is_media_source_id(media_id):
            play_item = await media_source.async_resolve_media(
                self.hass, media_id, self.entity_id
            )
            media_type = play_item.mime_type
            media_id = play_item.url
            media_id = async_process_play_media_url(self.hass, media_id)
        if media_type in (MEDIA_TYPE_URL, MEDIA_TYPE_MUSIC):
            media_id = async_process_play_media_url(self.hass, media_id)
        await self.browser.send(
            "player-play", media_content_id=media_id, media_type=media_type, **kwargs
        )

    async def async_browse_media(self, media_content_type=None, media_content_id=None):
        """Implement the websocket media browsing helper."""
        return await media_source.async_browse_media(
            self.hass,
            media_content_id,
            # content_filter=lambda item: item.media_content_type.startswith("audio/"),
        )

    async def async_media_play(self):
        await self.browser.send("player-play")

    async def async_media_pause(self):
        await self.browser.send("player-pause")

    async def async_media_stop(self):
        await self.browser.send("player-stop")

    async def async_media_seek(self, position):
        await self.browser.send("player-seek", position=position)

    async def async_turn_off(self):
        await self.browser.send("player-turn-off")

    async def async_turn_on(self, **kwargs):
        await self.browser.send("player-turn-on", **kwargs)
