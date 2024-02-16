import logging

from homeassistant.helpers import device_registry

from .const import (
    BROWSER_MOD_SERVICES,
    DOMAIN,
    DATA_BROWSERS,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_services(hass):
    def call_service(service, targets, data):

        browsers = hass.data[DOMAIN][DATA_BROWSERS]

        # If no targets were specified, send to all browsers
        if targets is None:
            targets = browsers.keys()

        for target in targets:
            if target not in browsers:
                continue
            browser = browsers[target]
            hass.create_task(browser.send(service, **data))

    def handle_service(call):
        service = call.service
        data = {**call.data}

        browsers = data.pop("browser_id", [])
        if isinstance(browsers, str):
            browsers = [browsers]

        # Support service targets
        browsers.extend(data.pop("device_id", []))
        dr = device_registry.async_get(hass)
        for area in data.pop("area_id", []):
            for dev in device_registry.async_entries_for_area(dr, area):
                browsers.append(list(dev.identifiers)[0][1])

        browserIDs = None
        if len(browsers):
            browserIDs = set()
            for br in browsers:
                dev = dr.async_get(br)
                if dev:
                    browserIDs.add(list(dev.identifiers)[0][1])
                else:
                    browserIDs.add(br)

            browserIDs = set(browserIDs)

        call_service(service, browserIDs, data)

    for service in BROWSER_MOD_SERVICES:
        hass.services.async_register(DOMAIN, service, handle_service)
