from typing import Any
from custom_components.browser_mod.helpers import get_browser_mod_storage_diagnostics
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.components.lovelace.const import (
    LOVELACE_DATA
)
from .const import (
    DATA_EXTRA_MODULE_URL,
    DOMAIN
)

async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry
) -> dict[str, Any]:
    """Return extra diagnostics for a config entry."""
    
    data = {}
    data[LOVELACE_DATA] = {}
    data[LOVELACE_DATA]["resource_mode"] = hass.data[LOVELACE_DATA].resource_mode
    data[LOVELACE_DATA]["resources"]= hass.data[LOVELACE_DATA].resources.data
    data[DATA_EXTRA_MODULE_URL] = list(hass.data[DATA_EXTRA_MODULE_URL].urls)
    data[DOMAIN] = get_browser_mod_storage_diagnostics(hass)

    return data