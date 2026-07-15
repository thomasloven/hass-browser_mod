import json
from custom_components.browser_mod.const import DATA_STORE, DOMAIN
from homeassistant.core import HomeAssistant

def get_version(hass: HomeAssistant):
    with open(hass.config.path("custom_components/browser_mod/manifest.json"), "r") as fp:
        manifest = json.load(fp)
        return manifest["version"]
    
def get_browser_mod_storage_diagnostics(hass: HomeAssistant):
    """Get the browser_mod storage diagnostics."""
    store = hass.data[DOMAIN][DATA_STORE]
    
    return store.asdict()