import logging

from homeassistant.helpers import device_registry, template
from homeassistant.util import dt as dt_util
from homeassistant.exceptions import ServiceValidationError

from .const import (
    BROWSER_MOD_BROWSER_SERVICES,
    BROWSER_MOD_COMPONENT_SERVICES,
    DOMAIN,
    DATA_BROWSERS,
    DATA_STORE,
)

from .browser import deleteBrowsers

_LOGGER = logging.getLogger(__name__)


async def async_setup_services(hass):
    def get_browser_ids(data, selectorSuffix=""):
        browserIDSelector = "browser_id"
        deviceIDSelector = "device_id"
        areaIDSelector = "area_id"
        if selectorSuffix:
            browserIDSelector += f"_{selectorSuffix}"
            deviceIDSelector += f"_{selectorSuffix}"
            areaIDSelector += f"_{selectorSuffix}"
        
        browsers = data.pop(browserIDSelector, [])
        if isinstance(browsers, str):
            browsers = [browsers]

        # Support service targets
        deviceIDs = data.pop(deviceIDSelector, [])
        if isinstance(deviceIDs, str):
            deviceIDs = [deviceIDs]
        browsers.extend(deviceIDs)
        dr = device_registry.async_get(hass)
        areaIDs = data.pop(areaIDSelector, [])
        if isinstance(areaIDs, str):
            areaIDs = [areaIDs]
        for area in areaIDs:
            for dev in device_registry.async_entries_for_area(dr, area):
                for identifier in dev.identifiers:
                    if identifier[0] == DOMAIN:
                        browsers.append(identifier[1])
                        break

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
        
        return browserIDs

    def call_service(service, targets, data):
        browserTargets = targets["browsers"]
        userTargets = targets["users"]

        browsers = hass.data[DOMAIN][DATA_BROWSERS]

        # If no targets were specified, send to all browsers
        if browserTargets is None and userTargets is None:
            browserTargets = browsers.keys()
        elif browserTargets is None and userTargets is not None:
            browserTargets = []

        if userTargets is not None and len(userTargets):
            for userId in userTargets:
                for key, browser in browsers.items():
                    if browser.data.get("browser", {}).get("userData", {}).get("id") == userId:
                        browserTargets.append(key)

        for browserTarget in browserTargets:
            if browserTarget not in browsers:
                continue
            browser = browsers[browserTarget]
            hass.create_task(browser.send(service, **data))

    def handle_browser_service(call):
        service = call.service
        data = {**call.data}

        browserIDs = get_browser_ids(data)

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
    
    # Hanldler for server browser_mod.deregister_browser
    async def deregister_browser(call):
        data = {**call.data}

        browserIDs = get_browser_ids(data)
        if browserIDs is None:
            browserIDs = set()
        
        excludedBrowserIDs = get_browser_ids(data, "exclude")
        if excludedBrowserIDs is None:
            excludedBrowserIDs = set()

        if not browserIDs and not excludedBrowserIDs:
            raise ServiceValidationError(
                "No browsers to include or exclude"
            )
        
        _LOGGER.debug("browser_mod.deregister_browser: included: %s", browserIDs)
        _LOGGER.debug("browser_mod.deregister_browser: excluded: %s", excludedBrowserIDs)
        deleteBrowsers(hass, browserIDs, excludedBrowserIDs)

        store = hass.data[DOMAIN][DATA_STORE]
        await store.cleanup(browserIDs, excludedBrowserIDs)
    
    for service in BROWSER_MOD_BROWSER_SERVICES:
        hass.services.async_register(DOMAIN, service, handle_browser_service)

    handlerFunctions = locals()
    for service in BROWSER_MOD_COMPONENT_SERVICES:        
        if service in handlerFunctions:
            hass.services.async_register(DOMAIN, service, handlerFunctions[service])
        else:
            _LOGGER.error("Component handler service %s not found", service)
        