from .const import DOMAIN, DATA_DEVICES, DATA_ALIASES

def setup_service(hass):

    def handle_command(call):
        command = call.data.get("command", None)
        if not command:
            return

        targets = call.data.get("deviceID", None)
        devices = hass.data[DOMAIN][DATA_DEVICES]
        aliases = hass.data[DOMAIN][DATA_ALIASES]
        if not targets:
            targets = devices.keys()
        targets = [aliases.get(t, t) for t in targets]

        data = dict(call.data)
        del data["command"]

        for t in targets:
            if t in devices:
                devices[t].ws_send(command, **data)

    hass.services.async_register(DOMAIN, 'command', handle_command)
