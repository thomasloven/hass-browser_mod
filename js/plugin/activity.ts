import { capitalize } from "../helpers";

const FULLY_ACTIVITY_EVENTS = [ "onMotion" ];

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
      this.addEventListener("fully-update", (ev) => {
        if (FULLY_ACTIVITY_EVENTS.includes(ev.detail?.event)) {
          this.activityTrigger(false, `fully${capitalize(ev.detail?.event)}`);
        }
      });
      this.addEventListener("browser-mod-ready", () =>
        this._activity_state_update()
      );
    }

    _activity_state_update() {
      this.sendUpdate({ activity: this.activityTriggered });
    }

    activityTrigger(touched = false, activityType = "userInteraction") {
      if (!this.activityTriggered) {
        this.sendUpdate({
          activity: true,
          activityType: activityType,
        });
      }
      this.activityTriggered = true;
      if (touched) {
        this.fireBrowserEvent("browser-mod-activity");
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
          activityType: "none"
        });
      }
      this.activityTriggered = false;
    }
  };
};
