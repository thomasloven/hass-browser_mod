# Quick Bar Plus Card

A customizable Home Assistant custom card that provides a quick action bar with custom categories and items.

## Features

- **Custom Categories**: Organize your quick actions into categories
- **Multiple Item Types**: Support for navigation and service calls
- **Search Functionality**: Optional search box to filter items
- **Visual Editor**: Easy-to-use GUI editor for configuration
- **Custom Icons**: Set custom icons for each item
- **Flexible Actions**: Navigate to dashboards or call services
- **Keyboard Shortcuts**: Global (Ctrl+K) and per-card custom shortcuts
- **Service Integration**: Open cards programmatically via `browser_mod.quick_bar` service
- **Global Access**: Reference cards from any dashboard using card IDs

## Installation

This card is included as part of the Browser Mod integration.

## Usage

### Adding the Card

1. Open your Home Assistant dashboard in edit mode
2. Click "+ Add Card"
3. Search for "Quick Bar Plus"
4. Configure your categories and items

### Keyboard Shortcuts

#### Global Shortcut

Press **Ctrl+K** (or **Cmd+K** on Mac) anywhere in Home Assistant to open the first Quick Bar Plus card on the current dashboard.

#### Per-Card Shortcuts

Configure custom keyboard shortcuts for specific cards:

```yaml
type: custom:quick-bar-plus-card
title: My Quick Actions
keyboard_shortcut: Alt+Q  # Opens this card with Alt+Q
categories:
  - name: Navigation
    items:
      - label: Dashboard
        icon: mdi:view-dashboard
        navigation_path: /lovelace/0
```

Supported shortcut formats:
- `Ctrl+K` or `Control+K`
- `Alt+Q`
- `Shift+B`
- `Ctrl+Shift+A`
- `Meta+Space` or `Cmd+Space` (Mac Command key)

### Service Integration

Open Quick Bar Plus cards programmatically using the `browser_mod.quick_bar` service.

#### Basic Usage

```yaml
# In a button card
type: button
name: Open Quick Bar
tap_action:
  action: fire-dom-event
  browser_mod:
    service: browser_mod.quick_bar
    data:
      quick_bar_card_id: my-quick-actions
```

#### Cross-Dashboard Access

Access cards from any dashboard using the format `dashboard-url/card-id`:

```yaml
service: browser_mod.quick_bar
data:
  quick_bar_card_id: lovelace-mobile/mobile-quick-bar
```

#### In Automations

```yaml
automation:
  - alias: "Show Quick Bar on Motion"
    trigger:
      - platform: state
        entity_id: binary_sensor.motion_sensor
        to: "on"
    action:
      - service: browser_mod.quick_bar
        data:
          quick_bar_card_id: security-actions
```

### Configuration

#### Visual Editor

The card includes a visual editor that allows you to:
- Set the card title and search options
- Configure Quick Bar Card ID for service calls
- Set custom keyboard shortcut
- Add/remove categories
- Add/remove items within categories
- Configure item labels, icons, and actions

#### YAML Configuration

```yaml
type: custom:quick-bar-plus-card
title: Quick Bar Plus
show_search: true
placeholder: Search or select an action...
quick_bar_card_id: main-quick-bar  # Optional: ID for service calls
keyboard_shortcut: Alt+Q  # Optional: Custom keyboard shortcut
categories:
  - name: Navigation
    items:
      - label: Dashboard
        icon: mdi:view-dashboard
        navigation_path: /lovelace/0
      - label: Settings
        icon: mdi:cog
        navigation_path: /config/dashboard
      - label: Energy
        icon: mdi:lightning-bolt
        navigation_path: /lovelace/energy
  - name: Lights
    items:
      - label: Turn off all lights
        icon: mdi:lightbulb-off
        service: light.turn_off
        service_data:
          entity_id: all
      - label: Living Room On
        icon: mdi:lightbulb-on
        service: light.turn_on
        service_data:
          entity_id: light.living_room
  - name: Climate
    items:
      - label: Set Temperature
        icon: mdi:thermometer
        service: climate.set_temperature
        service_data:
          entity_id: climate.living_room
          temperature: 22
```

## Configuration Options

### Card Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **Required** | `custom:quick-bar-plus-card` |
| `title` | string | "Quick Bar Plus" | Title displayed in the card |
| `show_search` | boolean | `true` | Show/hide the search box |
| `placeholder` | string | "Search or select an action..." | Placeholder text for search box |
| `quick_bar_card_id` | string | - | Optional ID to reference this card from service calls or other dashboards |
| `keyboard_shortcut` | string | - | Optional keyboard shortcut (e.g., "Alt+Q"). Leave empty to use global Ctrl+K |
| `categories` | list | `[]` | List of category objects |

### Category Options

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Category name/label |
| `items` | list | List of item objects |

### Item Options

| Name | Type | Description |
|------|------|-------------|
| `label` | string | Item label/name |
| `icon` | string | MDI icon (e.g., `mdi:star`) |
| `navigation_path` | string | Path to navigate to (e.g., `/lovelace/0`) |
| `service` | string | Service to call (e.g., `light.turn_on`) |
| `service_data` | object | Data to pass to the service |

**Note**: Each item should have either a `navigation_path` OR a `service` (not both).

## Examples

### With Keyboard Shortcut

```yaml
type: custom:quick-bar-plus-card
title: Development Actions
quick_bar_card_id: dev-actions
keyboard_shortcut: Ctrl+Shift+D
show_search: true
categories:
  - name: Dev Tools
    items:
      - label: Restart HA
        icon: mdi:restart
        service: homeassistant.restart
      - label: Check Config
        icon: mdi:file-check
        navigation_path: /config/server_control
```

### With Service Integration

```yaml
# Card configuration
type: custom:quick-bar-plus-card
title: Security Actions
quick_bar_card_id: security
show_search: false
categories:
  - name: Alarm
    items:
      - label: Arm Away
        icon: mdi:shield-lock
        service: alarm_control_panel.alarm_arm_away
        service_data:
          entity_id: alarm_control_panel.home
      - label: Arm Home
        icon: mdi:shield-home
        service: alarm_control_panel.alarm_arm_home
        service_data:
          entity_id: alarm_control_panel.home

# Button to trigger it
type: button
name: Security Options
icon: mdi:shield
tap_action:
  action: fire-dom-event
  browser_mod:
    service: browser_mod.quick_bar
    data:
      quick_bar_card_id: security
```

### Cross-Dashboard Access

```yaml
# Card on mobile dashboard (url: lovelace-mobile)
type: custom:quick-bar-plus-card
title: Mobile Quick Actions
quick_bar_card_id: mobile-actions
categories:
  - name: Quick Access
    items:
      - label: Home
        icon: mdi:home
        navigation_path: /lovelace-mobile/0

# Open from main dashboard
type: button
name: Mobile Actions
tap_action:
  action: fire-dom-event
  browser_mod:
    service: browser_mod.quick_bar
    data:
      quick_bar_card_id: lovelace-mobile/mobile-actions
```

### Navigation Only

```yaml
type: custom:quick-bar-plus-card
title: Quick Navigation
categories:
  - name: Dashboards
    items:
      - label: Overview
        icon: mdi:home
        navigation_path: /lovelace/0
      - label: Lights
        icon: mdi:lightbulb
        navigation_path: /lovelace/lights
      - label: Climate
        icon: mdi:thermometer
        navigation_path: /lovelace/climate
```

### Service Calls Only

```yaml
type: custom:quick-bar-plus-card
title: Quick Actions
categories:
  - name: Scenes
    items:
      - label: Movie Time
        icon: mdi:movie
        service: scene.turn_on
        service_data:
          entity_id: scene.movie_time
      - label: Good Night
        icon: mdi:weather-night
        service: scene.turn_on
        service_data:
          entity_id: scene.good_night
```

### Mixed Configuration

```yaml
type: custom:quick-bar-plus-card
title: My Quick Bar
show_search: true
categories:
  - name: Navigation
    items:
      - label: Energy Dashboard
        icon: mdi:lightning-bolt
        navigation_path: /lovelace/energy
  - name: Lights
    items:
      - label: All Lights Off
        icon: mdi:lightbulb-off
        service: light.turn_off
        service_data:
          entity_id: all
  - name: Security
    items:
      - label: Arm Away
        icon: mdi:shield-lock
        service: alarm_control_panel.alarm_arm_away
        service_data:
          entity_id: alarm_control_panel.home
```

## Tips

1. **Organization**: Group related items into logical categories
2. **Icons**: Use meaningful icons from [Material Design Icons](https://materialdesignicons.com/)
3. **Search**: Enable search for quick bars with many items
4. **Testing**: Test your service calls to ensure they work as expected
5. **Compact View**: Use shorter labels for a cleaner look
6. **Keyboard Shortcuts**: Use Ctrl+K for quick global access, or set custom shortcuts for specific cards
7. **Card IDs**: Assign `quick_bar_card_id` to cards you want to open programmatically or from other dashboards
8. **Service Calls**: Use the `browser_mod.quick_bar` service in automations to show contextual actions

## Troubleshooting

### Card doesn't appear
- Ensure Browser Mod is properly installed
- Clear your browser cache (Shift+F5)
- Check the browser console for errors

### Keyboard shortcut doesn't work
- Verify the shortcut format (e.g., "Ctrl+K", "Alt+Q")
- Check for conflicts with browser or system shortcuts
- Global Ctrl+K only works if at least one Quick Bar Plus card exists on the current dashboard

### Service call doesn't work
- Verify the service exists in Developer Tools > Services
- Check the service_data matches the service requirements
- Ensure you have the required permissions

### Navigation doesn't work
- Verify the path exists (check your dashboard URLs)
- Ensure the path starts with `/`

### Card ID not found
- Verify the `quick_bar_card_id` matches exactly
- For cross-dashboard access, use format: `dashboard-url/card-id`
- Dashboard URL can be found by hovering over sidebar links

## Support

For issues and feature requests, please visit the [Browser Mod GitHub repository](https://github.com/thomasloven/hass-browser_mod).
