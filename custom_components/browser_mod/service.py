import logging

from homeassistant.helpers import device_registry

from .const import (
    DOMAIN,
    DATA_BROWSERS,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_services(hass):
    def call_service(service, targets, data):

        browsers = hass.data[DOMAIN][DATA_BROWSERS]

        if isinstance(targets, str):
            targets = [targets]

        # If no targets were specified, send to all browsers
        if len(targets) == 0:
            targets = browsers.keys()

        for target in targets:
            if target not in browsers:
                continue
            browser = browsers[target]
            browser.send(service, **data)

    def handle_service(call):
        service = call.service
        data = {**call.data}

        browsers = data.pop("browser_id", [])
        if isinstance(browsers, str):
            browsers = [browsers]
        browsers = set(browsers)
        device_ids = set(data.pop("device_id", []))
        area_ids = set(data.pop("area_id", []))

        dr = device_registry.async_get(hass)

        for device in device_ids:
            dev = dr.async_get(device)
            if not dev:
                continue
            browserID = list(dev.identifiers)[0][1]
            if browserID is None:
                continue
            browsers.add(browserID)

        for area in area_ids:
            for dev in device_registry.async_entries_for_area(dr, area):
                browserID = list(dev.identifiers)[0][1]
                if browserID is None:
                    continue
                browsers.add(browserID)

        call_service(service, browsers, data)

    hass.services.async_register(DOMAIN, "sequence", handle_service)
    hass.services.async_register(DOMAIN, "delay", handle_service)
    hass.services.async_register(DOMAIN, "popup", handle_service)
    hass.services.async_register(DOMAIN, "close_popup", handle_service)
    hass.services.async_register(DOMAIN, "navigate", handle_service)
    hass.services.async_register(DOMAIN, "refresh", handle_service)
    hass.services.async_register(DOMAIN, "console", handle_service)
    hass.services.async_register(DOMAIN, "javascript", handle_service)
