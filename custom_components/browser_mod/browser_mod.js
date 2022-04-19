const ID_STORAGE_KEY = 'lovelace-player-device-id';
function _deviceID() {
  if(!localStorage[ID_STORAGE_KEY])
  {
    const s4 = () => {
      return Math.floor((1+Math.random())*100000).toString(16).substring(1);
    };
    if(window['fully'] && typeof fully.getDeviceId === "function")
      localStorage[ID_STORAGE_KEY] = fully.getDeviceId();
    else
      localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;
  }
  return localStorage[ID_STORAGE_KEY];
}
let deviceID = _deviceID();

const setDeviceID = (id) => {
  if(id === null) return;
  if(id === "clear") {
    localStorage.removeItem(ID_STORAGE_KEY);
  } else {
    localStorage[ID_STORAGE_KEY] = id;
  }
  deviceID = _deviceID();
};

const params = new URLSearchParams(window.location.search);
if(params.get('deviceID')) {
  setDeviceID(params.get('deviceID'));
}

function ha_element() {
  if(document.querySelector("hc-main"))
    return document.querySelector("hc-main");
  if(document.querySelector("home-assistant"))
    return document.querySelector("home-assistant");
}

async function hass_loaded() {
  await Promise.race([
    customElements.whenDefined("home-assistant"),
    customElements.whenDefined("hc-main")
  ]);
  return true;
}

function hass() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
}
function provideHass(element) {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').provideHass(element);

  if(document.querySelector('home-assistant'))
    return document.querySelector("home-assistant").provideHass(element);

  return undefined;
}

function lovelace() {
  var root = document.querySelector("hc-main");
  if(root) {
    var ll = root._lovelaceConfig;
    ll.current_view = root._lovelacePath;
    return ll;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  if (root) {
    var ll =  root.lovelace;
    ll.current_view = root.___curView;
    return ll;
  }

  return null;
}
function lovelace_view() {
  var root = document.querySelector("hc-main");
  if(root) {
    root = root && root.shadowRoot;
    root = root && root.querySelector("hc-lovelace");
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-view") || root.querySelector("hui-panel-view");
    return root;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-app-layout");
  root = root && root.querySelector("#view");
  root = root && root.firstElementChild;
  return root;
}

async function load_lovelace() {
  if(customElements.get("hui-view")) return true;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement("partial-panel-resolver");
  ppr.hass = {panels: [{
    url_path: "tmp",
    "component_name": "lovelace",
  }]};
  ppr._updateRoutes();
  await ppr.routerOptions.routes.tmp.load();
  if(!customElements.get("ha-panel-lovelace")) return false;
  const p = document.createElement("ha-panel-lovelace");
  p.hass = hass();
  if(p.hass === undefined) {
    await new Promise(resolve => {
      window.addEventListener('connection-status', (ev) => {
        resolve();
      }, {once: true});
    });
    p.hass = hass();
  }
  p.panel = {config: {mode: null}};
  p._fetchConfig();
  return true;
}

async function _selectTree(root, path, all=false) {
  let el = root;
  if(typeof(path) === "string") {
    path = path.split(/(\$| )/);
  }
  if(path[path.length-1] === "")
     path.pop();
  for(const [i, p] of path.entries()) {
    if(!p.trim().length) continue;
    if(!el) return null;
    if(el.localName && el.localName.includes("-"))
      await customElements.whenDefined(el.localName);
    if(el.updateComplete)
      await el.updateComplete;
    if(p === "$")
      if(all && i == path.length-1)
        el = [el.shadowRoot];
      else
        el = el.shadowRoot;
    else
      if(all && i == path.length-1)
        el = el.querySelectorAll(p);
      else
        el = el.querySelector(p);
  }
  return el;
}

async function selectTree(root, path, all=false, timeout=10000) {
  return Promise.race([
    _selectTree(root, path, all),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]).catch((err) => {
    if(!err.message || err.message !== "timeout")
      throw(err);
    return null;
  });
}

function fireEvent(ev, detail, entity=null) {
  ev = new Event(ev, {
    bubbles: true,
    cancelable: false,
    composed: true,
  });
  ev.detail = detail || {};
  if(entity) {
    entity.dispatchEvent(ev);
  } else {
    var root = lovelace_view();
    if (root) root.dispatchEvent(ev);
  }
}

let helpers = window.cardHelpers;
new Promise(async (resolve, reject) => {
  if(helpers) resolve();

  const updateHelpers = async () => {
    helpers = await window.loadCardHelpers();
    window.cardHelpers = helpers;
    resolve();
  };

  if(window.loadCardHelpers) {
    updateHelpers();
  } else {
    // If loadCardHelpers didn't exist, force load lovelace and try once more.
    window.addEventListener("load", async () => {
      load_lovelace();
      if(window.loadCardHelpers) {
        updateHelpers();
      }
    });
  }
});

async function closePopUp() {
  const root = document.querySelector("home-assistant") || document.querySelector("hc-root");
  fireEvent("hass-more-info", {entityId: "."}, root);
  const el = await selectTree(root, "$ card-tools-popup");

  if(el)
    el.closeDialog();
}

async function popUp(title, card, large=false, style={}, fullscreen=false) {
  if(!customElements.get("card-tools-popup"))
  {
    const LitElement = customElements.get('home-assistant-main')
      ? Object.getPrototypeOf(customElements.get('home-assistant-main'))
      : Object.getPrototypeOf(customElements.get('hui-view'));
    const html = LitElement.prototype.html;
    const css = LitElement.prototype.css;

      class CardToolsPopup extends LitElement {

        static get properties() {
          return {
            open: {},
            large: {reflect: true, type: Boolean},
            hass: {},
          };
        }

        updated(changedProperties) {
          if(changedProperties.has("hass")) {
            if(this.card)
              this.card.hass = this.hass;
          }
        }

        closeDialog() {
          this.open = false;
        }

        async _makeCard() {
          const helpers = await window.loadCardHelpers();
          this.card = await helpers.createCardElement(this._card);
          this.card.hass = this.hass;
          this.requestUpdate();
        }

        async _applyStyles() {
          let el = await selectTree(this, "$ ha-dialog");
          customElements.whenDefined("card-mod").then(async () => {
          if(!el) return;
            const cm = customElements.get("card-mod");
            cm.applyToElement(el, "more-info", this._style, {config: this._card}, [], false);
          });

        }

        async showDialog(title, card, large=false, style={}, fullscreen=false) {
          this.title = title;
          this._card = card;
          this.large = large;
          this._style = style;
          this.fullscreen = !!fullscreen;
          this._makeCard();
          await this.updateComplete;
          this.open = true;
          await this._applyStyles();
        }

        _enlarge() {
          this.large = !this.large;
        }

        render() {
          if(!this.open) {
            return html``;
          }

          return html`
            <ha-dialog
              open
              @closed=${this.closeDialog}
              .heading=${true}
              hideActions
              @ll-rebuild=${this._makeCard}
            >
            ${this.fullscreen
              ? html`<div slot="heading"></div>`
              : html`
                <app-toolbar slot="heading">
                  <mwc-icon-button
                    .label=${"dismiss"}
                    dialogAction="cancel"
                  >
                    <ha-icon
                      .icon=${"mdi:close"}
                    ></ha-icon>
                  </mwc-icon-button>
                  <div class="main-title" @click=${this._enlarge}>
                    ${this.title}
                  </div>
                </app-toolbar>
              `}
              <div class="content">
                ${this.card}
              </div>
            </ha-dialog>
          `
        }

        static get styles() {
          return css`
          ha-dialog {
            --mdc-dialog-min-width: 400px;
            --mdc-dialog-max-width: 600px;
            --mdc-dialog-heading-ink-color: var(--primary-text-color);
            --mdc-dialog-content-ink-color: var(--primary-text-color);
            --justify-action-buttons: space-between;
          }
          @media all and (max-width: 450px), all and (max-height: 500px) {
            ha-dialog {
              --mdc-dialog-min-width: 100vw;
              --mdc-dialog-max-width: 100vw;
              --mdc-dialog-min-height: 100%;
              --mdc-dialog-max-height: 100%;
              --mdc-shape-medium: 0px;
              --vertial-align-dialog: flex-end;
            }
          }

          app-toolbar {
            flex-shrink: 0;
            color: var(--primary-text-color);
            background-color: var(--secondary-background-color);
          }

          app-toolbar mwc-icon-button ha-icon {
            display: flex;
          }

          .main-title {
            margin-left: 16px;
            line-height: 1.3em;
            max-height: 2.6em;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
          }
          .content {
            margin: -20px -24px;
          }

          @media all and (max-width: 450px), all and (max-height: 500px) {
            app-toolbar {
              background-color: var(--app-header-background-color);
              color: var(--app-header-text-color, white);
            }
          }

          @media all and (min-width: 451px) and (min-height: 501px) {
            ha-dialog {
              --mdc-dialog-max-width: 90vw;
            }

            .content {
              width: 400px;
            }
            :host([large]) .content {
              width: calc(90vw - 48px);
            }

            :host([large]) app-toolbar {
              max-width: calc(90vw - 32px);
            }
          }
          `;
        }

      }
    customElements.define("card-tools-popup", CardToolsPopup);
  }

  const root = document.querySelector("home-assistant") || document.querySelector("hc-root");

  if(!root) return;
  let el = await selectTree(root, "$ card-tools-popup");
  if(!el) {
    el = document.createElement("card-tools-popup");
    const mi = root.shadowRoot.querySelector("ha-more-info-dialog");
    if(mi)
      root.shadowRoot.insertBefore(el,mi);
    else
      root.shadowRoot.appendChild(el);
    provideHass(el);
  }

  if(!window._moreInfoDialogListener) {
    const listener = async (ev) => {
      if(ev.state && "cardToolsPopup" in ev.state) {
        if(ev.state.cardToolsPopup) {
          const {title, card, large, style, fullscreen} = ev.state.params;
          popUp(title, card, large, style, fullscreen);
        } else {
          el.closeDialog();
        }
      }
    };

    window.addEventListener("popstate", listener);
    window._moreInfoDialogListener = true;
  }

  history.replaceState( {
      cardToolsPopup: false,
    },
    ""
  );

  history.pushState( {
      cardToolsPopup: true,
      params: {title, card, large, style, fullscreen},
    },
    ""
  );

  el.showDialog(title, card, large, style, fullscreen);

}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$3=Symbol(),n$4=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$4.get(this.cssText);return t$1&&void 0===e&&(n$4.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",e$3),r$2=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,e$3)},i$2=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window.trustedTypes,r$1=e$2?e$2.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$2={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$3=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$3};class a$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l$2){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$2.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$2.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$3)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_());}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i$1=globalThis.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e$1,n$2=`<${o$1}>`,l$1=document,h=(t="")=>l$1.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea|title)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$2:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$1+y):s+e$1+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$1),s=t.length-1;if(s>0){l.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$1,t+1));)c.push({type:7,index:r}),t+=e$1.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t));}$(t){this._$AH!==w&&r(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(h()),this.M(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$1?i$1.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i(e,n)}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

class BrowserPlayerEditor extends s {
    setConfig(config) { }
    render() {
        return $ ` <div>Nothing to configure.</div> `;
    }
}
(async () => {
    await hass_loaded();
    if (!customElements.get("browser-player-editor")) {
        customElements.define("browser-player-editor", BrowserPlayerEditor);
        window.customCards = window.customCards || [];
        window.customCards.push({
            type: "browser-player",
            name: "Browser Player",
            preview: true,
        });
    }
})();

class BrowserPlayer extends s {
    static getConfigElement() {
        return document.createElement("browser-player-editor");
    }
    static getStubConfig() {
        return {};
    }
    async setConfig(config) {
        while (!window.browser_mod) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        for (const event of [
            "play",
            "pause",
            "ended",
            "volumechange",
            "canplay",
            "loadeddata",
        ])
            window.browser_mod.player.addEventListener(event, () => this.requestUpdate());
    }
    handleMute(ev) {
        window.browser_mod.player_mute();
    }
    handleVolumeChange(ev) {
        const vol = parseFloat(ev.target.value);
        window.browser_mod.player_set_volume(vol);
    }
    handleMoreInfo(ev) {
        fireEvent("hass-more-info", { entityId: `media_player.${window.browser_mod.entity_id}` }, this);
    }
    handlePlayPause(ev) {
        if (window.browser_mod.player.paused)
            window.browser_mod.player_play();
        else
            window.browser_mod.player_pause();
    }
    setDeviceID() {
        const newID = prompt("Set deviceID", deviceID);
        if (newID !== deviceID) {
            setDeviceID(newID);
            this.requestUpdate();
        }
    }
    render() {
        if (!window.browser_mod) {
            window.setTimeout(() => this.requestUpdate(), 100);
            return $ ``;
        }
        const player = window.browser_mod.player;
        return $ `
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${player.muted ? "mdi:volume-off" : "mdi:volume-high"}
            ></ha-icon>
          </ha-icon-button>
          <ha-slider
            min="0"
            max="1"
            step="0.01"
            ?disabled=${player.muted}
            value=${player.volume}
            @change=${this.handleVolumeChange}
          ></ha-slider>

          ${window.browser_mod.player_state === "stopped"
            ? $ `<div class="placeholder"></div>`
            : $ `
                <ha-icon-button @click=${this.handlePlayPause} highlight>
                  <ha-icon
                    .icon=${player.paused ? "mdi:play" : "mdi:pause"}
                  ></ha-icon>
                </ha-icon-button>
              `}
          <ha-icon-button @click=${this.handleMoreInfo}>
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
          </ha-icon-button>
        </div>

        <div class="device-id" @click=${this.setDeviceID}>${deviceID}</div>
      </ha-card>
    `;
    }
    static get styles() {
        return r$2 `
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
      ha-icon-button ha-icon {
        display: flex;
      }
    `;
    }
}
__decorate([
    e()
], BrowserPlayer.prototype, "hass", void 0);
(async () => {
    await hass_loaded();
    if (!customElements.get("browser-player"))
        customElements.define("browser-player", BrowserPlayer);
})();

class BrowserModConnection {
    async connect() {
        const isCast = document.querySelector("hc-main") !== null;
        if (!isCast) {
            while (!window.hassConnection)
                await new Promise((resolve) => window.setTimeout(resolve, 100));
            this.connection = (await window.hassConnection).conn;
        }
        else {
            this.connection = hass().connection;
        }
        this.connection.subscribeMessage((msg) => this.msg_callback(msg), {
            type: "browser_mod/connect",
            deviceID: deviceID,
        });
        provideHass(this);
    }
    get connected() {
        return this.connection !== undefined;
    }
    msg_callback(message) {
        console.log(message);
    }
    sendUpdate(data) {
        if (!this.connected)
            return;
        this.connection.sendMessage({
            type: "browser_mod/update",
            deviceID,
            data,
        });
    }
}

const BrowserModMediaPlayerMixin = (C) => class extends C {
    constructor() {
        super();
        this.player = new Audio();
        for (const event of ["play", "pause", "ended", "volumechange"]) {
            this.player.addEventListener(event, () => this.player_update());
        }
        window.addEventListener("click", () => {
            if (!this.player.ended)
                this.player.play();
        }, {
            once: true,
        });
    }
    player_update(ev) {
        this.sendUpdate({
            player: {
                volume: this.player.volume,
                muted: this.player.muted,
                src: this.player.src,
                state: this.player_state,
            },
        });
    }
    get player_state() {
        if (!this.player.src)
            return "stopped";
        if (this.player.ended)
            return "stopped";
        if (this.player.paused)
            return "paused";
        return "playing";
    }
    player_play(src) {
        if (src)
            this.player.src = src;
        this.player.play();
    }
    player_pause() {
        this.player.pause();
    }
    player_stop() {
        this.player.pause();
        this.player.src = null;
    }
    player_set_volume(level) {
        if (level === undefined)
            return;
        this.player.volume = level;
    }
    player_mute(mute) {
        if (mute === undefined)
            mute = !this.player.muted;
        this.player.muted = Boolean(mute);
    }
};

const FullyKioskMixin = (C) => class extends C {
    get isFully() {
        return window.fully !== undefined;
    }
    constructor() {
        super();
        if (!this.isFully)
            return;
        this._fullyMotion = false;
        this._motionTimeout = undefined;
        for (const ev of [
            "screenOn",
            "screenOff",
            "pluggedAC",
            "pluggedUSB",
            "onBatteryLevelChanged",
            "unplugged",
            "networkReconnect",
            "onMotion",
        ]) {
            window.fully.bind(ev, `window.browser_mod.fully_update("${ev}");`);
        }
        window.fully.bind("onScreensaverStart", `window.browser_mod.fully_screensaver = true; window.browser_mod.screen_update();`);
        window.fully.bind("onScreensaverStop", `window.browser_mod.fully_screensaver = false; window.browser_mod.screen_update();`);
        this._keepingAlive = false;
    }
    fully_update(event) {
        if (!this.isFully)
            return;
        if (event === "screenOn") {
            window.clearTimeout(this._keepAliveTimer);
            if (!this._keepingAlive)
                this.screen_update();
        }
        else if (event === "screenOff") {
            this.screen_update();
            this._keepingAlive = false;
            if (this.config.force_stay_awake) {
                this._keepAliveTimer = window.setTimeout(() => {
                    this._keepingAlive = true;
                    window.fully.turnScreenOn();
                    window.fully.turnScreenOff();
                }, 270000);
            }
        }
        else if (event === "onMotion") {
            this.fullyMotionTriggered();
        }
        this.sendUpdate({
            fully: {
                battery: window.fully.getBatteryLevel(),
                charging: window.fully.isPlugged(),
                motion: this._fullyMotion,
                ip: window.fully.getIp4Address(),
            },
        });
    }
    startCamera() {
        if (this._fullyCameraTimer !== undefined)
            return;
        this._fullyCameraTimer = window.setInterval(() => {
            this.sendUpdate({
                camera: window.fully.getCamshotJpgBase64(),
            });
        }, 200);
    }
    stopCamera() {
        window.clearInterval(this._fullyCameraTimer);
        this._fullyCameraTimer = undefined;
    }
    fullyMotionTriggered() {
        if (this._keepingAlive)
            return;
        this._fullyMotion = true;
        this.startCamera();
        clearTimeout(this._motionTimeout);
        this._motionTimeout = setTimeout(() => {
            this._fullyMotion = false;
            this.stopCamera();
            this.fully_update();
        }, 5000);
        this.fully_update();
    }
};

const BrowserModCameraMixin = (C) => class extends C {
    setup_camera() {
        console.log("Starting camera");
        if (this._video)
            return;
        this._video = document.createElement("video");
        this._video.autoplay = true;
        this._video.playsInline = true;
        this._video.style.display = "none";
        this._canvas = document.createElement("canvas");
        this._canvas.style.display = "none";
        document.body.appendChild(this._video);
        document.body.appendChild(this._canvas);
        if (!navigator.mediaDevices)
            return;
        console.log("Starting devices");
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
            this._video.srcObject = stream;
            this._video.play();
            this.update_camera();
        });
        this._camera_framerate = 2;
        window.addEventListener("click", () => {
            if (this._video.ended || this._video.paused)
                this._video.play();
        }, {
            once: true,
        });
    }
    update_camera() {
        this._canvas.width = this._video.videoWidth;
        this._canvas.height = this._video.videoHeight;
        const context = this._canvas.getContext("2d");
        context.drawImage(this._video, 0, 0, this._video.videoWidth, this._video.videoHeight);
        this.sendUpdate({
            camera: this._canvas.toDataURL("image/jpeg"),
        });
        setTimeout(() => this.update_camera(), Math.round(1000 / this._camera_framerate));
    }
};

const BrowserModScreensaverMixin = (C) => class extends C {
    constructor() {
        super();
        this._blackout_panel = document.createElement("div");
        this._screenSaver = undefined;
        this._screenSaverTimer = undefined;
        this._screenSaverTimeOut = 0;
        this._screenSaver = {
            fn: undefined,
            clearfn: undefined,
            timer: undefined,
            timeout: undefined,
            listeners: {},
            active: false,
        };
        this._blackout_panel.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            background: black;
            display: none;
        `;
        document.body.appendChild(this._blackout_panel);
    }
    screensaver_set(fn, clearfn, time) {
        this._ss_clear();
        this._screenSaver = {
            fn,
            clearfn,
            timer: undefined,
            timeout: time,
            listeners: {},
            active: false,
        };
        const l = () => this.screensaver_update();
        for (const event of ["mousemove", "mousedown", "keydown", "touchstart"]) {
            window.addEventListener(event, l);
            this._screenSaver.listeners[event] = l;
        }
        this._screenSaver.timer = window.setTimeout(() => this._ss_run(), time * 1000);
    }
    screensaver_update() {
        if (this._screenSaver.active) {
            this.screensaver_stop();
        }
        else {
            window.clearTimeout(this._screenSaver.timer);
            this._screenSaver.timer = window.setTimeout(() => this._ss_run(), this._screenSaver.timeout * 1000);
        }
    }
    screensaver_stop() {
        this._ss_clear();
        this._screenSaver.active = false;
        if (this._screenSaver.clearfn)
            this._screenSaver.clearfn();
        if (this._screenSaver.timeout) {
            this.screensaver_set(this._screenSaver.fn, this._screenSaver.clearfn, this._screenSaver.timeout);
        }
    }
    _ss_clear() {
        window.clearTimeout(this._screenSaverTimer);
        for (const [k, v] of Object.entries(this._screenSaver.listeners)) {
            window.removeEventListener(k, v);
        }
    }
    _ss_run() {
        this._screenSaver.active = true;
        this._screenSaver.fn();
    }
    do_blackout(timeout) {
        this.screensaver_set(() => {
            if (this.isFully) {
                if (this.config.screensaver)
                    window.fully.startScreensaver();
                else
                    window.fully.turnScreenOff(true);
            }
            else {
                this._blackout_panel.style.display = "block";
            }
            this.screen_update();
        }, () => {
            if ((this._blackout_panel.style.display = "block"))
                this._blackout_panel.style.display = "none";
            if (this.isFully) {
                if (!window.fully.getScreenOn())
                    window.fully.turnScreenOn();
                window.fully.stopScreensaver();
            }
            this.screen_update();
        }, timeout || 0);
    }
    no_blackout() {
        if (this.isFully) {
            window.fully.turnScreenOn();
            window.fully.stopScreensaver();
        }
        this.screensaver_stop();
    }
    screen_update() {
        this.sendUpdate({
            screen: {
                blackout: this.isFully
                    ? this.fully_screensaver !== undefined
                        ? this.fully_screensaver
                        : !window.fully.getScreenOn()
                    : Boolean(this._blackout_panel.style.display === "block"),
                brightness: this.isFully
                    ? window.fully.getScreenBrightness()
                    : undefined,
            },
        });
    }
};

async function moreInfo(entity, large=false) {
  const root = document.querySelector("hc-main") || document.querySelector("home-assistant");
  fireEvent("hass-more-info", {entityId: entity}, root);
  const el = await selectTree(root, "$ ha-more-info-dialog");
  if(el)
    el.large = large;
  return el;
}

const BrowserModPopupsMixin = (C) => class extends C {
    constructor() {
        super();
        if (document.querySelector("home-assistant"))
            document
                .querySelector("home-assistant")
                .addEventListener("hass-more-info", (ev) => this._popup_card(ev));
        const isCast = document.querySelector("hc-main") !== null;
        if (!isCast)
            load_lovelace();
    }
    _popup_card(ev) {
        if (!lovelace())
            return;
        if (!ev.detail || !ev.detail.entityId)
            return;
        const data = Object.assign(Object.assign({}, lovelace().config.popup_cards), lovelace().config.views[lovelace().current_view].popup_cards);
        const d = data[ev.detail.entityId];
        if (!d)
            return;
        this.do_popup(d);
        window.setTimeout(() => {
            fireEvent("hass-more-info", { entityID: "." }, ha_element());
        }, 50);
    }
    do_popup(cfg) {
        if (!(cfg.title || cfg.auto_close || cfg.hide_header)) {
            console.error("browser_mod: popup: Must specify title, auto_close or hide_header.");
            return;
        }
        if (!cfg.card) {
            console.error("browser_mod: popup: No card specified");
            return;
        }
        const open = () => {
            popUp(cfg.title, cfg.card, cfg.large, cfg.style, cfg.auto_close || cfg.hide_header);
        };
        if (cfg.auto_close) {
            this.screensaver_set(open, closePopUp, cfg.time);
        }
        else {
            open();
        }
    }
    do_close_popup() {
        this.screensaver_stop();
        closePopUp();
    }
    do_more_info(entity_id, large) {
        if (!entity_id)
            return;
        moreInfo(entity_id, large);
    }
    do_toast(message, duration) {
        if (!message)
            return;
        fireEvent("hass-notification", {
            message,
            duration: parseInt(duration),
        }, ha_element());
    }
};

const BrowserModBrowserMixin = (C) => class extends C {
    constructor() {
        super();
        document.addEventListener("visibilitychange", () => this.sensor_update());
        window.addEventListener("location-changed", () => this.sensor_update());
        window.setInterval(() => this.sensor_update(), 10000);
    }
    sensor_update() {
        const update = async () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const battery = (_b = (_a = navigator).getBattery) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.sendUpdate({
                browser: {
                    path: window.location.pathname,
                    visibility: document.visibilityState,
                    userAgent: navigator.userAgent,
                    currentUser: (_d = (_c = this.hass) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.name,
                    fullyKiosk: this.isFully,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    battery_level: (_f = (_e = window.fully) === null || _e === void 0 ? void 0 : _e.getBatteryLevel()) !== null && _f !== void 0 ? _f : (battery === null || battery === void 0 ? void 0 : battery.level) * 100,
                    charging: (_h = (_g = window.fully) === null || _g === void 0 ? void 0 : _g.isPlugged()) !== null && _h !== void 0 ? _h : battery === null || battery === void 0 ? void 0 : battery.charging,
                    darkMode: (_k = (_j = this.hass) === null || _j === void 0 ? void 0 : _j.themes) === null || _k === void 0 ? void 0 : _k.darkMode,
                    userData: (_l = this.hass) === null || _l === void 0 ? void 0 : _l.user,
                    config: this.config,
                },
            });
        };
        update();
    }
    do_navigate(path) {
        if (!path)
            return;
        history.pushState(null, "", path);
        fireEvent("location-changed", {}, ha_element());
    }
};

var name = "browser_mod";
var version = "1.5.3";
var description = "";
var scripts = {
	build: "rollup -c",
	watch: "rollup -c --watch",
	"update-card-tools": "npm uninstall card-tools && npm install thomasloven/lovelace-card-tools"
};
var keywords = [
];
var author = "Thomas Lovén";
var license = "MIT";
var devDependencies = {
	"@babel/core": "^7.17.9",
	"@rollup/plugin-babel": "^5.3.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.2.1",
	lit: "^2.2.2",
	rollup: "^2.70.2",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.31.2",
	typescript: "^4.6.3"
};
var dependencies = {
	"card-tools": "github:thomasloven/lovelace-card-tools"
};
var pjson = {
	name: name,
	"private": true,
	version: version,
	description: description,
	scripts: scripts,
	keywords: keywords,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

const ext = (baseClass, mixins) => mixins.reduceRight((base, mixin) => mixin(base), baseClass);
class BrowserMod extends ext(BrowserModConnection, [
    BrowserModBrowserMixin,
    BrowserModPopupsMixin,
    BrowserModScreensaverMixin,
    BrowserModCameraMixin,
    FullyKioskMixin,
    BrowserModMediaPlayerMixin,
]) {
    constructor() {
        super();
        this.entity_id = deviceID.replace("-", "_");
        this.cast = document.querySelector("hc-main") !== null;
        this.connect();
        document.body.addEventListener("ll-custom", (ev) => {
            if (ev.detail.browser_mod) {
                this.msg_callback(ev.detail.browser_mod);
            }
        });
        console.info(`%cBROWSER_MOD ${pjson.version} IS INSTALLED
    %cDeviceID: ${deviceID}`, "color: green; font-weight: bold", "");
    }
    async msg_callback(msg) {
        const handlers = {
            update: (msg) => this.update(msg),
            debug: (msg) => this.debug(msg),
            play: (msg) => this.player_play(msg.media_content_id),
            pause: (msg) => this.player_pause(),
            stop: (msg) => this.player_stop(),
            "set-volume": (msg) => this.player_set_volume(msg.volume_level),
            mute: (msg) => this.player_mute(msg.mute),
            toast: (msg) => this.do_toast(msg.message, msg.duration),
            popup: (msg) => this.do_popup(msg),
            "close-popup": (msg) => this.do_close_popup(),
            "more-info": (msg) => this.do_more_info(msg.entity_id, msg.large),
            navigate: (msg) => this.do_navigate(msg.navigation_path),
            "set-theme": (msg) => this.set_theme(msg),
            "lovelace-reload": (msg) => this.lovelace_reload(msg),
            "window-reload": () => window.location.reload(),
            blackout: (msg) => this.do_blackout(msg.time ? parseInt(msg.time) : undefined),
            "no-blackout": (msg) => {
                if (msg.brightness && this.isFully) {
                    window.fully.setScreenBrightness(msg.brightness);
                }
                this.no_blackout();
            },
            "call-service": (msg) => this.call_service(msg),
            commands: async (msg) => {
                for (const m of msg.commands) {
                    await this.msg_callback(m);
                }
            },
            delay: async (msg) => await new Promise((resolve) => {
                window.setTimeout(resolve, msg.seconds * 1000);
            }),
        };
        await handlers[msg.command.replace("_", "-")](msg);
    }
    debug(msg) {
        popUp(`deviceID`, { type: "markdown", content: `# ${deviceID}` });
        alert(deviceID);
    }
    set_theme(msg) {
        if (!msg.theme)
            msg.theme = "default";
        fireEvent("settheme", { theme: msg.theme }, ha_element());
    }
    lovelace_reload(msg) {
        const ll = lovelace_view();
        if (ll)
            fireEvent("config-refresh", {}, ll);
    }
    call_service(msg) {
        const _replaceThis = (data) => {
            if (data === "this")
                return deviceID;
            if (Array.isArray(data))
                return data.map(_replaceThis);
            if (data.constructor == Object) {
                for (const key in data)
                    data[key] = _replaceThis(data[key]);
            }
            return data;
        };
        const [domain, service] = msg.service.split(".", 2);
        let service_data = _replaceThis(JSON.parse(JSON.stringify(msg.service_data)));
        this.hass.callService(domain, service, service_data);
    }
    update(msg = null) {
        if (msg) {
            if (msg.name) {
                this.entity_id = msg.name.toLowerCase();
            }
            if (msg.camera && !this.isFully) {
                this.setup_camera();
            }
            this.config = Object.assign(Object.assign({}, this.config), msg);
        }
        this.player_update();
        this.fully_update();
        this.screen_update();
        this.sensor_update();
    }
}
(async () => {
    await hass_loaded();
    if (!window.browser_mod)
        window.browser_mod = new BrowserMod();
})();

export { BrowserMod };
