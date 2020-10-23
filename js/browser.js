import { fireEvent } from "card-tools/src/event";

export const BrowserModBrowserMixin = (C) => class extends C {

    constructor() {
        super();
        document.addEventListener("visibilitychange", () => this.sensor_update());
        window.addEventListener("location-changed", () => this.sensor_update());

        window.setInterval(() => this.sensor_update(), 10000);
    }

    sensor_update() {
        this.sendUpdate({browser: {
            path: window.location.pathname,
            visibility: document.visibilityState,
            userAgent: navigator.userAgent,
            currentUser: this._hass &&this._hass.user && this._hass.user.name,
            fullyKiosk: this.isFully,
            width: window.innerWidth,
            height: window.innerHeight,
        }});
    }

    do_navigate(path) {
        if (!path) return;
        history.pushState(null, "", path);
        fireEvent("location-changed", {}, document.querySelector("home-assistant"));
    }
}
