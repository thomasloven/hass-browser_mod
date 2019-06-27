!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);let n=function(){if(window.fully&&"function"==typeof fully.getDeviceId)return fully.getDeviceId();if(!localStorage["lovelace-player-device-id"]){const e=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);localStorage["lovelace-player-device-id"]=`${e()}${e()}-${e()}${e()}`}return localStorage["lovelace-player-device-id"]}();function s(e){return document.querySelector("home-assistant").provideHass(e)}function r(e,t,o=null){if((e=new Event(e,{bubbles:!0,cancelable:!1,composed:!0})).detail=t||{},o)o.dispatchEvent(e);else{var n=document.querySelector("home-assistant");(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=(n=n&&n.shadowRoot)&&n.querySelector("home-assistant-main"))&&n.shadowRoot)&&n.querySelector("app-drawer-layout partial-panel-resolver"))&&n.shadowRoot||n)&&n.querySelector("ha-panel-lovelace"))&&n.shadowRoot)&&n.querySelector("hui-root"))&&n.shadowRoot)&&n.querySelector("ha-app-layout #view"))&&n.firstElementChild)&&n.dispatchEvent(e)}}const a="custom:";function i(e,t){const o=document.createElement("hui-error-card");return o.setConfig({type:"error",error:e,config:t}),o}function l(e,t){if(!t||"object"!=typeof t||!t.type)return i(`No ${e} type configured`,t);let o=t.type;if(o=o.startsWith(a)?o.substr(a.length):`hui-${o}-${e}`,customElements.get(o))return function(e,t){const o=document.createElement(e);try{o.setConfig(t)}catch(e){return i(e,t)}return o}(o,t);const n=i(`Custom element doesn't exist: ${o}.`,t);n.style.display="None";const s=setTimeout(()=>{n.style.display=""},2e3);return customElements.whenDefined(o).then(()=>{clearTimeout(s),r("ll-rebuild",{},n)}),n}function c(e,t=!1){r("hass-more-info",{entityId:e},document.querySelector("home-assistant"));const o=document.querySelector("home-assistant")._moreInfoEl;return o.large=t,o}const u=Object.getPrototypeOf(customElements.get("home-assistant-main")),d=u.prototype.html,p=u.prototype.css;class m extends u{static get properties(){return{hass:{},config:{}}}setConfig(e){this._config=e,this.el?this.el.setConfig(e):this.el=this.create(e),this._hass&&(this.el.hass=this._hass),this.noHass&&s(this)}set config(e){this.setConfig(e)}set hass(e){this._hass=e,this.el&&(this.el.hass=e)}createRenderRoot(){return this}render(){return d`${this.el}`}}if(!customElements.get("card-maker")){class e extends m{create(e){return function(e){return l("card",e)}(e)}}customElements.define("card-maker",e)}if(!customElements.get("element-maker")){class e extends m{create(e){return function(e){return l("element",e)}(e)}}customElements.define("element-maker",e)}if(!customElements.get("entity-row-maker")){class e extends m{create(e){return function(e){const t=new Set(["call-service","divider","section","weblink"]);if(!e)return i("Invalid configuration given.",e);if("string"==typeof e&&(e={entity:e}),"object"!=typeof e||!e.entity&&!e.type)return i("Invalid configuration given.",e);const o=e.type||"default";if(t.has(o)||o.startsWith(a))return l("row",e);const n=e.entity.split(".",1)[0];return Object.assign(e,{type:{alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"}[n]||"text"}),l("entity-row",e)}(e)}}customElements.define("entity-row-maker",e)}function h(e,t,o=!1,n=null){c(Object.keys(document.querySelector("home-assistant").hass.states)[0]);const s=document.createElement("card-maker");s.noHass=!0,s.config=t;const r=document.createElement("div");r.innerHTML=`\n    <style>\n      app-toolbar {\n        color: var(--more-info-header-color);\n        background-color: var(--more-info-header-background);\n      }\n    </style>\n    <app-toolbar>\n      <paper-icon-button\n        icon="hass:close"\n        dialog-dismiss=""\n      ></paper-icon-button>\n      <div class="main-title" main-title="">\n        ${e}\n      </div>\n    </app-toolbar>\n  `,r.appendChild(s);const a=document.querySelector("home-assistant")._moreInfoEl;a.large=o,a._page="none",a.shadowRoot.appendChild(r);let i={};if(n)for(var l in n)i[l]=a.style[l],a.style.setProperty(l,n[l]);return setTimeout(()=>{let e=setInterval(()=>{if(a.getAttribute("aria-hidden"))for(var t in clearInterval(e),r.parentNode.removeChild(r),i)a.style.setProperty(t,i[t])},100)},1e3),a}customElements.define("browser-player",class extends u{static get properties(){return{hass:{}}}setConfig(e){this._config=e}handleMute(e){window.browser_mod.mute({})}handleVolumeChange(e){const t=parseFloat(e.target.value);window.browser_mod.set_volume({volume_level:t})}handleMoreInfo(e){c(window.browser_mod.entity_id)}handlePlayPause(e){window.browser_mod.player.paused?window.browser_mod.play({}):window.browser_mod.pause({})}render(){const e=window.browser_mod.player;return d`
    <ha-card>
      <div class="card-content">
      <paper-icon-button
        .icon=${e.muted?"mdi:volume-off":"mdi:volume-high"}
        @click=${this.handleMute}
      ></paper-icon-button>
      <ha-paper-slider
        min=0
        max=1
        step=0.01
        ?disabled=${e.muted}
        value=${e.volume}
        @change=${this.handleVolumeChange}
      ></ha-paper-slider>

      ${"stopped"===window.browser_mod.player_state?d`<div class="placeholder"></div>`:d`
          <paper-icon-button
            .icon=${e.paused?"mdi:play":"mdi:pause"}
            @click=${this.handlePlayPause}
            highlight
          ></paper-icon-button>
          `}
      <paper-icon-button
        .icon=${"mdi:settings"}
        @click=${this.handleMoreInfo}
      ></paper-icon-button>
      </div>

      <div class="device-id">
      ${n}
      </div>

    </ha-card>
    `}static get styles(){return p`
    paper-icon-button[highlight] {
      color: var(--accent-color);
    }
    .card-content {
      display: flex;
      justify-content: center;
    }
    .placeholder {
      width: 24px;
      padding: 8px;
    }
    .device-id {
      opacity: 0.7;
      font-size: xx-small;
      margin-top: -10px;
      user-select: all;
      -webkit-user-select: all;
      -moz-user-select: all;
      -ms-user-select: all;
    }
    `}});window.browser_mod=new class{set hass(e){this._hass=e}constructor(){window.hassConnection.then(e=>this.connect(e.conn)),this.player=new Audio;const e=this.update.bind(this);this.player.addEventListener("ended",e),this.player.addEventListener("play",e),this.player.addEventListener("pause",e),this.player.addEventListener("volumechange",e),document.addEventListener("visibilitychange",e),window.addEventListener("location-changed",e),s(this)}connect(e){console.log("Connection opened. Connecting to browser_mod"),this.conn=e,e.subscribeMessage(e=>this.callback(e),{type:"browser_mod/connect",deviceID:n}),console.log("Connected"),console.log(this.connection)}callback(e){switch(console.log("Got ws message"),console.log(e),e.command){case"update":this.update(e);break;case"play":this.play(e);break;case"pause":this.pause(e);break;case"stop":this.stop(e);break;case"set_volume":this.set_volume(e);break;case"mute":this.mute(e);break;case"popup":this.popup(e);break;case"close-popup":this.close_popup(e);break;case"navigate":this.navigate(e);break;case"more-info":this.more_info(e);break;case"set-theme":this.set_theme(e)}}get player_state(){return this.player.src?this.player.ended?"stopped":this.player.paused?"paused":"playing":"stopped"}play(e){const t=e.media_content_id;t&&(this.player.src=t),this.player.play()}pause(e){this.player.pause()}stop(e){this.player.pause(),this.player.src=null}set_volume(e){void 0!==e.volume_level&&(this.player.volume=e.volume_level)}mute(e){void 0===e.mute&&(e.mute=!this.player.muted),this.player.muted=Boolean(e.mute)}popup(e){e.title&&e.card&&h(e.title,e.card,e.large,e.style)}close_popup(e){document.querySelector("home-assistant")._moreInfoEl.close()}navigate(e){e.navigation_path&&(history.pushState(null,"",e.navigation_path),r("location-changed",{},document.querySelector("home-assistant")))}more_info(e){e.entity_id&&c(e.entity_id,e.large)}set_theme(e){e.theme||(e.theme="default"),console.log("Set theme to {msg.theme}"),r("settheme",e.theme,document.querySelector("home-assistant"))}update(e=null){this.conn&&(e&&e.entity_id&&(this.entity_id=e.entity_id),this.conn.sendMessage({type:"browser_mod/update",deviceID:n,data:{browser:{path:window.location.pathname,visibility:document.visibilityState,userAgent:navigator.userAgent,currentUser:this._hass.user.name},player:{volume:this.player.volume,muted:this.player.muted,src:this.player.src,state:this.player_state}}}))}}}]);