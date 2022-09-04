# The Browser Mod Configuration Panel

## This browser

The most important concept for Browser Mod is the _Browser_. A _Browser_ is identified by a unique `BrowserID` stored in the browsers [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

Browser Mod will initially assigning a random `BrowserID` to each _Browser_ that connects, but you can change this if you want.

LocalStorage works basically like cookies in that the information is stored locally on your device. Unlike a cookie, though, the information is bound to a URL. Therefore you may get different `BrowserID`s in the same browser if you e.g. access Home Assistant through different URLs inside and outside of your LAN, or through Home Assistant Cloud.

### Register

Registering a _Browser_ as a device will create a Home Assistant Device associated with that browser. The device has the following entities:

- A `media_player` entitiy which will play sound and video through the browser.
- A `light` entity will turn the screen on or off and controll the brightness if you are using [Fully Kiosk Browser](https://www.fully-kiosk.com/) (FKB). If you are not using FKB the function will be simulated by covering the screen with a black (or semitransparent) box.
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

This will hide the sidebar wit the navigation links. You can still access all the pages via normal links.

> Tip: add `/browser-mod` to the end of your home assistant URL when you need to turn this off again...

### Hide header

This will hide the header bar. Completely. It does not care if there are useful navigation links there or not. It's gone.

> Tip: See the big yellow warning box at the top of this card? For some reason, it seems to be really easy to forget you turned this on. Please do not bother the Home Assistant team about the header bar missing if you have hidden it yourself. Really, I've forgotten multiple times myself.

### Default dashboard

Set the default dashboard that is shown when you access `https://<your home assistant url>/` with nothing after the `/`.

> *Note:* This also of works with other pages than lovelace dashboards, like e.g. `logbook` or even `history?device_id=f112fd806f2520c76318406f98cd244e&start_date=2022-09-02T16%3A00%3A00.000Z&end_date=2022-09-02T19%3A00%3A00.000Z`.

### Sidebar order

Set the order and hidden items of the sidebar. To change this setting:

- Click the "EDIT" button
- Change the sidebar to how you want it
- DO NOT click "DONE"
- Either add a new User or Browser setting or click one of the pencil icons to overwrite an old layout
- Click the "RESTORE" button

### Sidebar title

This changes the "Home Assistant" text that is displayed at the top of the sidebar.
Accepts Jinja [templates](https://www.home-assistant.io/docs/configuration/templating/).