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
      }
      // Since there are no cancellable events on a base EventTarget,
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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$5=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$4=Symbol(),n$6=new WeakMap;class o$6{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$6.set(s,t));}return t}toString(){return this.cssText}}const r$3=t=>new o$6("string"==typeof t?t:t+"",void 0,s$4),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$6(n,t,s$4)},S$1=(s,n)=>{e$5?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$3=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$3;const e$4=window,r$2=e$4.trustedTypes,h$2=r$2?r$2.emptyScript:"",o$5=e$4.reactiveElementPolyfillSupport,n$5={toAttribute(t,i){switch(i){case Boolean:t=t?h$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$3=(t,i)=>i!==t&&(i==i||t==t),l$5={attribute:!0,type:String,converter:n$5,reflect:!1,hasChanged:a$3},d$1="finalized";class u$3 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$5){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$5}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$3(i));}else void 0!==i&&s.push(c$3(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$5){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$5).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$5;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$3)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u$3[d$1]=!0,u$3.elementProperties=new Map,u$3.elementStyles=[],u$3.shadowRootOptions={mode:"open"},null==o$5||o$5({ReactiveElement:u$3}),(null!==(s$3=e$4.reactiveElementVersions)&&void 0!==s$3?s$3:e$4.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$3=window,s$2=i$3.trustedTypes,e$3=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$4="$lit$",n$4=`lit$${(Math.random()+"").slice(9)}$`,l$4="?"+n$4,h$1=`<${l$4}>`,r$1=document,u$2=()=>r$1.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$2=Array.isArray,v=t=>c$2(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$2="[ \t\n\f\r]",f$2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$2=/>/g,p$1=RegExp(`>|${a$2}(?:([^\\s"'>=/]+)(${a$2}*=${a$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y$1=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r$1.createTreeWalker(r$1,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$3?e$3.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$2;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$2?"!--"===c[1]?u=_:void 0!==c[1]?u=m$2:void 0!==c[2]?(y$1.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p$1):void 0!==c[3]&&(u=p$1):u===p$1?">"===c[0]?(u=null!=l?l:f$2,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p$1:'"'===c[3]?$:g):u===$||u===g?u=p$1:u===_||u===m$2?u=f$2:(u=p$1,l=void 0);const w=u===p$1&&t[i+1].startsWith("/>")?" ":"";r+=u===f$2?s+h$1:v>=0?(e.push(d),s.slice(0,v)+o$4+s.slice(v)+n$4+w):s+n$4+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$4)||i.startsWith(n$4)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$4).split(n$4),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y$1.test(h.tagName)){const t=h.textContent.split(n$4),i=t.length-1;if(i>0){h.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$2()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$2());}}}else if(8===h.nodeType)if(h.data===l$4)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$4,t+1));)v.push({type:7,index:r}),t+=n$4.length-1;}r++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$1).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r$1,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$1.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u$2()),this.k(u$2()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$2?s$2.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j={O:o$4,P:n$4,A:l$4,C:1,M:V,L:M,R:v,D:S,I:R,V:k,H:L,N:z,U:H,F:Z},B=i$3.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$2=i$3.litHtmlVersions)&&void 0!==t$2?t$2:i$3.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u$2(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$3,o$3;class s$1 extends u$3{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s$1.finalized=!0,s$1._$litElement$=!0,null===(l$3=globalThis.litElementHydrateSupport)||void 0===l$3||l$3.call(globalThis,{LitElement:s$1});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s$1});(null!==(o$3=globalThis.litElementVersions)&&void 0!==o$3?o$3:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$2=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$2(n){return (t,o)=>void 0!==o?e$2(n,t,o):i$2(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return n$2({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$2=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i$1(i,n){return o$2({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$1;null!=(null===(n$1=window.HTMLSlotElement)||void 0===n$1?void 0:n$1.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

class BrowserPlayerEditor extends s$1 {
    setConfig(config) { }
    render() {
        return x ` <div>Nothing to configure.</div> `;
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

class BrowserPlayer extends s$1 {
    static getConfigElement() {
        return document.createElement("browser-player-editor");
    }
    static getStubConfig() {
        return {};
    }
    _reconnect() {
        var _a;
        if (!((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.registered)) {
            if (this.parentElement.localName === "hui-card-preview") {
                this.removeAttribute("hidden");
            }
            else {
                this.setAttribute("hidden", "");
            }
        }
    }
    async connectedCallback() {
        var _a;
        super.connectedCallback();
        await ((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.connectionPromise);
        this._reconnect();
    }
    async setConfig(config) {
        var _a, _b, _c, _d, _e;
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
        (_e = window.browser_mod) === null || _e === void 0 ? void 0 : _e.addEventListener("browser-mod-ready", () => this._reconnect());
    }
    handleMute(ev) {
        window.browser_mod.player.muted = !window.browser_mod.player.muted;
    }
    handleVolumeChange(ev) {
        const volume_level = parseFloat(ev.target.value);
        window.browser_mod.player.volume = volume_level / 100;
    }
    handleMoreInfo(ev) {
        var _a, _b;
        this.dispatchEvent(new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                entityId: (_b = (_a = window.browser_mod.browserEntities) === null || _a === void 0 ? void 0 : _a.player) === null || _b === void 0 ? void 0 : _b.entity_id,
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
    handleVolumeDown(ev) {
        window.browser_mod.player.volume = Math.max(window.browser_mod.player.volume - 0.1, 0);
    }
    handleVolumeUp(ev) {
        window.browser_mod.player.volume = Math.min(window.browser_mod.player.volume + 0.1, 1);
    }
    handleReload(ev) {
        const wasPlaying = window.browser_mod.player.src && !window.browser_mod.player.paused && !window.browser_mod.player.ended;
        window.browser_mod.player.load();
        if (wasPlaying) {
            window.browser_mod.player.play();
        }
    }
    render() {
        var _a, _b, _c;
        if (!window.browser_mod) {
            window.setTimeout(() => this.requestUpdate(), 100);
            return x ``;
        }
        if (!((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.registered)) {
            return x `
        <ha-card>
          <ha-alert> This browser is not registered to Browser Mod. </ha-alert>
        </ha-card>
      `;
        }
        if (!((_b = window.browser_mod) === null || _b === void 0 ? void 0 : _b.browserEntities)) {
            window.setTimeout(() => this.requestUpdate(), 100);
            return x ``;
        }
        if (!((_c = window.browser_mod) === null || _c === void 0 ? void 0 : _c.playerEnabled)) {
            return x `
        <ha-card>
          <ha-alert> Media player disabled for this browser. </ha-alert>
        </ha-card>
      `;
        }
        return x `
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${window.browser_mod.player.muted
            ? "mdi:volume-off"
            : "mdi:volume-high"}
            ></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${this.handleVolumeDown}>
            <ha-icon .icon=${"mdi:volume-minus"}></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${this.handleVolumeUp}>
            <ha-icon .icon=${"mdi:volume-plus"}></ha-icon>
          </ha-icon-button>
          <ha-slider
            labeled
            min="0"
            max="100"
            step="1"
            ?disabled=${window.browser_mod.player.muted}
            value=${window.browser_mod.player.volume * 100}
            @change=${this.handleVolumeChange}
          ></ha-slider>

          ${window.browser_mod.player_state === "stopped"
            ? x `<div class="placeholder"></div>`
            : x `
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
          <ha-icon-button @click=${this.handleReload}>
            <ha-icon .icon=${"mdi:reload"}></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${this.handleMoreInfo}>
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
          </ha-icon-button>
        </div>

        <div class="browser-id">${window.browser_mod.browserID}</div>
      </ha-card>
    `;
    }
    static get styles() {
        return i$4 `
      :host([hidden]) {
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
        align-items: center;
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
      ha-slider {
        flex-grow: 2;
        flex-shrink: 2;
        width: 100%;
      }
    `;
    }
}
__decorate([
    n$2()
], BrowserPlayer.prototype, "hass", void 0);
__decorate([
    n$2({ attribute: "edit-mode", reflect: true })
], BrowserPlayer.prototype, "editMode", void 0);
if (!customElements.get("browser-player"))
    customElements.define("browser-player", BrowserPlayer);

var u$1;
const o$1 = /* @__PURE__ */ new WeakMap(), l$2 = () => {
}, n = class n {
  constructor(s) {
    this.subscribers = [], this.settlement = null, this[u$1] = "Unpromise", typeof s == "function" ? this.promise = new Promise(s) : this.promise = s;
    const e = this.promise.then((t) => {
      const { subscribers: r } = this;
      this.subscribers = null, this.settlement = {
        status: "fulfilled",
        value: t
      }, r == null || r.forEach(({ resolve: c }) => {
        c(t);
      });
    });
    "catch" in e && e.catch((t) => {
      const { subscribers: r } = this;
      this.subscribers = null, this.settlement = {
        status: "rejected",
        reason: t
      }, r == null || r.forEach(({ reject: c }) => {
        c(t);
      });
    });
  }
  /** Create a promise that mitigates uncontrolled subscription to a long-lived
   * Promise via .then() and .catch() - otherwise a source of memory leaks.
   *
   * The returned promise has an `unsubscribe()` method which can be called when
   * the Promise is no longer being tracked by application logic, and which
   * ensures that there is no reference chain from the original promise to the
   * new one, and therefore no memory leak.
   *
   * If original promise has not yet settled, this adds a new unique promise
   * that listens to then/catch events, along with an `unsubscribe()` method to
   * detach it.
   *
   * If original promise has settled, then creates a new Promise.resolve() or
   * Promise.reject() and provided unsubscribe is a noop.
   *
   * If you call `unsubscribe()` before the returned Promise has settled, it
   * will never settle.
   */
  subscribe() {
    let s, e;
    const { settlement: t } = this;
    if (t === null) {
      if (this.subscribers === null)
        throw new Error("Unpromise settled but still has subscribers");
      const r = h();
      this.subscribers = f$1(this.subscribers, r), s = r.promise, e = () => {
        this.subscribers !== null && (this.subscribers = y(this.subscribers, r));
      };
    } else {
      const { status: r } = t;
      r === "fulfilled" ? s = Promise.resolve(t.value) : s = Promise.reject(t.reason), e = l$2;
    }
    return Object.assign(s, { unsubscribe: e });
  }
  /** STANDARD PROMISE METHODS (but returning a SubscribedPromise) */
  then(s, e) {
    const t = this.subscribe(), { unsubscribe: r } = t;
    return Object.assign(t.then(s, e), {
      unsubscribe: r
    });
  }
  catch(s) {
    const e = this.subscribe(), { unsubscribe: t } = e;
    return Object.assign(e.catch(s), {
      unsubscribe: t
    });
  }
  finally(s) {
    const e = this.subscribe(), { unsubscribe: t } = e;
    return Object.assign(e.finally(s), {
      unsubscribe: t
    });
  }
  /** Unpromise STATIC METHODS */
  /** Create or Retrieve the proxy Unpromise (a re-used Unpromise for the VM lifetime
   * of the provided Promise reference) */
  static proxy(s) {
    const e = n.getSubscribablePromise(s);
    return typeof e < "u" ? e : n.createSubscribablePromise(s);
  }
  /** Create and store an Unpromise keyed by an original Promise. */
  static createSubscribablePromise(s) {
    const e = new n(s);
    return o$1.set(s, e), o$1.set(e, e), e;
  }
  /** Retrieve a previously-created Unpromise keyed by an original Promise. */
  static getSubscribablePromise(s) {
    return o$1.get(s);
  }
  /** Promise STATIC METHODS */
  /** Lookup the Unpromise for this promise, and derive a SubscribedPromise from
   * it (that can be later unsubscribed to eliminate Memory leaks) */
  static resolve(s) {
    const e = typeof s == "object" && s !== null && "then" in s && typeof s.then == "function" ? s : Promise.resolve(s);
    return n.proxy(e).subscribe();
  }
  static async any(s) {
    const t = (Array.isArray(s) ? s : [...s]).map(n.resolve);
    try {
      return await Promise.any(t);
    } finally {
      t.forEach(({ unsubscribe: r }) => {
        r();
      });
    }
  }
  static async race(s) {
    const t = (Array.isArray(s) ? s : [...s]).map(n.resolve);
    try {
      return await Promise.race(t);
    } finally {
      t.forEach(({ unsubscribe: r }) => {
        r();
      });
    }
  }
  /** Create a race of SubscribedPromises that will fulfil to a single winning
   * Promise (in a 1-Tuple). Eliminates memory leaks from long-lived promises
   * accumulating .then() and .catch() subscribers. Allows simple logic to
   * consume the result, like...
   * ```ts
   * const [ winner ] = await Unpromise.race([ promiseA, promiseB ]);
   * if(winner === promiseB){
   *   const result = await promiseB;
   *   // do the thing
   * }
   * ```
   * */
  static async raceReferences(s) {
    const e = s.map(a$1);
    try {
      return await Promise.race(e);
    } finally {
      for (const t of e)
        t.unsubscribe();
    }
  }
};
u$1 = Symbol.toStringTag;
let b = n;
function a$1(i) {
  return b.proxy(i).then(() => [i]);
}
function h() {
  let i, s;
  return {
    promise: new Promise((t, r) => {
      i = t, s = r;
    }),
    resolve: i,
    reject: s
  };
}
function f$1(i, s) {
  return [...i, s];
}
function m$1(i, s) {
  return [...i.slice(0, s), ...i.slice(s + 1)];
}
function y(i, s) {
  const e = i.indexOf(s);
  return e !== -1 ? m$1(i, e) : i;
}

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
    return b.race([
        _selectTree(root, path, all),
        new Promise((_, reject) => setTimeout(() => reject(new Error(TIMEOUT_ERROR)), timeout)),
    ]).catch((err) => {
        if (!err.message || err.message !== TIMEOUT_ERROR)
            throw err;
        return null;
    });
}
async function getLovelaceRoot(document) {
    let _lovelaceRoot = await _getLovelaceRoot(document);
    while (_lovelaceRoot === null) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        _lovelaceRoot = await _getLovelaceRoot(document);
    }
    return _lovelaceRoot || null;
    async function _getLovelaceRoot(document) {
        let root = await selectTree(document, "home-assistant$home-assistant-main$ha-panel-lovelace$hui-root");
        if (!root) {
            let panel = await selectTree(document, "home-assistant$home-assistant-main$partial-panel-resolver>*");
            if ((panel === null || panel === void 0 ? void 0 : panel.localName) !== "ha-panel-lovelace")
                return false;
        }
        if (!root)
            root = await selectTree(document, "hc-main $ hc-lovelace $ hui-view");
        if (!root)
            root = await selectTree(document, "hc-main $ hc-lovelace $ hui-panel-view");
        return root;
    }
}
async function hass_base_el() {
    var _a;
    const customElement = (_a = customElements.get("home-assistant")) !== null && _a !== void 0 ? _a : customElements.get("hc-main");
    if (customElement === undefined) {
        await b.race([
            customElements.whenDefined("home-assistant"),
            customElements.whenDefined("hc-main"),
        ]);
    }
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
    const routes = ppResolver._getRoutes([
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
function blankVideoUrl() {
    return "data:video/mp4;base64,AAAAGGZ0eXBpc29tAAAAAGlzb21tcDQxAAAACGZyZWUAAAAmbWRhdCELUCh9wBQ+4cAhC1AAfcAAPuHAIQtQAH3AAD7hwAAAAlNtb292AAAAbG12aGQAAAAAxzFHd8cxR3cAAV+QAAAYfQABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAG2lvZHMAAAAAEA0AT////xX/DgQAAAACAAABxHRyYWsAAABcdGtoZAAAAAfHMUd3xzFHdwAAAAIAAAAAAAAYfQAAAAAAAAAAAAAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAWBtZGlhAAAAIG1kaGQAAAAAxzFHd8cxR3cAAKxEAAAL/xXHAAAAAAA0aGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAFNvdW5kIE1lZGlhIEhhbmRsZXIAAAABBG1pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAAyHN0YmwAAABkc3RzZAAAAAAAAAABAAAAVG1wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAACsRAAAAAAAMGVzZHMAAAAAA4CAgB8AQBAEgICAFEAVAAYAAAANdQAADXUFgICAAhIQBgECAAAAGHN0dHMAAAAAAAAAAQAAAAMAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAADAAAAAQAAABRzdHN6AAAAAAAAAAoAAAADAAAAFHN0Y28AAAAAAAAAAQAAACg=";
}
function popSoundUrl() {
    return "data:audio/mp3;base64,//PkZAAghSh2AGt5kB6KMR2UyNNIZ0w1cy0UjhQODThmk5GSO2XN4qMilGCwWFgEAHCRoeBgCMjBUNwYCFRYjHGEHmXHB2A3BgzackLAAKCgQQBCAwYRCFZlRJhBwhHjBQsEoNODHE81tKBZwdYgG5rZkB4OrkoDC4EVEDjDEGGRUHkSUg0+F7qwL/WMlyLBl2Ee0ZCQEuETGBhiD8ARhmaBQiHMUYa4OIgz1xg4QChUAEDmKcbR5TWf4J3KGiiDBkEaMiHdLZRAtoMgpfK5XclqFRjMHJxwembghkglpC3YgCHSQqUHOh2hnggABAWiAMijpxiGk3wHLNIJBdeik0kC8YWAQ9Lekww0AgPQAInqqKdvMzuJSC2tiq4N4A5Tuu87rXmcopBAI0+cIpnGCMOGp2flERh55nygeKReWT9FF37jG89Y5Y27dSvcksFNJYkrQkgpu7Fn6JTIy/yMrKxI/8rDEiNJWSqIlFx8SI1Lq5YwvKMorEouPkiNAuomsZME6BdRc4Qi4nJG82E1E2XubxVpzglqzNVDl2BvEFzQMuaUACwZmxpOhdgqKTDq8aAnWtE3bTjNMccvkajwlAOhTPpQcrjhewtoYY8bSEcJURKjABgUEQACosHH4ghg//PkREwdqRqyAKzoALvqNVwBWdABOhwYPM6Ja+uuIINgoeIgwGKMqVVMOLAQ8AhQMPhT4GADGVLmhTmlLgoe4yKi+TCjTIizGAk8TClTMlzKkUSl+Q0/LOQCFAwda7K15A4B6xDAEiggYEGpsXgAgYWEFs19GLImREmBAhANLRUphxpECMIESjbm48v3fkrRl6qwgIGyeN5e+i5AICMeLCB7cKURAAMIeVR4MALkYyYMOiPDc/ES6MQRuJfQhJJilLBAAGCLAAgIMEYG7ada7DL1AdZslmlYTOgyQ6ADFJGQDYiDqCEKZ9KDk8cL2FtDDHjaQjhKiJUYAMCgiAAVFg4/EEMB0ODB5nRLX11xBBsFDxEGAxRlSqphxYCHgEKBh8KfAwAYypc0Kc0pcFD3GRUXyYUaZEWYwEniYUqZkuZUiiUvyGn5ZyAQoGDrXZWvIHAPWIYAkUEDAg1Ni8AEDCwgtmvoxZEyIkwIEIBpaKlMONIgRhAiUbc3Hl+78laMvVWEBA2TxvL30XIBARjxYQPbhSiIABhDyqPBgBcjGTBh0R4bn4ixYcNHQzqLDFShsWw4EQedbeJkBAYWGsS0BLww2F6+N1v0hC1hgTBImGuDMYogflLyVbMFsCcQANAY//PkRDocbTjoAM54ADO6ccgBm+gACxWA1pkSjFsA8MFYBMwEQF7uqTlqpWkE56IwsAAYBoA4AAYDAINV8728a/Lfb0+YDgDwQAaGADiQAgBARDAF9Zd596mvVJ/uGL+AoCt8adCYYBgAiwZgnAMfX1hf7+so686P8j4l3Dl+BDAxCTMJMCUw5QezARAMR4MCYAEwhwlw4H9in6/PDff///nyPGgl2Gff/5LIkglIA4AMZAeFgRAEAuEAAMbUv7jNvs9ZmKccMVV6jB0DwEHE71qhoOGlAhnpPFX/uy340YVkeYimYa6IpS8lWzEMFxgCA4BHUPirMM5gcFh9MEQHu6pOWtU25zqjRbwHBeYAAcHAZlXzvbxlf2/vXzBIEERVLxCAJgSBIcAesu8+9TTlSf7hi/gQDbdZehMMDAEWDMTgY+vrC/39ZR150f5HxLuHL8CGGJJmSYSmco9mCIGI8GEwAmQ5Lhw/sU/X54b7///8+R40Euwz7//JZEkEpAHAGMg8LCIAgXCAAY2pf2qhUCgMCxSSwQBgYBgAkLjGBDmZgQSC/oFI43+UwwxHQxSAUzICYz9Yk0HbMwBIcxtA8wxA0xMDg648oy3nMA4FgGAwAgGE0OIGJoJANQMgYBwa//PkZFIkSZkxLs7YATKiZmpfnOgCgeWlZAYPBZgYdQ0gZHABAYMgSiBRnQMTADAcEYRqUQMVgPgBgSjTQE9EXIcWyKpl0njFMgpfMlyNFAjkDkjgFlKfo/pLUIoHQgYCQAhcXrFqDlBP/WYAiAuF0CCBdQFownwVuH0ABAKBIB5OChwbHwRALDGgYIDbA9ETJhnwMAgHgMBgCAJBSAYCyBgYBCCYDBpJmJXHPDEZCheAEgEEXAKAeXssmQBQAxZQ4BHg4wy4RbpgkAIEgCD4C5sDAKEMDAqBwLhRPr////////MyZeJsCkQCSy2gUmEQgBgBhxgYbL7MJIJepgk+GQhIiEGEEysAjOavM2sMwGOzJolMRhMxoJjpnQMkyUeA2QGBITmHwKJ/gkATxxZDEgPzDkLwUCqqtjExCEYaC55bpi0JhiEDq/7dbDncZ/kaq07+xemzx3S4bsU3///////+X/QRFl8Hf//clk///+m/iGEOP9OU8ga26+E2/bzwxFJZKaP9ug/jnNBZzHu/vucbvwY8mbj5f+/d+msSy3KMv//mI5qnWW1qls////iWAAw/AAoDswwXiC4ARbswNgTzAiAfMAwJkwygpzA/AfMJwIkwRgUTACB+MMUO4xbS//PkRDAcxSckP+90ADgaUjgZ3ugBMDLJL8M4cWo2+zuDO+YHN/Zuc3zJ8Tk6a5MhGRY3gS4Da4X1NBNXo00CGT3CNjKo2TO0mzFsFQ4FmxR99LH8/8rmt54Xe//////9w/uHM7ff+vlhzvO/3D94///MxFDiYQA2LAw3KB3dluqZc6KpdlJiZRgcx2YTKKeAakoZEXyX9XjuMNWf7+pU7TPkJSxWssh5haqtxdVJ0wAA0wSBkwYBswWAVdrmuEu6lpHeBr//lwfX40qLgKthiTlQEYCwE5gHAGmAEC+YNQKpgIgTmDUC2YHwAZgHAkGEGEsYbYrRjnj0GRuGAaQZIRk7IEmq4j2anjXZsdL6mHFIcbppZRtjL5mgOsoaahBZ8BGhl0a5nST5i2C4cCSnS2WGUmHP////////////7r/1+8+/+fcOd//7h+8f//mX1GAJMMAtEgwYU87XYrqVJzlpQMBI8BEdKAMYo1l7YYjbw1IYT2BQFJxSuCcXas67+ok1pRYs8kSsKpTepJdKV4s1IAFMCAbMIApMKArMJgRUFY6uZQaUyhr1MNoACVgAlbcMsYMSKMKHHFZm6h57ypDFhzFChl+PtTC1zBSAJMWg101ME/zIZCkMgEngxsR1//PkRDQcFYcaPWvPRjZ7DiRS68fIDD8MEMHYXEwdRYjBzCZMpgV8x1TujFAHoMzktwyJR6jFXDASRTxEfFuQmEakSGZamLhDQs/1eXRxyxnOh7PNdFqOeHAlprT+/99wN0rulK3/v++ei6hkADSvcocDKhDbC9MRXIMmROlssKVRQuR+J4+yVFiKNofYznXtm8UR5Kk5MRyxuFnBdjWXMU4VK5MZ05pv53//bX+v/nGv/m+/6Zvv4pfGd4vfGv77eTAFYBMqbOKIZIPiICUGjCMNGhAgHxYFCAGRYRQuIoKJUzOjM+A0k17Go1Dco1jLI5GNo5Gn0xNeozVH07odU0/8Q1Wdw83t44he41VMAoAFKBMdlTTazZrGcvmoxnL5XTxDn509PnzdeH783MUOHMKe3/59qWsMb+FTHP/z/CmjKZKFgGAaG5dXpNw6juAskMQ4rxFhckeLCgTeCRF0OYtRXhjCRpp9JnNMRq3cQgRii4i8WrbfZwOYhyJiklN1mT5ccwJ/m+t/2p7Tf7zib/X/SufEeU45z8zQagCyABKfKYjF1/S4yqxgoVmCwMYvIhgUMmAg8TCpLVPcxcczTSFMskAwmJTD0UPM1Y8ztjk48MLBoqAMyeAjHIgKowBT//PkZEQgZYsWLXMsijF7FiRcxtKcCMYBMwgLy2iXK60DC9g4C4Saoc+YASqaMyKosInWtAZ3N1QDuB1ZsJGHOaRIcsDqEJbIGAt2aiXjXmwBYFjyxH/bpAMil7+O3NPrI3cdupQSCL2JLBU7BqpYaiMqjM/EtHrgKDvVdI9JwuCo8AMSFap88YhbYPY3F6RnF5QSpoYzy6KXa1qjUNKEJbLp+cL0LljaxmNQvYutjULzpDRmh2dkIkoywVzh0yVmCGcLT84PzgtHh+VB5ePTr/f//8mAcoACDDf0uchLJKpAD4NMfeGOpm0HXR5L8GDI5szaY2cGbsIV/CfvMetDawwMAFLk5zIwZOweEi9KMrdGotuvRWxZMSaaNBZdxo6wSxVIMvaQh3TCTMXuqRPdYrbLUQfZAyFuzVkA602ALAtSWIjGCrTaAjWVeSEcKc3iaWJgisrJnVq+KN+utaTUCaG7sKu6juTq/N1yvYTz5/9yWVH5OE68LhHcnC47kyx15gjIxoUvMEZAyTG0BcgZJ0BtATME5QQtEqIkdd2Qw0wJmypX0ZctFoMGs8AwKLs6BA8uQFh5uEJrfB7RRqEYAAhCE0KQKIxAnMQMDDZMFQlmQCqPS8EglVERoqw5PVUL//PkZEYejfcEAWmH2DWrGfAAzxK8jXi/zCmhQQ86XryW4CZdKosyqB10ymdUygebgxr0Ey2GYcWNbiLZHWpeRGIO9aqdK1KURWjoJjwXHQ7Iya40B4VAaWwk1Q1dMpSpAJNhKRUyMpoEZi6hqaezQleqOYiUZGKJ6YVpiiEJwyKx9d3vTKNq0lWwnJ61ZpGaqj0rJyq4uZgbEmA9OTA2ktJ0Takqmpi4JSHVOGUYcAcGuIxfyoOQGtwsM/+EIDf//CEHsqrwY97iJ9KUhUw1SBUY1RgoqNIA5YuKacRKeXSMhlww0gzMgJMlNU4YzzIwPMUC8wONBUpmQRECgdIjBIuMhiZStuloCgZPQv1GUqlK0kX+0mMsEx6MSJ/YCm3wWNUh5rUPstxsu1H5uUOVXpYZfRMaN15JL4rLoBk0utYIjTNkqJYBjxpYTIxTkg0WE0bQsS6WJpCqYhMraqwiVZuDUSpmUnhUzKUYS9xVYCzkSJpXNikxeIlWbihRTp7j4pONqpExCgehpkQkhrtFTy5KqZFKAEl4p0uWka1mIXIlUKFQmVXg1FCzFC4Uh4ClUibSEKhYmInkJkiJldk1GSJFNDNmtVZihQopkJKkitCzaGEtqXpC5ETImpS9oRSz//PkZEYWzfr0tiTI5i87HbQAyxMU9VFKEifZCCJmkiO5RaLEiRJtNROTRo24SOJOi1ftRuU1MDEiRLW3mgGCWsSokUSJEgpJyMNWzTo/08/0WEioAQVpoBIzklAIKBgEsiMphYeSKiocgtdflRhxNqqWtSsMzMLCw8OTv//2ZmDoGw8VOTqVO9DSXyYT/gwUyA3OiigUPzkTYjHn2S9JQjVgOmo5Vgg5MkBClsQSAjk4Sulou4BICRXXuYBYB12oRJutdXP960xXQiSTaPMrVvs4us0u9oxUnRkZPWtOrTF3LMmK06jqVRFPceQvxq2ViJEirSElWbJcu6lJq8rf/sc/9ImkSL1uKilRFqyKREoKkSIVNWhykT41Nmtkmz8kmSlmAsKnqiklVyKQWFQqBImTBFosIkq//t6vCT8GhK6Cp2pMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
}
const debounce = (func, wait, immediate = false) => {
    let timeout;
    const debouncedFunc = (...args) => {
        const later = () => {
            timeout = undefined;
            func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func(...args);
        }
    };
    debouncedFunc.cancel = () => {
        clearTimeout(timeout);
    };
    return debouncedFunc;
};
function ensureArray(value) {
    if (value === undefined || value === null || Array.isArray(value)) {
        return value;
    }
    return [value];
}
const capitalize = (s) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";
function compare_deep(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (!(a instanceof Object && b instanceof Object))
        return false;
    for (const x in a) {
        if (!a.hasOwnProperty(x))
            continue;
        if (!b.hasOwnProperty(x))
            return false;
        if (a[x] === b[x])
            continue;
        if (typeof a[x] !== "object")
            return false;
        if (!compare_deep(a[x], b[x]))
            return false;
    }
    for (const x in b) {
        if (!b.hasOwnProperty(x))
            continue;
        if (!a.hasOwnProperty(x))
            return false;
    }
    return true;
}

const ConnectionMixin = (SuperClass) => {
    class BrowserModConnection extends SuperClass {
        constructor() {
            super(...arguments);
            this.ready = false;
            this._connected = false;
            this.connectionPromise = new Promise((resolve) => {
                this._connectionResolve = resolve;
            });
            this.browserEntities = {};
            /*
             * Main state flags explained:
             * * `connected` and `disconnected` refers to WS connection,
             * * `ready` refers to established communication between browser and component counterpart.
             */
            // Component and frontend are mutually ready
            this.onReady = () => {
                this.ready = true;
                this.LOG("Integration ready: browser_mod loaded and update received");
                this.fireBrowserEvent("browser-mod-ready");
                window.setTimeout(() => this.sendUpdate({}), 1000);
                this.userReady()
                    .then(() => {
                    this.onUserReady();
                })
                    .catch((err) => {
                    console.log(`Browser Mod: ${err}. User Frontend settings have not been applied`);
                });
            };
            // WebSocket has connected
            this.onConnected = () => {
                this._connected = true;
                this.LOG("WebSocket connected");
            };
            // WebSocket has disconnected
            this.onDisconnected = () => {
                this.ready = false;
                this._connected = false;
                this.LOG("WebSocket disconnected");
                this.fireBrowserEvent("browser-mod-disconnected");
            };
            this.onUserReady = () => {
                this.LOG("Hass user data ready");
                this.fireBrowserEvent("browser-mod-user-ready");
            };
        }
        LOG(...args) {
            if (window.browser_mod_log === undefined)
                return;
            const dt = new Date();
            console.log(`${dt.toLocaleTimeString()}`, ...args);
            if (this._connected) {
                try {
                    this.connection.sendMessage({
                        type: "browser_mod/log",
                        message: args[0],
                    });
                }
                catch (err) {
                    console.log("Browser Mod: Error sending log:", err);
                }
            }
        }
        // Propagate internal browser event
        fireBrowserEvent(event, detail = undefined) {
            this.dispatchEvent(new CustomEvent(event, { detail, bubbles: true }));
        }
        async entitiesReady() {
            if (this.ready && !this.registered)
                return false;
            if (Object.keys(this.browserEntities).length > 0) {
                return true;
            }
            else {
                let cnt = 0;
                while (Object.keys(this.browserEntities).length === 0 && cnt++ < 20) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    if (this.ready && !this.registered)
                        return false;
                }
                if (Object.keys(this.browserEntities).length > 0)
                    return true;
                throw new Error("Browser entities not available after 10 seconds");
            }
        }
        async userReady() {
            if (this.user) {
                return true;
            }
            else {
                let cnt = 0;
                while (!this.user && cnt++ < 20) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                if (this.user)
                    return true;
                throw new Error("User data not available after 10 seconds");
            }
        }
        // Handle incoming message
        incoming_message(msg) {
            var _a;
            // Set that have a connection. Allows logging
            if (!this._connected) {
                this.onConnected();
            }
            // Handle messages
            if (msg.command) {
                this.LOG("Command:", msg);
                this.fireBrowserEvent(`command-${msg.command}`, msg);
            }
            else if (msg.browserEntities) {
                let oldEntities = this.browserEntities;
                this.browserEntities = msg.browserEntities;
                if (!compare_deep(oldEntities, this.browserEntities)) {
                    this.fireBrowserEvent("browser-mod-entities-update");
                }
            }
            else if (msg.result) {
                this.update_config(msg.result);
            }
            // Resolve first connection promise
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
            if (!this.registered && this.global_settings["autoRegister"] === true)
                this.registered = true;
            // Check for readiness (of component and browser)
            if (!this.ready) {
                this.onReady();
            }
            this.fireBrowserEvent("browser-mod-config-update");
            if (update)
                this.sendUpdate({});
        }
        async connect() {
            const conn = (await hass()).connection;
            this.connection = conn;
            const connectBrowserModComponent = () => {
                this.LOG("Subscribing to browser_mod/connect events");
                conn.subscribeMessage((msg) => this.incoming_message(msg), {
                    type: "browser_mod/connect",
                    browserID: this.browserID,
                });
            };
            // Initial connect component subscription
            connectBrowserModComponent();
            // If this fails, then:
            // Observe `component_loaded` to track when `browser_mod` is dynamically added
            conn.subscribeEvents((haEvent) => {
                var _a;
                if (((_a = haEvent.data) === null || _a === void 0 ? void 0 : _a.component) === "browser_mod") {
                    this.LOG("Detected browser_mod component load");
                    connectBrowserModComponent();
                }
            }, "component_loaded");
            // Keep connection status up to date
            conn.addEventListener("ready", () => {
                this.onConnected();
            });
            conn.addEventListener("disconnected", () => {
                this.onDisconnected();
            });
            window.addEventListener("connection-status", (ev) => {
                if (ev.detail === "connected") {
                    this.onConnected();
                }
                if (ev.detail === "disconnected") {
                    this.onDisconnected();
                }
            });
            provideHass(this);
        }
        get config() {
            var _a, _b;
            return (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.config) !== null && _b !== void 0 ? _b : {};
        }
        get user() {
            var _a;
            return (_a = this.hass) === null || _a === void 0 ? void 0 : _a.user;
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
                    if (this.registered || this.global_settings["lockRegister"])
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
            var _a, _b, _c, _d;
            const settings = {};
            const user = (_d = (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.user_settings) === null || _b === void 0 ? void 0 : _b[(_c = this.user) === null || _c === void 0 ? void 0 : _c.id]) !== null && _d !== void 0 ? _d : {};
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
                    const user = this.user.id;
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
        get playerEnabled() {
            var _a, _b, _c;
            if (!this.registered)
                return null;
            return (_c = (_b = (_a = this.browserEntities) === null || _a === void 0 ? void 0 : _a.player) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : false;
        }
        get screenEnabled() {
            var _a, _b, _c;
            if (!this.registered)
                return null;
            return (_c = (_b = (_a = this.browserEntities) === null || _a === void 0 ? void 0 : _a.screen) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : false;
        }
        sendUpdate(data) {
            if (!this.ready || !this.registered)
                return;
            this.LOG("Send:", data);
            try {
                this.connection.sendMessage({
                    type: "browser_mod/update",
                    browserID: this.browserID,
                    data,
                });
            }
            catch (err) {
                // As we are not sure of connection state, just log to console
                console.log("Browser Mod: Error sending update:", err);
            }
        }
        browserIDChanged(oldID, newID) {
            var _a, _b;
            this.fireBrowserEvent("browser-mod-config-update");
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

const SCREEN_STATE_ID = "browser_mod-screen_state";
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
            this.addEventListener("browser-mod-user-ready", () => {
                this.entitiesReady().then(() => {
                    if (this.screenEnabled) {
                        this.addEventListener("command-screen_off", () => this._screen_off());
                        this.addEventListener("command-screen_on", (ev) => this._screen_on(ev));
                        this.addEventListener("fully-update", () => this.send_screen_status());
                        this.addEventListener("browser-mod-disconnected", () => this._screen_save_state());
                        this._screen_restore_state();
                    }
                }).catch((err) => {
                    console.warn(`Browser Mod: ${err}. Timeout waiting for browser entities to be ready. Screen light sensor will not be available`);
                });
            }, { once: true });
        }
        send_screen_status() {
            this._screen_state = !this._panel.hasAttribute("dark");
            let screen_brightness = this._brightness;
            if (this.fully) {
                this._screen_state = this.fully_screen;
                screen_brightness = this.fully_brightness;
            }
            this.sendUpdate({ screen_on: this._screen_state, screen_brightness });
            this._screen_save_state();
        }
        _screen_save_state() {
            if (this.settings.saveScreenState) {
                let storedScreenState = {
                    screen_on: this._screen_state,
                    screen_brightness: this._brightness,
                };
                localStorage.setItem(SCREEN_STATE_ID, JSON.stringify(storedScreenState));
            }
        }
        _screen_restore_state() {
            if (this.settings.saveScreenState) {
                const storedScreenState = localStorage.getItem(SCREEN_STATE_ID);
                if (storedScreenState) {
                    const { screen_on, screen_brightness } = JSON.parse(storedScreenState);
                    this._screen_state = screen_on;
                    this._brightness = screen_brightness;
                    if (this._screen_state) {
                        this._screen_on({ detail: { brightness: this._brightness } });
                    }
                    else {
                        this._screen_off();
                    }
                }
                else {
                    this._screen_on();
                }
            }
            else {
                this._screen_on();
            }
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
            this._canPlayVideo = false;
            this._canPlayAudio = false;
            this.addEventListener("browser-mod-entities-update", () => {
                this._setup_media_player();
            }, { once: true });
        }
        _setup_media_player() {
            if (!this.playerEnabled)
                return;
            this._audio_player = new Audio();
            this._audio_player.muted = true;
            this._video_player = document.createElement("video");
            this._video_player.setAttribute("playsinline", "");
            this._video_player.controls = true;
            this._video_player.style.setProperty("width", "100%");
            this._video_player.muted = true;
            this.player = this._audio_player;
            this._player_enabled = false;
            this.extra = {};
            for (const ev of ["play", "pause", "ended", "volumechange"]) {
                this._audio_player.addEventListener(ev, () => this._player_update());
                this._video_player.addEventListener(ev, () => this._player_update());
            }
            for (const ev of ["timeupdate"]) {
                this._audio_player.addEventListener(ev, () => this._player_update_throttled());
                this._video_player.addEventListener(ev, () => this._player_update_throttled());
            }
            this.videoInteraction.then(() => {
                this._player_enabled = true;
                this._canPlayVideo = true;
                this._player_update();
            });
            this.audioInteraction.then(() => {
                this._canPlayAudio = true;
                this._video_player.muted = false;
                this._audio_player.muted = false;
                this._player_update();
            });
            this.addEventListener("command-player-play", (ev) => {
                var _a, _b, _c, _d, _e, _f;
                if (this.player.src && ((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.media_content_id) === undefined) {
                    this.player.play();
                    this._show_video_player();
                    return;
                }
                if (!this.player.src && ((_b = ev.detail) === null || _b === void 0 ? void 0 : _b.media_content_id) === undefined) {
                    return; // Nothing to play
                }
                if (this.player.src)
                    this.player.pause();
                if ((_c = ev.detail) === null || _c === void 0 ? void 0 : _c.media_type)
                    if ((_d = ev.detail) === null || _d === void 0 ? void 0 : _d.media_type.startsWith("video"))
                        this.player = this._video_player;
                    else
                        this.player = this._audio_player;
                if ((_e = ev.detail) === null || _e === void 0 ? void 0 : _e.media_content_id)
                    this.player.src = ev.detail.media_content_id;
                this.extra = (_f = ev.detail) === null || _f === void 0 ? void 0 : _f.extra;
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
                    this.closePopup({ tag: "media_player" });
                else if (this.player.src)
                    this.player.pause();
                this.player.src = "";
                this._player_update();
            });
            this._player_update();
        }
        _show_video_player() {
            var _a;
            if (this.player === this._video_player && this.player.src && !this._video_player.isConnected) {
                selectTree(document, "home-assistant $ dialog-media-player-browse").then((el) => el === null || el === void 0 ? void 0 : el.closeDialog());
                this.showPopup(Object.assign({ title: undefined, content: this._video_player, dismiss_action: () => this._video_player.pause(), initial_style: "wide", tag: "media_player" }, (_a = this.extra) === null || _a === void 0 ? void 0 : _a.popup));
            }
            else if (this.player !== this._video_player &&
                this._video_player.isConnected) {
                this.closePopup({ tag: "media_player" });
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
                    extra: Object.assign(Object.assign({}, this.extra), { videoInteractionRequired: !this._canPlayVideo, audioInteractionRequired: !this._canPlayAudio })
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
            if (this._cameraVideo)
                return;
            await this.connectionPromise;
            await this.videoInteraction;
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
            const video = (this._cameraVideo = document.createElement("video"));
            div.shadowRoot.append(video);
            video.autoplay = true;
            video.playsInline = true;
            video.style.display = "none";
            const canvas = (this._canvas = document.createElement("canvas"));
            div.shadowRoot.append(canvas);
            canvas.style.display = "none";
            if (!navigator.mediaDevices) {
                this.cameraError = true;
                this.fireBrowserEvent("browser-mod-config-update");
                return;
            }
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
                    this.fireBrowserEvent("browser-mod-config-update");
                }
            }
        }
        async update_camera() {
            var _a, _b;
            if (!this.cameraEnabled) {
                const stream = (_a = this._cameraVideo) === null || _a === void 0 ? void 0 : _a.srcObject;
                if (stream) {
                    stream.getTracks().forEach((t) => t.stop());
                    this._cameraVideo.srcObject = undefined;
                }
                return;
            }
            if (this.fully) {
                this.sendUpdate({
                    camera: this.fully_camera,
                });
            }
            else if ((_b = this._cameraVideo) === null || _b === void 0 ? void 0 : _b.videoWidth) {
                const video = this._cameraVideo;
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
            this.videoInteraction = new Promise((resolve) => {
                this._videoInteractionResolve = resolve;
            });
            this.audioInteraction = new Promise((resolve) => {
                this._audioInteractionResolve = resolve;
            });
            this.addEventListener("browser-mod-user-ready", () => {
                this.entitiesReady().then(() => {
                    if ((this.playerEnabled || this.cameraEnabled) && !this._versionNotificationPending) {
                        this._audioRequired = this.playerEnabled;
                        this.setupInteraction();
                    }
                }).catch((err) => {
                    console.warn(`Browser Mod: Failed to wait for browser entities to be ready. Player will be unavailable. Error: ${err}`);
                });
            }, { once: true });
        }
        _clearInteract() {
            this._video.remove();
            this._video = undefined;
            this._interactElement.remove();
            this._interactElement = undefined;
        }
        _checkInteraction(onerror = undefined) {
            if (!this._interactElement)
                return;
            // There may be two interaction levels, audio and video.
            // Muted video can usually be played without user interaction,
            // but unmuted audio requires user interaction.
            const vPlay = this._video.play();
            if (vPlay !== undefined) {
                vPlay
                    .then(() => {
                    this._videoInteractionResolve();
                    this._video.pause();
                    if (this._audioRequired) {
                        this._video.muted = false;
                        this._video.currentTime = 0;
                        const aPlay = this._video.play();
                        if (aPlay !== undefined) {
                            aPlay
                                .then(() => {
                                this._audioInteractionResolve();
                                this._video.pause();
                            })
                                .catch((e) => {
                                if (onerror && !this.settings.hideInteractIcon) {
                                    onerror();
                                }
                                else {
                                    this._clearInteract();
                                }
                            });
                        }
                    }
                })
                    .catch((e) => {
                    if (onerror && !this.settings.hideInteractIcon) {
                        onerror();
                    }
                    else {
                        this._clearInteract();
                    }
                });
            }
        }
        minimalInteraction() {
            if (!this._interactElement)
                return;
            const interactText = document.createElement("span");
            interactText.textContent = "Browser Mod";
            this._interactElement.shadowRoot.append(interactText);
            const interactIcon = document.createElement("ha-icon");
            interactIcon.setAttribute("id", "tap");
            interactIcon.icon = "mdi:gesture-tap";
            this._interactElement.shadowRoot.append(interactIcon);
            this._interactElement.setAttribute("minimal", "");
            const onerror = this.settings.fullInteraction ? () => this.fullInteraction() : undefined;
            this._interactElement.addEventListener("pointerdown", () => {
                this._checkInteraction(onerror);
            }, { once: true });
            this._interactElement.addEventListener("touchstart", () => {
                this._checkInteraction(onerror);
            }, { once: true });
        }
        fullInteraction() {
            if (!this._interactElement)
                return;
            const closeIconButton = document.createElement("ha-icon-button");
            closeIconButton.setAttribute("id", "close");
            const closeIcon = document.createElement("ha-icon");
            closeIcon.setAttribute("icon", "mdi:close");
            closeIconButton.append(closeIcon);
            closeIconButton.addEventListener("pointerdown", () => {
                this._clearInteract();
            });
            closeIconButton.addEventListener("touchstart", () => {
                this._clearInteract();
            });
            this._interactElement.shadowRoot.append(closeIconButton);
            const source = document.createElement("source");
            source.setAttribute("type", "audio/mp3");
            source.setAttribute("src", popSoundUrl());
            this._video.replaceChild(source, this._video.firstChild);
            this._video.load();
            this._video.addEventListener("loadeddata", () => {
                this._video.setAttribute("controls", "");
                this._interactElement.removeAttribute("minimal");
                this._interactElement.setAttribute("full", "");
            });
            this._video.addEventListener("play", () => {
                this._video.addEventListener("ended", () => {
                    window.setTimeout(() => {
                        this._videoInteractionResolve();
                        this._audioInteractionResolve();
                    }, 250);
                });
            });
            this._video.addEventListener("error", (e) => {
                this._clearInteract();
                const service = "browser_mod.notification";
                const message = "Browser Mod: error checking ability to play audio.";
                this.callService(service, { message });
                console.log(message, e.toString());
            });
        }
        async setupInteraction() {
            await this.connectionPromise;
            if (!this.registered)
                return;
            this._interactElement = document.createElement("div");
            document.body.append(this._interactElement);
            this._interactElement.classList.add("browser-mod-require-interaction");
            this._interactElement.attachShadow({ mode: "open" });
            const styleEl = document.createElement("style");
            this._interactElement.shadowRoot.append(styleEl);
            styleEl.innerHTML = `
      :host {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        color: var(--warning-color, red);
        opacity: 0.5;
        z-index: 99999;
        --icon-inset: 8px;
        --mdc-icon-size: 48px;
      }
      :host([minimal]) {
        display: grid;
        grid-template-areas: "close" "video" "icon" "text";
        grid-template-rows: min-content 1fr min-content min-content;
      }
      :host([full]) {
        display: grid;
        grid-template-areas: "close" "video" "icon" "text";
        grid-template-rows: min-content 1fr min-content 1fr;
        --mdc-icon-size: 250px;
        opacity: 1.0;
        background: rgba(0,0,0,0.5);
      }
      #tap {
        grid-area: icon;
        justify-self: self-end;
        padding-right: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
      }
      :host([full]) #tap {
        justify-self: center;
        align-self: self-start;
      }
      #close {
        grid-area: close;
        display: none;
      }
      :host([full]) #close {
        display: inherit;
        justify-self: self-start;
        align-self: self-start;
        --mdc-icon-size: 48px;
        color: var(--white-color, white);
        padding-top: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        padding-left: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        --mdc-ripple-hover-opacity: 0.2;
        --mdc-ripple-press-opacity: 0.33;
      }
      span {
        grid-area: text;
        align-self: end;
        justify-self: self-end;
        padding-bottom: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        padding-right: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        font-size: 0.75rem;
      }
      :host([full]) span {
        align-self: self-start;
        justify-self: center;
        font-size: 1.75em;
      }
      video {
        grid-area: video;
        display: none;
      }
      :host([full]) video {
        display: inherit;
        justify-self: center;
        align-self: self-end;
        width: 250px;
        scale: 1.2;
      }
      @media all and (max-width: 450px), all and (max-height: 500px) {
        :host {
          --icon-inset: 20px;
          --mdc-icon-size: 30px;
        }
        #tap {
          padding-bottom: calc(var(--icon-inset) + var(--safe-area-inset-bottom));
        }
        span {
          display: none;
        }
      }
      `;
            this._video = document.createElement("video");
            this._video.setAttribute("playsinline", "");
            const source = document.createElement("source");
            source.setAttribute("type", "video/mp4");
            source.setAttribute("src", blankVideoUrl());
            this._video.append(source);
            this._video.muted = true;
            this._interactElement.shadowRoot.append(this._video);
            this._checkInteraction(() => this.minimalInteraction());
            if (this.fully) {
                this._videoInteractionResolve();
                this._audioInteractionResolve();
            }
            const interactPromisesRequired = this._audioRequired ?
                [this.videoInteraction, this.audioInteraction] : [this.videoInteraction];
            Promise.all(interactPromisesRequired).then(() => {
                this._clearInteract();
            });
        }
    };
};

const FullyMixin = (C) => {
    return class FullyMixinClass extends C {
        get fully() {
            return window.fully !== undefined;
        }
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
        get fully_data() {
            const f = window.fully;
            if (f === undefined)
                return "undefined";
            try {
                return {
                    ip4Address: f.getIp4Address(),
                    ip6Address: f.getIp6Address(),
                    hostname: f.getHostname(),
                    hostname6: f.getHostname6(),
                    macAddress: f.getMacAddress(),
                    wifiSsid: f.getWifiSsid(),
                    wifiBssid: f.getWifiBssid(),
                    wifiSignalLevel: f.getWifiSignalLevel(),
                    serialNumber: f.getSerialNumber(),
                    androidId: f.getAndroidId(),
                    deviceId: f.getDeviceId(),
                    deviceName: f.getDeviceName(),
                    imei: f.getImei(),
                    simSerialNumber: f.getSimSerialNumber(),
                    batteryLevel: f.getBatteryLevel(),
                    screenBrightness: f.getScreenBrightness(),
                    screenOrientation: f.getScreenOrientation(),
                    displayWidth: f.getDisplayWidth(),
                    displayHeight: f.getDisplayHeight(),
                    screenOn: f.getScreenOn(),
                    plugged: f.isPlugged(),
                    keyboardVisible: f.isKeyboardVisible(),
                    wifiEnabled: f.isWifiEnabled(),
                    wifiConnected: f.isWifiConnected(),
                    networkConnected: f.isNetworkConnected(),
                    bluetoothEnabled: f.isBluetoothEnabled(),
                    screenRotationLocked: f.isScreenRotationLocked(),
                    fullyVersion: f.getFullyVersion(),
                    fullyVersionCode: f.getFullyVersionCode(),
                    webViewVersion: f.getWebviewVersion(),
                    androidVersion: f.getAndroidVersion(),
                    androidSdk: f.getAndroidSdk(),
                    deviceModel: f.getDeviceModel(),
                    internalStorageTotalSpace: f.getInternalStorageTotalSpace(),
                    internalStorageFreeSpace: f.getInternalStorageFreeSpace(),
                    externalStorageTotalSpace: f.getExternalStorageTotalSpace(),
                    externalStorageFreeSpace: f.getExternalStorageFreeSpace(),
                    sensorInfo: f.getSensorInfo(),
                    //getSensorValue: f.getSensorValue(),
                    //getSensorValues: f.getSensorValues(),
                    allRxBytesMobile: f.getAllRxBytesMobile(),
                    allTxBytesMobile: f.getAllTxBytesMobile(),
                    allRxBytesWifi: f.getAllRxBytesWifi(),
                    allTxBytesWifi: f.getAllTxBytesWifi(),
                };
            }
            catch (error) {
                return String(error);
            }
        }
        fullyEvent(event = undefined) {
            this.fireBrowserEvent("fully-update", { event });
        }
    };
};

const BrowserStateMixin = (SuperClass) => {
    return class BrowserStateMixinClass extends SuperClass {
        constructor() {
            super();
            document.addEventListener("visibilitychange", () => this._browser_state_update());
            window.addEventListener("location-changed", () => this._browser_state_update());
            window.addEventListener("popstate", () => 
            // Use setTimeout as recommended by https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
            setTimeout(() => {
                this._browser_state_update();
            }, 0));
            this.addEventListener("fully-update", () => this._browser_state_update());
            this.addEventListener("browser-mod-ready", () => this._browser_state_update());
            this.addEventListener("browser-mod-user-ready", () => this._browser_state_update());
            this.connectionPromise.then(() => this._browser_state_update());
            window.addEventListener('resize', debounce(function () {
                this._browser_state_update();
            }.bind(this), 500));
        }
        _browser_state_update() {
            const update = async () => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const battery = navigator.getBattery
                    ? await navigator.getBattery()
                    : undefined;
                this.sendUpdate({
                    browser: {
                        path: window.location.pathname,
                        visibility: document.visibilityState,
                        userAgent: navigator.userAgent,
                        currentUser: (_a = this.user) === null || _a === void 0 ? void 0 : _a.name,
                        fullyKiosk: this.fully || false,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        battery_level: (_c = (_b = window.fully) === null || _b === void 0 ? void 0 : _b.getBatteryLevel()) !== null && _c !== void 0 ? _c : (battery === null || battery === void 0 ? void 0 : battery.level) * 100,
                        charging: (_e = (_d = window.fully) === null || _d === void 0 ? void 0 : _d.isPlugged()) !== null && _e !== void 0 ? _e : battery === null || battery === void 0 ? void 0 : battery.charging,
                        darkMode: (_g = (_f = this.hass) === null || _f === void 0 ? void 0 : _f.themes) === null || _g === void 0 ? void 0 : _g.darkMode,
                        userData: this.user,
                        ip_address: (_h = window.fully) === null || _h === void 0 ? void 0 : _h.getIp4Address(),
                        fully_data: this.fully_data,
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

const VOID       = -1;
const PRIMITIVE  = 0;
const ARRAY      = 1;
const OBJECT     = 2;
const DATE       = 3;
const REGEXP     = 4;
const MAP        = 5;
const SET        = 6;
const ERROR      = 7;
const BIGINT     = 8;
// export const SYMBOL = 9;

const env = typeof self === 'object' ? self : globalThis;

const deserializer = ($, _) => {
  const as = (out, index) => {
    $.set(index, out);
    return out;
  };

  const unpair = index => {
    if ($.has(index))
      return $.get(index);

    const [type, value] = _[index];
    switch (type) {
      case PRIMITIVE:
      case VOID:
        return as(value, index);
      case ARRAY: {
        const arr = as([], index);
        for (const index of value)
          arr.push(unpair(index));
        return arr;
      }
      case OBJECT: {
        const object = as({}, index);
        for (const [key, index] of value)
          object[unpair(key)] = unpair(index);
        return object;
      }
      case DATE:
        return as(new Date(value), index);
      case REGEXP: {
        const {source, flags} = value;
        return as(new RegExp(source, flags), index);
      }
      case MAP: {
        const map = as(new Map, index);
        for (const [key, index] of value)
          map.set(unpair(key), unpair(index));
        return map;
      }
      case SET: {
        const set = as(new Set, index);
        for (const index of value)
          set.add(unpair(index));
        return set;
      }
      case ERROR: {
        const {name, message} = value;
        return as(new env[name](message), index);
      }
      case BIGINT:
        return as(BigInt(value), index);
      case 'BigInt':
        return as(Object(BigInt(value)), index);
      case 'ArrayBuffer':
        return as(new Uint8Array(value).buffer, value);
      case 'DataView': {
        const { buffer } = new Uint8Array(value);
        return as(new DataView(buffer), value);
      }
    }
    return as(new env[type](value), index);
  };

  return unpair;
};

/**
 * @typedef {Array<string,any>} Record a type representation
 */

/**
 * Returns a deserialized value from a serialized array of Records.
 * @param {Record[]} serialized a previously serialized value.
 * @returns {any}
 */
const deserialize = serialized => deserializer(new Map, serialized)(0);

const EMPTY = '';

const {toString} = {};
const {keys} = Object;

const typeOf = value => {
  const type = typeof value;
  if (type !== 'object' || !value)
    return [PRIMITIVE, type];

  const asString = toString.call(value).slice(8, -1);
  switch (asString) {
    case 'Array':
      return [ARRAY, EMPTY];
    case 'Object':
      return [OBJECT, EMPTY];
    case 'Date':
      return [DATE, EMPTY];
    case 'RegExp':
      return [REGEXP, EMPTY];
    case 'Map':
      return [MAP, EMPTY];
    case 'Set':
      return [SET, EMPTY];
    case 'DataView':
      return [ARRAY, asString];
  }

  if (asString.includes('Array'))
    return [ARRAY, asString];

  if (asString.includes('Error'))
    return [ERROR, asString];

  return [OBJECT, asString];
};

const shouldSkip = ([TYPE, type]) => (
  TYPE === PRIMITIVE &&
  (type === 'function' || type === 'symbol')
);

const serializer = (strict, json, $, _) => {

  const as = (out, value) => {
    const index = _.push(out) - 1;
    $.set(value, index);
    return index;
  };

  const pair = value => {
    if ($.has(value))
      return $.get(value);

    let [TYPE, type] = typeOf(value);
    switch (TYPE) {
      case PRIMITIVE: {
        let entry = value;
        switch (type) {
          case 'bigint':
            TYPE = BIGINT;
            entry = value.toString();
            break;
          case 'function':
          case 'symbol':
            if (strict)
              throw new TypeError('unable to serialize ' + type);
            entry = null;
            break;
          case 'undefined':
            return as([VOID], value);
        }
        return as([TYPE, entry], value);
      }
      case ARRAY: {
        if (type) {
          let spread = value;
          if (type === 'DataView') {
            spread = new Uint8Array(value.buffer);
          }
          else if (type === 'ArrayBuffer') {
            spread = new Uint8Array(value);
          }
          return as([type, [...spread]], value);
        }

        const arr = [];
        const index = as([TYPE, arr], value);
        for (const entry of value)
          arr.push(pair(entry));
        return index;
      }
      case OBJECT: {
        if (type) {
          switch (type) {
            case 'BigInt':
              return as([type, value.toString()], value);
            case 'Boolean':
            case 'Number':
            case 'String':
              return as([type, value.valueOf()], value);
          }
        }

        if (json && ('toJSON' in value))
          return pair(value.toJSON());

        const entries = [];
        const index = as([TYPE, entries], value);
        for (const key of keys(value)) {
          if (strict || !shouldSkip(typeOf(value[key])))
            entries.push([pair(key), pair(value[key])]);
        }
        return index;
      }
      case DATE:
        return as([TYPE, value.toISOString()], value);
      case REGEXP: {
        const {source, flags} = value;
        return as([TYPE, {source, flags}], value);
      }
      case MAP: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const [key, entry] of value) {
          if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
            entries.push([pair(key), pair(entry)]);
        }
        return index;
      }
      case SET: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const entry of value) {
          if (strict || !shouldSkip(typeOf(entry)))
            entries.push(pair(entry));
        }
        return index;
      }
    }

    const {message} = value;
    return as([TYPE, {name: type, message}], value);
  };

  return pair;
};

/**
 * @typedef {Array<string,any>} Record a type representation
 */

/**
 * Returns an array of serialized Records.
 * @param {any} value a serializable value.
 * @param {{json?: boolean, lossy?: boolean}?} options an object with a `lossy` or `json` property that,
 *  if `true`, will not throw errors on incompatible types, and behave more
 *  like JSON stringify would behave. Symbol and Function will be discarded.
 * @returns {Record[]}
 */
 const serialize = (value, {json, lossy} = {}) => {
  const _ = [];
  return serializer(!(json || lossy), !!json, new Map, _)(value), _;
};

/**
 * @typedef {Array<string,any>} Record a type representation
 */

/**
 * Returns an array of serialized Records.
 * @param {any} any a serializable value.
 * @param {{transfer?: any[], json?: boolean, lossy?: boolean}?} options an object with
 * a transfer option (ignored when polyfilled) and/or non standard fields that
 * fallback to the polyfill if present.
 * @returns {Record[]}
 */
var structuredClone$1 = typeof structuredClone === "function" ?
  /* c8 ignore start */
  (any, options) => (
    options && ('json' in options || 'lossy' in options) ?
      deserialize(serialize(any, options)) : structuredClone(any)
  ) :
  (any, options) => deserialize(serialize(any, options));

function normaliseCardConfig(card) {
    if (!card)
        return card;
    card = structuredClone$1(card);
    delete card.type;
    if (card.popup_card_id)
        delete card.popup_card_id;
    if (card.entity)
        delete card.entity;
    if (card.target)
        delete card.target;
    return card;
}
function popupCardMatch(card, entity, viewIndex, curView) {
    var _a, _b, _c, _d;
    if (card.type !== 'custom:popup-card')
        return false;
    // Resolve card IDs
    const cardTargetEntityIDs = ensureArray(((_a = card.target) === null || _a === void 0 ? void 0 : _a.entity_id) || []);
    const cardEntityIDs = (card.entity && !cardTargetEntityIDs.includes(card.entity))
        ? [...cardTargetEntityIDs, card.entity]
        : cardTargetEntityIDs;
    const cardAreaIDs = ensureArray(((_b = card.target) === null || _b === void 0 ? void 0 : _b.area_id) || []);
    const cardLabelIDs = ensureArray(((_c = card.target) === null || _c === void 0 ? void 0 : _c.label_id) || []);
    const cardDeviceIDs = ensureArray(((_d = card.target) === null || _d === void 0 ? void 0 : _d.device_id) || []);
    // return match if card is a popup-card and matches the target
    return (cardEntityIDs.some((e) => e === entity.entity_id) ||
        cardAreaIDs.some((a) => a === entity.area_id) ||
        cardLabelIDs.some((l) => entity.labels.includes(l)) ||
        cardDeviceIDs.some((d) => d === entity.device_id))
        &&
            (viewIndex === curView || card.popup_card_all_views);
}
function findPopupCardConfigByEntity(lovelaceRoot, entity_id) {
    var _a, _b;
    const lovelaceConfig = (_a = lovelaceRoot === null || lovelaceRoot === void 0 ? void 0 : lovelaceRoot.lovelace) === null || _a === void 0 ? void 0 : _a.config;
    const hass = lovelaceRoot === null || lovelaceRoot === void 0 ? void 0 : lovelaceRoot.hass;
    if (lovelaceConfig && hass) {
        let entity = hass.entities[entity_id];
        if (!entity) {
            // Support fake entity_id
            entity = { entity_id, area_id: undefined, device_id: undefined, labels: [] };
        }
        const curView = (_b = lovelaceRoot === null || lovelaceRoot === void 0 ? void 0 : lovelaceRoot._curView) !== null && _b !== void 0 ? _b : 0;
        // Place current view at the front of the view index lookup array.
        // This allows the current view to be checked first for local cards, 
        // and then the rest of the views for global cards, keeping current view precedence.
        let viewLookup = Array.from(Array(lovelaceConfig.views.length).keys());
        viewLookup.splice(curView, 1);
        viewLookup.unshift(curView);
        for (const viewIndex of viewLookup) {
            const view = lovelaceConfig.views[viewIndex];
            if (view.cards) {
                for (const card of view.cards) {
                    if (popupCardMatch(card, entity, viewIndex, curView))
                        return normaliseCardConfig(card);
                    // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
                    if (card.cards) {
                        for (const subCard of card.cards) {
                            if (popupCardMatch(subCard, entity, viewIndex, curView))
                                return normaliseCardConfig(subCard);
                        }
                    }
                }
            }
            if (view.sections) {
                for (const section of view.sections) {
                    if (section.cards) {
                        for (const card of section.cards) {
                            if (popupCardMatch(card, entity, viewIndex, curView))
                                return normaliseCardConfig(card);
                            // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
                            if (card.cards) {
                                for (const subCard of card.cards) {
                                    if (popupCardMatch(subCard, entity, viewIndex, curView))
                                        return normaliseCardConfig(subCard);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}
function findCardInConfig(config, card_id) {
    for (const view of config.views) {
        if (view.cards) {
            for (const card of view.cards) {
                if (card.popup_card_id === card_id)
                    return card;
                // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
                if (card.cards) {
                    for (const subCard of card.cards) {
                        if (subCard.popup_card_id === card_id)
                            return subCard;
                    }
                }
            }
        }
        if (view.sections) {
            for (const section of view.sections) {
                if (section.cards) {
                    for (const card of section.cards) {
                        if (card.popup_card_id === card_id)
                            return card;
                        // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
                        if (card.cards) {
                            for (const subCard of card.cards) {
                                if (subCard.popup_card_id === card_id)
                                    return subCard;
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}
async function findPopupCardConfigByID(lovelaceRoot, popup_card_id) {
    var _a;
    const lovelaceConfig = (_a = lovelaceRoot === null || lovelaceRoot === void 0 ? void 0 : lovelaceRoot.lovelace) === null || _a === void 0 ? void 0 : _a.config;
    var card_id = undefined;
    var url_path = undefined;
    if (popup_card_id.includes('/')) {
        [url_path, card_id] = popup_card_id.split('/');
    }
    else {
        card_id = popup_card_id;
    }
    var card = null;
    if (lovelaceConfig && card_id && !url_path) {
        card = findCardInConfig(lovelaceConfig, card_id);
    }
    else if (card_id && url_path) {
        if (window.browser_mod.connection) {
            var response;
            try {
                response = await window.browser_mod.connection.sendMessagePromise({
                    type: "lovelace/config",
                    url_path: url_path,
                });
            }
            catch (error) {
                response = null;
            }
            if (response) {
                card = findCardInConfig(response, card_id);
            }
        }
    }
    return normaliseCardConfig(card);
}

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
                "set_popup_style",
                "notification",
                "navigate",
                "refresh",
                "change_browser_id",
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
            this._service_action({ service, data, target: {} });
        }
        async _service_action({ service, data, target }) {
            var _a, _b, _c;
            if (data === undefined)
                data = {};
            if (!service) {
                console.error("Browser Mod: Service parameter not specified in service call.");
                return;
            }
            let _service = service;
            if ((!_service.startsWith("browser_mod.") && _service.includes(".")) ||
                data.browser_id !== undefined || data.user_id !== undefined) {
                const d = Object.assign({}, data);
                const t = Object.assign({}, target);
                if (d.browser_id === "THIS")
                    d.browser_id = this.browserID;
                if (d.user_id === "THIS" && this.user)
                    d.user_id = this.user.id;
                if (d.browser_entities === "THIS")
                    d.browser_entities = this.browserEntities;
                // CALL HOME ASSISTANT SERVICE
                const [domain, srv] = _service.split(".");
                return this.hass.callService(domain, srv, d, t);
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
                    const { entity, view, large, ignore_popup_card } = data;
                    this.showMoreInfo(entity, view, large, ignore_popup_card);
                    break;
                case "popup":
                    if (data.popup_card_id) {
                        const lovelaceRoot = await getLovelaceRoot(document);
                        const popupCard = await findPopupCardConfigByID(lovelaceRoot, data.popup_card_id);
                        if (popupCard) {
                            let properties = Object.assign({}, popupCard);
                            delete properties.card;
                            data = Object.assign(Object.assign({ content: popupCard.card }, properties), data);
                        }
                    }
                    // Promote icon actions to data so they can be made callable
                    // by the following code
                    if (data.icons) {
                        data.icons.forEach((icon, index) => {
                            data[`icon_${index}_action`] = icon.action;
                        });
                    }
                    const { title, content } = data, d = __rest(data, ["title", "content"]);
                    for (const [k, v] of Object.entries(d)) {
                        if (k.endsWith("_action")) {
                            let actions = v; // Force Closure. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures#creating_closures_in_loops_a_common_mistake
                            d[k] = (ext_data) => {
                                if (!Array.isArray(actions)) {
                                    actions = [actions];
                                }
                                actions.forEach((actionItem) => {
                                    var { action, service, target, data } = actionItem;
                                    service = (action === undefined || action === "call-service") ? service : action;
                                    this._service_action({
                                        service,
                                        target,
                                        data: Object.assign(Object.assign({}, data), ext_data),
                                    });
                                });
                            };
                        }
                    }
                    // Move icon actions back to icons
                    if (d.icons) {
                        // Need to clone to be able to update icons array
                        d.icons = structuredClone$1(d.icons);
                        d.icons.forEach((icon, index) => {
                            d.icons[index].action = d[`icon_${index}_action`];
                            delete d[`icon_${index}_action`];
                        });
                    }
                    this.showPopup(Object.assign({ title, content }, d));
                    break;
                case "notification":
                    {
                        data.action_action = data.action;
                        delete data.action;
                        var { message, action_text, action_action, duration, dismissable } = data;
                        let act = undefined;
                        if (action_text && action_text.trim()) {
                            act = {
                                text: action_text,
                                action: (ext_data) => {
                                    if (action_action && action_text) {
                                        if (!Array.isArray(action_action)) {
                                            action_action = [action_action];
                                        }
                                        action_action.forEach((actionItem) => {
                                            var { action, service, target, data } = actionItem;
                                            service = (action === undefined || action === "call-service") ? service : action;
                                            this._service_action({
                                                service,
                                                target,
                                                data: Object.assign(Object.assign({}, data), ext_data),
                                            });
                                        });
                                    }
                                }
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
                    await this.closePopup(data);
                    break;
                case "set_popup_style":
                    this.setPopupStyle(data);
                    break;
                case "navigate":
                    this.browser_navigate(data.path);
                    break;
                case "refresh":
                    {
                        if (window.caches) {
                            let cacheDeletePromises = [];
                            const cacheNames = await window.caches.keys();
                            cacheNames.forEach((cacheName) => {
                                cacheDeletePromises.push(window.caches.delete(cacheName));
                            });
                            await Promise.all(cacheDeletePromises);
                            window.location.reload();
                        }
                        else {
                            window.location.href = window.location.href;
                        }
                    }
                    break;
                case "change_browser_id":
                    {
                        const { current_browser_id, new_browser_id, register, refresh } = data;
                        if (current_browser_id === undefined && new_browser_id === undefined) {
                            const title = "Change Browser ID";
                            const browsers = Object.keys(this.browsers);
                            const content = [
                                {
                                    name: "current_browser_id",
                                    label: "Current Browser ID",
                                    selector: { text: null },
                                    default: this.browserID,
                                    disabled: true,
                                },
                                {
                                    name: "new_browser_id",
                                    label: "New Browser ID",
                                    selector: {
                                        select: { options: browsers, custom_value: true, sort: true }
                                    },
                                },
                                {
                                    name: "register",
                                    label: "Register",
                                    selector: {
                                        boolean: null
                                    },
                                    default: this.registered,
                                },
                                {
                                    name: "refresh",
                                    label: "Refresh",
                                    selector: {
                                        boolean: null
                                    },
                                    default: refresh !== null && refresh !== void 0 ? refresh : true,
                                }
                            ];
                            const buttons = {
                                left_button: "Cancel",
                                right_button: "Change",
                                right_button_variant: "danger",
                                right_button_appearance: "accent",
                                right_button_action: (form_data) => {
                                    this.fireBrowserEvent("command-change_browser_id", form_data);
                                }
                            };
                            (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.showPopup(Object.assign({ title, content }, buttons));
                        }
                        else {
                            let match = false;
                            if (current_browser_id && this.browserID === current_browser_id) {
                                match = true;
                            }
                            else {
                                const identifiers = (_c = (_b = this.hass) === null || _b === void 0 ? void 0 : _b.devices[current_browser_id]) === null || _c === void 0 ? void 0 : _c.identifiers;
                                if (Array.isArray(identifiers) &&
                                    identifiers.length > 0 &&
                                    Array.isArray(identifiers[0]) &&
                                    identifiers[0].includes(this.browserID)) {
                                    match = true;
                                }
                            }
                            if (match) {
                                if (new_browser_id && typeof new_browser_id === "string") {
                                    const trimmed_new_browser_id = new_browser_id.trim();
                                    if (trimmed_new_browser_id !== "" && trimmed_new_browser_id !== this.browserID) {
                                        this.browserID = trimmed_new_browser_id;
                                    }
                                }
                                if (register !== undefined && this.registered !== register) {
                                    this.registered = register;
                                }
                                if (refresh) {
                                    window.setTimeout(() => {
                                        this.fireBrowserEvent("command-refresh", {});
                                    }, 100);
                                }
                            }
                        }
                    }
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
                        let root = await getLovelaceRoot(document);
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

const FULLY_ACTIVITY_EVENTS = ["onMotion"];
const ActivityMixin = (SuperClass) => {
    return class ActivityMixinClass extends SuperClass {
        constructor() {
            super();
            this.activityTriggered = false;
            this._activityCooldown = 15000;
            for (const ev of ["pointerdown", "pointermove", "keydown"]) {
                window.addEventListener(ev, () => this.activityTrigger(true));
            }
            this.addEventListener("fully-update", (ev) => {
                var _a, _b;
                if (FULLY_ACTIVITY_EVENTS.includes((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.event)) {
                    this.activityTrigger(false, `fully${capitalize((_b = ev.detail) === null || _b === void 0 ? void 0 : _b.event)}`);
                }
            });
            this.addEventListener("browser-mod-ready", () => this._activity_state_update());
        }
        _activity_state_update() {
            this.sendUpdate({ activity: this.activityTriggered });
        }
        activityTrigger(touched = false, activityType = "userInteraction") {
            if (!this.activityTriggered) {
                this.sendUpdate({
                    activity: true,
                    activityType: activityType,
                });
            }
            this.activityTriggered = true;
            if (touched) {
                this.fireBrowserEvent("browser-mod-activity");
            }
            clearTimeout(this._activityTimeout);
            this._activityTimeout = setTimeout(() => this.activityReset(), this._activityCooldown);
        }
        activityReset() {
            clearTimeout(this._activityTimeout);
            if (this.activityTriggered) {
                this.sendUpdate({
                    activity: false,
                    activityType: "none"
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
 */class e extends i{constructor(i){if(super(i),this.et=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this.ft=void 0,this.et=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:l$1}=j,r=()=>document.createComment(""),c$1=(o,i,n)=>{var t;const v=o._$AA.parentNode,d=void 0===i?o._$AB:i._$AA;if(void 0===n){const i=v.insertBefore(r(),d),t=v.insertBefore(r(),d);n=new l$1(i,t,o,o.options);}else {const l=n._$AB.nextSibling,i=n._$AM,u=i!==o;if(u){let l;null===(t=n._$AQ)||void 0===t||t.call(n,o),n._$AM=o,void 0!==n._$AP&&(l=o._$AU)!==i._$AU&&n._$AP(l);}if(l!==d||u){let o=n._$AA;for(;o!==l;){const l=o.nextSibling;v.insertBefore(o,d),o=l;}}}return n},f=(o,l,i=o)=>(o._$AI(l,i),o),s={},a=(o,l=s)=>o._$AH=l,m=o=>o._$AH,p=o=>{var l;null===(l=o._$AP)||void 0===l||l.call(o,!1,!0);let i=o._$AA;const n=o._$AB.nextSibling;for(;i!==n;){const o=i.nextSibling;i.remove(),i=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=e$1(class extends i{constructor(e){if(super(e),e.type!==t.CHILD)throw Error("repeat() can only be used in text expressions")}ct(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.ct(e,s,t).values}update(s,[t,r,c]){var d;const a$1=m(s),{values:p$1,keys:v}=this.ct(t,r,c);if(!Array.isArray(a$1))return this.ut=v,p$1;const h=null!==(d=this.ut)&&void 0!==d?d:this.ut=[],m$1=[];let y,x,j=0,k=a$1.length-1,w=0,A=p$1.length-1;for(;j<=k&&w<=A;)if(null===a$1[j])j++;else if(null===a$1[k])k--;else if(h[j]===v[w])m$1[w]=f(a$1[j],p$1[w]),j++,w++;else if(h[k]===v[A])m$1[A]=f(a$1[k],p$1[A]),k--,A--;else if(h[j]===v[A])m$1[A]=f(a$1[j],p$1[A]),c$1(s,m$1[A+1],a$1[j]),j++,A--;else if(h[k]===v[w])m$1[w]=f(a$1[k],p$1[w]),c$1(s,a$1[j],a$1[k]),k--,w++;else if(void 0===y&&(y=u(v,w,A),x=u(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x.get(v[w]),t=void 0!==e?a$1[e]:null;if(null===t){const e=c$1(s,a$1[j]);f(e,p$1[w]),m$1[w]=e;}else m$1[w]=f(t,p$1[w]),c$1(s,a$1[j],t),a$1[e]=null;w++;}else p(a$1[k]),k--;else p(a$1[j]),j++;for(;w<=A;){const e=c$1(s,m$1[A+1]);f(e,p$1[w]),m$1[w++]=e;}for(;j<=k;){const e=a$1[j++];null!==e&&p(e);}return this.ut=v,a(s,m$1),T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=l=>null!=l?l:A;

class ObjectSelectorMonitor {
    constructor(element, settingsValidCallback, showErrorsCallback) {
        this._settingsValid = true;
        this._showErrors = false;
        this._objectSelectors = undefined;
        this._debounceShowErrors = debounce(() => {
            if (!this._settingsValid) {
                this.showErrors = true;
            }
        }, 2000);
        this._formObjectSelectors = (form) => {
            var _a, _b;
            var objectSelectors = [];
            const selectors = (_a = form === null || form === void 0 ? void 0 : form.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll("ha-selector");
            selectors === null || selectors === void 0 ? void 0 : selectors.forEach((selector) => {
                if (selector === null || selector === void 0 ? void 0 : selector.selector.hasOwnProperty("object")) {
                    const objectSelector = {
                        element: selector,
                        name: selector.name,
                        label: selector.label,
                    };
                    objectSelectors.push(objectSelector);
                }
            });
            const elements = (_b = form === null || form === void 0 ? void 0 : form.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelectorAll("ha-form-grid, ha-form-expandable");
            elements === null || elements === void 0 ? void 0 : elements.forEach((element) => {
                if (element.shadowRoot) {
                    const forms = element.shadowRoot.querySelectorAll("ha-form");
                    forms.forEach((subForm) => {
                        const subSelectors = this._formObjectSelectors(subForm);
                        objectSelectors.push(...subSelectors);
                    });
                }
            });
            return objectSelectors;
        };
        this.element = element;
        this._settingsValidCallback = settingsValidCallback;
        this._showErrorsCallback = showErrorsCallback;
    }
    get objectSelectors() {
        var _a;
        return (_a = this._objectSelectors) !== null && _a !== void 0 ? _a : [];
    }
    set showErrors(value) {
        var _a;
        this._showErrors = value;
        (_a = this._showErrorsCallback) === null || _a === void 0 ? void 0 : _a.call(this, value);
    }
    get showErrors() {
        return this._showErrors;
    }
    set settingsValid(value) {
        var _a;
        this._settingsValid = value;
        (_a = this._settingsValidCallback) === null || _a === void 0 ? void 0 : _a.call(this, value);
    }
    get settingsValid() {
        return this._settingsValid;
    }
    startMonitoring() {
        var _a, _b;
        if (this._objectSelectors === undefined) {
            this._objectSelectors = this._formObjectSelectors((_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("ha-form"));
        }
        this.objectSelectors.map((selector) => {
            var _a;
            (_a = selector.element) === null || _a === void 0 ? void 0 : _a.addEventListener("value-changed", (ev) => {
                selector.isValid = ev.detail.isValid;
                selector.errorMsg = ev.detail.errorMsg;
                this.settingsValid = this.objectSelectors.every((s) => s.isValid !== false);
                if (this.settingsValid) {
                    this.showErrors = false;
                    this._debounceShowErrors.cancel();
                }
                else {
                    this._debounceShowErrors();
                }
            }, { capture: true });
        });
    }
    stopMonitoring() {
        this.objectSelectors.map((selector) => {
            var _a;
            (_a = selector.element) === null || _a === void 0 ? void 0 : _a.removeEventListener("value-changed", () => { });
        });
        this.showErrors = false;
        this.settingsValid = true;
        this._objectSelectors = undefined;
        this._debounceShowErrors.cancel();
    }
}

class BrowserModPopup extends s$1 {
    connectedCallback() {
        super.connectedCallback();
        this._objectSelectorMonitor = new ObjectSelectorMonitor(this, (value) => { this._formDataValid = value; });
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has("_styleAttributes")) {
            Object.keys(this._styleAttributes).forEach((key) => {
                if (this._styleAttributes[key]) {
                    key.split(" ").forEach((k) => this.setAttribute(k, ""));
                }
                else {
                    key.split(" ").forEach((k) => this.removeAttribute(k));
                }
            });
        }
    }
    async showDialog(args) {
        const title = args.title;
        const content = args.content;
        if (args.title)
            delete args.title;
        if (args.content)
            delete args.content;
        await this.setupDialog(title, content, args);
        this.openDialog();
    }
    async closeDialog() {
        var _a, _b, _c, _d, _e;
        if (!this.open)
            return true;
        this.open = false;
        this._objectSelectorMonitor.stopMonitoring();
        (_b = (_a = this.card) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.card = undefined;
        clearInterval(this._timeoutTimer);
        if (this._autocloseListener) {
            window.browser_mod.removeEventListener("browser-mod-activity", this._autocloseListener);
            this._autocloseListener = undefined;
        }
        (_d = (_c = this._actions) === null || _c === void 0 ? void 0 : _c.dismiss_action) === null || _d === void 0 ? void 0 : _d.call(_c);
        if ((_e = this._cardMod) === null || _e === void 0 ? void 0 : _e[0]) {
            this._cardMod[0].styles = "";
        }
        window.browser_mod.dispatchEvent(new CustomEvent("browser-mod-popup-closed", {
            detail: {
                popup: this,
            },
        }));
        Object.keys(this._styleAttributes).forEach((key) => {
            key.split(" ").forEach((k) => this.removeAttribute(k));
        });
        this._styleAttributes = [];
        this._styleSequenceIndex = undefined;
        return true;
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
                if (!this.timeout_hide_progress) {
                    this.style.setProperty("--progress", `${progress}%`);
                }
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
            var _a, _b, _c, _d, _e, _f, _g;
            (_b = (_a = customElements.get("card-mod")) === null || _a === void 0 ? void 0 : _a.applyToElement) === null || _b === void 0 ? void 0 : _b.call(_a, this, this.tag ? `browser-mod-popup-${this.tag}` : "more-info", ((_c = this.card_mod) === null || _c === void 0 ? void 0 : _c.style) ?
                { style: this.card_mod.style, debug: (_e = (_d = this.card_mod) === null || _d === void 0 ? void 0 : _d.debug) !== null && _e !== void 0 ? _e : false } :
                { style: "{}", debug: (_g = (_f = this.card_mod) === null || _f === void 0 ? void 0 : _f.debug) !== null && _g !== void 0 ? _g : false }, {}, true, "browser_mod-card_mod");
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
            border: none !important;
          }`;
                    el.appendChild(styleEl);
                });
            }
            if (this._formdata) {
                setTimeout(() => this._objectSelectorMonitor.startMonitoring(), 0);
            }
        });
        window.browser_mod.dispatchEvent(new CustomEvent("browser-mod-popup-opened", {
            detail: {
                popup: this,
            },
        }));
    }
    _updateStyleAttributes(newStyle) {
        var _a;
        if (newStyle == "initial")
            newStyle = this._initialStyle;
        // Clear previous style attributes
        Object.keys(this._styleAttributes).forEach((key) => {
            this._styleAttributes[key] = false;
        });
        this._styleAttributes[newStyle] = true;
        (_a = this._popupStyles) === null || _a === void 0 ? void 0 : _a.forEach((style) => {
            var _a;
            if (style.style === newStyle) {
                (_a = style.include_styles) === null || _a === void 0 ? void 0 : _a.forEach((s) => {
                    this._styleAttributes[s] = true;
                });
            }
        });
        // Copy array so lit picks up change
        this._styleAttributes = structuredClone(this._styleAttributes);
    }
    _setStyleAttribute(newStyle) {
        this._updateStyleAttributes(newStyle);
        this._styleSequenceIndex = this._styleSequence.indexOf(newStyle);
    }
    _cycleStyleAttributes(dir = "forward") {
        if (dir === "forward") {
            this._styleSequenceIndex = (this._styleSequenceIndex + 1) % this._styleSequence.length;
        }
        else {
            this._styleSequenceIndex = (this._styleSequenceIndex - 1 + this._styleSequence.length) % this._styleSequence.length;
        }
        this._updateStyleAttributes(this._styleSequence[this._styleSequenceIndex]);
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
    _setFormdata(schema) {
        for (const i of schema) {
            if (i["schema"]) {
                this._setFormdata(i["schema"]);
            }
            else if (i.name && i.default !== undefined) {
                this._formdata[i.name] = i.default;
            }
        }
    }
    async setupDialog(title, content, { right_button = undefined, right_button_variant = "brand", right_button_appearance = "plain", right_button_action = undefined, right_button_close = true, left_button = undefined, left_button_variant = "brand", left_button_appearance = "plain", left_button_action = undefined, left_button_close = true, dismissable = true, dismiss_action = undefined, timeout = undefined, timeout_action = undefined, timeout_hide_progress = undefined, size = undefined, initial_style = undefined, style = undefined, autoclose = false, card_mod = undefined, icon = undefined, icon_title = undefined, icon_action = undefined, icon_close = true, icon_class = undefined, icons = undefined, dismiss_icon = undefined, tag = undefined, popup_styles = undefined, style_sequence = undefined, } = {}) {
        var _a;
        this._formdata = undefined;
        this._formDataValid = true;
        this.title = title;
        this.card = undefined;
        this.card_mod = card_mod;
        this._initialStyle = (_a = initial_style !== null && initial_style !== void 0 ? initial_style : size) !== null && _a !== void 0 ? _a : "normal";
        this._styleAttributes = [];
        this._popupStyles = popup_styles;
        this._styleSequence = ensureArray(style_sequence !== null && style_sequence !== void 0 ? style_sequence : []);
        this._styleSequence = this._styleSequence.length > 0 ? this._styleSequence : ["wide", "normal"];
        this._setStyleAttribute(this._initialStyle);
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
            this._setFormdata(content);
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
            this.content = form;
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
        this.right_button_variant = right_button_variant;
        this.right_button_appearance = right_button_appearance;
        this.right_button_close = right_button_close;
        this.left_button = left_button;
        this.left_button_variant = left_button_variant;
        this.left_button_appearance = left_button_appearance;
        this.right_button_close = right_button_close;
        this.left_button = left_button;
        this.left_button_variant = left_button_variant;
        this.left_button_appearance = left_button_appearance;
        this.left_button_close = left_button_close;
        this.actions = right_button === undefined ? undefined : "";
        this.dismissable = dismissable;
        this.dismiss_icon = dismiss_icon;
        this.timeout = timeout;
        this.timeout_hide_progress = timeout_hide_progress;
        this._actions = {
            right_button_action,
            left_button_action,
            dismiss_action,
            timeout_action,
        };
        this.tag = tag;
        this._style = style;
        this._autoclose = autoclose;
        if (icons) {
            this.icons = [];
            const iconDefaults = {
                icon: undefined,
                title: undefined,
                action: undefined,
                close: true,
                class: undefined
            };
            icons.forEach((icon, index) => {
                this.icons[index] = Object.assign(Object.assign({}, iconDefaults), icon);
            });
        }
        else if (icon) {
            this.icons = [
                {
                    icon: icon,
                    title: icon_title,
                    action: icon_action,
                    close: icon_close,
                    class: icon_class,
                }
            ];
        }
        else {
            this.icons = [];
        }
    }
    async do_close() {
        var _a, _b, _c;
        const action = (_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action;
        if ((_b = this._actions) === null || _b === void 0 ? void 0 : _b.dismiss_action)
            this._actions.dismiss_action = undefined;
        await ((_c = this.dialog) === null || _c === void 0 ? void 0 : _c.close());
        action === null || action === void 0 ? void 0 : action(this._formdata);
        this._objectSelectorMonitor.stopMonitoring();
    }
    async _primary() {
        var _a, _b, _c;
        if ((_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action)
            this._actions.dismiss_action = undefined;
        if (this.right_button_close === true)
            await this.do_close();
        (_c = (_b = this._actions) === null || _b === void 0 ? void 0 : _b.right_button_action) === null || _c === void 0 ? void 0 : _c.call(_b, this._formdata);
    }
    async _secondary() {
        var _a, _b, _c;
        if ((_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action)
            this._actions.dismiss_action = undefined;
        if (this.left_button_close === true)
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
    async _icon_action(index) {
        var _a, _b, _c, _d, _e, _f;
        if ((_a = this._actions) === null || _a === void 0 ? void 0 : _a.dismiss_action)
            this._actions.dismiss_action = undefined;
        if ((_c = (_b = this.icons) === null || _b === void 0 ? void 0 : _b[index]) === null || _c === void 0 ? void 0 : _c.close)
            await this.do_close();
        await ((_f = (_e = (_d = this.icons) === null || _d === void 0 ? void 0 : _d[index]) === null || _e === void 0 ? void 0 : _e.action) === null || _f === void 0 ? void 0 : _f.call(_e));
    }
    render() {
        if (!this.open)
            return x ``;
        return x `
      <ha-dialog
        open
        @closed=${this.closeDialog}
        .heading=${this.title !== undefined}
        hideActions
        flexContent
        .scrimClickAction=${this.dismissable ? "close" : ""}
        .escapeKeyAction=${this.dismissable ? "close" : ""}
      >
        ${this.timeout && !this.timeout_hide_progress
            ? x ` <div slot="heading" class="progress"></div> `
            : ""}
        ${this.title
            ? x `
              <ha-dialog-header slot="heading">
                ${this.dismissable
                ? x `
                      <ha-icon-button
                        dialogAction="cancel"
                        slot="navigationIcon"
                      >
                        <ha-icon 
                          .icon=${this.dismiss_icon || "mdi:close"}>
                        </ha-icon>
                      </ha-icon-button>
                    `
                : ""}
                <span 
                  slot="title" 
                  @click=${() => { this._cycleStyleAttributes(); }} 
                  .title="${this.title}"
                  class="title"
                >${this.title}</span>
                ${this.icons
                ?
                    c(this.icons, (icon, index) => {
                        var _a;
                        return x `
                        <ha-icon-button
                          slot="actionItems"
                          title=${(_a = icon.title) !== null && _a !== void 0 ? _a : ""}
                          @click=${() => { this.blur(); this._icon_action(index); }}
                          class=${l(icon.class)}
                        >
                          <ha-icon .icon=${icon.icon}></ha-icon>
                        </ha-icon-button>
                      `;
                    })
                : ""}
              </ha-dialog-header>
            `
            : x ``}

        <div class="content" tabindex="-1" dialogInitialFocus>
          <div class="container">${this.content}</div>
          ${this.right_button !== undefined || this.left_button !== undefined
            ? x `
                <div class="buttons">
                  ${this.left_button !== undefined
                ? x `
                        <ha-button
                          variant=${this.left_button_variant}
                          appearance=${this.left_button_appearance}
                          @click=${this._secondary}
                          class="action-button"
                        >${this.left_button}</ha-button>
                      `
                : x `<div></div>`}
                  ${this.right_button !== undefined
                ? x `
                        <ha-button
                          variant=${this.right_button_variant}
                          appearance=${this.right_button_appearance}
                          @click=${this._primary}
                          class="action-button"
                          ?disabled=${!this._formDataValid}
                        >${this.right_button}</ha-button>
                      `
                : ""}
                </div>
              `
            : ""}
        </div>
        <style>
          ${this.getDynamicStyles()}
        </style>
      </ha-dialog>
    `;
    }
    getDynamicStyles() {
        var _a, _b;
        const styles = `
      :host {
        ${(_a = this._style) !== null && _a !== void 0 ? _a : ""}
      }
      ${(_b = this._popupStyles) === null || _b === void 0 ? void 0 : _b.filter((style) => style.styles).map((style) => style.style == 'all' ?
            `:host {
          ${style.styles}
        }` :
            `:host([${style.style}]) {
          ${style.styles}
        }`).join("\n")}
    `;
        return styles;
    }
    static get styles() {
        return i$4 `
      /* Classes from haStyleDialog */
      ha-dialog {
        --mdc-dialog-min-width: var(--popup-min-width, 560px);
        --mdc-dialog-max-width: var(--popup-max-width, 600px);
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
        --vertical-align-dialog: flex-start;
        --dialog-surface-margin-top: 40px;
        --dialog-content-padding: 0;

        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
        --padding-x: var(--popup-padding-x, 24px);
        --padding-y: var(--popup-padding-y, 20px);
      }
      .content {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-focus-ring-color: rgba(0, 0, 0, 0);
        outline: none !important;
      }
      .content .container {
        padding: 8px 24px 20px 24px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-focus-ring-color: rgba(0, 0, 0, 0);
        outline: none !important;
      }
      :host([card]) .content .container {
        padding: 8px 8px 20px 8px;
      }
      .content .buttons {
        box-sizing: border-box;
        display: flex;
        padding: 8px 16px 8px 24px;
        justify-content: space-between;
        padding-bottom: 8px;
        background-color: var(--ha-dialog-surface-background, var(--mdc-theme-surface, #fff));
        border-top: 1px solid var(--divider-color);
        position: sticky;
        bottom: 0px;
      }
      .progress {
        position: relative;
      }

      .progress::before {
        content: "";
        position: absolute;
        left: 0;
        width: calc(100% - var(--progress, 60%));
        top: 0;
        height: 5px;
        background: var(--primary-color);
        z-index: 10;
      }
      .title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        -webkit-user-select: none;
        user-select: none;
        color: var(--primary-text-color);
      }

      ha-icon-button > * {
        display: flex;
      }

      ha-dialog-header > span {
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: default;
      }

      :host([wide]) ha-dialog {
        --mdc-dialog-max-width: 90vw;
      }
      :host([wide]) .content {
        width: calc(90vw - 2 * var(--padding-x));
      }

      :host([classic]) ha-dialog {
        --dialog-surface-margin-top: 40px;
        --mdc-dialog-min-height: 10%;
        --mdc-dialog-max-height: 100%;
        --vertical-align-dialog: flex-start;
        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
      }

      :host([fullscreen]) ha-dialog {
        --mdc-dialog-min-width: 100vw;
        --mdc-dialog-max-width: 100vw;
        --mdc-dialog-min-height: 100%;
        --mdc-dialog-max-height: 100%;
        --mdc-shape-medium: 0px;
        --vertical-align-dialog: flex-end;
        --ha-dialog-border-radius: 0px;
        --dialog-surface-margin-top: 0px;
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
          --mdc-dialog-min-height: 100%;
          --mdc-dialog-max-height: 100%;
          --vertical-align-dialog: flex-end;
          --ha-dialog-border-radius: 0;
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
    n$2()
], BrowserModPopup.prototype, "open", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "content", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "title", void 0);
__decorate([
    n$2({ reflect: true })
], BrowserModPopup.prototype, "actions", void 0);
__decorate([
    n$2({ reflect: true })
], BrowserModPopup.prototype, "card", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "right_button", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "right_button_variant", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "right_button_appearance", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "right_button_close", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "left_button", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "left_button_variant", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "left_button_appearance", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "left_button_close", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "dismissable", void 0);
__decorate([
    n$2({ type: Array })
], BrowserModPopup.prototype, "icons", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "tag", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "dismiss_icon", void 0);
__decorate([
    n$2({ reflect: true })
], BrowserModPopup.prototype, "timeout_hide_progress", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "_style", void 0);
__decorate([
    n$2()
], BrowserModPopup.prototype, "_formDataValid", void 0);
__decorate([
    n$2({ type: Array })
], BrowserModPopup.prototype, "_styleAttributes", void 0);
__decorate([
    i$1("ha-dialog")
], BrowserModPopup.prototype, "dialog", void 0);

const PopupMixin = (SuperClass) => {
    return class PopupMixinClass extends SuperClass {
        constructor() {
            super();
            this._popupElements = [];
            this.popupStateListener = (ev) => {
                var _a;
                const popup = (_a = ev.detail) === null || _a === void 0 ? void 0 : _a.popup;
                if (!popup)
                    return;
                if (ev.type === "browser-mod-popup-closed" || this._popupElements.includes(popup)) {
                    this._popupElements = this._popupElements.filter((p) => p !== popup);
                }
                if (ev.type === "browser-mod-popup-opened") {
                    this._popupElements.push(popup);
                }
            };
            loadLoadCardHelpers();
            this.addEventListener("browser-mod-popup-opened", this.popupStateListener);
            this.addEventListener("browser-mod-popup-closed", this.popupStateListener);
            this._popupState = false;
        }
        get popupState() {
            return this._popupElements.some((popup) => popup.open === true);
        }
        showPopup(params) {
            (async () => {
                const base = await hass_base_el();
                const dialogTag = params.tag ?
                    `browser-mod-popup-${params.tag}` : "browser-mod-popup";
                showBrowserModPopup(base, dialogTag, params);
            })();
        }
        async closePopup(args) {
            var _a;
            const { all, tag } = args;
            if (all === true) {
                this._popupElements.forEach((popup) => popup.closeDialog());
                this._popupElements = [];
            }
            else if (typeof tag === "string") {
                const dialogTag = tag != "" ?
                    `browser-mod-popup-${tag}` :
                    "browser-mod-popup";
                const popup = this._popupElements.find((p) => p.nodeName.toLowerCase() === dialogTag);
                popup === null || popup === void 0 ? void 0 : popup.closeDialog();
            }
            else {
                (_a = this._popupElements.pop()) === null || _a === void 0 ? void 0 : _a.closeDialog();
            }
        }
        async showMoreInfo(entityId, view = "info", large = false, ignore_popup_card = undefined) {
            const base = await hass_base_el();
            base.dispatchEvent(new CustomEvent("hass-more-info", {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: { entityId, view, ignore_popup_card },
            }));
            if (large) {
                await new Promise((resolve) => setTimeout(resolve, 50));
                const dialog = base.shadowRoot.querySelector("ha-more-info-dialog");
                if (dialog)
                    dialog.large = true;
            }
        }
        setPopupStyle(args) {
            const { all, tag, style, direction } = args;
            if (all === true) {
                this._popupElements.forEach((popup) => {
                    style ? popup._setStyleAttribute(style) : popup._cycleStyleAttributes(direction);
                });
            }
            else if (typeof tag === "string") {
                const dialogTag = tag != "" ?
                    `browser-mod-popup-${tag}` :
                    "browser-mod-popup";
                const popup = this._popupElements.find((p) => p.nodeName.toLowerCase() === dialogTag);
                style ? popup === null || popup === void 0 ? void 0 : popup._setStyleAttribute(style) : popup === null || popup === void 0 ? void 0 : popup._cycleStyleAttributes(direction);
            }
            else {
                const popup = this._popupElements.slice(-1)[0];
                style ? popup === null || popup === void 0 ? void 0 : popup._setStyleAttribute(style) : popup === null || popup === void 0 ? void 0 : popup._cycleStyleAttributes(direction);
            }
        }
    };
};
const customElementClassCache = {};
function setCustomElementClass(dialogTag) {
    if (customElementClassCache[dialogTag]) {
        return;
    }
    // Dynamically create a new class extending BrowserModPopup
    class DynamicPopup extends BrowserModPopup {
    }
    // Register the custom element if not already defined
    if (!customElements.get(dialogTag)) {
        customElements.define(dialogTag, DynamicPopup);
    }
    customElementClassCache[dialogTag] = DynamicPopup;
}
const showBrowserModPopup = (element, dialogTag, BrowserModPopupParams) => {
    setCustomElementClass(dialogTag);
    element.dispatchEvent(new CustomEvent("show-dialog", {
        detail: {
            dialogTag,
            dialogImport: () => { return customElements.whenDefined(dialogTag); },
            dialogParams: BrowserModPopupParams,
        }
    }));
};

var name = "browser_mod";
var version = "2.6.7-alpha.3";
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
	"@babel/core": "^7.21.4",
	"@rollup/plugin-babel": "^5.3.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.3.0",
	"@types/ungap__structured-clone": "^1.2.0",
	"@ungap/structured-clone": "^1.3.0",
	lit: "^2.7.2",
	rollup: "^2.79.2",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.32.1",
	typescript: "^4.9.5"
};
var dependencies = {
	"@watchable/unpromise": "^1.0.2"
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

const STANDARD_POPUP_STYLES = ["normal", "classic", "wide", "fullscreen"];
const configSchema = [
    {
        name: "popup_card_id",
        label: "Popup-card ID",
        selector: { text: {} },
    },
    {
        name: "target",
        label: "Targets",
        selector: { target: {} },
    },
    {
        name: "entity",
        label: "Entity (deprecated, use target instead)",
        selector: { entity: {} },
    },
    {
        name: "title",
        label: "Title",
        selector: { text: {} },
    },
    {
        type: "expandable",
        label: "Header icon",
        schema: [
            {
                label: "Multiple icons can be specified as a yaml list. Refer to Browser Mod documentation.",
                type: "constant",
            },
            {
                name: "icon",
                label: "Icon",
                selector: { icon: {} },
            },
            {
                name: "icon_title",
                label: "Icon title",
                selector: { text: {} },
            },
            {
                name: "icon_action",
                label: "Icon action",
                selector: { object: {} },
            },
            {
                name: "icon_close",
                label: "Icon closes popup",
                default: true,
                selector: { boolean: {} },
            },
            {
                name: "icon_class",
                label: "Icon class",
                selector: { text: {} }
            }
        ]
    },
    {
        type: "expandable",
        label: "Popup styles",
        schema: [
            {
                label: `Multiple popup styles can be applied for use with title tap or
        \`browser_mod.set_popup_style\`. You may add styles for \`normal\`, \`classic\`,
        \`wide\`, \`fullscreen\` or add your own style. Two special styles of \`all\` and  \`card\`
        are also available. \`all\` is always applied. \`card\` is applied when the popup content is a card.`,
                type: "constant",
            },
            {
                name: "initial_style",
                label: "Initial style",
                selector: {
                    select: {
                        mode: "dropdown",
                        custom_value: true,
                        options: STANDARD_POPUP_STYLES
                    },
                }
            },
            {
                name: "style_sequence",
                label: "Style sequence",
                selector: {
                    select: {
                        mode: "dropdown",
                        custom_value: true,
                        multiple: true,
                        options: ["initial", ...STANDARD_POPUP_STYLES]
                    },
                }
            },
            {
                name: "popup_styles",
                label: "Popup CSS styles",
                selector: {
                    object: {
                        label_field: "style",
                        description_field: "include_styles",
                        multiple: true,
                        fields: {
                            style: {
                                label: "Style",
                                required: true,
                                selector: {
                                    select: {
                                        mode: "dropdown",
                                        custom_value: true,
                                        options: [...STANDARD_POPUP_STYLES, "card", "all"]
                                    },
                                }
                            },
                            include_styles: {
                                label: "Also apply styles from...",
                                selector: {
                                    select: {
                                        mode: "dropdown",
                                        custom_value: true,
                                        multiple: true,
                                        options: STANDARD_POPUP_STYLES
                                    },
                                }
                            },
                            styles: {
                                label: "CSS Styles",
                                selector: { text: { multiline: true } }
                            }
                        }
                    }
                },
            }
        ]
    },
    {
        name: "size",
        label: "Popup size (deprecated, use popup style `initial_style` instead)",
        selector: {
            select: {
                mode: "dropdown",
                options: STANDARD_POPUP_STYLES
            },
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
                name: "right_button_variant",
                label: "Right button variant",
                selector: {
                    select: { mode: "dropdown",
                        options: ["brand", "neutral", "danger", "warning", "success"]
                    }
                },
            },
            {
                name: "left_button_variant",
                label: "Left button variant",
                selector: {
                    select: { mode: "dropdown",
                        options: ["brand", "neutral", "danger", "warning", "success"]
                    }
                },
            },
        ],
    },
    {
        type: "grid",
        schema: [
            {
                name: "right_button_appearance",
                label: "Right button appearance",
                selector: {
                    select: { mode: "dropdown",
                        options: ["accent", "filled", "outlined", "plain"]
                    }
                },
            },
            {
                name: "left_button_appearance",
                label: "Left button appearance",
                selector: {
                    select: { mode: "dropdown",
                        options: ["accent", "filled", "outlined", "plain"]
                    }
                },
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
                name: "right_button_close",
                label: "Right button closes popup",
                default: true,
                selector: { boolean: {} },
            },
            {
                name: "left_button_close",
                label: "Left button closes popup",
                default: true,
                selector: { boolean: {} },
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
        name: "timeout_hide_progress",
        label: "Hide timeout progress bar",
        selector: { boolean: {} },
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
        name: "popup_card_all_views",
        label: "Popup card is available for use in all views",
        default: false,
        selector: { boolean: {} },
    },
    {
        name: "style",
        label: "CSS style (deprecated, use popup style `all` instead)",
        selector: { text: { multiline: true } },
    },
    {
        type: "expandable",
        label: "Multiple popups",
        schema: [
            {
                name: "tag",
                label: "Tag",
                selector: { text: {} },
            },
            {
                name: "dismiss_icon",
                label: "Popup dismiss/close icon",
                selector: { icon: {} },
            }
        ],
    }
];
class PopupCardEditor extends s$1 {
    constructor() {
        super(...arguments);
        this._selectedTab = 0;
        this._cardGUIMode = true;
        this._cardGUIModeAvailable = true;
        this._settingsValid = true;
        this._showErrors = false;
    }
    get settingsValid() {
        return this._settingsValid;
    }
    get showErrors() {
        return this._showErrors;
    }
    setConfig(config) {
        this._config = config;
    }
    connectedCallback() {
        super.connectedCallback();
        loadHaForm();
        this._objectSelectorMonitor = new ObjectSelectorMonitor(this, (value) => { this._settingsValid = value; }, (value) => { this._showErrors = value; });
    }
    firstUpdated(changedProperties) {
        this.updateComplete.then(async () => {
            this._objectSelectorMonitor.startMonitoring();
            const base = await hass_base_el();
            const saveButton = await selectTree(base === null || base === void 0 ? void 0 : base.shadowRoot, "hui-dialog-edit-card $ [slot='primaryAction']>ha-button:nth-child(2) $ button");
            saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", this._handleClickAwayFromSettings.bind(this));
            const showCodeEditorButton = await selectTree(base === null || base === void 0 ? void 0 : base.shadowRoot, "hui-dialog-edit-card $ [slot='secondaryAction'] $ button");
            showCodeEditorButton === null || showCodeEditorButton === void 0 ? void 0 : showCodeEditorButton.addEventListener("click", this._handleClickAwayFromSettings.bind(this));
        });
    }
    async getUpdateComplete() {
        // wait for ha-form to be ready
        const formReady = new Promise((resolve) => {
            const checkReady = () => {
                var _a;
                const form = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("ha-form");
                if (form) {
                    resolve(form.updateComplete);
                }
                else {
                    setTimeout(checkReady, 100);
                }
            };
            checkReady();
        });
        return Promise.all([formReady, super.getUpdateComplete()]).then(() => true);
    }
    _handleClickAwayFromSettings(ev) {
        if (!this._settingsValid) {
            ev.stopPropagation();
            this.dispatchEvent(new CustomEvent("hass-notification", {
                detail: {
                    message: `Settings are not valid. Please fix the errors before
              before continuing.`,
                },
                bubbles: true,
                composed: true,
            }));
            return;
        }
    }
    _handleSwitchTab(ev) {
        this._selectedTab = ev.detail.name == "settings" ? 0 : 1;
        if (this._selectedTab === 1) { // 1 is the card tab
            this._objectSelectorMonitor.stopMonitoring();
        }
        else {
            // setTimeout is used to ensure that the card editor is cleared
            // before the object selectors are monitored again.
            // This is necessary because the card editor will have its own ha-form
            setTimeout(() => this._objectSelectorMonitor.startMonitoring(), 0);
        }
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
            return x ``;
        }
        return x `
      <div class="card-config">
        <div class="toolbar">
          <ha-tab-group
            @wa-tab-show=${this._handleSwitchTab}
          >
            <ha-tab-group-tab slot="nav" .panel=${"settings"} .active=${this._selectedTab == 0}>Settings</ha-tab-group-tab>
            <ha-tab-group-tab slot="nav" .panel=${"card"} .active=${this._selectedTab == 1} @click=${this._handleClickAwayFromSettings}>Card</ha-tab-group-tab>
          </ha-tab-group>
        </div>
        <div id="editor">
          ${[this._renderSettingsEditor, this._renderCardEditor][this._selectedTab].bind(this)()}
        </div>
      </div>
    `;
    }
    _renderSettingsEditor() {
        return x `
    <ha-alert
      .hass=${this.hass}
      alert-type="info"
    >
      <ul>
        <li>Set <strong>Popup-card ID</strong> to use as a template for <code>browser_mod.popup</code></li>
        <li>Set <strong>Targets</strong> to use as a replacement for Home Assistant <code>more-info</code> dialog for entities matching selected targets.</li>
      </ul>
    </ha-alert>
    <div class="box">
      <ha-alert
        .hass=${this.hass}
        alert-type="error"
        .hidden=${!this._showErrors}
        >Settings are not valid. Please check the following fields for errors:
        <ul>
          ${this._objectSelectorMonitor.objectSelectors.map((s) => (s.isValid === false) ? x `<li>${s.label}</li>` : "")}
        </ul>
      </ha-alert>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${(s) => { var _a; return (_a = s.label) !== null && _a !== void 0 ? _a : s.name; }}
        @value-changed=${this._configChanged}
      ></ha-form>
    </div>`;
    }
    _getSchema() {
        var _a;
        var schema = configSchema;
        if (!this._config.entity) {
            schema = schema.filter((s => s.name !== "entity"));
        }
        if (!this._config.style) {
            schema = schema.filter((s => s.name !== "style"));
        }
        if (!this._config.size) {
            schema = schema.filter((s => s.name !== "size"));
        }
        const customStyles = (_a = this._config.popup_styles) === null || _a === void 0 ? void 0 : _a.filter((style) => {
            return style.style !== "all" && !STANDARD_POPUP_STYLES.includes(style.style);
        }).map((style) => style.style);
        schema.forEach((entry) => {
            if (entry.label === "Popup styles") {
                entry.schema.forEach((subEntry) => {
                    if (subEntry.name === "initial_style") {
                        subEntry.selector.select.options = [...STANDARD_POPUP_STYLES, ...(customStyles !== null && customStyles !== void 0 ? customStyles : [])];
                    }
                    else if (subEntry.name === "style_sequence") {
                        subEntry.selector.select.options = ["initial", ...STANDARD_POPUP_STYLES, ...(customStyles !== null && customStyles !== void 0 ? customStyles : [])];
                    }
                    else if (subEntry.name === "popup_styles") {
                        subEntry.selector.object.fields.include_styles.selector.select.options = [...STANDARD_POPUP_STYLES, ...(customStyles !== null && customStyles !== void 0 ? customStyles : [])];
                    }
                });
            }
        });
        return schema;
    }
    _renderCardEditor() {
        return x `
      <div class="box cards">
        ${this._config.card
            ? x `
              <div class="toolbar">
                <ha-button
                  appearance="plain"
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${!this._cardEditorEl || this._cardGUIMode
                ? "Show code editor"
                : "Show visual editor"}
                </ha-button>
                <ha-button
                  appearance="plain"
                  @click=${this._deleteCard}
                >
                  Change card type
                </ha-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${this._config.card}
                @config-changed=${this._cardConfigChanged}
                @GUImode-changed=${this._cardGUIModeChanged}
              ></hui-card-element-editor>
            `
            : x `
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
        return i$4 `
      ha-tab-group {
        margin-bottom: 16px;
      }

      ha-tab-group-tab {
        flex: 1;
      }

      ha-tab-group-tab::part(base) {
        width: 100%;
        justify-content: center;
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
    n$2()
], PopupCardEditor.prototype, "lovelace", void 0);
__decorate([
    n$2()
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
    t$1()
], PopupCardEditor.prototype, "_settingsValid", void 0);
__decorate([
    t$1()
], PopupCardEditor.prototype, "_showErrors", void 0);
__decorate([
    i$1("hui-card-element-editor")
], PopupCardEditor.prototype, "_cardEditorEl", void 0);
window.addEventListener("browser-mod-bootstrap", async (ev) => {
    ev.stopPropagation();
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
            description: "Use a popup-card with browser_mod.popup action or to replace the more-info dialog for given targets.",
        });
    }
});

class PopupCard extends s$1 {
    constructor() {
        super(...arguments);
        this.preview = false;
    }
    static getConfigElement() {
        return document.createElement("popup-card-editor");
    }
    static getStubConfig(hass, entities) {
        return {
            title: "Custom popup",
            dismissable: true,
            card: { type: "markdown", content: "This card can be used in browser_mod.popup service or to replace the more-info dialog" },
        };
    }
    setConfig(config) {
        this._config = config;
        (async () => {
            const ch = await window.loadCardHelpers();
            this._element = await ch.createCardElement(config.card);
            this._element.hass = this.hass;
            this._element.preview = this.preview;
        })();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has("hass")) {
            if (this._element) {
                this._element.hass = this.hass;
            }
        }
        if (changedProperties.has("preview")) {
            if (this._element) {
                this._element.preview = this.preview;
            }
        }
    }
    getCardSize() {
        return 0;
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        this.setHidden(!this.preview);
        if (!this.preview)
            return x ``;
        return x ` <ha-card>
      <div class="header">
        ${this._config.dismissable
            ? x `
              <ha-icon-button>
                <ha-icon 
                  .icon=${this._config.dismiss_icon || "mdi:close"}
                ></ha-icon>
              </ha-icon-button>
            `
            : ""}
        <div class="main-title">${this._config.title}</div>
        ${this._config.icons
            ? c(this._config.icons, (icon, index) => {
                var _a, _b;
                return x `
              <ha-icon-button
                .title=${(_a = icon.title) !== null && _a !== void 0 ? _a : ""}
                class=${l(icon.class)}
              >
                <ha-icon 
                  .icon=${(_b = icon.icon) !== null && _b !== void 0 ? _b : ""}
                >
                </ha-icon>
              </ha-icon-button>
            `;
            })
            :
                this._config.icon ?
                    x `
              <ha-icon-button
                .title=${(_a = this._config.icon_title) !== null && _a !== void 0 ? _a : ""}
                class=${l(this._config.icon_class)}
              >
                <ha-icon 
                  .icon=${this._config.icon}
                >
                </ha-icon>
              </ha-icon-button>
            ` : ""}
      </div>
      <div class="content">
        ${this._element}
      </div>
      <style>
        :host {
        ${l(this._config.style)}
        ${(_b = this._config.popup_styles) === null || _b === void 0 ? void 0 : _b.map((style) => {
            return style.style == "all" ? `${style.styles}` : '';
        })}
      </style>
      ${this._config.right_button !== undefined ||
            this._config.left_button !== undefined
            ? x `
            <footer class="mdc-dialog__actions">
              <span>
                ${this._config.left_button !== undefined
                ? x `
                      <ha-button
                        variant=${(_c = this._config.left_button_variant) !== null && _c !== void 0 ? _c : "brand"}
                        appearance=${(_d = this._config.left_button_appearance) !== null && _d !== void 0 ? _d : "plain"}
                      >${this._config.left_button}</ha-button>
                    `
                : ""}
              </span>
              <span>
                ${this._config.right_button !== undefined
                ? x `
                      <ha-button
                        variant=${(_e = this._config.right_button_variant) !== null && _e !== void 0 ? _e : "brand"}
                        appearance=${(_f = this._config.right_button_appearance) !== null && _f !== void 0 ? _f : "plain"}
                      >${this._config.right_button}</ha-button>
                    `
                : ""}
              </span>
            </footer>
          `
            : ""}
    </ha-card>`;
    }
    setHidden(hidden) {
        if (this.hasAttribute('hidden') !== hidden) {
            this.toggleAttribute('hidden', hidden);
            this.dispatchEvent(new Event('card-visibility-changed', {
                bubbles: true,
                composed: true,
            }));
        }
    }
    static get styles() {
        return i$4 `
      ha-card {
        background-color: var(
          --popup-background-color,
          var(--ha-card-background, var(--card-background-color, white))
        );
      }
      .header {
        color: var(--primary-text-color);
        background-color: var(
          --popup-header-background-color,
          var(--popup-background-color, --sidebar-background-color)
        );
        display: var(--layout-horizontal_-_display, flex);
        flex-direction: var(--layout-horizontal_-_flex-direction, row);
        align-items: var(--layout-center_-_align-items);
        padding: 12px;
        font-size: var(--app-toolbar-font-size, 20px);
      }
      ha-icon-button > * {
        display: flex;
      }
      .main-title {
        flex: 1;
        font-size: var(--ha-font-size-xl);
        line-height: var(--ha-line-height-condensed);
        font-weight: var(--ha-font-weight-normal);
        padding: 10px 4px;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mdc-dialog__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0px;
        padding: 8px 16px 8px 24px;
        border-top: 1px solid var(--divider-color);
      }

      .content {
        padding: 8px 8px 20px 8px;
      }
    `;
    }
}
__decorate([
    n$2()
], PopupCard.prototype, "hass", void 0);
__decorate([
    t$1()
], PopupCard.prototype, "_config", void 0);
__decorate([
    n$2({ type: Boolean, reflect: true })
], PopupCard.prototype, "preview", void 0);
__decorate([
    t$1()
], PopupCard.prototype, "_element", void 0);
window.addEventListener("browser-mod-bootstrap", async (ev) => {
    ev.stopPropagation();
    while (!window.browser_mod) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await window.browser_mod.connectionPromise;
    if (!customElements.get("popup-card"))
        customElements.define("popup-card", PopupCard);
    let rootMutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "childList") {
                for (const node of mutation.removedNodes) {
                    if (node instanceof Element && node.localName === "hui-root") {
                        lovelaceRoot = null;
                    }
                }
                for (const node of mutation.addedNodes) {
                    if (node instanceof Element && node.localName === "hui-root") {
                        lovelaceRoot = node;
                    }
                }
            }
        }
    });
    let lovelaceRoot = await getLovelaceRoot(document);
    if (rootMutationObserver && (lovelaceRoot === null || lovelaceRoot === void 0 ? void 0 : lovelaceRoot.parentNode)) {
        rootMutationObserver.observe(lovelaceRoot.parentNode, {
            childList: true,
        });
    }
    // popstate will get fired on window.browser_mod?.service("popup", ...) but as this popstate
    // is not currently cleared there is no way to distinguish this event properly at this time.
    // Hence, setting lovelaceRoot on all popstate which captures, for examople, UI back from History Panel.
    ['popstate', 'location-changed'].forEach(event => window.addEventListener(event, async (ev) => {
        lovelaceRoot = await getLovelaceRoot(document);
    }));
    window.addEventListener("hass-more-info", (ev) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.ignore_popup_card) ||
            (((_b = ev.detail) === null || _b === void 0 ? void 0 : _b.view) && ((_c = ev.detail) === null || _c === void 0 ? void 0 : _c.view) !== "info") ||
            (!((_d = ev.detail) === null || _d === void 0 ? void 0 : _d.entityId) && !((_e = ev.detail) === null || _e === void 0 ? void 0 : _e.target)) ||
            !lovelaceRoot)
            return;
        ({ entity_id: (_f = ev.detail) === null || _f === void 0 ? void 0 : _f.entityId });
        const cardConfig = findPopupCardConfigByEntity(lovelaceRoot, (_g = ev.detail) === null || _g === void 0 ? void 0 : _g.entityId);
        if (cardConfig) {
            ev.stopPropagation();
            ev.preventDefault();
            let properties = Object.assign({}, cardConfig);
            delete properties.card;
            (_h = window.browser_mod) === null || _h === void 0 ? void 0 : _h.service("popup", Object.assign({ content: cardConfig.card }, properties));
            setTimeout(() => lovelaceRoot.dispatchEvent(new CustomEvent("hass-more-info", {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: { entityId: "" },
            })), 10);
        }
    });
});

class OverlayIcon extends s$1 {
    constructor(settings, actionCallback) {
        super();
        this.settings = settings;
        this._actionCallback = actionCallback;
        this.show = "";
    }
    set settings(value) {
        var _a, _b, _c, _d;
        this.icon = (_a = value === null || value === void 0 ? void 0 : value.icon) !== null && _a !== void 0 ? _a : "";
        this.title = (_b = value === null || value === void 0 ? void 0 : value.title) !== null && _b !== void 0 ? _b : "";
        this.action = value.action;
        this.top = value.top;
        this.left = value.left;
        this.bottom = value.bottom;
        this.right = value.right;
        this.class = (_c = value.class) !== null && _c !== void 0 ? _c : "";
        this.userStyle = (_d = value.style) !== null && _d !== void 0 ? _d : "";
    }
    actionCallback(ev) {
        var _a;
        ev.stopPropagation();
        ev.preventDefault();
        this.blur();
        (_a = this._actionCallback) === null || _a === void 0 ? void 0 : _a.call(this, this.action);
    }
    async connectedCallback() {
        super.connectedCallback();
        await Promise.all([
            customElements.whenDefined("ha-icon-button"),
            customElements.whenDefined("ha-icon")
        ]);
    }
    _renderDynamicStyles() {
        let styles = ":host {\n";
        if (this.top !== undefined)
            styles += `  top: ${this.top}px;\n`;
        if (this.left !== undefined)
            styles += `  left: ${this.left}px;\n`;
        if (this.bottom !== undefined)
            styles += `  bottom: ${this.bottom}px;\n`;
        if (this.right !== undefined)
            styles += `  right: ${this.right}px;\n`;
        styles += "}\n\n";
        if (this.userStyle)
            styles += `\n${this.userStyle}`;
        return styles;
    }
    render() {
        if (!this.show === undefined)
            return x ``;
        return x `
      <div class="browser-mod-overlay-icon">
        <ha-icon-button
          class=${this.class}
          .title=${this.title}
          @click=${this.actionCallback}
        >
          <ha-icon
            icon=${this.icon}
          ></ha-icon>
        </ha-icon-button>
        </ha-icon>
      </div>
      <style>
        ${this._renderDynamicStyles()}
      </style>
    `;
    }
    static get styles() {
        return i$4 `
      :host([show]) {
        display: block;
        position: fixed;
        z-index: 9999;
      }
      
      :host {
        display: none;
      }

      ha-icon {
        display: grid;
      }
    `;
    }
}
__decorate([
    n$2({ reflect: true })
], OverlayIcon.prototype, "show", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "icon", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "title", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "top", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "left", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "bottom", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "right", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "class", void 0);
__decorate([
    t$1()
], OverlayIcon.prototype, "userStyle", void 0);
if (!customElements.get("browser-mod-overlay-icon"))
    customElements.define("browser-mod-overlay-icon", OverlayIcon);

const AutoSettingsMixin = (SuperClass) => {
    class AutoSettingsMixinClass extends SuperClass {
        async runHideHeader() {
            while (!(await this._hideHeader()))
                await new Promise((r) => setTimeout(r, 500));
        }
        async runUpdateTitle() {
            await waitRepeat(() => this._updateTitle(), 3, 500);
        }
        async updateOverlayIcon() {
            this._updateOverlayIcon();
        }
        constructor() {
            super();
            // flag to remove legacy Sidebar Settings that hass leaves after migration to user profile
            this._removeLegacySidebarSettings = false;
            this.__currentTitle = undefined;
            this._overlayIcon = undefined;
            const runUpdates = async () => {
                this.runUpdateTitle();
                this.runHideHeader();
                this.updateOverlayIcon();
            };
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has("disableBrowserModFrontendSettings")) {
                console.info("%cBROWSER_MOD FRONTEND SETTINGS DISABLED", "color: black; background: yellow; font-weight: bold");
                return;
            }
            this._auto_settings_setup();
            this.addEventListener("browser-mod-config-update", () => {
                this._auto_settings_setup();
                runUpdates();
            });
            this.addEventListener("browser-mod-user-ready", () => {
                this._auto_settings_setup();
                runUpdates();
            });
            this.addEventListener("browser-mod-entities-update", () => {
                this._auto_settings_setup();
                runUpdates();
            });
            window.addEventListener("location-changed", runUpdates);
            window.addEventListener("popstate", runUpdates);
            this.addEventListener("browser-mod-user-ready", () => {
                this.entitiesReady().then(() => {
                    this._runDefaultAction();
                }).catch((err) => {
                    console.warn(`Browser Mod: ${err}. Timeout waiting for browser entities to be ready. Default action not run.`);
                });
            }, { once: true });
            this._watchEditSidebar();
        }
        async _auto_settings_setup() {
            await this.connectionPromise;
            const settings = this.settings;
            // Sidebar panel order and hiding
            if (settings.sidebarPanelOrder) {
                localStorage.setItem("sidebarPanelOrder", settings.sidebarPanelOrder);
            }
            else if (this._removeLegacySidebarSettings) {
                localStorage.removeItem("sidebarPanelOrder");
            }
            if (settings.sidebarHiddenPanels) {
                localStorage.setItem("sidebarHiddenPanels", settings.sidebarHiddenPanels);
            }
            else if (this._removeLegacySidebarSettings) {
                localStorage.removeItem("sidebarHiddenPanels");
            }
            // Default panel
            if (settings.defaultPanel) {
                localStorage.setItem("defaultPanel", `"${settings.defaultPanel}"`);
            }
            // Hide sidebar
            if (settings.hideSidebar === true) {
                // Set sidebar to always hidden
                // _hideHeader routine will remove sidebar the menu button
                selectTree(document.body, "home-assistant").then((el) => {
                    el.updateComplete.then(() => {
                        el.dispatchEvent(new CustomEvent("hass-dock-sidebar", {
                            detail: {
                                dock: "always_hidden",
                            }
                        }));
                    });
                });
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
                            variables: { browser_id: this.browserID, browser_entities: this.browserEntities },
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
                            variables: { browser_id: this.browserID, browser_entities: this.browserEntities },
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
                            variables: { browser_id: this.browserID, browser_entities: this.browserEntities },
                        });
                })();
            }
            // OverlayIcon
            this._setupOverlayIcon();
        }
        async _updateSidebarTitle({ result }) {
            let sidebar = undefined;
            let cnt = 0;
            while (!sidebar && cnt++ < 5) {
                sidebar = await selectTree(document.body, "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar $ .title");
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
            const rootEl = await selectTree(document.body, "home-assistant $ home-assistant-main $ ha-drawer partial-panel-resolver");
            if (!rootEl)
                return false;
            let header = await selectTree(rootEl, "ha-panel-lovelace$hui-root$.header");
            let menuButton;
            if (header) {
                menuButton = header.querySelector("ha-menu-button");
            }
            else {
                let steps = 0;
                let el = rootEl;
                while (el && el.localName !== "ha-top-app-bar-fixed" && steps++ < 5) {
                    await await_element(el, true);
                    const next = (_b = (_a = el.querySelector("ha-top-app-bar-fixed")) !== null && _a !== void 0 ? _a : el.firstElementChild) !== null && _b !== void 0 ? _b : el.shadowRoot;
                    el = next;
                }
                if ((el === null || el === void 0 ? void 0 : el.localName) !== "ha-top-app-bar-fixed")
                    return false;
                header = el.shadowRoot.querySelector("header");
                menuButton = el.querySelector("ha-menu-button");
            }
            if (header && this.settings.hideHeader === true) {
                rootEl.style.setProperty("--header-height", "0px");
                header.style.setProperty("display", "none");
                return true;
            }
            else if (menuButton && this.settings.hideSidebar === true) {
                (_c = menuButton.remove) === null || _c === void 0 ? void 0 : _c.call(menuButton);
                return true;
            }
            return false;
        }
        _runDefaultAction() {
            if (this.settings.defaultAction) {
                var action_action = this.settings.defaultAction;
                if (!Array.isArray(action_action)) {
                    action_action = [action_action];
                }
                action_action.forEach(async (actionItem) => {
                    var { action, service, target, data } = actionItem;
                    service = (action === undefined || action === "call-service") ? service : action;
                    this._service_action({
                        service,
                        target,
                        data: data,
                    });
                });
            }
        }
        _runOverlayIconAction(action) {
            if (action) {
                var action_action = action;
                if (!Array.isArray(action_action)) {
                    action_action = [action_action];
                }
                action_action.forEach(async (actionItem) => {
                    var { action, service, target, data } = actionItem;
                    service = (action === undefined || action === "call-service") ? service : action;
                    this._service_action({
                        service,
                        target,
                        data: data,
                    });
                });
            }
        }
        async _setupOverlayIcon() {
            var _a;
            if (this.settings.overlayIcon) {
                if (!this._overlayIcon) {
                    this._overlayIcon = new OverlayIcon(this.settings.overlayIcon, this._runOverlayIconAction.bind(this));
                    document.body.append(this._overlayIcon);
                    this._updateOverlayIcon();
                }
            }
            else {
                (_a = this._overlayIcon) === null || _a === void 0 ? void 0 : _a.remove();
                this._overlayIcon = undefined;
            }
        }
        async _updateOverlayIcon() {
            var _a, _b, _c;
            if (this.settings.overlayIcon && this._overlayIcon) {
                const firstPathPart = (_b = (_a = window.location.pathname) === null || _a === void 0 ? void 0 : _a.split('/')) === null || _b === void 0 ? void 0 : _b[1];
                if (firstPathPart)
                    if ((_c = this.settings.overlayIcon.panels) === null || _c === void 0 ? void 0 : _c.includes(firstPathPart)) {
                        this._overlayIcon.show = "";
                    }
                    else {
                        this._overlayIcon.show = undefined;
                    }
            }
        }
        async _watchEditSidebar() {
            let sidebar = undefined;
            let cnt = 0;
            while (!sidebar && cnt++ < 10) {
                sidebar = await selectTree(document.body, "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");
                if (!sidebar)
                    await new Promise((r) => setTimeout(r, 1000));
            }
            // Home Assistant 2025.6 removed editMode from sidebar
            // so this is the best check to see if sidebar settings dialog is available
            if (sidebar && sidebar.editMode === undefined) {
                // both Sidebar and Profile edit can fire show-dialog for dialog-edit-sidebar
                // so listen on hass main
                const main = await selectTree(document.body, "home-assistant $ home-assistant-main");
                if (main) {
                    main.addEventListener("show-dialog", (ev) => {
                        var _a, _b, _c, _d;
                        if (((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.dialogTag) === "dialog-edit-sidebar") {
                            if ((_b = ev.detail) === null || _b === void 0 ? void 0 : _b.browser_mod_continue)
                                return;
                            ev.stopPropagation();
                            if (((_c = this.hass.user) === null || _c === void 0 ? void 0 : _c.is_admin) || !this.registered) {
                                const evShowDialog = new CustomEvent("show-dialog", { bubbles: true, composed: true, detail: Object.assign({ browser_mod_continue: true }, ev.detail) });
                                (_d = window.browser_mod) === null || _d === void 0 ? void 0 : _d.showPopup({
                                    title: 'Edit sidebar',
                                    content: 'Browser Mod is installed. Edit sidebar settings with Browser Mod (recommended) or Continue to use the built-in editor.',
                                    right_button: "Continue",
                                    right_button_action: () => { main.dispatchEvent(evShowDialog); },
                                    right_button_variant: "brand",
                                    right_button_appearance: "plain",
                                    right_button_icon: "mdi:chevron-right",
                                    left_button: "Edit with Browser Mod",
                                    left_button_action: () => { this.browser_navigate('/browser-mod'); },
                                    left_button_variant: "brand",
                                    left_button_appearance: "accent",
                                    style: 'ha-dialog { position: fixed; z-index: 999; }' // Need to be above open drawer sidebar
                                });
                            }
                            else {
                                const service = "browser_mod.notification";
                                const message = "Sidebar settings are managed by owner/admin using Browser Mod integration.";
                                const duration = 5000;
                                const dismissable = true;
                                this.service(service, { message, duration, dismissable });
                            }
                        }
                    });
                }
                // flag to remove legacy sidebar settings which hass may have left over
                this._removeLegacySidebarSettings = true;
                this._auto_settings_setup();
            }
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
    __decorate([
        runOnce(true)
    ], AutoSettingsMixinClass.prototype, "updateOverlayIcon", null);
    return AutoSettingsMixinClass;
};

const ID_STORAGE_KEY = "browser_mod-browser-id";
const ID_STORAGE_KEY_LOVELACE_PLAYER = "lovelace-player-device-id";
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
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const newBrowserID = urlParams.get("BrowserID");
            if (newBrowserID != null)
                this.browserID = newBrowserID;
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
            if (localStorage[ID_STORAGE_KEY]) {
                // set lovelace-player-device-id as used by card-tools, state-switch
                localStorage[ID_STORAGE_KEY_LOVELACE_PLAYER] = localStorage[ID_STORAGE_KEY];
                return localStorage[ID_STORAGE_KEY];
            }
            this.browserID = "";
            this.recall_id();
            return this.browserID;
        }
        set browserID(id) {
            function _createBrowserID() {
                var _a;
                const s4 = () => {
                    return Math.floor((1 + Math.random()) * 100000)
                        .toString(16)
                        .substring(1);
                };
                return "browser_mod_" + (((_a = window.fully) === null || _a === void 0 ? void 0 : _a.getDeviceId()) ? window.fully.getDeviceId().replace(/-/g, '_') : `${s4()}${s4()}_${s4()}${s4()}`);
            }
            if (id === "")
                id = _createBrowserID();
            const oldID = localStorage[ID_STORAGE_KEY];
            localStorage[ID_STORAGE_KEY] = id;
            // set lovelace-player-device-id as used by card-tools, state-switch
            localStorage[ID_STORAGE_KEY_LOVELACE_PLAYER] = localStorage[ID_STORAGE_KEY];
            this.browserIDChanged(oldID, id);
        }
        browserIDChanged(oldID, newID) { }
    };
};

const VersionMixin = (SuperClass) => {
    return class VersionMixinClass extends SuperClass {
        constructor() {
            super();
            this._versionNotificationPending = false;
            this._version = pjson.version;
            this.addEventListener("browser-mod-ready", async () => {
                await this._checkVersion();
            });
            this.addEventListener("browser-mod-disconnected", () => {
                this._notificationPending = false;
            });
        }
        async _checkVersion() {
            var _a;
            if (((_a = this._data) === null || _a === void 0 ? void 0 : _a.version) && this._data.version !== this._version) {
                if (!this._versionNotificationPending) {
                    this._versionNotificationPending = true;
                    await this._localNotification(this._data.version, this._version);
                }
            }
        }
        async _localNotification(serverVersion, clientVersion) {
            // Wait for any other notifications to expire
            let haToast;
            do {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                haToast = await selectTree(document.body, "home-assistant $ notification-manager $ ha-toast", false, 1000);
            } while (haToast);
            const service = "browser_mod.notification";
            const message = `Browser Mod version mismatch! Browser: ${clientVersion}, Home Assistant: ${serverVersion}`;
            const data = {
                message: message,
                duration: -1,
                dismissable: true,
                action_text: "Reload",
                browser_id: "THIS",
                action: {
                    service: "browser_mod.refresh",
                    data: {
                        browser_id: "THIS",
                    },
                },
            };
            await this.service(service, data);
        }
    };
};

const PanelStateMixin = (SuperClass) => {
    return class PanelStateMixinClass extends SuperClass {
        constructor() {
            super();
            this._isUpdating = false;
            this._getPanelNameTranslationKey = (panel) => {
                if ((panel === null || panel === void 0 ? void 0 : panel.url_path) === "lovelace") {
                    return "panel.states";
                }
                if ((panel === null || panel === void 0 ? void 0 : panel.url_path) === "profile") {
                    return "panel.profile";
                }
                return `panel.${panel === null || panel === void 0 ? void 0 : panel.title}`;
            };
            [
                'popstate',
                'location-changed'
            ].forEach(event => {
                window.addEventListener(event, () => setTimeout(() => {
                    this._panel_state_update();
                }, 1000));
            });
            [
                'browser-mod-ready',
                'browser-mod-popup-opened',
                'browser-mod-popup-closed'
            ].forEach(event => {
                this.addEventListener(event, () => setTimeout(() => {
                    this._panel_state_update();
                }, 1000));
            });
            this.connectionPromise.then(() => this._panel_state_update());
        }
        async _getPanel(document) {
            let _panel = await _getPanel(document);
            while (_panel === null) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                _panel = await _getPanel(document);
            }
            return _panel;
            async function _getPanel(document) {
                let panel = await selectTree(document, "home-assistant $ home-assistant-main $ partial-panel-resolver>*");
                if (!panel) {
                    panel = await selectTree(document, "hc-main $ hc-lovelace");
                }
                if (!panel) {
                    panel = await selectTree(document, "hc-main $ hc-lovelace");
                }
                return panel;
            }
        }
        _panelTitle(panel) {
            var _a, _b, _c;
            if ((_a = panel === null || panel === void 0 ? void 0 : panel.hass) === null || _a === void 0 ? void 0 : _a.localize) {
                const translationKey = this._getPanelNameTranslationKey(panel.panel);
                return panel.hass.localize(translationKey) || ((_b = panel.panel) === null || _b === void 0 ? void 0 : _b.title) || "";
            }
            return ((_c = panel === null || panel === void 0 ? void 0 : panel.panel) === null || _c === void 0 ? void 0 : _c.title) || "";
        }
        _panelAttributes(panel) {
            var _a, _b, _c;
            return {
                panelTitle: this._panelTitle(panel),
                panelUrlPath: ((_a = panel === null || panel === void 0 ? void 0 : panel.panel) === null || _a === void 0 ? void 0 : _a.url_path) || "",
                panelComponentName: ((_b = panel === null || panel === void 0 ? void 0 : panel.panel) === null || _b === void 0 ? void 0 : _b.component_name) || "",
                panelIcon: ((_c = panel === null || panel === void 0 ? void 0 : panel.panel) === null || _c === void 0 ? void 0 : _c.icon) || "",
            };
        }
        async _viewAttributes(panel) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (((_a = panel === null || panel === void 0 ? void 0 : panel.panel) === null || _a === void 0 ? void 0 : _a.component_name) !== "lovelace")
                return {};
            let cnt = 0;
            while (!((_b = panel.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("hui-root")) && cnt < 10) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                cnt++;
            }
            const lovelace = panel.shadowRoot.querySelector("hui-root");
            if (!lovelace)
                return {};
            const _curView = lovelace._curView || 0;
            return {
                viewTitle: ((_e = (_d = (_c = lovelace.config) === null || _c === void 0 ? void 0 : _c.views) === null || _d === void 0 ? void 0 : _d[_curView]) === null || _e === void 0 ? void 0 : _e.title) || "",
                viewUrlPath: ((_h = (_g = (_f = lovelace.config) === null || _f === void 0 ? void 0 : _f.views) === null || _g === void 0 ? void 0 : _g[_curView]) === null || _h === void 0 ? void 0 : _h.path) || "",
                viewNarrow: lovelace.narrow,
            };
        }
        _panel_state_update() {
            const update = async () => {
                var _a;
                this._isUpdating = true;
                const panel = await this._getPanel(document);
                const panelAttributes = this._panelAttributes(panel);
                const viewAttributes = await this._viewAttributes(panel);
                const fullTitle = panelAttributes.panelTitle + (viewAttributes.viewTitle ? ` - ${viewAttributes.viewTitle}` : "");
                const fullUrlPath = panelAttributes.panelUrlPath + (viewAttributes.viewUrlPath ? `/${viewAttributes.viewUrlPath}` : "");
                this.sendUpdate({
                    panel: {
                        title: fullTitle,
                        attributes: Object.assign(Object.assign(Object.assign({}, panelAttributes), viewAttributes), { fullUrlPath: fullUrlPath, popupOpen: (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.popupState })
                    }
                });
                this._isUpdating = false;
            };
            if (!this._isUpdating)
                update();
        }
    };
};

class BrowserMod extends ServicesMixin(VersionMixin(PopupMixin(ActivityMixin(BrowserStateMixin(PanelStateMixin(CameraMixin(MediaPlayerMixin(ScreenSaverMixin(AutoSettingsMixin(FullyMixin(RequireInteractMixin(ConnectionMixin(BrowserIDMixin(EventTarget)))))))))))))) {
    constructor() {
        super();
        this.connect();
        window.dispatchEvent(new Event("browser-mod-bootstrap"));
        console.info(`%cBROWSER_MOD ${pjson.version} IS INSTALLED
    %cBrowserID: ${this.browserID}`, "color: green; font-weight: bold", "");
    }
}
if (!window.browser_mod)
    window.browser_mod = new BrowserMod();

export { BrowserMod };
