# browser_mod 2.0

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

What if that tablet you have on your wall could open up a live feed from your front door camera when someone rings the bell?

And what if you could use it as an extra security camera?

Or what if you could use it to play music and videos from your Home Assistant media library?

What if you could permanently hide that sidebar from your kids and lock them into a single dashboard?

What if you could change the icon of the Home Assistant tab so it doesn't look the same as the forum?

What if you could change the more-info dialog for some entity to a dashboard card of your own design?

What if you could tap a button and have Home Assistant ask you which rooms you want the roomba to vacuum?

\
&nbsp;

# Installation instructions

- **First make sure you have completely removed any installation of Browser Mod 1**

- Either

  - Find and download [Browser Mod under `integrations`](https://my.home-assistant.io/redirect/hacs_repository/?owner=thomasloven&repository=hass-browser_mod) in [HACS](https://hacs.xyz)
  - OR copy the contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Restart Home Assistant

- Add the "Browser Mod" integration in Settings -> Devices & Services -> Add Integration or click this button: [![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=browser_mod)

- Restart Home Assistant

> Note: If you are upgrading from Browser Mod 1, it is likely that you will get some errors in your log during a transition period. They will say something along the lines of `Error handling message: extra keys not allowed @ data['deviceID']`.
>
> They appear when a browser which has an old version of Browser Mod cached tries to connect and should disappear once you have cleared all your caches properly.

\
&nbsp;

# Browser Mod Configuration Panel

When you're logged in as an administrator you should see a new panel called _Browser Mod_ in the sidebar. This is where you controll any Browser Mod settings.

### See [Configuration Panel](documentation/configuration-panel.md) for more info
\
&nbsp;

# Browser Mod Services

Browser Mod has a number of services you can call to cause things to happen in the target Browser, such as opening a popup or navigating to a certain dashboard.

### See [Services](documentation/services.md) for more info
\
&nbsp;


## Popup card

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

## Browser Player

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
