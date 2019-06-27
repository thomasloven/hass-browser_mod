!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);let s=function(){if(window.fully&&"function"==typeof fully.getDeviceId)return fully.getDeviceId();if(!localStorage["lovelace-player-device-id"]){const e=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);localStorage["lovelace-player-device-id"]=`${e()}${e()}-${e()}${e()}`}return localStorage["lovelace-player-device-id"]}();function o(e){return document.querySelector("home-assistant").provideHass(e)}function r(e,t,n=null){if((e=new Event(e,{bubbles:!0,cancelable:!1,composed:!0})).detail=t||{},n)n.dispatchEvent(e);else{var s=document.querySelector("home-assistant");(s=(s=(s=(s=(s=(s=(s=(s=(s=(s=(s=s&&s.shadowRoot)&&s.querySelector("home-assistant-main"))&&s.shadowRoot)&&s.querySelector("app-drawer-layout partial-panel-resolver"))&&s.shadowRoot||s)&&s.querySelector("ha-panel-lovelace"))&&s.shadowRoot)&&s.querySelector("hui-root"))&&s.shadowRoot)&&s.querySelector("ha-app-layout #view"))&&s.firstElementChild)&&s.dispatchEvent(e)}}const a="custom:";function i(e,t){const n=document.createElement("hui-error-card");return n.setConfig({type:"error",error:e,config:t}),n}function l(e,t){if(!t||"object"!=typeof t||!t.type)return i(`No ${e} type configured`,t);let n=t.type;if(n=n.startsWith(a)?n.substr(a.length):`hui-${n}-${e}`,customElements.get(n))return function(e,t){const n=document.createElement(e);try{n.setConfig(t)}catch(e){return i(e,t)}return n}(n,t);const s=i(`Custom element doesn't exist: ${n}.`,t);s.style.display="None";const o=setTimeout(()=>{s.style.display=""},2e3);return customElements.whenDefined(n).then(()=>{clearTimeout(o),r("ll-rebuild",{},s)}),s}function c(e,t=!1){r("hass-more-info",{entityId:e},document.querySelector("home-assistant"));const n=document.querySelector("home-assistant")._moreInfoEl;return n.large=t,n}const u=Object.getPrototypeOf(customElements.get("home-assistant-main")),d=u.prototype.html,p=u.prototype.css;class h extends u{static get properties(){return{hass:{},config:{}}}setConfig(e){this._config=e,this.el?this.el.setConfig(e):this.el=this.create(e),this._hass&&(this.el.hass=this._hass),this.noHass&&o(this)}set config(e){this.setConfig(e)}set hass(e){this._hass=e,this.el&&(this.el.hass=e)}createRenderRoot(){return this}render(){return d`${this.el}`}}if(!customElements.get("card-maker")){class e extends h{create(e){return function(e){return l("card",e)}(e)}}customElements.define("card-maker",e)}if(!customElements.get("element-maker")){class e extends h{create(e){return function(e){return l("element",e)}(e)}}customElements.define("element-maker",e)}if(!customElements.get("entity-row-maker")){class e extends h{create(e){return function(e){const t=new Set(["call-service","divider","section","weblink"]);if(!e)return i("Invalid configuration given.",e);if("string"==typeof e&&(e={entity:e}),"object"!=typeof e||!e.entity&&!e.type)return i("Invalid configuration given.",e);const n=e.type||"default";if(t.has(n)||n.startsWith(a))return l("row",e);const s=e.entity.split(".",1)[0];return Object.assign(e,{type:{alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"}[s]||"text"}),l("entity-row",e)}(e)}}customElements.define("entity-row-maker",e)}function m(e,t,n=!1,s=null){c(Object.keys(document.querySelector("home-assistant").hass.states)[0]);const o=document.createElement("card-maker");o.noHass=!0,o.config=t;const r=document.createElement("div");r.innerHTML=`\n    <style>\n      app-toolbar {\n        color: var(--more-info-header-color);\n        background-color: var(--more-info-header-background);\n      }\n    </style>\n    <app-toolbar>\n      <paper-icon-button\n        icon="hass:close"\n        dialog-dismiss=""\n      ></paper-icon-button>\n      <div class="main-title" main-title="">\n        ${e}\n      </div>\n    </app-toolbar>\n  `,r.appendChild(o);const a=document.querySelector("home-assistant")._moreInfoEl;a.large=n,a._page="none",a.shadowRoot.appendChild(r);let i={};if(s)for(var l in s)i[l]=a.style[l],a.style.setProperty(l,s[l]);return setTimeout(()=>{let e=setInterval(()=>{if(a.getAttribute("aria-hidden"))for(var t in clearInterval(e),r.parentNode.removeChild(r),i)a.style.setProperty(t,i[t])},100)},1e3),a}customElements.define("browser-player",class extends u{static get properties(){return{hass:{}}}setConfig(e){this._config=e}handleMute(e){window.browser_mod.mute({})}handleVolumeChange(e){const t=parseFloat(e.target.value);window.browser_mod.set_volume({volume_level:t})}handleMoreInfo(e){c(window.browser_mod.entity_id)}handlePlayPause(e){window.browser_mod.player.paused?window.browser_mod.play({}):window.browser_mod.pause({})}render(){const e=window.browser_mod.player;return d`
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
      ${s}
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
    `}});window.browser_mod=new class{set hass(e){if(!e)return;if(this._hass=e,this.hassPatched)return;const t=e.callService;e.callService=(e,n,o)=>{if("browser_mod"===e&&"command"===n&&o.deviceID){const e=o.deviceID.indexOf("this");-1!==e&&(o.deviceID[e]=s)}t(e,n,o)},this.hassPatched=!0,document.querySelector("home-assistant").hassChanged(e,e)}constructor(){window.hassConnection.then(e=>this.connect(e.conn)),this.player=new Audio;const e=this.update.bind(this);this.player.addEventListener("ended",e),this.player.addEventListener("play",e),this.player.addEventListener("pause",e),this.player.addEventListener("volumechange",e),document.addEventListener("visibilitychange",e),window.addEventListener("location-changed",e),o(this)}connect(e){this.conn=e,e.subscribeMessage(e=>this.callback(e),{type:"browser_mod/connect",deviceID:s})}callback(e){switch(e.command){case"update":this.update(e);break;case"play":this.play(e);break;case"pause":this.pause(e);break;case"stop":this.stop(e);break;case"set_volume":this.set_volume(e);break;case"mute":this.mute(e);break;case"popup":this.popup(e);break;case"close-popup":this.close_popup(e);break;case"navigate":this.navigate(e);break;case"more-info":this.more_info(e);break;case"set-theme":this.set_theme(e)}}get player_state(){return this.player.src?this.player.ended?"stopped":this.player.paused?"paused":"playing":"stopped"}play(e){const t=e.media_content_id;t&&(this.player.src=t),this.player.play()}pause(e){this.player.pause()}stop(e){this.player.pause(),this.player.src=null}set_volume(e){void 0!==e.volume_level&&(this.player.volume=e.volume_level)}mute(e){void 0===e.mute&&(e.mute=!this.player.muted),this.player.muted=Boolean(e.mute)}popup(e){e.title&&e.card&&m(e.title,e.card,e.large,e.style)}close_popup(e){document.querySelector("home-assistant")._moreInfoEl.close()}navigate(e){e.navigation_path&&(history.pushState(null,"",e.navigation_path),r("location-changed",{},document.querySelector("home-assistant")))}more_info(e){e.entity_id&&c(e.entity_id,e.large)}set_theme(e){e.theme||(e.theme="default"),r("settheme",e.theme,document.querySelector("home-assistant"))}update(e=null){this.conn&&(e&&e.entity_id&&(this.entity_id=e.entity_id),this.conn.sendMessage({type:"browser_mod/update",deviceID:s,data:{browser:{path:window.location.pathname,visibility:document.visibilityState,userAgent:navigator.userAgent,currentUser:this._hass&&this._hass.user&&this._hass.user.name},player:{volume:this.player.volume,muted:this.player.muted,src:this.player.src,state:this.player_state}}}))}}}]);