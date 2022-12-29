import logging
import attr

STORAGE_VERSION = 1
STORAGE_KEY = "browser_mod.storage"

LISTENER_STORAGE_KEY = "browser_mod.config_listeners"

_LOGGER = logging.getLogger(__name__)


@attr.s
class SettingsStoreData:
    hideSidebar = attr.ib(type=bool, default=None)
    hideHeader = attr.ib(type=bool, default=None)
    defaultPanel = attr.ib(type=str, default=None)
    sidebarPanelOrder = attr.ib(type=list, default=None)
    sidebarHiddenPanels = attr.ib(type=list, default=None)
    sidebarTitle = attr.ib(type=str, default=None)
    faviconTemplate = attr.ib(type=str, default=None)
    titleTemplate = attr.ib(type=str, default=None)
    hideInteractIcon = attr.ib(type=bool, default=None)
    autoRegister = attr.ib(type=bool, default=None)
    lockRegister = attr.ib(type=bool, default=None)

    @classmethod
    def from_dict(cls, data):
        return cls(**data)

    def asdict(self):
        return attr.asdict(self)


@attr.s
class BrowserStoreData:
    last_seen = attr.ib(type=int, default=0)
    registered = attr.ib(type=bool, default=False)
    locked = attr.ib(type=bool, default=False)
    camera = attr.ib(type=bool, default=False)
    settings = attr.ib(type=SettingsStoreData, factory=SettingsStoreData)
    meta = attr.ib(type=str, default="default")

    @classmethod
    def from_dict(cls, data):
        settings = SettingsStoreData.from_dict(data.get("settings", {}))
        return cls(
            **(
                data
                | {
                    "settings": settings,
                }
            )
        )

    def asdict(self):
        return attr.asdict(self)


@attr.s
class ConfigStoreData:
    browsers = attr.ib(type=dict[str:BrowserStoreData], factory=dict)
    version = attr.ib(type=str, default="2.0")
    settings = attr.ib(type=SettingsStoreData, factory=SettingsStoreData)
    user_settings = attr.ib(type=dict[str:SettingsStoreData], factory=dict)

    @classmethod
    def from_dict(cls, data={}):
        browsers = {
            k: BrowserStoreData.from_dict(v)
            for k, v in data.get("browsers", {}).items()
        }
        user_settings = {
            k: SettingsStoreData.from_dict(v)
            for k, v in data.get("user_settings", {}).items()
        }
        settings = SettingsStoreData.from_dict(data.get("settings", {}))
        return cls(
            **(
                data
                | {
                    "browsers": browsers,
                    "settings": settings,
                    "user_settings": user_settings,
                }
            )
        )

    def asdict(self):
        return attr.asdict(self)


class BrowserModStore:
    def __init__(self, hass):
        self.store = hass.helpers.storage.Store(STORAGE_VERSION, STORAGE_KEY)
        self.listeners = []
        self.data = None
        self.dirty = False

    async def save(self):
        if self.dirty:
            await self.store.async_save(attr.asdict(self.data))
            self.dirty = False

    async def load(self):
        stored = await self.store.async_load()
        if stored:
            self.data = ConfigStoreData.from_dict(stored)
        if self.data is None:
            self.data = ConfigStoreData()
            await self.save()
        self.dirty = False

    async def updated(self):
        self.dirty = True
        for listener in self.listeners:
            listener(attr.asdict(self.data))
        await self.save()

    def asdict(self):
        return self.data.asdict()

    def add_listener(self, callback):
        self.listeners.append(callback)

        def remove_listener():
            self.listeners.remove(callback)

        return remove_listener

    def get_browser(self, browserID):
        return self.data.browsers.get(browserID, BrowserStoreData())

    async def set_browser(self, browserID, **data):
        browser = self.data.browsers.get(browserID, BrowserStoreData())
        browser.__dict__.update(data)
        self.data.browsers[browserID] = browser
        await self.updated()

    async def delete_browser(self, browserID):
        del self.data.browsers[browserID]
        await self.updated()

    def get_user_settings(self, name):
        return self.data.user_settings.get(name, SettingsStoreData())

    async def set_user_settings(self, name, **data):
        settings = self.data.user_settings.get(name, SettingsStoreData())
        settings.__dict__.update(data)
        self.data.user_settings[name] = settings
        await self.updated()

    def get_global_settings(self):
        return self.data.settings

    async def set_global_settings(self, **data):
        self.data.settings.__dict__.update(data)
        await self.updated()
