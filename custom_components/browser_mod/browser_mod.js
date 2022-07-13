const ID_STORAGE_KEY$1 = 'lovelace-player-device-id';
function _deviceID() {
  if(!localStorage[ID_STORAGE_KEY$1])
  {
    const s4 = () => {
      return Math.floor((1+Math.random())*100000).toString(16).substring(1);
    };
    if(window['fully'] && typeof fully.getDeviceId === "function")
      localStorage[ID_STORAGE_KEY$1] = fully.getDeviceId();
    else
      localStorage[ID_STORAGE_KEY$1] = `${s4()}${s4()}-${s4()}${s4()}`;
  }
  return localStorage[ID_STORAGE_KEY$1];
}
let deviceID = _deviceID();

const setDeviceID = (id) => {
  if(id === null) return;
  if(id === "clear") {
    localStorage.removeItem(ID_STORAGE_KEY$1);
  } else {
    localStorage[ID_STORAGE_KEY$1] = id;
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

function hass$1() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
}
function provideHass$1(element) {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').provideHass(element);

  if(document.querySelector('home-assistant'))
    return document.querySelector("home-assistant").provideHass(element);

  return undefined;
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
  p.hass = hass$1();
  if(p.hass === undefined) {
    await new Promise(resolve => {
      window.addEventListener('connection-status', (ev) => {
        resolve();
      }, {once: true});
    });
    p.hass = hass$1();
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
    provideHass$1(el);
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

async function _hass_base_el() {
    await Promise.race([
        customElements.whenDefined("home-assistant"),
        customElements.whenDefined("hc-main"),
    ]);
    const element = customElements.get("home-assistant")
        ? "home-assistant"
        : "hc-main";
    while (!document.querySelector(element))
        await new Promise((r) => window.setTimeout(r, 100));
    return document.querySelector(element);
}
async function hass() {
    const base = await _hass_base_el();
    while (!base.hass)
        await new Promise((r) => window.setTimeout(r, 100));
    return base.hass;
}
async function provideHass(el) {
    const base = await _hass_base_el();
    base.provideHass(el);
}

const ID_STORAGE_KEY = "browser_mod-device-id";
const ConnectionMixin = (SuperClass) => {
    class BrowserModConnection extends SuperClass {
        constructor() {
            super(...arguments);
            this.connected = false;
            this.connectionPromise = new Promise((resolve) => {
                this._connectionResolve = resolve;
            });
        }
        LOG(...args) {
            const dt = new Date();
            console.log(`${dt.toLocaleTimeString()}`, ...args);
        }
        fireEvent(event, detail = undefined) {
            this.dispatchEvent(new CustomEvent(event, { detail }));
        }
        incoming_message(msg) {
            var _a;
            if (msg.command) {
                this.LOG("Command:", msg);
                this.fireEvent(`command-${msg.command}`, msg);
            }
            else if (msg.result) {
                this.update_config(msg.result);
            }
            (_a = this._connectionResolve) === null || _a === void 0 ? void 0 : _a.call(this);
        }
        update_config(cfg) {
            var _a;
            this.LOG("Receive:", cfg);
            let update = false;
            if (!this.registered && ((_a = cfg.devices) === null || _a === void 0 ? void 0 : _a[this.deviceID])) {
                update = true;
            }
            this._data = cfg;
            if (!this.connected) {
                this.connected = true;
                this.fireEvent("browser-mod-connected");
            }
            this.fireEvent("browser-mod-config-update");
            if (update)
                this.sendUpdate({});
        }
        async connect() {
            const conn = (await hass()).connection;
            this.connection = conn;
            // Subscribe to configuration updates
            conn.subscribeMessage((msg) => this.incoming_message(msg), {
                type: "browser_mod/connect",
                deviceID: this.deviceID,
            });
            // Keep connection status up to date
            conn.addEventListener("disconnected", () => {
                this.connected = false;
                this.fireEvent("browser-mod-disconnected");
            });
            conn.addEventListener("ready", () => {
                this.connected = true;
                this.fireEvent("browser-mod-connected");
                this.sendUpdate({});
            });
            provideHass(this);
        }
        get config() {
            var _a, _b;
            return (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.config) !== null && _b !== void 0 ? _b : {};
        }
        get devices() {
            var _a, _b;
            return (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.devices) !== null && _b !== void 0 ? _b : [];
        }
        get registered() {
            var _a;
            return ((_a = this.devices) === null || _a === void 0 ? void 0 : _a[this.deviceID]) !== undefined;
        }
        set registered(reg) {
            (async () => {
                if (reg) {
                    if (this.registered)
                        return;
                    await this.connection.sendMessage({
                        type: "browser_mod/register",
                        deviceID: this.deviceID,
                    });
                }
                else {
                    if (!this.registered)
                        return;
                    await this.connection.sendMessage({
                        type: "browser_mod/unregister",
                        deviceID: this.deviceID,
                    });
                }
            })();
        }
        async _reregister(newData = {}) {
            await this.connection.sendMessage({
                type: "browser_mod/reregister",
                deviceID: this.deviceID,
                data: Object.assign(Object.assign({}, this.devices[this.deviceID]), newData),
            });
        }
        get meta() {
            if (!this.registered)
                return null;
            return this.devices[this.deviceID].meta;
        }
        set meta(value) {
            this._reregister({ meta: value });
        }
        get cameraEnabled() {
            if (!this.registered)
                return null;
            return this.devices[this.deviceID].camera;
        }
        set cameraEnabled(value) {
            this._reregister({ camera: value });
        }
        sendUpdate(data) {
            if (!this.connected || !this.registered)
                return;
            this.LOG("Send:", data);
            this.connection.sendMessage({
                type: "browser_mod/update",
                deviceID: this.deviceID,
                data,
            });
        }
        get deviceID() {
            if (localStorage[ID_STORAGE_KEY])
                return localStorage[ID_STORAGE_KEY];
            this.deviceID = "";
            return this.deviceID;
        }
        set deviceID(id) {
            var _a, _b;
            function _createDeviceID() {
                var _a, _b;
                const s4 = () => {
                    return Math.floor((1 + Math.random()) * 100000)
                        .toString(16)
                        .substring(1);
                };
                return (_b = (_a = window.fully) === null || _a === void 0 ? void 0 : _a.getDeviceId()) !== null && _b !== void 0 ? _b : `${s4()}${s4()}-${s4()}${s4()}`;
            }
            if (id === "")
                id = _createDeviceID();
            const oldID = localStorage[ID_STORAGE_KEY];
            localStorage[ID_STORAGE_KEY] = id;
            this.fireEvent("browser-mod-config-update");
            if (((_a = this.devices) === null || _a === void 0 ? void 0 : _a[oldID]) !== undefined &&
                ((_b = this.devices) === null || _b === void 0 ? void 0 : _b[this.deviceID]) === undefined) {
                (async () => {
                    await this.connection.sendMessage({
                        type: "browser_mod/reregister",
                        deviceID: oldID,
                        data: Object.assign(Object.assign({}, this.devices[oldID]), { deviceID: this.deviceID }),
                    });
                })();
            }
            // TODO: Send update to backend to update device
        }
    }
    return BrowserModConnection;
};

const ScreenSaverMixin = (SuperClass) => {
    class ScreenSaverMixinClass extends SuperClass {
        constructor() {
            super();
            this._listeners = {};
            this._brightness = 255;
            const panel = (this._panel = document.createElement("div"));
            panel.setAttribute("browser-mod", "");
            panel.attachShadow({ mode: "open" });
            const styleEl = document.createElement("style");
            styleEl.innerHTML = `
        :host {
          background: rgba(0,0,0, var(--darkness));
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          display: block;
          pointer-events: none;
        }
        :host([dark]) {
          background: rgba(0,0,0,1);
        }
      `;
            panel.shadowRoot.appendChild(styleEl);
            document.body.appendChild(panel);
            this.addEventListener("command-screen_off", () => this._screen_off());
            this.addEventListener("command-screen_on", (ev) => this._screen_on(ev));
            this.connectionPromise.then(() => this._screen_on());
        }
        _screen_off() {
            this._panel.setAttribute("dark", "");
            this.sendUpdate({
                screen_on: false,
                screen_brightness: 0,
            });
            const l = () => this._screen_on();
            for (const ev of ["pointerdown", "pointermove", "keydown"]) {
                this._listeners[ev] = l;
                window.addEventListener(ev, l);
            }
        }
        _screen_on(ev = undefined) {
            var _a;
            if ((_a = ev === null || ev === void 0 ? void 0 : ev.detail) === null || _a === void 0 ? void 0 : _a.brightness) {
                this._brightness = ev.detail.brightness;
                this._panel.style.setProperty("--darkness", 1 - ev.detail.brightness / 255);
            }
            this._panel.removeAttribute("dark");
            this.sendUpdate({
                screen_on: true,
                screen_brightness: this._brightness,
            });
            for (const ev of ["pointerdown", "pointermove", "keydown"]) {
                if (this._listeners[ev]) {
                    window.removeEventListener(ev, this._listeners[ev]);
                    this._listeners[ev] = undefined;
                }
            }
        }
    }
    return ScreenSaverMixinClass;
};

const MediaPlayerMixin = (SuperClass) => {
    return class MediaPlayerMixinClass extends SuperClass {
        constructor() {
            super();
            this.player = new Audio();
            this._player_enabled = false;
            for (const ev of ["play", "pause", "ended", "volumechange"]) {
                this.player.addEventListener(ev, () => this._player_update());
            }
            window.addEventListener("pointerdown", () => {
                this._player_enabled = true;
                if (!this.player.ended)
                    this.player.play();
            }, { once: true });
            this.addEventListener("command-player-play", (ev) => {
                var _a;
                if ((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.media_content_id)
                    this.player.src = ev.detail.media_content_id;
                this.player.play();
            });
            this.addEventListener("command-player-pause", (ev) => this.player.pause());
            this.addEventListener("command-player-stop", (ev) => {
                this.player.src = null;
                this.player.pause();
            });
            this.addEventListener("command-player-set-volume", (ev) => {
                var _a;
                if (((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.volume_level) === undefined)
                    return;
                this.player.volume = ev.detail.volume_level;
            });
            this.addEventListener("command-player-mute", (ev) => {
                var _a;
                if (((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.mute) !== undefined)
                    this.player.muted = Boolean(ev.detail.mute);
                else
                    this.player.muted = !this.player.muted;
            });
            this.connectionPromise.then(() => this._player_update());
        }
        _player_update() {
            const state = this._player_enabled
                ? this.player.src
                    ? this.player.ended
                        ? "stopped"
                        : this.player.paused
                            ? "paused"
                            : "playing"
                    : "stopped"
                : "unavailable";
            this.sendUpdate({
                player: {
                    volume: this.player.volume,
                    muted: this.player.muted,
                    src: this.player.src,
                    state,
                },
            });
        }
    };
};

const CameraMixin = (SuperClass) => {
    return class CameraMixinClass extends SuperClass {
        constructor() {
            super();
            this._framerate = 2;
            window.addEventListener("pointerdown", () => {
                this._setup_camera();
            }, { once: true });
        }
        async _setup_camera() {
            if (this._video)
                return;
            await this.connectionPromise;
            if (!this.cameraEnabled)
                return;
            const video = (this._video = document.createElement("video"));
            video.autoplay = true;
            video.playsInline = true;
            video.style.display = "none";
            const canvas = (this._canvas = document.createElement("canvas"));
            canvas.style.display = "none";
            document.body.appendChild(video);
            document.body.appendChild(canvas);
            if (!navigator.mediaDevices)
                return;
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            video.srcObject = stream;
            video.play();
            this.update_camera();
        }
        async update_camera() {
            var _a;
            if (!this.cameraEnabled) {
                const stream = (_a = this._video) === null || _a === void 0 ? void 0 : _a.srcObject;
                if (stream) {
                    stream.getTracks().forEach((t) => t.stop());
                    this._video.scrObject = undefined;
                }
                return;
            }
            const video = this._video;
            const width = video.videoWidth;
            const height = video.videoHeight;
            this._canvas.width = width;
            this._canvas.height = height;
            const context = this._canvas.getContext("2d");
            context.drawImage(video, 0, 0, width, height);
            this.sendUpdate({
                camera: this._canvas.toDataURL("image/jpeg"),
            });
            const interval = Math.round(1000 / this._framerate);
            setTimeout(() => this.update_camera(), interval);
        }
    };
};

var name = "browser_mod";
var version = "2.0.0b0";
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

// export class BrowserMod extends ext(BrowserModConnection, [
//   BrowserModBrowserMixin,
//   BrowserModPopupsMixin,
//   BrowserModScreensaverMixin,
//   BrowserModCameraMixin,
//   FullyKioskMixin,
//   BrowserModMediaPlayerMixin,
// ]) {
class BrowserMod extends CameraMixin(MediaPlayerMixin(ScreenSaverMixin(ConnectionMixin(EventTarget)))) {
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
}
(async () => {
    await hass_loaded();
    if (!window.browser_mod)
        window.browser_mod = new BrowserMod();
})();

export { BrowserMod };
