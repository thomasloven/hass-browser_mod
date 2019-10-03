/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../card-tools/card-maker.js":
/*!*********************************!*\
  !*** /card-tools/card-maker.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lit_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element.js */ \"../../../card-tools/lit-element.js\");\n/* harmony import */ var _lovelace_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lovelace-element.js */ \"../../../card-tools/lovelace-element.js\");\n/* harmony import */ var _hass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hass.js */ \"../../../card-tools/hass.js\");\n\n\n\n\nclass ThingMaker extends _lit_element_js__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n  static get properties() {\n    return {\n      'hass': {},\n      'config': {},\n      'noHass': {type: Boolean },\n    };\n  }\n  setConfig(config) {\n    this._config = config;\n    if(!this.el)\n      this.el = this.create(config);\n    else\n      this.el.setConfig(config);\n    if(this._hass) this.el.hass = this._hass;\n    if(this.noHass) Object(_hass_js__WEBPACK_IMPORTED_MODULE_2__[\"provideHass\"])(this);\n  }\n  set config(config) {\n    this.setConfig(config);\n  }\n  set hass(hass) {\n    this._hass = hass;\n    if(this.el) this.el.hass = hass;\n  }\n\n  createRenderRoot() {\n    return this;\n  }\n  render() {\n    return _lit_element_js__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`${this.el}`;\n  }\n}\n\nif(!customElements.get(\"card-maker\")) {\n  class CardMaker extends ThingMaker {\n    create(config) {\n      return Object(_lovelace_element_js__WEBPACK_IMPORTED_MODULE_1__[\"createCard\"])(config);\n    }\n  }\n  customElements.define(\"card-maker\", CardMaker);\n}\n\nif(!customElements.get(\"element-maker\")) {\n  class ElementMaker extends ThingMaker {\n    create(config) {\n      return Object(_lovelace_element_js__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"])(config);\n    }\n  }\n  customElements.define(\"element-maker\", ElementMaker);\n}\n\nif(!customElements.get(\"entity-row-maker\")) {\n  class EntityRowMaker extends ThingMaker {\n    create(config) {\n      return Object(_lovelace_element_js__WEBPACK_IMPORTED_MODULE_1__[\"createEntityRow\"])(config);\n    }\n  }\n  customElements.define(\"entity-row-maker\", EntityRowMaker);\n}\n\n\n//# sourceURL=webpack:////card-tools/card-maker.js?");

/***/ }),

/***/ "../../../card-tools/deviceId.js":
/*!*******************************!*\
  !*** /card-tools/deviceId.js ***!
  \*******************************/
/*! exports provided: deviceID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deviceID\", function() { return deviceID; });\nfunction _deviceID() {\n  const ID_STORAGE_KEY = 'lovelace-player-device-id';\n  if(window['fully'] && typeof fully.getDeviceId === \"function\")\n    return fully.getDeviceId();\n  if(!localStorage[ID_STORAGE_KEY])\n  {\n    const s4 = () => {\n      return Math.floor((1+Math.random())*100000).toString(16).substring(1);\n    }\n    localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;\n  }\n  return localStorage[ID_STORAGE_KEY];\n};\n\nlet deviceID = _deviceID();\n\n\n//# sourceURL=webpack:////card-tools/deviceId.js?");

/***/ }),

/***/ "../../../card-tools/event.js":
/*!****************************!*\
  !*** /card-tools/event.js ***!
  \****************************/
/*! exports provided: fireEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fireEvent\", function() { return fireEvent; });\nfunction fireEvent(ev, detail, entity=null) {\n  ev = new Event(ev, {\n    bubbles: true,\n    cancelable: false,\n    composed: true,\n  });\n  ev.detail = detail || {};\n  if(entity) {\n    entity.dispatchEvent(ev);\n  } else {\n    var root = document.querySelector(\"home-assistant\");\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"home-assistant-main\");\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"app-drawer-layout partial-panel-resolver\");\n    root = root && root.shadowRoot || root;\n    root = root && root.querySelector(\"ha-panel-lovelace\");\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"hui-root\");\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"ha-app-layout #view\");\n    root = root && root.firstElementChild;\n    if (root) root.dispatchEvent(ev);\n  }\n}\n\n\n//# sourceURL=webpack:////card-tools/event.js?");

/***/ }),

/***/ "../../../card-tools/hass.js":
/*!***************************!*\
  !*** /card-tools/hass.js ***!
  \***************************/
/*! exports provided: hass, provideHass, lovelace, lovelace_view, load_lovelace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hass\", function() { return hass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"provideHass\", function() { return provideHass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lovelace\", function() { return lovelace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lovelace_view\", function() { return lovelace_view; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load_lovelace\", function() { return load_lovelace; });\nfunction hass() {\n  return document.querySelector('home-assistant').hass\n};\n\nfunction provideHass(element) {\n  return document.querySelector(\"home-assistant\").provideHass(element);\n}\n\nfunction lovelace() {\n  var root = document.querySelector(\"home-assistant\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"home-assistant-main\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"app-drawer-layout partial-panel-resolver\");\n  root = root && root.shadowRoot || root;\n  root = root && root.querySelector(\"ha-panel-lovelace\")\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"hui-root\")\n  if (root) {\n    var ll =  root.lovelace\n    ll.current_view = root.___curView;\n    return ll;\n  }\n  return null;\n}\n\nfunction lovelace_view() {\n  var root = document.querySelector(\"home-assistant\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"home-assistant-main\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"app-drawer-layout partial-panel-resolver\");\n  root = root && root.shadowRoot || root;\n  root = root && root.querySelector(\"ha-panel-lovelace\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"hui-root\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"ha-app-layout #view\");\n  root = root && root.firstElementChild;\n  return root;\n}\n\nfunction load_lovelace() {\n  if(customElements.get(\"hui-view\")) return true;\n\n  const res = document.createElement(\"partial-panel-resolver\");\n  res.hass = hass();\n  res.route = {path: \"/lovelace/\"};\n  // res._updateRoutes();\n  try {\n    document.querySelector(\"home-assistant\").appendChild(res).catch((error) => {});\n  } catch (error) {\n    document.querySelector(\"home-assistant\").removeChild(res);\n  }\n  if(customElements.get(\"hui-view\")) return true;\n  return false;\n\n}\n\n\n//# sourceURL=webpack:////card-tools/hass.js?");

/***/ }),

/***/ "../../../card-tools/lit-element.js":
/*!**********************************!*\
  !*** /card-tools/lit-element.js ***!
  \**********************************/
/*! exports provided: LitElement, html, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LitElement\", function() { return LitElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"html\", function() { return html; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"css\", function() { return css; });\nconst LitElement = customElements.get('home-assistant-main') ? Object.getPrototypeOf(customElements.get('home-assistant-main')) : Object.getPrototypeOf(customElements.get('hui-view'));\n\nconst html = LitElement.prototype.html;\n\nconst css = LitElement.prototype.css;\n\n\n//# sourceURL=webpack:////card-tools/lit-element.js?");

/***/ }),

/***/ "../../../card-tools/lovelace-element.js":
/*!***************************************!*\
  !*** /card-tools/lovelace-element.js ***!
  \***************************************/
/*! exports provided: CUSTOM_TYPE_PREFIX, DOMAINS_HIDE_MORE_INFO, createCard, createElement, createEntityRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CUSTOM_TYPE_PREFIX\", function() { return CUSTOM_TYPE_PREFIX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMAINS_HIDE_MORE_INFO\", function() { return DOMAINS_HIDE_MORE_INFO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCard\", function() { return createCard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createEntityRow\", function() { return createEntityRow; });\n/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event.js */ \"../../../card-tools/event.js\");\n\n\nconst CUSTOM_TYPE_PREFIX = \"custom:\";\n\nconst DOMAINS_HIDE_MORE_INFO = [\n  \"input_number\",\n  \"input_select\",\n  \"input_text\",\n  \"scene\",\n  \"weblink\",\n];\n\nfunction errorElement(error, config) {\n  const el = document.createElement(\"hui-error-card\");\n  el.setConfig({\n    type: \"error\",\n    error,\n    config,\n  });\n  return el;\n}\n\nfunction _createElement(tag, config) {\n  const el = document.createElement(tag);\n  try {\n    el.setConfig(config);\n  } catch (err) {\n    return errorElement(err, config);\n  }\n  return el;\n}\n\nfunction createLovelaceElement(thing, config) {\n  if(!config || typeof config !== \"object\" || !config.type)\n    return errorElement(`No ${thing} type configured`, config);\n\n  let tag = config.type;\n  if(tag.startsWith(CUSTOM_TYPE_PREFIX))\n    tag = tag.substr(CUSTOM_TYPE_PREFIX.length);\n  else\n    tag = `hui-${tag}-${thing}`;\n\n  if(customElements.get(tag))\n    return _createElement(tag, config);\n\n  const el = errorElement(`Custom element doesn't exist: ${tag}.`, config);\n  el.style.display = \"None\";\n\n  const timer = setTimeout(() => {\n    el.style.display = \"\";\n  }, 2000);\n\n  customElements.whenDefined(tag).then(() => {\n    clearTimeout(timer);\n    Object(_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])(\"ll-rebuild\", {}, el);\n  });\n\n  return el;\n}\n\nfunction createCard(config) {\n  return createLovelaceElement('card', config);\n}\nfunction createElement(config) {\n  return createLovelaceElement('element', config);\n}\nfunction createEntityRow(config) {\n  const SPECIAL_TYPES = new Set([\n    \"call-service\",\n    \"divider\",\n    \"section\",\n    \"weblink\",\n  ]);\n  const DEFAULT_ROWS = {\n    alert: \"toggle\",\n    automation: \"toggle\",\n    climate: \"climate\",\n    cover: \"cover\",\n    fan: \"toggle\",\n    group: \"group\",\n    input_boolean: \"toggle\",\n    input_number: \"input-number\",\n    input_select: \"input-select\",\n    input_text: \"input-text\",\n    light: \"toggle\",\n    lock: \"lock\",\n    media_player: \"media-player\",\n    remote: \"toggle\",\n    scene: \"scene\",\n    script: \"script\",\n    sensor: \"sensor\",\n    timer: \"timer\",\n    switch: \"toggle\",\n    vacuum: \"toggle\",\n    water_heater: \"climate\",\n    input_datetime: \"input-datetime\",\n  };\n\n  if(!config)\n    return errorElement(\"Invalid configuration given.\", config);\n  if(typeof config === \"string\")\n    config = {entity: config};\n  if(typeof config !== \"object\" || (!config.entity && !config.type))\n    return errorElement(\"Invalid configuration given.\", config);\n\n  const type = config.type || \"default\";\n  if(SPECIAL_TYPES.has(type) || type.startsWith(CUSTOM_TYPE_PREFIX))\n    return createLovelaceElement('row', config);\n\n  const domain = config.entity.split(\".\", 1)[0];\n  Object.assign(config, {type: DEFAULT_ROWS[domain] || \"text\"});\n\n  return createLovelaceElement('entity-row', config);\n}\n\n\n//# sourceURL=webpack:////card-tools/lovelace-element.js?");

/***/ }),

/***/ "../../../card-tools/more-info.js":
/*!********************************!*\
  !*** /card-tools/more-info.js ***!
  \********************************/
/*! exports provided: moreInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moreInfo\", function() { return moreInfo; });\n/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event.js */ \"../../../card-tools/event.js\");\n\n\nfunction moreInfo(entity, large=false) {\n  Object(_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])(\"hass-more-info\", {entityId: entity}, document.querySelector(\"home-assistant\"));\n  const el = document.querySelector(\"home-assistant\")._moreInfoEl;\n  el.large = large;\n  return el;\n}\n\n\n//# sourceURL=webpack:////card-tools/more-info.js?");

/***/ }),

/***/ "../../../card-tools/popup.js":
/*!****************************!*\
  !*** /card-tools/popup.js ***!
  \****************************/
/*! exports provided: closePopUp, popUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closePopUp\", function() { return closePopUp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"popUp\", function() { return popUp; });\n/* harmony import */ var _hass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hass.js */ \"../../../card-tools/hass.js\");\n/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event.js */ \"../../../card-tools/event.js\");\n/* harmony import */ var _lovelace_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lovelace-element.js */ \"../../../card-tools/lovelace-element.js\");\n/* harmony import */ var _more_info_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./more-info.js */ \"../../../card-tools/more-info.js\");\n/* harmony import */ var _card_maker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./card-maker.js */ \"../../../card-tools/card-maker.js\");\n\n\n\n\n\n\nfunction closePopUp() {\n  const moreInfoEl = document.querySelector(\"home-assistant\")._moreInfoEl;\n  if(moreInfoEl)\n    moreInfoEl.close();\n}\n\nfunction popUp(title, card, large=false, style=null, fullscreen=false) {\n\n  // Force _moreInfoEl to be loaded\n  Object(_event_js__WEBPACK_IMPORTED_MODULE_1__[\"fireEvent\"])(\"hass-more-info\", {entityId: null});\n  const moreInfoEl = document.querySelector(\"home-assistant\")._moreInfoEl;\n  // Close and reopen to clear any previous styling\n  // Necessary for popups from popups\n  moreInfoEl.close();\n  moreInfoEl.open();\n\n  const wrapper = document.createElement(\"div\");\n  wrapper.innerHTML = `\n  <style>\n    app-toolbar {\n      color: var(--more-info-header-color);\n      background-color: var(--more-info-header-background);\n    }\n    .scrollable {\n      overflow: auto;\n      max-width: 100% !important;\n    }\n  </style>\n  ${fullscreen\n    ? ``\n    : `\n      <app-toolbar>\n        <paper-icon-button\n          icon=\"hass:close\"\n          dialog-dismiss=\"\"\n        ></paper-icon-button>\n        <div class=\"main-title\" main-title=\"\">\n          ${title}\n        </div>\n      </app-toolbar>\n      `\n    }\n    <div class=\"scrollable\">\n      <card-maker nohass>\n      </card-maker>\n    </div>\n  `;\n\n  const scroll = wrapper.querySelector(\".scrollable\");\n  const content = scroll.querySelector(\"card-maker\");\n  content.config = card;\n\n  moreInfoEl.sizingTarget = scroll;\n  moreInfoEl.large = large;\n  moreInfoEl._page = \"none\"; // Display nothing by default\n  moreInfoEl.shadowRoot.appendChild(wrapper);\n\n  let oldStyle = {};\n  if(style) {\n    moreInfoEl.resetFit(); // Reset positioning to enable setting it via css\n    for (var k in style) {\n      oldStyle[k] = moreInfoEl.style[k];\n      moreInfoEl.style.setProperty(k, style[k]);\n    }\n  }\n\n  moreInfoEl._dialogOpenChanged = function(newVal) {\n    if (!newVal) {\n      if(this.stateObj)\n        this.fire(\"hass-more-info\", {entityId: null});\n\n      if (this.shadowRoot == wrapper.parentNode) {\n        this._page = null;\n        this.shadowRoot.removeChild(wrapper);\n        if(style) {\n          moreInfoEl.resetFit();\n          for (var k in oldStyle)\n            if (oldStyle[k])\n              moreInfoEl.style.setProperty(k, oldStyle[k]);\n            else\n              moreInfoEl.style.removeProperty(k);\n        }\n      }\n    }\n  }\n\n  return moreInfoEl;\n}\n\n\n//# sourceURL=webpack:////card-tools/popup.js?");

/***/ }),

/***/ "./js/browser-player.js":
/*!******************************!*\
  !*** ./js/browser-player.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _card_tools_lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /card-tools/lit-element */ \"../../../card-tools/lit-element.js\");\n/* harmony import */ var _card_tools_deviceId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /card-tools/deviceId */ \"../../../card-tools/deviceId.js\");\n/* harmony import */ var _card_tools_more_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! /card-tools/more-info */ \"../../../card-tools/more-info.js\");\n\n\n\n\nclass BrowserPlayer extends _card_tools_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      hass: {},\n    };\n  }\n\n  setConfig(config) {\n    this._config = config;\n  }\n  handleMute(ev) {\n    window.browser_mod.mute({});\n  }\n  handleVolumeChange(ev) {\n    const vol = parseFloat(ev.target.value);\n    window.browser_mod.set_volume({volume_level: vol});\n  }\n  handleMoreInfo(ev) {\n    Object(_card_tools_more_info__WEBPACK_IMPORTED_MODULE_2__[\"moreInfo\"])(window.browser_mod.entity_id);\n  }\n  handlePlayPause(ev) {\n    if (window.browser_mod.player.paused)\n      window.browser_mod.play({});\n    else\n      window.browser_mod.pause({});\n  }\n\n  render() {\n    const player = window.browser_mod.player;\n    return _card_tools_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`\n    <ha-card>\n      <div class=\"card-content\">\n      <paper-icon-button\n        .icon=${player.muted\n          ? \"mdi:volume-off\"\n          : \"mdi:volume-high\"\n        }\n        @click=${this.handleMute}\n      ></paper-icon-button>\n      <ha-paper-slider\n        min=0\n        max=1\n        step=0.01\n        ?disabled=${player.muted}\n        value=${player.volume}\n        @change=${this.handleVolumeChange}\n      ></ha-paper-slider>\n\n      ${window.browser_mod.player_state === \"stopped\"\n        ? _card_tools_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<div class=\"placeholder\"></div>`\n        : _card_tools_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`\n          <paper-icon-button\n            .icon=${player.paused\n              ? \"mdi:play\"\n              : \"mdi:pause\"\n            }\n            @click=${this.handlePlayPause}\n            highlight\n          ></paper-icon-button>\n          `}\n      <paper-icon-button\n        .icon=${\"mdi:settings\"}\n        @click=${this.handleMoreInfo}\n      ></paper-icon-button>\n      </div>\n\n      <div class=\"device-id\">\n      ${_card_tools_deviceId__WEBPACK_IMPORTED_MODULE_1__[\"deviceID\"]}\n      </div>\n\n    </ha-card>\n    `;\n  }\n\n  static get styles() {\n    return _card_tools_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"css\"]`\n    paper-icon-button[highlight] {\n      color: var(--accent-color);\n    }\n    .card-content {\n      display: flex;\n      justify-content: center;\n    }\n    .placeholder {\n      width: 24px;\n      padding: 8px;\n    }\n    .device-id {\n      opacity: 0.7;\n      font-size: xx-small;\n      margin-top: -10px;\n      user-select: all;\n      -webkit-user-select: all;\n      -moz-user-select: all;\n      -ms-user-select: all;\n    }\n    `\n  }\n\n}\n\ncustomElements.define(\"browser-player\", BrowserPlayer);\n\n\n//# sourceURL=webpack:///./js/browser-player.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /card-tools/deviceId */ \"../../../card-tools/deviceId.js\");\n/* harmony import */ var _card_tools_hass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /card-tools/hass */ \"../../../card-tools/hass.js\");\n/* harmony import */ var _card_tools_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! /card-tools/popup */ \"../../../card-tools/popup.js\");\n/* harmony import */ var _card_tools_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! /card-tools/event */ \"../../../card-tools/event.js\");\n/* harmony import */ var _card_tools_more_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! /card-tools/more-info.js */ \"../../../card-tools/more-info.js\");\n/* harmony import */ var _browser_player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./browser-player */ \"./js/browser-player.js\");\n\n\n\n\n\n\n\nclass BrowserMod {\n\n  set hass(hass) {\n    if(!hass) return;\n    this._hass = hass;\n    if(this.hassPatched) return;\n    const callService = hass.callService;\n    const newCallService = (domain, service, serviceData) => {\n      if(serviceData && serviceData.deviceID) {\n        if(Array.isArray(serviceData.deviceID)) {\n          const index = serviceData.deviceID.indexOf('this');\n          if(index !== -1)\n            serviceData.deviceID[index] = _card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__[\"deviceID\"];\n        } else if(serviceData.deviceID === \"this\") {\n          serviceData.deviceID = _card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__[\"deviceID\"];\n        }\n      }\n      return callService(domain, service, serviceData);\n    };\n    hass.callService = newCallService;\n\n    this.hassPatched = true;\n    document.querySelector(\"home-assistant\").hassChanged(hass, hass);\n  }\n\n  playOnce(ev) {\n    if(this._video) this._video.play();\n    if(window.browser_mod.playedOnce) return;\n    window.browser_mod.player.play();\n    window.browser_mod.playedOnce = true;\n  }\n\n  constructor() {\n    window.setTimeout(_card_tools_hass__WEBPACK_IMPORTED_MODULE_1__[\"load_lovelace\"], 500);\n    window.hassConnection.then((conn) => this.connect(conn.conn));\n    this.player = new Audio();\n    this.playedOnce = false;\n\n    this.autoclose_popup_active = false;\n\n    const updater = this.update.bind(this);\n    this.player.addEventListener(\"ended\", updater);\n    this.player.addEventListener(\"play\", updater);\n    this.player.addEventListener(\"pause\", updater);\n    this.player.addEventListener(\"volumechange\", updater);\n    document.addEventListener(\"visibilitychange\", updater);\n    window.addEventListener(\"location-changed\", updater);\n    window.addEventListener(\"click\", this.playOnce);\n    window.addEventListener(\"mousemove\", this.no_blackout.bind(this));\n    window.addEventListener(\"mousedown\", this.no_blackout.bind(this));\n    window.addEventListener(\"keydown\", this.no_blackout.bind(this));\n    window.addEventListener(\"touchstart\", this.no_blackout.bind(this));\n    Object(_card_tools_hass__WEBPACK_IMPORTED_MODULE_1__[\"provideHass\"])(this);\n\n    if(window.fully)\n    {\n      this._fullyMotion = false;\n      this._motionTimeout = undefined;\n      fully.bind('screenOn', 'browser_mod.update();');\n      fully.bind('screenOff', 'browser_mod.update();');\n      fully.bind('pluggedAC', 'browser_mod.update();');\n      fully.bind('pluggedUSB', 'browser_mod.update();');\n      fully.bind('onBatteryLevelChanged', 'browser_mod.update();');\n      fully.bind('unplugged', 'browser_mod.update();');\n      fully.bind('networkReconnect', 'browser_mod.update();');\n\n      fully.bind('onMotion', 'browser_mod.fullyMotion();');\n    }\n\n    this._screenSaver = undefined;\n    this._screenSaverTimer = undefined;\n    this._screenSaverTime = 0;\n    this._blackout = document.createElement(\"div\");\n    this._blackout.style.cssText = `\n    position: fixed;\n    left: 0;\n    top: 0;\n    padding: 0;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    background: black;\n    visibility: hidden;\n    `;\n    document.body.appendChild(this._blackout);\n  }\n\n  connect(conn) {\n    this.conn = conn\n    conn.subscribeMessage((msg) => this.callback(msg), {\n      type: 'browser_mod/connect',\n      deviceID: _card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__[\"deviceID\"],\n      });\n  }\n\n  callback(msg) {\n    switch (msg.command) {\n      case \"update\":\n        this.update(msg);\n        break;\n\n      case \"debug\":\n        this.debug(msg);\n        break;\n\n      case \"play\":\n        this.play(msg);\n        break;\n      case \"pause\":\n        this.pause(msg);\n        break;\n      case \"stop\":\n        this.stop(msg);\n        break;\n      case \"set_volume\":\n        this.set_volume(msg);\n        break;\n      case \"mute\":\n        this.mute(msg);\n        break;\n\n      case \"toast\":\n        this.toast(msg);\n        break;\n      case \"popup\":\n        this.popup(msg);\n        break;\n      case \"close-popup\":\n        this.close_popup(msg);\n        break;\n      case \"navigate\":\n        this.navigate(msg);\n        break;\n      case \"more-info\":\n        this.more_info(msg);\n        break;\n      case \"set-theme\":\n        this.set_theme(msg);\n        break;\n\n      case \"lovelace-reload\":\n        this.lovelace_reload(msg);\n        break;\n\n      case \"blackout\":\n        this.blackout(msg);\n        break;\n      case \"no-blackout\":\n        this.no_blackout(msg);\n        break;\n    }\n  }\n\n  get player_state() {\n    if (!this.player.src) return \"stopped\";\n    if (this.player.ended) return \"stopped\";\n    if (this.player.paused) return \"paused\";\n    return \"playing\";\n  }\n\n  debug(msg) {\n    Object(_card_tools_popup__WEBPACK_IMPORTED_MODULE_2__[\"popUp\"])(`deviceID`, {type: \"markdown\", content: `# ${_card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__[\"deviceID\"]}`})\n    alert(_card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__[\"deviceID\"]);\n  }\n\n  _set_screensaver(fn, time) {\n    clearTimeout(this._screenSaverTimer);\n    if(!fn) {\n      if(this._screenSaverTime)\n        this._screenSaverTimer = setTimeout(this._screenSaver, this._screenSaverTime)\n    } else {\n      time = parseInt(time)\n      if(time == -1) {\n        clearTimeout(this._screenSaverTimer);\n        this._screenSaverTime = 0;\n        return;\n      }\n      this._screenSaverTime = time * 1000;\n      this._screenSaver = fn;\n      this._screenSaverTimer = setTimeout(this._screenSaver, this._screenSaverTime)\n    }\n  }\n\n  play(msg) {\n    const src = msg.media_content_id;\n    if(src)\n      this.player.src = src;\n    this.player.play();\n  }\n  pause(msg) {\n    this.player.pause();\n  }\n  stop(msg) {\n    this.player.pause();\n    this.player.src = null;\n  }\n  set_volume(msg) {\n    if (msg.volume_level === undefined) return;\n    this.player.volume = msg.volume_level;\n  }\n  mute(msg) {\n    if (msg.mute === undefined)\n      msg.mute = !this.player.muted;\n    this.player.muted = Boolean(msg.mute)\n  }\n\n  toast(msg) {\n    if(!msg.message) return;\n\n    Object(_card_tools_event__WEBPACK_IMPORTED_MODULE_3__[\"fireEvent\"])(\"hass-notification\", {\n      message: msg.message,\n      duration: msg.duration !== undefined ? parseInt(msg.duration) : undefined\n    }, document.querySelector(\"home-assistant\"));\n  }\n\n  popup(msg){\n    if(!msg.title && !msg.auto_close) return;\n    if(!msg.card) return;\n\n    const fn = () => {\n      Object(_card_tools_popup__WEBPACK_IMPORTED_MODULE_2__[\"popUp\"])(msg.title, msg.card, msg.large, msg.style, msg.auto_close);\n      if(msg.auto_close)\n        this.autoclose_popup_active = true;\n    };\n\n    if(msg.auto_close && msg.time) {\n      this._set_screensaver(fn, msg.time);\n    } else {\n      // closePopUp();\n      fn();\n    }\n  }\n  close_popup(msg){\n    this._set_screensaver();\n    this.autoclose_popup_active = false;\n    Object(_card_tools_popup__WEBPACK_IMPORTED_MODULE_2__[\"closePopUp\"])();\n  }\n  navigate(msg){\n    if(!msg.navigation_path) return;\n    history.pushState(null, \"\", msg.navigation_path);\n    Object(_card_tools_event__WEBPACK_IMPORTED_MODULE_3__[\"fireEvent\"])(\"location-changed\", {}, document.querySelector(\"home-assistant\"));\n  }\n  more_info(msg){\n    if(!msg.entity_id) return;\n    Object(_card_tools_more_info_js__WEBPACK_IMPORTED_MODULE_4__[\"moreInfo\"])(msg.entity_id, msg.large);\n  }\n  set_theme(msg){\n    if(!msg.theme) msg.theme = \"default\";\n    Object(_card_tools_event__WEBPACK_IMPORTED_MODULE_3__[\"fireEvent\"])(\"settheme\", msg.theme, document.querySelector(\"home-assistant\"));\n  }\n\n  lovelace_reload(msg) {\n    const ll = Object(_card_tools_hass__WEBPACK_IMPORTED_MODULE_1__[\"lovelace_view\"])();\n    if (ll)\n      Object(_card_tools_event__WEBPACK_IMPORTED_MODULE_3__[\"fireEvent\"])(\"config-refresh\", {}, ll);\n  }\n\n  blackout(msg){\n    const fn = () => {\n      if (window.fully)\n      {\n        fully.turnScreenOff();\n      } else {\n        this._blackout.style.visibility = \"visible\";\n      }\n      this.update();\n    };\n    if(msg.time) {\n      this._set_screensaver(fn, msg.time)\n    } else {\n      fn();\n    }\n  }\n  no_blackout(msg){\n    this._set_screensaver();\n    if(this.autoclose_popup_active)\n      return this.close_popup();\n    if (window.fully)\n    {\n      if (!fully.getScreenOn())\n        fully.turnScreenOn();\n      if (msg.brightness)\n        fully.setScreenBrightness(msg.brightness);\n      this.update();\n    } else {\n      if(this._blackout.style.visibility !== \"hidden\") {\n        this._blackout.style.visibility = \"hidden\";\n        this.update();\n      }\n    }\n  }\n  is_blackout(){\n    if (window.fully)\n      return !fully.getScreenOn();\n    return Boolean(this._blackout.style.visibility === \"visible\")\n  }\n\n  fullyMotion() {\n    this._fullyMotion = true;\n    clearTimeout(this._motionTimeout);\n    this._motionTimeout = setTimeout(() => {\n      this._fullyMotion = false;\n      this.update();\n    }, 5000);\n    this.update();\n  }\n\n\n  start_camera() {\n    if(this._video) return;\n    this._video = document.createElement(\"video\");\n    this._video.autoplay = true;\n    this._video.playsInline = true;\n    this._video.style.cssText = `\n    visibility: hidden;\n    width: 0;\n    height: 0;\n    `;\n    this._canvas = document.createElement(\"canvas\");\n    this._canvas.style.cssText = `\n    visibility: hidden;\n    width: 0;\n    height: 0;\n    `;\n    document.body.appendChild(this._canvas);\n    document.body.appendChild(this._video);\n    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((stream) => {\n      this._video.srcObject = stream;\n      this._video.play();\n      this.send_cam();\n    });\n  }\n\n  send_cam(data) {\n    const context = this._canvas.getContext('2d');\n    context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);\n    this.conn.sendMessage({\n      type: 'browser_mod/update',\n      deviceID: _card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__[\"deviceID\"],\n      data: {\n        camera: this._canvas.toDataURL('image/png'),\n      },\n    });\n    setTimeout(this.send_cam.bind(this), 5000);\n  }\n\n\n  update(msg=null) {\n    if(!this.conn) return;\n\n    if(msg) {\n      if(msg.entity_id) {\n        this.entity_id = msg.entity_id;\n      }\n      if(msg.camera) {\n        this.start_camera();\n      }\n    }\n\n\n    this.conn.sendMessage({\n      type: 'browser_mod/update',\n      deviceID: _card_tools_deviceId__WEBPACK_IMPORTED_MODULE_0__[\"deviceID\"],\n      data: {\n        browser: {\n          path: window.location.pathname,\n          visibility: document.visibilityState,\n          userAgent: navigator.userAgent,\n          currentUser: this._hass && this._hass.user && this._hass.user.name,\n          fullyKiosk: window.fully ? true : undefined,\n          width: window.innerWidth,\n          height: window.innerHeight,\n        },\n        player: {\n          volume: this.player.volume,\n          muted: this.player.muted,\n          src: this.player.src,\n          state: this.player_state,\n        },\n        screen: {\n          blackout: this.is_blackout(),\n          brightness: window.fully ? fully.getScreenBrightness() : undefined,\n        },\n        fully: window.fully ? {\n          battery: window.fully ? fully.getBatteryLevel() : undefined,\n          charging: window.fully ? fully.isPlugged(): undefined,\n          motion: window.fully ? this._fullyMotion : undefined,\n        } : undefined,\n      },\n    });\n\n  }\n\n}\n\nwindow.browser_mod = new BrowserMod();\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ });