import logging
import voluptuous as vol

from homeassistant.components.websocket_api import websocket_command, result_message, event_message, async_register_command
from homeassistant.helpers.entity import Entity, async_generate_entity_id

from .const import DOMAIN, DATA_DEVICES, DATA_ADDERS, WS_CONNECT, WS_UPDATE

_LOGGER = logging.getLogger(__name__)


def setup_connection(hass):
    async_register_command(hass, handle_connect)
    async_register_command(hass, handle_update)


@websocket_command({
    vol.Required("type"): WS_CONNECT,
    vol.Required("deviceID"): str,
})
def handle_connect(hass, connection, msg):

    devices = hass.data[DOMAIN][DATA_DEVICES]
    deviceID = msg["deviceID"]
    if deviceID in devices:
        devices[deviceID].ws_connect(connection, msg["id"])
    else:
        adder = hass.data[DOMAIN][DATA_ADDERS][0]
        devices[deviceID] = adder(hass, deviceID, connection, msg["id"])
    connection.send_message(result_message(msg["id"]))


@websocket_command({
    vol.Required("type"): WS_UPDATE,
    vol.Required("deviceID"): str,
    vol.Optional("data"): dict,
})
def handle_update(hass, connection, msg):
    devices = hass.data[DOMAIN][DATA_DEVICES]
    deviceID = msg["deviceID"]
    if deviceID in devices:
        devices[deviceID].ws_update(msg.get("data", None))


class BrowserModEntity(Entity):
    def __init__(self, hass, deviceID, alias=None):
        self._deviceID = deviceID
        self._alias = alias
        self._ws_data = {}
        self._ws_connection = None
        self.entity_id = async_generate_entity_id("media_player.{}", alias or deviceID, hass=hass)

    def ws_send(self, command, **kwargs):
        if self._ws_connection:
            self._ws_connection.send_message(event_message(self._ws_cid, {
                "command": command,
                **kwargs,
                }))

    def ws_connect(self, connection, cid):
        self._ws_cid = cid
        self._ws_connection = connection
        self.ws_send("update", entity_id=self.entity_id)
        connection.subscriptions[cid] = self.ws_disconnect
        if self.hass:
            self.schedule_update_ha_state()

    def ws_disconnect(self):
        self._ws_cid = None
        self._ws_connection = None
        if self.hass:
            self.schedule_update_ha_state()

    def ws_update(self, data):
        self._ws_data = data
        if self.hass:
            self.schedule_update_ha_state()

    @property
    def device_id(self):
        return self._deviceID
