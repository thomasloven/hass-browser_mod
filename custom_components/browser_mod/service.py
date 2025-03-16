import logging

from homeassistant.helpers import device_registry
from homeassistant.helpers import template

from .const import (
    BROWSER_MOD_SERVICES,
    DOMAIN,
    DATA_BROWSERS,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_services(hass):
    def call_service(service, targets, data):
        browserTargets = targets["browsers"]
        userTargets = targets["users"]

        browsers = hass.data[DOMAIN][DATA_BROWSERS]

        # If no targets were specified, send to all browsers
        if browserTargets is None and userTargets is None:
            browserTargets = browsers.keys()
        else:
            browserTargets = []

        if len(userTargets):
            for userId in userTargets:
                for key, browser in browsers.items():
                    if browser.data.get("browser", {}).get("userData", {}).get("id") == userId:
                        browserTargets.append(key)

        for browserTarget in browserTargets:
            if browserTarget not in browsers:
                continue
            browser = browsers[browserTarget]
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

        # Support User Targets
        users = data.pop("user_id", [])
        if isinstance(users, str):
            users = [users]
        
        userIDs = None
        if len(users):
            userIDs = set()
            for user in users:
                userId = template.state_attr(hass, user, "user_id")
                if userId:
                    userIDs.add(userId)
                else:
                    userIDs.add(user)

        targets = {"browsers": browserIDs, "users": userIDs}

        call_service(service, targets, data)

    for service in BROWSER_MOD_SERVICES:
        hass.services.async_register(DOMAIN, service, handle_service)
