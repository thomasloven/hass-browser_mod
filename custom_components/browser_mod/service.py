import logging

from homeassistant.helpers.entity_registry import (
    async_entries_for_config_entry,
    async_entries_for_device,
)
from homeassistant.const import STATE_UNAVAILABLE
from homeassistant.helpers import device_registry, area_registry

from .const import (
    DOMAIN,
    DATA_DEVICES,
    DATA_ALIASES,
    USER_COMMANDS,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_services(hass):
    def call_service(service, targets, data):

        devices = hass.data[DOMAIN][DATA_DEVICES]

        if isinstance(targets, str):
            targets = [targets]

        for target in targets:
            if target not in devices:
                continue
            device = devices[target]
            device.send(service, **data)

    def handle_service(call):
        service = call.service
        data = {**call.data}
        device_ids = set(data.get("device_id", []))
        data.pop("device_id", None)
        area_ids = set(data.get("area_id", []))
        data.pop("area_id", None)
        targets = data.get("target", [])
        if isinstance(targets, str):
            targets = [targets]
        targets = set(targets)
        data.pop("target", None)

        dr = device_registry.async_get(hass)

        for device in device_ids:
            dev = dr.async_get(device)
            if not dev:
                continue
            browserID = list(dev.identifiers)[0][1]
            if browserID is None:
                continue
            targets.add(browserID)

        for area in area_ids:
            for dev in device_registry.async_entries_for_area(dr, area):
                browserID = list(dev.identifiers)[0][1]
                if browserID is None:
                    continue
                targets.add(browserID)

        _LOGGER.error(service)
        _LOGGER.error(targets)
        _LOGGER.error(data)

        call_service(service, targets, data)

    hass.services.async_register(DOMAIN, "test", handle_service)
    hass.services.async_register(DOMAIN, "popup", handle_service)


async def setup_service(hass):
    def handle_command(call):
        command = call.data.get("command", None)
        if not command:
            return

        targets = call.data.get("deviceID", None)
        if isinstance(targets, str):
            targets = [targets]
        devices = hass.data[DOMAIN][DATA_DEVICES]
        aliases = hass.data[DOMAIN][DATA_ALIASES]
        if not targets:
            targets = devices.keys()
        targets = [aliases.get(t, t) for t in targets]

        data = dict(call.data)
        del data["command"]

        for t in targets:
            if t in devices:
                devices[t].send(command, **data)

    def command_wrapper(call):
        command = call.service.replace("_", "-")
        call.data = dict(call.data)
        call.data["command"] = command
        handle_command(call)

    hass.services.async_register(DOMAIN, "command", handle_command)
    for cmd in USER_COMMANDS:
        hass.services.async_register(DOMAIN, cmd.replace("-", "_"), command_wrapper)
