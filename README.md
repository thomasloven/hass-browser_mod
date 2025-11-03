# browser_mod 2

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

What if that tablet you have on your wall could open up a live feed from your front door camera when someone rings the bell?

And what if you could use it as an extra security camera?

Or what if you could use it to play music and videos from your Home Assistant media library?

What if you could permanently hide that sidebar from your kids and lock them into a single dashboard?

What if you could change the icon of the Home Assistant tab so it doesn't look the same as the forum?

What if you could change the more-info dialog for some entity to a dashboard card of your own design?

What if you could tap a button and have Home Assistant ask you which rooms you want the roomba to vacuum?

## Installation instructions

- **First make sure you have completely removed any installation of Browser Mod 1** \
  I.e. remove `browser_mod:` from your configuration.yaml and delete the integration from the integrations page.

- Either

  - Find and download [Browser Mod under `integrations`](https://my.home-assistant.io/redirect/hacs_repository/?owner=thomasloven&repository=hass-browser_mod) in [HACS](https://hacs.xyz)
  - OR copy the contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Restart Home Assistant

- Add the "Browser Mod" integration in Settings -> Devices & Services -> Add Integration or click this button: [![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=browser_mod)

- Restart Home Assistant

## Upgrading

- Upgrade via [HACS](https://hacs.xyz) or copy new contents of `custom_components/browser_mod/` to `<your config dir>/custom_components/browser_mod/`.

- Restart Home Assistant. If you are upgrading via [HACS](https://hacs.xyz) you will get a repair item to restart Home Assistant.

- After restarting Home Assistant, all Browsers will need a reload to download the latest version of Browser Mod javascript file. Version 2.4.0 includes a notification when a Browser version mismatch is detected, so from 2.4.x onwards simply clicking **Reload** should be sufficient. If you keep getting the notification, you may need to do a hard Browser reload `SHIFT+F5` or in some cases [clear your Browser cache](https://github.com/thomasloven/hass-config/wiki/Clearing-your-browser-cache).

> Note: If you are upgrading from Browser Mod 1, it is likely that you will get some errors in your log during a transition period. They will say something along the lines of `Error handling message: extra keys not allowed @ data['deviceID']`.
>
> They appear when a browser which has an old version of Browser Mod cached tries to connect and should disappear once you have cleared all your caches properly.

## Quickstart

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

## Browser Mod Configuration Panel

After installing Browser Mod you should see a new panel called _Browser Mod_ in the sidebar. This is where you control any Browser Mod settings.

### See [Configuration Panel](documentation/configuration-panel.md) for more info

\
&nbsp;

## Browser Mod Services

Browser Mod has a number of services you can call to cause things to happen in the target Browser, such as opening a popup or navigating to a certain dashboard.

### See [Services](documentation/services.md) for more info

\
&nbsp;

### Popup card

Popup cards can be used to replace the more-info dialog of an entity, or to be used as a template for [`browser_mod.popup` service](documentation/services.md), or both! See [dashboard-cards](/documentation/dashboard-cards.md#browser-mod-popup) for more information.

## FAQ

### **How can I make the video player show fullscreen?**

The [`media_player.play_media`](https://www.home-assistant.io/integrations/media_player/#action-media_playerplay_media) service allows for `extra` configuration to be passed to the `media_player` entity. Browser Mod supports sending `media_player` popup configuration by adding a `popup` dictionary under `extra`. You can set any [`browser_mod.popup`](documentation/services.md#browser_modpopup) parameters apart from `content`.

To show the video player fullscreen, with no padding to the video and a black background, use the example below.

```yaml
action: media_player.play_media
target:
  entity_id: media_player.my_browser
data:
  extra:
    popup:
      initial_style: fullscreen
      popup_styles:
        - style: all
          styles: |
            ha-dialog {
              --ha-dialog-surface-background: black;
            }
            ha-dialog .container {
              padding: 0px;
            }
  media:
    media_content_id: media-source://...
    media_content_type: video/mp4
```

### **How do I keep a device 'Alive'?**

It all depends on what your outcome is. Browser Mod cannot control hardware so it can't put any devices to screen off mode. Browser Mod does have a light entity which can be used to simulate a dimmed screen with a dark overlay. If you do wish to have your device in a screen off state you need to be aware of issues that may arise with Browser Mod and Home Assistant losing connection if the device operating system decides to suspend the Browser/App. This is most prevalent on Android devices where Browser/App may be put into a doze state where it will ultimately be **frozen**. Browser Mod has no control over this. For a detailed write up of running Browser Mod with Android devices see the wiki article [Android Devices 'Always On'](https://github.com/thomasloven/hass-browser_mod/wiki/Android-Devices-'Always-On').

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
