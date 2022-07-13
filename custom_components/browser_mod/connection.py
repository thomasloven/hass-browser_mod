import logging
import voluptuous as vol
from datetime import datetime, timezone

from homeassistant.components.websocket_api import (
    websocket_command,
    result_message,
    event_message,
    async_register_command,
)

from homeassistant.components import websocket_api

from .const import WS_CONNECT, WS_REGISTER, WS_UNREGISTER, WS_REREGISTER, WS_UPDATE, DOMAIN
from .helpers import get_devices, create_entity, get_config, is_setup_complete

from .coordinator import Coordinator
from .device import getDevice

_LOGGER = logging.getLogger(__name__)


async def async_setup_connection(hass):
    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_CONNECT,
            vol.Required("deviceID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_connect(hass, connection, msg):
        deviceID = msg["deviceID"]
        store = hass.data[DOMAIN]["store"]

        def listener(data):
            connection.send_message(event_message(msg["id"], {"result": data}))

        connection.subscriptions[msg["id"]] = store.add_listener(listener)
        connection.send_result(msg["id"])

        if store.get_device(deviceID).enabled:
            dev = getDevice(hass, deviceID)
            dev.connection = (connection, msg["id"])
            await store.set_device(deviceID,
                    last_seen=datetime.now(
                        tz=timezone.utc
                    ).isoformat()
                )
        listener(store.asdict())


    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_REGISTER,
            vol.Required("deviceID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_register(hass, connection, msg):
        deviceID = msg["deviceID"]
        store = hass.data[DOMAIN]["store"]
        await store.set_device(deviceID,
                enabled=True
            )
        connection.send_result(msg["id"])


    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_UNREGISTER,
            vol.Required("deviceID"): str,
        }
    )
    @websocket_api.async_response
    async def handle_unregister(hass, connection, msg):
        deviceID = msg["deviceID"]
        store = hass.data[DOMAIN]["store"]
        devices = hass.data[DOMAIN]["devices"]

        if deviceID in devices:
            devices[deviceID].delete(hass)
            del devices[deviceID]

        await store.delete_device(deviceID)

        connection.send_result(msg["id"])

    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_REREGISTER,
            vol.Required("deviceID"): str,
            vol.Required("data"): dict,
        }
    )
    @websocket_api.async_response
    async def handle_reregister(hass, connection, msg):
        deviceID = msg["deviceID"]
        store = hass.data[DOMAIN]["store"]
        devices = hass.data[DOMAIN]["devices"]

        data = msg["data"]
        del data["last_seen"]
        device = {}
        if "deviceID" in data:
            newDeviceID = data["deviceID"]
            del data["deviceID"]

            oldDevice = store.get_device(deviceID)
            if oldDevice:
                device = oldDevice.asdict()
            await store.delete_device(deviceID)

            if deviceID in devices:
                devices[deviceID].delete(hass)
                del devices[deviceID]

            deviceID = newDeviceID

        device.update(data)
        await store.set_device(deviceID, **device)


    @websocket_api.websocket_command(
        {
            vol.Required("type"): WS_UPDATE,
            vol.Required("deviceID"): str,
            vol.Optional("data"): dict,
        }
    )
    @websocket_api.async_response
    async def handle_update(hass, connection, msg):
        deviceID = msg["deviceID"]
        store = hass.data[DOMAIN]["store"]
        devices = hass.data[DOMAIN]["devices"]

        if store.get_device(deviceID).enabled:
            dev = getDevice(hass, deviceID)
            dev.data.update(msg.get("data", {}))
            dev.coordinator.async_set_updated_data(dev.data)


    async_register_command(hass, handle_connect)
    async_register_command(hass, handle_register)
    async_register_command(hass, handle_unregister)
    async_register_command(hass, handle_reregister)
    async_register_command(hass, handle_update)