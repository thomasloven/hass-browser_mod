
## Anatomy of a popup

```yaml
service: browser_mod.popup
data:
  title: The title
  content: The content
  right_button: Right button
  left_button: Left button
```

![Popup](https://user-images.githubusercontent.com/1299821/180668969-c647f301-3f3d-4f3b-a1f8-d95af8b48873.png)

## Displaying a dashboard card in a popup

```yaml
service: browser_mod.popup
data:
  title: The title
  right_button: Right button
  left_button: Left button
  content:
    type: entities
    entities:
      - light.bed_light
      - light.ceiling_lights
      - light.kitchen_lights
```

![Popup with card](https://user-images.githubusercontent.com/1299821/180669077-bbc86831-3a8a-4e54-b098-d900d62d3508.png)

## Actionable popups

```yaml
service: browser_mod.popup
data:
  content: Do you want to turn the light on?
  right_button: "Yes"
  left_button: "No"
  right_button_action:
    service: light.turn_on
    data:
      entity_id: light.bed_light
  left_button_action:
    service: browser_mod.popup
    data:
      title: Really?
      content: Are you sure?
      right_button: "Yes"
      left_button: "No"
      right_button_action:
        service: browser_mod.popup
        data:
          content: Fine, live in darkness.
          dismissable: false
          title: Ok
          timeout: 3000
      left_button_action:
        service: light.turn_on
        data:
          entity_id: light.bed_light
```

![Advanced popup](https://user-images.githubusercontent.com/1299821/180670190-18cf8eee-cf18-47b9-84d1-e62ef327c615.gif)