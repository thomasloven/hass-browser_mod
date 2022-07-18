import logging
import attr

STORAGE_VERSION = 1
STORAGE_KEY = "browser_mod.storage"

LISTENER_STORAGE_KEY = "browser_mod.config_listeners"

_LOGGER = logging.getLogger(__name__)


@attr.s
class BrowserStoreData:
    last_seen = attr.ib(type=int, default=0)
    enabled = attr.ib(type=bool, default=False)
    camera = attr.ib(type=bool, default=False)
    meta = attr.ib(type=str, default="default")

    @classmethod
    def from_dict(cls, data):
        return cls(**data)

    def asdict(self):
        return attr.asdict(self)


@attr.s
class ConfigStoreData:
    browsers = attr.ib(type=dict[str:BrowserStoreData], factory=dict)
    version = attr.ib(type=str, default="2.0")

    @classmethod
    def from_dict(cls, data={}):
        browsers = {
            k: BrowserStoreData.from_dict(v) for k, v in data["browsers"].items()
        }
        return cls(
            **(
                data
                | {
                    "browsers": browsers,
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
