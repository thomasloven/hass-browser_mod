import logging

# import .mod_view

from aiohttp import web
import aiofiles
from homeassistant.components.http import HomeAssistantView

REQUIREMENTS = ["aiofiles"]
DATA_EXTRA_MODULE_URL = 'frontend_extra_module_url'

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass, config):
    _LOGGER.error(f"Setting up browser_mod")

    setup(hass, '/browser_mod.js')

    _LOGGER.error(f"Registered frontend script")


    return True

def setup(hass, url):
    if DATA_EXTRA_MODULE_URL not in hass.data:
        hass.data[DATA_EXTRA_MODULE_URL] = set()
    url_set = hass.data[DATA_EXTRA_MODULE_URL]
    url_set.add(url)

    hass.http.register_view(ModView(hass, url))

class ModView(HomeAssistantView):

    name = "browser_mod_script"
    requires_auth = False

    def __init__(self, hass, url):
        self.url = url
        self.config_dir = hass.config.path()

    async def get(self, request):
        path = "{}/custom_components/browser_mod/browser_mod.js".format(self.config_dir)

        filecontent = ""

        try:
            async with aiofiles.open(path, mode="r", encoding="utf-8", errors="ignore") as localfile:
                filecontent = await localfile.read()
                localfile.close()
        except Exception as exception:
            pass

        return web.Response(body=filecontent, content_type="text/javascript", charset="utf-8")
