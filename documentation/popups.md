
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

## Button variant and appearance

Starting with Home Assistant 2025.8, popup left and right buttons can have a different variant and/or appearance. Variant options are "brand", "neutral", "danger", "warning", and "success". Appearance options are "accent", "filled", "outlined", and "plain". Default options are variant="brand" and appearance="plain" which matches buttons prior to Home Assistant 2025.8.

![Button variant and appearance sample image](https://github.com/user-attachments/assets/7518310a-78b9-4793-98b5-54a3acf2c5bd)

https://github.com/user-attachments/assets/936dc909-ddda-4ccf-bc5b-f5981d314088

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

**NOTE:** If you use an Object Selector (yaml) together with a right button, the right button will be disabled and an error displayed when the yaml has a parsing error. This is due to the way the underlying Home Assistant yaml editor works to provide the output yaml as an object. While there is a yaml parsing error, the parsed yaml cannot be provied and nothing would be returned if the user was allowed to continue.

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

## Multiple popups

When you open a new popup while a current popup is already showing and the popups have no tag or both have the same tag, the current popup will be dismissed and replaced by the new popup. To make the new popup appear over the current popup, assign a different tag to at least one of the popups to distinguish them from one another. Then when you close the new popup, the previous popup will still be there underneath.

Examples below use yaml. You may use `popup_card_id` to use a template popup card which has popup tag set, or alternatively set `tag` in the browser/service call directly. The examples below use browser calls.

Example 1: Standard second popup with no popup dialog tag. When the second popup is shown by tapping the button on the first popup, the first popup will be replaced. The popup HTML element is the standard `<browser-mod-popup>`.

```yaml
...
type: button
name: Standard second popup
tap_action:
  action: fire-dom-event
  browser_mod:
    service: browser_mod.popup
    data:
      title: First popup
      content:
        type: vertical-stack
        cards:
          - type: markdown
            content: Use button to show second popup
          - type: button
            name: Show second popup
            tap_action:
              action: fire-dom-event
              browser_mod:
                service: browser_mod.popup
                data:
                  title: Second popup
                  content: I am a popup with no tag.
```

Example 2: Showing use of multiple popups by using a tag on the second popup. When the second popup is shown by tapping the button on the first popup, the second popup is displayed in front of the first. The popup HTML element is `<browser-mod-popup-lights>`.

```yaml
...
type: button
name: Standard second popup
tap_action:
  action: fire-dom-event
  browser_mod:
    service: browser_mod.popup
    data:
      title: First popup
      content:
        type: vertical-stack
        cards:
          - type: markdown
            content: Use button to show second popup
          - type: button
            name: Show second popup
            tap_action:
              action: fire-dom-event
              browser_mod:
                service: browser_mod.popup
                data:
                  title: Second popup
                  content: I am a popup with 'lights' dialog tag. I also have a left chevron as popup dismiss icon.
                  tag: lights
                  dismiss_icon: mdi:chevron-left
```

![Screenshot of multiple popups](https://github.com/user-attachments/assets/23287fe2-1520-4ad0-8fbb-be010a116ec5)

>NOTE: Popup dialog tags MUST be a lower case alphanumeric string. If using the UI popup card editor, quotes will be added when required. If using yaml directly, make sure to quote when required (e.g. numerals only string).

See [`browser_mod.popup'](./services.md#browser_modpopup) for using `tag` and `dismiss_icon` yaml parameters.

### Closing multiple popups

When using [`browser_mod.close_popup`](./services.md#browser_modclose_popup) service to close popups, you can choose to either:

1. Close all popups
2. Close popup by tag
3. Closing top most popup

### Multiple popups and card-mod themes

For working with card-mod and themes see https://github.com/thomasloven/lovelace-card-mod/wiki/Card-mod-Themes.

Prior to supporting multiple popups, Browser Mod 2 registered a card-mod type `more-info` for popups allowing the popup to be styled in a theme via `card-mod-more-info-yaml` or `card-mod-more-info-json`. For multiple popups, the card-mod type is constructed from the popup tag. For a popup dialog tag of `lights` the card-mod type is `browser-mod-popup-lights` allowing to the popup to be styled in a theme via `card-mod-browser-mod-popup-lights-yaml` or `card-mod-browser-mod-popup-lights-json`. Popups wih no popup tag retain the card-mod type `more-info`.
