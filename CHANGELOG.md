## [2.12.0](https://github.com/thomasloven/hass-browser_mod/compare/v2.11.0...v2.12.0) (2026-05-03)

### ⭐ New Features

* Enable push camera stream to go2rtc via WebRTC/WHIP [#1267](https://github.com/thomasloven/hass-browser_mod/issues/1267) from widewing/codex/go2rtc-whip-publish ([e7d47ba](https://github.com/thomasloven/hass-browser_mod/commit/e7d47ba7592e02f02c09dc647150455518f717d9))

## [2.12.0-beta.1](https://github.com/thomasloven/hass-browser_mod/compare/v2.11.0...v2.12.0-beta.1) (2026-04-28)

### ⭐ New Features

* Enable push camera stream to go2rtc via WebRTC/WHIP [#1267](https://github.com/thomasloven/hass-browser_mod/issues/1267) from widewing/codex/go2rtc-whip-publish ([e7d47ba](https://github.com/thomasloven/hass-browser_mod/commit/e7d47ba7592e02f02c09dc647150455518f717d9))

## [2.11.0](https://github.com/thomasloven/hass-browser_mod/compare/v2.10.2...v2.11.0) (2026-04-24)

### 🐞 Bug Fixes

* Possible issue blocking standard more-info on settings pages like updates, especially when using shortcuts dialog to navigate to settings page ([6134f41](https://github.com/thomasloven/hass-browser_mod/commit/6134f416d2f491d2fb64a9aa1a2ac02f3a2e7015))

## [2.10.2](https://github.com/thomasloven/hass-browser_mod/compare/v2.10.1...v2.10.2) (2026-04-01)

### 🐞 Bug Fixes

* **popup:** Action from popup that will open new popup with same tag (or no tag) causes new popup not to show. ([#1250](https://github.com/thomasloven/hass-browser_mod/issues/1250)) ([c55d1be](https://github.com/thomasloven/hass-browser_mod/commit/c55d1bec82cc0a1b5b4d18cfd6d81a39a8f50f32))

## [2.10.1](https://github.com/thomasloven/hass-browser_mod/compare/v2.10.0...v2.10.1) (2026-03-28)

### 🐞 Bug Fixes

* Fix slider in browser-player card ([#1232](https://github.com/thomasloven/hass-browser_mod/issues/1232)) ([814d30e](https://github.com/thomasloven/hass-browser_mod/commit/814d30e0e1f5f9cc9e9ded764517132e00a77427))
* Frontend settings don't show on first open but do after second. Also shows console error. ([7b25109](https://github.com/thomasloven/hass-browser_mod/commit/7b2510912020c2f0dee600ef1ec06b96e810ba9d))
* **popup:** Adjust timeout bar for newer popup dialog structure. Now shows below header but sticky above content. ([#1243](https://github.com/thomasloven/hass-browser_mod/issues/1243)) ([76bb994](https://github.com/thomasloven/hass-browser_mod/commit/76bb9949c7e201936efdecf696159aa145745986)), closes [#1238](https://github.com/thomasloven/hass-browser_mod/issues/1238)
* **popup:** Footer buttons not always justified space-between ([#1236](https://github.com/thomasloven/hass-browser_mod/issues/1236)) ([afabdd6](https://github.com/thomasloven/hass-browser_mod/commit/afabdd61f8aa5304435775ca979cd6f056803d71))
* **popup:** Popup not respecting initial_style with Home Assistant 2026.4.0 ([#1240](https://github.com/thomasloven/hass-browser_mod/issues/1240)) ([fa192bc](https://github.com/thomasloven/hass-browser_mod/commit/fa192bc1a300269c349f5973bab21b8101777028))
* **popup:** Restore timeout progress var to popup dialog top ([#1245](https://github.com/thomasloven/hass-browser_mod/issues/1245)) ([4a22c3e](https://github.com/thomasloven/hass-browser_mod/commit/4a22c3eca151a5c55473b099ceafc868bcb25731))
* **popup:** Timeout bar not showing on standard popup. ([154d31b](https://github.com/thomasloven/hass-browser_mod/commit/154d31b7a725f7d59bcdcaa478100e8506b9bf7e))
* **popup:** Timeout delay (5s) when action on popup will reuse same popup (default or same tag). ([7ac3781](https://github.com/thomasloven/hass-browser_mod/commit/7ac3781c548c13511babe8287102a3df4d3782e1))

## [2.10.0](https://github.com/thomasloven/hass-browser_mod/compare/v2.9.0...v2.10.0) (2026-03-18)

### ⭐ New Features

* **minor:** Pass source entityId to more-info popup card configs ([#1221](https://github.com/thomasloven/hass-browser_mod/issues/1221)) ([e2e6752](https://github.com/thomasloven/hass-browser_mod/commit/e2e67522bcfd86addfb95f9be1bc5f6b733f9a16))

### 🐞 Bug Fixes

* Area target matching to include device-inherited area membership([#1225](https://github.com/thomasloven/hass-browser_mod/issues/1225)) ([5505d95](https://github.com/thomasloven/hass-browser_mod/commit/5505d9539c115cd7ab2e3cc76d943601b303b0ee)), closes [#1224](https://github.com/thomasloven/hass-browser_mod/issues/1224)
* Clear render of popup elements when closed. ([75adfcc](https://github.com/thomasloven/hass-browser_mod/commit/75adfccecba74e74417b35ade4637cfe6de752a1)), closes [#1215](https://github.com/thomasloven/hass-browser_mod/issues/1215)

### 📔 Documentation

* Update media query style example to suit 2.9.0 ([798aa2a](https://github.com/thomasloven/hass-browser_mod/commit/798aa2ad6f52f6310fae1aaaf7be86315b630f76))

## [2.9.0](https://github.com/thomasloven/hass-browser_mod/compare/v2.8.2...v2.9.0) (2026-03-09)

### ⭐ New Features

* Adaptive dialog support ([ad1b1ca](https://github.com/thomasloven/hass-browser_mod/commit/ad1b1cadea5a544b7cf1c7599feb97d900e0827c)), closes [#1175](https://github.com/thomasloven/hass-browser_mod/issues/1175)
* Use adaptive dialogs for Browser Mod Frontend settings popups. ([#1207](https://github.com/thomasloven/hass-browser_mod/issues/1207)) ([59d0784](https://github.com/thomasloven/hass-browser_mod/commit/59d07842d46a31aee00581f96031c61e81b2e7a0))

### 🐞 Bug Fixes

* Card picker on popup card editor may not show ([#1210](https://github.com/thomasloven/hass-browser_mod/issues/1210)) ([26e0e3a](https://github.com/thomasloven/hass-browser_mod/commit/26e0e3afcfcde877939e670e7a3c872a5752122a))
* Workaround for bottom-sheet sticking to a reduced height when same popup opened again ([#1208](https://github.com/thomasloven/hass-browser_mod/issues/1208)) ([3622f39](https://github.com/thomasloven/hass-browser_mod/commit/3622f399ede114558d92914d73011082d012e1e9))

## [2.8.2](https://github.com/thomasloven/hass-browser_mod/compare/v2.8.1...v2.8.2) (2026-03-06)

### 🐞 Bug Fixes

* Popup with no title still displays popup header ([9244cd7](https://github.com/thomasloven/hass-browser_mod/commit/9244cd7567d81a7725c9384cb19780e96f96e6c9))

## [2.8.1](https://github.com/thomasloven/hass-browser_mod/compare/v2.8.0...v2.8.1) (2026-03-05)

### 🐞 Bug Fixes

* Browser Mod panel settings for User and Browser don't proceed when clicking next ([b878e81](https://github.com/thomasloven/hass-browser_mod/commit/b878e814c2bd22243642a1b1da2d681b1d3fbe6b)), closes [#1196](https://github.com/thomasloven/hass-browser_mod/issues/1196)

### ⚙️ Miscellaneous

* Implement semantic-release ([#1189](https://github.com/thomasloven/hass-browser_mod/issues/1189)) ([d91b764](https://github.com/thomasloven/hass-browser_mod/commit/d91b7642e99ffb9e96c18cad6b725e808ad962f1))
