# browser_mod 2.0

# Installation instructions

- **First make sure you have completely removed any installation of Browser Mod 1**

- Either

  - ~~Find and install Browser Mod under `integrations`in [HACS](https://hacs.xyz)~~
  - OR copy the contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Restart Home Assistant

- Add the "Browser Mod" integration in Settings -> Devices & Services -> Add Integration or click this button: [![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=browser_mod)

- Restart Home Assistant

# Browser Mod Configuration Panel

When you're logged in as an administrator you should see a new panel called _Browser Mod_ in the sidebar. This is where you controll any Browser Mod settings.

## See [Configuration Panel](documentation/configuration-panel.md) for more info

# Browser Mod Services

Browser Mod has a number of services you can call to cause things to happen in the target Browser.

## See [Services](documentation/services.md) for more info

### Calling services

Services can be called from the backend using the normal service call procedures. Registered Browsers can be selected as targets through their device:
![A picture exemplifying setting up a browser_mod.more_info service call in the GUI editor](https://user-images.githubusercontent.com/1299821/180668350-1cbe751d-615d-4102-b939-e49e9cd2ca74.png)

In yaml, the BrowserID can be used for targeting a specific browser:

```yaml
service: browser_mod.more_info
data:
  entity: light.bed_light
  browser_id:
    - 79be65e8-f06c78f
```

If no target or `browser_id` is specified, the service will target all registerd Browsers.

To call a service from a dashboard use the call-service [action](https://www.home-assistant.io/dashboards/actions/) or the special action `fire-dom-event`:

```yaml
tap_action:
  action: fire-dom-event
  browser_mod:
    service: browser_mod.more_info
    data:
      entity: light.bed_light
```

Services called via `fire-dom-event` or called as a part of a different service call will (by default) _only_ target the current Browser (even if it's not registered).

# Popup card

A popup card can be used to replace the more-info dialog of an entity with something of your choosing.

To use it, add a "Custom: Popup card" to a dashboard view via the GUI, pick the entity you want to override, configure the card and set up the popup like for the [`browser_mod.popup` service](documentation/services.md).

The card will be visible only while you're in Edit mode.

As long as the popup card is (would be) visible, i.e. you stay on the same view;
whenever the more-info dialog for the entitiy you selected would be opened, the popup card will be shown instead.

Yaml configuration:

```yaml
type: custom:popup-card
entity: <entity id>
card:
  type: ...etc...
[any parameter from the browser_mod.popup service call except "content"]
```

> *Note:* It's advisable to use a `fire-dom-event` tap action instead as far as possible. Popup card is for the few cases where that's not possible. See [`services`](documentation/services.md) for more info.

# Browser Player

Browser player is a card that allows you to controll the volume and playback on the current Browsers media player.

Add it to a dashboard via the GUI or through yaml:

```yaml
type: custom:browser-player
```


# FAQ

### **Why doesn't ANYTHING that used to work with Browser Mod 1.0 work with Browser Mod 2.0?**

Browser Mod 2.0 has been rewritten ENTIRELY from the ground up. This allows it to be more stable and less resource intensive. At the same time I took the opportunity to rename a lot of things in ways that are more consistent with Home Assistant nomenclature.

In short, things are hopefully much easier now for new users of Browser Mod at the unfortunate cost of a one-time inconvenience for veteran expert users such as yourself.

### **Why does my Browser ID keep changing?**
There's just no way around this. I've used every trick in the book and invented a handful of new ones in order to save the Browser ID as far as possible. It should be much better in Browser Mod 2.0 than earlier, but it's still not perfect. At least it's easy to change it back now...

---

<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
