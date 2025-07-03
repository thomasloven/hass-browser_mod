# The Browser Mod Configuration Panel

## This browser

The most important concept for Browser Mod is the _Browser_. A _Browser_ is identified by a unique `BrowserID` stored in the browsers [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

Browser Mod will initially assigning a random `BrowserID` to each _Browser_ that connects, but you can change this if you want.

LocalStorage works basically like cookies in that the information is stored locally on your device. Unlike a cookie, though, the information is bound to a URL. Therefore you may get different `BrowserID`s in the same browser if you e.g. access Home Assistant through different URLs inside and outside of your LAN, or through Home Assistant Cloud.

### Register

Registering a _Browser_ as a device will create a Home Assistant Device associated with that browser. The device has the following entities:

- A `media_player` entity which will play sound and video through the browser. This entity has attributes `video_interaction_required` and `audio_interaction_required` which will be set to `true` if user interaction is required on the browser before being able to play video or audio. Generally user interaction is not required to play muted video. The `media_player` will be muted while ever user interaction is required for audio.
- A `light` entity will turn the screen on or off and control the brightness if you are using [Fully Kiosk Browser](https://www.fully-kiosk.com/) (FKB). If you are not using FKB the function will be simulated by covering the screen with a black (or semitransparent) box. There is a [Frontend Setting](#frontend-settings-admin-only) to optionally save the browser screen state for a browser.
- A motion `binary_sensor` which reacts to mouse and/or keyboard activity in the Browser. In FKB this can also react to motion in front of the devices camera.
- A number of `sensor` and `binary_sensor` entities providing different bits of information about the Browser which you may or may not find useful.

Registering a browser also enables it to act as a target for Browser Mod _services_.

### Browser ID

This box lets you set the `BrowserID` for the current _Browser_.
Note that it is possible to assign the same `BrowserID` to several browsers, but unpredictable things _may_ happen if several of them are open at the same time.
There may be benefits to using the same `BrowserID` in some cases, so you'll have to experiment with what works for you.

Browser Mod is trying hard to keep the Browser ID constant

### Enable camera

If your device has a camera, this will allow it to be forwarded as a `camera` entity to Home Assistant.

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

This allows you to set and dynamically update the title text of the browser tab/window by means on a Jinja [template](https://www.home-assistant.io/docs/configuration/templating/).

> Ex:
>
> ```jinja
> {{ states.persistent_notification | list | count}} - Home Assistant
> ```

### Favicon template

This allows you to set and dynamically update the favicon of the browser tab/window. I.e. the little icon next to the page title. Favicons can be .png or .ico files and should be placed in your `<config>/www` directory. The box here should then contain a jinja [template](https://www.home-assistant.io/docs/configuration/templating/) which resolves to the path of the icon with `<config>/www/` replaced by `/local/` (see [Hosting files](https://www.home-assistant.io/integrations/http/#hosting-files)).

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


### Hide Sidebar

This will hide the sidebar with the navigation links. You can still access all the pages via normal links.

__IMPORTANT__: When this setting is cleared, the Browser will revert to a state in which the User Setting 'Always hide the sidebar' is in effect, with the sidebar menu icon showing. The 'Always hide the sidebar' setting can be reset in User Settings.

> Tip: add `/browser-mod` to the end of your home assistant URL when you need to turn this off again...

### Hide header

This will hide the header bar. Completely. It does not care if there are useful navigation links there or not. It's gone.

> Tip: See the big yellow warning box at the top of this card? For some reason, it seems to be really easy to forget you turned this on. Please do not bother the Home Assistant team about the header bar missing if you have hidden it yourself. Really, I've forgotten multiple times myself.

### Overlay icon

Allow for an overlay icon to apear on certain Dashboards/Panels and carry out an action when clicked. Even with good Dashboard design, you can end up on a Home Assistant panel that assumes header and sidebar navigation. E.g. History Panel, Energy Dashboard. An overlay icon allows for a method to show an icon and carry out an action.

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

See [Default action](#default-action) below for tips on calling multiple actions.

__IMPORTANT__: Like actions popups and notifications, this setting DOES NOT support templates.

### Default dashboard

Set the default dashboard that is shown when you access `https://<your home assistant url>/` with nothing after the `/`.

> *Note:* 
>1. This option sets the same local setting as Home Assistants' Dashboard setting in User Settings. If this setting does not provide exactly what you are after you may wish to use a Default action with `browser_mod.navigate`.
>2. This also of works with other pages than lovelace dashboards, like e.g. `logbook` or even `history?device_id=f112fd806f2520c76318406f98cd244e&start_date=2022-09-02T16%3A00%3A00.000Z&end_date=2022-09-02T19%3A00%3A00.000Z`.

### Default action

Set the default action to be run when Browser is loaded or refreshed. This setting accepts the same action Config as per `browser_mod.popup` actions. For more information see the examples actions included in [Actionable popups](./popups.md#actionable-popups). If you are using Browser Mod [SERVICES](./services.md), in most cases you would omit `browser_id` or `user_id` so the service runs on the loading Browser.

__IMPORTANT__: Like actions popups and notifications, this setting DOES NOT support templates. 

*Tips:*
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
Accepts Jinja [templates](https://www.home-assistant.io/docs/configuration/templating/).

### Hide interaction icon

This hides the icon in the bottom right corner which indicates that you need to interact with the browser window before Browser Mod will function completely. This does not remove the need for interaction. You can always check the need for interaction through the `video_interaction_required` and `audio_interaction_required` attributes of the `media_player` entity.

### Save screen state

This saves the screen state on browser disconnect and restores on browser reconnect. The screen state (on/off) and brightness are both saved. The state will be saved and restored for all browsers that have this setting applied, including those running Fully Kiosk.
