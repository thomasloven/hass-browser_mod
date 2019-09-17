import logging
import voluptuous as vol

from homeassistant.components.websocket_api import websocket_command, result_message, event_message, async_register_command
from homeassistant.helpers.entity import Entity, async_generate_entity_id

from .const import DOMAIN,  WS_CONNECT, WS_UPDATE
from .helpers import get_devices, create_entity

_LOGGER = logging.getLogger(__name__)

async def setup_connection(hass, config):
    _LOGGER.error("--------------------")
    _LOGGER.error("Setting up BM connection")

    @websocket_command({
        vol.Required("type"): WS_CONNECT,
        vol.Required("deviceID"): str,
    })
    def handle_connect(hass, connection, msg):
        _LOGGER.error("--------------------")
        _LOGGER.error("CONNECTING BM")
        deviceID = msg["deviceID"]

        device = get_devices(hass).get(deviceID, BrowserModConnection(hass, deviceID))
        device.connect(connection, msg["id"])
        get_devices(hass)[deviceID] = device

        _LOGGER.error("DONE")
        connection.send_message(result_message(msg["id"]))

    @websocket_command({
        vol.Required("type"): WS_UPDATE,
        vol.Required("deviceID"): str,
        vol.Optional("data"): dict,
    })
    def handle_update( hass, connection, msg):
        _LOGGER.error("--------------------")
        _LOGGER.error("UPDATING BM")
        _LOGGER.error(msg)
        devices = get_devices(hass)
        deviceID = msg["deviceID"]
        if deviceID in devices:
            devices[deviceID].update(msg.get("data", None))

    async_register_command(hass, handle_connect)
    async_register_command(hass, handle_update)


class BrowserModConnection:
    def __init__(self, hass, deviceID):
        self.hass = hass
        self.deviceID = deviceID
        self.connection = []

        self.media_player = None
        self.screen = None
        self.sensor = None

    def connect(self, connection, cid):
        self.connection.append((connection, cid))
        _LOGGER.error("********************")
        _LOGGER.error("Connected %s", self.deviceID)
        self.send("update")

        def disconnect():
            self.connection.remove((connection, cid))

        connection.subscriptions[cid] = disconnect

    def send(self, command, **kwargs):
        if self.connection:
            connection, cid = self.connection[-1]
            connection.send_message(event_message(cid, {
                "command": command,
                **kwargs,
                }))

    def update(self, data):
        _LOGGER.error("********************")
        _LOGGER.error("Got update %s for %s", data, self.deviceID)
        if data.get('player'):
            self.media_player = self.media_player or create_entity(
                    self.hass,
                    'media_player',
                    self.deviceID,
                    self)
            self.media_player.data = data.get('player')
        if data.get('browser'):
            self.sensor = self.sensor or create_entity(
                    self.hass,
                    'sensor',
                    self.deviceID,
                    self)
            self.sensor.data = data.get('browser')
        if data.get('screen'):
            self.screen = self.screen or create_entity(
                    self.hass,
                    'light',
                    self.deviceID,
                    self)
            self.screen.data = data.get('screen')

