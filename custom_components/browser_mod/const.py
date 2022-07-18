DOMAIN = "browser_mod"

FRONTEND_SCRIPT_URL = "/browser_mod.js"
SETTINGS_PANEL_URL = "/browser_mod_panel.js"

DATA_BROWSERS = "browsers"
DATA_ADDERS = "adders"
DATA_STORE = "store"
DATA_ALIASES = "aliases"
DATA_CONFIG = "config"
DATA_SETUP_COMPLETE = "setup_complete"

CONFIG_DEVICES = "devices"
CONFIG_PREFIX = "prefix"
CONFIG_DISABLE = "disable"
CONFIG_DISABLE_ALL = "all"

WS_ROOT = DOMAIN
WS_CONNECT = "{}/connect".format(WS_ROOT)
WS_UPDATE = "{}/update".format(WS_ROOT)
WS_CAMERA = "{}/camera".format(WS_ROOT)

WS_REGISTER = f"{WS_ROOT}/register"
WS_UNREGISTER = f"{WS_ROOT}/unregister"
WS_REREGISTER = f"{WS_ROOT}/reregister"

USER_COMMANDS = [
    "debug",
    "popup",
    "close-popup",
    "navigate",
    "more-info",
    "set-theme",
    "lovelace-reload",
    "window-reload",
    "blackout",
    "no-blackout",
    "toast",
    "commands",
    "call_service",
    "delay",
]
