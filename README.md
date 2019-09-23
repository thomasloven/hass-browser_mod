browser\_mod
============

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

A Home Assistant integration to turn your browser into a controllable entity - and also an audio player.

## Example uses

- Make the camera feed from your front door pop up on the tablet in your kitchen when someone rings the doorbell.
- Have a message pop up on every screen in the house when it's bedtime.
- Make the browser on your workstation switch to a specific tab when the kitchen light is on after midnight
- Play a TTS message on your work computer when the traffic sensor tells you it's time to go home.
- Display a full screen clock on your screen if no one's touched it for five minutes

For more usage examples, see the [cookbook](https://github.com/thomasloven/hass-browser_mod/wiki/Cookbook).

# Installation instructions

**NOTE: This integration requires Home Assistant version 0.95 or later**

- Copy the contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Add the following to your `configuration.yaml`:

```yaml
browser_mod:
```

- Restart Home Assistant

# Usage

## Devices
The most important concept of `browser_mod` is the *device*.

A *device* is a machine-browser combination identified by a unique `deviceID`. The `deviceID` is randomly generated and may look like `ded3b4dc-abedd098`.

- Chrome on your desktop and Chrome on your laptop are two different *devices*.
- Chrome on your laptop and Safari on your laptop are two different *devices*.
- Two tabs in Firefox on the same computer is one *device*.
- Two windows in Edge on the same computer is one *device*.

In the two latter cases, the last loaded tab/window will be the *active* one.

Note: Incognito mode will generate a new `deviceID` and thus a new *device* every time it's started.

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
This binds the *aliases* `arrakis` to `99980b13-dabc9563` and `dashboard` to `d2fc860c-16379d23`.

Note: Aliases must be unique.

## Entities
Once `browser_mod` is installed, loading up your Home Assistant frontend on a new *device* will create three or four new devices.

- `sensor.<device>`
- `media_player.<device>`
- `light.<device>`
- If you're using Fully Kiosk Browser `binary_sensor.<device>`

`<device>` here will be the `deviceID` of the *device* but with the dash (`-`) replaced by an underscore (`_`). If you've defined an alias, it will be that instead.

E.g:  
Connecting your phone with `deviceID: ded3b4dc-abedd098` will create the entities `sensor.ded3b4dc_abedd098`, `media_player.ded3b4dc_abedd098` and `light.ded3b4dc_abedd098`.  
Connecting with the computer named `Arrakis` above with `deviceID: 99980b13-dabc9563` will create the entities `sensor.arrakis`, `media_player.arrakis` and `light.arrakis`.

### sensor

The `sensor` will display the number of connected views (tabs/windows) of the device. Note that using multiple view isn't really recommended, and any action targeting a device will happen in the last loaded view.

The sensor also has the following attributes:

| attribute | content |
| --- | --- |
| `type` | `browser_mod` |
| `last_seen` | The time when the *device* was last seen |
| `deviceID` | The deviceID of the *device*. |
| `path` | The currently displayed path on the *device*. |
| `visibility` | Whether the frontend is currently visible on the *device*. |
| `userAgent` | The User Agent of the associated browser. |
| `currentUser` | The user currently logged in on the *device*. |
| `fullyKiosk` | True if the *device* is a Fully Kiosk browser. Undefined otherwise. |
| `width` | The current width of the browser window in pixels. |
| `height` | The current height of the browser window in pixels. |

### media\_player

The `media_player` can be used to play sounds on the *device*.

**NOTE: Because Apple is Apple; on iOS you need to touch the screen once after loading the frontend before any playback will work.**

### light

The `light` can be used to blackout the screen.
For Fully Kiosk Browser, the screen will actually turn off.
For other browsers, the interface will just be covered with black (the screen is still on, will have a visible glow in the dark, and you won't save any battery).

### binary\_sensor

The `binary_sensor` will only be available for Fully Kiosk Browser PRO *devices*.
It's state will be the state of the camera motion detector of the *device* (5 second cooldown).

## `browser_mod.command` service

Call the `browser_mod.command` service to control your *device* in various ways.

All service calls have two parameters in common, `command` which is the command to execute, and `deviceID` which is a list of *devices* to execute the command on. If `deviceID` is omitted, the command will be executed on **all** currently connected *devices*. `deviceID` may also contain aliases.

There is a special function that will replace the special alias `this` with the current deviceID in the list `deviceID` for any service call from the frontend. In the examples below it will be shown used for the `browser_mod.command` service, but it also works e.g for calling scripts from the frontend.

All examples below are given in the syntax used for calling them from lovelace via e.g. an entity-button card with `tap_action:` set to `call-service`. If you call the service from a script or an automation, the syntax will be slightly different.

### debug

```
service: browser_mod.command
service_data:
  command: debug
```

Display a popup with the deviceID *and* a javascript alert with the deviceID on all connected *devices*.

### set-theme

```
service: browser_mod.command
service_data:
  command: set-theme
  theme: clear_light
```

will set the current theme to `clear_light` on all devices.

### navigate
```
service: browser_mod.command
service_data:
  command: navigate
  navigation_path: /lovelace/1
  deviceID:
    - ded3b4dc-abedd098
```

will open your second lovelace view on just the *device* `ded3b4dc-abedd098`.

Note: `navigation_path` does not have to be a lovelace path. All paths in Home Assistant works. (E.g. `/states`, `/dev-info`, `/map`)

### more-info
```
service: browser_mod.command
service_data:
  command: more-info
  entity_id: camera.front_door
  deviceID:
    - ded3b4dc-abedd098
    - dashboard
```

will show the more-info dialog of `camera.front_door` on the *devices* `ded3b4dc-abedd098` and `dashboard`.

The optional parameter `large: true` will make the popup wider.

### popup
```
service: browser_mod.command
service_data:
  command: popup
  title: Popup example
  card:
    type: entities
    entities:
      - light.bed_light
      - light.kitchen_lights
      - light.ceiling_lights
  deviceID:
    - this
```

will display the specified `entities` card as a popup on the current device.

![popup-example](https://user-images.githubusercontent.com/1299821/60288984-a7cb6b00-9915-11e9-9322-324323a9ec6e.png)

The optional parameter `large: true` will make the popup wider.  
The optional parameter `style:` will apply CSS style options to the popup.  
The optional parameter `auto_close: true` will make the popup close automatically when the mouse is moved or a key is pressed on the keyboard. This also removes the header bar.  
The optional parameter `time:` (only useable if `auto_close: true` is also set) will turn the popup into a "screensaver". See the `blackout` command below.  

Ex:
```yaml
  style:
    border-radius: 20px
    --ha-card-border-radius: 20px
    --ha-card-background: red
```

Note: Sometimes this doesn't work if the *device* is not currently displaying a lovelace path. I'm looking into that...

### close-popup
```
service: browser_mod.command
service_data:
  command: close-popup
```

will close all more-info dialogs and popups that are open on all connected *devices*.

### blackout
```
service: browser_mod.command
service_data:
  command: blackout
```

Will cover the entire window (or screen if in full screen mode) with black.
Moving the mouse, touching the screen or pressing any key will restore the view.

The optional parameter `time:` will make the blackout turn on automatically after the specified number of seconds. It works kind of like a screensaver and will keep turning on until `blackout` is called again with `time: -1`.

Note: This will *not* turn off your screen backlight. Most screens will still emit light in a dark room.

### no-blackout
```
service: browser_mod.command
service_data:
  command: no-blackout
```

Remove a blackout.
The optional parameter `brightness` will set the screen brightness of a device running Fully Kiosk Browser to a value between 0 and 255.

### lovelace-reload
```
service: browser_mod.command
service_data:
  command: lovelace-reload
```

Refreshes the lovelace config. Same as clicking "Refresh" in the top right menu in lovelace.


## `browser-player` card

To control the playback in the current *device*, `browser_mod` includes a custom lovelace card. Just add

```yaml
type: custom:browser-player
```

anywhere in your lovelace configuration.

The player card also displays the `entityID`. Click it to select, so you can copy it.

![browser-player](https://user-images.githubusercontent.com/1299821/60288980-a4d07a80-9915-11e9-88ba-e078a3aa24f4.png)

# Fully Kiosk Browser
If you are using a device running [Fully Kiosk Browser](https://www.ozerov.de/fully-kiosk-browser/) (PLUS version only) you will have access to a few more functions.

First of all the commands `blackout` and `no-blackout` will control the devices screen directly.
`no-blackout` also has an optional parameter `brightness` that can set the screen brightness between 0 and 255.

Second, there are a few more attributes available

| attribute | content |
| --- | --- |
| `fullyKiosk` | True. |
| `brightness` | The current screen brightness. |
| `battery` | The current charge percentage of the devices battery. |
| `charging` | Whether the battery is currently charging. |
| `motion` | Whether the devices camera has detected any motion in the last five seconds. |

# Support

[Home Assistant community forum thread](https://community.home-assistant.io/t/browser-mod-turn-your-browser-into-a-controllable-device-and-a-media-player/123806)

# FAQ

### Does this replace lovelace-player and lovelace-browser-commander
Yes.

Some improvements

- With the backend support `browser_mod` does the same things as both of those, but better.
- Since `browser_mod` uses a service for executing commands rather than events, the commands can be easily triggered by any lovelace element which has a `tap_action` setting.
This actually means it pretty much replaces `popup-card` as well.
- `browser_mod` uses websockets to get immediate feedback from the *device* to the backend and much better tracking of disconnects.
- *Aliases*. 'nuff said.
- `browser_mod` works outside of `/lovelace`.
- This works even if the currently logged in user is not in the admin group.

### Does this replace lovelace-fullykiosk
Yes. You need the paid version, btw.

### Can the deviceID be used to track me across the internet

No\*. The device is stored in your browsers localStorage - a data store which is sandboxed only to Home Assistant. That means only Home Assistant can access it. Furthermore, different Home Assistant installations cannot acces each others localStorage.

Some of [my lovelace plugins](https://github.com/thomasloven/hass-config/wiki/My-Lovelace-Plugins) use the device to do different things for different *devices*.

**\*: There is one exception. If you are using [Fully Kiosk Browser](https://www.ozerov.de/fully-kiosk-browser/), the deviceID is taken from the browser instead of being randomly generated. This deviceID will be the same for each website that asks for it.**

### How do I run commands from /dev-service?

`/dev-service` requires json-formatted service data. There's an explanation on the differences between yaml and json [here](http://thomasloven.com/blog/2018/08/YAML-For-Nonprogrammers/).

---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
