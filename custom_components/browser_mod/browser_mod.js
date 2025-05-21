const e="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||"undefined"!=typeof global&&global;function t(e,t,i,o){var s,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(n<3?s(r):n>3?s(t,i,r):s(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}void 0!==e.EventTarget&&function(e){try{new e}catch(e){return!1}return!0}(e.EventTarget)||(e.EventTarget=function(){function e(){this.__listeners=new Map}return e.prototype=Object.create(Object.prototype),e.prototype.addEventListener=function(e,t,i){if(arguments.length<2)throw new TypeError(`TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);const o=this.__listeners,s=e.toString();o.has(s)||o.set(s,new Map);const n=o.get(s);n.has(t)||n.set(t,i)},e.prototype.removeEventListener=function(e,t,i){if(arguments.length<2)throw new TypeError(`TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);const o=this.__listeners,s=e.toString();if(o.has(s)){const e=o.get(s);e.has(t)&&e.delete(t)}},e.prototype.dispatchEvent=function(e){if(!(e instanceof Event))throw new TypeError("Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.");const t=e.type,i=this.__listeners.get(t);if(i)for(const[t,o]of i.entries()){try{"function"==typeof t?t.call(this,e):t&&"function"==typeof t.handleEvent&&t.handleEvent(e)}catch(e){setTimeout((()=>{throw e}))}o&&o.once&&i.delete(t)}return!0},e}()),"function"==typeof SuppressedError&&SuppressedError;const i=window,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class r{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}}const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1]),e[0]);return new r(i,e,s)},d=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e;var l;const c=window,h=c.trustedTypes,u=h?h.emptyScript:"",p=c.reactiveElementPolyfillSupport,v={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),_={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:m},g="finalized";class w extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const o=this._$Ep(i,t);void 0!==o&&(this._$Ev.set(o,i),e.push(o))})),e}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||_}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{o?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const o=document.createElement("style"),s=i.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=t.cssText,e.appendChild(o)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=_){var o;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:v).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,s=o._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=o.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:v;this._$El=s,this[s]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var b;w[g]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:w}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,f=y.trustedTypes,E=f?f.createPolicy("lit-html",{createHTML:e=>e}):void 0,$="$lit$",S=`lit$${(Math.random()+"").slice(9)}$`,x="?"+S,A=`<${x}>`,C=document,T=()=>C.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,k=Array.isArray,I="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,O=/>/g,D=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,j=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),N=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),z=new WeakMap,V=C.createTreeWalker(C,129,null,!1);function q(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const W=(e,t)=>{const i=e.length-1,o=[];let s,n=2===t?"<svg>":"",r=L;for(let t=0;t<i;t++){const i=e[t];let a,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===L?"!--"===d[1]?r=M:void 0!==d[1]?r=O:void 0!==d[2]?(j.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=D):void 0!==d[3]&&(r=D):r===D?">"===d[0]?(r=null!=s?s:L,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?D:'"'===d[3]?U:R):r===U||r===R?r=D:r===M||r===O?r=L:(r=D,s=void 0);const h=r===D&&e[t+1].startsWith("/>")?" ":"";n+=r===L?i+A:l>=0?(o.push(a),i.slice(0,l)+$+i.slice(l)+S+h):i+S+(-2===l?(o.push(void 0),t):h)}return[q(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class G{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,n=0;const r=e.length-1,a=this.parts,[d,l]=W(e,t);if(this.el=G.createElement(d,i),V.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=V.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith($)||t.startsWith(S)){const i=l[n++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+$).split(S),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Q:"?"===t[1]?Y:"@"===t[1]?ee:Z})}else a.push({type:6,index:s})}for(const t of e)o.removeAttribute(t)}if(j.test(o.tagName)){const e=o.textContent.split(S),t=e.length-1;if(t>0){o.textContent=f?f.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],T()),V.nextNode(),a.push({type:2,index:++s});o.append(e[t],T())}}}else if(8===o.nodeType)if(o.data===x)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(S,e+1));)a.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function F(e,t,i=e,o){var s,n,r,a;if(t===N)return t;let d=void 0!==o?null===(s=i._$Co)||void 0===s?void 0:s[o]:i._$Cl;const l=P(t)?void 0:t._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===l?d=void 0:(d=new l(e),d._$AT(e,i,o)),void 0!==o?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[o]=d:i._$Cl=d),void 0!==d&&(t=F(e,d._$AS(e,t.values),d,o)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:C).importNode(i,!0);V.currentNode=s;let n=V.nextNode(),r=0,a=0,d=o[0];for(;void 0!==d;){if(r===d.index){let t;2===d.type?t=new J(n,n.nextSibling,this,e):1===d.type?t=new d.ctor(n,d.name,d.strings,this,e):6===d.type&&(t=new te(n,this,e)),this._$AV.push(t),d=o[++a]}r!==(null==d?void 0:d.index)&&(n=V.nextNode(),r++)}return V.currentNode=C,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{constructor(e,t,i,o){var s;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(s=null==o?void 0:o.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),P(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==N&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>k(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==B&&P(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,s="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=G.createElement(q(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new K(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=z.get(e.strings);return void 0===t&&z.set(e.strings,t=new G(e)),t}T(e){k(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new J(this.k(T()),this.k(T()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Z{constructor(e,t,i,o,s){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const s=this.strings;let n=!1;if(void 0===s)e=F(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==N,n&&(this._$AH=e);else{const o=e;let r,a;for(e=s[0],r=0;r<s.length-1;r++)a=F(this,o[i+r],t,r),a===N&&(a=this._$AH[r]),n||(n=!P(a)||a!==this._$AH[r]),a===B?e=B:e!==B&&(e+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Q extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}const X=f?f.emptyScript:"";class Y extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==B?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class ee extends Z{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=F(this,e,t,0))&&void 0!==i?i:B)===N)return;const o=this._$AH,s=e===B&&o!==B||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==B&&(o===B||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class te{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const ie=y.litHtmlPolyfillSupport;null==ie||ie(G,J),(null!==(b=y.litHtmlVersions)&&void 0!==b?b:y.litHtmlVersions=[]).push("2.8.0");var oe,se;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,s;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let r=n._$litPart$;if(void 0===r){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;n._$litPart$=r=new J(t.insertBefore(T(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return N}}ne.finalized=!0,ne._$litElement$=!0,null===(oe=globalThis.litElementHydrateSupport)||void 0===oe||oe.call(globalThis,{LitElement:ne});const re=globalThis.litElementPolyfillSupport;null==re||re({LitElement:ne}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");const ae=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}},de=(e,t,i)=>{t.constructor.createProperty(i,e)};function le(e){return(t,i)=>void 0!==i?de(e,t,i):ae(e,t)}function ce(e){return le({...e,state:!0})}function he(e,t){return(({finisher:e,descriptor:t})=>(i,o)=>{var s;if(void 0===o){const o=null!==(s=i.originalKey)&&void 0!==s?s:i.key,n=null!=t?{kind:"method",placement:"prototype",key:o,descriptor:t(i.key)}:{...i,key:o};return null!=e&&(n.finisher=function(t){e(t,o)}),n}{const s=i.constructor;void 0!==t&&Object.defineProperty(i,o,t(o)),null==e||e(s,o)}})({descriptor:i=>{const o={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;o.get=function(){var i,o;return void 0===this[t]&&(this[t]=null!==(o=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==o?o:null),this[t]}}return o}})}var ue;null===(ue=window.HTMLSlotElement)||void 0===ue||ue.prototype.assignedElements;class pe extends ne{setConfig(e){}render(){return H` <div>Nothing to configure.</div> `}}customElements.get("browser-player-editor")||(customElements.define("browser-player-editor",pe),window.customCards=window.customCards||[],window.customCards.push({type:"browser-player",name:"Browser Player",preview:!0}));class ve extends ne{static getConfigElement(){return document.createElement("browser-player-editor")}static getStubConfig(){return{}}_reconnect(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.registered)||("hui-card-preview"===this.parentElement.localName?this.removeAttribute("hidden"):this.setAttribute("hidden",""))}async connectedCallback(){var e;super.connectedCallback(),await(null===(e=window.browser_mod)||void 0===e?void 0:e.connectionPromise),this._reconnect()}async setConfig(e){for(var t,i,o,s,n;!window.browser_mod;)await new Promise((e=>setTimeout(e,1e3)));for(const e of["play","pause","ended","volumechange","canplay","loadeddata"])null===(i=null===(t=window.browser_mod)||void 0===t?void 0:t._audio_player)||void 0===i||i.addEventListener(e,(()=>this.requestUpdate()));null===(s=null===(o=window.browser_mod)||void 0===o?void 0:o._video_player)||void 0===s||s.addEventListener(event,(()=>this.requestUpdate())),null===(n=window.browser_mod)||void 0===n||n.addEventListener("browser-mod-connected",(()=>this._reconnect()))}handleMute(e){window.browser_mod.player.muted=!window.browser_mod.player.muted}handleVolumeChange(e){const t=parseFloat(e.target.value);window.browser_mod.player.volume=t/100}handleMoreInfo(e){var t;this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:null===(t=window.browser_mod.browserEntities)||void 0===t?void 0:t.player}}))}handlePlayPause(e){!window.browser_mod.player.src||window.browser_mod.player.paused||window.browser_mod.player.ended?(window.browser_mod.player.play(),window.browser_mod._show_video_player()):window.browser_mod.player.pause()}handleVolumeDown(e){window.browser_mod.player.volume=Math.max(window.browser_mod.player.volume-.1,0)}handleVolumeUp(e){window.browser_mod.player.volume=Math.min(window.browser_mod.player.volume+.1,1)}handleReload(e){const t=window.browser_mod.player.src&&!window.browser_mod.player.paused&&!window.browser_mod.player.ended;window.browser_mod.player.load(),t&&window.browser_mod.player.play()}render(){var e;return window.browser_mod?(null===(e=window.browser_mod)||void 0===e?void 0:e.registered)?H`
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${window.browser_mod.player.muted?"mdi:volume-off":"mdi:volume-high"}
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
            value=${100*window.browser_mod.player.volume}
            @change=${this.handleVolumeChange}
          ></ha-slider>

          ${"stopped"===window.browser_mod.player_state?H`<div class="placeholder"></div>`:H`
                <ha-icon-button @click=${this.handlePlayPause} highlight>
                  <ha-icon
                    .icon=${!window.browser_mod.player.src||window.browser_mod.player.ended||window.browser_mod.player.paused?"mdi:play":"mdi:pause"}
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
    `:H`
        <ha-card>
          <ha-alert> This browser is not registered to Browser Mod. </ha-alert>
        </ha-card>
      `:(window.setTimeout((()=>this.requestUpdate()),100),H``)}static get styles(){return a`
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
    `}}t([le()],ve.prototype,"hass",void 0),t([le({attribute:"edit-mode",reflect:!0})],ve.prototype,"editMode",void 0),customElements.get("browser-player")||customElements.define("browser-player",ve);const me="SELECTTREE-TIMEOUT";async function _e(e,t=!1){var i;if((null===(i=e.localName)||void 0===i?void 0:i.includes("-"))&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise((e=>setTimeout(e,100)))}}async function ge(e,t,i=!1){let o=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,i]of t.entries()){const e=o[0];if(!e)return null;i.trim().length&&(_e(e),o="$"===i?[e.shadowRoot]:e.querySelectorAll(i))}return i?o:o[0]}async function we(e,t,i=!1,o=1e4){return Promise.race([ge(e,t,i),new Promise(((e,t)=>setTimeout((()=>t(new Error(me))),o)))]).catch((e=>{if(!e.message||e.message!==me)throw e;return null}))}async function be(e){let t=await i(e);for(;!t;)await new Promise((e=>setTimeout(e,100))),t=await i(e);return t;async function i(e){let t=await we(e,"home-assistant$home-assistant-main$ha-panel-lovelace$hui-root");return t||(t=await we(e,"hc-main $ hc-lovelace $ hui-view")),t||(t=await we(e,"hc-main $ hc-lovelace $ hui-panel-view")),t}}async function ye(e=!1){let t=await i();for(;e&&!t;)await new Promise((e=>setTimeout(e,100))),t=await i();return t;async function i(){const e=await fe();let t;return e&&(t=e.shadowRoot.querySelector("ha-more-info-dialog")),t}}async function fe(){await Promise.race([customElements.whenDefined("home-assistant"),customElements.whenDefined("hc-main")]);const e=customElements.get("home-assistant")?"home-assistant":"hc-main";for(;!document.querySelector(e);)await new Promise((e=>window.setTimeout(e,100)));return document.querySelector(e)}async function Ee(){const e=await fe();for(;!e.hass;)await new Promise((e=>window.setTimeout(e,100)));return e.hass}async function $e(e){(await fe()).provideHass(e)}const Se=async()=>{var e,t,i;if(void 0!==window.loadCardHelpers)return;await customElements.whenDefined("partial-panel-resolver");const o=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"lovelace",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==o?void 0:o.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t));try{const e=document.createElement("ha-panel-lovelace");e.hass=await Ee(),e.panel={config:{mode:"yaml"}},await e._fetchConfig(!1)}catch(e){}},xe=async()=>{if(customElements.get("ha-form"))return;await Se();const e=await window.loadCardHelpers();if(!e)return;const t=await e.createCardElement({type:"button"});t&&await t.constructor.getConfigElement()};function Ae(e=!1){return function(t,i,o){const s=o.value;let n;const r=function(...t){if(e&&!1===n&&(n=!0),void 0!==n)return;n=!1;const i=s.bind(this)(...t);return n?(n=void 0,r.bind(this)(...t)):(n=void 0,i)};o.value=r}}const Ce=e=>class extends e{constructor(){super(...arguments),this.connected=!1,this.connectionPromise=new Promise((e=>{this._connectionResolve=e})),this.browserEntities={}}LOG(...e){if(void 0===window.browser_mod_log)return;const t=new Date;console.log(`${t.toLocaleTimeString()}`,...e),this.connection.sendMessage({type:"browser_mod/log",message:e[0]})}fireEvent(e,t=void 0){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0}))}incoming_message(e){var t;e.command?(this.LOG("Command:",e),this.fireEvent(`command-${e.command}`,e)):e.browserEntities?this.browserEntities=e.browserEntities:e.result&&this.update_config(e.result),null===(t=this._connectionResolve)||void 0===t||t.call(this),this._connectionResolve=void 0}update_config(e){var t;this.LOG("Receive:",e);let i=!1;!this.registered&&(null===(t=e.browsers)||void 0===t?void 0:t[this.browserID])&&(i=!0),this._data=e,this.registered||!0!==this.global_settings.autoRegister||(this.registered=!0),this.connected||(this.connected=!0,this.fireEvent("browser-mod-connected")),this.fireEvent("browser-mod-config-update"),i&&this.sendUpdate({})}async connect(){const e=(await Ee()).connection;this.connection=e,e.subscribeMessage((e=>this.incoming_message(e)),{type:"browser_mod/connect",browserID:this.browserID}),e.addEventListener("disconnected",(()=>{this.connected=!1,this.fireEvent("browser-mod-disconnected")})),e.addEventListener("ready",(()=>{this.connected=!0,this.fireEvent("browser-mod-connected"),this.sendUpdate({})})),window.addEventListener("connection-status",(e=>{"connected"===e.detail&&(this.connected=!0,this.fireEvent("browser-mod-connected"),window.setTimeout((()=>this.sendUpdate({})),1e3)),"disconnected"===e.detail&&(this.connected=!1,this.fireEvent("browser-mod-disconnected"))})),$e(this)}get config(){var e,t;return null!==(t=null===(e=this._data)||void 0===e?void 0:e.config)&&void 0!==t?t:{}}get browsers(){var e,t;return null!==(t=null===(e=this._data)||void 0===e?void 0:e.browsers)&&void 0!==t?t:[]}get registered(){var e;return void 0!==(null===(e=this.browsers)||void 0===e?void 0:e[this.browserID])}get browser_locked(){var e,t;return null===(t=null===(e=this.browsers)||void 0===e?void 0:e[this.browserID])||void 0===t?void 0:t.locked}set registered(e){(async()=>{if(e){if(this.registered||this.global_settings.lockRegister)return;await this.connection.sendMessage({type:"browser_mod/register",browserID:this.browserID})}else{if(!this.registered)return;await this.connection.sendMessage({type:"browser_mod/unregister",browserID:this.browserID})}})()}async _reregister(e={}){await this.connection.sendMessage({type:"browser_mod/register",browserID:this.browserID,data:Object.assign(Object.assign({},this.browsers[this.browserID]),e)})}get global_settings(){var e,t;const i={},o=null!==(t=null===(e=this._data)||void 0===e?void 0:e.settings)&&void 0!==t?t:{};for(const[e,t]of Object.entries(o))null!==t&&(i[e]=t);return i}get user_settings(){var e,t,i,o,s;const n={},r=null!==(s=null===(t=null===(e=this._data)||void 0===e?void 0:e.user_settings)||void 0===t?void 0:t[null===(o=null===(i=this.hass)||void 0===i?void 0:i.user)||void 0===o?void 0:o.id])&&void 0!==s?s:{};for(const[e,t]of Object.entries(r))null!==t&&(n[e]=t);return n}get browser_settings(){var e,t,i;const o={},s=null!==(i=null===(t=null===(e=this.browsers)||void 0===e?void 0:e[this.browserID])||void 0===t?void 0:t.settings)&&void 0!==i?i:{};for(const[e,t]of Object.entries(s))null!==t&&(o[e]=t);return o}get settings(){return Object.assign(Object.assign(Object.assign({},this.global_settings),this.browser_settings),this.user_settings)}set_setting(e,t,i){var o;switch(i){case"global":this.connection.sendMessage({type:"browser_mod/settings",key:e,value:t});break;case"user":{const i=this.hass.user.id;this.connection.sendMessage({type:"browser_mod/settings",user:i,key:e,value:t});break}case"browser":{const i=null===(o=this.browsers[this.browserID])||void 0===o?void 0:o.settings;i[e]=t,this._reregister({settings:i});break}}}get cameraEnabled(){return this.registered?this.browsers[this.browserID].camera:null}set cameraEnabled(e){this._reregister({camera:e})}sendUpdate(e){this.connected&&this.registered&&(this.LOG("Send:",e),this.connection.sendMessage({type:"browser_mod/update",browserID:this.browserID,data:e}))}browserIDChanged(e,t){var i,o;this.fireEvent("browser-mod-config-update"),void 0!==(null===(i=this.browsers)||void 0===i?void 0:i[e])&&void 0===(null===(o=this.browsers)||void 0===o?void 0:o[this.browserID])&&(async()=>{await this.connection.sendMessage({type:"browser_mod/register",browserID:e,data:Object.assign(Object.assign({},this.browsers[e]),{browserID:this.browserID})})})()}},Te="browser_mod-screen_state",Pe=e=>class extends e{constructor(){super(),this._listeners={},this._brightness=255;const e=this._panel=document.createElement("div");document.body.append(e),e.classList.add("browser-mod-blackout"),e.attachShadow({mode:"open"});const t=document.createElement("style");e.shadowRoot.append(t),t.innerHTML="\n        :host {\n          background: rgba(0,0,0, var(--darkness));\n          position: fixed;\n          left: 0;\n          top: 0;\n          bottom: 0;\n          right: 0;\n          width: 100%;\n          height: 100%;\n          z-index: 10000;\n          display: block;\n          pointer-events: none;\n        }\n        :host([dark]) {\n          background: rgba(0,0,0,1);\n        }\n      ",this.addEventListener("command-screen_off",(()=>this._screen_off())),this.addEventListener("command-screen_on",(e=>this._screen_on(e))),this.addEventListener("fully-update",(()=>this.send_screen_status())),this.addEventListener("browser-mod-disconnected",(()=>this._screen_save_state())),this.addEventListener("browser-mod-connected",(()=>this._screen_restore_state()))}send_screen_status(){this._screen_state=!this._panel.hasAttribute("dark");let e=this._brightness;this.fully&&(this._screen_state=this.fully_screen,e=this.fully_brightness),this.sendUpdate({screen_on:this._screen_state,screen_brightness:e})}_screen_save_state(){if(this.settings.saveScreenState){let e={screen_on:this._screen_state,screen_brightness:this._brightness};localStorage.setItem(Te,JSON.stringify(e))}}_screen_restore_state(){if(this.settings.saveScreenState){const e=localStorage.getItem(Te);if(e){const{screen_on:t,screen_brightness:i}=JSON.parse(e);this._screen_state=t,this._brightness=i,this._screen_state?this._screen_on({detail:{brightness:this._brightness}}):this._screen_off()}else this._screen_on()}else this._screen_on()}_screen_off(){this.fully?this.fully_screen=!1:this._panel.setAttribute("dark",""),this.send_screen_status();const e=()=>this._screen_on();for(const t of["pointerdown","pointermove","keydown"])this._listeners[t]=e,window.addEventListener(t,e)}_screen_on(e=void 0){var t,i;this.fully?(this.fully_screen=!0,(null===(t=null==e?void 0:e.detail)||void 0===t?void 0:t.brightness)&&(this.fully_brightness=e.detail.brightness)):((null===(i=null==e?void 0:e.detail)||void 0===i?void 0:i.brightness)&&(this._brightness=e.detail.brightness,this._panel.style.setProperty("--darkness",1-e.detail.brightness/255)),this._panel.removeAttribute("dark")),this.send_screen_status();for(const e of["pointerdown","pointermove","keydown"])this._listeners[e]&&(window.removeEventListener(e,this._listeners[e]),this._listeners[e]=void 0)}},ke=e=>{class i extends e{constructor(){super(),this._audio_player=new Audio,this._video_player=document.createElement("video"),this._video_player.controls=!0,this._video_player.style.setProperty("width","100%"),this.player=this._audio_player,this._player_enabled=!1,this.extra={};for(const e of["play","pause","ended","volumechange"])this._audio_player.addEventListener(e,(()=>this._player_update())),this._video_player.addEventListener(e,(()=>this._player_update()));for(const e of["timeupdate"])this._audio_player.addEventListener(e,(()=>this._player_update_throttled())),this._video_player.addEventListener(e,(()=>this._player_update_throttled()));this.firstInteraction.then((()=>{this._player_enabled=!0,this.player.ended||this.player.play()})),this.addEventListener("command-player-play",(e=>{var t,i,o,s;this.player.src&&this.player.pause(),(null===(t=e.detail)||void 0===t?void 0:t.media_type)&&((null===(i=e.detail)||void 0===i?void 0:i.media_type.startsWith("video"))?this.player=this._video_player:this.player=this._audio_player),(null===(o=e.detail)||void 0===o?void 0:o.media_content_id)&&(this.player.src=e.detail.media_content_id),this.extra=null===(s=e.detail)||void 0===s?void 0:s.extra,this.player.play(),this._show_video_player()})),this.addEventListener("command-player-pause",(e=>this.player.pause())),this.addEventListener("command-player-stop",(e=>{this.player.src=null,this.player.pause()})),this.addEventListener("command-player-set-volume",(e=>{var t;void 0!==(null===(t=e.detail)||void 0===t?void 0:t.volume_level)&&(this.player.volume=e.detail.volume_level)})),this.addEventListener("command-player-mute",(e=>{var t;void 0!==(null===(t=e.detail)||void 0===t?void 0:t.mute)?this.player.muted=Boolean(e.detail.mute):this.player.muted=!this.player.muted})),this.addEventListener("command-player-seek",(e=>{this.player.currentTime=e.detail.position,setTimeout((()=>this._player_update()),10)})),this.addEventListener("command-player-turn-off",(e=>{this.player===this._video_player&&this._video_player.isConnected?this.closePopup():this.player.src&&this.player.pause(),this.player.src="",this._player_update()})),this.addEventListener("browser-mod-connected",(()=>this._player_update())),this.connectionPromise.then((()=>this._player_update()))}_show_video_player(){this.player===this._video_player&&this.player.src?(we(document,"home-assistant $ dialog-media-player-browse").then((e=>null==e?void 0:e.closeDialog())),this.showPopup(void 0,this._video_player,{dismiss_action:()=>this._video_player.pause(),size:"wide"})):this.player!==this._video_player&&this._video_player.isConnected&&this.closePopup()}_player_update_throttled(){this._player_update()}_player_update(){const e=this._player_enabled?this.player.src&&this.player.src!==window.location.href?this.player.ended?"stopped":this.player.paused?"paused":"playing":"off":"unavailable";this.sendUpdate({player:{volume:this.player.volume,muted:this.player.muted,src:this.player.src,state:e,media_duration:this.player.duration,media_position:this.player.currentTime,extra:this.extra}})}}var o;return t([(o=3e3,function(e,t,i){const s=i.value;let n;i.value=function(...e){if(!n)return n=setTimeout((()=>n=void 0),o),s.bind(this)(...e)}})],i.prototype,"_player_update_throttled",null),i},Ie=e=>class extends e{constructor(){super(),this._framerate=2,this.cameraError=!1,this._setup_camera()}async _setup_camera(){if(this._video)return;if(await this.connectionPromise,await this.firstInteraction,!this.cameraEnabled)return;if(this.fully)return this.update_camera();const e=document.createElement("div");document.body.append(e),e.classList.add("browser-mod-camera"),e.attachShadow({mode:"open"});const t=document.createElement("style");e.shadowRoot.append(t),t.innerHTML="\n      :host {\n        display: none;\n      }";const i=this._video=document.createElement("video");e.shadowRoot.append(i),i.autoplay=!0,i.playsInline=!0,i.style.display="none";const o=this._canvas=document.createElement("canvas");if(e.shadowRoot.append(o),o.style.display="none",navigator.mediaDevices)try{const e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});i.srcObject=e,i.play(),this.update_camera()}catch(e){if("NotAllowedError"!==e.name)throw e;this.cameraError=!0,this.fireEvent("browser-mod-config-update")}}async update_camera(){var e;if(!this.cameraEnabled){const t=null===(e=this._video)||void 0===e?void 0:e.srcObject;return void(t&&(t.getTracks().forEach((e=>e.stop())),this._video.scrObject=void 0))}if(this.fully)this.sendUpdate({camera:this.fully_camera});else{const e=this._video,t=e.videoWidth,i=e.videoHeight;this._canvas.width=t,this._canvas.height=i;this._canvas.getContext("2d").drawImage(e,0,0,t,i),this.sendUpdate({camera:this._canvas.toDataURL("image/jpeg")})}const t=Math.round(1e3/this._framerate);setTimeout((()=>this.update_camera()),t)}},Le=e=>class extends e{constructor(){super(),this.firstInteraction=new Promise((e=>{this._interactionResolve=e})),this.show_indicator()}async show_indicator(){if(await this.connectionPromise,!this.registered)return;if(this.settings.hideInteractIcon)return;const e=document.createElement("div");document.body.append(e),e.classList.add("browser-mod-require-interaction"),e.attachShadow({mode:"open"});const t=document.createElement("style");e.shadowRoot.append(t),t.innerHTML='\n      :host {\n        position: fixed;\n        right: 8px;\n        bottom: 8px;\n        color: var(--warning-color, red);\n        opacity: 0.5;\n        --mdc-icon-size: 48px;\n      }\n      ha-icon::before {\n        content: "Browser\\00a0Mod";\n        font-size: 0.75rem;\n        position: absolute;\n        right: 0;\n        bottom: 90%;\n      }\n      video {\n        display: none;\n      }\n      @media all and (max-width: 450px), all and (max-height: 500px) {\n        ha-icon {\n          --mdc-icon-size: 30px;\n        }\n        ha-icon::before {\n          content: "";\n        }\n      }\n      ';const i=document.createElement("ha-icon");e.shadowRoot.append(i),i.icon="mdi:gesture-tap";const o=this._video=document.createElement("video");e.shadowRoot.append(o);const s=o.play();s&&(s.then((()=>{this._interactionResolve(),o.pause()})).catch((e=>{})),o.pause()),window.addEventListener("pointerdown",(()=>{this._interactionResolve()}),{once:!0}),window.addEventListener("touchstart",(()=>{this._interactionResolve()}),{once:!0}),this.fully&&this._interactionResolve(),await this.firstInteraction,e.remove()}},Me=e=>class extends e{get fully(){return void 0!==window.fully}constructor(){if(super(),this._fully_screensaver=!1,this.fully){for(const e of["screenOn","screenOff","pluggedAC","pluggedUSB","onBatteryLevelChanged","unplugged","networkReconnect","onMotion","onDaydreamStart","onDaydreamStop"])window.fully.bind(e,`window.browser_mod.fullyEvent("${e}");`);window.fully.bind("onScreensaverStart","window.browser_mod._fully_screensaver = true; window.browser_mod.fullyEvent();"),window.fully.bind("onScreensaverStop","window.browser_mod._fully_screensaver = false; window.browser_mod.fullyEvent();")}}get fully_screen(){var e;return!1===this._fully_screensaver&&(null===(e=window.fully)||void 0===e?void 0:e.getScreenOn())}set fully_screen(e){var t,i,o;e?(null===(t=window.fully)||void 0===t||t.turnScreenOn(),null===(i=window.fully)||void 0===i||i.stopScreensaver()):null===(o=window.fully)||void 0===o||o.turnScreenOff()}get fully_brightness(){var e;return null===(e=window.fully)||void 0===e?void 0:e.getScreenBrightness()}set fully_brightness(e){var t;null===(t=window.fully)||void 0===t||t.setScreenBrightness(e)}get fully_camera(){var e;return null===(e=window.fully)||void 0===e?void 0:e.getCamshotJpgBase64()}get fully_data(){const e=window.fully;if(void 0===e)return"undefined";try{return{ip4Address:e.getIp4Address(),ip6Address:e.getIp6Address(),hostname:e.getHostname(),hostname6:e.getHostname6(),macAddress:e.getMacAddress(),wifiSsid:e.getWifiSsid(),wifiBssid:e.getWifiBssid(),wifiSignalLevel:e.getWifiSignalLevel(),serialNumber:e.getSerialNumber(),androidId:e.getAndroidId(),deviceId:e.getDeviceId(),deviceName:e.getDeviceName(),imei:e.getImei(),simSerialNumber:e.getSimSerialNumber(),batteryLevel:e.getBatteryLevel(),screenBrightness:e.getScreenBrightness(),screenOrientation:e.getScreenOrientation(),displayWidth:e.getDisplayWidth(),displayHeight:e.getDisplayHeight(),screenOn:e.getScreenOn(),plugged:e.isPlugged(),keyboardVisible:e.isKeyboardVisible(),wifiEnabled:e.isWifiEnabled(),wifiConnected:e.isWifiConnected(),networkConnected:e.isNetworkConnected(),bluetoothEnabled:e.isBluetoothEnabled(),screenRotationLocked:e.isScreenRotationLocked(),fullyVersion:e.getFullyVersion(),fullyVersionCode:e.getFullyVersionCode(),webViewVersion:e.getWebviewVersion(),androidVersion:e.getAndroidVersion(),androidSdk:e.getAndroidSdk(),deviceModel:e.getDeviceModel(),internalStorageTotalSpace:e.getInternalStorageTotalSpace(),internalStorageFreeSpace:e.getInternalStorageFreeSpace(),externalStorageTotalSpace:e.getExternalStorageTotalSpace(),externalStorageFreeSpace:e.getExternalStorageFreeSpace(),sensorInfo:e.getSensorInfo(),allRxBytesMobile:e.getAllRxBytesMobile(),allTxBytesMobile:e.getAllTxBytesMobile(),allRxBytesWifi:e.getAllRxBytesWifi(),allTxBytesWifi:e.getAllTxBytesWifi()}}catch(e){return String(e)}}fullyEvent(e=void 0){this.fireEvent("fully-update",{event:e})}},Oe=e=>class extends e{constructor(){super(),document.addEventListener("visibilitychange",(()=>this._browser_state_update())),window.addEventListener("location-changed",(()=>this._browser_state_update())),this.addEventListener("fully-update",(()=>this._browser_state_update())),this.addEventListener("browser-mod-connected",(()=>this._browser_state_update())),this.connectionPromise.then((()=>this._browser_state_update()))}_browser_state_update(){(async()=>{var e,t,i,o,s,n,r,a,d,l;const c=navigator.getBattery?await navigator.getBattery():void 0;this.sendUpdate({browser:{path:window.location.pathname,visibility:document.visibilityState,userAgent:navigator.userAgent,currentUser:null===(t=null===(e=this.hass)||void 0===e?void 0:e.user)||void 0===t?void 0:t.name,fullyKiosk:this.fully||!1,width:window.innerWidth,height:window.innerHeight,battery_level:null!==(o=null===(i=window.fully)||void 0===i?void 0:i.getBatteryLevel())&&void 0!==o?o:100*(null==c?void 0:c.level),charging:null!==(n=null===(s=window.fully)||void 0===s?void 0:s.isPlugged())&&void 0!==n?n:null==c?void 0:c.charging,darkMode:null===(a=null===(r=this.hass)||void 0===r?void 0:r.themes)||void 0===a?void 0:a.darkMode,userData:null===(d=this.hass)||void 0===d?void 0:d.user,ip_address:null===(l=window.fully)||void 0===l?void 0:l.getIp4Address(),fully_data:this.fully_data}})})()}async browser_navigate(e){e&&(history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed")))}},De=e=>class extends e{constructor(){super();const e=["sequence","delay","popup","more_info","close_popup","notification","navigate","refresh","set_theme","console","javascript"];for(const t of e)this.addEventListener(`command-${t}`,(e=>{this.service(t,e.detail)}));document.body.addEventListener("ll-custom",(e=>{e.detail.browser_mod&&this._service_action(e.detail.browser_mod)}))}async service(e,t){this._service_action({service:e,data:t,target:{}})}async _service_action({service:e,data:t,target:i}){var o;if(void 0===t&&(t={}),!e)return void console.error("Browser Mod: Service parameter not specified in service call.");let s=e;if(!s.startsWith("browser_mod.")&&s.includes(".")||void 0!==t.browser_id||void 0!==t.user_id){const e=Object.assign({},t),n=Object.assign({},i);"THIS"===e.browser_id&&(e.browser_id=this.browserID),"THIS"===e.user_id&&(e.user_id=null===(o=this.hass)||void 0===o?void 0:o.user.id);const[r,a]=s.split(".");return this.hass.callService(r,a,e,n)}switch(s.startsWith("browser_mod.")&&(s=s.substring(12)),s){case"sequence":for(const e of t.sequence)await this._service_action(e);break;case"delay":await new Promise((e=>setTimeout(e,t.time)));break;case"more_info":const{entity:e,large:i,ignore_popup_card:o}=t;this.showMoreInfo(e,i,o);break;case"popup":const{title:s,content:c}=t,h=function(e,t){var i={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(i[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(o=Object.getOwnPropertySymbols(e);s<o.length;s++)t.indexOf(o[s])<0&&Object.prototype.propertyIsEnumerable.call(e,o[s])&&(i[o[s]]=e[o[s]])}return i}(t,["title","content"]);for(const[e,t]of Object.entries(h))if(e.endsWith("_action")){let i=t;h[e]=e=>{Array.isArray(i)||(i=[i]),i.forEach((t=>{var{action:i,service:o,target:s,data:n}=t;o=null!=i?i:o,this._service_action({service:o,target:s,data:Object.assign(Object.assign({},n),e)})}))}}this.showPopup(s,c,h);break;case"notification":{t.action_action=t.action,delete t.action;var{message:n,action_text:r,action_action:a,duration:d,dismissable:l}=t;let e;e={text:r,action:e=>{a&&r&&(Array.isArray(a)||(a=[a]),a.forEach((t=>{var{action:i,service:o,target:s,data:n}=t;o=null!=i?i:o,this._service_action({service:o,target:s,data:Object.assign(Object.assign({},n),e)})})))}};(await fe()).dispatchEvent(new CustomEvent("hass-notification",{detail:{message:n,action:e,duration:d,dismissable:l}}))}break;case"close_popup":await this.closePopup();break;case"navigate":this.browser_navigate(t.path);break;case"refresh":window.location.href=window.location.href;break;case"set_theme":{const e=Object.assign({},t);if("auto"===e.theme&&(e.theme=void 0),"auto"===e.dark&&(e.dark=void 0),"light"===e.dark&&(e.dark=!1),"dark"===e.dark&&(e.dark=!0),e.primaryColor&&Array.isArray(e.primaryColor)){const[t,i,o]=e.primaryColor;e.primaryColor="#"+((1<<24)+(t<<16)+(i<<8)+o).toString(16).slice(1)}if(e.accentColor&&Array.isArray(e.accentColor)){const[t,i,o]=e.accentColor;e.accentColor="#"+((1<<24)+(t<<16)+(i<<8)+o).toString(16).slice(1)}(await fe()).dispatchEvent(new CustomEvent("settheme",{detail:e}))}break;case"console":Object.keys(t).length>1||t&&void 0===t.message?console.dir(t):console.log(t.message);break;case"javascript":const u=async()=>{let e=await be(document);e&&e.dispatchEvent(new CustomEvent("config-refresh"))},p=async e=>this.connection.sendMessage({type:"browser_mod/log",message:e}),v=`\n          "use strict";\n          ${t.code}\n          `;new Function("hass","data","service","log","lovelace_reload",v)(this.hass,t,window.browser_mod.service,p,u)}}},Re=e=>class extends e{constructor(){super(),this.activityTriggered=!1,this._activityCooldown=15e3;for(const e of["pointerdown","pointermove","keydown"])window.addEventListener(e,(()=>this.activityTrigger(!0)));this.addEventListener("fully-update",(()=>{this.activityTrigger()})),this.addEventListener("browser-mod-connected",(()=>this._activity_state_update()))}_activity_state_update(){this.sendUpdate({activity:this.activityTriggered})}activityTrigger(e=!1){this.activityTriggered||this.sendUpdate({activity:!0}),this.activityTriggered=!0,e&&this.fireEvent("browser-mod-activity"),clearTimeout(this._activityTimeout),this._activityTimeout=setTimeout((()=>this.activityReset()),this._activityCooldown)}activityReset(){clearTimeout(this._activityTimeout),this.activityTriggered&&this.sendUpdate({activity:!1}),this.activityTriggered=!1}},Ue=2;class je{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class He extends je{constructor(e){if(super(e),this.et=B,e.type!==Ue)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===B||null==e)return this.ft=void 0,this.et=e;if(e===N)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}He.directiveName="unsafeHTML",He.resultType=1;const Ne=(e=>(...t)=>({_$litDirective$:e,values:t}))(He),Be=new Set(["assist"]);class ze extends ne{async closeDialog(){var e,t,i,o,s;this.open=!1,null===(t=null===(e=this.card)||void 0===e?void 0:e.remove)||void 0===t||t.call(e),this.card=void 0,clearInterval(this._timeoutTimer),this._autocloseListener&&(window.browser_mod.removeEventListener("browser-mod-activity",this._autocloseListener),this._autocloseListener=void 0),null===(o=null===(i=this._actions)||void 0===i?void 0:i.dismiss_action)||void 0===o||o.call(i),(null===(s=this._cardMod)||void 0===s?void 0:s[0])&&(this._cardMod[0].styles=""),this.dispatchEvent(new CustomEvent("browser-mod-style-hass-more-info-dialog",{bubbles:!1,composed:!1,cancelable:!1,detail:{apply:!1}}))}openDialog(){var e;this.open=!0,null===(e=this.dialog)||void 0===e||e.show(),this.timeout&&(this._timeoutStart=(new Date).getTime(),this._timeoutTimer=setInterval((()=>{const e=(new Date).getTime()-this._timeoutStart,t=e/this.timeout*100;this.timeout_hide_progress||this.style.setProperty("--progress",`${t}%`),e>=this.timeout&&(clearInterval(this._timeoutTimer),this._timeout())}),10)),this._autocloseListener=void 0,this._autoclose&&(this._autocloseListener=()=>this.dialog.close(),window.browser_mod.addEventListener("browser-mod-activity",this._autocloseListener,{once:!0})),customElements.whenDefined("card-mod").then((()=>{var e,t,i,o,s,n,r;null===(t=null===(e=customElements.get("card-mod"))||void 0===e?void 0:e.applyToElement)||void 0===t||t.call(e,this,"more-info",(null===(i=this.card_mod)||void 0===i?void 0:i.style)?{style:this.card_mod.style,debug:null!==(s=null===(o=this.card_mod)||void 0===o?void 0:o.debug)&&void 0!==s&&s}:{style:"{}",debug:null!==(r=null===(n=this.card_mod)||void 0===n?void 0:n.debug)&&void 0!==r&&r},{},!0,"browser_mod-card_mod")})),this.updateComplete.then((()=>{this.card&&we(this.content,"$").then((e=>{if(!e)return;const t=document.createElement("style");t.classList.add("browser-mod-style"),t.innerHTML="\n          ha-card {\n            box-shadow: none !important;\n            border: none !important;\n          }",e.appendChild(t)}))}))}async _build_card(e){const t=await window.loadCardHelpers(),i=await t.createCardElement(e);i.hass=window.browser_mod.hass,$e(i),this.content=i,customElements.get(i.localName)||customElements.whenDefined(i.localName).then((()=>{this._build_card(e)})),i.addEventListener("ll-rebuild",(()=>{this._build_card(e)}))}async setupDialog(e,t,{right_button:i,right_button_action:o,left_button:s,left_button_action:n,dismissable:r=!0,dismiss_action:a,timeout:d,timeout_action:l,timeout_hide_progress:c,size:h,style:u,autoclose:p=!1,card_mod:v,allow_nested_more_info:m=!0}={}){if(this._formdata=void 0,this.title=e,this.card=void 0,this.card_mod=v,t&&t instanceof HTMLElement)this.content=t;else if(t&&Array.isArray(t)){xe();const e=document.createElement("ha-form");e.schema=t,e.computeLabel=e=>{var t;return null!==(t=e.label)&&void 0!==t?t:e.name},e.hass=window.browser_mod.hass,this._formdata={};for(const e of t)e.name&&void 0!==e.default&&(this._formdata[e.name]=e.default);e.data=this._formdata,$e(e),e.addEventListener("value-changed",(t=>{this._formdata=Object.assign({},t.detail.value),e.data=this._formdata})),e.addEventListener("closing",(e=>{e.stopPropagation(),e.preventDefault()})),this.content=e}else t&&"object"==typeof t?(this.card=!0,await this._build_card(t)):this.content=Ne(t);this.right_button=i,this.left_button=s,this.actions=void 0===i?void 0:"",this.dismissable=r,this.timeout=d,this.timeout_hide_progress=c,this._actions={right_button_action:o,left_button_action:n,dismiss_action:a,timeout_action:l},this.wide="wide"===h?"":void 0,this.fullscreen="fullscreen"===h?"":void 0,this.classic="classic"===h?"":void 0,this._style=u,this._autoclose=p,this._allowNestedMoreInfo=m}async do_close(){var e,t,i;const o=null===(e=this._actions)||void 0===e?void 0:e.dismiss_action;(null===(t=this._actions)||void 0===t?void 0:t.dismiss_action)&&(this._actions.dismiss_action=void 0),await(null===(i=this.dialog)||void 0===i?void 0:i.close()),null==o||o(this._formdata)}async _primary(){var e,t,i;(null===(e=this._actions)||void 0===e?void 0:e.dismiss_action)&&(this._actions.dismiss_action=void 0),await this.do_close(),null===(i=null===(t=this._actions)||void 0===t?void 0:t.right_button_action)||void 0===i||i.call(t,this._formdata)}async _secondary(){var e,t,i;(null===(e=this._actions)||void 0===e?void 0:e.dismiss_action)&&(this._actions.dismiss_action=void 0),await this.do_close(),null===(i=null===(t=this._actions)||void 0===t?void 0:t.left_button_action)||void 0===i||i.call(t,this._formdata)}async _timeout(){var e,t,i;(null===(e=this._actions)||void 0===e?void 0:e.dismiss_action)&&(this._actions.dismiss_action=void 0),await this.do_close(),null===(i=null===(t=this._actions)||void 0===t?void 0:t.timeout_action)||void 0===i||i.call(t)}render(){return this.open?H`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        .heading=${void 0!==this.title}
        hideActions
        flexContent
        .scrimClickAction=${this.dismissable?"close":""}
        .escapeKeyAction=${this.dismissable?"close":""}
      >
        ${this.timeout&&!this.timeout_hide_progress?H` <div slot="heading" class="progress"></div> `:""}
        ${this.title?H`
              <ha-dialog-header slot="heading">
                ${this.dismissable?H`
                      <ha-icon-button
                        dialogAction="cancel"
                        slot="navigationIcon"
                      >
                        <ha-icon .icon=${"mdi:close"}></ha-icon>
                      </ha-icon-button>
                    `:""}
                <span slot="title" .title="${this.title}">${this.title}</span>
              </ha-dialog-header>
            `:H``}

        <div class="content" tabindex="-1" dialogInitialFocus>
          <div class="container">${this.content}</div>
          ${void 0!==this.right_button||void 0!==this.left_button?H`
                <div class="buttons">
                  ${void 0!==this.left_button?H`
                        <mwc-button
                          .label=${this.left_button}
                          @click=${this._secondary}
                          class="action-button"
                        ></mwc-button>
                      `:H`<div></div>`}
                  ${void 0!==this.right_button?H`
                        <mwc-button
                          .label=${this.right_button}
                          @click=${this._primary}
                          class="action-button"
                        ></mwc-button>
                      `:""}
                </div>
              `:""}
        </div>
        <style>
          :host {
            ${this._style}
          }
        </style>
      </ha-dialog>
    `:H``}static get styles(){return a`
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
        background-color: var(--mdc-theme-surface, #fff);
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
    `}}t([le()],ze.prototype,"open",void 0),t([le()],ze.prototype,"content",void 0),t([le()],ze.prototype,"title",void 0),t([le({reflect:!0})],ze.prototype,"actions",void 0),t([le({reflect:!0})],ze.prototype,"card",void 0),t([le()],ze.prototype,"right_button",void 0),t([le()],ze.prototype,"left_button",void 0),t([le()],ze.prototype,"dismissable",void 0),t([le({reflect:!0})],ze.prototype,"timeout_hide_progress",void 0),t([le({reflect:!0})],ze.prototype,"wide",void 0),t([le({reflect:!0})],ze.prototype,"fullscreen",void 0),t([le({reflect:!0})],ze.prototype,"classic",void 0),t([le()],ze.prototype,"_style",void 0),t([he("ha-dialog")],ze.prototype,"dialog",void 0),customElements.get("browser-mod-popup")||customElements.define("browser-mod-popup",ze);const Ve=e=>class extends e{constructor(){super(),Se(),this._popupEl=document.createElement("browser-mod-popup"),document.body.append(this._popupEl),this._popupEl.addEventListener("hass-more-info",(async e=>{var t,i;e.stopPropagation();const o=await fe();(null===(t=this._popupEl)||void 0===t?void 0:t._allowNestedMoreInfo)?void 0===(null===(i=e.detail)||void 0===i?void 0:i.ignore_popup_card)&&(e.detail.ignore_popup_card=!0):this._popupEl.do_close(),o.dispatchEvent(e),this._popupEl.dispatchEvent(new CustomEvent("browser-mod-style-hass-more-info-dialog",{bubbles:!1,composed:!1,cancelable:!1,detail:{apply:!0}}))})),this._popupEl.addEventListener("browser-mod-style-hass-more-info-dialog",(async e=>{var t,i;if(!(null===(t=this._popupEl)||void 0===t?void 0:t._allowNestedMoreInfo))return;const o=await ye(!0);if(o){let t=o.shadowRoot.querySelector("#browser-mod-style");t||(t=document.createElement("style"),t.id="browser-mod-style",t.innerHTML="\n            :host([browser-mod-nested]) ha-dialog {\n              position: fixed !important;\n              z-index: 999 !important;\n            }",o.shadowRoot.appendChild(t)),(null===(i=e.detail)||void 0===i?void 0:i.apply)?o.setAttribute("browser-mod-nested",""):o.removeAttribute("browser-mod-nested")}})),this._popupEl.addEventListener("hass-action",(async e=>{var t,i,o,s;const n=e.detail.action;if(n){const r=null===(i=null===(t=e.detail)||void 0===t?void 0:t.config)||void 0===i?void 0:i[`${n}_action`];if(r){if("more-info"===r.action)return e.stopPropagation(),void this.showMoreInfo(r.entity?r.entity:e.detail.config.entity,null!==(o=r.large)&&void 0!==o&&o,null!==(s=r.ignore_popup_card)&&void 0!==s&&s);Be.has(r.action)&&this._popupEl.do_close()}}e.stopPropagation();(await fe()).dispatchEvent(e)})),this._popupEl.addEventListener("show-dialog",(async e=>{e.stopPropagation();(await fe()).dispatchEvent(e)}));window.addEventListener("popstate",(async e=>{var t,i,o;const s=null===(t=e.state)||void 0===t?void 0:t.browserModPopup;s&&(s.open||(null===(i=this._popupEl)||void 0===i?void 0:i.open)&&(null===(o=this._popupEl)||void 0===o?void 0:o.dismissable)&&this._popupEl.do_close())})),this._contextProviderValues=[],this._popupEl.addEventListener("context-request",(async e=>{const t=e.context in this._contextProviderValues?this._contextProviderValues[e.context]:{};e.callback(t,((e,t)=>{}));const i=await fe();i.__contextProviders[e.context].onContextRequest(e),this._contextProviderValues[e.context]=i.__contextProviders[e.context].value}))}showPopup(...e){(async()=>{var t;this._popupEl.open&&await this._popupEl.do_close(),void 0===(null===(t=history.state)||void 0===t?void 0:t.browserModPopup)&&history.replaceState({browserModPopup:{open:!1}},""),history.pushState({browserModPopup:{open:!0}},""),await this._popupEl.setupDialog(...e),this._popupEl.openDialog()})()}async closePopup(...e){this._popupEl.closeDialog();const t=await async function(e=!1){let t=await i(e);for(;e&&!t;)await new Promise((e=>setTimeout(e,100))),t=await i(e);return t;async function i(e=!1){const t=await ye(e);let i;return t&&(i=t.shadowRoot.querySelector("ha-dialog")),i}}();t?t.close():this.showMoreInfo("")}async showMoreInfo(e,t=!1,i=void 0){var o;const s=await fe();if(s.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:e,ignore_popup_card:i}})),t){await new Promise((e=>setTimeout(e,50)));const e=s.shadowRoot.querySelector("ha-more-info-dialog");e&&(e.large=!0)}(null===(o=this._popupEl)||void 0===o?void 0:o.open)&&this._popupEl.dispatchEvent(new CustomEvent("browser-mod-style-hass-more-info-dialog",{bubbles:!1,composed:!1,cancelable:!1,detail:{apply:!0}}))}};var qe="2.3.8";const We=[{name:"entity",label:"Entity",selector:{entity:{}}},{name:"title",label:"Title",selector:{text:{}}},{name:"size",selector:{select:{mode:"dropdown",options:["normal","classic","wide","fullscreen"]}}},{type:"grid",schema:[{name:"right_button",label:"Right button",selector:{text:{}}},{name:"left_button",label:"Left button",selector:{text:{}}}]},{type:"grid",schema:[{name:"right_button_action",label:"Right button action",selector:{object:{}}},{name:"left_button_action",label:"Left button action",selector:{object:{}}}]},{type:"grid",schema:[{name:"dismissable",label:"User dismissable",selector:{boolean:{}}},{name:"timeout",label:"Auto close timeout (ms)",selector:{number:{mode:"box"}}}]},{name:"timeout_hide_progress",label:"Hide timeout progress bar",selector:{boolean:{}}},{type:"grid",schema:[{name:"dismiss_action",label:"Dismiss action",selector:{object:{}}},{name:"timeout_action",label:"Timeout action",selector:{object:{}}}]},{name:"allow_nested_more_info",label:"Allow nested more-info dialogs",default:!0,selector:{boolean:{}}},{name:"style",label:"CSS style",selector:{text:{multiline:!0}}}];class Ge extends ne{constructor(){super(...arguments),this._selectedTab=0,this._cardGUIMode=!0,this._cardGUIModeAvailable=!0}setConfig(e){this._config=e}connectedCallback(){super.connectedCallback(),xe()}_handleSwitchTab(e){this._selectedTab="settings"==e.detail.name?0:1}_configChanged(e){e.stopPropagation(),this._config&&(this._config=Object.assign({},e.detail.value),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}})))}_cardConfigChanged(e){if(e.stopPropagation(),!this._config)return;const t=Object.assign({},e.detail.config);this._config=Object.assign(Object.assign({},this._config),{card:t}),this._cardGUIModeAvailable=e.detail.guiModeAvailable,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_toggleCardMode(e){var t;null===(t=this._cardEditorEl)||void 0===t||t.toggleMode()}_deleteCard(e){this._config&&(this._config=Object.assign({},this._config),delete this._config.card,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}})))}_cardGUIModeChanged(e){e.stopPropagation(),this._cardGUIMode=e.detail.guiMode,this._cardGUIModeAvailable=e.detail.guiModeAvailable}render(){return this.hass&&this._config?H`
      <div class="card-config">
        <div class="toolbar">
          <sl-tab-group
            @sl-tab-show=${this._handleSwitchTab}
          >
            <sl-tab slot="nav" .panel=${"settings"} .active=${0==this._selectedTab}>Settings</sl-tab>
            <sl-tab slot="nav" .panel=${"card"} .active=${1==this._selectedTab}>Card</sl-tab>
          </sl-tab-group>
        </div>
        <div id="editor">
          ${[this._renderSettingsEditor,this._renderCardEditor][this._selectedTab].bind(this)()}
        </div>
      </div>
    `:H``}_renderSettingsEditor(){return H`<div class="box">
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${We}
        .computeLabel=${e=>{var t;return null!==(t=e.label)&&void 0!==t?t:e.name}}
        @value-changed=${this._configChanged}
      ></ha-form>
    </div>`}_renderCardEditor(){return H`
      <div class="box cards">
        ${this._config.card?H`
              <div class="toolbar">
                <mwc-button
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${!this._cardEditorEl||this._cardGUIMode?"Show code editor":"Show visual editor"}
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
            `:H`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardConfigChanged}
              ></hui-card-picker>
            `}
      </div>
    `}static get styles(){return a`
      sl-tab-group {
        margin-bottom: 16px;
      }

      sl-tab {
        flex: 1;
      }

      sl-tab::part(base) {
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
    `}}t([ce()],Ge.prototype,"_config",void 0),t([le()],Ge.prototype,"lovelace",void 0),t([le()],Ge.prototype,"hass",void 0),t([ce()],Ge.prototype,"_selectedTab",void 0),t([ce()],Ge.prototype,"_cardGUIMode",void 0),t([ce()],Ge.prototype,"_cardGUIModeAvailable",void 0),t([he("hui-card-element-editor")],Ge.prototype,"_cardEditorEl",void 0),window.addEventListener("browser-mod-bootstrap",(async e=>{for(e.stopPropagation();!window.browser_mod;)await new Promise((e=>setTimeout(e,1e3)));await window.browser_mod.connectionPromise,customElements.get("popup-card-editor")||(customElements.define("popup-card-editor",Ge),window.customCards=window.customCards||[],window.customCards.push({type:"popup-card",name:"Popup card",preview:!1,description:"Replace the more-info dialog for a given entity in the view that includes this card. (Browser Mod)"}))}));class Fe extends ne{constructor(){super(...arguments),this.preview=!1}static getConfigElement(){return document.createElement("popup-card-editor")}static getStubConfig(e,t){return{entity:t[0],title:"Custom popup",dismissable:!0,card:{type:"markdown",content:"This replaces the more-info dialog"}}}setConfig(e){this._config=e,(async()=>{const t=await window.loadCardHelpers();this._element=await t.createCardElement(e.card),this._element.hass=this.hass})()}updated(e){super.updated(e),e.has("hass")&&this._element&&(this._element.hass=this.hass)}getCardSize(){return 0}render(){return this.setHidden(!this.preview),this.preview?H` <ha-card>
      <div class="app-toolbar">
        ${this._config.dismissable?H`
              <ha-icon-button>
                <ha-icon .icon=${"mdi:close"}></ha-icon>
              </ha-icon-button>
            `:""}
        <div class="main-title">${this._config.title}</div>
      </div>
      ${this._element}
      <style>
        :host {
        ${this._config.style}
        }
      </style>
      ${void 0!==this._config.right_button||void 0!==this._config.left_button?H`
            <footer class="mdc-dialog__actions">
              <span>
                ${void 0!==this._config.left_button?H`
                      <mwc-button
                        .label=${this._config.left_button}
                      ></mwc-button>
                    `:""}
              </span>
              <span>
                ${void 0!==this._config.right_button?H`
                      <mwc-button
                        .label=${this._config.right_button}
                      ></mwc-button>
                    `:""}
              </span>
            </footer>
          `:""}
    </ha-card>`:H``}setHidden(e){this.hasAttribute("hidden")!==e&&(this.toggleAttribute("hidden",e),this.dispatchEvent(new Event("card-visibility-changed",{bubbles:!0,composed:!0})))}static get styles(){return a`
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
    `}}t([le()],Fe.prototype,"hass",void 0),t([ce()],Fe.prototype,"_config",void 0),t([le({type:Boolean,reflect:!0})],Fe.prototype,"preview",void 0),t([ce()],Fe.prototype,"_element",void 0),window.addEventListener("browser-mod-bootstrap",(async e=>{for(e.stopPropagation();!window.browser_mod;)await new Promise((e=>setTimeout(e,1e3)));await window.browser_mod.connectionPromise,customElements.get("popup-card")||customElements.define("popup-card",Fe);let t=await be(document);window.addEventListener("location-changed",(async()=>{t=await be(document)})),window.addEventListener("hass-more-info",(e=>{var i,o,s,n;if((null===(i=e.detail)||void 0===i?void 0:i.ignore_popup_card)||!(null===(o=e.detail)||void 0===o?void 0:o.entityId)||!t)return;const r=function(e,t){var i,o;const s=null===(i=null==e?void 0:e.lovelace)||void 0===i?void 0:i.config;if(s){const i=null!==(o=null==e?void 0:e._curView)&&void 0!==o?o:0,n=s.views[i];if(n.cards)for(const e of n.cards){if("custom:popup-card"===e.type&&e.entity===t)return e;if(e.cards)for(const i of e.cards)if("custom:popup-card"===i.type&&i.entity===t)return i}if(n.sections)for(const e of n.sections)if(e.cards)for(const i of e.cards){if("custom:popup-card"===i.type&&i.entity===t)return i;if(i.cards)for(const e of i.cards)if("custom:popup-card"===e.type&&e.entity===t)return e}}return null}(t,null===(s=e.detail)||void 0===s?void 0:s.entityId);if(r){e.stopPropagation(),e.preventDefault();let i=Object.assign({},r);delete i.card,delete i.entity,delete i.type,null===(n=window.browser_mod)||void 0===n||n.service("popup",Object.assign({content:r.card},i)),setTimeout((()=>t.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:""}}))),10)}}))}));const Ke=e=>{class i extends e{async runHideHeader(){for(;!await this._hideHeader();)await new Promise((e=>setTimeout(e,500)))}async runUpdateTitle(){await async function(e,t,i){for(;t--;)await e(),await new Promise((e=>setTimeout(e,i)))}((()=>this._updateTitle()),3,500)}constructor(){super(),this.__currentTitle=void 0;const e=async()=>{this.runUpdateTitle(),this.runHideHeader()};this._auto_settings_setup(),this.addEventListener("browser-mod-config-update",(()=>{this._auto_settings_setup(),e()})),window.addEventListener("location-changed",e)}async _auto_settings_setup(){await this.connectionPromise;const e=this.settings;e.sidebarPanelOrder&&localStorage.setItem("sidebarPanelOrder",e.sidebarPanelOrder),e.sidebarHiddenPanels&&localStorage.setItem("sidebarHiddenPanels",e.sidebarHiddenPanels),e.defaultPanel&&localStorage.setItem("defaultPanel",`"${e.defaultPanel}"`),!0===e.hideSidebar&&(we(document.body,"home-assistant $ home-assistant-main").then((e=>{var t;return null===(t=null==e?void 0:e.style)||void 0===t?void 0:t.setProperty("--mdc-drawer-width","0px")})),we(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar").then((e=>{var t;return null===(t=null==e?void 0:e.remove)||void 0===t?void 0:t.call(e)}))),e.sidebarTitle&&(async()=>{this._sidebarTitleSubscription&&this._sidebarTitleSubscription(),this._sidebarTitleSubscription=void 0,this._sidebarTitleSubscription=await this.connection.subscribeMessage(this._updateSidebarTitle,{type:"render_template",template:e.sidebarTitle,variables:{}})})(),void 0!==e.faviconTemplate&&(async()=>{this._faviconTemplateSubscription&&this._faviconTemplateSubscription(),this._faviconTemplateSubscription=void 0,this._faviconTemplateSubscription=await this.connection.subscribeMessage(this._updateFavicon,{type:"render_template",template:e.faviconTemplate,variables:{}})})(),void 0!==e.titleTemplate&&(async()=>{this._titleTemplateSubscription&&this._titleTemplateSubscription(),this._titleTemplateSubscription=void 0,this._titleTemplateSubscription=await this.connection.subscribeMessage(this._updateTitle.bind(this),{type:"render_template",template:e.titleTemplate,variables:{}})})()}async _updateSidebarTitle({result:e}){let t,i=0;for(;!t&&i++<5;)t=await we(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar $ .title"),t||await new Promise((e=>setTimeout(e,500)));t&&(t.innerHTML=e)}get _currentFavicon(){const e=document.head.querySelector("link[rel~='icon']");return null==e?void 0:e.href}_updateFavicon({result:e}){document.head.querySelector("link[rel~='icon']").href=e}get _currentTitle(){return this.__currentTitle}_updateTitle(e=void 0){e&&(this.__currentTitle=e.result),this.__currentTitle&&(document.title=this.__currentTitle)}async _hideHeader(){var e,t,i;if(!0!==this.settings.hideHeader&&!0!==this.settings.hideSidebar)return!0;const o=await we(document.body,"home-assistant $ home-assistant-main $ ha-drawer partial-panel-resolver");if(!o)return!1;let s,n=await we(o,"ha-panel-lovelace$hui-root$.header");if(n)s=n.querySelector("ha-menu-button");else{let i=0,r=o;for(;r&&"ha-top-app-bar-fixed"!==r.localName&&i++<5;){await _e(r,!0);const i=null!==(t=null!==(e=r.querySelector("ha-top-app-bar-fixed"))&&void 0!==e?e:r.firstElementChild)&&void 0!==t?t:r.shadowRoot;r=i}if("ha-top-app-bar-fixed"!==(null==r?void 0:r.localName))return!1;n=r.shadowRoot.querySelector("header"),s=r.querySelector("ha-menu-button")}return n&&!0===this.settings.hideHeader?(o.style.setProperty("--header-height","0px"),n.style.setProperty("display","none"),!0):!(!s||!0!==this.settings.hideSidebar)&&(null===(i=s.remove)||void 0===i||i.call(s),!0)}getSetting(e){var t,i,o,s;const n={global:void 0,browser:{},user:{}};n.global=null===(t=this._data.settings)||void 0===t?void 0:t[e];for(const[t,s]of Object.entries(null!==(i=this._data.browsers)&&void 0!==i?i:{}))null!=(null===(o=s.settings)||void 0===o?void 0:o[e])&&(n.browser[t]=s.settings[e]);for(const[t,i]of Object.entries(null!==(s=this._data.user_settings)&&void 0!==s?s:{}))null!=i[e]&&(n.user[t]=i[e]);return n}setSetting(e,t,i){if("global"===e)for(const[e,t]of Object.entries(i))this.connection.sendMessage({type:"browser_mod/settings",key:e,value:t});else if("browser"===e){const e=this._data.browsers[t],o=Object.assign(Object.assign({},e.settings),i);this.connection.sendMessage({type:"browser_mod/register",browserID:t,data:Object.assign(Object.assign({},e),{settings:o})})}else if("user"===e){const e=t;for(const[t,o]of Object.entries(i))this.connection.sendMessage({type:"browser_mod/settings",user:e,key:t,value:o})}}}return t([Ae()],i.prototype,"runHideHeader",null),t([Ae(!0)],i.prototype,"runUpdateTitle",null),i},Je="browser_mod-browser-id",Ze=e=>class extends e{constructor(){if(super(),Storage&&!Storage.prototype.browser_mod_patched){const e=Storage.prototype.clear;Storage.prototype.clear=function(){const t=this.getItem(Je),i=this.getItem("suspendWhenHidden");e.apply(this),this.setItem(Je,t),this.setItem("suspendWhenHidden",i)},Storage.prototype.browser_mod_patched=!0}const e=window.location.search,t=new URLSearchParams(e).get("BrowserID");null!=t&&(this.browserID=t)}async recall_id(){if(!this.connection)return;const e=await this.connection.sendMessagePromise({type:"browser_mod/recall_id"});e&&(localStorage[Je]=e)}get browserID(){return document.querySelector("hc-main")?"CAST":localStorage[Je]?localStorage[Je]:(this.browserID="",this.recall_id(),this.browserID)}set browserID(e){""===e&&(e=function(){var e;const t=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);return"browser_mod_"+((null===(e=window.fully)||void 0===e?void 0:e.getDeviceId())?window.fully.getDeviceId().replace(/-/g,"_"):`${t()}${t()}_${t()}${t()}`)}());const t=localStorage[Je];localStorage[Je]=e,this.browserIDChanged(t,e)}browserIDChanged(e,t){}};class Qe extends(De(Ve(Re(Oe(Ie(ke(Pe(Ke(Me(Le(Ce(Ze(EventTarget))))))))))))){constructor(){super(),this.connect(),window.dispatchEvent(new Event("browser-mod-bootstrap")),console.info(`%cBROWSER_MOD ${qe} IS INSTALLED\n    %cBrowserID: ${this.browserID}`,"color: green; font-weight: bold","")}}window.browser_mod||(window.browser_mod=new Qe);export{Qe as BrowserMod};
