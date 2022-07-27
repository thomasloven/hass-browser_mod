
## Reading guide
Service parameters are described using the following conventions:

- `<type>` in brackets describe the type of a parameter, e.g.

  - `<string>` is a piece of text
  - `<number>` is a number
  - `<TRUE/false>` means the value must be either `true` or `false` with `true` being the default
  - `<service call>` means a full service call specification. Note that this can be any service, not just Browser Mod services
  - `<Browser IDs>` is a list of BrowserIDs

- Square brackets `[ ]` indicate that a parameter is optional and can be omitted.

### `<service call>`

A service call is a combination of a service and it's data:

Ex, a `<service call>` for `browser_mod.more_info` with `light.bed_light` as entity:

```yaml
service: browser_mod.more_info
data:
  entity: light.bed_light
```

If `data` contains `browser_id: THIS` then `THIS` will be replaced with the current browser ID.


## A note about targets

Browser Mod services can be called in two different ways which behave slightly differently.

The first way is as a *server* call. This is when the service is called from a script or automation, from the dev-services panel or from a dashboard `call-service` action.

The second way is as a *browser* call. This is when the service is called from a dashboard `fire-dom-event` action, as a part of a `browser_mod.sequence` call or as a `browser_mod.popup` `_action`.

The notable difference between the two is when no target (`browser_id`) is specified, in which case:
- A *server* call will perform the service on ALL REGISTERED BROWSERS.
- A *browser* call will perform the service on THE CURRENT BROWSER, i.e. the browser it was called from.

---

Finally, in *browser* calls, a parameter `browser_id` with the value `THIS` will be replaced with the current Browsers browser ID.

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

Will print `"Button was clicked in 79be65e8-f06c78f" to the Home Assistant log.



# Browser Mod Services

> Note: Since `browser_id` is common for all services it is not explained further.

## `browser_mod.navigate`

Point the browser to the given Home Assistant path.

```yaml
service: browser_mod.navigate
data:
  path: <string>
  [browser_id: <Browser IDs>]
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
  content: <string / Dashboard card configuration>
  [size: <NORMAL/wide/fullscreen>]
  [right_button: <string>]
  [right_button_action: <service call>]
  [left_button: <string>]
  [left_button_action: <service call>]
  [dismissable: <TRUE/false>]
  [dismiss_action: <service call>]
  [autoclose: <true/FALSE>]
  [timeout: <number>]
  [timeout_action: <service call>]
  [style: <string>]
  [browser_id: <Browser IDs>]
```

| | |
|---|---|
|`title` | The title of the popup window.|
|`content`| HTML or a dashboard card configuration to display.|
| `size` | `wide` will make the popup window wider. `fullscreen` will make it cover the entire screen. |
| `right_button`| The text of the right action button.|
| `right_button_action`| Action to perform when the right action button is pressed. |
| `left_button`| The text of the left action button.|
| `left_button_action`| Action to perform when the left action button is pressed. |
| `dismissable`| If false the dialog cannot be closed by the user without clicking an action button. |
| `dismiss_action` | An action to perform if the dialog is closed by the user without clicking an action button. |
| `autoclose` | If true the dialog will close automatically when the mouse, screen or keyboard is touched. This will perform the `dismiss_action`. |
| `timeout` | If set will close the dialog after `timeout` milliseconds. |
| `timeout_action` | An action to perform if the dialog is closed by timeout. |
| `style` | CSS styles to apply to the dialog. |

The default value for `style` is as follows:

```yaml
style:
  --popup-min-width: 400px;
  --popup-max-width: 600px;
  --popup-border-width: var(--ha-card-border-width, 2px);
  --popup-border-color: var(--ha-card-border-color, var(--divider-color, #eee));
  --popup-border-radius: 8px;
  --popup-background-color: var(--ha-card-background, var(--card-background-color, white));
  --popup-header-background-color: var(--popup-background-color, var(--sidebar-background-color));
```

Note that any Browser Mod services performed as `_action`s here will be performed only on the same Browser as initiated the action unless `browser_id` is given.

For usage examples, see [popups.md](popups.md).


## `browser_mod.close_popup`

Close any currently open popup or more-info dialog.

```yaml
service: browser_mod.close_popup
data:
  [browser_id: <Browser IDs>]
```

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
```

| | |
|---|---|
|`sequence` | List of actions to perform. |

Note that if `browser_id` is omitted in the service calls listed in `sequence` the services will be performed on the Browser that's targeted as a whole rather than all browsers.

## `browser_mod.delay`

Wait for a specified time.

```yaml
service: browser_mod.delay
data:
  time: <number>
  [browser_id: <Browser IDs>]
```

| | |
|---|---|
|`time` | Number of milliseconds to wait.|

This is probably most useful as part of a `browser_mod.sequence` call.

## `browsermod.console`

Print a text to the browsers javascript console.

```yaml
service: browser_mod.console
data:
  message: <string>
  [browser_id: <Browser IDs>]
```

| | |
|---|---|
|`message` | Text to print. |

## `browsermod.javascript`

Run arbitrary javascript code in the browser.

```yaml
service: browser_mod.console
data:
  code: <string>
  [browser_id: <Browser IDs>]
```

| | |
|---|---|
|`code` | Code to run. |

Only use this one if you know what you're doing.

The `hass` frontend object is available as global variable `hass`.