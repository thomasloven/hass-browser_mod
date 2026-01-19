# The Browser Mod Configuration Panel

## This browser

The most important concept for Browser Mod is the _Browser_. A _Browser_ is identified by a unique `BrowserID` stored in the browsers [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

Browser Mod will initially assigning a random `BrowserID` to each _Browser_ that connects, but you can change this if you want.

LocalStorage works basically like cookies in that the information is stored locally on your device. Unlike a cookie, though, the information is bound to a URL. Therefore you may get different `BrowserID`s in the same browser if you e.g. access Home Assistant through different URLs inside and outside of your LAN, or through Home Assistant Cloud.

### Register

Registering a _Browser_ as a device will create a Home Assistant Device associated with that browser. The device has the following entities:

- A `media_player` entity which will play sound and video through the browser. This entity has attributes `video_interaction_required` and `audio_interaction_required` which will be set to `true` if user interaction is required on the browser before being able to play video or audio. Generally user interaction is not required to play muted video. The `media_player` will be muted while ever user interaction is required for audio. For more information see [User interaction](#user-interaction).
- A `light` entity will turn the screen on or off and control the brightness if you are using [Fully Kiosk Browser](https://www.fully-kiosk.com/) (FKB). If you are not using FKB the function will be simulated by covering the screen with a black (or semitransparent) box. There is a [Frontend Setting](#frontend-settings-admin-only) to optionally save the browser screen state for a browser.
- A motion `binary_sensor` which reacts to mouse and/or keyboard activity in the Browser. In FKB this can also react to motion in front of the devices camera.
- A number of `sensor` and `binary_sensor` entities providing different bits of information about the Browser which you may or may not find useful.

> NOTE: Both the `media_player` and `light` functions can be disabled by disabling the entity in Home Assistant. If `media_player` is disabled no [User interaction](#user-interaction) check will take place. If `light` is disabled, there will be no setting of screen brightness from Home Assistant, which is useful if you are using adaptive light brightness on your device and never want Browser Mod to override.

Registering a browser also enables it to act as a target for Browser Mod _services_.

### Browser ID

This box lets you set the `BrowserID` for the current _Browser_.
Note that it is possible to assign the same `BrowserID` to several browsers, but unpredictable things _may_ happen if several of them are open at the same time.
There may be benefits to using the same `BrowserID` in some cases, so you'll have to experiment with what works for you.

Browser Mod is trying hard to keep the Browser ID constant. If you have an environment where you are finding your Browser IDs change from time to time, consider following the best practice for [Browser ID updates](#browser-id-updates).

### Enable camera

If your device has a camera, this will allow it to be forwarded as a `camera` entity to Home Assistant.

### Camera resolution

Set the desired resolution for the camera in pixels using the format `width x height` (e.g., `1920 x 1080`). This setting allows you to control the quality and bandwidth usage of the camera stream. If not set, the browser will use its default resolution (typically 640 x 480).

Common resolutions:
- `640 x 480` - VGA (default if not specified)
- `1280 x 720` - HD (720p)
- `1920 x 1080` - Full HD (1080p)
- `2560 x 1440` - QHD (1440p)
- `3840 x 2160` - 4K (2160p)

> Note: The actual resolution used may depend on your camera's capabilities. The browser will try to use the closest available resolution to what you specify.

## Registered Browsers (admin only)

This section shows all currently registered _Browsers_ and allows you to unregister them. This is useful e.g. if a `BrowserID` has changed or if you do not have access to a device anymore.

You can also lock browsers so they cannot be unregistered by a non-admin user.

### Register CAST browser

If you are using [Home Assistant Cast](https://www.home-assistant.io/integrations/cast/#home-assistant-cast) to display a lovelace view on a Chromecast device it will get a BrowserID of "`CAST`". Since you can't access the Browser Mod config panel from the device, clicking this button will register the `CAST` browser. Most Browser Mod services will work under Home Assistant Cast.

## Frontend Settings (admin only)

This section is for settings that change the default behavior of the Home Assistant frontend.

For each option the first applicable value will be applied.

In the screenshot below, for example, the sidebar title would be set to "My home" - the GLOBAL setting - for any user on any browser (even unregistered). For any user logged in on the "kitchen-dashboard" browser, the sidebar title would instead be set to "FOOD", except for the user "dev" for whom the sidebar title would always be "DEV MODE".
![Example of a frontend setting being applied for a user, a browser and globally](https://user-images.githubusercontent.com/1299821/187984798-04e72fff-7cce-4394-ba69-42e62c5e0acb.png)

As settings here may mean you get yourself locked out of Browser Mod panel in some way, there is a Frontend Settings __Kill Switch__ available. Append `?disableBrowserModFrontendSettings` to the Home Assistant URL. e.g. `http://localhost:8123/lovelace/0?disableBrowserModFrontendSettings`

### Title template

This allows you to set and dynamically update the title text of the browser tab/window by means on a Jinja [template](https://www.home-assistant.io/docs/configuration/templating/). Variables available are `browser_id` and [`browser_entities`](./browser-entities.md) (undefined if Browser not registered).

> Ex:
>
> ```jinja
> {{ states.sensor |count}} sensors in Home Assistant
> ```

### Favicon template

This allows you to set and dynamically update the favicon of the browser tab/window. I.e. the little icon next to the page title. Favicons can be .png or .ico files and should be placed in your `<config>/www` directory. The box here should then contain a jinja [template](https://www.home-assistant.io/docs/configuration/templating/) which resolves to the path of the icon with `<config>/www/` replaced by `/local/` (see [Hosting files](https://www.home-assistant.io/integrations/http/#hosting-files)). Vairables available are `browser_id` and [`browser_entities`](./browser-entities.md) (undefined if Browser not registered).

> Ex:
>
> ```jinja
> {% if is_state("light.bed_light", "on") %}
> /local/icons/green.png
> {% else %}
> /local/icons/red.png
> {% endif %}
> ```

Note that this _only_ applies to the current favicon of the page, not any manifest icons such as the loading icon or the icon you get if you save the page to your smartphones homescreen. For those, please see the [hass-favicon](https://github.com/thomasloven/hass-favicon) custom integration.

### Kiosk mode

This will set Home Assistant Kiosk mode introduced in 2026.1. When launched, Kiosk mode has the same outcome as Hide sidebar, except it does not affect the 'Always hide the sidebar' user setting. In future Home Assistant Kiosk mode may gain more features.

> Tip: add `/browser-mod` to the end of your home assistant URL when you need to turn this off again...

### Hide sidebar

This will hide the sidebar with the navigation links. You can still access all the pages via normal links.

__IMPORTANT__: When this setting is cleared, the Browser will revert to a state in which the User Setting 'Always hide the sidebar' is in effect, with the sidebar menu icon showing. The 'Always hide the sidebar' user setting can be reset in User Settings. You may wish to use the [Kiosk Mode](#kiosk-mode) setting which does not affect 'Always hide the sidebar' user setting.

> Tip: add `/browser-mod` to the end of your home assistant URL when you need to turn this off again...

### Hide header

This will hide the header bar. Completely. It does not care if there are useful navigation links there or not. It's gone.

> Tip: See the big yellow warning box at the top of this card? For some reason, it seems to be really easy to forget you turned this on. Please do not bother the Home Assistant team about the header bar missing if you have hidden it yourself. Really, I've forgotten multiple times myself.

### Overlay icon

Allow for an overlay icon to apear on certain Dashboards/Panels and carry out an action when clicked. Even with good Dashboard design, you can end up on a Home Assistant panel that assumes header and sidebar navigation. E.g. History Panel, Energy Dashboard. An overlay icon allows for a method to show an icon and carry out an action.

The settings of the Overlay icon includes position parameters: `top`, `left`, `bottom`, `right`. Use a pair of `top` & `left` or `bottom` & `right` to position the icon at that distance away from the top/left or bottom/right of the screen. The parameters are entered as numbers and represent pixels. __IMPORTANT__: Using all position parameters will lead to undesired results creating a large overlay that may take up your entire screen.

The icon and button sizes are default Home Assistant sizes of 24px and 48px respectively. If you wish to have a different icon/button size, set the `class` parameter to give the icon a class, then set the `--mdc-icon-size` and `--mdc-icon-button-size` CSS parameters for that class.

> Example: Your icon could be `mdi:chevron-left`, titled _Back_ with the following action using `browser_mod.javascript`.
>
>```yaml
>action: browser_mod.javascript
>data:
>  code: history.back()
>```
>
> Alternatively, use `mdi:home`, titled _Home_ with the following action using `browser_mod.navigate`
>
>```yaml
>action: browser_mod.navigate
>data:
>  path: /lovelace
>```

If you wish to style this icon for sizing and other CSS options, set a class and then enter a style for that class. With a class set to `my-icon-style` you can then use the following CSS.

```css
.my-icon-style {
  --mdc-icon-size: 48px;
  --mdc-icon-button-size: 72px;
}
```

See [Default action](#default-action) below for tips on calling multiple actions.

__IMPORTANT__: Like actions popups and notifications, this setting DOES NOT support templates.

### Default dashboard (legacy)

**Using this Frontend setting is not recommended. See below for options which are recommended.**

1. Global/System ⇒ (Since 2025.12) Set the Home Assistant default system dashboard in Dashboards.
2. Browser/Device ⇒ Use Default action with `browser_mod.navigate`. This also works with other pages than lovelace dashboards, like e.g. `logbook` or even `history?device_id=f112fd806f2520c76318406f98cd244e&start_date=2022-09-02T16%3A00%3A00.000Z&end_date=2022-09-02T19%3A00%3A00.000Z`.
3. User ⇒ (Since 2025.12) Set Home Assistant default user dashboard in user profile.

Set the default dashboard that is shown when you access `https://<your home assistant url>/` with nothing after the `/`.

> NOTE: This uses legacy method of storing default dashboard in localStorage. Home Assistant 2025.12 started storing the default dashboard in system/user settings. If the default dashboard is set via Home Assistant at either system or user level, this overrides the legacy method and Browser Mod setting will be ignored.

### Default action

Set the default action to be run when Browser is loaded or refreshed. This setting accepts the same action Config as per `browser_mod.popup` actions. For more information see the examples actions included in [Actionable popups](./popups.md#actionable-popups). If you are using Browser Mod [SERVICES](./services.md), in most cases you would omit `browser_id` or `user_id` so the service runs on the loading Browser.

__IMPORTANT__: Like actions popups and notifications, this setting DOES NOT support templates.

_Tips:_

1. Multiple actions can be called by using a list of actions. These are called in parallel, matching actions for popups and notifications.

    ```yaml
    - action: browser_mod.navigate
      data:
        path: /my-dashboard/second-view
    - action: browser_mod.notification
      data:
        message: Good Morning Dave
    ```

2. For fine grained control of timing, consider using `browser_mod.sequence`. Note here that only one top level action is used.

    ```yaml
    action: browser_mod.sequence
    data:
      sequence:
        - service: browser_mod.navigate
          data:
            path: /my-dashboard/second-view
        - service: browser_mod.delay
          data:
            time: 5000
        - service: browser_mod.notification
          data:
            message: Good Morning Dave
    ```

### Sidebar order

#### Home Assistant 2025.6 and onward

Home Assistant 2025.6 introduced a sidebar settings dialog to replace the in place edit mode. Browser Mod uses this dialog for editing sidebar order and visibility.

__IMPORTANT__: Home Assistant will store sidebar settings in the Home Assistant user profile. This will prevent Browser and Global sidebar settings from being applied. If a user has sidebar settings synced to their user profile, a warning will be display with an option to clear the synced settings to allow Browser Mod to take precedence.

#### Home Assistant prior to 2025.6

Set the order and hidden items of the sidebar. To change this setting:

- Click the "EDIT" button
- Change the sidebar to how you want it
- DO NOT click "DONE"
- Either add a new User or Browser setting or click one of the pencil icons to overwrite an old layout
- Click the "RESTORE" button

### Sidebar title

This changes the "Home Assistant" text that is displayed at the top of the sidebar.
Accepts Jinja [templates](https://www.home-assistant.io/docs/configuration/templating/). Variables available are `browser_id` and [`browser_entities`](./browser-entities.md) (undefined if Browser not registered).

### Hide interaction icon

This hides the icon in the bottom right corner which indicates that you need to interact with the browser window before Browser Mod will function completely. This does not remove the need for interaction. You can always check the need for interaction through the `video_interaction_required` and `audio_interaction_required` attributes of the `media_player` entity. For more information see [User interaction](#user-interaction).

### Full user interaction

This allows for a Full [user interaction](#user-interaction) check if required.

### Save screen state

This saves the screen state on browser disconnect and restores on browser reconnect. The screen state (on/off) and brightness are both saved. The state will be saved and restored for all browsers that have this setting applied, including those running Fully Kiosk.

---

#### Browser ID updates

While Browser Mod does its best to retain a Browser ID for browsers, it may change due to circumstances beyond Browser Mod's control (e.g. localStorage cleared due to Browser privacy settings). When a Browser ID changes, your Frontend settings tied to a Browser ID will not be applied. To be able to restore Browser ID and Frontend settings tied to the Browser ID you can follow the best practices listed below.

1. Turn off auto-register. This allows to control the register order, and also limits many new Browser IDs being registered in your environment of changing Browser IDs.
2. Don't lock the register but leave open to make the next step easy to accomplish.
3. When you need to change/revert the Browser ID, to restore Frontend settings, do the following in this exact order:
 a) Navigate to Browser Mod settings panel.
 b) Rename the automatically generated Browser ID string to be the same name as the Browser ID for existing Frontend settings you wish to apply.
 c) Enable Register toggle.

Using this method means that the new random Browser ID never has sent information to Browser Mod integration so no random Browser IDs to tidy up (though you can tidy up any rogue Browser IDs with browser_mod.deregister_browser).

---

#### User interaction

Due to Browser restrictions users may need to interact with a Browser after refresh to be able to play video/audio automatically with the media player created by Browser Mod for the Browser. Generally muted video will play automatically without needing interaction, but less so unmuted video and/or audio. To facilitate having the Browser ready to play video/audio, Browser Mod carries out interaction tests on Browser refresh. First Browser Mod checks if muted video can be played. If successful, Browser Mod next checks if unmuted video can be played. If one of these checks is not successful, Browser Mod will display an icon in the lower left of the Browser to show that user interaction is required.

![Tablet device showing interaction is required](https://github.com/user-attachments/assets/b98935b3-86e3-44bf-b745-4e0c4b6ad459)

When the user interaction icon is showing, a click/touch anywhere on the screen will cause Browser Mod to again check if video/audio can be played automatically. If successful, no further action is required. For some Browsers, user interaction is required __directly__ on an interactive element. If this is the case, a Frontend option is available to set [Full user interaction](#full-user-interaction) if required. When this Frontend setting is set for a Browser, and the need for Full user interaction is detected, users will see a full interaction screen like that shown below. To facilitate successful user interaction, click the play button shown on the media controls. If successful, a short 'pop' sound will be heard and the full interaction screen will be dismissed. If nothing happens it means there are further interaction issues and users will need to use the dismiss 'X' button to continue.

![Tablet device showing full interaction](https://github.com/user-attachments/assets/a1ce01af-091e-4618-bd8e-c50ebd05f9cf)

To allow for Full user interaction for a Browser, use the [Full user interaction](#full-user-interaction) Frontend setting.

To not have any user interaction, the user interaction icon may be hidden using a [Frontend user setting](#hide-interaction-icon). This does not remove the need for interaction. You can always check the need for interaction through the `video_interaction_required` and `audio_interaction_required` attributes of the `media_player` entity for the Browser.

In some cases Browser Mod may not be able to detect the ability to play video/audio, but it works anyhow. In this case you may get warnings in Home Assistant logs when using media_player services. You can use one of the methods below to set logging levels and/or filters for these warnings. See Home Assistant [Logger](https://www.home-assistant.io/integrations/logger/) documentation for further information.

1. _Set logging level_

    ```yaml
    logger:
      logs:
        custom_components.browser_mod.media_player: error
    ```

2. _Filter warnings_

    ```yaml
    logger:
      filters:
        custom_components.browser_mod.media_player:
          - "Unmute browser.*"
          - "Playing video in browser.*"
          - "Playing audio in browser.*"
    ```
