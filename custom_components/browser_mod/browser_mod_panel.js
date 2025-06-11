function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e;var l;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,g={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},p=(e,t)=>t!==e&&(t==t||e==e),w={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:p},v="finalized";class b extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||w}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{i?e.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=w){var s;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:g).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=s.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:g;this._$El=o,this[o]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||p)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var m;b[v]=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:b}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const _=window,f=_.trustedTypes,y=f?f.createPolicy("lit-html",{createHTML:e=>e}):void 0,$="$lit$",S=`lit$${(Math.random()+"").slice(9)}$`,A="?"+S,E=`<${A}>`,x=document,k=()=>x.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,P="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,T=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,N=/"/g,M=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),I=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),j=new WeakMap,K=x.createTreeWalker(x,129,null,!1);function q(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==y?y.createHTML(t):t}const F=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":"",r=U;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===U?"!--"===l[1]?r=H:void 0!==l[1]?r=R:void 0!==l[2]?(M.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=T):void 0!==l[3]&&(r=T):r===T?">"===l[0]?(r=null!=o?o:U,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?T:'"'===l[3]?N:D):r===N||r===D?r=T:r===H||r===R?r=U:(r=T,o=void 0);const c=r===T&&e[t+1].startsWith("/>")?" ":"";n+=r===U?i+E:d>=0?(s.push(a),i.slice(0,d)+$+i.slice(d)+S+c):i+S+(-2===d?(s.push(void 0),t):c)}return[q(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class W{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,d]=F(e,t);if(this.el=W.createElement(l,i),K.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith($)||t.startsWith(S)){const i=d[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+$).split(S),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?Q:"@"===t[1]?X:Y})}else a.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(M.test(s.tagName)){const e=s.textContent.split(S),t=e.length-1;if(t>0){s.textContent=f?f.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],k()),K.nextNode(),a.push({type:2,index:++o});s.append(e[t],k())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(S,e+1));)a.push({type:7,index:o}),e+=S.length-1}o++}}static createElement(e,t){const i=x.createElement("template");return i.innerHTML=e,i}}function z(e,t,i=e,s){var o,n,r,a;if(t===I)return t;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const d=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=z(e,l._$AS(e,t.values),l,s)),t}class V{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:x).importNode(i,!0);K.currentNode=o;let n=K.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new J(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new ee(n,this,e)),this._$AV.push(t),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=K.nextNode(),r++)}return K.currentNode=x,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{constructor(e,t,i,s){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),C(e)?e===L||null==e||""===e?(this._$AH!==L&&this._$AR(),this._$AH=L):e!==this._$AH&&e!==I&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>O(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==L&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(x.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=W.createElement(q(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new V(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=j.get(e.strings);return void 0===t&&j.set(e.strings,t=new W(e)),t}T(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new J(this.k(k()),this.k(k()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Y{constructor(e,t,i,s,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=z(this,e,t,0),n=!C(e)||e!==this._$AH&&e!==I,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=z(this,s[i+r],t,r),a===I&&(a=this._$AH[r]),n||(n=!C(a)||a!==this._$AH[r]),a===L?e=L:e!==L&&(e+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===L?void 0:e}}const Z=f?f.emptyScript:"";class Q extends Y{constructor(){super(...arguments),this.type=4}j(e){e&&e!==L?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class X extends Y{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=z(this,e,t,0))&&void 0!==i?i:L)===I)return;const s=this._$AH,o=e===L&&s!==L||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==L&&(s===L||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}}const te=_.litHtmlPolyfillSupport;null==te||te(W,J),(null!==(m=_.litHtmlVersions)&&void 0!==m?m:_.litHtmlVersions=[]).push("2.8.0");var ie,se;class oe extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let r=n._$litPart$;if(void 0===r){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new J(t.insertBefore(k(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return I}}oe.finalized=!0,oe._$litElement$=!0,null===(ie=globalThis.litElementHydrateSupport)||void 0===ie||ie.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");const re=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}},ae=(e,t,i)=>{t.constructor.createProperty(i,e)};function le(e){return(t,i)=>void 0!==i?ae(e,t,i):re(e,t)}function de(e){return le({...e,state:!0})}var he;null===(he=window.HTMLSlotElement)||void 0===he||he.prototype.assignedElements;const ce="SELECTTREE-TIMEOUT";async function ue(e,t=!1){var i;if((null===(i=e.localName)||void 0===i?void 0:i.includes("-"))&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise((e=>setTimeout(e,100)))}}async function ge(e,t,i=!1){let s=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,i]of t.entries()){const e=s[0];if(!e)return null;i.trim().length&&(ue(e),s="$"===i?[e.shadowRoot]:e.querySelectorAll(i))}return i?s:s[0]}async function pe(e,t,i=!1,s=1e4){return Promise.race([ge(e,t,i),new Promise(((e,t)=>setTimeout((()=>t(new Error(ce))),s)))]).catch((e=>{if(!e.message||e.message!==ce)throw e;return null}))}async function we(){await Promise.race([customElements.whenDefined("home-assistant"),customElements.whenDefined("hc-main")]);const e=customElements.get("home-assistant")?"home-assistant":"hc-main";for(;!document.querySelector(e);)await new Promise((e=>window.setTimeout(e,100)));return document.querySelector(e)}class ve extends oe{constructor(){super(...arguments),this.dirty=!1}toggleRegister(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.ready)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}changeBrowserID(e){window.browser_mod.browserID=e.target.value,this.dirty=!0}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){var e,t,i,s,o,n,r,a,l,d,h;return B`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${(null===(e=window.browser_mod)||void 0===e?void 0:e.ready)?B`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:check-circle-outline"}
                  style="color: var(--success-color, green);"
                ></ha-icon>
              `:B`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:circle-outline"}
                  style="color: var(--error-color, red);"
                ></ha-icon>
              `}
        </h1>
        <div class="card-content">
          ${this.dirty?B`
                <ha-alert alert-type="warning">
                  It is strongly recommended to refresh your browser window
                  after changing any of the settings in this box.
                </ha-alert>
              `:""}
        </div>
        <div class="card-content">
          <ha-settings-row>
            <span slot="heading">Register</span>
            <span slot="description"
              >Enable this browser as a Device in Home Assistant</span
            >
            <ha-switch
              .checked=${null===(t=window.browser_mod)||void 0===t?void 0:t.registered}
              @change=${this.toggleRegister}
              .disabled=${(null===(i=window.browser_mod)||void 0===i?void 0:i.browser_locked)||(null===(s=window.browser_mod)||void 0===s?void 0:s.global_settings.autoRegister)||(null===(o=window.browser_mod)||void 0===o?void 0:o.global_settings.lockRegister)}
            ></ha-switch>
          </ha-settings-row>

          <ha-settings-row>
            <span slot="heading">Browser ID</span>
            <span slot="description"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-textfield
              .value=${null===(n=window.browser_mod)||void 0===n?void 0:n.browserID}
              @change=${this.changeBrowserID}
              .disabled=${null===(r=window.browser_mod)||void 0===r?void 0:r.browser_locked}
            ></ha-textfield>
          </ha-settings-row>

          ${(null===(a=window.browser_mod)||void 0===a?void 0:a.registered)?B`
                ${this._renderSuspensionAlert()}
                <ha-settings-row>
                  <span slot="heading">Enable camera</span>
                  <span slot="description"
                    >Get camera input from this browser (hardware
                    dependent)</span
                  >
                  <ha-switch
                    .checked=${null===(l=window.browser_mod)||void 0===l?void 0:l.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                    .disabled=${null===(d=window.browser_mod)||void 0===d?void 0:d.browser_locked}
                  ></ha-switch>
                </ha-settings-row>
                ${(null===(h=window.browser_mod)||void 0===h?void 0:h.cameraError)?B`
                      <ha-alert alert-type="error">
                        Setting up the device camera failed. Make sure you have
                        allowed use of the camera in your browser.
                      </ha-alert>
                    `:""}
                ${this._renderInteractionAlert()}
                ${this._renderFKBSettingsInfo()}
              `:""}
        </div>
      </ha-card>
    `}_renderSuspensionAlert(){return this.hass.suspendWhenHidden?B`
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
        "${this.hass.localize("ui.panel.profile.suspend.header")||"Automatically close connection"}".
      </ha-alert>
    `:B``}_renderInteractionAlert(){return B`
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
    `}_renderFKBSettingsInfo(){var e,t;return(null===(e=window.browser_mod)||void 0===e?void 0:e.fully)&&this.getFullySettings()?B`
      ${(null===(t=window.browser_mod)||void 0===t?void 0:t.fully)&&this.getFullySettings()?B` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`:""}
    `:B``}getFullySettings(){if(!window.browser_mod.fully)return null;const e=[],t=[];"true"!==window.fully.getBooleanSetting("autoplayVideos")&&t.push(B`<li>Autoplay Videos</li>`),"true"!==window.fully.getBooleanSetting("autoplayAudio")&&t.push(B`<li>Autoplay Audio</li>`),"true"!==window.fully.getBooleanSetting("webcamAccess")&&t.push(B`<li>Enable Webcam Access (PLUS)</li>`),0!==t.length&&e.push(B`<li>Web Content Settings</li>
        <ul>
          ${t}
        </ul>`),"true"!==window.fully.getBooleanSetting("websiteIntegration")&&e.push(B`<li>Advanced Web Settings</li>
        <ul>
          <li>Enable JavaScript Interface (PLUS)</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("keepScreenOn")&&e.push(B`<li>Device Management</li>
        <ul>
          <li>Keep Screen On</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("preventSleepWhileScreenOff")&&e.push(B`<li>Power Settings</li>
        <ul>
          <li>Prevent from Sleep while Screen Off</li>
        </ul>`);const i=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&i.push(B`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&i.push(B`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&i.push(B`<li>Exit Screensaver on Motion</li>`),0!==i.length&&e.push(B`<li>Motion Detection (PLUS)</li>
        <ul>
          ${i}
        </ul>`),"true"!==window.fully.getBooleanSetting("remoteAdmin")&&e.push(B`<li>Remote Administration (PLUS)</li>
        <ul>
          <li>Enable Remote Administration</li>
        </ul>`),e.length?e:null}static get styles(){return r`
      .card-header {
        display: flex;
        justify-content: space-between;
      }
      ha-textfield {
        width: 250px;
        display: block;
        margin-top: 8px;
      }
    `}}e([le()],ve.prototype,"hass",void 0),e([le()],ve.prototype,"dirty",void 0),customElements.define("browser-mod-browser-settings-card",ve);class be extends oe{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate())),this._fetch_entity_registry()}async _fetch_entity_registry(){this._entity_registry||(this._entity_registry=await this.hass.callWS({type:"config/device_registry/list"}))}_find_entity(e){if(this._entity_registry)return this._entity_registry.find((t=>{var i;return JSON.stringify(null===(i=null==t?void 0:t.identifiers)||void 0===i?void 0:i[0])===JSON.stringify(["browser_mod",e])}))}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup("Unregister browser",`Are you sure you want to unregister Browser ${t}?`,{right_button:"Yes",right_button_action:()=>{t===window.browser_mod.browserID?window.browser_mod.registered=!1:window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"No"})}toggle_lock_browser(e){const t=e.currentTarget.browserID,i=window.browser_mod.browsers[t];window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:t,data:Object.assign(Object.assign({},i),{locked:!i.locked})})}toggle_auto_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.autoRegister)?window.browser_mod.setSetting("global",null,{autoRegister:void 0}):window.browser_mod.setSetting("global",null,{autoRegister:!0})}toggle_lock_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.lockRegister)?window.browser_mod.setSetting("global",null,{lockRegister:void 0}):window.browser_mod.setSetting("global",null,{lockRegister:!0,autoRegister:void 0})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){var e,t;return B`
      <ha-card header="Registered Browsers" outlined>
        <div class="card-content">
          <ha-settings-row>
            <span slot="heading">Auto-register</span>
            <span slot="description">
              Automatically register all new Browsers
            </span>
            <ha-switch
              .checked=${!0===(null===(e=window.browser_mod)||void 0===e?void 0:e.global_settings.autoRegister)}
              @change=${this.toggle_auto_register}
            ></ha-switch>
          </ha-settings-row>
          <ha-settings-row>
            <span slot="heading">Lock register</span>
            <span slot="description">
              Disable registering or unregistering of all Browsers
            </span>
            <ha-switch
              .checked=${!0===(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.lockRegister)}
              @change=${this.toggle_lock_register}
            ></ha-switch>
          </ha-settings-row>

          ${Object.keys(window.browser_mod.browsers).map((e=>{const t=window.browser_mod.browsers[e],i=this._find_entity(e);return B` <ha-settings-row>
              <span slot="heading">
                ${e} ${(null==i?void 0:i.name_by_user)?`(${i.name_by_user})`:""}
              </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${t.last_seen}
                ></ha-relative-time>
              </span>
              ${i?B`
                    <a href="config/devices/device/${i.id}">
                      <ha-icon-button>
                        <ha-icon .icon=${"mdi:devices"}></ha-icon>
                      </ha-icon-button>
                    </a>
                  `:""}
              <ha-icon-button
                .browserID=${e}
                @click=${this.toggle_lock_browser}
              >
                <ha-icon
                  .icon=${t.locked?"mdi:lock":"mdi:lock-open-variant"}
                ></ha-icon>
              </ha-icon-button>
              <ha-icon-button .browserID=${e} @click=${this.unregister_browser}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </ha-icon-button>
            </ha-settings-row>`}))}
        </div>
        ${void 0===window.browser_mod.browsers.CAST?B`
              <div class="card-actions">
                <mwc-button @click=${this.register_cast}>
                  Register CAST Browser
                </mwc-button>
              </div>
            `:""}
      </ha-card>
    `}static get styles(){return r`
      ha-icon-button > * {
        display: flex;
        color: var(--primary-text-color);
      }
    `}}e([le()],be.prototype,"hass",void 0),e([le()],be.prototype,"_entity_registry",void 0),customElements.define("browser-mod-registered-browsers-card",be);class me{constructor(){customElements.get("dialog-edit-sidebar")?this._dialogAvaliable=!0:(this._dialogAvaliable=!1,pe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar").then((e=>{if(e&&void 0===e.editMode){const t=e.shadowRoot.querySelector("div.menu");t&&(e.addEventListener("show-dialog",(e=>{var t,i,s;"dialog-edit-sidebar"===(null===(t=e.detail)||void 0===t?void 0:t.dialogTag)&&(e.stopPropagation(),null===(s=null===(i=e.detail)||void 0===i?void 0:i.dialogImport)||void 0===s||s.call(i))}),{once:!0}),t.dispatchEvent(new CustomEvent("action",{detail:{action:"hold"}})))}})),customElements.whenDefined("dialog-edit-sidebar").then((()=>{this._dialogAvaliable=!0})))}get dialogAvaliable(){return this._dialogAvaliable}get order(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,"sidebarPanelOrder");return"global"===this._type?i.global||"[]":i[this._type][this._target]||"[]"}get hidden(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,"sidebarHiddenPanels");return"global"===this._type?i.global||"[]":i[this._type][this._target]||"[]"}async setupDialog(){var e;if(!this._dialogAvaliable)return;this._dialogEditSidebar=document.createElement("dialog-edit-sidebar");const t=await we();t&&this._dialogEditSidebar&&(await async function(e){(await we()).provideHass(e)}(this._dialogEditSidebar),this._dialogEditSidebar._order=JSON.parse(this.order),this._dialogEditSidebar._hidden=JSON.parse(this.hidden),t.shadowRoot.appendChild(this._dialogEditSidebar),this._dialogEditSidebar._open=!0,this._dialogEditSidebar.focus(),window.addEventListener("popstate",(async e=>{var t,i;const s=null===(t=e.state)||void 0===t?void 0:t.sidebarSettingsCustomSelector;s&&(s.open||(null===(i=this._dialogEditSidebar)||void 0===i?void 0:i._open)&&await this._dialogEditSidebar.closeDialog())})),void 0===(null===(e=history.state)||void 0===e?void 0:e.sidebarSettingsCustomSelector)&&history.replaceState({sidebarSettingsCustomSelector:{open:!1}},""),history.pushState({sidebarSettingsCustomSelector:{open:!0}},""),this._dialogEditSidebar.addEventListener("dialog-closed",(e=>{var t;"dialog-edit-sidebar"==(null===(t=e.detail)||void 0===t?void 0:t.dialog)&&this._dialogEditSidebar&&(this._dialogEditSidebar.remove(),this._dialogEditSidebar=void 0)})))}async customiseDialog(){var e;if(!this._dialogEditSidebar)return;let t,i=0;for(;!t&&i++<5;)t=this._dialogEditSidebar.shadowRoot.querySelector("ha-md-dialog"),t||await new Promise((e=>setTimeout(e,500)));const s=await pe(this._dialogEditSidebar.shadowRoot,"ha-md-dialog ha-dialog-header");if(s){const t=document.createElement("style");s.shadowRoot.append(t);const i="global"===this._type?"Global":this._type.charAt(0).toUpperCase()+this._type.slice(1)+" - ";let o="";if("user"===this._type){for(const e of this._allUsers)if(e.id===this._target){o=e.name;break}}else o=null!==(e=this._target)&&void 0!==e?e:"";t.innerHTML=`\n        .header-subtitle {\n          display: none;\n        }\n        .header-title::after {\n          content: "- ${i}${o}";\n        }\n      `}}async setupSaveHandler(){if(!this._dialogEditSidebar)return;const e=this._dialogEditSidebar.shadowRoot.querySelector('[slot="actions"] > ha-button:nth-child(2)');if(e){const t=e.shadowRoot.querySelector("button");t&&t.addEventListener("click",(e=>{e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),this._dialogEditSidebar.dispatchEvent(new CustomEvent("sidebar-settings-save"))}))}}async saveSettings(){if(!this._dialogEditSidebar)return;const e=this._dialogEditSidebar._order,t=this._dialogEditSidebar._hidden;window.browser_mod.setSetting(this._type,this._target,{sidebarHiddenPanels:JSON.stringify(t),sidebarPanelOrder:JSON.stringify(e)}),this._dialogEditSidebar.closeDialog()}async changeSetting(e,t,i){var s,o;this.dialogAvaliable?(this._type=e,this._target=t,this._allUsers=i,await this.setupDialog(),await this.customiseDialog(),await this.setupSaveHandler(),this._dialogEditSidebar.addEventListener("sidebar-settings-save",(async()=>{this.saveSettings()}))):null===(o=null===(s=window.browser_mod)||void 0===s?void 0:s.showPopup)||void 0===o||o.call(s,"ERROR!","Sidebar settings dialog unavailable.",{right_button:"OK"})}}let _e;class fe extends oe{constructor(){super(...arguments),this.settingSelector={template:{}},this.tableData=[]}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.updateTable()))}updated(e){e.has("settingKey")&&this.updateTable(),e.has("hass")&&void 0===e.get("hass")&&this.updateTable()}async fetchUsers(){return void 0===_e&&(_e=await this.hass.callWS({type:"config/auth/list"})),_e}clearSetting(e,t){var i;null===(i=window.browser_mod)||void 0===i||i.showPopup("Are you sure","Do you wish to clear this setting?",{right_button:"Yes",right_button_action:async()=>{if("sidebarPanelOrder"===this.settingKey)return await pe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"),window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:"[]",sidebarPanelOrder:"[]"}),void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:void 0,sidebarPanelOrder:void 0});this.default&&window.browser_mod.setSetting(e,t,{[this.settingKey]:this.default}),window.browser_mod.setSetting(e,t,{[this.settingKey]:void 0})},left_button:"No"})}async changeSetting(e,t){var i;if(this.settingSelector.custom){const s=await this.fetchUsers();null===(i=this.settingSelector.custom)||void 0===i||i.changeSetting(e,t,s)}else this.changeSettingForm(e,t)}changeSettingForm(e,t){var i,s,o,n,r,a;const l=null===(s=null===(i=window.browser_mod)||void 0===i?void 0:i.getSetting)||void 0===s?void 0:s.call(i,this.settingKey),d=null!==(o="global"===e?l.global:l[e][t])&&void 0!==o?o:this.default;null===(n=window.browser_mod)||void 0===n||n.showPopup("Change value",null!==(r=this.settingSelector.plaintext)&&void 0!==r?r:[{name:"value",label:null!==(a=this.settingSelector.label)&&void 0!==a?a:"",default:d,selector:this.settingSelector}],{right_button:"OK",right_button_action:async i=>{if("sidebarPanelOrder"===this.settingKey){const i=await pe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");return void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:JSON.stringify(i._hiddenPanels),sidebarPanelOrder:JSON.stringify(i._panelOrder)})}let s=i.value;window.browser_mod.setSetting(e,t,{[this.settingKey]:s})},left_button:"Cancel"})}addBrowserSetting(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),s=window.browser_mod._data.browsers,o=[];for(const e of Object.keys(s))null==i.browser[e]&&o.push(e);0!==o.length?window.browser_mod.showPopup("Select browser to configure",[{name:"browser",label:"",selector:{select:{options:o}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("browser",e.browser),left_button:"Cancel"}):window.browser_mod.showPopup("No browsers to configure","All registered browsers have already been configured.",{right_button:"OK"})}async addUserSetting(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),s=await this.fetchUsers(),o=[];for(const e of s)e.username&&null==i.user[e.id]&&o.push({label:e.name,value:e.id});0!==o.length?window.browser_mod.showPopup("Select user to configure",[{name:"user",label:"",selector:{select:{options:o}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("user",e.user),left_button:"Cancel"}):window.browser_mod.showPopup("No users to configure","All users have already been configured.",{right_button:"OK"})}async updateTable(){var e,t;if(void 0===this.hass)return;const i=await this.fetchUsers(),s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),o=[];for(const[e,t]of Object.entries(s.user)){const s=i.find((t=>t.id===e));if(!s)continue;let n="object"==typeof t?"Config":String(t);n.length>=20&&(n=n.slice(0,20)+"..."),o.push({name:`User: ${s.name}`,value:n,controls:B`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("user",e)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("user",e)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}o.push({name:"",value:B`
        <mwc-button @click=${()=>this.addUserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add user setting
        </mwc-button>
      `});for(const[e,t]of Object.entries(s.browser)){let i="object"==typeof t?"Config":String(t);i.length>=20&&(i=i.slice(0,20)+"..."),o.push({name:`Browser: ${e}`,value:i,controls:B`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("browser",e)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("browser",e)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}o.push({name:"",value:B`
        <mwc-button @click=${()=>this.addBrowserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add browser setting
        </mwc-button>
      `}),o.push({name:"GLOBAL",value:null!=s.global?"object"==typeof s.global?"Config":String(s.global):B`<span style="color: var(--warning-color);">DEFAULT</span>`,controls:B`
        <div>
          <ha-icon-button @click=${()=>this.changeSetting("global",null)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${()=>this.clearSetting("global",null)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        </div>
      `}),this.tableData=o}render(){var e,t;null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.global_settings)||void 0===t||t[this.settingKey];return B`
      <ha-data-table
        .hass=${this.hass}
        .columns=${{name:{title:"Name",grows:!0},value:{title:"Value",grows:!0},controls:{}}}
        .data=${this.tableData}
        auto-height
      >
      </ha-data-table>
    `}static get styles(){return r`
      :host {
        display: block;
      }
    `}}e([le()],fe.prototype,"settingKey",void 0),e([le()],fe.prototype,"settingSelector",void 0),e([le()],fe.prototype,"hass",void 0),e([le()],fe.prototype,"default",void 0),e([le()],fe.prototype,"tableData",void 0),customElements.define("browser-mod-settings-table",fe),(async()=>{var e,t,i,s,o,n,r;await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==a?void 0:a.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t));const l=document.createElement("developer-tools-router");await(null===(r=null===(n=null===(o=null===(s=null==l?void 0:l.routerOptions)||void 0===s?void 0:s.routes)||void 0===o?void 0:o.template)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await customElements.whenDefined("developer-tools-template")})();class ye extends oe{constructor(){super(...arguments),this._dashboards=[],this._editSidebar=!1,this._hassUserHasSidebarSettings=!1,this._savedSidebar={panelOrder:[],hiddenPanels:[]}}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate())),this._sidebarSettingsCustomSelector=new me}updated(e){e.has("hass")&&void 0===e.get("hass")&&(async()=>{this._dashboards=await this.hass.callWS({type:"lovelace/dashboards/list"}),this.checkHassUserSidebarSettings()})()}async checkHassUserSidebarSettings(){var e,t;const i=await(null===(e=this.hass)||void 0===e?void 0:e.callWS({type:"frontend/get_user_data",key:"sidebar"}));this._hassUserHasSidebarSettings=i&&(null===(t=i.value)||void 0===t?void 0:t.panelOrder)}async clearHassUserSidebarSettings(){var e;null===(e=window.browser_mod)||void 0===e||e.showPopup("Sidebar settings","Clear sidebar settings synced in this user's Home Assistant profile?",{right_button:"Yes",right_button_action:()=>{var e;this.hass.callWS({type:"frontend/set_user_data",key:"sidebar",value:{}}),this.checkHassUserSidebarSettings(),null===(e=window.browser_mod)||void 0===e||e.showPopup("Sidebar setings","Sidebar settings cleared",{right_button:"OK"})},left_button:"No"})}async toggleEditSidebar(){var e,t;const i=await pe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");i.editMode=!i.editMode,this._editSidebar=i.editMode,this._editSidebar?this._savedSidebar={panelOrder:i._panelOrder,hiddenPanels:i._hiddenPanels}:(i._panelOrder=null!==(e=this._savedSidebar.panelOrder)&&void 0!==e?e:[],i._hiddenPanels=null!==(t=this._savedSidebar.hiddenPanels)&&void 0!==t?t:[],this._savedSidebar={panelOrder:[],hiddenPanels:[]})}_toggle_afj(){window.setTimeout((()=>{var e;const t=this.shadowRoot.querySelector("#afj");if(t.checked=!0,t.count=(null!==(e=t.count)&&void 0!==e?e:0)+1,t.count&&t.count>5){t.disabled=!0,this.shadowRoot.querySelector("#afj_heading");this.shadowRoot.querySelector("#afj_description").innerHTML="Something went wrong. Please try again later."}}),500+2500*Math.random())}render(){var e;const t=this._dashboards.map((e=>({value:e.url_path,label:e.title}))),i={select:{options:[{value:"lovelace",label:"lovelace (default)"},...t],custom_value:!0}};return B`
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

          ${3==(new Date).getMonth()&&(new Date).getDate()<8?B`
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
                      .checked=${!0}
                      @change=${this._toggle_afj}
                    ></ha-switch>
                  </ha-settings-row>
                </ha-expansion-panel>
              `:""}

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
            .secondary=${"Completely remove the sidebar from all panels"}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideSidebar"}
              .settingSelector=${{boolean:{},label:"Hide sidebar"}}
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
              .settingSelector=${{boolean:{},label:"Hide header"}}
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
              .settingSelector=${i}
              .default=${"lovelace"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default action"}
            .secondary=${"Home Assistant action that executes when broweser is opened or refreshed."}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultAction"}
              .settingSelector=${{object:{}}}
              .default=${{}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          ${(null===(e=this._sidebarSettingsCustomSelector)||void 0===e?void 0:e.dialogAvaliable)?B`
            <ha-expansion-panel
              .header=${"Sidebar order"}
              .secondary=${"Order and visibility of sidebar items."}
              leftChevron
            >
              ${this._hassUserHasSidebarSettings?B`
                <ha-settings-row >
                  <span slot="heading">Sidebar user settings</span>
                  <span slot="description">
                    This user has sidebar settings synced to Home Assistant user profile. 
                    It is recommend to clear these settings to allow Browser Mod settings to 
                    take precedence. To check other Home Assistant users, login as that user
                    and check back at this panel.
                  </span>
                  <ha-button
                    @click=${()=>this.clearHassUserSidebarSettings()}
                  >Clear</ha-button>
                </ha-settings-row>`:""}
              <browser-mod-settings-table
                .hass=${this.hass}
                .settingKey=${"sidebarPanelOrder"}
                .settingSelector=${{custom:this._sidebarSettingsCustomSelector}}
                .default=${"lovelace"}
              ></browser-mod-settings-table>
            </ha-expansion-panel>`:B`
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
              <mwc-button @click=${()=>this.toggleEditSidebar()}>
                ${this._editSidebar?"Restore":"Edit"}
              </mwc-button>
            </ha-settings-row>
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"sidebarPanelOrder"}
              .settingSelector=${{plaintext:"Press OK to store the current sidebar order"}}
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
              .settingSelector=${{text:{}}}
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
              .settingSelector=${{boolean:{},label:"Hide interaction icon"}}
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
              .settingSelector=${{boolean:{},label:"Save screen state"}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>        </div>
      </ha-card>
    `}static get styles(){return r`
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
    `}}e([le()],ye.prototype,"hass",void 0),e([de()],ye.prototype,"_dashboards",void 0),e([de()],ye.prototype,"_editSidebar",void 0),e([de()],ye.prototype,"_hassUserHasSidebarSettings",void 0),customElements.define("browser-mod-frontend-settings-card",ye);var $e="2.4.0";(async()=>{var e,t,i,s,o,n,r,a,l,d,h,c,u,g,p;await customElements.whenDefined("partial-panel-resolver");const w=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==w?void 0:w.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t)),await customElements.whenDefined("ha-panel-config");const v=document.createElement("ha-panel-config");await(null===(r=null===(n=null===(o=null===(s=null==v?void 0:v.routerOptions)||void 0===s?void 0:s.routes)||void 0===o?void 0:o.dashboard)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await(null===(h=null===(d=null===(l=null===(a=null==v?void 0:v.routerOptions)||void 0===a?void 0:a.routes)||void 0===l?void 0:l.general)||void 0===d?void 0:d.load)||void 0===h?void 0:h.call(d)),await(null===(p=null===(g=null===(u=null===(c=null==v?void 0:v.routerOptions)||void 0===c?void 0:c.routes)||void 0===u?void 0:u.entities)||void 0===g?void 0:g.load)||void 0===p?void 0:p.call(g)),await customElements.whenDefined("ha-config-dashboard")})().then((()=>{class t extends oe{firstUpdated(){window.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){var e;return window.browser_mod?B`
        <ha-top-app-bar-fixed>
          <ha-menu-button
            slot="navigationIcon"
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${$e})
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
            ></browser-mod-browser-settings-card>

            ${(null===(e=this.hass.user)||void 0===e?void 0:e.is_admin)?B`
                  <browser-mod-registered-browsers-card
                    .hass=${this.hass}
                  ></browser-mod-registered-browsers-card>

                  <browser-mod-frontend-settings-card
                    .hass=${this.hass}
                  ></browser-mod-frontend-settings-card>
                `:""}
          </ha-config-section>
        </ha-top-app-bar-fixed>
      `:B``}static get styles(){var e,t;return[...null!==(t=null===(e=customElements.get("ha-config-dashboard"))||void 0===e?void 0:e.styles)&&void 0!==t?t:[],r`
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
        `]}}e([le()],t.prototype,"hass",void 0),e([le()],t.prototype,"narrow",void 0),e([le()],t.prototype,"connection",void 0),customElements.define("browser-mod-panel",t)}));
