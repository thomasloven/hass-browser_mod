# Styles

- [Styles](#styles)
  - [Using popup styles](#using-popup-styles)
  - [Special popup styles](#special-popup-styles)
  - [Setting styles for a popup](#setting-styles-for-a-popup)
    - [Initial style (`initial_style`)](#initial-style-initial_style)
    - [Style sequence (`style_sequence`)](#style-sequence-style_sequence)
    - [Popup styles (`popup_styles`)](#popup-styles-popup_styles)
      - [Popup styles - style (`popup_styles` \> `style`)](#popup-styles---style-popup_styles--style)
      - [Popup styles - Also apply styles from... (`popup_styles` \> `include_styles`)](#popup-styles---also-apply-styles-from-popup_styles--include_styles)
      - [Popup styles - styles (`popup_styles` \> `styles`)](#popup-styles---styles-popup_styles--styles)
  - [Example - Centered](#example---centered)
    - [Vertically centered style (`centered`)](#vertically-centered-style-centered)
    - [Vertically centered wide style (`centered-wide`)](#vertically-centered-wide-style-centered-wide)
    - [Initial style and Style sequence](#initial-style-and-style-sequence)
    - [All style](#all-style)
  - [Example - Change background color](#example---change-background-color)
  - [Example - using media query](#example---using-media-query)
  - [Example - card\_mod direct](#example---card_mod-direct)
  - [Example - card\_mod theme](#example---card_mod-theme)
  - [Dialog styles](#dialog-styles)
    - [Browser Mod](#browser-mod)
    - [ha-dialog](#ha-dialog)

This document describes various styling techniques for Browser Mod popups.

> NOTE: Prior to version 2.6.0, popups had set `size` and `style` parameters which are now deprecated in favour of styling described in this document.

Popup styling has evolved out of setting size appearance of popups. Since version 2.6.0, styling has been extended. As well as the standard styles of `normal`, `wide`, `fullscreen` and `classic`, you can also add your own custom styles. Custom styles can be fully independent of the standard styles, or include a standard style, or one or more of your own custom styles. In this way you can build styling to suit your needs.

## Using popup styles

Popup styles are used in the following ways:

1. Using the `initial_style` parameter which sets the initial style of the popup. Prior to version 2.6.0 this was the `size` parameter.
2. Using the `style_sequence` parameter. This is an ordered list of styles which will be cycled through when a popup title is tapped. By default a popup will cycle between `wide` and `normal` styles.
3. Using [`browser_mod.set_popup_style`](services.md#browser_modset_popup_style) service to set a style directly, or cycle forward or back through the `style_sequence`.

## Special popup styles

As well as the standard styles `normal`, `wide`, `fullscreen` and `classic`, two special popup styles are available.

1. `all` - this is always applied.
2. `card` - this is applied when the popup content is a card.

## Setting styles for a popup

In Home Assistant dashboard editor (UI mode) look for the _Popup Styles_ section in the Popup card editor. In yaml use the parameters referred to below.

### Initial style (`initial_style`)

This is the initial style of the popup. Perhaps just `style` would be suitable parameter name but as that was used prior to version 2.6.0 (and is still supported) a different parameter was required. Also, it is just the initial style as it can by changed tapping the popup title and using [`browser_mod.set_popup_style`](services.md#browser_modset_popup_style) service.

Standard styles of `normal`, `wide`, `fullscreen` and `classic` can be selected. See [popups.md](popups.md#style) for examples of what each standard style looks like.

You can also type in your own style. This needs to match a style in Popup styles (`popup_styles`) list.

The [centered](#example---centered) example uses the custom style _centered_ as the initial style.

### Style sequence (`style_sequence`)

This is an ordered list of popup styles. This list is used to define which styles to cycle through when the popup title is tapped, or when using the `direction` parameter of `browser_mod.set_popup_style`.

The default style sequence used, if not set, is `wide` - `normal`, mimicking the standard Home Assistant more-info dialog title tap functionality.

The [centered](#example---centered) example uses a style sequence of `centered` - `centered-wide` - `fullscreen`.

### Popup styles (`popup_styles`)

This is a list of customised styles for the popup. You can customise the standard `normal`, `wide`, `fullscreen`, `classic` styles, the special `all` or `card` styles, or customise your own.

#### Popup styles - style (`popup_styles` > `style`)

The name of the style to customise. You can customise the standard `normal`, `wide`, `fullscreen`, `classic` styles, the special `all` or `card` styles, or your own style. If you customise your own style, it can then be used for `initial_style` and/or included in `style_sequence`.

The [centered](#example---centered) example uses custom style names of `centered` and `centered-wide`.

#### Popup styles - Also apply styles from... (`popup_styles` > `include_styles`)

A list of styles to include when the customised style is applied. Generally this would only be used for your own custom styles, to include other custom styles or a standard style.

The [centered](#example---centered) example includes `classic` for `centered` and `wide` for `centered-wide`.

#### Popup styles - styles (`popup_styles` > `styles`)

CSS style rules for the customised style.

## Example - Centered

This example shows how to apply popup card configuration so that the popup cycles through styles of vertically centered, vertically centered wide and fullscreen.

> TIP: For CSS style variables available for dialog see [dialog styles](#dialog-styles)

### Vertically centered style (`centered`)

Here ths CSS variable `--dialog-surface-margin-top: auto !important;` is used to center the popup. As `classic` also defines this property at the same specificity, `!important` must be added.

```yaml
...
popup_styles:
  - style: centered
    include_styles:
      - classic
    styles: |
      ha-dialog {
        --dialog-surface-margin-top: auto !important;
      }
```

### Vertically centered wide style (`centered-wide`)

Here we extend `popup_styles` to define the style `centered-wide`, including styles from `wide`, `classic` and our own custom `centered`. No CSS styles need to be defined.

```yaml
#... other popup config
popup_styles:
  - style: centered
    include_styles:
      - classic
    styles: |
      ha-dialog {
        --dialog-surface-margin-top: auto !important;
      }
  - style: centered-wide
    include_styles:
      - classic
      - wide
      - centered
```

### Initial style and Style sequence

To have the popup initially shown centered using our custom `centered` style we need to set Initial style to `centered`.

Without setting a Style sequence, the default sequence of `wide` - `normal` would be used. So here we define a style sequence of `centered-wide` - `fullscreen` - `centered`.

> TIP: When the popup is shown, Browser Mod will seek to find the `initial_style` in the Style sequence. If not found then the first sequence in the Style sequence list will be used when the popup title is tapped or `browser_mod.set_popup_style` service with `direction: forward` is called.

```yaml
#... other popup config
initial_style: centered
style_sequence:
  - centered-wide
  - fullscreen
  - centered
popup_styles:
  - style: centered
    include_styles:
      - classic
    styles: |
      ha-dialog {
        --dialog-surface-margin-top: auto !important;
      }
  - style: centered-wide
    include_styles:
      - classic
      - wide
      - centered
```

### All style

If the popup requires styles to always be applied, the special popup style `all` can be customised. The `centered` popup has two `icons` with classes set as `home-icon` and `account-icon`. To allow for these icons to be styled we can add a Popup style of `all` and add CSS rules to style the icon.

> TIP: As `all` is always applied, it **does not** need to be included in any other style.

```yaml
#... other popup config
icons:
  - icon: mdi:account
    title: Account
    class: account-icon
  - icon: mdi:home
    title: Home
    class: home-icon
initial_style: centered
style_sequence:
  - centered-wide
  - fullscreen
  - centered
popup_styles:
  - style: centered
    include_styles:
      - classic
    styles: |
      ha-dialog {
        --dialog-surface-margin-top: auto !important;
      }
  - style: centered-wide
    include_styles:
      - classic
      - wide
      - centered
  - style: all
    styles: |-
      .account-icon {
        color: red;
      }
      .home-icon {
        color: blue;
      }
```

## Example - Change background color

A simple example of `all` style for changing background color of a popup. The CSS variables to style the background here are two Home Assistant variables, `--card-background-color` for dialog background and `--ha-card-background` for card background. Text color is also changed to white by setting `--primary-text-color`.

```yaml
type: custom:popup-card
title: Red popup
card:
  type: markdown
  content: I have a red background and white text.
popup_card_id: red-popup
popup_styles:
  - style: all
    styles: |-
      ha-dialog {
        --card-background-color: red;
        --ha-card-background: red;
        --primary-text-color: white;
        color: white;
      }
```

## Example - using media query

This example reduces various sizes for when the popup is shown on a small device. The media query used in the CSS style rule is `@media (max-width: 450px), (max-height: 500px)`.

Notes:

- Included style is `classic`. `card` will also be applied as the content is a markdown card.
- `--ha-dialog-border-radius` needs `!important` as it is at same specificity of same variable included in `classic`
- Padding for `.container .content` needs `important!` as it is at the same specificity of selector included in `card`.
- The generous padding for the markdown card cannot be styled here as it is in a shadow DOM and does not provide styling variables. See [Example - card_mod direct](#example---card_mod-direct) for styling using card-mod where this example will be extended to reduce the generous markdown card padding.
- Style sequence (`style_sequence`) is set to be only the initial style.

```yaml
type: custom:popup-card
title: Mobile Small Header Popup
dismissable: true
card:
  type: markdown
  content: >-
    This text will be smaller due to the markdown card not specifying typography 
    styling hence inheriting from the content element.
popup_card_id: mobile-small-header
popup_styles:
  - style: mobile-small-header
    styles: |-
      @media (max-width: 450px), (max-height: 500px) {
        ha-dialog {
          --ha-dialog-border-radius: 0px !important;
        }
        ha-dialog-header {
          --ha-font-weight-normal: 300;
          --ha-font-size-xl: 1.2em;
          --mdc-icon-button-size: 24px;
          --mdc-icon-size: 16px;
        }
        ha-dialog-header > ha-icon-button {
          padding: 8px;
        }
        .content {
          font-size: 0.9em;
          font-weight: 300;
          line-height: 1.3em;
        }
        .content .container {
          padding: 0px !important; 
        }
      }
    include_styles:
      - classic
initial_style: mobile-small-header
style_sequence:
  - mobile-small-header
```

## Example - card_mod direct

There may be cases where cards used in popups have styling also not accessible. The prior example is one such case where the padding for the markdown card used for popup content cannot be styled directly.

The example below uses [card-mod](https://github.com/thomasloven/lovelace-card-mod) to reduce the generous padding around the markdown card. The markdown element with padding is in the shadow root of `hui-markdown-card` (card-mod selector `hui-markdown-card $:`).

```yaml
type: custom:popup-card
dismissable: true
card:
  type: markdown
  content: >-
    This popup will have reduced padding on markdown
    content.
popup_card_id: card-mod-popup
title: Card-mod Popup
card_mod:
  style:
    hui-markdown-card $: |
      ha-markdown {
        padding: 8px;
      }
```

## Example - card_mod theme

For simplicity or working with styling like animation where card-mod application is need to be early, you can use [card-mod themes](https://github.com/thomasloven/lovelace-card-mod/wiki/Card-mod-Themes).

Browser Mod 2 has classically supported card-mod theme tags of `card-mod-more-info` or `card-mod-more-info-yaml` which retained for backwards compatibility and are used in the examples below. If you are using multiple popup tags see [Multiple popups and card-mod themes](popups.md#multiple-popups-and-card-mod-themes) for more information.

This first example uses a popup style `background-red` for which a theme CSS rule for `card-mod-more-info` sets the background of popup and cards to red with white text and icon.

> NOTE: In the theme yaml we need to include `:host([background-red]) { }` outer selector which is done automatically when using popup styles for popup configuration.

_Theme yaml_:

```yaml
Browser Mod Theme:
  card-mod-theme: Browser Mod Theme

  card-mod-more-info: |
    :host([background-red]){
      ha-dialog {
        --card-background-color: red;
        --ha-card-background: red;
        --primary-text-color: white;
        color: white;
      }
    }
```

Then in your popup you can just add the popup style `background-red`. Here we also add `background-red-wide` which includes `background-red` and `wide` and then set style sequence to `background-red-wide` - `background-red`.

_Popup yaml_:

```yaml
type: custom:popup-card
title: Background red (by theme)
dismissable: true
card:
  type: markdown
  content: >-
    This card can be used in browser_mod.popup service or to replace the
    more-info dialog
popup_card_id: theme-background-red
popup_styles:
  - style: background-red
  - style: background-red-wide
    include_styles:
      - background-red
      - wide
style_sequence:
  - background-red-wide
  - background-red
initial_style: background-red
```

This second example uses animation to slide the popup in from the right. It uses a multiple popup tag as this is the only way to be able to separate popup theming as popup style targeting is not possible in the shadow DOM. The theme also shows the use of yaml for card-mod theming which is also required as we are styling the shadow DOM.

> NOTE: The theme section here is `card-mod-browser-mod-popup-slide-in-yaml`. This is built up based on:
>
> - all card-mod theme sections start with `card-mod`
> - all Browser Mod card-mod popup theme sections continue with `-browser-mod-popup`
> - as the popup has a multiple popup tag of `slide-in` this adds `-slide-in`
> - as the multiple style is yaml, with shadow dom targeting, this adds `-yaml`

_Theme yaml_:

```yaml
Browser Mod Theme 2:
  card-mod-theme: Browser Mod Theme 2

  card-mod-browser-mod-popup-slide-in-yaml: |
    .: |
      ha-dialog {
        --dialog-surface-margin-top: auto !important;
        --ha-dialog-show-duration: 1ms;
        --ha-dialog-hide-duration: 1ms;
      }
    ha-dialog $ wa-dialog $: |
      @keyframes slide-in { from { transform:translateX(100%) } to {
      transform: translateX(0); } }

      dialog {
        animation: slide-in 0.3s forwards;
      }
```

_Popup yaml_:

```yaml
type: custom:popup-card
dismissable: true
card:
  type: markdown
  content: This popup will slide in from the right.
popup_card_id: theme-slide-in
title: Card-mod Theme Slide In
tag: slide-in
```

## Dialog styles

The following is a list of CSS variables that are available for using in popup styles. These lists may not be comprehensive nor do they include information about styling directly in the shadow dom.

> NOTE: Any updates to this list due to changes in Home Assistant Frontend will be part of future release notes.

### Browser Mod

- --padding-x
- --padding-y
- --popup-width
- --popup-border-radius
- --popup-min-width
- --popup-max-width
- --popup-width-full
- --popup-min-height
- --popup-max-height

### ha-dialog

- --card-background-color
- --ha-dialog-border-radius
- --dialog-content-padding
- --dialog-surface-margin-top
