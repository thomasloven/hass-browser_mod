# Browser Entities

Browser entities include `media_player`, `light` for controlling the screen, `binary_sensor` for activity and other entities and sensors for control and diagnostics. See [Register](./configuration-panel.md#register) for a description of the main entities.

Two custom cards are available to display the local Browser entity on a dashboard. These are Browser Mod Tile and Browser Mod Badge. See more in [dashboard-cards](./dashboard-cards.md)

The variable `browser_entities` is available in Frontend settings templates. It is a special dictionary of the entities for the Browser and includes those listed in the table below. Each entry has entry of `entity_id` and `enabled`. If an entity is disabled by user then `enabled` will be `false`. Entities listed in the table as __DYNAMIC__ may also not enabled due to Browser hardware restrictions of settings.

`browser_entities` is also available to a [_Browser_ call](services.md#calling-services---server-call-vs-browser-call) by setting the replacement parameter `THIS` for `browser_entities`. See the script example below.

> NOTE: If the Browser is not registered, `browser_entities` will be undefined. Your template should use `default()` to handle such a case.
>
> __IMPORTANT__: `browser_entities` __IS NOT__ available in Developer tools template editor. It is __ONLY__ available in the scenarios listed in this documentation.

| Name | Variable | Sensor | Example entity_id |
|---|---|---|---|
| Browser ID | `browser_entities.browserID` | Browser ID Sensor | _sensor.browser_id_ |
| Path | `browser_entities.path` | Browser path Sensor | _sensor.browser_id_browser_path_ |
| Visibility | `browser_entities.visibility` | Browser visibility Sensor | _sensor.browser_id_browser_visibility_ |
| User Agent | `browser_entities.userAgent` | Browser userAgent Sensor | _sensor.browser_id_browser_useragent_ |
| User | `browser_entities.currentUser` | Browser user Sensor | _sensor.browser_id_browser_user_ |
| Fully Kiosk | `browser_entities.fullyKiosk` | Browser FullyKiosk Sensor | _binary_sensor.browser_id_browser_fullykiosk_ |
| Width | `browser_entities.width` | Browser width Sensor | _sensor.browser_id_browser_width_ |
| Height | `browser_entities.height` | Browser height Sensor | _sensor.browser_id_browser_height_ |
| Dark Mode | `browser_entities.darkMode` | Browser dark mode Sensor | _sensor.browser_id_browser_dark_mode_ |
| Activity | `browser_entities.activity` | Browser activity Sensor | _binary_sensor.browser_id_browser_ |
| Screen | `browser_entities.screen` | Browser screen Sensor | _light.browser_id_browser_screen_ |
| Player | `browser_entities.player` | Browser player Sensor | _media_player.browser_id_ |
| Panel | `browser_entities.panel` | Browser panel Sensor | _sensor.browser_id_panel_ |
| Battery | `browser_entities.battery_level` | Browser battery Sensor. __DYNAMIC__ - may not be enabled. | _sensor.browser_id_browser_battery_ |
| Charging | `browser_entities.charging` | Browser charging Sensor. __DYNAMIC__ - may not be enabled.  | _binary_sensor.browser_id_browser_charging_ |
| Camera | `browser_entities.camera` | Browser camera. __DYNAMIC__ - may not be enabled.  | _camera.browser_id_ |

Your Frontend settings or script template can use the `browser_entities` variable to query a sensor state or get attributes of the sensor.

Example: Get the current user name

```yaml
{{ states(browser_entities.currentUser.entity_id) if 'currentUser' in browser_entities else 'unknown' }}
```

Example: Get the first part of the Browser path

```yaml
{{ state_attr(browser_entities.panel.entity_id, 'viewTitle') if 'panel' in browser_entities else 'unknown' }}
```

Example: Know who initiated script action

Here the script just returns the current user as a response. A functional script would use the variable in some way.

> NOTE: This Frontend action needs to be a [_Browser_ call](services.md#calling-services---server-call-vs-browser-call).

1. _Frontend action_

    ```yaml
    # ... other code
    tap_action:
      action: fire-dom-event # Browser call
      browser_mod:
        service:  browser_mod.sequence
        data:
          sequence:
            - service: script.my_script
              data:
                browser_entities: THIS
    ```

2. _My Script_

    ```yaml
    sequence:
      - variables:
          currentUser: >-
            {{ states(browser_entities.currentUser.entity_id) if 'currentUser' in
            browser_entities else 'unknown' }}
      - action: script.script_with_response
        metadata: {}
        data: {}
        response_variable: currentUser
    alias: My Script
    description: ""
    ```
