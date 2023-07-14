export const ActivityMixin = (SuperClass) => {
  return class ActivityMixinClass extends SuperClass {
    activityTriggered = false;
    _activityCooldown = 15000;
    _activityTimeout;
    constructor() {
      super();
      for (const ev of ["pointerdown", "pointermove", "keydown"]) {
        window.addEventListener(ev, () => this.activityTrigger(true));
      }
      this.addEventListener("fully-update", () => {
        this.activityTrigger();
      });
      this.addEventListener("browser-mod-connected", () =>
        this._activity_state_update()
      );
    }

    _activity_state_update() {
      this.sendUpdate({ activity: this.activityTriggered });
    }

    activityTrigger(touched = false) {
      if (!this.activityTriggered) {
        this.sendUpdate({
          activity: true,
        });
      }
      this.activityTriggered = true;
      if (touched) {
        this.fireEvent("browser-mod-activity");
      }
      clearTimeout(this._activityTimeout);
      this._activityTimeout = setTimeout(
        () => this.activityReset(),
        this._activityCooldown
      );
    }

    activityReset() {
      clearTimeout(this._activityTimeout);
      if (this.activityTriggered) {
        this.sendUpdate({
          activity: false,
        });
      }
      this.activityTriggered = false;
    }
  };
};
