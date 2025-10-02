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
const t$2=window,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$6=new WeakMap;class o$4{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$6.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$3),i$2=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$3)},S$1=(s,n)=>{e$3?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window,r$1=e$2.trustedTypes,h$2=r$1?r$1.emptyScript:"",o$3=e$2.reactiveElementPolyfillSupport,n$5={toAttribute(t,i){switch(i){case Boolean:t=t?h$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$2=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:n$5,reflect:!1,hasChanged:a$2},d$1="finalized";class u$2 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$3){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$5).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$5;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u$2[d$1]=!0,u$2.elementProperties=new Map,u$2.elementStyles=[],u$2.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:u$2}),(null!==(s$2=e$2.reactiveElementVersions)&&void 0!==s$2?s$2:e$2.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$1=i$1.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2="$lit$",n$4=`lit$${(Math.random()+"").slice(9)}$`,l$2="?"+n$4,h$1=`<${l$2}>`,r=document,u$1=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y$1=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_:void 0!==c[1]?u=m$1:void 0!==c[2]?(y$1.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m$1?u=f$1:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f$1?s+h$1:v>=0?(e.push(d),s.slice(0,v)+o$2+s.slice(v)+n$4+w):s+n$4+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$2)||i.startsWith(n$4)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$2).split(n$4),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y$1.test(h.tagName)){const t=h.textContent.split(n$4),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$1()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$1());}}}else if(8===h.nodeType)if(h.data===l$2)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$4,t+1));)v.push({type:7,index:r}),t+=n$4.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u$1()),this.k(u$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o$1;class s extends u$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$2(n){return (t,o)=>void 0!==o?e(n,t,o):i(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return n$2({...t,state:!0})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$1;null!=(null===(n$1=window.HTMLSlotElement)||void 0===n$1?void 0:n$1.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

var u;
const o = /* @__PURE__ */ new WeakMap(), l = () => {
}, n = class n {
  constructor(s) {
    this.subscribers = [], this.settlement = null, this[u] = "Unpromise", typeof s == "function" ? this.promise = new Promise(s) : this.promise = s;
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
      this.subscribers = f(this.subscribers, r), s = r.promise, e = () => {
        this.subscribers !== null && (this.subscribers = y(this.subscribers, r));
      };
    } else {
      const { status: r } = t;
      r === "fulfilled" ? s = Promise.resolve(t.value) : s = Promise.reject(t.reason), e = l;
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
    return o.set(s, e), o.set(e, e), e;
  }
  /** Retrieve a previously-created Unpromise keyed by an original Promise. */
  static getSubscribablePromise(s) {
    return o.get(s);
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
    const e = s.map(a);
    try {
      return await Promise.race(e);
    } finally {
      for (const t of e)
        t.unsubscribe();
    }
  }
};
u = Symbol.toStringTag;
let b = n;
function a(i) {
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
function f(i, s) {
  return [...i, s];
}
function m(i, s) {
  return [...i.slice(0, s), ...i.slice(s + 1)];
}
function y(i, s) {
  const e = i.indexOf(s);
  return e !== -1 ? m(i, e) : i;
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
async function provideHass(el) {
    const base = await hass_base_el();
    base.provideHass(el);
}
// Loads in ha-config-dashboard which is used to copy styling
// Also provides ha-settings-row
const loadConfigDashboard = async () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    await customElements.whenDefined("partial-panel-resolver");
    const ppResolver = document.createElement("partial-panel-resolver");
    const routes = ppResolver._getRoutes([
        {
            component_name: "config",
            url_path: "a",
        },
    ]);
    await ((_c = (_b = (_a = routes === null || routes === void 0 ? void 0 : routes.routes) === null || _a === void 0 ? void 0 : _a.a) === null || _b === void 0 ? void 0 : _b.load) === null || _c === void 0 ? void 0 : _c.call(_b));
    await customElements.whenDefined("ha-panel-config");
    const configRouter = document.createElement("ha-panel-config");
    await ((_g = (_f = (_e = (_d = configRouter === null || configRouter === void 0 ? void 0 : configRouter.routerOptions) === null || _d === void 0 ? void 0 : _d.routes) === null || _e === void 0 ? void 0 : _e.dashboard) === null || _f === void 0 ? void 0 : _f.load) === null || _g === void 0 ? void 0 : _g.call(_f)); // Load ha-config-dashboard
    await ((_l = (_k = (_j = (_h = configRouter === null || configRouter === void 0 ? void 0 : configRouter.routerOptions) === null || _h === void 0 ? void 0 : _h.routes) === null || _j === void 0 ? void 0 : _j.general) === null || _k === void 0 ? void 0 : _k.load) === null || _l === void 0 ? void 0 : _l.call(_k)); // Load ha-settings-row
    await ((_q = (_p = (_o = (_m = configRouter === null || configRouter === void 0 ? void 0 : configRouter.routerOptions) === null || _m === void 0 ? void 0 : _m.routes) === null || _o === void 0 ? void 0 : _o.entities) === null || _p === void 0 ? void 0 : _p.load) === null || _q === void 0 ? void 0 : _q.call(_p)); // Load ha-data-table
    await customElements.whenDefined("ha-config-dashboard");
};
const loadDeveloperToolsTemplate = async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    await customElements.whenDefined("partial-panel-resolver");
    await customElements.whenDefined("partial-panel-resolver");
    const ppResolver = document.createElement("partial-panel-resolver");
    const routes = ppResolver._getRoutes([
        {
            component_name: "developer-tools",
            url_path: "a",
        },
    ]);
    await ((_c = (_b = (_a = routes === null || routes === void 0 ? void 0 : routes.routes) === null || _a === void 0 ? void 0 : _a.a) === null || _b === void 0 ? void 0 : _b.load) === null || _c === void 0 ? void 0 : _c.call(_b));
    const dtRouter = document.createElement("developer-tools-router");
    await ((_g = (_f = (_e = (_d = dtRouter === null || dtRouter === void 0 ? void 0 : dtRouter.routerOptions) === null || _d === void 0 ? void 0 : _d.routes) === null || _e === void 0 ? void 0 : _e.template) === null || _f === void 0 ? void 0 : _f.load) === null || _g === void 0 ? void 0 : _g.call(_f));
    await customElements.whenDefined("developer-tools-template");
};

class BrowserModRegisteredBrowsersCard$1 extends s {
    constructor() {
        super(...arguments);
        this.dirty = false;
        this.narrow = false;
    }
    toggleRegister() {
        var _a;
        if (!((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.ready))
            return;
        window.browser_mod.registered = !window.browser_mod.registered;
        this.dirty = true;
    }
    changeBrowserID(ev) {
        var _a;
        const value = ev.detail.value;
        if (value !== ((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.browserID)) {
            window.browser_mod.browserID = value;
            this.dirty = true;
        }
    }
    toggleCameraEnabled() {
        window.browser_mod.cameraEnabled = !window.browser_mod.cameraEnabled;
        this.dirty = true;
    }
    firstUpdated() {
        window.browser_mod.addEventListener("browser-mod-config-update", () => this.requestUpdate());
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return x `
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.ready)
            ? x `
                <ha-icon
                  class="icon"
                  .icon=${"mdi:check-circle-outline"}
                  style="color: var(--success-color, green);"
                ></ha-icon>
              `
            : x `
                <ha-icon
                  class="icon"
                  .icon=${"mdi:circle-outline"}
                  style="color: var(--error-color, red);"
                ></ha-icon>
              `}
        </h1>
        <div class="card-content">
          ${this.dirty
            ? x `
                <ha-alert alert-type="warning">
                  It is strongly recommended to refresh your browser window
                  after changing any of the settings in this box.
                </ha-alert>
              `
            : ""}
        </div>
        <div class="card-content">
          ${!((_b = this.hass.user) === null || _b === void 0 ? void 0 : _b.is_admin)
            ? x `
                <ha-alert alert-type="info" title="Login as admin to edit">
                  Login as admin to change the settings of this Browser.
                  <br /><br />
                  You can set auto-register as admin on another Browser
                  to register this Browser automatically. You can then either
                  use <i>browser_mod.change_browser_id</i> service or login 
                  as admin on this Browser to change the Browser ID.
                </ha-alert>
              `
            : ""}
        </div>
        <div class="card-content">
          <ha-settings-row>
            <span slot="heading">Register</span>
            <span slot="description"
              >Enable this browser as a Device in Home Assistant</span
            >
            <ha-switch
              .checked=${(_c = window.browser_mod) === null || _c === void 0 ? void 0 : _c.registered}
              @change=${this.toggleRegister}
              .disabled=${((_d = window.browser_mod) === null || _d === void 0 ? void 0 : _d.browser_locked) ||
            ((_e = window.browser_mod) === null || _e === void 0 ? void 0 : _e.global_settings["autoRegister"]) ||
            ((_f = window.browser_mod) === null || _f === void 0 ? void 0 : _f.global_settings["lockRegister"]) ||
            !((_g = this.hass.user) === null || _g === void 0 ? void 0 : _g.is_admin)}
            ></ha-switch>
          </ha-settings-row>

          <ha-settings-row .narrow=${this.narrow}>
            <span slot="heading">Browser ID</span>
            <span slot="description"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-combo-box
              .value=${(_h = window.browser_mod) === null || _h === void 0 ? void 0 : _h.browserID}
              @value-changed=${this.changeBrowserID}
              .allowCustomValue=${true}
              .items=${Object.keys((_j = window.browser_mod) === null || _j === void 0 ? void 0 : _j.browsers).map((id) => ({ id, name: id }))
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))}
              item-id-path="id"
              item-value-path="id"
              item-label-path="name"
              .hideClearIcon=${true}
              .helper=${'You can select an existing known Browser ID or enter new'}
              .disabled=${(((_k = window.browser_mod) === null || _k === void 0 ? void 0 : _k.browser_locked) ||
            !((_l = this.hass.user) === null || _l === void 0 ? void 0 : _l.is_admin))}
            ></ha-combo-box>
          </ha-settings-row>

          ${((_m = window.browser_mod) === null || _m === void 0 ? void 0 : _m.registered)
            ? x `
                ${this._renderSuspensionAlert()}
                <ha-settings-row>
                  <span slot="heading">Enable camera</span>
                  <span slot="description"
                    >Get camera input from this browser (hardware
                    dependent)</span
                  >
                  <ha-switch
                    .checked=${(_o = window.browser_mod) === null || _o === void 0 ? void 0 : _o.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                    .disabled=${(_p = window.browser_mod) === null || _p === void 0 ? void 0 : _p.browser_locked}
                  ></ha-switch>
                </ha-settings-row>
                ${((_q = window.browser_mod) === null || _q === void 0 ? void 0 : _q.cameraError)
                ? x `
                      <ha-alert alert-type="error">
                        Setting up the device camera failed. Make sure you are browsing
                        in a secure (https://) context and have
                        allowed use of the camera in your browser.
                      </ha-alert>
                    `
                : ""}
                ${this._renderInteractionAlert()}
                ${this._renderFKBSettingsInfo()}
              `
            : ""}
        </div>
      </ha-card>
    `;
    }
    _renderSuspensionAlert() {
        if (!this.hass.suspendWhenHidden)
            return x ``;
        return x `
      <ha-alert alert-type="warning" title="Auto closing connection">
        Home Assistant will close the websocket connection to the server
        automatically after 5 minutes of inactivity.<br /><br />
        While decreasing network trafic and memory usage, this may cause
        problems for browser_mod operation.
        <br /><br />
        If you find that some things stop working for this Browser after a time,
        try going to your
        <a
          href="/profile"
          style="text-decoration: underline; color: var(--primary-color);"
          >Profile Settings</a
        >
        and disabling the option
        "${this.hass.localize("ui.panel.profile.suspend.header") ||
            "Automatically close connection"}".
      </ha-alert>
    `;
    }
    _renderInteractionAlert() {
        return x `
      <ha-alert title="Interaction requirement">
        For privacy reasons many browsers require the user to interact with a
        webpage before allowing audio playback or video capture. This may affect
        the
        <code>media_player</code> and <code>camera</code> components of Browser
        Mod. <br /><br />

        If you ever see a
        <ha-icon
          icon="mdi:gesture-tap"
          style="color: var(--warning-color);"
        ></ha-icon>
        symbol at the bottom right corner of the screen, please tap or click
        anywhere on the page. This should allow Browser Mod to work again.
      </ha-alert>
    `;
    }
    _renderFKBSettingsInfo() {
        var _a, _b;
        if (!((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.fully) || !this.getFullySettings())
            return x ``;
        return x `
      ${((_b = window.browser_mod) === null || _b === void 0 ? void 0 : _b.fully) && this.getFullySettings()
            ? x ` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`
            : ""}
    `;
    }
    getFullySettings() {
        if (!window.browser_mod.fully)
            return null;
        const retval = [];
        const wcs = [];
        // Web Content Settings
        // Autoplay Videos
        if (window.fully.getBooleanSetting("autoplayVideos") !== "true")
            wcs.push(x `<li>Autoplay Videos</li>`);
        // Autoplay Audio
        if (window.fully.getBooleanSetting("autoplayAudio") !== "true")
            wcs.push(x `<li>Autoplay Audio</li>`);
        // Enable Webcam Access (PLUS)
        if (window.fully.getBooleanSetting("webcamAccess") !== "true")
            wcs.push(x `<li>Enable Webcam Access (PLUS)</li>`);
        if (wcs.length !== 0) {
            retval.push(x `<li>Web Content Settings</li>
        <ul>
          ${wcs}
        </ul>`);
        }
        // Advanced Web Settings
        // Enable JavaScript Interface (PLUS)
        if (window.fully.getBooleanSetting("websiteIntegration") !== "true")
            retval.push(x `<li>Advanced Web Settings</li>
        <ul>
          <li>Enable JavaScript Interface (PLUS)</li>
        </ul>`);
        // Device Management
        // Keep Screen On
        if (window.fully.getBooleanSetting("keepScreenOn") !== "true")
            retval.push(x `<li>Device Management</li>
        <ul>
          <li>Keep Screen On</li>
        </ul>`);
        // Power Settings
        // Prevent from Sleep while Screen Off
        if (window.fully.getBooleanSetting("preventSleepWhileScreenOff") !== "true")
            retval.push(x `<li>Power Settings</li>
        <ul>
          <li>Prevent from Sleep while Screen Off</li>
        </ul>`);
        const md = [];
        // Motion Detection (PLUS)
        // Enable Visual Motion Detection
        if (window.fully.getBooleanSetting("motionDetection") !== "true")
            md.push(x `<li>Enable Visual Motion Detection</li>`);
        // Turn Screen On on Motion
        if (window.fully.getBooleanSetting("screenOnOnMotion") !== "true")
            md.push(x `<li>Turn Screen On on Motion</li>`);
        // Exit Screensaver on Motion
        if (window.fully.getBooleanSetting("stopScreensaverOnMotion") !== "true")
            md.push(x `<li>Exit Screensaver on Motion</li>`);
        if (md.length !== 0) {
            retval.push(x `<li>Motion Detection (PLUS)</li>
        <ul>
          ${md}
        </ul>`);
        }
        // Remote Administration (PLUS)
        // Enable Remote Administration
        if (window.fully.getBooleanSetting("remoteAdmin") !== "true")
            retval.push(x `<li>Remote Administration (PLUS)</li>
        <ul>
          <li>Enable Remote Administration</li>
        </ul>`);
        return retval.length ? retval : null;
    }
    static get styles() {
        return i$2 `
      .card-header {
        display: flex;
        justify-content: space-between;
      }
      ha-textfield {
        display: block;
        margin-top: 8px;
      }
    `;
    }
}
__decorate([
    n$2()
], BrowserModRegisteredBrowsersCard$1.prototype, "hass", void 0);
__decorate([
    n$2()
], BrowserModRegisteredBrowsersCard$1.prototype, "dirty", void 0);
__decorate([
    n$2({ type: Boolean })
], BrowserModRegisteredBrowsersCard$1.prototype, "narrow", void 0);
customElements.define("browser-mod-browser-settings-card", BrowserModRegisteredBrowsersCard$1);

class BrowserModRegisteredBrowsersCard extends s {
    firstUpdated() {
        window.browser_mod.addEventListener("browser-mod-config-update", () => this.requestUpdate());
        this._fetch_entity_registry();
    }
    async _fetch_entity_registry() {
        if (this._entity_registry)
            return;
        this._entity_registry = await this.hass.callWS({
            type: "config/device_registry/list",
        });
    }
    _find_entity(browserID) {
        if (!this._entity_registry)
            return undefined;
        return this._entity_registry.find((v) => {
            var _a;
            return JSON.stringify((_a = v === null || v === void 0 ? void 0 : v.identifiers) === null || _a === void 0 ? void 0 : _a[0]) ===
                JSON.stringify(["browser_mod", browserID]);
        });
    }
    unregister_browser(ev) {
        const browserID = ev.currentTarget.browserID;
        const unregisterCallback = () => {
            if (browserID === window.browser_mod.browserID) {
                window.browser_mod.registered = false;
            }
            else {
                window.browser_mod.connection.sendMessage({
                    type: "browser_mod/unregister",
                    browserID,
                });
            }
        };
        window.browser_mod.showPopup({
            title: "Unregister browser",
            content: `Are you sure you want to unregister Browser ${browserID}?`,
            right_button: "Unregister",
            right_button_variant: "danger",
            right_button_appearance: "accent",
            right_button_action: unregisterCallback,
            left_button: "Cancel",
            left_button_variant: "neutral",
            left_button_appearance: "plain",
        });
    }
    toggle_lock_browser(ev) {
        const browserID = ev.currentTarget.browserID;
        const browser = window.browser_mod.browsers[browserID];
        window.browser_mod.connection.sendMessage({
            type: "browser_mod/register",
            browserID,
            data: Object.assign(Object.assign({}, browser), { locked: !browser.locked }),
        });
    }
    toggle_auto_register(ev) {
        var _a;
        if ((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.global_settings["autoRegister"])
            window.browser_mod.setSetting("global", null, {
                autoRegister: undefined,
            });
        else
            window.browser_mod.setSetting("global", null, { autoRegister: true });
    }
    toggle_lock_register(ev) {
        var _a;
        if ((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.global_settings["lockRegister"])
            window.browser_mod.setSetting("global", null, {
                lockRegister: undefined,
            });
        else
            window.browser_mod.setSetting("global", null, {
                lockRegister: true,
                autoRegister: undefined,
            });
    }
    register_cast() {
        window.browser_mod.connection.sendMessage({
            type: "browser_mod/register",
            browserID: "CAST",
        });
    }
    render() {
        var _a, _b;
        return x `
      <ha-card header="Registered Browsers" outlined>
        <div class="card-content">
          <ha-settings-row>
            <span slot="heading">Auto-register</span>
            <span slot="description">
              Automatically register all new Browsers
            </span>
            <ha-switch
              .checked=${((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.global_settings["autoRegister"]) ===
            true}
              @change=${this.toggle_auto_register}
            ></ha-switch>
          </ha-settings-row>
          <ha-settings-row>
            <span slot="heading">Lock register</span>
            <span slot="description">
              Disable registering or unregistering of all Browsers
            </span>
            <ha-switch
              .checked=${((_b = window.browser_mod) === null || _b === void 0 ? void 0 : _b.global_settings["lockRegister"]) ===
            true}
              @change=${this.toggle_lock_register}
            ></ha-switch>
          </ha-settings-row>

          ${Object.keys(window.browser_mod.browsers).map((d) => {
            const browser = window.browser_mod.browsers[d];
            const device = this._find_entity(d);
            return x ` <ha-settings-row>
              <span slot="heading">
                ${d} ${(device === null || device === void 0 ? void 0 : device.name_by_user) ? `(${device.name_by_user})` : ""}
              </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${browser.last_seen}
                ></ha-relative-time>
              </span>
              ${device
                ? x `
                    <a href="config/devices/device/${device.id}">
                      <ha-icon-button>
                        <ha-icon .icon=${"mdi:devices"}></ha-icon>
                      </ha-icon-button>
                    </a>
                  `
                : ""}
              <ha-icon-button
                .browserID=${d}
                @click=${this.toggle_lock_browser}
              >
                <ha-icon
                  .icon=${browser.locked ? "mdi:lock" : "mdi:lock-open-variant"}
                ></ha-icon>
              </ha-icon-button>
              <ha-icon-button .browserID=${d} @click=${this.unregister_browser}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </ha-icon-button>
            </ha-settings-row>`;
        })}
        </div>
        ${window.browser_mod.browsers["CAST"] === undefined
            ? x `
              <div class="card-actions">
                <ha-button
                  appearance="plain"
                  @click=${this.register_cast}  
                >
                  Register CAST Browser
                </ha-button>
              </div>
            `
            : ""}
      </ha-card>
    `;
    }
    static get styles() {
        return i$2 `
      ha-icon-button > * {
        display: flex;
        color: var(--primary-text-color);
      }
    `;
    }
}
__decorate([
    n$2()
], BrowserModRegisteredBrowsersCard.prototype, "hass", void 0);
__decorate([
    n$2()
], BrowserModRegisteredBrowsersCard.prototype, "_entity_registry", void 0);
customElements.define("browser-mod-registered-browsers-card", BrowserModRegisteredBrowsersCard);

class SidebarSettingsCustomSelector {
    constructor(element) {
        this._element = element;
        if (customElements.get("dialog-edit-sidebar")) {
            this._dialogAvaliable = true;
            return;
        }
        this._dialogAvaliable = false;
        selectTree(document.body, "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar").then((sidebar) => {
            // Home Assistant 2025.6 removed editMode from sidebar
            // so this is the best check to see if sidebar settings dialog is available
            if (sidebar && sidebar.editMode === undefined) {
                const menu = sidebar.shadowRoot.querySelector("div.menu");
                if (menu) {
                    // Simulate hold press on the menu to open the sidebar settings dialog.
                    // Listen once and stop propagation of the show-dialog event
                    // so the dialogImport can be called to make <dialog-edit-sidebar> available
                    // An event method would be nice HA Team!
                    sidebar.addEventListener("show-dialog", (ev) => {
                        var _a, _b, _c;
                        if (((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.dialogTag) === "dialog-edit-sidebar") {
                            ev.stopPropagation();
                            (_c = (_b = ev.detail) === null || _b === void 0 ? void 0 : _b.dialogImport) === null || _c === void 0 ? void 0 : _c.call(_b);
                        }
                    }, { once: true });
                    menu.dispatchEvent(new CustomEvent("action", { detail: { action: "hold" } }));
                }
            }
        });
        customElements.whenDefined("dialog-edit-sidebar").then(async () => {
            this._dialogAvaliable = true;
            await this._element.updateComplete.then(() => this._element.requestUpdate());
        });
    }
    get dialogAvaliable() {
        return this._dialogAvaliable;
    }
    get order() {
        var _a, _b;
        const sidebarPanelOrder = (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.getSetting) === null || _b === void 0 ? void 0 : _b.call(_a, 'sidebarPanelOrder');
        const order = (this._type === "global" ? sidebarPanelOrder.global || '[]' : sidebarPanelOrder[this._type][this._target] || '[]');
        return order;
    }
    get hidden() {
        var _a, _b;
        const sidebarHiddenPanels = (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.getSetting) === null || _b === void 0 ? void 0 : _b.call(_a, 'sidebarHiddenPanels');
        const hidden = (this._type === "global" ? sidebarHiddenPanels.global || '[]' : sidebarHiddenPanels[this._type][this._target] || '[]');
        return hidden;
    }
    async setupDialog() {
        var _a;
        if (!this._dialogAvaliable)
            return;
        this._dialogEditSidebar = document.createElement("dialog-edit-sidebar");
        const base = await hass_base_el();
        if (base && this._dialogEditSidebar) {
            await provideHass(this._dialogEditSidebar);
            this._dialogEditSidebar._order = JSON.parse(this.order);
            this._dialogEditSidebar._hidden = JSON.parse(this.hidden);
            base.shadowRoot.appendChild(this._dialogEditSidebar);
            this._dialogEditSidebar._open = true;
            this._dialogEditSidebar.focus();
            window.addEventListener("popstate", async (ev) => {
                var _a, _b;
                const sidebarSettingsCustomSelectorState = (_a = ev.state) === null || _a === void 0 ? void 0 : _a.sidebarSettingsCustomSelector;
                if (sidebarSettingsCustomSelectorState) {
                    if (!sidebarSettingsCustomSelectorState.open) {
                        if ((_b = this._dialogEditSidebar) === null || _b === void 0 ? void 0 : _b._open)
                            await this._dialogEditSidebar.closeDialog();
                    }
                }
            });
            if (((_a = history.state) === null || _a === void 0 ? void 0 : _a.sidebarSettingsCustomSelector) === undefined) {
                history.replaceState({
                    sidebarSettingsCustomSelector: {
                        open: false,
                    },
                }, "");
            }
            history.pushState({
                sidebarSettingsCustomSelector: {
                    open: true,
                },
            }, "");
            this._dialogEditSidebar.addEventListener("dialog-closed", (ev) => {
                var _a;
                if (((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.dialog) == "dialog-edit-sidebar" && this._dialogEditSidebar) {
                    this._dialogEditSidebar.remove();
                    this._dialogEditSidebar = undefined;
                }
            });
        }
    }
    async customiseDialog() {
        var _a;
        if (!this._dialogEditSidebar)
            return;
        let haMdDialog;
        let cnt = 0;
        while (!haMdDialog && cnt++ < 5) {
            haMdDialog = this._dialogEditSidebar.shadowRoot.querySelector("ha-md-dialog");
            if (!haMdDialog) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }
        const dialogHeader = await selectTree(this._dialogEditSidebar.shadowRoot, "ha-md-dialog ha-dialog-header");
        if (dialogHeader) {
            const styleEl = document.createElement("style");
            dialogHeader.shadowRoot.append(styleEl);
            const typeText = (this._type === "global") ? "Global" : this._type.charAt(0).toUpperCase() + this._type.slice(1) + " - ";
            let targetText = "";
            if (this._type === "user") {
                for (const user of this._allUsers) {
                    if (user.id === this._target) {
                        targetText = user.name;
                        break;
                    }
                }
            }
            else {
                targetText = (_a = this._target) !== null && _a !== void 0 ? _a : "";
            }
            // Hide subtitle message about sync
            // Append Browser Mod details using ::after CSS styling
            styleEl.innerHTML = `
        .header-subtitle {
          display: none;
        }
        .header-title::after {
          content: "- ${typeText}${targetText}";
        }
      `;
        }
    }
    async setupSaveHandler() {
        if (!this._dialogEditSidebar)
            return;
        const haButtonSave = this._dialogEditSidebar.shadowRoot.querySelector('[slot="actions"] > ha-button:nth-child(2)');
        if (haButtonSave) {
            const buttonSave = haButtonSave.shadowRoot.querySelector("button");
            if (buttonSave) {
                buttonSave.addEventListener("click", (ev) => {
                    ev.stopImmediatePropagation();
                    ev.stopPropagation();
                    ev.preventDefault();
                    this._dialogEditSidebar.dispatchEvent(new CustomEvent("sidebar-settings-save"));
                });
            }
        }
    }
    async saveSettings() {
        if (!this._dialogEditSidebar)
            return;
        const order = this._dialogEditSidebar._order;
        const hidden = this._dialogEditSidebar._hidden;
        window.browser_mod.setSetting(this._type, this._target, {
            sidebarHiddenPanels: JSON.stringify(hidden),
            sidebarPanelOrder: JSON.stringify(order),
        });
        this._dialogEditSidebar.closeDialog();
    }
    async changeSetting(type, target, allUsers) {
        var _a, _b;
        if (!this.dialogAvaliable) {
            (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.showPopup) === null || _b === void 0 ? void 0 : _b.call(_a, {
                title: "ERROR!",
                content: "Sidebar settings dialog unavailable.",
                right_button: "OK",
            });
            return;
        }
        this._type = type;
        this._target = target;
        this._allUsers = allUsers;
        await this.setupDialog();
        await this.customiseDialog();
        await this.setupSaveHandler();
        this._dialogEditSidebar.addEventListener("sidebar-settings-save", async () => {
            this.saveSettings();
        });
    }
}

let _users = undefined;
class BrowserModSettingsTable extends s {
    constructor() {
        super(...arguments);
        this.settingSelector = {
            template: {}
        };
        this.tableData = [];
    }
    firstUpdated() {
        window.browser_mod.addEventListener("browser-mod-config-update", () => this.updateTable());
    }
    updated(changedProperties) {
        if (changedProperties.has("settingKey"))
            this.updateTable();
        if (changedProperties.has("hass") &&
            changedProperties.get("hass") === undefined)
            this.updateTable();
    }
    async fetchUsers() {
        if (_users === undefined)
            _users = await this.hass.callWS({ type: "config/auth/list" });
        return _users;
    }
    clearSetting(type, target) {
        var _a;
        const clearSettingCallback = async () => {
            if (this.settingKey === "sidebarPanelOrder") {
                await selectTree(document.body, "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");
                window.browser_mod.setSetting(type, target, {
                    sidebarHiddenPanels: "[]",
                    sidebarPanelOrder: "[]",
                });
                window.browser_mod.setSetting(type, target, {
                    sidebarHiddenPanels: undefined,
                    sidebarPanelOrder: undefined,
                });
                return;
            }
            if (this.default)
                window.browser_mod.setSetting(type, target, {
                    [this.settingKey]: this.default,
                });
            window.browser_mod.setSetting(type, target, {
                [this.settingKey]: undefined,
            });
        };
        (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.showPopup({
            title: "Are you sure",
            content: "Do you wish to clear this setting?",
            right_button: "Clear",
            right_button_variant: "danger",
            right_button_appearance: "accent",
            right_button_action: clearSettingCallback,
            left_button: "Cancel",
            left_button_variant: "neutral",
            left_button_appearance: "plain",
        });
    }
    async changeSetting(type, target) {
        var _a;
        if (this.settingSelector.custom) {
            const allUsers = await this.fetchUsers();
            (_a = this.settingSelector.custom) === null || _a === void 0 ? void 0 : _a.changeSetting(type, target, allUsers);
        }
        else {
            this.changeSettingForm(type, target);
        }
    }
    changeSettingForm(type, target) {
        var _a, _b, _c, _d, _e, _f, _g;
        const changeSettingCallback = async (newValue) => {
            var _a;
            if (this.settingKey === "sidebarPanelOrder") {
                const sideBar = await selectTree(document.body, "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");
                window.browser_mod.setSetting(type, target, {
                    sidebarHiddenPanels: JSON.stringify(sideBar._hiddenPanels),
                    sidebarPanelOrder: JSON.stringify(sideBar._panelOrder),
                });
                return;
            }
            let value = (_a = newValue.value) !== null && _a !== void 0 ? _a : newValue;
            window.browser_mod.setSetting(type, target, { [this.settingKey]: value });
        };
        const settings = (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.getSetting) === null || _b === void 0 ? void 0 : _b.call(_a, this.settingKey);
        const value = (_c = (type === "global" ? settings.global : settings[type][target])) !== null && _c !== void 0 ? _c : this.default;
        const content = (_e = (_d = this.settingSelector.plaintext) !== null && _d !== void 0 ? _d : this.settingSelector.schema) !== null && _e !== void 0 ? _e : [
            {
                name: "value",
                label: (_f = this.settingSelector.label) !== null && _f !== void 0 ? _f : "",
                default: value,
                selector: this.settingSelector,
            },
        ];
        if (this.settingSelector.schema && value !== undefined) {
            _setDefaults(content, value);
            function _setDefaults(schema, data) {
                for (const i of schema) {
                    if (i["schema"]) {
                        _setDefaults(i["schema"], data);
                    }
                    else if (data[i.name] !== undefined) {
                        i.default = data[i.name];
                    }
                }
            }
        }
        (_g = window.browser_mod) === null || _g === void 0 ? void 0 : _g.showPopup({
            title: "Change setting",
            content,
            right_button: "Save",
            right_button_variant: "brand",
            right_button_appearance: "accent",
            right_button_action: changeSettingCallback,
            left_button: "Cancel",
            left_button_variant: "neutral",
            left_button_appearance: "plain",
        });
    }
    addBrowserSetting() {
        var _a, _b;
        const settings = (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.getSetting) === null || _b === void 0 ? void 0 : _b.call(_a, this.settingKey);
        const allBrowsers = window.browser_mod._data.browsers;
        const browsers = [];
        for (const target of Object.keys(allBrowsers)) {
            if (settings.browser[target] == null)
                browsers.push(target);
        }
        if (browsers.length === 0) {
            window.browser_mod.showPopup({
                title: "No browsers to configure",
                content: "All registered browsers have already been configured.",
                right_button: "OK"
            });
            return;
        }
        window.browser_mod.showPopup({
            title: "Select browser to configure",
            content: [
                {
                    name: "browser",
                    label: "",
                    selector: {
                        select: { options: browsers },
                    },
                },
            ],
            right_button: "Next",
            right_button_action: (value) => this.changeSetting("browser", value.browser),
            right_button_variant: "brand",
            right_button_appearance: "filled",
            left_button: "Cancel",
            left_button_variant: "neutral",
            left_button_appearance: "plain",
        });
    }
    async addUserSetting() {
        var _a, _b;
        const settings = (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.getSetting) === null || _b === void 0 ? void 0 : _b.call(_a, this.settingKey);
        const allUsers = await this.fetchUsers();
        const users = [];
        for (const target of allUsers) {
            if (target.username && settings.user[target.id] == null)
                users.push({ label: target.name, value: target.id });
        }
        if (users.length === 0) {
            window.browser_mod.showPopup({
                title: "No users to configure",
                content: "All users have already been configured.",
                right_button: "OK"
            });
            return;
        }
        window.browser_mod.showPopup({
            title: "Select user to configure",
            content: [
                {
                    name: "user",
                    label: "",
                    selector: {
                        select: { options: users },
                    },
                },
            ],
            right_button: "Next",
            right_button_variant: "brand",
            right_button_appearance: "filled",
            right_button_action: (value) => this.changeSetting("user", value.user),
            left_button: "Cancel",
            left_button_variant: "neutral",
            left_button_appearance: "plain",
        });
    }
    async updateTable() {
        var _a, _b;
        if (this.hass === undefined)
            return;
        const users = await this.fetchUsers();
        const settings = (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.getSetting) === null || _b === void 0 ? void 0 : _b.call(_a, this.settingKey);
        const data = [];
        for (const [k, v] of Object.entries(settings.user)) {
            const user = users.find((usr) => usr.id === k);
            if (!user)
                continue;
            let val = (typeof (v) === "object") ? "Config" : String(v);
            if (val.length >= 20)
                val = val.slice(0, 20) + "...";
            data.push({
                name: `User: ${user.name}`,
                value: val,
                controls: x `
          <div>
            <ha-icon-button @click=${() => this.changeSetting("user", k)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${() => this.clearSetting("user", k)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `,
            });
        }
        data.push({
            name: "",
            value: x `
        <ha-button 
          appearance="plain"
          @click=${() => this.addUserSetting()}>
            <ha-icon 
              slot="start" 
              .icon=${"mdi:plus"}>
            </ha-icon>
            Add user setting
        </ha-button>
      `,
        });
        for (const [k, v] of Object.entries(settings.browser)) {
            let val = (typeof (v) === "object") ? "Config" : String(v);
            if (val.length >= 20)
                val = val.slice(0, 20) + "...";
            data.push({
                name: `Browser: ${k}`,
                value: val,
                controls: x `
          <div>
            <ha-icon-button @click=${() => this.changeSetting("browser", k)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${() => this.clearSetting("browser", k)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `,
            });
        }
        data.push({
            name: "",
            value: x `
        <ha-button
          appearance="plain" 
          @click=${() => this.addBrowserSetting()}>
            <ha-icon 
              slot="start" 
              .icon=${"mdi:plus"}>
            </ha-icon>
            Add browser setting
        </ha-button>
      `,
        });
        let globalSetting = settings.global;
        if (globalSetting != null) {
            if (typeof (settings.global) === "object") {
                globalSetting = "Config";
            }
            else {
                globalSetting = String(settings.global);
                if (globalSetting.length >= 20)
                    globalSetting = globalSetting.slice(0, 20) + "...";
            }
        }
        data.push({
            name: "GLOBAL",
            value: globalSetting !== null && globalSetting !== void 0 ? globalSetting : x `<span style="color: var(--warning-color);">DEFAULT</span>`,
            controls: x `
        <div>
          <ha-icon-button @click=${() => this.changeSetting("global", null)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${() => this.clearSetting("global", null)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        </div>
      `,
        });
        this.tableData = data;
    }
    render() {
        var _a, _b;
        (_b = (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.global_settings) === null || _b === void 0 ? void 0 : _b[this.settingKey];
        const columns = {
            name: {
                title: "Name",
                grows: true,
            },
            value: {
                title: "Value",
                grows: true,
                type: "overflow",
            },
            controls: {},
        };
        return x `
      <ha-data-table
        .hass=${this.hass}
        .columns=${columns}
        .data=${this.tableData}
        auto-height
      >
      </ha-data-table>
    `;
    }
    static get styles() {
        return i$2 `
      :host {
        display: block;
      }
    `;
    }
}
__decorate([
    n$2()
], BrowserModSettingsTable.prototype, "settingKey", void 0);
__decorate([
    n$2()
], BrowserModSettingsTable.prototype, "settingSelector", void 0);
__decorate([
    n$2()
], BrowserModSettingsTable.prototype, "hass", void 0);
__decorate([
    n$2()
], BrowserModSettingsTable.prototype, "default", void 0);
__decorate([
    n$2()
], BrowserModSettingsTable.prototype, "tableData", void 0);
customElements.define("browser-mod-settings-table", BrowserModSettingsTable);

loadDeveloperToolsTemplate();
class BrowserModFrontendSettingsCard extends s {
    constructor() {
        super(...arguments);
        this._dashboards = [];
        this._panels = {};
        this._editSidebar = false;
        this._hassUserHasSidebarSettings = false;
        this._savedSidebar = { panelOrder: [], hiddenPanels: [] };
    }
    firstUpdated() {
        window.browser_mod.addEventListener("browser-mod-config-update", () => this.requestUpdate());
        this._sidebarSettingsCustomSelector = new SidebarSettingsCustomSelector(this);
    }
    updated(changedProperties) {
        if (changedProperties.has("hass") &&
            changedProperties.get("hass") === undefined) {
            (async () => {
                this._dashboards = await this.hass.callWS({
                    type: "lovelace/dashboards/list",
                });
                this._panels = this.hass.panels;
                this.checkHassUserSidebarSettings();
            })();
        }
    }
    async checkHassUserSidebarSettings() {
        var _a, _b;
        const userData = await ((_a = this.hass) === null || _a === void 0 ? void 0 : _a.callWS({
            type: 'frontend/get_user_data',
            key: 'sidebar'
        }));
        this._hassUserHasSidebarSettings = (userData && ((_b = userData.value) === null || _b === void 0 ? void 0 : _b.panelOrder));
    }
    async clearHassUserSidebarSettings() {
        var _a;
        const clearSettings = () => {
            var _a;
            this.hass.callWS({
                type: 'frontend/set_user_data',
                key: 'sidebar',
                value: {}
            });
            this.checkHassUserSidebarSettings();
            (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.showPopup({
                title: "Sidebar settings",
                content: "Sidebar settings cleared",
                right_button: "OK"
            });
        };
        (_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.showPopup({
            title: "Sidebar settings",
            content: "Clear sidebar settings synced in this user's Home Assistant profile?",
            right_button: "Clear",
            right_button_variant: "danger",
            right_button_appearance: "accent",
            right_button_action: clearSettings,
            left_button: "Cancel",
            left_button_variant: "neutral",
            left_button_appearance: "plain",
        });
    }
    async toggleEditSidebar() {
        var _a, _b;
        const sideBar = await selectTree(document.body, "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");
        sideBar.editMode = !sideBar.editMode;
        this._editSidebar = sideBar.editMode;
        if (this._editSidebar) {
            this._savedSidebar = {
                panelOrder: sideBar._panelOrder,
                hiddenPanels: sideBar._hiddenPanels,
            };
        }
        else {
            sideBar._panelOrder = (_a = this._savedSidebar.panelOrder) !== null && _a !== void 0 ? _a : [];
            sideBar._hiddenPanels = (_b = this._savedSidebar.hiddenPanels) !== null && _b !== void 0 ? _b : [];
            this._savedSidebar = { panelOrder: [], hiddenPanels: [] };
        }
    }
    _toggle_afj() {
        window.setTimeout(() => {
            var _a;
            const afj = this.shadowRoot.querySelector("#afj");
            afj.checked = true;
            afj.count = ((_a = afj.count) !== null && _a !== void 0 ? _a : 0) + 1;
            if (afj.count && afj.count > 5) {
                afj.disabled = true;
                this.shadowRoot.querySelector("#afj_heading");
                const afj_description = this.shadowRoot.querySelector("#afj_description");
                afj_description.innerHTML =
                    "Something went wrong. Please try again later.";
            }
        }, 500 + Math.random() * 2500);
    }
    render() {
        var _a, _b, _c;
        const db = this._dashboards.map((d) => {
            return { value: d.url_path, label: d.title };
        });
        const dashboardSelector = {
            select: {
                options: [{ value: "lovelace", label: "lovelace (default)" }, ...db],
                custom_value: true,
            },
        };
        const pl = Object.values(this._panels)
            .filter((p) => {
            if (!p.title)
                return false;
            return true;
        }).map((p) => {
            var _a, _b;
            return { value: p.url_path, label: ((_b = (_a = this.hass).localize) === null || _b === void 0 ? void 0 : _b.call(_a, `panel.${p.title}`)) || p.title };
        });
        const panels = [{ value: "lovelace", label: ((_b = (_a = this.hass).localize) === null || _b === void 0 ? void 0 : _b.call(_a, "panel.states")) || "lovelace (default)" }, ...pl];
        return x `
      <ha-card header="Frontend Settings" outlined>
        <div class="card-content">
          <ha-alert alert-type="warning" title="Please note:">
            The settings in this section severely alter the way the Home
            Assistant frontend works and looks. It is very easy to forget that
            you made a change here when you switch devices or users.
            <p>
              Do not report any issues to Home Assistant before clearing
              <b>EVERY</b> setting here and thoroughly clearing all your browser
              caches. Failure to do so means you risk wasting a lot of people's
              time, and you will be severely and rightfully ridiculed.
            </p>
          </ha-alert>
          <p>
            Settings below are applied by first match. I.e. if a matching User
            setting exists, it will be applied. Otherwise any matching Browser
            setting and otherwise the GLOBAL setting if that differs from
            DEFAULT.
          </p>

          ${new Date().getMonth() == 3 && new Date().getDate() < 8
            ? x `
                <ha-expansion-panel
                  .header=${"Extra boring settings"}
                  .secondary=${"Nothing to see here"}
                  leftChevron
                >
                  <ha-settings-row>
                    <span slot="heading" id="afj_heading"
                      >Allow April Fool's jokes</span
                    >
                    <span slot="description" id="afj_description">
                      By enabling this, I consent to any April Fool's Jokes
                      messing with my frontend.
                    </span>
                    <span
                      explanation="Oh hi!
                      You found my April Fool's joke! Well done!
                      Don't worry. This actually does ABSOLUTELY NOTHING.
                      It's just a toggle connected to nothing."
                    ></span>
                    <ha-switch
                      id="afj"
                      .checked=${true}
                      @change=${this._toggle_afj}
                    ></ha-switch>
                  </ha-settings-row>
                </ha-expansion-panel>
              `
            : ``}

          <ha-expansion-panel
            .header=${"Title template"}
            .secondary=${"Jinja template for the browser window/tab title"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"titleTemplate"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Favicon template"}
            .secondary=${"Jinja template for the browser favicon"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"faviconTemplate"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Hide sidebar"}
            .secondary=${"Hide sidebar and remove sidebar menu icon from all panels."}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideSidebar"}
              .settingSelector=${{ boolean: {}, label: "Hide sidebar" }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Hide header"}
            .secondary=${"Completely remove the header from all panels"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideHeader"}
              .settingSelector=${{ boolean: {}, label: "Hide header" }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Overlay icon"}
            .secondary=${"An overlay icon with action to show on selected panels."}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"overlayIcon"}
              .settingSelector=${{ schema: [
                {
                    name: "icon",
                    label: "Icon",
                    selector: { icon: {} }
                },
                {
                    name: "title",
                    label: "Title",
                    selector: { text: {} },
                },
                {
                    name: "action",
                    label: "Action",
                    selector: { object: {} },
                },
                {
                    name: "panels",
                    label: "Show on panels",
                    selector: { select: { multiple: true, options: panels, mode: "dropdown" } }
                },
                {
                    type: "grid",
                    schema: [
                        {
                            name: "top",
                            label: "Top (px)",
                            selector: { number: {} },
                        },
                        {
                            name: "left",
                            label: "Left (px)",
                            selector: { number: {} },
                        },
                        {
                            name: "bottom",
                            label: "Bottom (px)",
                            selector: { number: {} },
                        },
                        {
                            name: "right",
                            label: "Right (px)",
                            selector: { number: {} },
                        },
                    ],
                },
                {
                    name: "class",
                    label: "Class",
                    selector: { text: {} }
                },
                {
                    name: "style",
                    label: "CSS style",
                    selector: { text: { multiline: true } },
                },
            ]
        }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default dashboard"}
            .secondary=${`The dashboard that is shown when navigating to ${location.origin}`}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultPanel"}
              .settingSelector=${dashboardSelector}
              .default=${"lovelace"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default action"}
            .secondary=${`Home Assistant action that executes when browser is opened or refreshed.`}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultAction"}
              .settingSelector=${{ object: {} }}
              .default=${{}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          ${((_c = this._sidebarSettingsCustomSelector) === null || _c === void 0 ? void 0 : _c.dialogAvaliable) ?
            x `
            <ha-expansion-panel
              .header=${"Sidebar order"}
              .secondary=${"Order and visibility of sidebar items."}
              leftChevron
            >
              ${this._hassUserHasSidebarSettings ?
                x `
                <ha-settings-row>
                  <span slot="heading">Sidebar user settings</span>
                  <div slot="description" style="display: flex;">
                    <span>
                    This user has sidebar settings synced to Home Assistant user profile. 
                    It is recommend to clear these settings to allow Browser Mod settings to 
                    take precedence. To check other Home Assistant users, login as that user
                    and check back at this panel.
                    </span>
                    <ha-button
                      variant="danger"
                      appearance="filled"
                      @click=${() => this.clearHassUserSidebarSettings()}
                    >Clear</ha-button>
                  </div>
                </ha-settings-row>`
                : ""}
              <browser-mod-settings-table
                .hass=${this.hass}
                .settingKey=${"sidebarPanelOrder"}
                .settingSelector=${{
                custom: this._sidebarSettingsCustomSelector,
            }}
                .default=${"lovelace"}
              ></browser-mod-settings-table>
            </ha-expansion-panel>`
            :
                x `
          <ha-expansion-panel
            .header=${"Sidebar order"}
            .secondary=${"Order and visibility of sidebar items."}
            leftChevron
          >
            <ha-settings-row>
              <ol slot="heading">
                <li>Click EDIT</li>
                <li>Set up the sidebar as you want it</li>
                <li>Do NOT click DONE</li>
                <li>Add a new setting or edit an old one</li>
                <li>Click RESTORE</li>
              </ol>
              <ha-button
                appearance="plain"
                @click=${() => this.toggleEditSidebar()}>
                  ${this._editSidebar ? "Restore" : "Edit"}
              </ha-button>
            </ha-settings-row>
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"sidebarPanelOrder"}
              .settingSelector=${{
                    plaintext: "Press OK to store the current sidebar order",
                }}
              .default=${"lovelace"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
            `}
          <ha-expansion-panel
            .header=${"Sidebar title"}
            .secondary=${"The title at the top of the sidebar"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"sidebarTitle"}
              .settingSelector=${{ text: {} }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Hide interaction icon"}
            .secondary=${"Hide the icon showing that Browser Mod will not work fully until interacted with"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideInteractIcon"}
              .settingSelector=${{
            boolean: {},
            label: "Hide interaction icon",
        }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Full user interaction"}
            .secondary=${"Use full user interaction if required."}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"fullInteraction"}
              .settingSelector=${{
            boolean: {},
            label: "Use full user interaction",
        }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Save screen state"}
            .secondary=${"Save screen state when browser is disconnected"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"saveScreenState"}
              .settingSelector=${{
            boolean: {},
            label: "Save screen state",
        }}
            ></browser-mod-settings-table>
          </ha-expansion-panel>        </div>
      </ha-card>
    `;
    }
    static get styles() {
        return i$2 `
      .box {
        border: 1px solid var(--divider-color);
        padding: 8px;
      }
      .separator {
        border-bottom: 1px solid var(--divider-color);
        margin: 16px -16px 0px;
      }
      img.favicon {
        width: 64px;
        height: 64px;
        margin-left: 16px;
      }
      mwc-tab-bar ha-icon {
        display: flex;
        align-items: center;
      }
    `;
    }
}
__decorate([
    n$2()
], BrowserModFrontendSettingsCard.prototype, "hass", void 0);
__decorate([
    t()
], BrowserModFrontendSettingsCard.prototype, "_dashboards", void 0);
__decorate([
    t()
], BrowserModFrontendSettingsCard.prototype, "_panels", void 0);
__decorate([
    t()
], BrowserModFrontendSettingsCard.prototype, "_editSidebar", void 0);
__decorate([
    t()
], BrowserModFrontendSettingsCard.prototype, "_hassUserHasSidebarSettings", void 0);
customElements.define("browser-mod-frontend-settings-card", BrowserModFrontendSettingsCard);

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

loadConfigDashboard().then(() => {
    class BrowserModPanel extends s {
        firstUpdated() {
            window.addEventListener("browser-mod-config-update", () => this.requestUpdate());
        }
        render() {
            var _a;
            if (!window.browser_mod)
                return x ``;
            return x `
        <ha-top-app-bar-fixed>
          <ha-menu-button
            slot="navigationIcon"
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${pjson.version})
            <a
              href="https://github.com/thomasloven/hass-browser_mod/blob/master/README.md"
              target="_blank"
            >
              <ha-icon class="icon" .icon=${"mdi:help-circle"}></ha-icon>
            </a>
          </div>

          <ha-config-section .narrow=${this.narrow} full-width>
            <browser-mod-browser-settings-card
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></browser-mod-browser-settings-card>

            ${((_a = this.hass.user) === null || _a === void 0 ? void 0 : _a.is_admin)
                ? x `
                  <browser-mod-registered-browsers-card
                    .hass=${this.hass}
                  ></browser-mod-registered-browsers-card>

                  <browser-mod-frontend-settings-card
                    .hass=${this.hass}
                  ></browser-mod-frontend-settings-card>
                `
                : ""}
          </ha-config-section>
        </ha-top-app-bar-fixed>
      `;
        }
        static get styles() {
            var _a, _b;
            return [
                ...((_b = (_a = customElements.get("ha-config-dashboard")) === null || _a === void 0 ? void 0 : _a.styles) !== null && _b !== void 0 ? _b : []),
                i$2 `
          :host {
            --app-header-background-color: var(--sidebar-background-color);
            --app-header-text-color: var(--sidebar-text-color);
            --app-header-border-bottom: 1px solid var(--divider-color);
            --ha-card-border-radius: var(--ha-config-card-border-radius, 8px);
          }
          ha-config-section {
            padding: 16px 0;
            direction: ltr;
          }
          a {
            color: var(--primary-text-color);
            text-decoration: none;
          }
        `,
            ];
        }
    }
    __decorate([
        n$2()
    ], BrowserModPanel.prototype, "hass", void 0);
    __decorate([
        n$2()
    ], BrowserModPanel.prototype, "narrow", void 0);
    __decorate([
        n$2()
    ], BrowserModPanel.prototype, "connection", void 0);
    customElements.define("browser-mod-panel", BrowserModPanel);
});
