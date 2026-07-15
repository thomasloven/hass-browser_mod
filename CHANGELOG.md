## [3.1.0](https://github.com/thomasloven/hass-browser_mod/compare/v3.0.2...v3.1.0) (2026-07-15)

### ⭐ New Features

* For frontend settings table show Browser friendly name (device by user if renamed in integration) if it exists, followed by Browser ID in brackets, else Browser ID. ([561639f](https://github.com/thomasloven/hass-browser_mod/commit/561639fc6030da8bef620e9dfac88210f47e70e7)), closes [#1344](https://github.com/thomasloven/hass-browser_mod/issues/1344)
* Implement Browser Mod integration diagnostics which includes Dashboard resource mode, list of Dashboard resources and Browser Mod stored settings. ([462a041](https://github.com/thomasloven/hass-browser_mod/commit/462a04155847926e642338726b84e721953bddb9))

### 🐞 Bug Fixes

* Empty object `{}` or empty strings being saved as Frontend settings giving rise to Issue [#1346](https://github.com/thomasloven/hass-browser_mod/issues/1346) ([0362440](https://github.com/thomasloven/hass-browser_mod/commit/0362440b78c234c8a43b9e82ba5769674f35cfad))
* For registered browsers, show device friendly name first if it has been renamed, with Browser ID in brackets - this is reverse of prior versions. ([f308b41](https://github.com/thomasloven/hass-browser_mod/commit/f308b4194f8dd85bba75fd873d7c5b08ba5c1705))
* Pass `theme` config when applying UIX styling to popup. Allows to use UIX theme override for popups which do not inherit any view theme as they are loaded above view in DOM. ([ecd8195](https://github.com/thomasloven/hass-browser_mod/commit/ecd8195ca80b6456dd53eb763396d6aac66a58b0))
* Sidebar menu item not hidden on strategy dashboards (Home etc) or some config pages when hideSidebar config is set for a device/user/global ([d00a159](https://github.com/thomasloven/hass-browser_mod/commit/d00a1597ac6d1f07c56a38ffe65d4be5f40ef168))
* Template console error when Title, Sidebar title or Favicon have template which is an empty object `{}` ([9de4a06](https://github.com/thomasloven/hass-browser_mod/commit/9de4a06a12385eb5916d3c95272b483bbcd37f4c)), closes [#1346](https://github.com/thomasloven/hass-browser_mod/issues/1346)

### ⚙️ Miscellaneous

* Bump minimum Home Assistant version to 2026.7.0 due to config panel top bar changes. ([b785f5a](https://github.com/thomasloven/hass-browser_mod/commit/b785f5a9b0bf5c68964951a06acaeb08a66514b7)), closes [#1341](https://github.com/thomasloven/hass-browser_mod/issues/1341)

## [3.1.0-beta.3](https://github.com/thomasloven/hass-browser_mod/compare/v3.1.0-beta.2...v3.1.0-beta.3) (2026-07-13)

### ⭐ New Features

* Implement Browser Mod integration diagnostics which includes Dashboard resource mode, list of Dashboard resources and Browser Mod stored settings. ([462a041](https://github.com/thomasloven/hass-browser_mod/commit/462a04155847926e642338726b84e721953bddb9))

## [3.1.0-beta.2](https://github.com/thomasloven/hass-browser_mod/compare/v3.1.0-beta.1...v3.1.0-beta.2) (2026-07-13)

### 🐞 Bug Fixes

* Empty object `{}` or empty strings being saved as Frontend settings giving rise to Issue [#1346](https://github.com/thomasloven/hass-browser_mod/issues/1346) ([0362440](https://github.com/thomasloven/hass-browser_mod/commit/0362440b78c234c8a43b9e82ba5769674f35cfad))
* Template console error when Title, Sidebar title or Favicon have template which is an empty object `{}` ([9de4a06](https://github.com/thomasloven/hass-browser_mod/commit/9de4a06a12385eb5916d3c95272b483bbcd37f4c)), closes [#1346](https://github.com/thomasloven/hass-browser_mod/issues/1346)

### ⚙️ Miscellaneous

* Bump minimum Home Assistant version to 2026.7.0 due to config panel top bar changes. ([b785f5a](https://github.com/thomasloven/hass-browser_mod/commit/b785f5a9b0bf5c68964951a06acaeb08a66514b7)), closes [#1341](https://github.com/thomasloven/hass-browser_mod/issues/1341)

## [3.1.0-beta.1](https://github.com/thomasloven/hass-browser_mod/compare/v3.0.3-beta.1...v3.1.0-beta.1) (2026-07-12)

### ⭐ New Features

* For frontend settings table show Browser friendly name (device by user if renamed in integration) if it exists, followed by Browser ID in brackets, else Browser ID. ([561639f](https://github.com/thomasloven/hass-browser_mod/commit/561639fc6030da8bef620e9dfac88210f47e70e7)), closes [#1344](https://github.com/thomasloven/hass-browser_mod/issues/1344)

### 🐞 Bug Fixes

* For registered browsers, show device friendly name first if it has been renamed, with Browser ID in brackets - this is reverse of prior versions. ([f308b41](https://github.com/thomasloven/hass-browser_mod/commit/f308b4194f8dd85bba75fd873d7c5b08ba5c1705))
* Sidebar menu item not hidden on strategy dashboards (Home etc) or some config pages when hideSidebar config is set for a device/user/global ([d00a159](https://github.com/thomasloven/hass-browser_mod/commit/d00a1597ac6d1f07c56a38ffe65d4be5f40ef168))

## [3.0.3-beta.1](https://github.com/thomasloven/hass-browser_mod/compare/v3.0.2...v3.0.3-beta.1) (2026-07-11)

### 🐞 Bug Fixes

* Pass `theme` config when applying UIX styling to popup. Allows to use UIX theme override for popups which do not inherit any view theme as they are loaded above view in DOM. ([ecd8195](https://github.com/thomasloven/hass-browser_mod/commit/ecd8195ca80b6456dd53eb763396d6aac66a58b0))

## [3.0.2](https://github.com/thomasloven/hass-browser_mod/compare/v3.0.1...v3.0.2) (2026-07-06)

### 🐞 Bug Fixes

* Edit sidebar dialog does not show on Home Assistant 2026.6.x and earlier with Browser Mod 3.0.1 ([d2e4d71](https://github.com/thomasloven/hass-browser_mod/commit/d2e4d71811efdc3284a79f2c602fc033a2419784))

## [3.0.1](https://github.com/thomasloven/hass-browser_mod/compare/v3.0.0...v3.0.1) (2026-07-06)

### 🐞 Bug Fixes

* Release to correctly push new Browser Panel and Config Panel ([678244c](https://github.com/thomasloven/hass-browser_mod/commit/678244c585298ace488ea484e90e4381ae8f212e))
* Sidebar settings prompt `Edit with Browser Mod` to correctly go to new integration config panel and not Frontend config panel. ([a149e30](https://github.com/thomasloven/hass-browser_mod/commit/a149e30d2eb2d6cf6a0d1005556a16ffaa2f452d))
* When editing sidebar Frontend settings the save button will only show after second change, not after a single change. ([97fa528](https://github.com/thomasloven/hass-browser_mod/commit/97fa52889d78ee1a76a9290c647d8c863b3e22a4))

## [3.0.0](https://github.com/thomasloven/hass-browser_mod/compare/v2.13.5...v3.0.0) (2026-07-01)

### ⚠ BREAKING CHANGES

* Browser Mod Config panel now in integration settings. Use settings cog icon to configure global settings and Frontend settings for User/Browser/Global.
* **major:** Requires Home Assistant 2026.6.0 or greater.

### 🐞 Bug Fixes

* Close icon shows on popup when dismissable is set to false. (Esc key is correctly blocked). ([#1322](https://github.com/thomasloven/hass-browser_mod/issues/1322)) ([72cef37](https://github.com/thomasloven/hass-browser_mod/commit/72cef375acf853f65f06d8b01c358e24a250ab51)), closes [#1321](https://github.com/thomasloven/hass-browser_mod/issues/1321)
* detect header class in shadowRoot when hiding header ([8dd5a90](https://github.com/thomasloven/hass-browser_mod/commit/8dd5a901b467124430f78297d1a8b1a6e287bbc8))
* Need to wait when running updates after location-changed or pop-state ([1e6ece3](https://github.com/thomasloven/hass-browser_mod/commit/1e6ece39535489d39b96ea6133adf659f5659893))

### ⚙️ Miscellaneous

* Migrate ha-md-list-item to ha-row-item in Browser Mod panel. ([06ca5f9](https://github.com/thomasloven/hass-browser_mod/commit/06ca5f91c5a406b2999694daf8ee3c49998cb5bc))
* Move Browser Mod Config panel to integration settings. 'This Browser' remains as Frontend Browser panel.([#1323](https://github.com/thomasloven/hass-browser_mod/issues/1323)) ([de0ebbb](https://github.com/thomasloven/hass-browser_mod/commit/de0ebbb3a8e73888f2a5de350dfa7f83a8689a50)), closes [#898](https://github.com/thomasloven/hass-browser_mod/issues/898)

## [2.13.5](https://github.com/thomasloven/hass-browser_mod/compare/v2.13.4...v2.13.5) (2026-05-28)

### 🐞 Bug Fixes

* Use Frontend native action for browser_mod.navigate to work correctly when used as a dialog action ([#1309](https://github.com/thomasloven/hass-browser_mod/issues/1309)) ([a3cd1f7](https://github.com/thomasloven/hass-browser_mod/commit/a3cd1f7dd2f19418f3c96a9d4bcac20cf9dce542)), closes [#1308](https://github.com/thomasloven/hass-browser_mod/issues/1308)

## [2.13.5-beta.1](https://github.com/thomasloven/hass-browser_mod/compare/v2.13.4...v2.13.5-beta.1) (2026-05-26)

### 🐞 Bug Fixes

* Use Frontend native action for browser_mod.navigate to work correctly when used as a dialog action ([#1309](https://github.com/thomasloven/hass-browser_mod/issues/1309)) ([a3cd1f7](https://github.com/thomasloven/hass-browser_mod/commit/a3cd1f7dd2f19418f3c96a9d4bcac20cf9dce542)), closes [#1308](https://github.com/thomasloven/hass-browser_mod/issues/1308)

## [2.13.4](https://github.com/thomasloven/hass-browser_mod/compare/v2.13.3...v2.13.4) (2026-05-25)

### 🐞 Bug Fixes

* Handle frontend resource scripts correctly when reloading integration from integartion menu ([#1302](https://github.com/thomasloven/hass-browser_mod/issues/1302)) ([5b2a4cf](https://github.com/thomasloven/hass-browser_mod/commit/5b2a4cf144dfbfa13aa7b7fcefc1dcc88cc1cbd7)), closes [#1301](https://github.com/thomasloven/hass-browser_mod/issues/1301)
* Workaround iFrames in popup causing double history state by setting dialog addHistory option to false when content contains iFrame. Without this workaround, interacting with iFrame will cause any Home Assistant dialog not to open after popup is closed. ([#1298](https://github.com/thomasloven/hass-browser_mod/issues/1298)) ([558c2bd](https://github.com/thomasloven/hass-browser_mod/commit/558c2bd515cfe30537d22e142c788368a97fa8e0))

## [2.13.3](https://github.com/thomasloven/hass-browser_mod/compare/v2.13.2...v2.13.3) (2026-05-17)

### 🐞 Bug Fixes

* Popup dialogs not opening in scenrio of opening once, switching views, opening again, after which popup will not longer open. ([#1290](https://github.com/thomasloven/hass-browser_mod/issues/1290)) ([3252afe](https://github.com/thomasloven/hass-browser_mod/commit/3252afe606a4d6e228f32a7cd4ed2e70c0a5de39)), closes [#1289](https://github.com/thomasloven/hass-browser_mod/issues/1289)

## [2.13.2](https://github.com/thomasloven/hass-browser_mod/compare/v2.13.1...v2.13.2) (2026-05-16)

### 🐞 Bug Fixes

* Prevent invalid Browser IDs from propagating through sync-session recall ([#1283](https://github.com/thomasloven/hass-browser_mod/issues/1283)) ([83f4667](https://github.com/thomasloven/hass-browser_mod/commit/83f466733dcbffd9870329f676ac095a03c6384d))

## [2.13.1](https://github.com/thomasloven/hass-browser_mod/compare/v2.13.0...v2.13.1) (2026-05-16)

### 🐞 Bug Fixes

* Restore default dashboard fallback by always persisting Browser Mod `defaultPanel` in localStorage. NOTE: This method only works for devices when no Home Assistant system default has ever been set. ([11855c5](https://github.com/thomasloven/hass-browser_mod/commit/11855c51bb95eff91a0b6daf915257b4a07fc570))

## [2.13.0](https://github.com/thomasloven/hass-browser_mod/compare/v2.12.0...v2.13.0) (2026-05-14)

### ⭐ New Features

* Closing via button actions or browser_mod.close_popup now runs underlying dialog closing animations. ([#1278](https://github.com/thomasloven/hass-browser_mod/issues/1278)) ([20abd39](https://github.com/thomasloven/hass-browser_mod/commit/20abd392e1c15b03a6b5cbb3c6952e4b31fab137)), closes [#1277](https://github.com/thomasloven/hass-browser_mod/issues/1277)
* Implement defaultDashboard Frontend setting via server-side system_data and user_data overrides ([#1276](https://github.com/thomasloven/hass-browser_mod/issues/1276)) ([787be94](https://github.com/thomasloven/hass-browser_mod/commit/787be94cec2b468299e21d0ec595150f38bf3c1e))
* New setting to sync Browser ID to login session which allows for Browser ID recall when using same login session on Companion Apps ([#1270](https://github.com/thomasloven/hass-browser_mod/issues/1270)) ([b5f5127](https://github.com/thomasloven/hass-browser_mod/commit/b5f5127a11132e1363c6981d1f01431b8f8de5ec)), closes [#1158](https://github.com/thomasloven/hass-browser_mod/issues/1158)

### 🐞 Bug Fixes

* Browser Mod services `user_id` target resolution on HA 2026.05 ([#1274](https://github.com/thomasloven/hass-browser_mod/issues/1274)) ([475956e](https://github.com/thomasloven/hass-browser_mod/commit/475956ee56fe6734c3f047abf57f80f13d197dd0))
* Hiding of sidebar and header on Home dashboard and custom config panels ([#1272](https://github.com/thomasloven/hass-browser_mod/issues/1272)) ([9900e27](https://github.com/thomasloven/hass-browser_mod/commit/9900e272fc7c44846941db3890a49d236d5dd610)), closes [#1271](https://github.com/thomasloven/hass-browser_mod/issues/1271)

### ⚙️ Miscellaneous

* Update typescript to version 6 and associated type updates ([#1275](https://github.com/thomasloven/hass-browser_mod/issues/1275)) ([51558b3](https://github.com/thomasloven/hass-browser_mod/commit/51558b3d1464986fb72265d0ccd815956c32e78c))

## [2.12.0](https://github.com/thomasloven/hass-browser_mod/compare/v2.11.0...v2.12.0) (2026-05-03)

### ⭐ New Features

* Enable push camera stream to go2rtc via WebRTC/WHIP [#1267](https://github.com/thomasloven/hass-browser_mod/issues/1267) from widewing/codex/go2rtc-whip-publish ([e7d47ba](https://github.com/thomasloven/hass-browser_mod/commit/e7d47ba7592e02f02c09dc647150455518f717d9))

### 🙏  New Contributors

[@widewing](https://github.com/widewing) - great contribution for publishing camera stream to go2rtc.

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
