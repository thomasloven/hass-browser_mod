# browser_mod

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

A Home Assistant integration to turn your browser into a controllable entity - and also an audio player and a security camera (WIP).

## Example uses

- Make the camera feed from your front door pop up on the tablet in your kitchen when someone rings the doorbell.
- Have a message pop up on every screen in the house when it's bedtime.
- Make the browser on your workstation switch to a specific tab when the kitchen light is on after midnight
- Play a TTS message on your work computer when the traffic sensor tells you it's time to go home.
- Display a full screen clock on your screen if no one's touched it for five minutes

For more usage examples, see the [cookbook](https://github.com/thomasloven/hass-browser_mod/wiki/Cookbook).

# Installation instructions

- Copy the contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Add the following to your `configuration.yaml`:

```yaml
browser_mod:
```

- Restart Home Assistant

> Note: If you want to use browser_mod with Home Assistant Cast, you need to also add:
>
> ```yaml
> resources:
>   - url: /browser_mod.js
>     type: module
> ```
>
> to your `ui_lovelace.yaml`.
> Don't worry about where to put browser_mod.js, the integration will handle that automatically, and please note that it's **not** `/local/browser_mod.js`.

# Usage

Here's a fantastic video summary of all `browser_mod` functions by Pinkywafer: [Youtube link](https://www.youtube.com/watch?v=atpIP2RYldA).

## Devices

The most important concept of `browser_mod` is the _device_.

A _device_ is a machine-browser combination identified by a unique `deviceID`. The `deviceID` is randomly generated and may look like `ded3b4dc-abedd098`.

- Chrome on your desktop and Chrome on your laptop are two different _devices_.
- Chrome on your laptop and Safari on your laptop are two different _devices_.
- Two tabs in Firefox on the same computer is one _device_.
- Two windows in Edge on the same computer is one _device_.

In the two latter cases, the last loaded tab/window will be the _active_ one.

Note: Incognito mode will generate a new `deviceID` and thus a new _device_ every time it's started.

### Aliases

Since the deviceID can be a bit hard to remember for devices you use often, you can specify an alias in `configuration.yaml`

```yaml
browser_mod:
  devices:
    99980b13-dabc9563:
      name: arrakis
    d2fc860c-16379d23:
      name: dashboard
```

This binds the _aliases_ `arrakis` to `99980b13-dabc9563` and `dashboard` to `d2fc860c-16379d23`.

Note: Aliases must be unique.

#### Changing deviceID

You can change the deviceID of your device by adding a `browser-player` card to your lovelace interface and clicking the deviceID at the bottom of the card. Set it to `clear` to generate a new random one.

You can also set a deviceID by adding `?deviceID=mydeviceID` to the end of the URL you're using to access Home Assistant. Be careful - I have no idea what could happen if several devices were to have the same ID.
Use `?deviceID=clear` to generate a new random one.

**Take care to avoid deviceID collissions. There's no telling what could happen if more devices share the same ID.**

### Prefix

You can add a custom prefix to all entity ids in `configuration.yaml`:

E.g. to give entities default names like `media_player.browser_99980b13_dabc9563` add:

```yaml
browser_mod:
  prefix: "browser_"
```

This does not apply to devices with an alias.

### Disabling entities

`browser_mod` creates a number of entities, which is explained below. In some cases, you may not want to do that. If so, add a list of entity types you do _not_ want to add to a `disable` section, either for each device, or globally to ignore for all unknown devices:

E.g. to disable the `light` and `media_player` for the device aliased to `arrakis`, AND disable _all_ entities for all devices which _don't_ have an alias:

```yaml
browser_mod:
  devices:
    99980b13-dabc9563:
      name: arrakis
      disable:
        - light
        - media_player
  disable:
    - all
```

## Entities

Once `browser_mod` is installed, loading up your Home Assistant frontend on a new _device_ will create three to five new devices.

- `sensor.<device>`
- `media_player.<device>`
- `light.<device>`
- If you've enabled it: `camera.<device>`
- If you're using Fully Kiosk Browser: `binary_sensor.<device>`

`<device>` here will be the `deviceID` of the _device_ but with the dash (`-`) replaced by an underscore (`_`). If you've defined an alias, it will be that instead.

E.g:
Connecting your phone with `deviceID: ded3b4dc-abedd098` will create the entities `sensor.ded3b4dc_abedd098`, `media_player.ded3b4dc_abedd098` and `light.ded3b4dc_abedd098`.
Connecting with the computer named `Arrakis` above with `deviceID: 99980b13-dabc9563` will create the entities `sensor.arrakis`, `media_player.arrakis` and `light.arrakis`.

<details><summary>sensor</summary>
The `sensor` will display the number of connected views (tabs/windows) of the device. Note that using multiple view isn't really recommended, and any action targeting a device will happen in the last loaded view.

The sensor also has the following attributes:

| attribute       | content                                                             |
| --------------- | ------------------------------------------------------------------- |
| `type`          | `browser_mod`                                                       |
| `last_seen`     | The time when the _device_ was last seen                            |
| `deviceID`      | The deviceID of the _device_.                                       |
| `path`          | The currently displayed path on the _device_.                       |
| `visibility`    | Whether the frontend is currently visible on the _device_.          |
| `userAgent`     | The User Agent of the associated browser.                           |
| `currentUser`   | The user currently logged in on the _device_.                       |
| `fullyKiosk`    | True if the _device_ is a Fully Kiosk browser. Undefined otherwise. |
| `width`         | The current width of the browser window in pixels.                  |
| `height`        | The current height of the browser window in pixels.                 |
| `battery_level` | The current battery level of your device - if supported             |
| `charging`      | The current charging state of your device - if supported            |

</details>

<details><summary>media_player</summary>
The `media_player` can be used to play sounds on the _device_.

**NOTE: Because Apple is Apple; on iOS you need to touch the screen once after loading the frontend before any playback will work.**

</details>

<details><summary>light</summary>
The `light` can be used to blackout the screen.
For Fully Kiosk Browser, the screen will actually turn off.
For other browsers, the interface will just be covered with black (the screen is still on, will have a visible glow in the dark, and you won't save any battery).
</details>

<details><summary>camera</summary>
For security and UX reasons, the camera must be enabled manually on a device by device basis.

> **NOTE:** Browser only allow access to the camera in secure contexts (since 2019). That means it only works if you access Home Assistant through `https://`, NOT `http://` or through `localhost`.

Enabling the camera is done by adding `camera: true` to the devices configuration in `configuration.yaml`:

```yaml
browser_mod:
  devices:
    99980b13-dabc9563:
      name: arrakis
      camera: true
    d2fc860c-16379d23:
      name: dashboard
```

After restarting Home Assistant (and [clearing cache](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins#clearing-cache)), the next time you load your interface your browser will ask you if you want Home Assistant to be able to access your camera. Some browsers (e.g. mobile Safari) will ask every time you make a hard refresh.

Be aware that keeping the camera on may make your device run hot and drain your battery.

For Fully Kiosk Browser, the camera requires Motion Detection (PLUS) to be enabled, and will only appear for the first time once motion has been detected. It does not need to be enabled in the configuration, though.

</details>

<details><summary>binary_sensor</summary>
The `binary_sensor` will only be available for Fully Kiosk Browser PRO _devices_.
It's state will be the state of the camera motion detector of the _device_ (5 second cooldown).
</details>

## Commands

`browser_mod` has a number of commands that will perform various things for one or many _devices_.

### Calling commands

There are three ways of calling commands.

<details><summary>From the backend</summary>
This is how commands are called from scripts or automations.

```yaml
service: browser_mod.<command>
data:
  parameter: value
  other_parameter: other value
  deviceID:
    - device1
    - device2
```

Note that `parameter` and `other_parameter` etc. depends on the command, but `deviceID` (which is optional) is available for all commands unless otherwise stated.

`deviceID` shall be a list of device IDs that the command will be run on. \
If `deviceID` is not specified, the command will be run on ALL connected _devices_.

</details>

<details><summary>From the frontend via call-service</summary>
This is the same configuration as above, but for use in lovelace configurations, e.g. a [button card](https://www.home-assistant.io/lovelace/button/#tap-action).

```yaml
tap_action:
  action: call-service
  service: browser_mod.<command>
  service_data:
    parameter: value
    other_parameter: other value
    deviceID:
      - device1
      - device2
```

If `deviceID` is not specified, the command will be run on ALL connected _devices_.

</details>

<details><summary>From the frontend via fire-dom-event</summary>
When using this as a `tap_action`, the command will be run on ONLY the _device_ the command that was tapped.

`deviceID` will be ignored.

```yaml
tap_action:
  action: fire-dom-event
  browser_mod:
    command: <command>
    parameter: value
    other_parameter: other value
```

> Note: This works for [`tap_action`, `hold_action` and `double_tap_action`](https://www.home-assistant.io/lovelace/actions/) for all core Lovelace cards, but may not be supported by all custom cards yet.

</details>

&nbsp;

### Available commands

<details><summary>debug</summary>
Display a popup with the deviceID _and_ a javascript alert with the deviceID on all connected _devices_.

```yaml
service: browser_mod.debug
```

</details>

<details><summary>set_theme</summary>
Set the current theme.

This changes the _frontend_ setting - the same as if you click your initials in the bottom left corner and pick a theme from there.

Parameters:

- `theme` - the name of the theme to set
- `dark` - true to enable dark mode, false to enable light mode, auto to follow the browser's setting. Only applicable to themes that support dark mode.

```yaml
service: browser_mod.set_theme
data:
  theme: clear_light
  dark: true
```

</details>

<details><summary>navigate</summary>
Navigate to a different view or panel.

Works like the `navigate` `tap_action`.

Parameters:

- `navigation_path` - the path to navigate to

```yaml
service: browser_mod.navigate
data:
  navigation_path: /lovelace/1
```

Note: `navigation_path` does not have to be a lovelace path. All paths in Home Assistant works. (E.g. `/states`, `/dev-info`, `/map`)

</details>

<details><summary>more_info</summary>
Displays the more-info dialog for an entity.

Parameters:

- `entity_id` - the entity whose more-info dialog should be opened.
- `large` - if set to `true` will make the popup wider. (**optional**, default: `false`)

```yaml
service: browser_mod.more_info
data:
  entity_id: camera.front_door
```

</details>

<details><summary>toast</summary>
Display a notification toast.

Parameters:

- `message` - the message to display
- `duration` - time in ms the toast is shown. (**optional**, default: 3000)

```yaml
service: browser_mod.toast
data:
  message: Short message
```

</details>

<details><summary>popup</summary>
Display a lovelace card as a popup over the interface.

Parameters:

- `title` - heading text
- `card` - Lovelace card configuration
- `large` - if set to `true` will make the popup wider. (**optional**, default: `false`)
- `hide_header` - if set to `true` will hide the header bar and close button (**optional**, default: `false`)
- `auto_close` - if set to `true` the popup will close automatically when the mouse or keyboard is touched. Also hides the header. (**optional**, default: `false`)
- `time` - if used with `auto_close` will turn the popup into a "screensaver". See the `blackout` command
- `style` - see below

```yaml
service: browser_mod.popup
data:
  title: Popup example
  card:
    type: entities
    entities:
      - light.bed_light
      - light.kitchen_lights
      - light.ceiling_lights
```

![popup-example](https://user-images.githubusercontent.com/1299821/60288984-a7cb6b00-9915-11e9-9322-324323a9ec6e.png)

If [card-mod](https://github.com/thomasloven/lovelace-card-mod) is installed, the popup can be styled by the optional `style` parameter, or by the `card-mod-more-info[-yaml]` theme variable.

</details>

<details><summary>close_popup</summary>
Will close all more-info dialogs and popups that are open.

```yaml
service: browser_mod.close_popup
```

</details>

<details><summary>blackout</summary>
Will cover the entire browser window with a black box. \
Moving the mouse, touching the screen or pressing any key will restore the view.

> Note: This will _not_ turn off your screen backlight. Most screens will still emit light in a dark room.

Parameters:

- `time` - if set, the blackout will turn on automatically after this many seconds of inactivity. Kind of like a screensaver. Call the `blackout` command with `time` set to `-1` to disable. (**Optional**, default: None)

```yaml
service: browser_mod.blackout
```

</details>

<details><summary>no_blackout</summary>
Remove a blackout.

Parameters:

- `brightness` - will set the screen brightness in Fully Kiosk Browser to a value between 0 and 255 (**Optional**, default: none)

```yaml
service: browser_mod.no_blackout
```

</details>

<details><summary>lovelace_reload</summary>
Refreshes the lovelace config. Same as clicking "Refresh" in the top right menu in lovelace.

```yaml
service: browser_mod.lovelace_reload
```

</details>

<details><summary>window_reload</summary>
Forces the browser to reload the page. Same as clicking your browser's refresh button.

> Note: This is not guaranteed to clear the frontend cache.

```yaml
service: browser_mod.window_reload
```

</details>

<details><summary>command</summary>
This command is deprecated and left in for backwards compatibility
</details>

<details><summary>commands</summary>
Command**s** with an **s**. Will call a list of commands consecutively.

This is mostly useful with the `fire-dom-event` method of calling commands.

Parameters:

- `commands` - list of `browser_mod` commands to perform.

```yaml
service: browser_mod.commands
data:
  commands:
    - command: <command>
      <parameters>
    - command: <command>
      <parameters>
```

</details>

<details><summary>delay</summary>
Do nothing for a specified time.
Most useful with the `commands` command.

Parameters:

- `seconds` - number of seconds to wait

```yaml
service: browser_mod.commands
data:
  commands:
    - command: blackout
    - command: delay
      seconds: 5
    - command: no_blackout
```

</details>

<details><summary>call_service</summary>
This command is **only** runnable through `fire-dom-event`.
Will call a Home Assistant service but will replace `deviceID: this` with the deviceID of the current _device_.

Parameters:

- `service` - the service to call
- `service_data` - data for the service

```yaml
command: call-service
service: script.do_stuff
service_data:
  some_variable: 42
  deviceID: this
```

Example script:

```yaml
sequence:
  - service: system_log.write
    data:
      message: "The do_stuff script was called from the device {{ deviceID }}"
```

</details>

# `browser-player` card

To control the playback in the current _device_, `browser_mod` includes a custom lovelace card. Just add

```yaml
type: custom:browser-player
```

anywhere in your lovelace configuration.

The player card also displays the `entityID`. Click it to change it.

![browser-player](https://user-images.githubusercontent.com/1299821/60288980-a4d07a80-9915-11e9-88ba-e078a3aa24f4.png)

# Fully Kiosk Browser

If you are using a device running [Fully Kiosk Browser](https://www.ozerov.de/fully-kiosk-browser/) (PLUS version only) you will have access to a few more functions.

For this to work you need to activate `Settings->Advanced Web Settings->Javascript Interface (PLUS)` and `Settings->Motion Detection (PLUS)->Enable Visual Motion Detection`.

First of all the commands `blackout` and `no-blackout` will control the devices screen directly.
`no-blackout` also has an optional parameter `brightness` that can set the screen brightness between 0 and 255.

Second, there are a few more attributes available

| attribute       | content                                                                      |
| --------------- | ---------------------------------------------------------------------------- |
| `fullyKiosk`    | True.                                                                        |
| `brightness`    | The current screen brightness.                                               |
| `battery_level` | The current charge percentage of the devices battery.                        |
| `charging`      | Whether the battery is currently charging.                                   |
| `motion`        | Whether the devices camera has detected any motion in the last five seconds. |

# Replacing more-info dialogs

With browser_mod, you can replace any more-info dialog with any lovelace card you choose yourself. This can be done either per lovelace view, or globally (even outside of lovelace).

The replacement is included in your lovelace or lovelace view configuration, and the syntax is exactly like the `popup` service, except you can't use `auto_close` or `time`.

Ex:

```yaml
views:
  - title: Home view
    icon: mdi:house
    popup_cards:
      light.ceiling_light:
        title: My popup
        card:
          type: entities
          entities:
            - light.ceiling_light_bulb1
            - light.ceiling_light_bulb2
            - light.ceiling_light_bulb3
            - light.ceiling_light_bulb4
```

This would show an entities card with four bulbs any time the more-info dialog for `light.ceiling_light` would normally be shown when you're on the Home view in lovelace.

```yaml
title: My home
resources:
  - url: /local/card-mod.js
    type: module
popup_cards:
  sensor.sensor1:
    title: First sensor
    card:
      type: gauge
      entity: sensor.sensor1
  sensor.sensor2:
    title: Second sensor
    card:
      type: gauge
      entity: sensor.sensor2
```

This would replace the more-info dialogs of `sensor.sensor1` and `sensor.sensor2` anywhere in your interface. Even outside of lovelace - be careful about that.

# Support

[Home Assistant community forum thread](https://community.home-assistant.io/t/browser-mod-turn-your-browser-into-a-controllable-device-and-a-media-player/123806)

# FAQ

### Where can I find my deviceID?

The easiest way is to go to `/developer-tools/service` and call the `browser_mod.debug` service.

But you can also find the device id on the `browser-player` card, if you added one to your lovelace config.

An alternative way is to type `localStorage["lovelace-player-device-id"]` into your browsers console.

### Does this replace lovelace-player and lovelace-browser-commander

Yes.

Some improvements

- With the backend support `browser_mod` does the same things as both of those, but better.
- Since `browser_mod` uses a service for executing commands rather than events, the commands can be easily triggered by any lovelace element which has a `tap_action` setting.
  This actually means it pretty much replaces `popup-card` as well.
- `browser_mod` uses websockets to get immediate feedback from the _device_ to the backend and much better tracking of disconnects.
- _Aliases_. 'nuff said.
- `browser_mod` works outside of `/lovelace`.
- This works even if the currently logged in user is not in the admin group.

### Does this replace lovelace-fullykiosk

Yes. You need the paid version, btw.

### Can the deviceID be used to track me across the internet

No\*. The device is stored in your browsers localStorage - a data store which is sandboxed only to Home Assistant. That means only Home Assistant can access it. Furthermore, different Home Assistant installations cannot acces each others localStorage.

Some of [my lovelace plugins](https://github.com/thomasloven/hass-config/wiki/My-Lovelace-Plugins) use the device to do different things for different _devices_.

> _\*There is one exception. If you are using [Fully Kiosk Browser](https://www.ozerov.de/fully-kiosk-browser/), the deviceID is taken from the browser instead of being randomly generated. This deviceID will be the same for each website that asks for it._

### My Fully Kiosk Browser device goes unavailable after the screen has been turned off for five minutes

This seems to be a problem with Android, and not much to do about it.
As a workaround you can add the following to your configuration:

```yaml
browser_mod:
  devices:
    d2fc860c-16379d23: # DeviceID of your FKB device
      force_stay_awake: true
```

That will make the screen turn on and off again for a second regularly to stop the five minute timer from running out.

Optionally, you can make the screen black by using the Screensaver instead of turning the screen off. In that case, you can set the `light` entity to control and respond to the screensaver rather than the screen state through:

```yaml
browser_mod:
  devices:
    d2fc860c-16379d23: # DeviceID of your FKB device
      screensaver: true
```

---

<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
