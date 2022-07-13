import logging
import attr
from dataclasses import dataclass

from homeassistant.loader import bind_hass

STORAGE_VERSION = 1
STORAGE_KEY = "browser_mod.storage"

LISTENER_STORAGE_KEY = "browser_mod.config_listeners"

_LOGGER = logging.getLogger(__name__)


@attr.s
class DeviceStoreData:
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
    devices = attr.ib(type=dict[str: DeviceStoreData], factory=dict)
    version = attr.ib(type=str, default="2.0")

    @classmethod
    def from_dict(cls, data):
        devices = {k: DeviceStoreData.from_dict(v) for k,v in data["devices"].items()}
        return cls(**(data | {
            "devices": devices,
            }
        ))

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
        self.data = ConfigStoreData.from_dict(await self.store.async_load())
        if self.data is None:
            self.data = ConfigStoreData()
            self.save()
        self.dirty = False

    async def updated(self):
        self.dirty = True
        for l in self.listeners:
            l(attr.asdict(self.data))
        await self.save()

    def asdict(self):
        return self.data.asdict()

    def add_listener(self, callback):
        self.listeners.append(callback)

        def remove_listener():
            self.listeners.remove(callback)

        return remove_listener

    def get_device(self, deviceID):
        return self.data.devices.get(deviceID, DeviceStoreData())

    async def set_device(self, deviceID, **data):
        device = self.data.devices.get(deviceID, DeviceStoreData())
        device.__dict__.update(data)
        self.data.devices[deviceID] = device
        await self.updated()

    async def delete_device(self, deviceID):
        del self.data.devices[deviceID]
        await self.updated()
