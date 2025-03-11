
## Anatomy of a popup

```yaml
service: browser_mod.popup
data:
  title: The title
  content: The content
  right_button: Right button
  left_button: Left button
```

![Screenshot illustrating the title, content and button placements of a popup](https://user-images.githubusercontent.com/1299821/182708739-f89e3b2b-199f-43e0-bf04-e1dfc7075b2a.png)

## Size

The `size` parameter can be set to `normal`, `classic`, `wide` and `fullscreen` with results as below (background blur has been exagerated for clarity):

![Screenshot of a normal size popup](https://user-images.githubusercontent.com/1299821/182709146-439814f1-d479-4fc7-aab1-e28f5c9a13c7.png)

![Screenshot of effect of classic size popup on small device](https://github.com/user-attachments/assets/926646dd-f254-44ed-b94c-f63dcc5a335c)

![Screenshot of a wide size popup](https://user-images.githubusercontent.com/1299821/182709172-c98a9c23-5e58-4564-bcb7-1d187842948f.png)

![Screenshot of a fullscreen size popup](https://user-images.githubusercontent.com/1299821/182709224-fb2e7b92-8a23-4422-95a0-f0f2835909e0.png)


## HTML content

```yaml
service: browser_mod.popup
data:
  title: HTML content
  content: |
    An <b>HTML</b> string.
    <p> Pretty much any HTML works: <ha-icon icon="mdi:lamp" style="color: red;"></ha-icon>
```

![Screenshot of a popup rendering the HTML code above](https://user-images.githubusercontent.com/1299821/182710044-6fea3ba3-5262-4361-a131-691770340518.png)

## Dashboard card content

```yaml
service: browser_mod.popup
data:
  title: HTML content
  content:
    type: entities
    entities:
      - light.bed_light
      - light.ceiling_lights
      - light.kitchen_lights
```

![Screenshot of a popup rendering the entities card described above](https://user-images.githubusercontent.com/1299821/182710445-f09b74b8-dd53-4d65-8eba-0945fc1d418e.png)

Note that some elements of some card expect the card to have a static position on the bottom of the page, but the popup will make it float above everything else. This means things like pull-down menues or some overlays may just not work right or at all. There's unfortunately nothing that can be done about this.

## Form content
`content` can be a list of ha-form schemas and the popup will then contain a form for user input:

```
<ha-form schema>:
  name: <string>
  [label: <string>]
  [default: <any>]
  selector: <Home Assistant Selector>
```

| | |
|-|-|
| `name` | A unique parameter name |
| `label` | A description of the parameter |
| `default` | The default value for the parameter |
| `selector` | A [Home Assistant selector](https://www.home-assistant.io/docs/blueprint/selectors) |

The data from the form will be forwarded as data for any `right_button_action` or `left_button_action` of the popup.

```yaml
service: browser_mod.popup
data:
  title: Form content
  content:
    - name: parameter_name
      label: Descriptive name
      selector:
        text: null
    - name: another_parameter
      label: A number
      default: 5
      selector:
        number:
          min: 0
          max: 10
          slider: true
```

![Screenshot of a popup rendering the form described above](https://user-images.githubusercontent.com/1299821/182712670-f3b4fdb7-84a9-49d1-a26f-2cdaa450fa0e.png)

**NOTE:** Some Home Assistant selectors may use another dialog for input. [Date](https://www.home-assistant.io/docs/blueprint/selectors/#date-selector) and [Date & Time](https://www.home-assistant.io/docs/blueprint/selectors/#date--time-selector) use a selector dialog for date & time. Browser Mod popups are not in the Home Assistant DOM hierachy so stacking will need to be adjusted by [styling](#styling-popups) the popup with th styles shown below. The Home Assistant top bar has a z-index of 4, so using a z-index of 5 will work in most cases, but your setup may vary so adjust to suit.

```
z-index: 5;
position: absolute;
```

## Actionable popups

Example of a popup with actions opening more popups or calling Home Assistant services:

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

![Animated screenshot of a popup which opens other popups when one of the action buttons are pressed](https://user-images.githubusercontent.com/1299821/182713421-708d0026-bcfa-4ba6-bbcd-3b85b584162d.gif)

## Forward form data

The following popup would ask the user for a list of rooms to vacuum and then populate the `params` parameter of the `vacuum.send_command` service call from the result:

```yaml
service: browser_mod.popup
data:
  title: Where to vacuum?
  right_button: Go!
  right_button_action:
    service: vacuum.send_command
    data:
      entity_id: vacuum.xiaomi
      command: app_segment_clean
  content:
    - name: params
      label: Rooms to clean
      selector:
        select:
          multiple: true
          options:
            - label: Kitchen
              value: 11
            - label: Living room
              value: 13
            - label: Bedroom
              value: 12
```

![Screenshot of a popup allowing the user to choose which rooms to vacuum](https://user-images.githubusercontent.com/1299821/182713714-ef4149b1-217a-4d41-9737-714f5320c25c.png)


## Styling popups

The default value for the `style` parameter is as follows:

```yaml
style: |
  --popup-min-width: 400px;
  --popup-max-width: 600px;
  --popup-border-radius: 28px;
```

The same variables can also be set by a theme.

Those variables should be enough for mostly everything, really. Try it.

Otherwise, [card-mod](https://github.com/thomasloven/lovelace-card-mod) can also be used to style popups by adding a `card_mod:` parameter to the service call:

```yaml
service: browser_mod.popup
data:
  title: Teal background
  content: Where did the dashboard go?
  card_mod:
    style:
      ha-dialog$: |
        div.mdc-dialog div.mdc-dialog__scrim {
          background: rgba(0, 128, 128, 0.9);
        }
```
Or through `card-mod-more-info` or `card-mod-more-info-yaml` in a card-mod theme.
