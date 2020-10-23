import { deviceID } from "card-tools/src/deviceId";
import { hass, provideHass } from "card-tools/src/hass";

export class BrowserModConnection{

    async connect() {
        const isCast = document.querySelector("hc-main") !== null;
        if(!isCast) {
            if(!window.hassConnection) {
                window.setTimeout(() => this._do_connect(), 100);
                return;
            } else {
                this._connection = (await window.hassConnection).conn;
            }
        } else {
            this._connection = hass().connection;
        }

        this._connection.subscribeMessage((msg) => this.msg_callback(msg), {
            type: 'browser_mod/connect',
            deviceID: deviceID,
            });

        this._hass_patched = false;
        provideHass(this);
    }

    set hass(hass) {
        this._hass = hass;
        if(!hass || this._hass_patched) return;

        this._hass_patched = true;
        const callService = hass.callService;

        hass.callService = (domain, service, serviceData) => {
            if(serviceData && serviceData.deviceID) {
                serviceData = JSON.parse(JSON.stringify(serviceData));

                const orig = JSON.stringify(serviceData.deviceID);
                const patched = orig.replace('"this"', `"${deviceID}"`);
                serviceData.deviceID = JSON.parse(patched);
            }
            return callService(domain, service, serviceData);
        }

        if (document.querySelector("hc-main"))
            document.querySelector("hc-main").hassChanged(hass, hass);
        else
            document.querySelector("home-assistant").hassChanged(hass, hass);
    }

    get connected() {
        return this._connection !== undefined;
    }

    msg_callback(message) {
        console.log(message);
    }

    sendUpdate(data) {
        if(!this.connected) return;
        this._connection.sendMessage({
            type: 'browser_mod/update',
            deviceID,
            data,
        }
        )
    }


}
