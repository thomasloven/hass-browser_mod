/*
This file is copied from https://github.com/benlesh/event-target-polyfill and tweaked such that it never polyfills Event

MIT License

Copyright (c) 2020 Ben Lesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const root = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;

function isConstructor(fn) {
  try {
    new fn();
  } catch (error) {
    return false;
  }

  return true;
}

if (typeof root.EventTarget === "undefined" || !isConstructor(root.EventTarget)) {
  root.EventTarget = function () {
    function EventTarget() {
      this.__listeners = new Map();
    }

    EventTarget.prototype = Object.create(Object.prototype);

    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (arguments.length < 2) {
        throw new TypeError(`TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);
      }

      const __listeners = this.__listeners;
      const actualType = type.toString();

      if (!__listeners.has(actualType)) {
        __listeners.set(actualType, new Map());
      }

      const listenersForType = __listeners.get(actualType);

      if (!listenersForType.has(listener)) {
        // Any given listener is only registered once
        listenersForType.set(listener, options);
      }
    };

    EventTarget.prototype.removeEventListener = function (type, listener, _options) {
      if (arguments.length < 2) {
        throw new TypeError(`TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);
      }

      const __listeners = this.__listeners;
      const actualType = type.toString();

      if (__listeners.has(actualType)) {
        const listenersForType = __listeners.get(actualType);

        if (listenersForType.has(listener)) {
          listenersForType.delete(listener);
        }
      }
    };

    EventTarget.prototype.dispatchEvent = function (event) {
      if (!(event instanceof Event)) {
        throw new TypeError(`Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.`);
      }

      const type = event.type;
      const __listeners = this.__listeners;

      const listenersForType = __listeners.get(type);

      if (listenersForType) {
        for (const [listener, options] of listenersForType.entries()) {
          try {
            if (typeof listener === "function") {
              // Listener functions must be executed with the EventTarget as the `this` context.
              listener.call(this, event);
            } else if (listener && typeof listener.handleEvent === "function") {
              // Listener objects have their handleEvent method called, if they have one
              listener.handleEvent(event);
            }
          } catch (err) {
            // We need to report the error to the global error handling event,
            // but we do not want to break the loop that is executing the events.
            // Unfortunately, this is the best we can do, which isn't great, because the
            // native EventTarget will actually do this synchronously before moving to the next
            // event in the loop.
            setTimeout(() => {
              throw err;
            });
          }

          if (options && options.once) {
            // If this was registered with { once: true }, we need
            // to remove it now.
            listenersForType.delete(listener);
          }
        }
      } // Since there are no cancellable events on a base EventTarget,
      // this should always return true.


      return true;
    };

    return EventTarget;
  }();
}

/******************************************************************************
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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

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
const t$3=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$5=Symbol(),n$4=new WeakMap;class s$3{constructor(t,n,s){if(this._$cssResult$=!0,s!==e$5)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n;}get styleSheet(){let e=this.o;const s=this.t;if(t$3&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=n$4.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n$4.set(s,e));}return e}toString(){return this.cssText}}const o$5=t=>new s$3("string"==typeof t?t:t+"",void 0,e$5),r$2=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,t,e$5)},i$4=(e,n)=>{t$3?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$4=window.trustedTypes,r$1=e$4?e$4.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$4={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$3=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$4,reflect:!1,hasChanged:n$3};class a$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;null!==(i=this.h)&&void 0!==i||(this.h=[]),this.h.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$4(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e,r;const h=this.constructor._$Ep(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$4.toAttribute)(i,s.type);this._$El=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$El=null;}}_$AK(t,i){var s,e;const r=this.constructor,h=r._$Ev.get(t);if(void 0!==h&&this._$El!==h){const t=r.getPropertyOptions(h),n=t.converter,l=null!==(e=null!==(s=null==n?void 0:n.fromAttribute)&&void 0!==s?s:"function"==typeof n?n:null)&&void 0!==e?e:o$4.fromAttribute;this._$El=h,this[h]=l(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$3)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$3=globalThis.trustedTypes,s$1=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$3=`lit$${(Math.random()+"").slice(9)}$`,o$3="?"+e$3,n$2=`<${o$3}>`,l$1=document,h=(t="")=>l$1.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>d(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),_=/'/g,g=/"/g,m=/^(?:script|style|textarea|title)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),x=new WeakMap,T=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),E=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(m.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?g:_):d===g||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$2:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$3+y):s+e$3+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class C{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,s);if(this.el=C.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$3)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$3),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(m.test(l.tagName)){const t=l.textContent.split(e$3),s=t.length-1;if(s>0){l.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$3)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$3,t+1));)c.push({type:7,index:r}),t+=e$3.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$C_=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$C_}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.T(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.T(t);}j(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.j(t));}T(t){this._$AH!==w&&r(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=x.get(t.strings);return void 0===i&&x.set(t.strings,i=new C(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.j(h()),this.j(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$C_=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.P(t);}P(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}P(t){this.element[this.name]=t===w?void 0:t;}}const R=i$3?i$3.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}P(t){t&&t!==w?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$2=globalThis.litHtmlVersions)&&void 0!==t$2?t$2:globalThis.litHtmlVersions=[]).push("2.2.7");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o$2;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=T(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s});(null!==(o$2=globalThis.litElementVersions)&&void 0!==o$2?o$2:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$2(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$2(e,n)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return e$2({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i$1(i,n){return o$1({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

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
// (async () => {
//   while (!window.browser_mod) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   await window.browser_mod.connectionPromise;
if (!customElements.get("browser-player-editor")) {
    customElements.define("browser-player-editor", BrowserPlayerEditor);
    window.customCards = window.customCards || [];
    window.customCards.push({
        type: "browser-player",
        name: "Browser Player",
        preview: true,
    });
}
// })();

class BrowserPlayer extends s {
    static getConfigElement() {
        return document.createElement("browser-player-editor");
    }
    static getStubConfig() {
        return {};
    }
    async connectedCallback() {
        var _a;
        super.connectedCallback();
        if (!((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.registered)) {
            if (this.parentElement.localName === "hui-card-preview") {
                this.removeAttribute("hidden");
            }
            else {
                this.setAttribute("hidden", "");
            }
        }
    }
    async setConfig(config) {
        var _a, _b, _c, _d;
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
            (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a._audio_player) === null || _b === void 0 ? void 0 : _b.addEventListener(event, () => this.requestUpdate());
        (_d = (_c = window.browser_mod) === null || _c === void 0 ? void 0 : _c._video_player) === null || _d === void 0 ? void 0 : _d.addEventListener(event, () => this.requestUpdate());
    }
    handleMute(ev) {
        window.browser_mod.player.muted = !window.browser_mod.player.muted;
    }
    handleVolumeChange(ev) {
        const volume_level = parseFloat(ev.target.value);
        window.browser_mod.player.volume = volume_level;
    }
    handleMoreInfo(ev) {
        var _a;
        this.dispatchEvent(new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                entityId: (_a = window.browser_mod.browserEntities) === null || _a === void 0 ? void 0 : _a.player,
            },
        }));
    }
    handlePlayPause(ev) {
        if (!window.browser_mod.player.src ||
            window.browser_mod.player.paused ||
            window.browser_mod.player.ended) {
            window.browser_mod.player.play();
            window.browser_mod._show_video_player();
        }
        else {
            window.browser_mod.player.pause();
        }
    }
    render() {
        var _a;
        if (!window.browser_mod) {
            window.setTimeout(() => this.requestUpdate(), 100);
            return $ ``;
        }
        if (!((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.registered)) {
            return $ `
        <ha-card>
          <ha-alert> This browser is not registered to Browser Mod. </ha-alert>
        </ha-card>
      `;
        }
        return $ `
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${window.browser_mod.player.muted
            ? "mdi:volume-off"
            : "mdi:volume-high"}
            ></ha-icon>
          </ha-icon-button>
          <ha-slider
            min="0"
            max="1"
            step="0.01"
            ?disabled=${window.browser_mod.player.muted}
            value=${window.browser_mod.player.volume}
            @change=${this.handleVolumeChange}
          ></ha-slider>

          ${window.browser_mod.player_state === "stopped"
            ? $ `<div class="placeholder"></div>`
            : $ `
                <ha-icon-button @click=${this.handlePlayPause} highlight>
                  <ha-icon
                    .icon=${!window.browser_mod.player.src ||
                window.browser_mod.player.ended ||
                window.browser_mod.player.paused
                ? "mdi:play"
                : "mdi:pause"}
                  ></ha-icon>
                </ha-icon-button>
              `}
          <ha-icon-button @click=${this.handleMoreInfo}>
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
          </ha-icon-button>
        </div>

        <div class="browser-id">${window.browser_mod.browserID}</div>
      </ha-card>
    `;
    }
    static get styles() {
        return r$2 `
      :host(["hidden"]) {
        display: none;
      }
      :host([edit-mode="true"]) {
        display: block !important;
      }
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
      .browser-id {
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
    e$2()
], BrowserPlayer.prototype, "hass", void 0);
__decorate([
    e$2({ attribute: "edit-mode", reflect: true })
], BrowserPlayer.prototype, "editMode", void 0);
// (async () => {
//   while (!window.browser_mod) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   await window.browser_mod.connectionPromise;
if (!customElements.get("browser-player"))
    customElements.define("browser-player", BrowserPlayer);
// })();

const TIMEOUT_ERROR = "SELECTTREE-TIMEOUT";
async function await_element(el, hard = false) {
    var _a;
    if ((_a = el.localName) === null || _a === void 0 ? void 0 : _a.includes("-"))
        await customElements.whenDefined(el.localName);
    if (el.updateComplete)
        await el.updateComplete;
    if (hard) {
        if (el.pageRendered)
            await el.pageRendered;
        if (el._panelState) {
            let rounds = 0;
            while (el._panelState !== "loaded" && rounds++ < 5)
                await new Promise((r) => setTimeout(r, 100));
        }
    }
}
async function _selectTree(root, path, all = false) {
    let el = [root];
    if (typeof path === "string") {
        path = path.split(/(\$| )/);
    }
    while (path[path.length - 1] === "")
        path.pop();
    for (const [i, p] of path.entries()) {
        const e = el[0];
        if (!e)
            return null;
        if (!p.trim().length)
            continue;
        await_element(e);
        el = p === "$" ? [e.shadowRoot] : e.querySelectorAll(p);
    }
    return all ? el : el[0];
}
async function selectTree(root, path, all = false, timeout = 10000) {
    return Promise.race([
        _selectTree(root, path, all),
        new Promise((_, reject) => setTimeout(() => reject(new Error(TIMEOUT_ERROR)), timeout)),
    ]).catch((err) => {
        if (!err.message || err.message !== TIMEOUT_ERROR)
            throw err;
        return null;
    });
}
async function hass_base_el() {
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
    const base = await hass_base_el();
    while (!base.hass)
        await new Promise((r) => window.setTimeout(r, 100));
    return base.hass;
}
async function provideHass(el) {
    const base = await hass_base_el();
    base.provideHass(el);
}
const loadLoadCardHelpers = async () => {
    var _a, _b, _c;
    if (window.loadCardHelpers !== undefined)
        return;
    await customElements.whenDefined("partial-panel-resolver");
    const ppResolver = document.createElement("partial-panel-resolver");
    const routes = ppResolver.getRoutes([
        {
            component_name: "lovelace",
            url_path: "a",
        },
    ]);
    await ((_c = (_b = (_a = routes === null || routes === void 0 ? void 0 : routes.routes) === null || _a === void 0 ? void 0 : _a.a) === null || _b === void 0 ? void 0 : _b.load) === null || _c === void 0 ? void 0 : _c.call(_b));
    // Load resources
    try {
        const llPanel = document.createElement("ha-panel-lovelace");
        llPanel.hass = await hass();
        llPanel.panel = { config: { mode: "yaml" } };
        await llPanel._fetchConfig(false);
    }
    catch (e) { }
};
const loadHaForm = async () => {
    if (customElements.get("ha-form"))
        return;
    await loadLoadCardHelpers();
    const helpers = await window.loadCardHelpers();
    if (!helpers)
        return;
    const card = await helpers.createCardElement({ type: "button" });
    if (!card)
        return;
    await card.constructor.getConfigElement();
};
function throttle(timeout) {
    return function (target, propertyKey, descriptor) {
        const fn = descriptor.value;
        let cooldown = undefined;
        descriptor.value = function (...rest) {
            if (cooldown)
                return;
            cooldown = setTimeout(() => (cooldown = undefined), timeout);
            return fn.bind(this)(...rest);
        };
    };
}
function runOnce(restart = false) {
    return function (target, propertyKey, descriptor) {
        const fn = descriptor.value;
        let running = undefined;
        const newfn = function (...rest) {
            if (restart && running === false)
                running = true;
            if (running !== undefined)
                return;
            running = false;
            const retval = fn.bind(this)(...rest);
            if (running) {
                running = undefined;
                return newfn.bind(this)(...rest);
            }
            else {
                running = undefined;
                return retval;
            }
        };
        descriptor.value = newfn;
    };
}
async function waitRepeat(fn, times, delay) {
    while (times--) {
        await fn();
        await new Promise((r) => setTimeout(r, delay));
    }
}

const ConnectionMixin = (SuperClass) => {
    class BrowserModConnection extends SuperClass {
        constructor() {
            super(...arguments);
            this.connected = false;
            this.connectionPromise = new Promise((resolve) => {
                this._connectionResolve = resolve;
            });
            this.browserEntities = {};
        }
        LOG(...args) {
            if (window.browser_mod_log === undefined)
                return;
            const dt = new Date();
            console.log(`${dt.toLocaleTimeString()}`, ...args);
            this.connection.sendMessage({
                type: "browser_mod/log",
                message: args[0],
            });
        }
        fireEvent(event, detail = undefined) {
            this.dispatchEvent(new CustomEvent(event, { detail, bubbles: true }));
        }
        incoming_message(msg) {
            var _a;
            if (msg.command) {
                this.LOG("Command:", msg);
                this.fireEvent(`command-${msg.command}`, msg);
            }
            else if (msg.browserEntities) {
                this.browserEntities = msg.browserEntities;
            }
            else if (msg.result) {
                this.update_config(msg.result);
            }
            (_a = this._connectionResolve) === null || _a === void 0 ? void 0 : _a.call(this);
            this._connectionResolve = undefined;
        }
        update_config(cfg) {
            var _a;
            this.LOG("Receive:", cfg);
            let update = false;
            if (!this.registered && ((_a = cfg.browsers) === null || _a === void 0 ? void 0 : _a[this.browserID])) {
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
                browserID: this.browserID,
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
        get browsers() {
            var _a, _b;
            return (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.browsers) !== null && _b !== void 0 ? _b : [];
        }
        get registered() {
            var _a;
            return ((_a = this.browsers) === null || _a === void 0 ? void 0 : _a[this.browserID]) !== undefined;
        }
        get browser_locked() {
            var _a, _b;
            return (_b = (_a = this.browsers) === null || _a === void 0 ? void 0 : _a[this.browserID]) === null || _b === void 0 ? void 0 : _b.locked;
        }
        set registered(reg) {
            (async () => {
                if (reg) {
                    if (this.registered)
                        return;
                    await this.connection.sendMessage({
                        type: "browser_mod/register",
                        browserID: this.browserID,
                    });
                }
                else {
                    if (!this.registered)
                        return;
                    await this.connection.sendMessage({
                        type: "browser_mod/unregister",
                        browserID: this.browserID,
                    });
                }
            })();
        }
        async _reregister(newData = {}) {
            await this.connection.sendMessage({
                type: "browser_mod/register",
                browserID: this.browserID,
                data: Object.assign(Object.assign({}, this.browsers[this.browserID]), newData),
            });
        }
        get global_settings() {
            var _a, _b;
            const settings = {};
            const global = (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.settings) !== null && _b !== void 0 ? _b : {};
            for (const [k, v] of Object.entries(global)) {
                if (v !== null)
                    settings[k] = v;
            }
            return settings;
        }
        get user_settings() {
            var _a, _b, _c, _d, _e;
            const settings = {};
            const user = (_e = (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.user_settings) === null || _b === void 0 ? void 0 : _b[(_d = (_c = this.hass) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id]) !== null && _e !== void 0 ? _e : {};
            for (const [k, v] of Object.entries(user)) {
                if (v !== null)
                    settings[k] = v;
            }
            return settings;
        }
        get browser_settings() {
            var _a, _b, _c;
            const settings = {};
            const browser = (_c = (_b = (_a = this.browsers) === null || _a === void 0 ? void 0 : _a[this.browserID]) === null || _b === void 0 ? void 0 : _b.settings) !== null && _c !== void 0 ? _c : {};
            for (const [k, v] of Object.entries(browser)) {
                if (v !== null)
                    settings[k] = v;
            }
            return settings;
        }
        get settings() {
            return Object.assign(Object.assign(Object.assign({}, this.global_settings), this.browser_settings), this.user_settings);
        }
        set_setting(key, value, level) {
            var _a;
            switch (level) {
                case "global": {
                    this.connection.sendMessage({
                        type: "browser_mod/settings",
                        key,
                        value,
                    });
                    break;
                }
                case "user": {
                    const user = this.hass.user.id;
                    this.connection.sendMessage({
                        type: "browser_mod/settings",
                        user,
                        key,
                        value,
                    });
                    break;
                }
                case "browser": {
                    const settings = (_a = this.browsers[this.browserID]) === null || _a === void 0 ? void 0 : _a.settings;
                    settings[key] = value;
                    this._reregister({ settings });
                    break;
                }
            }
        }
        get cameraEnabled() {
            if (!this.registered)
                return null;
            return this.browsers[this.browserID].camera;
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
                browserID: this.browserID,
                data,
            });
        }
        browserIDChanged(oldID, newID) {
            var _a, _b;
            this.fireEvent("browser-mod-config-update");
            if (((_a = this.browsers) === null || _a === void 0 ? void 0 : _a[oldID]) !== undefined &&
                ((_b = this.browsers) === null || _b === void 0 ? void 0 : _b[this.browserID]) === undefined) {
                (async () => {
                    await this.connection.sendMessage({
                        type: "browser_mod/register",
                        browserID: oldID,
                        data: Object.assign(Object.assign({}, this.browsers[oldID]), { browserID: this.browserID }),
                    });
                })();
            }
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
            document.body.append(panel);
            panel.classList.add("browser-mod-blackout");
            panel.attachShadow({ mode: "open" });
            const styleEl = document.createElement("style");
            panel.shadowRoot.append(styleEl);
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
            this.addEventListener("command-screen_off", () => this._screen_off());
            this.addEventListener("command-screen_on", (ev) => this._screen_on(ev));
            this.addEventListener("fully-update", () => this.send_screen_status());
            this.connectionPromise.then(() => this._screen_on());
        }
        send_screen_status() {
            let screen_on = !this._panel.hasAttribute("dark");
            let screen_brightness = this._brightness;
            if (this.fully) {
                screen_on = this.fully_screen;
                screen_brightness = this.fully_brightness;
            }
            this.sendUpdate({ screen_on, screen_brightness });
        }
        _screen_off() {
            if (this.fully) {
                this.fully_screen = false;
            }
            else {
                this._panel.setAttribute("dark", "");
            }
            this.send_screen_status();
            const l = () => this._screen_on();
            for (const ev of ["pointerdown", "pointermove", "keydown"]) {
                this._listeners[ev] = l;
                window.addEventListener(ev, l);
            }
        }
        _screen_on(ev = undefined) {
            var _a, _b;
            if (this.fully) {
                this.fully_screen = true;
                if ((_a = ev === null || ev === void 0 ? void 0 : ev.detail) === null || _a === void 0 ? void 0 : _a.brightness) {
                    this.fully_brightness = ev.detail.brightness;
                }
            }
            else {
                if ((_b = ev === null || ev === void 0 ? void 0 : ev.detail) === null || _b === void 0 ? void 0 : _b.brightness) {
                    this._brightness = ev.detail.brightness;
                    this._panel.style.setProperty("--darkness", 1 - ev.detail.brightness / 255);
                }
                this._panel.removeAttribute("dark");
            }
            this.send_screen_status();
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
    class MediaPlayerMixinClass extends SuperClass {
        constructor() {
            super();
            this._audio_player = new Audio();
            this._video_player = document.createElement("video");
            this._video_player.controls = true;
            this._video_player.style.setProperty("width", "100%");
            this.player = this._audio_player;
            this._player_enabled = false;
            for (const ev of ["play", "pause", "ended", "volumechange"]) {
                this._audio_player.addEventListener(ev, () => this._player_update());
                this._video_player.addEventListener(ev, () => this._player_update());
            }
            for (const ev of ["timeupdate"]) {
                this._audio_player.addEventListener(ev, () => this._player_update_throttled());
                this._video_player.addEventListener(ev, () => this._player_update_throttled());
            }
            this.firstInteraction.then(() => {
                this._player_enabled = true;
                if (!this.player.ended)
                    this.player.play();
            });
            this.addEventListener("command-player-play", (ev) => {
                var _a, _b, _c;
                if (this.player.src)
                    this.player.pause();
                if ((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.media_type)
                    if ((_b = ev.detail) === null || _b === void 0 ? void 0 : _b.media_type.startsWith("video"))
                        this.player = this._video_player;
                    else
                        this.player = this._audio_player;
                if ((_c = ev.detail) === null || _c === void 0 ? void 0 : _c.media_content_id)
                    this.player.src = ev.detail.media_content_id;
                this.player.play();
                this._show_video_player();
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
            this.addEventListener("command-player-seek", (ev) => {
                this.player.currentTime = ev.detail.position;
                setTimeout(() => this._player_update(), 10);
            });
            this.addEventListener("command-player-turn-off", (ev) => {
                if (this.player === this._video_player &&
                    this._video_player.isConnected)
                    this.closePopup();
                else if (this.player.src)
                    this.player.pause();
                this.player.src = "";
                this._player_update();
            });
            this.connectionPromise.then(() => this._player_update());
        }
        _show_video_player() {
            if (this.player === this._video_player && this.player.src) {
                selectTree(document, "home-assistant $ dialog-media-player-browse").then((el) => el === null || el === void 0 ? void 0 : el.closeDialog());
                this.showPopup(undefined, this._video_player, {
                    dismiss_action: () => this._video_player.pause(),
                    size: "wide",
                });
            }
            else if (this.player !== this._video_player &&
                this._video_player.isConnected) {
                this.closePopup();
            }
        }
        _player_update_throttled() {
            this._player_update();
        }
        _player_update() {
            const state = this._player_enabled
                ? !this.player.src || this.player.src === window.location.href
                    ? "off"
                    : this.player.ended
                        ? "stopped"
                        : this.player.paused
                            ? "paused"
                            : "playing"
                : "unavailable";
            this.sendUpdate({
                player: {
                    volume: this.player.volume,
                    muted: this.player.muted,
                    src: this.player.src,
                    state,
                    media_duration: this.player.duration,
                    media_position: this.player.currentTime,
                },
            });
        }
    }
    __decorate([
        throttle(3000)
    ], MediaPlayerMixinClass.prototype, "_player_update_throttled", null);
    return MediaPlayerMixinClass;
};

const CameraMixin = (SuperClass) => {
    return class CameraMixinClass extends SuperClass {
        // TODO: Enable WebRTC?
        // https://levelup.gitconnected.com/establishing-the-webrtc-connection-videochat-with-javascript-step-3-48d4ae0e9ea4
        constructor() {
            super();
            this._framerate = 2;
            this.cameraError = false;
            this._setup_camera();
        }
        async _setup_camera() {
            if (this._video)
                return;
            await this.connectionPromise;
            await this.firstInteraction;
            if (!this.cameraEnabled)
                return;
            if (this.fully)
                return this.update_camera();
            const div = document.createElement("div");
            document.body.append(div);
            div.classList.add("browser-mod-camera");
            div.attachShadow({ mode: "open" });
            const styleEl = document.createElement("style");
            div.shadowRoot.append(styleEl);
            styleEl.innerHTML = `
      :host {
        display: none;
      }`;
            const video = (this._video = document.createElement("video"));
            div.shadowRoot.append(video);
            video.autoplay = true;
            video.playsInline = true;
            video.style.display = "none";
            const canvas = (this._canvas = document.createElement("canvas"));
            div.shadowRoot.append(canvas);
            canvas.style.display = "none";
            if (!navigator.mediaDevices)
                return;
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });
                video.srcObject = stream;
                video.play();
                this.update_camera();
            }
            catch (e) {
                if (e.name !== "NotAllowedError")
                    throw e;
                else {
                    this.cameraError = true;
                    this.fireEvent("browser-mod-config-update");
                }
            }
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
            if (this.fully) {
                this.sendUpdate({
                    camera: this.fully_camera,
                });
            }
            else {
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
            }
            const interval = Math.round(1000 / this._framerate);
            setTimeout(() => this.update_camera(), interval);
        }
    };
};

const RequireInteractMixin = (SuperClass) => {
    return class RequireInteractMixinClass extends SuperClass {
        constructor() {
            super();
            this.firstInteraction = new Promise((resolve) => {
                this._interactionResolve = resolve;
            });
            this.show_indicator();
        }
        async show_indicator() {
            await this.connectionPromise;
            if (!this.registered)
                return;
            const interactSymbol = document.createElement("div");
            document.body.append(interactSymbol);
            interactSymbol.classList.add("browser-mod-require-interaction");
            interactSymbol.attachShadow({ mode: "open" });
            const styleEl = document.createElement("style");
            interactSymbol.shadowRoot.append(styleEl);
            styleEl.innerHTML = `
      :host {
        position: fixed;
        right: 8px;
        bottom: 8px;
        color: var(--warning-color, red);
        opacity: 0.5;
        --mdc-icon-size: 48px;
      }
      ha-icon::before {
        content: "Browser\\00a0Mod";
        font-size: 0.75rem;
        position: absolute;
        right: 0;
        bottom: 90%;
      }
      video {
        display: none;
      }
      `;
            const icon = document.createElement("ha-icon");
            interactSymbol.shadowRoot.append(icon);
            icon.icon = "mdi:gesture-tap";
            // If we are allowed to play a video, we can assume no interaction is needed
            const video = (this._video = document.createElement("video"));
            interactSymbol.shadowRoot.append(video);
            const vPlay = video.play();
            if (vPlay) {
                vPlay
                    .then(() => {
                    this._interactionResolve();
                    video.pause();
                })
                    .catch((e) => {
                    // if (e.name === "AbortError") {
                    // this._interactionResolve();
                    // }
                });
                video.pause();
            }
            window.addEventListener("pointerdown", () => {
                this._interactionResolve();
            }, { once: true });
            window.addEventListener("touchstart", () => {
                this._interactionResolve();
            }, { once: true });
            if (this.fully)
                this._interactionResolve();
            await this.firstInteraction;
            interactSymbol.remove();
        }
    };
};

const FullyMixin = (C) => {
    return class FullyMixinClass extends C {
        constructor() {
            super();
            this._fully_screensaver = false;
            if (!this.fully)
                return;
            for (const ev of [
                "screenOn",
                "screenOff",
                "pluggedAC",
                "pluggedUSB",
                "onBatteryLevelChanged",
                "unplugged",
                "networkReconnect",
                "onMotion",
                "onDaydreamStart",
                "onDaydreamStop",
            ]) {
                window.fully.bind(ev, `window.browser_mod.fullyEvent("${ev}");`);
            }
            window.fully.bind("onScreensaverStart", `window.browser_mod._fully_screensaver = true; window.browser_mod.fullyEvent();`);
            window.fully.bind("onScreensaverStop", `window.browser_mod._fully_screensaver = false; window.browser_mod.fullyEvent();`);
            return;
        }
        get fully() {
            return window.fully !== undefined;
        }
        get fully_screen() {
            var _a;
            return this._fully_screensaver === false && ((_a = window.fully) === null || _a === void 0 ? void 0 : _a.getScreenOn());
        }
        set fully_screen(state) {
            var _a, _b, _c;
            if (state) {
                (_a = window.fully) === null || _a === void 0 ? void 0 : _a.turnScreenOn();
                (_b = window.fully) === null || _b === void 0 ? void 0 : _b.stopScreensaver();
            }
            else {
                (_c = window.fully) === null || _c === void 0 ? void 0 : _c.turnScreenOff();
            }
        }
        get fully_brightness() {
            var _a;
            return (_a = window.fully) === null || _a === void 0 ? void 0 : _a.getScreenBrightness();
        }
        set fully_brightness(br) {
            var _a;
            (_a = window.fully) === null || _a === void 0 ? void 0 : _a.setScreenBrightness(br);
        }
        get fully_camera() {
            var _a;
            return (_a = window.fully) === null || _a === void 0 ? void 0 : _a.getCamshotJpgBase64();
        }
        fullyEvent(event = undefined) {
            this.fireEvent("fully-update", { event });
        }
    };
};

const BrowserStateMixin = (SuperClass) => {
    return class BrowserStateMixinClass extends SuperClass {
        constructor() {
            super();
            document.addEventListener("visibilitychange", () => this._browser_state_update());
            window.addEventListener("location-changed", () => this._browser_state_update());
            this.addEventListener("fully-update", () => this._browser_state_update());
            this.connectionPromise.then(() => this._browser_state_update());
        }
        _browser_state_update() {
            const update = async () => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                const battery = (_b = (_a = navigator).getBattery) === null || _b === void 0 ? void 0 : _b.call(_a);
                this.sendUpdate({
                    browser: {
                        path: window.location.pathname,
                        visibility: document.visibilityState,
                        userAgent: navigator.userAgent,
                        currentUser: (_d = (_c = this.hass) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.name,
                        fullyKiosk: this.fully || false,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        battery_level: (_f = (_e = window.fully) === null || _e === void 0 ? void 0 : _e.getBatteryLevel()) !== null && _f !== void 0 ? _f : (battery === null || battery === void 0 ? void 0 : battery.level) * 100,
                        charging: (_h = (_g = window.fully) === null || _g === void 0 ? void 0 : _g.isPlugged()) !== null && _h !== void 0 ? _h : battery === null || battery === void 0 ? void 0 : battery.charging,
                        darkMode: (_k = (_j = this.hass) === null || _j === void 0 ? void 0 : _j.themes) === null || _k === void 0 ? void 0 : _k.darkMode,
                        userData: (_l = this.hass) === null || _l === void 0 ? void 0 : _l.user,
                        ip_address: (_m = window.fully) === null || _m === void 0 ? void 0 : _m.getIp4Address(),
                    },
                });
            };
            update();
        }
        async browser_navigate(path) {
            if (!path)
                return;
            history.pushState(null, "", path);
            window.dispatchEvent(new CustomEvent("location-changed"));
        }
    };
};

const ServicesMixin = (SuperClass) => {
    return class ServicesMixinClass extends SuperClass {
        constructor() {
            super();
            const cmds = [
                "sequence",
                "delay",
                "popup",
                "more_info",
                "close_popup",
                "notification",
                "navigate",
                "refresh",
                "set_theme",
                "console",
                "javascript",
            ];
            for (const service of cmds) {
                this.addEventListener(`command-${service}`, (ev) => {
                    this.service(service, ev.detail);
                });
            }
            document.body.addEventListener("ll-custom", (ev) => {
                if (ev.detail.browser_mod) {
                    this._service_action(ev.detail.browser_mod);
                }
            });
        }
        async service(service, data) {
            this._service_action({ service, data });
        }
        async _service_action({ service, data }) {
            if (!service) {
                console.error("Browser Mod: Service parameter not specified in service call.");
                return;
            }
            let _service = service;
            if ((!_service.startsWith("browser_mod.") && _service.includes(".")) ||
                data.browser_id !== undefined) {
                const d = Object.assign({}, data);
                if (d.browser_id === "THIS")
                    d.browser_id = this.browserID;
                // CALL HOME ASSISTANT SERVICE
                const [domain, srv] = _service.split(".");
                return this.hass.callService(domain, srv, d);
            }
            if (_service.startsWith("browser_mod.")) {
                _service = _service.substring(12);
            }
            switch (_service) {
                case "sequence":
                    for (const a of data.sequence)
                        await this._service_action(a);
                    break;
                case "delay":
                    await new Promise((resolve) => setTimeout(resolve, data.time));
                    break;
                case "more_info":
                    const { entity, large, ignore_popup_card } = data;
                    this.showMoreInfo(entity, large, ignore_popup_card);
                    break;
                case "popup":
                    const { title, content } = data, d = __rest(data, ["title", "content"]);
                    for (const [k, v] of Object.entries(d)) {
                        if (k.endsWith("_action")) {
                            d[k] = (ext_data) => {
                                const { service, data } = v;
                                this._service_action({
                                    service,
                                    data: Object.assign(Object.assign({}, data), ext_data),
                                });
                            };
                        }
                    }
                    this.showPopup(title, content, d);
                    break;
                case "notification":
                    {
                        const { message, action_text, action, duration, dismissable } = data;
                        let act = undefined;
                        if (action && action_text) {
                            act = {
                                text: action_text,
                                action: (ext_data) => {
                                    const { service, data } = action;
                                    this._service_action({
                                        service,
                                        data: Object.assign(Object.assign({}, data), ext_data),
                                    });
                                },
                            };
                        }
                        const base = await hass_base_el();
                        base.dispatchEvent(new CustomEvent("hass-notification", {
                            detail: {
                                message,
                                action: act,
                                duration,
                                dismissable,
                            },
                        }));
                    }
                    break;
                case "close_popup":
                    this.closePopup();
                    break;
                case "navigate":
                    this.browser_navigate(data.path);
                    break;
                case "refresh":
                    window.location.href = window.location.href;
                    break;
                case "set_theme":
                    {
                        const detail = Object.assign({}, data);
                        if (detail.theme === "auto")
                            detail.theme = undefined;
                        if (detail.dark === "auto")
                            detail.dark = undefined;
                        if (detail.dark === "light")
                            detail.dark = false;
                        if (detail.dark === "dark")
                            detail.dark = true;
                        if (detail.primaryColor && Array.isArray(detail.primaryColor)) {
                            const [r, g, b] = detail.primaryColor;
                            detail.primaryColor =
                                "#" +
                                    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                        }
                        if (detail.accentColor && Array.isArray(detail.accentColor)) {
                            const [r, g, b] = detail.accentColor;
                            detail.accentColor =
                                "#" +
                                    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                        }
                        const base = await hass_base_el();
                        base.dispatchEvent(new CustomEvent("settheme", { detail }));
                    }
                    break;
                case "console":
                    if (Object.keys(data).length > 1 ||
                        (data && data.message === undefined))
                        console.dir(data);
                    else
                        console.log(data.message);
                    break;
                case "javascript":
                    // Reload Lovelace function
                    const lovelace_reload = async () => {
                        let root = await selectTree(document, "home-assistant$home-assistant-main$ha-panel-lovelace$hui-root");
                        if (!root)
                            root = await selectTree(document, "hc-main $ hc-lovelace $ hui-view");
                        if (!root)
                            root = await selectTree(document, "hc-main $ hc-lovelace $ hui-panel-view");
                        if (root)
                            root.dispatchEvent(new CustomEvent("config-refresh"));
                    };
                    const log = async (message) => this.connection.sendMessage({ type: "browser_mod/log", message });
                    const code = `
          "use strict";
          ${data.code}
          `;
                    const fn = new Function("hass", "data", "service", "log", "lovelace_reload", code);
                    fn(this.hass, data, window.browser_mod.service, log, lovelace_reload);
                    break;
            }
        }
    };
};

const ActivityMixin = (SuperClass) => {
    return class ActivityMixinClass extends SuperClass {
        constructor() {
            super();
            this.activityTriggered = false;
            this._activityCooldown = 15000;
            for (const ev of ["pointerdown", "pointermove", "keydown"]) {
                window.addEventListener(ev, () => this.activityTrigger(true));
            }
            this.addEventListener("fully-update", () => {
                this.activityTrigger();
            });
        }
        activityTrigger(touched = false) {
            if (!this.activityTriggered) {
                this.sendUpdate({
                    activity: true,
                });
            }
            this.activityTriggered = true;
            if (touched) {
                this.fireEvent("browser-mod-activity");
            }
            clearTimeout(this._activityTimeout);
            this._activityTimeout = setTimeout(() => this.activityReset(), this._activityCooldown);
        }
        activityReset() {
            clearTimeout(this._activityTimeout);
            if (this.activityTriggered) {
                this.sendUpdate({
                    activity: false,
                });
            }
            this.activityTriggered = false;
        }
    };
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(i){if(super(i),this.it=w,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===w||null==r)return this._t=void 0,this.it=r;if(r===b)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

class BrowserModPopup extends s {
    async closeDialog() {
        var _a, _b, _c;
        this.open = false;
        this.card = undefined;
        clearInterval(this._timeoutTimer);
        if (this._autocloseListener) {
            window.browser_mod.removeEventListener("browser-mod-activity", this._autocloseListener);
            this._autocloseListener = undefined;
        }
        (_b = (_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action) === null || _b === void 0 ? void 0 : _b.call(_a);
        if ((_c = this._cardMod) === null || _c === void 0 ? void 0 : _c[0]) {
            this._cardMod[0].styles = "";
        }
    }
    openDialog() {
        var _a;
        this.open = true;
        (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.show();
        if (this.timeout) {
            this._timeoutStart = new Date().getTime();
            this._timeoutTimer = setInterval(() => {
                const ellapsed = new Date().getTime() - this._timeoutStart;
                const progress = (ellapsed / this.timeout) * 100;
                this.style.setProperty("--progress", `${progress}%`);
                if (ellapsed >= this.timeout) {
                    clearInterval(this._timeoutTimer);
                    this._timeout();
                }
            }, 10);
        }
        this._autocloseListener = undefined;
        if (this._autoclose) {
            this._autocloseListener = () => this.dialog.close();
            window.browser_mod.addEventListener("browser-mod-activity", this._autocloseListener, { once: true });
        }
        customElements.whenDefined("card-mod").then(() => {
            var _a, _b, _c, _d;
            (_b = (_a = customElements.get("card-mod")) === null || _a === void 0 ? void 0 : _a.applyToElement) === null || _b === void 0 ? void 0 : _b.call(_a, this, "more-info", (_d = (_c = this.card_mod) === null || _c === void 0 ? void 0 : _c.style) !== null && _d !== void 0 ? _d : "");
        });
        this.updateComplete.then(() => {
            if (this.card) {
                selectTree(this.content, "$").then((el) => {
                    if (!el)
                        return;
                    const styleEl = document.createElement("style");
                    styleEl.classList.add("browser-mod-style");
                    styleEl.innerHTML = `
          ha-card {
            box-shadow: none !important;
          }`;
                    el.appendChild(styleEl);
                });
            }
        });
    }
    async _build_card(config) {
        const helpers = await window.loadCardHelpers();
        const card = await helpers.createCardElement(config);
        card.hass = window.browser_mod.hass;
        provideHass(card);
        this.content = card;
        if (!customElements.get(card.localName)) {
            customElements.whenDefined(card.localName).then(() => {
                this._build_card(config);
            });
        }
        card.addEventListener("ll-rebuild", () => {
            this._build_card(config);
        });
    }
    async setupDialog(title, content, { right_button = undefined, right_button_action = undefined, left_button = undefined, left_button_action = undefined, dismissable = true, dismiss_action = undefined, timeout = undefined, timeout_action = undefined, size = undefined, style = undefined, autoclose = false, card_mod = undefined, } = {}) {
        this._formdata = undefined;
        this.title = title;
        this.card = undefined;
        this.card_mod = card_mod;
        if (content && content instanceof HTMLElement) {
            // HTML Element content
            this.content = content;
        }
        else if (content && Array.isArray(content)) {
            // Form content
            loadHaForm();
            const form = document.createElement("ha-form");
            form.schema = content;
            form.computeLabel = (s) => { var _a; return (_a = s.label) !== null && _a !== void 0 ? _a : s.name; };
            form.hass = window.browser_mod.hass;
            this._formdata = {};
            for (const i of content) {
                if (i.name && i.default !== undefined) {
                    this._formdata[i.name] = i.default;
                }
            }
            form.data = this._formdata;
            provideHass(form);
            form.addEventListener("value-changed", (ev) => {
                this._formdata = Object.assign({}, ev.detail.value);
                form.data = this._formdata;
            });
            form.addEventListener("closing", (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
            });
            const haCard = document.createElement("ha-card");
            haCard.append(form);
            this.content = haCard;
        }
        else if (content && typeof content === "object") {
            // Card content
            this.card = true;
            await this._build_card(content);
        }
        else {
            // Basic HTML content
            this.content = o(content);
        }
        this.right_button = right_button;
        this.left_button = left_button;
        this.actions = right_button === undefined ? undefined : "";
        this.dismissable = dismissable;
        this.timeout = timeout;
        this._actions = {
            right_button_action,
            left_button_action,
            dismiss_action,
            timeout_action,
        };
        this.wide = size === "wide" ? "" : undefined;
        this.fullscreen = size === "fullscreen" ? "" : undefined;
        this._style = style;
        this._autoclose = autoclose;
    }
    async do_close() {
        var _a, _b, _c;
        const action = (_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action;
        if ((_b = this._actions) === null || _b === void 0 ? void 0 : _b.dismiss_action)
            this._actions.dismiss_action = undefined;
        await ((_c = this.dialog) === null || _c === void 0 ? void 0 : _c.close());
        action === null || action === void 0 ? void 0 : action(this._formdata);
    }
    async _primary() {
        var _a, _b, _c;
        if ((_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action)
            this._actions.dismiss_action = undefined;
        await this.do_close();
        (_c = (_b = this._actions) === null || _b === void 0 ? void 0 : _b.right_button_action) === null || _c === void 0 ? void 0 : _c.call(_b, this._formdata);
    }
    async _secondary() {
        var _a, _b, _c;
        if ((_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action)
            this._actions.dismiss_action = undefined;
        await this.do_close();
        (_c = (_b = this._actions) === null || _b === void 0 ? void 0 : _b.left_button_action) === null || _c === void 0 ? void 0 : _c.call(_b, this._formdata);
    }
    async _timeout() {
        var _a, _b, _c;
        if ((_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action)
            this._actions.dismiss_action = undefined;
        await this.do_close();
        (_c = (_b = this._actions) === null || _b === void 0 ? void 0 : _b.timeout_action) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    render() {
        if (!this.open)
            return $ ``;
        return $ `
      <ha-dialog
        open
        @closed=${this.closeDialog}
        .heading=${this.title !== undefined}
        ?hideActions=${this.actions === undefined}
        .scrimClickAction=${this.dismissable ? "close" : ""}
        .escapeKeyAction=${this.dismissable ? "close" : ""}
      >
        ${this.timeout
            ? $ ` <div slot="heading" class="progress"></div> `
            : ""}
        ${this.title
            ? $ `
              <div slot="heading" class="heading">
                <ha-header-bar>
                  ${this.dismissable
                ? $ `
                        <ha-icon-button
                          dialogAction="cancel"
                          slot="navigationIcon"
                        >
                          <ha-icon .icon=${"mdi:close"}></ha-icon>
                        </ha-icon-button>
                      `
                : ""}
                  <div slot="title" class="main-title">${this.title}</div>
                </ha-header-bar>
              </div>
            `
            : $ ``}

        <div class="content" tabindex="-1" dialogInitialFocus>
          ${this.content}
        </div>

        ${this.right_button !== undefined
            ? $ `
              <mwc-button
                slot="primaryAction"
                .label=${this.right_button}
                @click=${this._primary}
                class="action-button"
              ></mwc-button>
            `
            : ""}
        ${this.left_button !== undefined
            ? $ `
              <mwc-button
                slot="secondaryAction"
                .label=${this.left_button}
                @click=${this._secondary}
                class="action-button"
              ></mwc-button>
            `
            : ""}
        <style>
          :host {
            ${this._style}
          }
        </style>
      </ha-dialog>
    `;
    }
    static get styles() {
        return r$2 `
      /* Classes from haStyleDialog */
      ha-dialog {
        --mdc-dialog-min-width: var(--popup-min-width, 400px);
        --mdc-dialog-max-width: var(--popup-max-width, 600px);
        --mdc-dialog-heading-ink-color: var(--primary-text-color);
        --mdc-dialog-content-ink-color: var(--primary-text-color);
        --justify-action-buttons: space-between;
      }

      ha-dialog .form {
        color: var(--primary-text-color);
      }

      a {
        color: var(--primary-color);
      }

      ha-dialog {
        --dialog-surface-position: static;
        --dialog-content-position: static;
        --vertial-align-dialog: flex-start;

        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
        --padding-x: var(--popup-padding-x, 24px);
        --padding-y: var(--popup-padding-y, 20px);

        --dialog-box-shadow: 0px 0px 0px
          var(--popup-border-width, var(--ha-card-border-width, 2px))
          var(
            --popup-border-color,
            var(--ha-card-border-color, var(--divider-color, #e0e0e0))
          );
        --mdc-theme-surface: var(
          --popup-background-color,
          var(--ha-card-background, var(--card-background-color, white))
        );
      }

      .progress::before {
        content: "";
        position: absolute;
        left: 0;
        width: calc(100% - var(--progress, 60%));
        top: 0;
        height: 2px;
        background: var(--primary-color);
        z-index: 10;
      }

      ha-header-bar {
        --mdc-theme-on-primary: var(--primary-text-color);
        --mdc-theme-primary: var(--mdc-theme-surface);
        flex-shrink: 0;
        display: block;
      }

      ha-icon-button > * {
        display: flex;
      }

      .main-title {
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: default;
      }
      .content {
        outline: none;
        margin: -20px -24px;
        padding: var(--padding-y) var(--padding-x);
        --header-height: 64px;
        --footer-height: 0px;
      }
      .content:first-child {
        --header-height: 0px;
      }

      :host([card]) .content {
        --padding-x: var(--popup-padding-x, 8px);
        --padding-y: var(--popup-padding-y, 8px);
      }
      :host([actions]) .content {
        --footer-height: 54px;
      }

      .action-button {
        margin-bottom: -24px;
      }

      :host([wide]) ha-dialog {
        --mdc-dialog-max-width: 90vw;
      }
      :host([wide]) .content {
        width: calc(90vw - 2 * var(--padding-x));
      }

      :host([fullscreen]) ha-dialog {
        --mdc-dialog-min-width: 100vw;
        --mdc-dialog-max-width: 100vw;
        --mdc-dialog-min-height: 100%;
        --mdc-dialog-max-height: 100%;
        --mdc-shape-medium: 0px;
        --vertial-align-dialog: flex-end;
        --ha-dialog-border-radius: 0px;
      }
      :host([fullscreen]) .content {
        height: calc(
          100vh - var(--header-height) - var(--footer-height) - 2 *
            var(--padding-y) - 16px
        );
      }

      @media all and (max-width: 450px), all and (max-height: 500px) {
        ha-dialog {
          --mdc-dialog-min-width: 97vw;
          --mdc-dialog-max-width: 97vw;
          --mdc-shape-medium: 0px;
        }
        :host([wide]) .content {
          width: 100vw;
        }
      }

      @media all and (min-width: 600px) and (min-height: 501px) {
        ha-dialog {
          --dialog-surface-margin-top: 40px;
        }
      }
    `;
    }
}
__decorate([
    e$2()
], BrowserModPopup.prototype, "open", void 0);
__decorate([
    e$2()
], BrowserModPopup.prototype, "content", void 0);
__decorate([
    e$2()
], BrowserModPopup.prototype, "title", void 0);
__decorate([
    e$2({ reflect: true })
], BrowserModPopup.prototype, "actions", void 0);
__decorate([
    e$2({ reflect: true })
], BrowserModPopup.prototype, "card", void 0);
__decorate([
    e$2()
], BrowserModPopup.prototype, "right_button", void 0);
__decorate([
    e$2()
], BrowserModPopup.prototype, "left_button", void 0);
__decorate([
    e$2()
], BrowserModPopup.prototype, "dismissable", void 0);
__decorate([
    e$2({ reflect: true })
], BrowserModPopup.prototype, "wide", void 0);
__decorate([
    e$2({ reflect: true })
], BrowserModPopup.prototype, "fullscreen", void 0);
__decorate([
    e$2()
], BrowserModPopup.prototype, "_style", void 0);
__decorate([
    i$1("ha-dialog")
], BrowserModPopup.prototype, "dialog", void 0);
if (!customElements.get("browser-mod-popup"))
    customElements.define("browser-mod-popup", BrowserModPopup);
const PopupMixin = (SuperClass) => {
    return class PopupMixinClass extends SuperClass {
        constructor() {
            super();
            loadLoadCardHelpers();
            this._popupEl = document.createElement("browser-mod-popup");
            document.body.append(this._popupEl);
            this._popupEl.addEventListener("hass-more-info", async (ev) => {
                ev.stopPropagation();
                const base = await hass_base_el();
                this._popupEl.do_close();
                // this._popupEl.style.display = "none";
                base.dispatchEvent(ev);
            });
            const historyListener = async (ev) => {
                var _a, _b, _c;
                const popupState = (_a = ev.state) === null || _a === void 0 ? void 0 : _a.browserModPopup;
                if (popupState) {
                    if (!popupState.open) {
                        if (((_b = this._popupEl) === null || _b === void 0 ? void 0 : _b.open) && ((_c = this._popupEl) === null || _c === void 0 ? void 0 : _c.dismissable))
                            this._popupEl.do_close();
                    }
                }
            };
            window.addEventListener("popstate", historyListener);
        }
        showPopup(...args) {
            (async () => {
                var _a;
                if (this._popupEl.open)
                    await this._popupEl.do_close();
                if (((_a = history.state) === null || _a === void 0 ? void 0 : _a.browserModPopup) === undefined) {
                    history.replaceState({
                        browserModPopup: {
                            open: false,
                        },
                    }, "");
                }
                history.pushState({
                    browserModPopup: {
                        open: true,
                    },
                }, "");
                await this._popupEl.setupDialog(...args);
                this._popupEl.openDialog();
            })();
        }
        closePopup(...args) {
            this._popupEl.closeDialog();
            this.showMoreInfo("");
        }
        async showMoreInfo(entityId, large = false, ignore_popup_card = undefined) {
            const base = await hass_base_el();
            base.dispatchEvent(new CustomEvent("hass-more-info", {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: { entityId, ignore_popup_card },
            }));
            if (large) {
                await new Promise((resolve) => setTimeout(resolve, 50));
                const dialog = base.shadowRoot.querySelector("ha-more-info-dialog");
                if (dialog)
                    dialog.large = true;
            }
        }
    };
};
/*
service: browser_mod.popup
data:
  title: closer
  content:
    - selector:
        select:
          options:
            - a
            - b
            - c
            - d
            - e
            - f
            - g
            - h
            */
/*
ha-select $ mwc-menu $ mwc-menu-surface $: |
  div.mdc - menu - surface {
    position: fixed;
  }

*/

var name = "browser_mod";
var version = "2.1.3";
var description = "";
var scripts = {
	build: "rollup -c",
	watch: "rollup -c --watch"
};
var keywords = [
];
var author = "Thomas Lovén";
var license = "MIT";
var devDependencies = {
	"@babel/core": "^7.18.9",
	"@rollup/plugin-babel": "^5.3.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.3.0",
	lit: "^2.2.8",
	rollup: "^2.77.2",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.32.1",
	typescript: "^4.7.4"
};
var dependencies = {
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

const configSchema = [
    {
        name: "entity",
        label: "Entity",
        selector: { entity: {} },
    },
    {
        name: "title",
        label: "Title",
        selector: { text: {} },
    },
    {
        name: "size",
        selector: {
            select: { mode: "dropdown", options: ["normal", "wide", "fullscreen"] },
        },
    },
    {
        type: "grid",
        schema: [
            {
                name: "right_button",
                label: "Right button",
                selector: { text: {} },
            },
            {
                name: "left_button",
                label: "Left button",
                selector: { text: {} },
            },
        ],
    },
    {
        type: "grid",
        schema: [
            {
                name: "right_button_action",
                label: "Right button action",
                selector: { object: {} },
            },
            {
                name: "left_button_action",
                label: "Left button action",
                selector: { object: {} },
            },
        ],
    },
    {
        type: "grid",
        schema: [
            {
                name: "dismissable",
                label: "User dismissable",
                selector: { boolean: {} },
            },
            {
                name: "timeout",
                label: "Auto close timeout (ms)",
                selector: { number: { mode: "box" } },
            },
        ],
    },
    {
        type: "grid",
        schema: [
            {
                name: "dismiss_action",
                label: "Dismiss action",
                selector: { object: {} },
            },
            {
                name: "timeout_action",
                label: "Timeout action",
                selector: { object: {} },
            },
        ],
    },
    {
        name: "style",
        label: "CSS style",
        selector: { text: { multiline: true } },
    },
];
class PopupCardEditor extends s {
    constructor() {
        super(...arguments);
        this._selectedTab = 0;
        this._cardGUIMode = true;
        this._cardGUIModeAvailable = true;
    }
    setConfig(config) {
        this._config = config;
    }
    connectedCallback() {
        super.connectedCallback();
        loadHaForm();
    }
    _handleSwitchTab(ev) {
        this._selectedTab = parseInt(ev.detail.index, 10);
    }
    _configChanged(ev) {
        ev.stopPropagation();
        if (!this._config)
            return;
        this._config = Object.assign({}, ev.detail.value);
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _cardConfigChanged(ev) {
        ev.stopPropagation();
        if (!this._config)
            return;
        const card = Object.assign({}, ev.detail.config);
        this._config = Object.assign(Object.assign({}, this._config), { card });
        this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _toggleCardMode(ev) {
        var _a;
        (_a = this._cardEditorEl) === null || _a === void 0 ? void 0 : _a.toggleMode();
    }
    _deleteCard(ev) {
        if (!this._config)
            return;
        this._config = Object.assign({}, this._config);
        delete this._config.card;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _cardGUIModeChanged(ev) {
        ev.stopPropagation();
        this._cardGUIMode = ev.detail.guiMode;
        this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
    }
    render() {
        if (!this.hass || !this._config) {
            return $ ``;
        }
        return $ `
      <div class="card-config">
        <div class="toolbar">
          <mwc-tab-bar
            .activeIndex=${this._selectedTab}
            @MDCTabBar:activated=${this._handleSwitchTab}
          >
            <mwc-tab .label=${"Settings"}></mwc-tab>
            <mwc-tab .label=${"Card"}></mwc-tab>
          </mwc-tab-bar>
        </div>
        <div id="editor">
          ${[this._renderSettingsEditor, this._renderCardEditor][this._selectedTab].bind(this)()}
        </div>
      </div>
    `;
    }
    _renderSettingsEditor() {
        return $ `<div class="box">
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${configSchema}
        .computeLabel=${(s) => { var _a; return (_a = s.label) !== null && _a !== void 0 ? _a : s.name; }}
        @value-changed=${this._configChanged}
      ></ha-form>
    </div>`;
    }
    _renderCardEditor() {
        return $ `
      <div class="box cards">
        ${this._config.card
            ? $ `
              <div class="toolbar">
                <mwc-button
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${!this._cardEditorEl || this._cardGUIMode
                ? "Show code editor"
                : "Show visual editor"}
                </mwc-button>
                <mwc-button
                  .title=${"Change card type"}
                  @click=${this._deleteCard}
                >
                  Change card type
                </mwc-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${this._config.card}
                @config-changed=${this._cardConfigChanged}
                @GUImode-changed=${this._cardGUIModeChanged}
              ></hui-card-element-editor>
            `
            : $ `
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardConfigChanged}
              ></hui-card-picker>
            `}
      </div>
    `;
    }
    static get styles() {
        return r$2 `
      mwc-tab-bar {
        border-bottom: 1px solid var(--divider-color);
      }
      .box {
        margin-top: 8px;
        border: 1px solid var(--divider-color);
        padding: 12px;
      }
      .box .toolbar {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        gap: 8px;
      }
      .gui-mode-button {
        margin-right: auto;
      }
    `;
    }
}
__decorate([
    t$1()
], PopupCardEditor.prototype, "_config", void 0);
__decorate([
    e$2()
], PopupCardEditor.prototype, "lovelace", void 0);
__decorate([
    e$2()
], PopupCardEditor.prototype, "hass", void 0);
__decorate([
    t$1()
], PopupCardEditor.prototype, "_selectedTab", void 0);
__decorate([
    t$1()
], PopupCardEditor.prototype, "_cardGUIMode", void 0);
__decorate([
    t$1()
], PopupCardEditor.prototype, "_cardGUIModeAvailable", void 0);
__decorate([
    i$1("hui-card-element-editor")
], PopupCardEditor.prototype, "_cardEditorEl", void 0);
(async () => {
    while (!window.browser_mod) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await window.browser_mod.connectionPromise;
    if (!customElements.get("popup-card-editor")) {
        customElements.define("popup-card-editor", PopupCardEditor);
        window.customCards = window.customCards || [];
        window.customCards.push({
            type: "popup-card",
            name: "Popup card",
            preview: false,
            description: "Replace the more-info dialog for a given entity in the view that includes this card. (Browser Mod)",
        });
    }
})();

class PopupCard extends s {
    constructor() {
        super();
        this.popup = this.popup.bind(this);
    }
    static getConfigElement() {
        return document.createElement("popup-card-editor");
    }
    static getStubConfig(hass, entities) {
        const entity = entities[0];
        return {
            entity,
            title: "Custom popup",
            dismissable: true,
            card: { type: "markdown", content: "This replaces the more-info dialog" },
        };
    }
    setConfig(config) {
        this._config = config;
        (async () => {
            const ch = await window.loadCardHelpers();
            this._element = await ch.createCardElement(config.card);
            this._element.hass = this.hass;
        })();
    }
    async connectedCallback() {
        super.connectedCallback();
        window.addEventListener("hass-more-info", this.popup);
        if (this.parentElement.localName === "hui-card-preview") {
            this.editMode = true;
            this.removeAttribute("hidden");
        }
        else {
            this.setAttribute("hidden", "");
        }
    }
    async disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("hass-more-info", this.popup);
    }
    popup(ev) {
        var _a, _b, _c;
        if (((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.entityId) === this._config.entity &&
            !((_b = ev.detail) === null || _b === void 0 ? void 0 : _b.ignore_popup_card)) {
            ev.stopPropagation();
            ev.preventDefault();
            const config = Object.assign({}, this._config);
            delete config.card;
            (_c = window.browser_mod) === null || _c === void 0 ? void 0 : _c.service("popup", Object.assign({ content: this._config.card }, this._config));
            setTimeout(() => this.dispatchEvent(new CustomEvent("hass-more-info", {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: { entityId: "" },
            })), 10);
        }
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has("hass")) {
            if (this._element)
                this._element.hass = this.hass;
        }
    }
    getCardSize() {
        return 0;
    }
    render() {
        if (!this.editMode)
            return $ ``;
        return $ ` <ha-card>
      <div class="app-toolbar">
        ${this._config.dismissable
            ? $ `
              <ha-icon-button>
                <ha-icon .icon=${"mdi:close"}></ha-icon>
              </ha-icon-button>
            `
            : ""}
        <div class="main-title">${this._config.title}</div>
      </div>
      ${this._element}
      <style>
        :host {
        ${this._config.style}
        }
      </style>
      ${this._config.right_button !== undefined ||
            this._config.left_button !== undefined
            ? $ `
            <footer class="mdc-dialog__actions">
              <span>
                ${this._config.left_button !== undefined
                ? $ `
                      <mwc-button
                        .label=${this._config.left_button}
                      ></mwc-button>
                    `
                : ""}
              </span>
              <span>
                ${this._config.right_button !== undefined
                ? $ `
                      <mwc-button
                        .label=${this._config.right_button}
                      ></mwc-button>
                    `
                : ""}
              </span>
            </footer>
          `
            : ""}
    </ha-card>`;
    }
    static get styles() {
        return r$2 `
      :host {
        display: none !important;
      }
      :host([edit-mode="true"]) {
        display: block !important;
        border: 1px solid var(--primary-color);
      }
      ha-card {
        background-color: var(
          --popup-background-color,
          var(--ha-card-background, var(--card-background-color, white))
        );
      }
      .app-toolbar {
        color: var(--primary-text-color);
        background-color: var(
          --popup-header-background-color,
          var(--popup-background-color, --sidebar-background-color)
        );
        display: var(--layout-horizontal_-_display);
        flex-direction: var(--layout-horizontal_-_flex-direction);
        align-items: var(--layout-center_-_align-items);
        height: 64px;
        padding: 0 16px;
        font-size: var(--app-toolbar-font-size, 20px);
      }
      ha-icon-button > * {
        display: flex;
      }
      .main-title {
        margin-left: 16px;
        line-height: 1.3em;
        max-height: 2.6em;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mdc-dialog__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 52px;
        margin: 0px;
        padding: 8px;
        border-top: 1px solid transparent;
      }
    `;
    }
}
__decorate([
    e$2()
], PopupCard.prototype, "hass", void 0);
__decorate([
    t$1()
], PopupCard.prototype, "_config", void 0);
__decorate([
    e$2({ attribute: "edit-mode", reflect: true })
], PopupCard.prototype, "editMode", void 0);
__decorate([
    t$1()
], PopupCard.prototype, "_element", void 0);
(async () => {
    while (!window.browser_mod) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await window.browser_mod.connectionPromise;
    if (!customElements.get("popup-card"))
        customElements.define("popup-card", PopupCard);
})();

const AutoSettingsMixin = (SuperClass) => {
    class AutoSettingsMixinClass extends SuperClass {
        constructor() {
            super();
            this.__currentTitle = undefined;
            const runUpdates = async () => {
                this.runUpdateTitle();
                this.runHideHeader();
            };
            this._auto_settings_setup();
            this.addEventListener("browser-mod-config-update", () => {
                this._auto_settings_setup();
                runUpdates();
            });
            window.addEventListener("location-changed", runUpdates);
        }
        async runHideHeader() {
            while (!(await this._hideHeader()))
                await new Promise((r) => setTimeout(r, 500));
        }
        async runUpdateTitle() {
            await waitRepeat(() => this._updateTitle(), 3, 500);
        }
        async _auto_settings_setup() {
            await this.connectionPromise;
            const settings = this.settings;
            // Sidebar panel order and hiding
            if (settings.sidebarPanelOrder) {
                localStorage.setItem("sidebarPanelOrder", settings.sidebarPanelOrder);
            }
            if (settings.sidebarHiddenPanels) {
                localStorage.setItem("sidebarHiddenPanels", settings.sidebarHiddenPanels);
            }
            // Default panel
            if (settings.defaultPanel) {
                localStorage.setItem("defaultPanel", `"${settings.defaultPanel}"`);
            }
            // Hide sidebar
            if (settings.hideSidebar === true) {
                selectTree(document.body, "home-assistant$home-assistant-main$app-drawer-layout").then((el) => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.style) === null || _a === void 0 ? void 0 : _a.setProperty("--app-drawer-width", "0px"); });
                selectTree(document.body, "home-assistant$home-assistant-main$app-drawer-layout app-drawer").then((el) => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.remove) === null || _a === void 0 ? void 0 : _a.call(el); });
            }
            // Sidebar title
            if (settings.sidebarTitle) {
                (async () => {
                    if (this._sidebarTitleSubscription) {
                        this._sidebarTitleSubscription();
                    }
                    this._sidebarTitleSubscription = undefined;
                    this._sidebarTitleSubscription =
                        await this.connection.subscribeMessage(this._updateSidebarTitle, {
                            type: "render_template",
                            template: settings.sidebarTitle,
                            variables: {},
                        });
                })();
            }
            // Hide header
            // Favicon template
            if (settings.faviconTemplate !== undefined) {
                (async () => {
                    if (this._faviconTemplateSubscription) {
                        this._faviconTemplateSubscription();
                    }
                    this._faviconTemplateSubscription = undefined;
                    this._faviconTemplateSubscription =
                        await this.connection.subscribeMessage(this._updateFavicon, {
                            type: "render_template",
                            template: settings.faviconTemplate,
                            variables: {},
                        });
                })();
            }
            // Title template
            if (settings.titleTemplate !== undefined) {
                (async () => {
                    if (this._titleTemplateSubscription) {
                        this._titleTemplateSubscription();
                    }
                    this._titleTemplateSubscription = undefined;
                    this._titleTemplateSubscription =
                        await this.connection.subscribeMessage(this._updateTitle.bind(this), {
                            type: "render_template",
                            template: settings.titleTemplate,
                            variables: {},
                        });
                })();
            }
        }
        async _updateSidebarTitle({ result }) {
            let sidebar = undefined;
            let cnt = 0;
            while (!sidebar && cnt++ < 5) {
                sidebar = await selectTree(document, "home-assistant $ home-assistant-main $ app-drawer-layout app-drawer ha-sidebar $ .title");
                if (!sidebar)
                    await new Promise((r) => setTimeout(r, 500));
            }
            if (sidebar)
                sidebar.innerHTML = result;
        }
        get _currentFavicon() {
            const link = document.head.querySelector("link[rel~='icon']");
            return link === null || link === void 0 ? void 0 : link.href;
        }
        _updateFavicon({ result }) {
            const link = document.head.querySelector("link[rel~='icon']");
            link.href = result;
        }
        get _currentTitle() {
            return this.__currentTitle;
        }
        _updateTitle(data = undefined) {
            if (data)
                this.__currentTitle = data.result;
            if (this.__currentTitle)
                document.title = this.__currentTitle;
        }
        async _hideHeader() {
            var _a, _b, _c;
            if (this.settings.hideHeader !== true &&
                this.settings.hideSidebar !== true)
                return true;
            let el = await selectTree(document, "home-assistant $ home-assistant-main $ app-drawer-layout partial-panel-resolver");
            if (!el)
                return false;
            let steps = 0;
            while (el && el.localName !== "ha-app-layout" && steps++ < 5) {
                await await_element(el, true);
                const next = (_b = (_a = el.querySelector("ha-app-layout")) !== null && _a !== void 0 ? _a : el.firstElementChild) !== null && _b !== void 0 ? _b : el.shadowRoot;
                el = next;
            }
            if ((el === null || el === void 0 ? void 0 : el.localName) !== "ha-app-layout")
                return false;
            if (this.settings.hideHeader === true) {
                if (el.header) {
                    el.header.style.setProperty("display", "none");
                    setTimeout(() => el._updateLayoutStates(), 0);
                    return true;
                }
            }
            else if (this.settings.hideSidebar === true) {
                el = await selectTree(el, "ha-menu-button");
                (_c = el === null || el === void 0 ? void 0 : el.remove) === null || _c === void 0 ? void 0 : _c.call(el);
            }
            return false;
        }
        getSetting(key) {
            var _a, _b, _c, _d;
            const retval = { global: undefined, browser: {}, user: {} };
            retval.global = (_a = this._data.settings) === null || _a === void 0 ? void 0 : _a[key];
            for (const [k, v] of Object.entries((_b = this._data.browsers) !== null && _b !== void 0 ? _b : {})) {
                if (((_c = v.settings) === null || _c === void 0 ? void 0 : _c[key]) != null)
                    retval.browser[k] = v.settings[key];
            }
            for (const [k, v] of Object.entries((_d = this._data.user_settings) !== null && _d !== void 0 ? _d : {})) {
                if (v[key] != null)
                    retval.user[k] = v[key];
            }
            return retval;
        }
        setSetting(type, target, settings) {
            if (type === "global") {
                for (const [key, value] of Object.entries(settings))
                    this.connection.sendMessage({
                        type: "browser_mod/settings",
                        key,
                        value,
                    });
            }
            else if (type === "browser") {
                const browser = this._data.browsers[target];
                const newsettings = Object.assign(Object.assign({}, browser.settings), settings);
                this.connection.sendMessage({
                    type: "browser_mod/register",
                    browserID: target,
                    data: Object.assign(Object.assign({}, browser), { settings: newsettings }),
                });
            }
            else if (type === "user") {
                const user = target;
                for (const [key, value] of Object.entries(settings))
                    this.connection.sendMessage({
                        type: "browser_mod/settings",
                        user,
                        key,
                        value,
                    });
            }
        }
    }
    __decorate([
        runOnce()
    ], AutoSettingsMixinClass.prototype, "runHideHeader", null);
    __decorate([
        runOnce(true)
    ], AutoSettingsMixinClass.prototype, "runUpdateTitle", null);
    return AutoSettingsMixinClass;
};

const ID_STORAGE_KEY = "browser_mod-browser-id";
const BrowserIDMixin = (SuperClass) => {
    return class BrowserIDMixinClass extends SuperClass {
        constructor() {
            super();
            if (Storage) {
                if (!Storage.prototype.browser_mod_patched) {
                    const _clear = Storage.prototype.clear;
                    Storage.prototype.clear = function () {
                        const browserId = this.getItem(ID_STORAGE_KEY);
                        const suspendWhenHidden = this.getItem("suspendWhenHidden");
                        _clear.apply(this);
                        this.setItem(ID_STORAGE_KEY, browserId);
                        this.setItem("suspendWhenHidden", suspendWhenHidden);
                    };
                    Storage.prototype.browser_mod_patched = true;
                }
            }
        }
        async recall_id() {
            // If the connection is still open, but the BrowserID has disappeared - recall it from the backend
            // This happens e.g. when the frontend cache is reset in the Compainon app
            if (!this.connection)
                return;
            const recalledID = await this.connection.sendMessagePromise({
                type: "browser_mod/recall_id",
            });
            if (recalledID) {
                localStorage[ID_STORAGE_KEY] = recalledID;
            }
        }
        get browserID() {
            if (document.querySelector("hc-main"))
                return "CAST";
            if (localStorage[ID_STORAGE_KEY])
                return localStorage[ID_STORAGE_KEY];
            this.browserID = "";
            this.recall_id();
            return this.browserID;
        }
        set browserID(id) {
            function _createBrowserID() {
                var _a, _b;
                const s4 = () => {
                    return Math.floor((1 + Math.random()) * 100000)
                        .toString(16)
                        .substring(1);
                };
                return (_b = (_a = window.fully) === null || _a === void 0 ? void 0 : _a.getDeviceId()) !== null && _b !== void 0 ? _b : `${s4()}${s4()}-${s4()}${s4()}`;
            }
            if (id === "")
                id = _createBrowserID();
            const oldID = localStorage[ID_STORAGE_KEY];
            localStorage[ID_STORAGE_KEY] = id;
            this.browserIDChanged(oldID, id);
        }
        browserIDChanged(oldID, newID) { }
    };
};

class BrowserMod extends ServicesMixin(PopupMixin(ActivityMixin(BrowserStateMixin(CameraMixin(MediaPlayerMixin(ScreenSaverMixin(AutoSettingsMixin(FullyMixin(RequireInteractMixin(ConnectionMixin(BrowserIDMixin(EventTarget)))))))))))) {
    constructor() {
        super();
        this.connect();
        console.info(`%cBROWSER_MOD ${pjson.version} IS INSTALLED
    %cBrowserID: ${this.browserID}`, "color: green; font-weight: bold", "");
    }
}
if (!window.browser_mod)
    window.browser_mod = new BrowserMod();

export { BrowserMod };
