function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var a;const d=window.trustedTypes,l=d?d.emptyScript:"",c=window.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:u};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;null!==(e=this.h)&&void 0!==e||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=p){var s,o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:h.toAttribute)(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i,s;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),r=t.converter,a=null!==(s=null!==(i=null==r?void 0:r.fromAttribute)&&void 0!==i?i:"function"==typeof r?r:null)&&void 0!==s?s:h.fromAttribute;this._$El=n,this[n]=a(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var m;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:v}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.3.4");const _=globalThis.trustedTypes,g=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,b="?"+w,y=`<${b}>`,f=document,$=(t="")=>f.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,C=/>/g,T=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),P=/'/g,k=/"/g,I=/^(?:script|style|textarea|title)$/i,O=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),M=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),U=new WeakMap,D=f.createTreeWalker(f,129,null,!1),R=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=x;for(let e=0;e<i;e++){const i=t[e];let a,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===x?"!--"===d[1]?r=S:void 0!==d[1]?r=C:void 0!==d[2]?(I.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=T):void 0!==d[3]&&(r=T):r===T?">"===d[0]?(r=null!=o?o:x,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?T:'"'===d[3]?k:P):r===k||r===P?r=T:r===S||r===C?r=x:(r=T,o=void 0);const h=r===T&&t[e+1].startsWith("/>")?" ":"";n+=r===x?i+y:l>=0?(s.push(a),i.slice(0,l)+"$lit$"+i.slice(l)+w+h):i+w+(-2===l?(s.push(void 0),e):h)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==g?g.createHTML(a):a,s]};class j{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[d,l]=R(t,e);if(this.el=j.createElement(d,i),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=D.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(w)){const i=l[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?W:"@"===e[1]?V:B})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(I.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],$()),D.nextNode(),a.push({type:2,index:++o});s.append(t[e],$())}}}else if(8===s.nodeType)if(s.data===b)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)a.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,e){const i=f.createElement("template");return i.innerHTML=t,i}}function H(t,e,i=t,s){var o,n,r,a;if(e===M)return e;let d=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const l=E(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===l?d=void 0:(d=new l(t),d._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Cl)&&void 0!==r?r:a._$Cl=[])[s]=d:i._$Cu=d),void 0!==d&&(e=H(t,d._$AS(t,e.values),d,s)),e}class N{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:f).importNode(i,!0);D.currentNode=o;let n=D.nextNode(),r=0,a=0,d=s[0];for(;void 0!==d;){if(r===d.index){let e;2===d.type?e=new z(n,n.nextSibling,this,t):1===d.type?e=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(e=new K(n,this,t)),this.v.push(e),d=s[++a]}r!==(null==d?void 0:d.index)&&(n=D.nextNode(),r++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class z{constructor(t,e,i,s){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$C_=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$C_}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),E(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==M&&this.T(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.k(t):(t=>A(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.S(t):this.T(t)}j(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.j(t))}T(t){this._$AH!==L&&E(this._$AH)?this._$AA.nextSibling.data=t:this.k(f.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=j.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new N(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new j(t)),e}S(t){A(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new z(this.j($()),this.j($()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$C_=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class B{constructor(t,e,i,s,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=H(this,t,e,0),n=!E(t)||t!==this._$AH&&t!==M,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=H(this,s[i+r],e,r),a===M&&(a=this._$AH[r]),n||(n=!E(a)||a!==this._$AH[r]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.P(t)}P(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends B{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===L?void 0:t}}const G=_?_.emptyScript:"";class W extends B{constructor(){super(...arguments),this.type=4}P(t){t&&t!==L?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class V extends B{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=H(this,t,e,0))&&void 0!==i?i:L)===M)return;const s=this._$AH,o=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==L&&(s===L||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}}const F=window.litHtmlPolyfillSupport;var J,Z;null==F||F(j,z),(null!==(m=globalThis.litHtmlVersions)&&void 0!==m?m:globalThis.litHtmlVersions=[]).push("2.2.7");class Q extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new z(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return M}}Q.finalized=!0,Q._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Q});const X=globalThis.litElementPolyfillSupport;null==X||X({LitElement:Q}),(null!==(Z=globalThis.litElementVersions)&&void 0!==Z?Z:globalThis.litElementVersions=[]).push("3.2.2");const Y=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function tt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Y(t,e)}function et(t){return tt({...t,state:!0})}function it(t,e){return(({finisher:t,descriptor:e})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,n=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(n.finisher=function(e){t(e,s)}),n}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(o,s)}})({descriptor:i=>{const s={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[e]&&(this[e]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null),this[e]}}return s}})}var st;null===(st=window.HTMLSlotElement)||void 0===st||st.prototype.assignedElements;class ot extends Q{setConfig(t){}render(){return O` <div>Nothing to configure.</div> `}}(async()=>{for(;!window.browser_mod;)await new Promise((t=>setTimeout(t,1e3)));await window.browser_mod.connectionPromise,customElements.get("browser-player-editor")||(customElements.define("browser-player-editor",ot),window.customCards=window.customCards||[],window.customCards.push({type:"browser-player",name:"Browser Player",preview:!0}))})();class nt extends Q{static getConfigElement(){return document.createElement("browser-player-editor")}static getStubConfig(){return{}}async setConfig(t){for(;!window.browser_mod;)await new Promise((t=>setTimeout(t,1e3)));for(const t of["play","pause","ended","volumechange","canplay","loadeddata"])window.browser_mod._audio_player.addEventListener(t,(()=>this.requestUpdate()));window.browser_mod._video_player.addEventListener(event,(()=>this.requestUpdate()))}handleMute(t){window.browser_mod.player.muted=!window.browser_mod.player.muted}handleVolumeChange(t){const e=parseFloat(t.target.value);window.browser_mod.player.volume=e}handleMoreInfo(t){var e;this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:null===(e=window.browser_mod.browserEntities)||void 0===e?void 0:e.player}}))}handlePlayPause(t){!window.browser_mod.player.src||window.browser_mod.player.paused||window.browser_mod.player.ended?(window.browser_mod.player.play(),window.browser_mod._show_video_player()):window.browser_mod.player.pause()}render(){return window.browser_mod?O`
      <ha-card>
        <div class="card-content">
          <ha-icon-button @click=${this.handleMute}>
            <ha-icon
              .icon=${window.browser_mod.player.muted?"mdi:volume-off":"mdi:volume-high"}
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

          ${"stopped"===window.browser_mod.player_state?O`<div class="placeholder"></div>`:O`
                <ha-icon-button @click=${this.handlePlayPause} highlight>
                  <ha-icon
                    .icon=${!window.browser_mod.player.src||window.browser_mod.player.ended||window.browser_mod.player.paused?"mdi:play":"mdi:pause"}
                  ></ha-icon>
                </ha-icon-button>
              `}
          <ha-icon-button @click=${this.handleMoreInfo}>
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
          </ha-icon-button>
        </div>

        <div class="browser-id">${window.browser_mod.browserID}</div>
      </ha-card>
    `:(window.setTimeout((()=>this.requestUpdate()),100),O``)}static get styles(){return n`
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
    `}}t([tt()],nt.prototype,"hass",void 0),(async()=>{for(;!window.browser_mod;)await new Promise((t=>setTimeout(t,1e3)));await window.browser_mod.connectionPromise,customElements.get("browser-player")||customElements.define("browser-player",nt)})();async function rt(t){var e;(null===(e=t.localName)||void 0===e?void 0:e.includes("-"))&&await customElements.whenDefined(t.localName),t.updateComplete&&await t.updateComplete}async function at(t,e,i=!1){let s=[t];for("string"==typeof e&&(e=e.split(/(\$| )/));""===e[e.length-1];)e.pop();for(const[t,i]of e.entries()){const t=s[0];if(!t)return null;i.trim().length&&(rt(t),s="$"===i?[t.shadowRoot]:t.querySelectorAll(i))}return i?s:s[0]}async function dt(t,e,i=!1,s=1e4){return Promise.race([at(t,e,i),new Promise(((t,e)=>setTimeout((()=>e(new Error("SELECTTREE-TIMEOUT"))),s)))]).catch((t=>{if(!t.message||"SELECTTREE-TIMEOUT"!==t.message)throw t;return null}))}async function lt(){await Promise.race([customElements.whenDefined("home-assistant"),customElements.whenDefined("hc-main")]);const t=customElements.get("home-assistant")?"home-assistant":"hc-main";for(;!document.querySelector(t);)await new Promise((t=>window.setTimeout(t,100)));return document.querySelector(t)}async function ct(t){(await lt()).provideHass(t)}const ht=async()=>{var t,e,i;if(void 0!==window.loadCardHelpers)return;await customElements.whenDefined("partial-panel-resolver");const s=document.createElement("partial-panel-resolver").getRoutes([{component_name:"lovelace",url_path:"a"}]);await(null===(i=null===(e=null===(t=null==s?void 0:s.routes)||void 0===t?void 0:t.a)||void 0===e?void 0:e.load)||void 0===i?void 0:i.call(e))},ut=async()=>{if(customElements.get("ha-form"))return;await ht();const t=await window.loadCardHelpers();if(!t)return;const e=await t.createCardElement({type:"button"});e&&await e.constructor.getConfigElement()};const pt=t=>class extends t{constructor(){super(...arguments),this.connected=!1,this.connectionPromise=new Promise((t=>{this._connectionResolve=t})),this.browserEntities={}}LOG(...t){}fireEvent(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e}))}incoming_message(t){var e;t.command?(this.LOG("Command:",t),this.fireEvent(`command-${t.command}`,t)):t.browserEntities?this.browserEntities=t.browserEntities:t.result&&this.update_config(t.result),null===(e=this._connectionResolve)||void 0===e||e.call(this)}update_config(t){var e;this.LOG("Receive:",t);let i=!1;!this.registered&&(null===(e=t.browsers)||void 0===e?void 0:e[this.browserID])&&(i=!0),this._data=t,this.connected||(this.connected=!0,this.fireEvent("browser-mod-connected")),this.fireEvent("browser-mod-config-update"),i&&this.sendUpdate({})}async connect(){const t=(await async function(){const t=await lt();for(;!t.hass;)await new Promise((t=>window.setTimeout(t,100)));return t.hass}()).connection;this.connection=t,t.subscribeMessage((t=>this.incoming_message(t)),{type:"browser_mod/connect",browserID:this.browserID}),t.addEventListener("disconnected",(()=>{this.connected=!1,this.fireEvent("browser-mod-disconnected")})),t.addEventListener("ready",(()=>{this.connected=!0,this.fireEvent("browser-mod-connected"),this.sendUpdate({})})),ct(this)}get config(){var t,e;return null!==(e=null===(t=this._data)||void 0===t?void 0:t.config)&&void 0!==e?e:{}}get browsers(){var t,e;return null!==(e=null===(t=this._data)||void 0===t?void 0:t.browsers)&&void 0!==e?e:[]}get registered(){var t;return void 0!==(null===(t=this.browsers)||void 0===t?void 0:t[this.browserID])}set registered(t){(async()=>{if(t){if(this.registered)return;await this.connection.sendMessage({type:"browser_mod/register",browserID:this.browserID})}else{if(!this.registered)return;await this.connection.sendMessage({type:"browser_mod/unregister",browserID:this.browserID})}})()}async _reregister(t={}){await this.connection.sendMessage({type:"browser_mod/register",browserID:this.browserID,data:Object.assign(Object.assign({},this.browsers[this.browserID]),t)})}get global_settings(){var t,e;const i={},s=null!==(e=null===(t=this._data)||void 0===t?void 0:t.settings)&&void 0!==e?e:{};for(const[t,e]of Object.entries(s))null!==e&&(i[t]=e);return i}get user_settings(){var t,e,i,s,o;const n={},r=null!==(o=null===(e=null===(t=this._data)||void 0===t?void 0:t.user_settings)||void 0===e?void 0:e[null===(s=null===(i=this.hass)||void 0===i?void 0:i.user)||void 0===s?void 0:s.id])&&void 0!==o?o:{};for(const[t,e]of Object.entries(r))null!==e&&(n[t]=e);return n}get browser_settings(){var t,e,i;const s={},o=null!==(i=null===(e=null===(t=this.browsers)||void 0===t?void 0:t[this.browserID])||void 0===e?void 0:e.settings)&&void 0!==i?i:{};for(const[t,e]of Object.entries(o))null!==e&&(s[t]=e);return s}get settings(){return Object.assign(Object.assign(Object.assign({},this.global_settings),this.browser_settings),this.user_settings)}set_setting(t,e,i){var s;switch(i){case"global":this.connection.sendMessage({type:"browser_mod/settings",key:t,value:e});break;case"user":{const i=this.hass.user.id;this.connection.sendMessage({type:"browser_mod/settings",user:i,key:t,value:e});break}case"browser":{const i=null===(s=this.browsers[this.browserID])||void 0===s?void 0:s.settings;i[t]=e,this._reregister({settings:i});break}}}get cameraEnabled(){return this.registered?this.browsers[this.browserID].camera:null}set cameraEnabled(t){this._reregister({camera:t})}sendUpdate(t){this.connected&&this.registered&&(this.LOG("Send:",t),this.connection.sendMessage({type:"browser_mod/update",browserID:this.browserID,data:t}))}browserIDChanged(t,e){var i,s;this.fireEvent("browser-mod-config-update"),void 0!==(null===(i=this.browsers)||void 0===i?void 0:i[t])&&void 0===(null===(s=this.browsers)||void 0===s?void 0:s[this.browserID])&&(async()=>{await this.connection.sendMessage({type:"browser_mod/register",browserID:t,data:Object.assign(Object.assign({},this.browsers[t]),{browserID:this.browserID})})})()}},vt=t=>class extends t{constructor(){super(),this._listeners={},this._brightness=255;const t=this._panel=document.createElement("div");document.body.append(t),t.classList.add("browser-mod-blackout"),t.attachShadow({mode:"open"});const e=document.createElement("style");t.shadowRoot.append(e),e.innerHTML="\n        :host {\n          background: rgba(0,0,0, var(--darkness));\n          position: fixed;\n          left: 0;\n          top: 0;\n          bottom: 0;\n          right: 0;\n          width: 100%;\n          height: 100%;\n          z-index: 10000;\n          display: block;\n          pointer-events: none;\n        }\n        :host([dark]) {\n          background: rgba(0,0,0,1);\n        }\n      ",this.addEventListener("command-screen_off",(()=>this._screen_off())),this.addEventListener("command-screen_on",(t=>this._screen_on(t))),this.addEventListener("fully-update",(()=>this.send_screen_status())),this.connectionPromise.then((()=>this._screen_on()))}send_screen_status(){let t=!this._panel.hasAttribute("dark"),e=this._brightness;this.fully&&(t=this.fully_screen,e=this.fully_brightness),this.sendUpdate({screen_on:t,screen_brightness:e})}_screen_off(){this.fully?this.fully_screen=!1:this._panel.setAttribute("dark",""),this.send_screen_status();const t=()=>this._screen_on();for(const e of["pointerdown","pointermove","keydown"])this._listeners[e]=t,window.addEventListener(e,t)}_screen_on(t){var e,i;this.fully?(this.fully_screen=!0,(null===(e=null==t?void 0:t.detail)||void 0===e?void 0:e.brightness)&&(this.fully_brightness=t.detail.brightness)):((null===(i=null==t?void 0:t.detail)||void 0===i?void 0:i.brightness)&&(this._brightness=t.detail.brightness,this._panel.style.setProperty("--darkness",1-t.detail.brightness/255)),this._panel.removeAttribute("dark")),this.send_screen_status();for(const t of["pointerdown","pointermove","keydown"])this._listeners[t]&&(window.removeEventListener(t,this._listeners[t]),this._listeners[t]=void 0)}},mt=e=>{class i extends e{constructor(){super(),this._audio_player=new Audio,this._video_player=document.createElement("video"),this._video_player.controls=!0,this._video_player.style.setProperty("width","100%"),this.player=this._audio_player,this._player_enabled=!1;for(const t of["play","pause","ended","volumechange"])this._audio_player.addEventListener(t,(()=>this._player_update())),this._video_player.addEventListener(t,(()=>this._player_update()));for(const t of["timeupdate"])this._audio_player.addEventListener(t,(()=>this._player_update_throttled())),this._video_player.addEventListener(t,(()=>this._player_update_throttled()));this.firstInteraction.then((()=>{this._player_enabled=!0,this.player.ended||this.player.play()})),this.addEventListener("command-player-play",(t=>{var e,i,s;this.player.src&&this.player.pause(),(null===(e=t.detail)||void 0===e?void 0:e.media_type)&&((null===(i=t.detail)||void 0===i?void 0:i.media_type.startsWith("video"))?this.player=this._video_player:this.player=this._audio_player),(null===(s=t.detail)||void 0===s?void 0:s.media_content_id)&&(this.player.src=t.detail.media_content_id),this.player.play(),this._show_video_player()})),this.addEventListener("command-player-pause",(t=>this.player.pause())),this.addEventListener("command-player-stop",(t=>{this.player.src=null,this.player.pause()})),this.addEventListener("command-player-set-volume",(t=>{var e;void 0!==(null===(e=t.detail)||void 0===e?void 0:e.volume_level)&&(this.player.volume=t.detail.volume_level)})),this.addEventListener("command-player-mute",(t=>{var e;void 0!==(null===(e=t.detail)||void 0===e?void 0:e.mute)?this.player.muted=Boolean(t.detail.mute):this.player.muted=!this.player.muted})),this.addEventListener("command-player-seek",(t=>{this.player.currentTime=t.detail.position,setTimeout((()=>this._player_update()),10)})),this.addEventListener("command-player-turn-off",(t=>{this.player===this._video_player&&this._video_player.isConnected?this.closePopup():this.player.src&&this.player.pause(),this.player.src="",this._player_update()})),this.connectionPromise.then((()=>this._player_update()))}_show_video_player(){this.player===this._video_player&&this.player.src?(dt(document,"home-assistant $ dialog-media-player-browse").then((t=>null==t?void 0:t.closeDialog())),this.showPopup(void 0,this._video_player,{dismiss_action:()=>this._video_player.pause(),size:"wide"})):this.player!==this._video_player&&this._video_player.isConnected&&this.closePopup()}_player_update_throttled(){this._player_update()}_player_update(){const t=this._player_enabled?this.player.src&&this.player.src!==window.location.href?this.player.ended?"stopped":this.player.paused?"paused":"playing":"off":"unavailable";this.sendUpdate({player:{volume:this.player.volume,muted:this.player.muted,src:this.player.src,state:t,media_duration:this.player.duration,media_position:this.player.currentTime}})}}var s;return t([(s=3e3,function(t,e,i){const o=i.value;let n;i.value=function(...t){if(!n)return n=setTimeout((()=>n=void 0),s),o.bind(this)(...t)}})],i.prototype,"_player_update_throttled",null),i},_t=t=>class extends t{constructor(){super(),this._framerate=2,this.cameraError=!1,this._setup_camera()}async _setup_camera(){if(this._video)return;if(await this.connectionPromise,await this.firstInteraction,!this.cameraEnabled)return;if(this.fully)return this.update_camera();const t=document.createElement("div");document.body.append(t),t.classList.add("browser-mod-camera"),t.attachShadow({mode:"open"});const e=document.createElement("style");t.shadowRoot.append(e),e.innerHTML="\n      :host {\n        display: none;\n      }";const i=this._video=document.createElement("video");t.shadowRoot.append(i),i.autoplay=!0,i.playsInline=!0,i.style.display="none";const s=this._canvas=document.createElement("canvas");if(t.shadowRoot.append(s),s.style.display="none",navigator.mediaDevices)try{const t=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});i.srcObject=t,i.play(),this.update_camera()}catch(t){if("NotAllowedError"!==t.name)throw t;this.cameraError=!0,this.fireEvent("browser-mod-config-update")}}async update_camera(){var t;if(!this.cameraEnabled){const e=null===(t=this._video)||void 0===t?void 0:t.srcObject;return void(e&&(e.getTracks().forEach((t=>t.stop())),this._video.scrObject=void 0))}if(this.fully)this.sendUpdate({camera:this.fully_camera});else{const t=this._video,e=t.videoWidth,i=t.videoHeight;this._canvas.width=e,this._canvas.height=i;this._canvas.getContext("2d").drawImage(t,0,0,e,i),this.sendUpdate({camera:this._canvas.toDataURL("image/jpeg")})}const e=Math.round(1e3/this._framerate);setTimeout((()=>this.update_camera()),e)}},gt=t=>class extends t{constructor(){super(),this.firstInteraction=new Promise((t=>{this._interactionResolve=t})),this.show_indicator()}async show_indicator(){if(await this.connectionPromise,!this.registered)return;const t=document.createElement("div");document.body.append(t),t.classList.add("browser-mod-require-interaction"),t.attachShadow({mode:"open"});const e=document.createElement("style");t.shadowRoot.append(e),e.innerHTML='\n      :host {\n        position: fixed;\n        right: 8px;\n        bottom: 8px;\n        color: var(--warning-color, red);\n        opacity: 0.5;\n        --mdc-icon-size: 48px;\n      }\n      ha-icon::before {\n        content: "Browser\\00a0Mod";\n        font-size: 0.75rem;\n        position: absolute;\n        right: 0;\n        bottom: 90%;\n      }\n      video {\n        display: none;\n      }\n      ';const i=document.createElement("ha-icon");t.shadowRoot.append(i),i.icon="mdi:gesture-tap";const s=this._video=document.createElement("video");t.shadowRoot.append(s);const o=s.play();o&&o.then((()=>{this._interactionResolve(),s.pause()})).catch((t=>{"AbortError"===t.name&&this._interactionResolve()})),window.addEventListener("pointerdown",(()=>{this._interactionResolve()}),{once:!0}),await this.firstInteraction,t.remove()}},wt=t=>class extends t{constructor(){if(super(),this._fully_screensaver=!1,this.fully){for(const t of["screenOn","screenOff","pluggedAC","pluggedUSB","onBatteryLevelChanged","unplugged","networkReconnect","onMotion","onDaydreamStart","onDaydreamStop"])window.fully.bind(t,`window.browser_mod.fullyEvent("${t}");`);window.fully.bind("onScreensaverStart","window.browser_mod._fully_screensaver = true; window.browser_mod.fullyEvent();"),window.fully.bind("onScreensaverStop","window.browser_mod._fully_screensaver = false; window.browser_mod.fullyEvent();")}}get fully(){return void 0!==window.fully}get fully_screen(){var t;return!1===this._fully_screensaver&&(null===(t=window.fully)||void 0===t?void 0:t.getScreenOn())}set fully_screen(t){var e,i,s;t?(null===(e=window.fully)||void 0===e||e.turnScreenOn(),null===(i=window.fully)||void 0===i||i.stopScreensaver()):null===(s=window.fully)||void 0===s||s.turnScreenOff()}get fully_brightness(){var t;return null===(t=window.fully)||void 0===t?void 0:t.getScreenBrightness()}set fully_brightness(t){var e;null===(e=window.fully)||void 0===e||e.setScreenBrightness(t)}get fully_camera(){var t;return null===(t=window.fully)||void 0===t?void 0:t.getCamshotJpgBase64()}fullyEvent(t){this.fireEvent("fully-update",{event:t})}},bt=t=>class extends t{constructor(){super(),document.addEventListener("visibilitychange",(()=>this._browser_state_update())),window.addEventListener("location-changed",(()=>this._browser_state_update())),this.addEventListener("fully-update",(()=>this._browser_state_update())),this.connectionPromise.then((()=>this._browser_state_update()))}_browser_state_update(){(async()=>{var t,e,i,s,o,n,r,a,d,l,c,h;const u=null===(e=(t=navigator).getBattery)||void 0===e?void 0:e.call(t);this.sendUpdate({browser:{path:window.location.pathname,visibility:document.visibilityState,userAgent:navigator.userAgent,currentUser:null===(s=null===(i=this.hass)||void 0===i?void 0:i.user)||void 0===s?void 0:s.name,fullyKiosk:this.fully||!1,width:window.innerWidth,height:window.innerHeight,battery_level:null!==(n=null===(o=window.fully)||void 0===o?void 0:o.getBatteryLevel())&&void 0!==n?n:100*(null==u?void 0:u.level),charging:null!==(a=null===(r=window.fully)||void 0===r?void 0:r.isPlugged())&&void 0!==a?a:null==u?void 0:u.charging,darkMode:null===(l=null===(d=this.hass)||void 0===d?void 0:d.themes)||void 0===l?void 0:l.darkMode,userData:null===(c=this.hass)||void 0===c?void 0:c.user,ip_address:null===(h=window.fully)||void 0===h?void 0:h.getIp4Address()}})})()}async browser_navigate(t){t&&(history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed")))}},yt=t=>class extends t{constructor(){super();const t=["sequence","delay","popup","more_info","close_popup","navigate","refresh","console","javascript"];for(const e of t)this.addEventListener(`command-${e}`,(t=>{this.service(e,t.detail)}));document.body.addEventListener("ll-custom",(t=>{t.detail.browser_mod&&this._service_action(t.detail.browser_mod)}))}async service(t,e){this._service_action({service:t,data:e})}async _service_action({service:t,data:e}){let i=t;if(!i.startsWith("browser_mod.")&&i.includes(".")||void 0!==e.browser_id){const t=Object.assign({},e);"THIS"===t.browser_id&&(t.browser_id=this.browserID);const[s,o]=i.split(".");return this.hass.callService(s,o,t)}switch(i.startsWith("browser_mod.")&&(i=i.substring(12)),i){case"sequence":for(const t of e.sequence)await this._service_action(t);break;case"delay":await new Promise((t=>setTimeout(t,e.time)));break;case"more_info":const{entity:t,large:i,ignore_popup_card:s}=e;this.showMoreInfo(t,i,s);break;case"popup":const{title:o,content:n}=e,r=function(t,e){var i={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(i[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(t);o<s.length;o++)e.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(t,s[o])&&(i[s[o]]=t[s[o]])}return i}(e,["title","content"]);for(const[t,e]of Object.entries(r))t.endsWith("_action")&&(r[t]=t=>{const{service:i,data:s}=e;this._service_action({service:i,data:Object.assign(Object.assign({},s),t)})});this.showPopup(o,n,r);break;case"close_popup":this.closePopup();break;case"navigate":this.browser_navigate(e.path);break;case"refresh":window.location.href=window.location.href;break;case"console":Object.keys(e).length>1||e&&void 0===e.message?console.dir(e):console.log(e.message);break;case"javascript":const a=`\n          "use strict";\n          ${e.code}\n          `;new Function("hass","data",a)(this.hass,e)}}},ft=t=>class extends t{constructor(){super(),this.activityTriggered=!1,this._activityCooldown=15e3;for(const t of["pointerdown","pointermove","keydown"])window.addEventListener(t,(()=>this.activityTrigger(!0)));this.addEventListener("fully-update",(()=>{this.activityTrigger()}))}activityTrigger(t=!1){this.activityTriggered||this.sendUpdate({activity:!0}),this.activityTriggered=!0,t&&this.fireEvent("browser-mod-activity"),clearTimeout(this._activityTimeout),this._activityTimeout=setTimeout((()=>this.activityReset()),this._activityCooldown)}activityReset(){clearTimeout(this._activityTimeout),this.activityTriggered&&this.sendUpdate({activity:!1}),this.activityTriggered=!1}},$t=2;class Et extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),this.it=L,t.type!==$t)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===L||null==t)return this._t=void 0,this.it=t;if(t===M)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Et.directiveName="unsafeHTML",Et.resultType=1;const At=(t=>(...e)=>({_$litDirective$:t,values:e}))(Et);class xt extends Q{async closeDialog(){this.open=!1,clearInterval(this._timeoutTimer),this._autocloseListener&&(window.browser_mod.removeEventListener("browser-mod-activity",this._autocloseListener),this._autocloseListener=void 0)}openDialog(){var t;this.open=!0,null===(t=this.dialog)||void 0===t||t.show(),this.timeout&&(this._timeoutStart=(new Date).getTime(),this._timeoutTimer=setInterval((()=>{const t=(new Date).getTime()-this._timeoutStart,e=t/this.timeout*100;this.style.setProperty("--progress",`${e}%`),t>=this.timeout&&this._timeout()}),10)),this._autocloseListener=void 0,this._autoclose&&(this._autocloseListener=()=>this.dialog.close(),window.browser_mod.addEventListener("browser-mod-activity",this._autocloseListener,{once:!0}))}async setupDialog(t,e,{right_button:i,right_button_action:s,left_button:o,left_button_action:n,dismissable:r=!0,dismiss_action:a,timeout:d,timeout_action:l,size:c,style:h,autoclose:u=!1}={}){if(this._formdata=void 0,this.title=t,this.card=void 0,e&&e instanceof HTMLElement)this.content=e;else if(e&&Array.isArray(e)){ut();const t=document.createElement("ha-form");t.schema=e,t.computeLabel=t=>{var e;return null!==(e=t.label)&&void 0!==e?e:t.name},t.hass=window.browser_mod.hass,this._formdata={};for(const t of e)t.name&&void 0!==t.default&&(this._formdata[t.name]=t.default);t.data=this._formdata,ct(t),t.addEventListener("value-changed",(e=>{this._formdata=Object.assign({},e.detail.value),t.data=this._formdata})),this.content=t}else if(e&&"object"==typeof e){this.card=!0;const t=await window.loadCardHelpers(),i=await t.createCardElement(e);i.hass=window.browser_mod.hass,ct(i),this.content=i}else this.content=At(e);this.right_button=i,this.left_button=o,this.actions=void 0===i?void 0:"",this.dismissable=r,this.timeout=d,this._actions={right_button_action:s,left_button_action:n,dismiss_action:a,timeout_action:l},this.wide="wide"===c?"":void 0,this.fullscreen="fullscreen"===c?"":void 0,this._style=h,this._autoclose=u}async _primary(){var t,e,i,s;(null===(t=this._actions)||void 0===t?void 0:t.dismiss_action)&&(this._actions.dismiss_action=void 0),null===(e=this.dialog)||void 0===e||e.close(),null===(s=null===(i=this._actions)||void 0===i?void 0:i.right_button_action)||void 0===s||s.call(i,this._formdata)}async _secondary(){var t,e,i,s;(null===(t=this._actions)||void 0===t?void 0:t.dismiss_action)&&(this._actions.dismiss_action=void 0),null===(e=this.dialog)||void 0===e||e.close(),null===(s=null===(i=this._actions)||void 0===i?void 0:i.left_button_action)||void 0===s||s.call(i,this._formdata)}async _dismiss(t){var e,i,s;null===(e=this.dialog)||void 0===e||e.close(),null===(s=null===(i=this._actions)||void 0===i?void 0:i.dismiss_action)||void 0===s||s.call(i)}async _timeout(){var t,e,i,s;(null===(t=this._actions)||void 0===t?void 0:t.dismiss_action)&&(this._actions.dismiss_action=void 0),null===(e=this.dialog)||void 0===e||e.close(),null===(s=null===(i=this._actions)||void 0===i?void 0:i.timeout_action)||void 0===s||s.call(i)}render(){return this.open?O`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        @closing=${this._dismiss}
        .heading=${void 0!==this.title}
        ?hideActions=${void 0===this.actions}
        .scrimClickAction=${this.dismissable?"close":""}
        .escapeKeyAction=${this.dismissable?"close":""}
      >
        ${this.timeout?O` <div slot="heading" class="progress"></div> `:""}
        ${this.title?O`
              <div slot="heading">
                <ha-header-bar>
                  ${this.dismissable?O`
                        <ha-icon-button
                          dialogAction="cancel"
                          slot="navigationIcon"
                        >
                          <ha-icon .icon=${"mdi:close"}></ha-icon>
                        </ha-icon-button>
                      `:""}
                  <div slot="title" class="main-title">${this.title}</div>
                </ha-header-bar>
              </div>
            `:O``}

        <div class="content">${this.content}</div>

        ${void 0!==this.right_button?O`
              <mwc-button
                slot="primaryAction"
                .label=${this.right_button}
                @click=${this._primary}
                class="action-button"
              ></mwc-button>
            `:""}
        ${void 0!==this.left_button?O`
              <mwc-button
                slot="secondaryAction"
                .label=${this.left_button}
                @click=${this._secondary}
                class="action-button"
              ></mwc-button>
            `:""}
        <style>
          :host {
            ${this._style}
          }
        </style>
      </ha-dialog>
    `:O``}static get styles(){return n`
      ha-dialog {
        --dialog-backdrop-filter: blur(5px);
        z-index: 10;
        --mdc-dialog-min-width: var(--popup-min-width, 400px);
        --mdc-dialog-max-width: var(--popup-max-width, 600px);
        --mdc-dialog-heading-ink-color: var(--primary-text-color);
        --mdc-dialog-content-ink-color: var(--primary-text-color);
        --justify-action-buttons: space-between;

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
      :host([wide]) ha-dialog {
        --mdc-dialog-max-width: 90vw;
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
        --padding-x: 24px;
        --padding-y: 20px;
        margin: -20px -24px;
        padding: var(--padding-y) var(--padding-y);
        --header-height: 64px;
        --footer-height: 0px;
      }
      .content:first-child {
        --header-height: 0px;
      }

      :host([card]) .content {
        --padding-x: 0px;
        --padding-y: 0px;
        --ha-card-box-shadow: none;
      }
      :host([actions]) .content {
        xborder-bottom: 2px solid
          var(--popup-border-color, var(--divider-color));
        --footer-height: 54px;
      }
      :host([wide]) .content {
        width: calc(90vw - 2 * var(--padding-x));
      }
      :host([fullscreen]) .content {
        height: calc(
          100vh - var(--header-height) - var(--footer-height) - 2 *
            var(--padding-y) - 16px
        );
      }

      .action-button {
        margin-bottom: -24px;
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
    `}}t([tt()],xt.prototype,"open",void 0),t([tt()],xt.prototype,"content",void 0),t([tt()],xt.prototype,"title",void 0),t([tt({reflect:!0})],xt.prototype,"actions",void 0),t([tt({reflect:!0})],xt.prototype,"card",void 0),t([tt()],xt.prototype,"right_button",void 0),t([tt()],xt.prototype,"left_button",void 0),t([tt()],xt.prototype,"dismissable",void 0),t([tt({reflect:!0})],xt.prototype,"wide",void 0),t([tt({reflect:!0})],xt.prototype,"fullscreen",void 0),t([tt()],xt.prototype,"_style",void 0),t([it("ha-dialog")],xt.prototype,"dialog",void 0),customElements.get("browser-mod-popup")||customElements.define("browser-mod-popup",xt);const St=t=>class extends t{constructor(){super(),ht(),this._popupEl=document.createElement("browser-mod-popup"),document.body.append(this._popupEl)}showPopup(...t){this._popupEl.setupDialog(...t).then((()=>this._popupEl.openDialog()))}closePopup(...t){this._popupEl.closeDialog(),this.showMoreInfo("")}async showMoreInfo(t,e=!1,i){const s=await lt();if(s.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:t,ignore_popup_card:i}})),e){await new Promise((t=>setTimeout(t,50)));const t=s.shadowRoot.querySelector("ha-more-info-dialog");t&&(t.large=!0)}}};var Ct="2.0.0b4";const Tt=[{name:"entity",label:"Entity",selector:{entity:{}}},{name:"title",label:"Title",selector:{text:{}}},{name:"size",selector:{select:{mode:"dropdown",options:["normal","wide","fullscreen"]}}},{type:"grid",schema:[{name:"right_button",label:"Right button",selector:{text:{}}},{name:"left_button",label:"Left button",selector:{text:{}}}]},{type:"grid",schema:[{name:"right_button_action",label:"Right button action",selector:{object:{}}},{name:"left_button_action",label:"Left button action",selector:{object:{}}}]},{type:"grid",schema:[{name:"dismissable",label:"User dismissable",selector:{boolean:{}}},{name:"timeout",label:"Auto close timeout (ms)",selector:{number:{mode:"box"}}}]},{type:"grid",schema:[{name:"dismiss_action",label:"Dismiss action",selector:{object:{}}},{name:"timeout_action",label:"Timeout action",selector:{object:{}}}]},{name:"style",label:"CSS style",selector:{text:{multiline:!0}}}];class Pt extends Q{constructor(){super(...arguments),this._selectedTab=0,this._cardGUIMode=!0,this._cardGUIModeAvailable=!0}setConfig(t){this._config=t}connectedCallback(){super.connectedCallback(),ut()}_handleSwitchTab(t){this._selectedTab=parseInt(t.detail.index,10)}_configChanged(t){t.stopPropagation(),this._config&&(this._config=Object.assign({},t.detail.value),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}})))}_cardConfigChanged(t){if(t.stopPropagation(),!this._config)return;const e=Object.assign({},t.detail.config);this._config=Object.assign(Object.assign({},this._config),{card:e}),this._cardGUIModeAvailable=t.detail.guiModeAvailable,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_toggleCardMode(t){var e;null===(e=this._cardEditorEl)||void 0===e||e.toggleMode()}_deleteCard(t){this._config&&(this._config=Object.assign({},this._config),delete this._config.card,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}})))}_cardGUIModeChanged(t){t.stopPropagation(),this._cardGUIMode=t.detail.guiMode,this._cardGUIModeAvailable=t.detail.guiModeAvailable}render(){return this.hass&&this._config?O`
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
          ${[this._renderSettingsEditor,this._renderCardEditor][this._selectedTab].bind(this)()}
        </div>
      </div>
    `:O``}_renderSettingsEditor(){return O`<div class="box">
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Tt}
        .computeLabel=${t=>{var e;return null!==(e=t.label)&&void 0!==e?e:t.name}}
        @value-changed=${this._configChanged}
      ></ha-form>
    </div>`}_renderCardEditor(){return O`
      <div class="box cards">
        ${this._config.card?O`
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
            `:O`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardConfigChanged}
              ></hui-card-picker>
            `}
      </div>
    `}static get styles(){return n`
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
    `}}t([et()],Pt.prototype,"_config",void 0),t([tt()],Pt.prototype,"lovelace",void 0),t([tt()],Pt.prototype,"hass",void 0),t([et()],Pt.prototype,"_selectedTab",void 0),t([et()],Pt.prototype,"_cardGUIMode",void 0),t([et()],Pt.prototype,"_cardGUIModeAvailable",void 0),t([it("hui-card-element-editor")],Pt.prototype,"_cardEditorEl",void 0),(async()=>{for(;!window.browser_mod;)await new Promise((t=>setTimeout(t,1e3)));await window.browser_mod.connectionPromise,customElements.get("popup-card-editor")||(customElements.define("popup-card-editor",Pt),window.customCards=window.customCards||[],window.customCards.push({type:"popup-card",name:"Popup card",preview:!1,description:"Replace the more-info dialog for a given entity in the view that includes this card. (Browser Mod)"}))})();class kt extends Q{constructor(){super(),this.popup=this.popup.bind(this)}static getConfigElement(){return document.createElement("popup-card-editor")}static getStubConfig(t,e){return{entity:e[0],title:"Custom popup",dismissable:!0,card:{type:"markdown",content:"This replaces the more-info dialog"}}}setConfig(t){this._config=t,(async()=>{const e=await window.loadCardHelpers();this._element=await e.createCardElement(t.card),this._element.hass=this.hass})()}async connectedCallback(){super.connectedCallback(),window.addEventListener("hass-more-info",this.popup),"hui-card-preview"===this.parentElement.localName?(this.editMode=!0,this.removeAttribute("hidden")):this.setAttribute("hidden","")}async disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hass-more-info",this.popup)}popup(t){var e,i,s;if((null===(e=t.detail)||void 0===e?void 0:e.entityId)===this._config.entity&&!(null===(i=t.detail)||void 0===i?void 0:i.ignore_popup_card)){t.stopPropagation(),t.preventDefault();delete Object.assign({},this._config).card,null===(s=window.browser_mod)||void 0===s||s.service("popup",Object.assign({content:this._config.card},this._config)),setTimeout((()=>this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:"."}}))),50)}}updated(t){super.updated(t),t.has("hass")&&this._element&&(this._element.hass=this.hass)}render(){return this.editMode?O` <ha-card>
      <div class="app-toolbar">
        ${this._config.dismissable?O`
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
      ${void 0!==this._config.right_button||void 0!==this._config.left_button?O`
            <footer class="mdc-dialog__actions">
              <span>
                ${void 0!==this._config.left_button?O`
                      <mwc-button
                        .label=${this._config.left_button}
                      ></mwc-button>
                    `:""}
              </span>
              <span>
                ${void 0!==this._config.right_button?O`
                      <mwc-button
                        .label=${this._config.right_button}
                      ></mwc-button>
                    `:""}
              </span>
            </footer>
          `:""}
    </ha-card>`:O``}static get styles(){return n`
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
    `}}t([tt()],kt.prototype,"hass",void 0),t([et()],kt.prototype,"_config",void 0),t([tt({attribute:"edit-mode",reflect:!0})],kt.prototype,"editMode",void 0),t([et()],kt.prototype,"_element",void 0),(async()=>{for(;!window.browser_mod;)await new Promise((t=>setTimeout(t,1e3)));await window.browser_mod.connectionPromise,customElements.get("popup-card")||customElements.define("popup-card",kt)})();const It=t=>class extends t{constructor(){super(),this.__currentTitle=void 0,this._auto_settings_setup(),this.addEventListener("browser-mod-config-update",(()=>this._auto_settings_setup())),window.addEventListener("location-changed",(()=>{this._updateTitle(),setTimeout((()=>this._updateTitle()),500),setTimeout((()=>this._updateTitle()),1e3),setTimeout((()=>this._updateTitle()),5e3)}))}async _auto_settings_setup(){await this.connectionPromise;const t=this.settings;t.sidebarPanelOrder&&localStorage.setItem("sidebarPanelOrder",t.sidebarPanelOrder),t.sidebarHiddenPanels&&localStorage.setItem("sidebarHiddenPanels",t.sidebarHiddenPanels),t.defaultPanel&&localStorage.setItem("defaultPanel",t.defaultPanel),!0===t.hideSidebar&&(dt(document.body,"home-assistant$home-assistant-main$app-drawer-layout").then((t=>{var e;return null===(e=null==t?void 0:t.style)||void 0===e?void 0:e.setProperty("--app-drawer-width","0px")})),dt(document.body,"home-assistant$home-assistant-main$app-drawer-layout app-drawer").then((t=>{var e;return null===(e=null==t?void 0:t.remove)||void 0===e?void 0:e.call(t)}))),!0===t.hideHeader&&customElements.whenDefined("app-header-layout").then((()=>{const t=customElements.get("app-header").prototype,e=t.attached;t.attached=function(){e.bind(this)(),this.style.setProperty("display","none")}})),void 0!==t.faviconTemplate&&(async()=>{this._faviconTemplateSubscription&&this._faviconTemplateSubscription(),this._faviconTemplateSubscription=void 0,this._faviconTemplateSubscription=await this.connection.subscribeMessage(this._updateFavicon,{type:"render_template",template:t.faviconTemplate,variables:{}})})(),void 0!==t.titleTemplate&&(async()=>{this._titleTemplateSubscription&&this._titleTemplateSubscription(),this._titleTemplateSubscription=void 0,this._titleTemplateSubscription=await this.connection.subscribeMessage(this._updateTitle.bind(this),{type:"render_template",template:t.titleTemplate,variables:{}})})()}get _currentFavicon(){const t=document.head.querySelector("link[rel~='icon']");return null==t?void 0:t.href}_updateFavicon({result:t}){document.head.querySelector("link[rel~='icon']").href=t,window.browser_mod.fireEvent("browser-mod-favicon-update")}get _currentTitle(){return this.__currentTitle}_updateTitle(t){t&&(this.__currentTitle=t.result),this.__currentTitle&&(document.title=this.__currentTitle),window.browser_mod.fireEvent("browser-mod-favicon-update")}},Ot="browser_mod-browser-id",Mt=t=>class extends t{constructor(){if(super(),Storage&&!Storage.prototype.browser_mod_patched){const t=Storage.prototype.clear;Storage.prototype.clear=function(){const e=this.getItem(Ot),i=this.getItem("suspendWhenHidden");t.apply(this),this.setItem(Ot,e),this.setItem("suspendWhenHidden",i)},Storage.prototype.browser_mod_patched=!0}}async recall_id(){if(!this.connection)return;const t=await this.connection.sendMessagePromise({type:"browser_mod/recall_id"});t&&(localStorage[Ot]=t)}get browserID(){return document.querySelector("hc-main")?"CAST":localStorage[Ot]?localStorage[Ot]:(this.browserID="",this.recall_id(),this.browserID)}set browserID(t){""===t&&(t=function(){var t,e;const i=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);return null!==(e=null===(t=window.fully)||void 0===t?void 0:t.getDeviceId())&&void 0!==e?e:`${i()}${i()}-${i()}${i()}`}());const e=localStorage[Ot];localStorage[Ot]=t,this.browserIDChanged(e,t)}browserIDChanged(t,e){}};class Lt extends(yt(St(ft(bt(_t(mt(vt(It(wt(gt(pt(Mt(EventTarget))))))))))))){constructor(){super(),this.connect(),console.info(`%cBROWSER_MOD ${Ct} IS INSTALLED\n    %cBrowserID: ${this.browserID}`,"color: green; font-weight: bold","")}}window.browser_mod||(window.browser_mod=new Lt);export{Lt as BrowserMod};
