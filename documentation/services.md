
## Reading guide
Service parameters are described using the following conventions:

- `<type>` in brackets describe the type of a parameter, e.g.

  - `<string>` is a piece of text
  - `<number>` is a number
  - `list` is a yaml list
  - `<TRUE/false>` means the value must be either `true` or `false` with `true` being the default
  - `<service call>` means a full service call specification. Note that this can be any service, not just Browser Mod services
  - `<Browser IDs>` is a list of Browser IDs
  - `<Users>` is a list of Home Assistant Users by Person Entity of User ID (being the user_id attribute of a person). The UI will use select from Persons.

- Square brackets `[ ]` indicate that a parameter is optional and can be omitted.

### `<service call>`

A service call is a combination of a service and it's data:

Ex, a `<service call>` for `browser_mod.more_info` with `light.bed_light` as entity:

```yaml
service: browser_mod.more_info
data:
  entity: light.bed_light
```


## A note about targets

Browser Mod services can be called in two different ways which behave slightly differently.

The first way is as a *server* call. This is when the service is called from a script or automation, from the dev-services panel or from a dashboard `call-service` action.

The second way is as a *browser* call. This is when the service is called from a dashboard `fire-dom-event` action, as a part of a `browser_mod.sequence` call or as a `browser_mod.popup` `_action`.

The notable difference between the two is when no target (`browser_id` or `user_id`) is specified, in which case:
- A *server* call will perform the service on ALL REGISTERED BROWSERS.
- A *browser* call will perform the service on THE CURRENT BROWSER, i.e. the browser it was called from.

---

Finally, in *browser* calls, there are `browser_id`, `user_id`, and `browser_entities` replacements of `THIS` available. A parameter `browser_id` with the value `THIS` will be replaced with the current Browser's browser ID. A parameter `user_id` with the value `THIS` will be replaced by the logged-in user ID. A parameter `browser_entities` with the value `THIS` will be replaced with a [`browser_entities`](./configuration-panel.md#browser-entities-variable) dictionary.

Ex:

```yaml
tap_action:
  action: fire-dom-event
  browser_mod:
    service: script.print_clicking_browser
    data:
      browser_id: THIS
```

with the script:

```yaml
script:
  print_clicking_browser:
    sequence:
      - service: system_log.write
        data:
          message: "Button was clicked in {{browser_id}}"
```

Will print `"Button was clicked in 79be65e8-f06c78f"` to the Home Assistant log.

# Calling services

Services can be called from the backend using the normal service call procedures. Registered Browsers can be selected as targets through via Browser ID or User ID. User ID can be a person entity or the user_id of the user.

In yaml, the Browser ID or User ID can be used for targeting a specific browser:

```yaml
service: browser_mod.more_info
data:
  entity: light.bed_light
  browser_id:
    - 79be65e8-f06c78f
  user_id:
    - person.bob
    - 304450996c654be69b79d7304951b9b7
```

If no target, either `browser_id` or `user_id` is specified, the service will target all registerd Browsers.

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

# Actions

Wherever an action is used (`*_action:` in `browser_mod.popup` and `action:` in `browser_mod.notification`), both old style `service:` and new style `action:` can be used. Also actions can be a list allowing for several actions to be called. This can be useful if you only have server actions to run. Otherwise, if you have browser calls you are best to use `broswer_mod.sequence`.

# Browser Mod Services

> Note: Since `browser_id` and `user_id` are common for all services they are not explained further.

## `browser_mod.navigate`

Point the browser to the given Home Assistant path.

```yaml
service: browser_mod.navigate
data:
  path: <string>
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

| | |
|---|---|
|`path` | A Home Assistant path. <br/>E.x. `/lovelace/`, `/my-dashboard/bedroom`, `/browser_mod/`, `/config/devices/device/20911cc5a63b1caafa2089618545eb8a`...|

## `browser_mod.refresh`

Reload the current page.

```yaml
service: browser_mod.refresh
data:
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

## `browser_mod.more_info`

Show a more-info dialog.

```yaml
service: browser_mod.more_info
data:
  entity: <string>
  [large: <true/FALSE>]
  [ignore_popup_card: <true/FALSE>]
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

| | |
|---|---|
|`entity`| The entity whose more-info dialog to display. |
|`large`| If true, the dialog will be displayed wider, as if you had clicked the title of the dialog. |
| `ignore_popup_card` | If true the more-info dialog will be shown even if there's currently a popup-card which would override it. |

## `browser_mod.popup`

Display a popup dialog

```yaml
service: browser_mod.popup
data:
  [title: <string>]
  content: <string / Dashboard card configuration / ha-form schema>
  [size: <NORMAL/classic/wide/fullscreen>]
  [icon: <string>]
  [icon_title: <string>]
  [icon_action: <service call>]
  [icon_close: <TRUE/false>]
  [icon_class: <string>]
  [icons: <list>]
    [icon: <string>]
    [title: <string>]
    [action: <service-call>]
    [close: <TRUE/false>]
    [class: <string>]
  [right_button: <string>]
  [right_button_variant: <BRAND/neutral/danger/warning/success>]
  [right_button_appearance: <accent/filled/outlined/PLAIN>]
  [right_button_action: <service call>]
  [right_button_close: <TRUE/false>]
  [left_button: <string>]
  [left_button_variant: <BRAND/neutral/danger/warning/success>]
  [left_button_appearance: <accent/filled/outlined/PLAIN>]
  [left_button_action: <service call>]
  [left_button_close: <TRUE/false>]
  [dismissable: <TRUE/false>]
  [dismiss_action: <service call>]
  [autoclose: <true/FALSE>]
  [timeout: <number>]
  [timeout_action: <service call>]
  [timeout_hide_progress: <true/FALSE>]
  [allow_nested_more_info: <TRUE/false>]
  [style: <string>]
  [browser_id: <Browser IDs>]
  [user_id: <User IDs]
```

| | |
|---|---|
|`title` | The title of the popup window.|
|`content`| HTML, a dashboard card configuration or ha-form schema to display.|
| `icon` | An mdi icon which will appear in the popup header. e.g. mdi:home. `title` must be set for the header to show. |
| `icon_title` or `icons` > `title` | Tooltip for the icon. |
| `icon_action` or `icons` > `action` | Action to perform when the icon is pressed. |
| `icon_close` or `icons` > `close` | Enable/disable popup closing when the icon is pressed. |
| `icon_class` or  `icons` > `class` | CSS Class to apply to the icon. This allows for styling the icon directly using `style`. |
| `size` | `wide` will make the popup window wider. `fullscreen` will make it cover the entire screen. `classic` will keep popups non-fullheight on small devices |
| `right_button`| The text of the right action button.|
| `right_button_variant` | The right button variant. See [popups.md](popups.md#button-variant-and-appearance) for examples. |
| `right_button_appearance` | The right button appearance. See [popups.md](popups.md#button-variant-and-appearance) for examples. |
| `right_button_action`| Action to perform when the right action button is pressed. |
| `right_button_close`| Enable/disable popup closing when the right action button is pressed. |
| `left_button`| The text of the left action button.|
| `left_button_variant` | The left button variant. See [popups.md](popups.md#button-variant-and-appearance) for examples. |
| `left_button_appearance` | The left button appearance. See [popups.md](popups.md#button-variant-and-appearance) for examples. |
| `left_button_action`| Action to perform when the left action button is pressed. |
| `left_button_close`| Enable/disable popup closing when the left action button is pressed. |
| `dismissable`| If false the dialog cannot be closed by the user without clicking an action button. |
| `dismiss_action` | An action to perform if the dialog is closed by the user without clicking an action button. |
| `autoclose` | If true the dialog will close automatically when the mouse, screen or keyboard is touched. This will perform the `dismiss_action`. |
| `timeout` | If set will close the dialog after `timeout` milliseconds. |
| `timeout_action` | An action to perform if the dialog is closed by timeout. |
| `timeout_hide_progress` | If true the timeout progress bar will be hidden. |
| `allow_nested_more_info` | If true nested Home Assistant more-info popups are allowed without closing the popup. |
| `style` | CSS styles to apply to the dialog. |

Note that any Browser Mod services performed as `_action`s here will be performed only on the same Browser as initiated the action unless `browser_id` or `user_id` is given.

If a ha-form schema is used for `content` the resulting data will be inserted into the `data` for any `_action`.

One icon can be specified for custom:popup-card UI editor which populates `icon:`, `icon_*` parameters. To specificy multiple icons use a yaml list under `icons:` in yaml. `icons:` list takes precedence. Below is an example using multiple icons and a style to match.

```yaml
...
icons:
  - icon: mdi:account
    title: Account
    action:
      action: browser_mod.notification
      data:
        message: Account action
    class: account-icon
  - icon: mdi:home
    title: Home
    action:
      action: browser_mod.notification
      data:
        message: Home action
    class: home-icon
...
style: |-
  .account-icon {
    color: red;
  }
  .home-icon {
    color: blue;
  }
```

See [popups.md](popups.md) for more information and usage examples.


## `browser_mod.close_popup`

Close any currently open popup or more-info dialog.

```yaml
service: browser_mod.close_popup
data:
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

## `browser_mod.notification`

Show a short notification.

```yaml
service: browser_mod.notification
data:
  message: <string>
  [duration: <number>]
  [action_text: <string>]
  [action: <service call>]
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

|||
|---|---|
|`message`| The text to display.|
|`duration` | Number of milliseconds until the message closes. (Default `3000`)|
|`action_text`| Text of optional action button.|
|`action` | Action to perform when action button is clicked.|

## `browser_mod.set_theme`

Set the theme.

```yaml
service: browser_mod.set_theme
data:
  [theme: <string>]
  [dark: <AUTO/dark/light>]
  [primaryColor: <RGB color>]
  [accentColor: <RGB color>]
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

`<RGB color>` is either a list of three RGB values 0-255 (ex: `[0, 128, 128]`) or a six digit hex color value (ex: `"#800080"`).

|||
|---|---|
|`theme`| Theme to apply. Use `"auto"` to set as Backend Specified.|
|`dark`| Whether to use dark or light mode.|
|`primaryColor`| Theme primary color.|
|`accentColor`| Theme accent color.|

## `browser_mod.sequence`

Perform several services sequentially.

```yaml
service: browser_mod.sequence
data:
  sequence:
    - <service call>
    - <service call>
    - ...
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

| | |
|---|---|
|`sequence` | List of actions to perform. |

Note that if `browser_id` and `user_id` is omitted in the service calls listed in `sequence` the services will be performed on the Browser that's targeted as a whole rather than all browsers. 

TIP: To target browsers matching the current loggded in user ID you can use `user_id: THIS`. This may be useful when you have a number of panels logged in as a viewing account and wish for the sequence to be performed on all the panels.

## `browser_mod.delay`

Wait for a specified time.

```yaml
service: browser_mod.delay
data:
  time: <number>
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

| | |
|---|---|
|`time` | Number of milliseconds to wait.|

This is probably most useful as part of a `browser_mod.sequence` call.

## `browser_mod.console`

Print a text to the browsers javascript console.

```yaml
service: browser_mod.console
data:
  message: <string>
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

| | |
|---|---|
|`message` | Text to print. |

## `browser_mod.javascript`

Run arbitrary javascript code in the browser.

```yaml
service: browser_mod.javascript
data:
  code: <string>
  [browser_id: <Browser IDs>]
  [user_id: <User IDs>]
```

| | |
|---|---|
|`code` | Code to run. |

Only use this one if you know what you're doing.

Some helpful functions that are available:
- `hass` - The `hass` frontend object
- `data` - Any data sent to the service (also form data from popups)
- `service(service, data)` - Make a Browser Mod service call
- `log(message)` - Print `message` to the Home Assistant log
- `lovelace_reload()` - Reload lovelace configuration
The `hass` frontend object is available as global variable `hass`.

## `browser_mod.deregister_browser`

```yaml
services: browser_mod.deregister_browser
data:
  [browser_id: <Browser IDs>]
  [browser_id_exclude: <Browser IDs>]
  [area_id_exclude: <Area IDs>]
```

Degreisters browsers including those no longer reporting: removes entities, devices and cleans up the Browser Mod data store. If you deregister a browser that is currently active, it will be recreated if Auto Registration is currently active. However all specific browser settings will have been removed.

When calling `browser_mod.deregister_browser`, one of `browser_id`, `browser_id_exclude` or `area_id_exclude` needs to be set. To tidy up a current installation, run `browser_mod.deregister_browser`with with one of the `_exclude` parameters. If you wish to use this regularly to clean up auto registered browsers, it is recommended to use areas to be able to exclude those areas. Alternative, turn off Auto Registration once your installation is stable.

| | |
|---|---|
|`browser_id` | Single or list or browsers to deregister. If included these browsers will be deregistered. |
|`browser_id_exclude` | Single or list or browsers to exclude from deregister. |
|`area_id_exclude` | Single or list or areas to exclude from deregister. |