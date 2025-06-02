import json
from homeassistant.core import HomeAssistant

def get_version(hass: HomeAssistant):
    with open(hass.config.path("custom_components/browser_mod/manifest.json"), "r") as fp:
        manifest = json.load(fp)
        return manifest["version"]