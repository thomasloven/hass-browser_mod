DOMAIN = "browser_mod"

BROWSER_ID = "browserID"

FRONTEND_SCRIPT_URL = "/browser_mod.js"
SETTINGS_PANEL_URL = "/browser_mod_panel.js"

DATA_BROWSERS = "browsers"
DATA_ADDERS = "adders"
DATA_STORE = "store"

WS_ROOT = DOMAIN
WS_CONNECT = f"{WS_ROOT}/connect"
WS_REGISTER = f"{WS_ROOT}/register"
WS_UNREGISTER = f"{WS_ROOT}/unregister"
WS_UPDATE = f"{WS_ROOT}/update"
WS_SETTINGS = f"{WS_ROOT}/settings"
WS_RECALL_ID = f"{WS_ROOT}/recall_id"
WS_LOG = f"{WS_ROOT}/log"

BROWSER_MOD_BROWSER_SERVICES = [
    "sequence",
    "delay",
    "popup",
    "more_info",
    "close_popup",
    "set_popup_style",
    "notification",
    "navigate",
    "refresh",
    "change_browser_id",
    "set_theme",
    "console",
    "javascript",
]

BROWSER_MOD_COMPONENT_SERVICES = [
    "deregister_browser",
]

DYNAMIC_ENTITIES = [
    "camera",
    "battery_level",
    "charging",
]