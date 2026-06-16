# The Browser Mod Browser Panel

This panel shows on every device and in a default configuration shows on the Home Assistant sidebar. It can also be reached by adding `/browser-mod` to your Home Assistant URL. e.g. `http://homeassistant.local:8123/browser-mod`.

## This browser

The most important concept for Browser Mod is the _Browser_. A _Browser_ is identified by a unique `BrowserID`. There is the option to [Sync Browser ID to login session](#sync-browser-id-to-login-session). `BrowserID` is always stored in the browsers [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

Browser Mod will initially assign a random `BrowserID` to each _Browser_ that connects, but you can change this if to suit your setup.

LocalStorage works basically like cookies in that the information is stored locally on your device. Unlike a cookie, though, the information is bound to a URL. Therefore you may get different `BrowserID`s in the same browser if you e.g. access Home Assistant through different URLs inside and outside of your LAN, or through Home Assistant Cloud. In these cases you can set the `BrowserID` to the same entry by easily selecting from the `BrowserID` dropdown. Use [Sync Browser ID to login session](#sync-browser-id-to-login-session) to sync the `BrowserID` to the login session for that access method.

### Register

Registering a _Browser_ as a device will create a Home Assistant Device associated with that browser. The device has the following entities:

- A `media_player` entity which will play sound and video through the browser. This entity has attributes `video_interaction_required` and `audio_interaction_required` which will be set to `true` if user interaction is required on the browser before being able to play video or audio. Generally user interaction is not required to play muted video. The `media_player` will be muted while ever user interaction is required for audio. For more information see [User interaction](./configuration-panel.md#user-interaction).
- A `light` entity will turn the screen on or off and control the brightness if you are using [Fully Kiosk Browser](https://www.fully-kiosk.com/) (FKB). If you are not using FKB the function will be simulated by covering the screen with a black (or semitransparent) box. There is a [Frontend Setting](./configuration-panel.md#frontend-settings) to optionally save the browser screen state for a browser.
- A motion `binary_sensor` which reacts to mouse and/or keyboard activity in the Browser. In FKB this can also react to motion in front of the devices camera.
- A number of `sensor` and `binary_sensor` entities providing different bits of information about the Browser which you may or may not find useful.

> NOTE: Both the `media_player` and `light` functions can be disabled by disabling the entity in Home Assistant. If `media_player` is disabled and neither the camera entity nor go2rtc publishing is enabled, no [User interaction](./configuration-panel.md#user-interaction) check will take place. If `light` is disabled, there will be no setting of screen brightness from Home Assistant, which is useful if you are using adaptive light brightness on your device and never want Browser Mod to override.

Registering a browser also enables it to act as a target for Browser Mod _services_.

### Browser ID

This box lets you set the `BrowserID` for the current _Browser_.
Note that it is possible to assign the same `BrowserID` to several browsers, but unpredictable things _may_ happen if several of them are open at the same time.
There may be benefits to using the same `BrowserID` in some cases, so you'll have to experiment with what works for you.

Browser Mod is trying hard to keep the Browser ID constant. If you have an environment where you are finding your Browser IDs change from time to time, consider enabling [Sync Browser ID to login session](#sync-browser-id-to-login-session) or following the best practice for [Browser ID updates](#browser-id-updates).

### Sync Browser ID to login session

When enabled, Browser Mod stores the current `BrowserID` against your Home Assistant login session on the server. If the browser's local storage is cleared (e.g. due to privacy settings, a cache wipe, or the Home Assistant Companion App resetting its frontend cache), the `BrowserID` will be automatically recalled from the server the next time the same login session connects.

This is particularly useful for:

- **Home Assistant Companion Apps** on iOS or Android, where the frontend cache may be cleared periodically.
- Any browser that clears local storage regularly.

> **Note:** The session mapping is tied to the Home Assistant refresh token used for the current login session. If you log out and log back in, a new session is created and the mapping will need to be re-established. To restore the mapping, simply navigate to the Browser Mod panel and ensure the toggle is enabled.

### Enable camera entity

If your device has a camera, this will allow it to be forwarded as a Browser Mod `camera` entity to Home Assistant.

### Enable go2rtc publishing

If your device has a camera, this will allow it to publish the browser camera to go2rtc using WHIP.

This is independent from [Enable camera entity](#enable-camera-entity). You can enable the Browser Mod `camera` entity, go2rtc publishing, both, or neither for each registered Browser.

### Browser ID updates

While Browser Mod does its best to retain a Browser ID for browsers, it may change due to circumstances beyond Browser Mod's control (e.g. localStorage cleared due to Browser privacy settings). When a Browser ID changes, your Frontend settings tied to a Browser ID will not be applied.

The easiest way to handle this is to enable [Sync Browser ID to login session](#sync-browser-id-to-login-session), which automatically recalls the Browser ID from the server whenever local storage is cleared, as long as the same login session is used.

If you prefer a manual approach or cannot use session sync, you can follow the best practices listed below.

1. Turn off auto-register. This allows to control the register order, and also limits many new Browser IDs being registered in your environment of changing Browser IDs.
2. Don't lock the register but leave open to make the next step easy to accomplish.
3. When you need to change/revert the Browser ID, to restore Frontend settings, do the following in this exact order:
 a) Navigate to Browser Mod settings panel.
 b) Rename the automatically generated Browser ID string to be the same name as the Browser ID for existing Frontend settings you wish to apply.
 c) Enable Register toggle.

Using this method means that the new random Browser ID never has sent information to Browser Mod integration so no random Browser IDs to tidy up (though you can tidy up any rogue Browser IDs with browser_mod.deregister_browser).
