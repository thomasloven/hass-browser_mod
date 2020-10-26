export const FullyKioskMixin = (C) => class extends C {
    get isFully() {
        return window.fully !== undefined;
    }

    constructor() {
        super();

        if (!this.isFully) return;

        this._fullyMotion = false;
        this._motionTimeout = undefined;

        for (const ev of ["screenOn", "screenOff", "pluggedAC", "pluggedUSB", "onBatteryLevelChanged", "unplugged", "networkReconnect", "onMotion"]) {
            window.fully.bind(ev, `window.browser_mod.fully_update("${ev}");`);
        }

        this._keepingAlive = false;
    }

    fully_update(event) {
        if(!this.isFully) return
        if(event === "screenOn") {
            window.clearTimeout(this._keepAliveTimer);
            if(!this._keepingAlive)
                this.screen_update();
        } else if (event === "screenOff") {
            this.screen_update();
            this._keepingAlive = false;
            if(this.config.force_stay_awake) {
                this._keepAliveTimer = window.setTimeout(() => {
                    this._keepingAlive = true;
                    window.fully.turnScreenOn();
                    window.fully.turnScreenOff();
                }, 270000);
            }
        } else if (event === "onMotion") {
            this.fullyMotionTriggered();
        }

        this.sendUpdate({fully: {
            battery: window.fully.getBatteryLevel(),
            charging: window.fully.isPlugged(),
            motion: this._fullyMotion,
        }})
    }

    fullyMotionTriggered() {
        this._fullyMotion = true;
        clearTimeout(this._motionTimeout);
        this._motionTimeout = setTimeout(() => {
            this._fullyMotion = false;
            this.fully_update();
        }, 5000);
        this.fully_update();
    }
}
