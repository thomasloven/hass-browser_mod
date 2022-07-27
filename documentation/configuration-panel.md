# The Browser Mod Configuration Panel

## This browser

A basic concept for Browser Mod is the _Browser_. A _Browser_ is identified by a unique `BrowserID` stored in the browsers [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

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

## Registered Browsers

This section shows all currently registered _Browsers_ and allows you to unregister them. This is useful e.g. if a `BrowserID` has changed or if you do not have access to a device anymore.

### Register CAST browser

If you are using [Home Assistant Cast](https://www.home-assistant.io/integrations/cast/#home-assistant-cast) to display a lovelace view on a Chromecast device it will get a BrowserID of "`CAST`". Since you can't access the Browser Mod config panel from the device, clicking this button will register the `CAST` browser. Most Browser Mod services will work under Home Assistant Cast.

## Frontend Settings

This section is for settings that change the default behavior of the Home Assistant frontend.

Each setting has three levels, _Global_, _Browser_ and _User_.

- Changes made on the _Global_ tab will be applied for everyone on every browser.
- Changes made on the _Browser_ tab will be applied for this _Browser_. The settings here override any _Global_ settings.
- Changes made on the _User_ tab will be applied for the user you're currently logged in as - on any device. The settings here override any _Global_ or _Browser_ settings.

Note that if a setting is set at a lower level but _cleared_ on a higher, it is not _undone_. It's just not overridden.

Also note that _User_ level settings can only be made when logged in as the user in question, and that the Browser Mod configuration panel is only available to administrators. If you need to change a setting for a non-admin user, you will need to temporarily make them admin for the setup, and then un-admin them.

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

Note that this _only_ applies to the current favicon of the page, not any manifest icons such as the loading icon or the icon you get if you save the page to your smartphones homescreen. For those, please see the [hass-favicon](https://github.com/thomasloven/hass-favicon) integration.

### Title template

This allows you to set and dynamically update the title text of the browser tab/window by means on a Jinja [template](https://www.home-assistant.io/docs/configuration/templating/).

> Ex:
>
> ```jinja
> {{ states.persistent_notification | list | count}} - Home Assistant
> ```

### Hide Sidebar

This will hide the sidebar wit the navigation links. You can still access all the pages via normal links.

> Tip: add `/browser-mod` to the end of your home assistant URL when you need to turn this off again...

### Hide header

This will hide the header bar. Completely. It does not care if there are useful navigation links there or not. It's gone.

> Tip: See the big yellow warning box at the top of this card? For some reason, it seems to be really easy to forget you turned this on. Please do not bother the Home Assistant team about the header bar missing if you have hidden it yourself. Really, I've forgotten multiple times myself.

### Sidebar order

Did you know that you can change the order and hide items from the sidebar? To do so, either go into your profile settings at the bottom left and click "Change the order and hide items from the sidebar", or click and hold on the "Home Assistant" text at the top of the sidebar.

Normally, the order and hidden items only applies to the current device, but this will make it persistent according to the levels described above.

### Default dashboard

Like the Sidebar order, the default dashboard (the page shown when you simply access `https://<your home assistant url>/` with nothing after the `/`) can be set in your profile settings but only applies to the current device. This fixes that.