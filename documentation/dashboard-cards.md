# Dashboard cards

- [Dashboard cards](#dashboard-cards)
  - [Browser Mod Popup](#browser-mod-popup)
    - [Popup card - replace more-info dialog of an entity](#popup-card---replace-more-info-dialog-of-an-entity)
      - [Popup card - template for popup service](#popup-card---template-for-popup-service)
    - [Browser Player](#browser-player)
  - [Browser Mod Tile and Badge](#browser-mod-tile-and-badge)
    - [Browser Mod Tile](#browser-mod-tile)
    - [Browser Mod Badge](#browser-mod-badge)
    - [Entity](#entity)
      - [Entity replacement](#entity-replacement)
      - [Entity availability](#entity-availability)
      - [Browser not registered](#browser-not-registered)
      - [Browser entities unavailable](#browser-entities-unavailable)
      - [Privileged users](#privileged-users)
    - [Example](#example)

## Browser Mod Popup

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
[popup_card_all_views: <true/FALSE>]
[any parameter from the browser_mod.popup service call except "content"]
```

| | |
|---|---|
|`type`| Always `custom:popup-card` |
|`entity`| Old style single entity target. While using old style `entity` is fully supported, it will not show in the GUI editor if `entity` is not in the current popup card config. In this case add an entity to `target`. |
|`target`| When configured in the UI, this uses the Home Assistant target selector. The popup card will be used for more-info replacement for an entity matching any of the target entities, areas, labels or devices. |
|`entity_id`| A single entity id or list of entity id's. The popup card will be used as an more-info replacement for all listed entities. |
|`area_id`| A single area id or list of area id's. The popup card will be used as a more-info replacement for entities in these areas. |
|`labels_id`| A single label id or list of label id's. The popup card will be used as a more-info replacement for entities with these labels. |
|`device_id`| A single device id or list of devices id's. The popup card will be used as a more-info replacement for entities of these devices. |

#### Popup card - template for popup service

A popup card can be used as a template for [`browser_mod.popup` service](documentation/services.md).

To use it, add a "Custom: Popup card" to a dashboard view via the GUI, set the Popup-card ID, then configure the card and set up the popup like for the [`browser_mod.popup` service](documentation/services.md).

The card will be visible only while you're in Edit mode.

> TIP: If you wish to display a popup on a Browser as a result of pressing a button, use `browser_mod.popup` as a [_Browser_ call](documentation/services.md#calling-services---server-call-vs-browser-call).

Yaml configuration:

```yaml
type: custom:popup-card
[popup_card_id: <popup-card ID>]
card:
  type: ...etc...
[any parameter from the browser_mod.popup service call except "content"]
```

Usage: [_Server_ call](documentation/services.md#calling-services---server-call-vs-browser-call)

```yaml
...
  action: browser_mod.popup
  browser_id: <browser-id>
  data:
    popup_card_id: <dashboard-url>/<popup-card ID>
```

Usage: [_Browser_ call](documentation/services.md#calling-services---server-call-vs-browser-call)

```yaml
...
  tap_action:
    action: fire-dom-event
    browser_mod:
      service: browser_mod.popup
      data:
        popup_card_id: <popup-card ID>
```

| | |
|---|---|
|`type`| Always `custom:popup-card` |
|`popup_card_id`| The Popup-card ID of a `custom:popup-card` which exists in a dashboard. If calling via a [_Browser_ call](documentation/services.md#calling-services---server-call-vs-browser-call) you can use the Popup-card ID of the card directly if the card exists in the same dashboard the _Browser_ call is being made from. In all other cases, including all [_Server_ calls](documentation/services.md#calling-services---server-call-vs-browser-call), you need to specify both the dashboard url(*) and the Popup-card ID using the format `<dashboard-url/popup_card_id>`. e.g. For a `custom:popup-card` with a Popup-card ID of `my-awesome-popup` in the dashboard with url `my-awesome-dashboard` use `my-awesome-dashboard/my-awesome-popup`|

(*) Dashboard url for `popup_card_id` can be found in a few ways.

1. You can note what you use for url when creating a new dashboard.
2. Hover over sidebar links to reveal the dashboard url.
3. Create a card with an action set to `Navigate` and check the dropdown which will show both dashboard name and url.

When using a dashboard url, always remove the preceding slash `/`

### Browser Player

Browser player is a card that allows you to control the volume and playback on the current Browsers media player.

Add it to a dashboard via the GUI or through yaml:

```yaml
type: custom:browser-player
```

## Browser Mod Tile and Badge

### Browser Mod Tile

Browser Mod Tile is an extension to the standard Home Assistant Frontend [Tile card](https://www.home-assistant.io/dashboards/tile/) that allows for selection of local [Browser entities](./browser-entities.md). For example, you can show the local Browser ID by using a Browser Mod Tile and selecting `Browser ID` as the entity which will set the `entity` in YAML to `browser_entities.browserID`.

Browser Mod Tile supports all features of the regular Home Assistant Frontend [Tile card](https://www.home-assistant.io/dashboards/tile/) including name and state content to display entity attributes. While editing Browser Mod Tile the local Browser entity will be used and the card will allow to set [card features](https://www.home-assistant.io/dashboards/features/) available for the entity domain.

### Browser Mod Badge

Browser Mod Badge is an extension to standard Home Assistant Frontend [Badges](https://www.home-assistant.io/dashboards/badges/) that allows for selection of local [Browser entities](./browser-entities.md). For example, you can show the local Browser ID by using a Browser Mod Badge and selecting `Browser ID` as the entity which will set the `entity` in YAML to `browser_entities.browserID`.

Browser Mod Badge supports all features of standard Home Assistant Frontend [Badges](https://www.home-assistant.io/dashboards/badges/) including name and state content to display entity attributes. While editing Browser Mod Badge the local Browser entity will be used.

### Entity

In UI mode you can select the entity from a list showing Names of [Browser entities](./browser-entities.md) e.g. `Browser Mod ID`. In YAML mode use the Variables of [Browser entities](./browser-entities.md) e.g. `browser_entities.browserID`.

#### Entity replacement

In YAML mode you can use any variable of [Browser entities](./browser-entities.md) and it will be replaced before the Tile/Badge is rendered. If any string starting with `browser_entities.` does not resolve to a known Browser Mod entity variable, the generic error `Entity not enabled for this Browser` will be shown.

#### Entity availability

If a Browser entity is not available for a Browser, like a dynamic entity or one that has been disabled, the generic warning `Entity not enabled for this Browser` will be shown.

#### Browser not registered

If a Browser is not registered the generic error `Browser not registered` will be shown. If the user is a [Privileged user](#privileged-users) then tapping the tile/badge will call `browser_mod.change_browser_id` with no parameters, allowing you to quickly change a Browser ID for a Browser that has lost its Browser ID. See [`browser_mod.change_browser_id`](./services.md#browser_modchange_browser_id) for more details of the popup that will show in this scenario.

#### Browser entities unavailable

If the entities are not available for a browser, due to an unknown error of some sort that could be related to Browser ID, the generic error `Browser entities unavailable` will be shown. If the user if is a [Privileged user](#privileged-users) then tapping the tile/badge will call `browser_mod.change_browser_id` with no parameters, allowing you to quickly change a Browser ID for a Browser that has lost its Browser ID. See [`browser_mod.change_browser_id`](./services.md#browser_modchange_browser_id) for more details of the popup that will show in this scenario.

#### Privileged users

Only privileged users will be able to tap a generic error to call the action [`browser_mod.change_browser_id`](./services.md#browser_modchange_browser_id). Privileged users include users with owner/admin role. You can also set privileged users for a dashboard by setting a list under `browser_mod:` => `privileged_users:` in the dashboard config. You can do this using `Raw configuration editor` if using UI and storage mode, or directly in YAML if using YAML mode.

Example:

```yaml
browser_mod:
  privileged_users:
    - general_user
```

### Example

```yaml
views:
  - type: sections
    max_columns: 4
    title: Other
    path: other
    header:
      card:
        type: markdown
        text_only: true
        content: ' Browser Mod Badges'
    badges:
      - type: custom:browser-mod-badge
        show_name: false
        show_state: true
        show_icon: true
        entity: browser_entities.browserID
      - type: custom:browser-mod-badge
        show_name: false
        show_state: true
        show_icon: true
        entity: browser_entities.screen
      - type: custom:browser-mod-badge
        show_name: false
        show_state: true
        show_icon: true
        entity: browser_entities.panel
    sections:
      - type: grid
        cards:
          - type: heading
            heading: Browser Mod Tiles
            heading_style: title
          - type: custom:browser-mod-tile-card
            grid_options:
              columns: 12
              rows: 1
            entity: browser_entities.screen
            vertical: false
            features:
              - type: light-brightness
              - type: toggle
            features_position: bottom
          - type: custom:browser-mod-tile-card
            entity: browser_entities.browserID
            vertical: false
            features_position: bottom
            grid_options:
              columns: 12
              rows: 1
          - type: custom:browser-mod-tile-card
            entity: browser_entities.path
            vertical: false
            features_position: bottom
            grid_options:
              columns: 12
              rows: 1
          - type: custom:browser-mod-tile-card
            entity: browser_entities.currentUser
            vertical: false
            features_position: bottom
            grid_options:
              columns: 12
              rows: 1
```

![Browser Mod Badge and Tile Example](https://github.com/user-attachments/assets/6763acc2-c1a4-4a51-97e7-a5a266a84658)
