# browser_mod 2

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

What if that tablet you have on your wall could open up a live feed from your front door camera when someone rings the bell?

And what if you could use it as an extra security camera?

Or what if you could use it to play music and videos from your Home Assistant media library?

What if you could permanently hide that sidebar from your kids and lock them into a single dashboard?

What if you could change the icon of the Home Assistant tab so it doesn't look the same as the forum?

What if you could change the more-info dialog for some entity to a dashboard card of your own design?

What if you could tap a button and have Home Assistant ask you which rooms you want the roomba to vacuum?

# Installation instructions

- **First make sure you have completely removed any installation of Browser Mod 1** \
  I.e. remove `browser_mod:` from your configuration.yaml and delete the integration from the integrations page.

- Either

  - Find and download [Browser Mod under `integrations`](https://my.home-assistant.io/redirect/hacs_repository/?owner=thomasloven&repository=hass-browser_mod) in [HACS](https://hacs.xyz)
  - OR copy the contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Restart Home Assistant

- Add the "Browser Mod" integration in Settings -> Devices & Services -> Add Integration or click this button: [![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=browser_mod)

- Restart Home Assistant

# Upgrading

- Upgrade via [HACS](https://hacs.xyz) or copy new contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Restart Home Assistant. If you are upgrading via [HACS](https://hacs.xyz) you will get a repair item to restart Home Assistant.

- After restarting Home Assistant, all Browsers will need a reload to download the latest version of Browser Mod javascript file. Version 2.4.0 includes a notification when a Browser version mismatch is detected, so from 2.4.x onwards simply clicking __Reload__ should be sufficient. If you keep getting the notification, you may need to do a hard Browser reload `SHIFT+F5` or in some cases [clear your Browser cache](https://github.com/thomasloven/hass-config/wiki/Clearing-your-browser-cache).

> Note: If you are upgrading from Browser Mod 1, it is likely that you will get some errors in your log during a transition period. They will say something along the lines of `Error handling message: extra keys not allowed @ data['deviceID']`.
>
> They appear when a browser which has an old version of Browser Mod cached tries to connect and should disappear once you have cleared all your caches properly.


# Quickstart

1. [Install browser mod](#installation-instructions)
2. Thoroughly [clear your browser cache](https://github.com/thomasloven/hass-config/wiki/Clearing-your-browser-cache)
3. Go to the Browser Mod panel in your sidebar
4. Make sure the "Register" toggle is checked.\
  **This is required in order to enable backend services to target this browser.**
5. Refresh the page (F5)
6. Go to Developer Tools -> Services [![Open your Home Assistant instance and show your service developer tools.](https://my.home-assistant.io/badges/developer_services.svg)](https://my.home-assistant.io/redirect/developer_services/)
7. Select service "Browser Mod: popup (browser_mod.popup)"
8. Check the "Title" checkbar and write something as a title
9. Enter some text in the "Content" text box\
  Not yaml or anything, just any text for now.
10. Click "CALL SERVICE" \
  The button is likely grayed out. That's a Home Assistant visual bug. Click it anyway.
11. A popup dialog should now open on all your Registered Browsers.

![Screenshot of a popup dialog according to the setup above](https://user-images.githubusercontent.com/1299821/188604118-ed2ad79c-0286-4392-b7be-cbc9c3f2ffd8.png)


Here's a great overview of the functionality by [Smart Home Scene](https://smarthomescene.com/guides/how-to-setup-browser-mod-2-0-in-home-assistant/).


\
&nbsp; \
&nbsp;

# Browser Mod Configuration Panel

After installing Browser Mod you should see a new panel called _Browser Mod_ in the sidebar. This is where you control any Browser Mod settings.

### See [Configuration Panel](documentation/configuration-panel.md) for more info
\
&nbsp;

# Browser Mod Services

Browser Mod has a number of services you can call to cause things to happen in the target Browser, such as opening a popup or navigating to a certain dashboard.

### See [Services](documentation/services.md) for more info
\
&nbsp;


## Popup card

Popup cards can be used to replace the more-info dialog of an entity, or to be used as a template for [`browser_mod.popup` service](documentation/services.md), or both!

### Popup card - replace more-info dialog of an entity

You can use a popup card to replace the built-in more-info dialog. When you open a more-info dialog for an entity that matches the popup card's target filter, the popup card will be shown instead of the built-in more-info dialog. The popup card's target filter can be one or more of entity id, area, label, or device.

To use it, add a "Custom: Popup card" to a dashboard view via the GUI, pick the targets (entity, area, label, device) for entities whose more-info dialog you want to replace, then configure the card and set up the popup like for the [`browser_mod.popup` service](documentation/services.md).

The card will be visible only while you're in Edit mode.

Custom popup cards are either local to the current Dashboard view (default) or can be used across all views of the Dashboard. Use the `Popup card is available for use in all views` GUI switch or `popup_card_all_views` optional parameter in Yaml. Using global view custom popup cards allows you to use a sub view to store your custom popup cards for a Dashboard, if that fits your use case.

Using wide targets (label, area, device) and/or popup cards which are global to a view, allows for much customisation of more-info dialog to suit most cases.

Yaml configuration:

```yaml
type: custom:popup-card
[entity: <entity_id> ]
target:
  [entity_id: <entity_id> ]
  [area_id: <area-id>     ]
  [label_id: <label-id>   ]
  [device_id: <device-d>  ]
card:
  type: ...etc...
[popup_card_all_views: [true/FALSE]]
[any parameter from the browser_mod.popup service call except "content"]
```

| | |
|---|---|
|`type`| Always `custom:popup-card` |
|`entity`| Old style single entity target. While using old style `entity` is fully supported, it will not show in the GUI editor if `entity` is not in the current popup card config. In this case add an entity to `target`. |
|`target`| When configured in the UI, this uses the Home Assistant target selector. The popup card will be used for more-info replacement for an entity matching any of the target entitys, areas, labels or devices. |
|`entity_id`| A single entity id or list of entity id's. The popup card will be used as an more-info replacement for all listed entities. |
|`area_id`| A single area id or list of area id's. The popup card will be used as a more-info replacement for entities in these areas. |
|`labels_id`| A single label id or list of label id's. The popup card will be used as a more-info replacement for entities with these labels. |
|`device_id`| A single device id or list of devices id's. The popup card will be used as a more-info replacement for entities of these devices. |

### Popup card - template for popup service

A popup card can be used as a template for [`browser_mod.popup` service](documentation/services.md).

To use it, add a "Custom: Popup card" to a dashboard view via the GUI, set the Popup-card ID, then configure the card and set up the popup like for the [`browser_mod.popup` service](documentation/services.md).

The card will be visible only while you're in Edit mode.

Yaml configuration:

```yaml
type: custom:popup-card
[popup_card_id: <popup-card ID>]
card:
  type: ...etc...
[any parameter from the browser_mod.popup service call except "content"]
```

Usgae:

```yaml
...
tap_action:
  action: perform-action
  perform_action: browser_mod.popup
  data:
    popup_card_id: <popup-card ID>
```

| | |
|---|---|
|`type`| Always `custom:popup-card` |
|`popup_card_id`| The Popup-card ID of a `custom:popup-card` which exists in a dashboard. If calling via a [*browser* call](documentation/services.md#a-note-about-targets) you can use the Popup-card ID of the card directly if the card exists in the same dashboard the *browser* call is being made from. In all other cases, including all [*server* calls](documentation/services.md#a-note-about-targets), you need to specify both the dashboard url(*) and the Popup-card ID using the format `<dashboard-url\|popup_card_id>`. e.g. For a `custom:popup-card` with a Popup-card ID of `my-awesome-popup` in the dashboard with url `my-awesome-dashboard` use `my-awesome-dashboard\|my-awesome-popup`|

(*) Dashboard url for `popup_card_id` can be found in a few ways.

1. You can note what you use for url when creating a new dashboard.
2. Hover over sidebar links to reveal the dashboard url.
3. Create a card with an action set to `Navigate` and check the dropdown which will show both dashboard name and url.

When using a dashboard url, always remove the preceeding slash `/`

## Browser Player

Browser player is a card that allows you to control the volume and playback on the current Browsers media player.

Add it to a dashboard via the GUI or through yaml:

```yaml
type: custom:browser-player
```


# FAQ

### **How do I access the FullyKiosk Browser special functions?**

Make sure to activate the [Javascript Interface](https://www.fully-kiosk.com/en/#websiteintegration).
The browser-mod panel will guide you through the rest of the required and suggested settings.

### **Why doesn't ANYTHING that used to work with Browser Mod 1.0 work with Browser Mod 2.0?**

Browser Mod 2.0 has been rewritten ENTIRELY from the ground up. This allows it to be more stable and less resource intensive. At the same time I took the opportunity to rename a lot of things in ways that are more consistent with Home Assistant nomenclature.

In short, things are hopefully much easier now for new users of Browser Mod at the unfortunate cost of a one-time inconvenience for veteran expert users such as yourself.


### **Why does my Browser ID keep changing?**
There's just no way around this. I've used every trick in the book and invented a handful of new ones in order to save the Browser ID as far as possible. It should be much better in Browser Mod 2.0 than earlier, but it's still not perfect. At least it's easy to change it back now...

Note that you can also set the browser ID to e.g. `whatever` by adding `?BrowserID=whatever` (N.B. capital B) to any Home Assistant URL.


### **How do I update a popup from the Browser mod 1.5?**
If you have used `fire-dom-event` it's really simple. Just change

```yaml
action: fire-dom-event
browser_mod:
  command: popup
  title: My title
  card:
    type: ...etc...
```

to

```yaml
action: fire-dom-event
browser_mod:
  service: browser_mod.popup
  data:
    title: My title
    content:
      type: ...etc...
```

### **How do I uninstall Browser Mod?**
Besides removing the integration as usual, there is one extra step needed.
In order to work well with [Home Assistant Cast](https://www.home-assistant.io/integrations/cast/#home-assistant-cast) Browser Mod will add itself to your Dashboard Resources, and you will need to remove it from there manually:

[![Open your Home Assistant instance and show your dashboard resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)

---

<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
