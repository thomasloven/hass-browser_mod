export const FullyKioskMixin = (C) => class extends C {
    get isFully() {
        return window.fully !== undefined;
    }

    constructor() {
        super();

        if (!this.isFully) return;

        this._fullyMotion = false;
        this._motionTimeout = undefined;

        for (const event of ["screenOn", "screenOff", "pluggedAC", "pluggedUSB", "onBatteryLevelChanged", "unplugged", "networkReconnect"]) {
            fully.bind(event, "window.browser_mod.fully_update();");
        }

        fully.bind("onMotion", "window.browser_mod.fullyMotionTriggered();");
    }

    fully_update() {
        if(!this.isFully) return
        this.sendUpdate({fully: {
            battery: fully.getBatteryLevel(),
            charging: fully.isPlugged(),
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
