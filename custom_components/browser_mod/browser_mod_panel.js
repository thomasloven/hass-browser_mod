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

// Loads in ha-config-dashboard which is used to copy styling
// Also provides ha-settings-row
const loadDevTools = async () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (customElements.get("ha-config-dashboard"))
        return;
    await customElements.whenDefined("partial-panel-resolver");
    const ppResolver = document.createElement("partial-panel-resolver");
    const routes = ppResolver.getRoutes([
        {
            component_name: "config",
            url_path: "a",
        },
    ]);
    await ((_c = (_b = (_a = routes === null || routes === void 0 ? void 0 : routes.routes) === null || _a === void 0 ? void 0 : _a.a) === null || _b === void 0 ? void 0 : _b.load) === null || _c === void 0 ? void 0 : _c.call(_b));
    await customElements.whenDefined("ha-panel-config");
    const configRouter = document.createElement("ha-panel-config");
    await ((_g = (_f = (_e = (_d = configRouter === null || configRouter === void 0 ? void 0 : configRouter.routerOptions) === null || _d === void 0 ? void 0 : _d.routes) === null || _e === void 0 ? void 0 : _e.dashboard) === null || _f === void 0 ? void 0 : _f.load) === null || _g === void 0 ? void 0 : _g.call(_f)); // Load ha-config-dashboard
    await ((_l = (_k = (_j = (_h = configRouter === null || configRouter === void 0 ? void 0 : configRouter.routerOptions) === null || _h === void 0 ? void 0 : _h.routes) === null || _j === void 0 ? void 0 : _j.cloud) === null || _k === void 0 ? void 0 : _k.load) === null || _l === void 0 ? void 0 : _l.call(_k)); // Load ha-settings-row
    await customElements.whenDefined("ha-config-dashboard");
};

const bmWindow = window;
loadDevTools().then(() => {
    class BrowserModPanel extends s {
        constructor() {
            super(...arguments);
            this.dirty = false;
        }
        toggleRegister() {
            var _a;
            if (!((_a = window.browser_mod) === null || _a === void 0 ? void 0 : _a.connected))
                return;
            window.browser_mod.registered = !window.browser_mod.registered;
            this.dirty = true;
        }
        changeBrowserID(ev) {
            window.browser_mod.browserID = ev.target.value;
            this.dirty = true;
        }
        toggleCameraEnabled() {
            window.browser_mod.cameraEnabled = !window.browser_mod.cameraEnabled;
            this.dirty = true;
        }
        unregister_browser(ev) {
            const browserID = ev.currentTarget.browserID;
            const unregisterCallback = () => {
                console.log(browserID, window.browser_mod.browserID);
                if (browserID === window.browser_mod.browserID) {
                    console.log("Unregister self");
                    window.browser_mod.registered = false;
                }
                else {
                    window.browser_mod.connection.sendMessage({
                        type: "browser_mod/unregister",
                        browserID,
                    });
                }
            };
            window.browser_mod.showPopup("Unregister browser", `Are you sure you want to unregister browser ${browserID}?`, {
                right_button: "Yes",
                right_button_action: unregisterCallback,
                left_button: "No",
            });
        }
        firstUpdated() {
            window.browser_mod.addEventListener("browser-mod-config-update", () => this.requestUpdate());
        }
        getFullySettings() {
            if (!window.browser_mod.fully)
                return null;
            const retval = [];
            const wcs = [];
            // Web Content Settings
            // Autoplay Videos
            if (window.fully.getBooleanSetting("autoplayVideos") !== "true")
                wcs.push($ `<li>Autoplay Videos</li>`);
            // Autoplay Audio
            if (window.fully.getBooleanSetting("autoplayAudio") !== "true")
                wcs.push($ `<li>Autoplay Audio</li>`);
            // Enable Webcam Access (PLUS)
            if (window.fully.getBooleanSetting("webcamAccess") !== "true")
                wcs.push($ `<li>Enable Webcam Access (PLUS)</li>`);
            if (wcs.length !== 0) {
                retval.push($ `<li>Web Content Settings</li>
          <ul>
            ${wcs}
          </ul>`);
            }
            // Advanced Web Settings
            // Enable JavaScript Interface (PLUS)
            if (window.fully.getBooleanSetting("websiteIntegration") !== "true")
                retval.push($ `<li>Advanced Web Settings</li>
          <ul>
            <li>Enable JavaScript Interface (PLUS)</li>
          </ul>`);
            // Device Management
            // Keep Screen On
            if (window.fully.getBooleanSetting("keepScreenOn") !== "true")
                retval.push($ `<li>Device Management</li>
          <ul>
            <li>Keep Screen On</li>
          </ul>`);
            // Power Settings
            // Prevent from Sleep while Screen Off
            if (window.fully.getBooleanSetting("preventSleepWhileScreenOff") !== "true")
                retval.push($ `<li>Power Settings</li>
          <ul>
            <li>Prevent from Sleep while Screen Off</li>
          </ul>`);
            const md = [];
            // Motion Detection (PLUS)
            // Enable Visual Motion Detection
            if (window.fully.getBooleanSetting("motionDetection") !== "true")
                md.push($ `<li>Enable Visual Motion Detection</li>`);
            // Turn Screen On on Motion
            if (window.fully.getBooleanSetting("screenOnOnMotion") !== "true")
                md.push($ `<li>Turn Screen On on Motion</li>`);
            // Exit Screensaver on Motion
            if (window.fully.getBooleanSetting("stopScreensaverOnMotion") !== "true")
                md.push($ `<li>Exit Screensaver on Motion</li>`);
            if (md.length !== 0) {
                retval.push($ `<li>Motion Detection (PLUS)</li>
          <ul>
            ${md}
          </ul>`);
            }
            // Remote Administration (PLUS)
            // Enable Remote Administration
            if (window.fully.getBooleanSetting("remoteAdmin") !== "true")
                retval.push($ `<li>Remote Administration (PLUS)</li>
          <ul>
            <li>Enable Remote Administration</li>
          </ul>`);
            return retval.length ? retval : null;
        }
        render() {
            var _a, _b, _c, _d, _e, _f;
            return $ `
        <ha-app-layout>
          <app-header slot="header" fixed>
            <app-toolbar>
              <ha-menu-button
                .hass=${this.hass}
                .narrow=${this.narrow}
              ></ha-menu-button>
              <div main-title>Browser Mod Settings</div>
            </app-toolbar>
          </app-header>

          <ha-config-section .narrow=${this.narrow} full-width>
            <ha-card outlined>
              <h1 class="card-header">
                <div class="name">This Browser</div>
                ${((_a = bmWindow.browser_mod) === null || _a === void 0 ? void 0 : _a.connected)
                ? $ `
                      <ha-icon
                        class="icon"
                        .icon=${"mdi:check-circle-outline"}
                        style="color: var(--success-color, green);"
                      ></ha-icon>
                    `
                : $ `
                      <ha-icon
                        class="icon"
                        .icon=${"mdi:circle-outline"}
                        style="color: var(--error-color, red);"
                      ></ha-icon>
                    `}
              </h1>
              <div class="card-content">
                <p>Settings that apply to this browser.</p>
                ${this.dirty
                ? $ `
                      <ha-alert alert-type="warning">
                        It is strongly recommended to refresh your browser
                        window after changing any of the settings in this box.
                      </ha-alert>
                    `
                : ""}
              </div>
              <div class="card-content">
                <ha-settings-row>
                  <span slot="heading">Enable</span>
                  <span slot="description"
                    >Enable this browser as a Device in Home Assistant</span
                  >
                  <ha-switch
                    .checked=${(_b = window.browser_mod) === null || _b === void 0 ? void 0 : _b.registered}
                    @change=${this.toggleRegister}
                  ></ha-switch>
                </ha-settings-row>

                <ha-settings-row>
                  <span slot="heading">BrowserID</span>
                  <span slot="description"
                    >A unique identifier for this browser-device
                    combination.</span
                  >
                  <ha-textfield
                    .value=${(_c = window.browser_mod) === null || _c === void 0 ? void 0 : _c.browserID}
                    @change=${this.changeBrowserID}
                  ></ha-textfield>
                </ha-settings-row>

                ${((_d = window.browser_mod) === null || _d === void 0 ? void 0 : _d.registered)
                ? $ `
                      ${this.hass.suspendWhenHidden
                    ? $ `<ha-alert
                            alert-type="warning"
                            title="Auto closing connection"
                          >
                            Home Assistant will close the websocket connection
                            to the server automatically after 5 minutes of
                            inactivity.<br /><br />
                            While decreasing network trafic and memory usage,
                            this may cause problems for browser_mod operation.
                            <br /><br />
                            If you find that some things stop working for this
                            Browser after a time, try going to your
                            <a
                              href="/profile"
                              style="text-decoration: underline; color: var(--primary-color);"
                              >Profile Settings</a
                            >
                            and disabling the option
                            "${this.hass.localize("ui.panel.profile.suspend.header") || "Automatically close connection"}".
                          </ha-alert>`
                    : ""}
                      <ha-settings-row>
                        <span slot="heading">Enable camera</span>
                        <span slot="description"
                          >Get camera input from this browser (hardware
                          dependent)</span
                        >
                        <ha-switch
                          .checked=${(_e = window.browser_mod) === null || _e === void 0 ? void 0 : _e.cameraEnabled}
                          @change=${this.toggleCameraEnabled}
                        ></ha-switch>
                      </ha-settings-row>
                      <ha-alert title="Interaction requirement">
                        For security reasons many browsers require the user to
                        interact with a webpage before allowing audio playback
                        or video capture. This may affect the
                        <code>media_player</code> and
                        <code>camera</code> components of Browser Mod.
                        <br /><br />

                        If you ever see a
                        <ha-icon icon="mdi:gesture-tap"></ha-icon> symbol at the
                        bottom right corner of the screen, please tap or click
                        anywhere on the page. This should allow Browser Mod to
                        work again.
                      </ha-alert>
                      ${((_f = window.browser_mod) === null || _f === void 0 ? void 0 : _f.fully) && this.getFullySettings()
                    ? $ ` <ha-alert title="FullyKiosk Browser">
                            You are using FullyKiosk Browser. It is recommended
                            to enable the following settings:
                            <ul>
                              ${this.getFullySettings()}
                            </ul>
                          </ha-alert>`
                    : ""}
                    `
                : ""}
              </div>
            </ha-card>

            <ha-card header="Registered Browsers" outlined>
              <div class="card-content">
                ${Object.keys(window.browser_mod.browsers).map((d) => $ ` <ha-settings-row>
                    <span slot="heading"> ${d} </span>
                    <span slot="description">
                      Last connected:
                      <ha-relative-time
                        .hass=${this.hass}
                        .datetime=${window.browser_mod.browsers[d].last_seen}
                      ></ha-relative-time>
                    </span>
                    <ha-icon-button
                      .browserID=${d}
                      @click=${this.unregister_browser}
                    >
                      <ha-icon .icon=${"mdi:delete"}></ha-icon>
                    </ha-icon-button>
                  </ha-settings-row>`)}
              </div>
            </ha-card>

            <ha-card outlined header="Tweaks">
              <div class="card-content">
                <ha-settings-row>
                  <span slot="heading">User sidebar</span>
                  <span slot="description"
                    >Save sidebar as default for current user
                    (${this.hass.user.name})</span
                  >
                  <mwc-button>Save</mwc-button>
                </ha-settings-row>
                <ha-settings-row>
                  <span slot="heading">Global sidebar</span>
                  <span slot="description"
                    >Save sidebar as default for all users</span
                  >
                  <mwc-button>Save</mwc-button>
                </ha-settings-row>
              </div>
            </ha-card>
          </ha-config-section>
        </ha-app-layout>
      `;
        }
        static get styles() {
            var _a, _b;
            return [
                ...((_b = (_a = customElements.get("ha-config-dashboard")) === null || _a === void 0 ? void 0 : _a.styles) !== null && _b !== void 0 ? _b : []),
                r$2 `
          :host {
            --app-header-background-color: var(--sidebar-background-color);
            --app-header-text-color: var(--sidebar-text-color);
            --app-header-border-bottom: 1px solid var(--divider-color);
            --ha-card-border-radius: var(--ha-config-card-border-radius, 8px);
          }
          .card-header {
            display: flex;
            justify-content: space-between;
          }
          .card-actions {
            display: flex;
          }
          .spacer {
            flex-grow: 1;
          }
          ha-textfield {
            width: 250px;
            display: block;
            margin-top: 8px;
          }
          .option {
            display: flex;
            margin-top: 16px;
          }
          .option h3 {
            flex-grow: 1;
            margin: 0;
          }
          .option ha-switch {
            margin-top: 0.25em;
            margin-right: 7px;
            margin-left: 0.5em;
          }
          ha-icon-button > * {
            display: flex;
          }
        `,
            ];
        }
    }
    __decorate([
        e()
    ], BrowserModPanel.prototype, "hass", void 0);
    __decorate([
        e()
    ], BrowserModPanel.prototype, "narrow", void 0);
    __decorate([
        e()
    ], BrowserModPanel.prototype, "connection", void 0);
    __decorate([
        e()
    ], BrowserModPanel.prototype, "dirty", void 0);
    customElements.define("browser-mod-panel", BrowserModPanel);
});
