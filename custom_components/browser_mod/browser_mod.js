const e="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||"undefined"!=typeof global&&global;function t(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}void 0!==e.EventTarget&&function(e){try{new e}catch(e){return!1}return!0}(e.EventTarget)||(e.EventTarget=function(){function e(){this.__listeners=new Map}return e.prototype=Object.create(Object.prototype),e.prototype.addEventListener=function(e,t,i){if(arguments.length<2)throw new TypeError(`TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);const s=this.__listeners,o=e.toString();s.has(o)||s.set(o,new Map);const n=s.get(o);n.has(t)||n.set(t,i)},e.prototype.removeEventListener=function(e,t,i){if(arguments.length<2)throw new TypeError(`TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);const s=this.__listeners,o=e.toString();if(s.has(o)){const e=s.get(o);e.has(t)&&e.delete(t)}},e.prototype.dispatchEvent=function(e){if(!(e instanceof Event))throw new TypeError("Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.");const t=e.type,i=this.__listeners.get(t);if(i)for(const[t,s]of i.entries()){try{"function"==typeof t?t.call(this,e):t&&"function"==typeof t.handleEvent&&t.handleEvent(e)}catch(e){setTimeout((()=>{throw e}))}s&&s.once&&i.delete(t)}return!0},e}());const i=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e;var d;const l=window.trustedTypes,c=l?l.emptyScript:"",h=window.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},p=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;null!==(t=this.h)&&void 0!==t||(this.h=[]),this.h.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{i?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var s,o;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const r=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:u.toAttribute)(t,i.type);this._$El=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(e,t){var i,s;const o=this.constructor,n=o._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=o.getPropertyOptions(n),r=e.converter,a=null!==(s=null!==(i=null==r?void 0:r.fromAttribute)&&void 0!==i?i:"function"==typeof r?r:null)&&void 0!==s?s:u.fromAttribute;this._$El=n,this[n]=a(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||p)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var _;m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:m}),(null!==(d=globalThis.reactiveElementVersions)&&void 0!==d?d:globalThis.reactiveElementVersions=[]).push("1.3.4");const g=globalThis.trustedTypes,w=g?g.createPolicy("lit-html",{createHTML:e=>e}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,y="?"+b,f=`<${y}>`,$=document,E=(e="")=>$.createComment(e),S=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,C=/>/g,k=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),P=/'/g,M=/"/g,O=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),L=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),D=new WeakMap,j=$.createTreeWalker($,129,null,!1),H=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":"",r=x;for(let t=0;t<i;t++){const i=e[t];let a,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===x?"!--"===d[1]?r=T:void 0!==d[1]?r=C:void 0!==d[2]?(O.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=k):void 0!==d[3]&&(r=k):r===k?">"===d[0]?(r=null!=o?o:x,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?k:'"'===d[3]?M:P):r===M||r===P?r=k:r===T||r===C?r=x:(r=k,o=void 0);const h=r===k&&e[t+1].startsWith("/>")?" ":"";n+=r===x?i+f:l>=0?(s.push(a),i.slice(0,l)+"$lit$"+i.slice(l)+b+h):i+b+(-2===l?(s.push(void 0),t):h)}const a=n+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==w?w.createHTML(a):a,s]};class R{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[d,l]=H(e,t);if(this.el=R.createElement(d,i),j.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=j.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(b)){const i=l[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split(b),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?V:"@"===t[1]?F:q})}else a.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(O.test(s.tagName)){const e=s.textContent.split(b),t=e.length-1;if(t>0){s.textContent=g?g.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],E()),j.nextNode(),a.push({type:2,index:++o});s.append(e[t],E())}}}else if(8===s.nodeType)if(s.data===y)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(b,e+1));)a.push({type:7,index:o}),e+=b.length-1}o++}}static createElement(e,t){const i=$.createElement("template");return i.innerHTML=e,i}}function N(e,t,i=e,s){var o,n,r,a;if(t===L)return t;let d=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const l=S(t)?void 0:t._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===l?d=void 0:(d=new l(e),d._$AT(e,i,s)),void 0!==s?(null!==(r=(a=i)._$Cl)&&void 0!==r?r:a._$Cl=[])[s]=d:i._$Cu=d),void 0!==d&&(t=N(e,d._$AS(e,t.values),d,s)),t}class z{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:$).importNode(i,!0);j.currentNode=o;let n=j.nextNode(),r=0,a=0,d=s[0];for(;void 0!==d;){if(r===d.index){let t;2===d.type?t=new B(n,n.nextSibling,this,e):1===d.type?t=new d.ctor(n,d.name,d.strings,this,e):6===d.type&&(t=new K(n,this,e)),this.v.push(t),d=s[++a]}r!==(null==d?void 0:d.index)&&(n=j.nextNode(),r++)}return o}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class B{constructor(e,t,i,s){var o;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$C_=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$C_}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),S(e)?e===U||null==e||""===e?(this._$AH!==U&&this._$AR(),this._$AH=U):e!==this._$AH&&e!==L&&this.T(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.k(e):(e=>A(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.S(e):this.T(e)}j(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.j(e))}T(e){this._$AH!==U&&S(this._$AH)?this._$AA.nextSibling.data=e:this.k($.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=R.createElement(s.h,this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.m(i);else{const e=new z(o,this),t=e.p(this.options);e.m(i),this.k(t),this._$AH=e}}_$AC(e){let t=D.get(e.strings);return void 0===t&&D.set(e.strings,t=new R(e)),t}S(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new B(this.j(E()),this.j(E()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$C_=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class q{constructor(e,t,i,s,o){this.type=1,this._$AH=U,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=N(this,e,t,0),n=!S(e)||e!==this._$AH&&e!==L,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=N(this,s[i+r],t,r),a===L&&(a=this._$AH[r]),n||(n=!S(a)||a!==this._$AH[r]),a===U?e=U:e!==U&&(e+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.P(e)}P(e){e===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends q{constructor(){super(...arguments),this.type=3}P(e){this.element[this.name]=e===U?void 0:e}}const W=g?g.emptyScript:"";class V extends q{constructor(){super(...arguments),this.type=4}P(e){e&&e!==U?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class F extends q{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=N(this,e,t,0))&&void 0!==i?i:U)===L)return;const s=this._$AH,o=e===U&&s!==U||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==U&&(s===U||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class K{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}}const J=window.litHtmlPolyfillSupport;var Z,Q;null==J||J(R,B),(null!==(_=globalThis.litHtmlVersions)&&void 0!==_?_:globalThis.litHtmlVersions=[]).push("2.2.7");class X extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let r=n._$litPart$;if(void 0===r){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new B(t.insertBefore(E(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return L}}X.finalized=!0,X._$litElement$=!0,null===(Z=globalThis.litElementHydrateSupport)||void 0===Z||Z.call(globalThis,{LitElement:X});const Y=globalThis.litElementPolyfillSupport;null==Y||Y({LitElement:X}),(null!==(Q=globalThis.litElementVersions)&&void 0!==Q?Q:globalThis.litElementVersions=[]).push("3.2.2");const ee=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function te(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ee(e,t)}function ie(e){return te({...e,state:!0})}function se(e,t){return(({finisher:e,descriptor:t})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,n=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:{...i,key:s};return null!=e&&(n.finisher=function(t){e(t,s)}),n}{const o=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(o,s)}})({descriptor:i=>{const s={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[t]&&(this[t]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==s?s:null),this[t]}}return s}})}var oe;null===(oe=window.HTMLSlotElement)||void 0===oe||oe.prototype.assignedElements;class ne extends X{setConfig(e){}render(){return I` <div>Nothing to configure.</div> `}}customElements.get("browser-player-editor")||(customElements.define("browser-player-editor",ne),window.customCards=window.customCards||[],window.customCards.push({type:"browser-player",name:"Browser Player",preview:!0}));class re extends X{static getConfigElement(){return document.createElement("browser-player-editor")}static getStubConfig(){return{}}async connectedCallback(){var e;super.connectedCallback(),(null===(e=window.browser_mod)||void 0===e?void 0:e.registered)||("hui-card-preview"===this.parentElement.localName?this.removeAttribute("hidden"):this.setAttribute("hidden",""))}async setConfig(e){for(var t,i,s,o;!window.browser_mod;)await new Promise((e=>setTimeout(e,1e3)));for(const e of["play","pause","ended","volumechange","canplay","loadeddata"])null===(i=null===(t=window.browser_mod)||void 0===t?void 0:t._audio_player)||void 0===i||i.addEventListener(e,(()=>this.requestUpdate()));null===(o=null===(s=window.browser_mod)||void 0===s?void 0:s._video_player)||void 0===o||o.addEventListener(event,(()=>this.requestUpdate()))}handleMute(e){window.browser_mod.player.muted=!window.browser_mod.player.muted}handleVolumeChange(e){const t=parseFloat(e.target.value);window.browser_mod.player.volume=t}handleMoreInfo(e){var t;this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:null===(t=window.browser_mod.browserEntities)||void 0===t?void 0:t.player}}))}handlePlayPause(e){!window.browser_mod.player.src||window.browser_mod.player.paused||window.browser_mod.player.ended?(window.browser_mod.player.play(),window.browser_mod._show_video_player()):window.browser_mod.player.pause()}render(){var e;return window.browser_mod?(null===(e=window.browser_mod)||void 0===e?void 0:e.registered)?I`
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

          ${"stopped"===window.browser_mod.player_state?I`<div class="placeholder"></div>`:I`
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
    `:I`
        <ha-card>
          <ha-alert> This browser is not registered to Browser Mod. </ha-alert>
        </ha-card>
      `:(window.setTimeout((()=>this.requestUpdate()),100),I``)}static get styles(){return r`
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
    `}}t([te()],re.prototype,"hass",void 0),t([te({attribute:"edit-mode",reflect:!0})],re.prototype,"editMode",void 0),customElements.get("browser-player")||customElements.define("browser-player",re);async function ae(e,t=!1){var i;if((null===(i=e.localName)||void 0===i?void 0:i.includes("-"))&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise((e=>setTimeout(e,100)))}}async function de(e,t,i=!1){let s=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,i]of t.entries()){const e=s[0];if(!e)return null;i.trim().length&&(ae(e),s="$"===i?[e.shadowRoot]:e.querySelectorAll(i))}return i?s:s[0]}async function le(e,t,i=!1,s=1e4){return Promise.race([de(e,t,i),new Promise(((e,t)=>setTimeout((()=>t(new Error("SELECTTREE-TIMEOUT"))),s)))]).catch((e=>{if(!e.message||"SELECTTREE-TIMEOUT"!==e.message)throw e;return null}))}async function ce(){await Promise.race([customElements.whenDefined("home-assistant"),customElements.whenDefined("hc-main")]);const e=customElements.get("home-assistant")?"home-assistant":"hc-main";for(;!document.querySelector(e);)await new Promise((e=>window.setTimeout(e,100)));return document.querySelector(e)}async function he(){const e=await ce();for(;!e.hass;)await new Promise((e=>window.setTimeout(e,100)));return e.hass}async function ue(e){(await ce()).provideHass(e)}const pe=async()=>{var e,t,i;if(void 0!==window.loadCardHelpers)return;await customElements.whenDefined("partial-panel-resolver");const s=document.createElement("partial-panel-resolver").getRoutes([{component_name:"lovelace",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==s?void 0:s.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t));try{const e=document.createElement("ha-panel-lovelace");e.hass=await he(),e.panel={config:{mode:"yaml"}},await e._fetchConfig(!1)}catch(e){}},ve=async()=>{if(customElements.get("ha-form"))return;await pe();const e=await window.loadCardHelpers();if(!e)return;const t=await e.createCardElement({type:"button"});t&&await t.constructor.getConfigElement()};function me(e=!1){return function(t,i,s){const o=s.value;let n;const r=function(...t){if(e&&!1===n&&(n=!0),void 0!==n)return;n=!1;const i=o.bind(this)(...t);return n?(n=void 0,r.bind(this)(...t)):(n=void 0,i)};s.value=r}}const _e=e=>class extends e{constructor(){super(...arguments),this.connected=!1,this.connectionPromise=new Promise((e=>{this._connectionResolve=e})),this.browserEntities={}}LOG(...e){if(void 0===window.browser_mod_log)return;const t=new Date;console.log(`${t.toLocaleTimeString()}`,...e),this.connection.sendMessage({type:"browser_mod/log",message:e[0]})}fireEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0}))}incoming_message(e){var t;e.command?(this.LOG("Command:",e),this.fireEvent(`command-${e.command}`,e)):e.browserEntities?this.browserEntities=e.browserEntities:e.result&&this.update_config(e.result),null===(t=this._connectionResolve)||void 0===t||t.call(this),this._connectionResolve=void 0}update_config(e){var t;this.LOG("Receive:",e);let i=!1;!this.registered&&(null===(t=e.browsers)||void 0===t?void 0:t[this.browserID])&&(i=!0),this._data=e,this.connected||(this.connected=!0,this.fireEvent("browser-mod-connected")),this.fireEvent("browser-mod-config-update"),i&&this.sendUpdate({})}async connect(){const e=(await he()).connection;this.connection=e,e.subscribeMessage((e=>this.incoming_message(e)),{type:"browser_mod/connect",browserID:this.browserID}),e.addEventListener("disconnected",(()=>{this.connected=!1,this.fireEvent("browser-mod-disconnected")})),e.addEventListener("ready",(()=>{this.connected=!0,this.fireEvent("browser-mod-connected"),this.sendUpdate({})})),ue(this)}get config(){var e,t;return null!==(t=null===(e=this._data)||void 0===e?void 0:e.config)&&void 0!==t?t:{}}get browsers(){var e,t;return null!==(t=null===(e=this._data)||void 0===e?void 0:e.browsers)&&void 0!==t?t:[]}get registered(){var e;return void 0!==(null===(e=this.browsers)||void 0===e?void 0:e[this.browserID])}get browser_locked(){var e,t;return null===(t=null===(e=this.browsers)||void 0===e?void 0:e[this.browserID])||void 0===t?void 0:t.locked}set registered(e){(async()=>{if(e){if(this.registered)return;await this.connection.sendMessage({type:"browser_mod/register",browserID:this.browserID})}else{if(!this.registered)return;await this.connection.sendMessage({type:"browser_mod/unregister",browserID:this.browserID})}})()}async _reregister(e={}){await this.connection.sendMessage({type:"browser_mod/register",browserID:this.browserID,data:Object.assign(Object.assign({},this.browsers[this.browserID]),e)})}get global_settings(){var e,t;const i={},s=null!==(t=null===(e=this._data)||void 0===e?void 0:e.settings)&&void 0!==t?t:{};for(const[e,t]of Object.entries(s))null!==t&&(i[e]=t);return i}get user_settings(){var e,t,i,s,o;const n={},r=null!==(o=null===(t=null===(e=this._data)||void 0===e?void 0:e.user_settings)||void 0===t?void 0:t[null===(s=null===(i=this.hass)||void 0===i?void 0:i.user)||void 0===s?void 0:s.id])&&void 0!==o?o:{};for(const[e,t]of Object.entries(r))null!==t&&(n[e]=t);return n}get browser_settings(){var e,t,i;const s={},o=null!==(i=null===(t=null===(e=this.browsers)||void 0===e?void 0:e[this.browserID])||void 0===t?void 0:t.settings)&&void 0!==i?i:{};for(const[e,t]of Object.entries(o))null!==t&&(s[e]=t);return s}get settings(){return Object.assign(Object.assign(Object.assign({},this.global_settings),this.browser_settings),this.user_settings)}set_setting(e,t,i){var s;switch(i){case"global":this.connection.sendMessage({type:"browser_mod/settings",key:e,value:t});break;case"user":{const i=this.hass.user.id;this.connection.sendMessage({type:"browser_mod/settings",user:i,key:e,value:t});break}case"browser":{const i=null===(s=this.browsers[this.browserID])||void 0===s?void 0:s.settings;i[e]=t,this._reregister({settings:i});break}}}get cameraEnabled(){return this.registered?this.browsers[this.browserID].camera:null}set cameraEnabled(e){this._reregister({camera:e})}sendUpdate(e){this.connected&&this.registered&&(this.LOG("Send:",e),this.connection.sendMessage({type:"browser_mod/update",browserID:this.browserID,data:e}))}browserIDChanged(e,t){var i,s;this.fireEvent("browser-mod-config-update"),void 0!==(null===(i=this.browsers)||void 0===i?void 0:i[e])&&void 0===(null===(s=this.browsers)||void 0===s?void 0:s[this.browserID])&&(async()=>{await this.connection.sendMessage({type:"browser_mod/register",browserID:e,data:Object.assign(Object.assign({},this.browsers[e]),{browserID:this.browserID})})})()}},ge=e=>class extends e{constructor(){super(),this._listeners={},this._brightness=255;const e=this._panel=document.createElement("div");document.body.append(e),e.classList.add("browser-mod-blackout"),e.attachShadow({mode:"open"});const t=document.createElement("style");e.shadowRoot.append(t),t.innerHTML="\n        :host {\n          background: rgba(0,0,0, var(--darkness));\n          position: fixed;\n          left: 0;\n          top: 0;\n          bottom: 0;\n          right: 0;\n          width: 100%;\n          height: 100%;\n          z-index: 10000;\n          display: block;\n          pointer-events: none;\n        }\n        :host([dark]) {\n          background: rgba(0,0,0,1);\n        }\n      ",this.addEventListener("command-screen_off",(()=>this._screen_off())),this.addEventListener("command-screen_on",(e=>this._screen_on(e))),this.addEventListener("fully-update",(()=>this.send_screen_status())),this.connectionPromise.then((()=>this._screen_on()))}send_screen_status(){let e=!this._panel.hasAttribute("dark"),t=this._brightness;this.fully&&(e=this.fully_screen,t=this.fully_brightness),this.sendUpdate({screen_on:e,screen_brightness:t})}_screen_off(){this.fully?this.fully_screen=!1:this._panel.setAttribute("dark",""),this.send_screen_status();const e=()=>this._screen_on();for(const t of["pointerdown","pointermove","keydown"])this._listeners[t]=e,window.addEventListener(t,e)}_screen_on(e){var t,i;this.fully?(this.fully_screen=!0,(null===(t=null==e?void 0:e.detail)||void 0===t?void 0:t.brightness)&&(this.fully_brightness=e.detail.brightness)):((null===(i=null==e?void 0:e.detail)||void 0===i?void 0:i.brightness)&&(this._brightness=e.detail.brightness,this._panel.style.setProperty("--darkness",1-e.detail.brightness/255)),this._panel.removeAttribute("dark")),this.send_screen_status();for(const e of["pointerdown","pointermove","keydown"])this._listeners[e]&&(window.removeEventListener(e,this._listeners[e]),this._listeners[e]=void 0)}},we=e=>{class i extends e{constructor(){super(),this._audio_player=new Audio,this._video_player=document.createElement("video"),this._video_player.controls=!0,this._video_player.style.setProperty("width","100%"),this.player=this._audio_player,this._player_enabled=!1;for(const e of["play","pause","ended","volumechange"])this._audio_player.addEventListener(e,(()=>this._player_update())),this._video_player.addEventListener(e,(()=>this._player_update()));for(const e of["timeupdate"])this._audio_player.addEventListener(e,(()=>this._player_update_throttled())),this._video_player.addEventListener(e,(()=>this._player_update_throttled()));this.firstInteraction.then((()=>{this._player_enabled=!0,this.player.ended||this.player.play()})),this.addEventListener("command-player-play",(e=>{var t,i,s;this.player.src&&this.player.pause(),(null===(t=e.detail)||void 0===t?void 0:t.media_type)&&((null===(i=e.detail)||void 0===i?void 0:i.media_type.startsWith("video"))?this.player=this._video_player:this.player=this._audio_player),(null===(s=e.detail)||void 0===s?void 0:s.media_content_id)&&(this.player.src=e.detail.media_content_id),this.player.play(),this._show_video_player()})),this.addEventListener("command-player-pause",(e=>this.player.pause())),this.addEventListener("command-player-stop",(e=>{this.player.src=null,this.player.pause()})),this.addEventListener("command-player-set-volume",(e=>{var t;void 0!==(null===(t=e.detail)||void 0===t?void 0:t.volume_level)&&(this.player.volume=e.detail.volume_level)})),this.addEventListener("command-player-mute",(e=>{var t;void 0!==(null===(t=e.detail)||void 0===t?void 0:t.mute)?this.player.muted=Boolean(e.detail.mute):this.player.muted=!this.player.muted})),this.addEventListener("command-player-seek",(e=>{this.player.currentTime=e.detail.position,setTimeout((()=>this._player_update()),10)})),this.addEventListener("command-player-turn-off",(e=>{this.player===this._video_player&&this._video_player.isConnected?this.closePopup():this.player.src&&this.player.pause(),this.player.src="",this._player_update()})),this.connectionPromise.then((()=>this._player_update()))}_show_video_player(){this.player===this._video_player&&this.player.src?(le(document,"home-assistant $ dialog-media-player-browse").then((e=>null==e?void 0:e.closeDialog())),this.showPopup(void 0,this._video_player,{dismiss_action:()=>this._video_player.pause(),size:"wide"})):this.player!==this._video_player&&this._video_player.isConnected&&this.closePopup()}_player_update_throttled(){this._player_update()}_player_update(){const e=this._player_enabled?this.player.src&&this.player.src!==window.location.href?this.player.ended?"stopped":this.player.paused?"paused":"playing":"off":"unavailable";this.sendUpdate({player:{volume:this.player.volume,muted:this.player.muted,src:this.player.src,state:e,media_duration:this.player.duration,media_position:this.player.currentTime}})}}var s;return t([(s=3e3,function(e,t,i){const o=i.value;let n;i.value=function(...e){if(!n)return n=setTimeout((()=>n=void 0),s),o.bind(this)(...e)}})],i.prototype,"_player_update_throttled",null),i},be=e=>class extends e{constructor(){super(),this._framerate=2,this.cameraError=!1,this._setup_camera()}async _setup_camera(){if(this._video)return;if(await this.connectionPromise,await this.firstInteraction,!this.cameraEnabled)return;if(this.fully)return this.update_camera();const e=document.createElement("div");document.body.append(e),e.classList.add("browser-mod-camera"),e.attachShadow({mode:"open"});const t=document.createElement("style");e.shadowRoot.append(t),t.innerHTML="\n      :host {\n        display: none;\n      }";const i=this._video=document.createElement("video");e.shadowRoot.append(i),i.autoplay=!0,i.playsInline=!0,i.style.display="none";const s=this._canvas=document.createElement("canvas");if(e.shadowRoot.append(s),s.style.display="none",navigator.mediaDevices)try{const e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});i.srcObject=e,i.play(),this.update_camera()}catch(e){if("NotAllowedError"!==e.name)throw e;this.cameraError=!0,this.fireEvent("browser-mod-config-update")}}async update_camera(){var e;if(!this.cameraEnabled){const t=null===(e=this._video)||void 0===e?void 0:e.srcObject;return void(t&&(t.getTracks().forEach((e=>e.stop())),this._video.scrObject=void 0))}if(this.fully)this.sendUpdate({camera:this.fully_camera});else{const e=this._video,t=e.videoWidth,i=e.videoHeight;this._canvas.width=t,this._canvas.height=i;this._canvas.getContext("2d").drawImage(e,0,0,t,i),this.sendUpdate({camera:this._canvas.toDataURL("image/jpeg")})}const t=Math.round(1e3/this._framerate);setTimeout((()=>this.update_camera()),t)}},ye=e=>class extends e{constructor(){super(),this.firstInteraction=new Promise((e=>{this._interactionResolve=e})),this.show_indicator()}async show_indicator(){if(await this.connectionPromise,!this.registered)return;const e=document.createElement("div");document.body.append(e),e.classList.add("browser-mod-require-interaction"),e.attachShadow({mode:"open"});const t=document.createElement("style");e.shadowRoot.append(t),t.innerHTML='\n      :host {\n        position: fixed;\n        right: 8px;\n        bottom: 8px;\n        color: var(--warning-color, red);\n        opacity: 0.5;\n        --mdc-icon-size: 48px;\n      }\n      ha-icon::before {\n        content: "Browser\\00a0Mod";\n        font-size: 0.75rem;\n        position: absolute;\n        right: 0;\n        bottom: 90%;\n      }\n      video {\n        display: none;\n      }\n      ';const i=document.createElement("ha-icon");e.shadowRoot.append(i),i.icon="mdi:gesture-tap";const s=this._video=document.createElement("video");e.shadowRoot.append(s);const o=s.play();o&&(o.then((()=>{this._interactionResolve(),s.pause()})).catch((e=>{})),s.pause()),window.addEventListener("pointerdown",(()=>{this._interactionResolve()}),{once:!0}),window.addEventListener("touchstart",(()=>{this._interactionResolve()}),{once:!0}),this.fully&&this._interactionResolve(),await this.firstInteraction,e.remove()}},fe=e=>class extends e{constructor(){if(super(),this._fully_screensaver=!1,this.fully){for(const e of["screenOn","screenOff","pluggedAC","pluggedUSB","onBatteryLevelChanged","unplugged","networkReconnect","onMotion","onDaydreamStart","onDaydreamStop"])window.fully.bind(e,`window.browser_mod.fullyEvent("${e}");`);window.fully.bind("onScreensaverStart","window.browser_mod._fully_screensaver = true; window.browser_mod.fullyEvent();"),window.fully.bind("onScreensaverStop","window.browser_mod._fully_screensaver = false; window.browser_mod.fullyEvent();")}}get fully(){return void 0!==window.fully}get fully_screen(){var e;return!1===this._fully_screensaver&&(null===(e=window.fully)||void 0===e?void 0:e.getScreenOn())}set fully_screen(e){var t,i,s;e?(null===(t=window.fully)||void 0===t||t.turnScreenOn(),null===(i=window.fully)||void 0===i||i.stopScreensaver()):null===(s=window.fully)||void 0===s||s.turnScreenOff()}get fully_brightness(){var e;return null===(e=window.fully)||void 0===e?void 0:e.getScreenBrightness()}set fully_brightness(e){var t;null===(t=window.fully)||void 0===t||t.setScreenBrightness(e)}get fully_camera(){var e;return null===(e=window.fully)||void 0===e?void 0:e.getCamshotJpgBase64()}fullyEvent(e){this.fireEvent("fully-update",{event:e})}},$e=e=>class extends e{constructor(){super(),document.addEventListener("visibilitychange",(()=>this._browser_state_update())),window.addEventListener("location-changed",(()=>this._browser_state_update())),this.addEventListener("fully-update",(()=>this._browser_state_update())),this.connectionPromise.then((()=>this._browser_state_update()))}_browser_state_update(){(async()=>{var e,t,i,s,o,n,r,a,d,l,c,h;const u=null===(t=(e=navigator).getBattery)||void 0===t?void 0:t.call(e);this.sendUpdate({browser:{path:window.location.pathname,visibility:document.visibilityState,userAgent:navigator.userAgent,currentUser:null===(s=null===(i=this.hass)||void 0===i?void 0:i.user)||void 0===s?void 0:s.name,fullyKiosk:this.fully||!1,width:window.innerWidth,height:window.innerHeight,battery_level:null!==(n=null===(o=window.fully)||void 0===o?void 0:o.getBatteryLevel())&&void 0!==n?n:100*(null==u?void 0:u.level),charging:null!==(a=null===(r=window.fully)||void 0===r?void 0:r.isPlugged())&&void 0!==a?a:null==u?void 0:u.charging,darkMode:null===(l=null===(d=this.hass)||void 0===d?void 0:d.themes)||void 0===l?void 0:l.darkMode,userData:null===(c=this.hass)||void 0===c?void 0:c.user,ip_address:null===(h=window.fully)||void 0===h?void 0:h.getIp4Address()}})})()}async browser_navigate(e){e&&(history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed")))}},Ee=e=>class extends e{constructor(){super();const e=["sequence","delay","popup","more_info","close_popup","notification","navigate","refresh","set_theme","console","javascript"];for(const t of e)this.addEventListener(`command-${t}`,(e=>{this.service(t,e.detail)}));document.body.addEventListener("ll-custom",(e=>{e.detail.browser_mod&&this._service_action(e.detail.browser_mod)}))}async service(e,t){this._service_action({service:e,data:t})}async _service_action({service:e,data:t}){if(!e)return void console.error("Browser Mod: Service parameter not specified in service call.");let i=e;if(!i.startsWith("browser_mod.")&&i.includes(".")||void 0!==t.browser_id){const e=Object.assign({},t);"THIS"===e.browser_id&&(e.browser_id=this.browserID);const[s,o]=i.split(".");return this.hass.callService(s,o,e)}switch(i.startsWith("browser_mod.")&&(i=i.substring(12)),i){case"sequence":for(const e of t.sequence)await this._service_action(e);break;case"delay":await new Promise((e=>setTimeout(e,t.time)));break;case"more_info":const{entity:e,large:i,ignore_popup_card:s}=t;this.showMoreInfo(e,i,s);break;case"popup":const{title:o,content:n}=t,r=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(e);o<s.length;o++)t.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(e,s[o])&&(i[s[o]]=e[s[o]])}return i}(t,["title","content"]);for(const[e,t]of Object.entries(r))e.endsWith("_action")&&(r[e]=e=>{const{service:i,data:s}=t;this._service_action({service:i,data:Object.assign(Object.assign({},s),e)})});this.showPopup(o,n,r);break;case"notification":{const{message:e,action_text:i,action:s,duration:o,dismissable:n}=t;let r;s&&i&&(r={text:i,action:e=>{const{service:t,data:i}=s;this._service_action({service:t,data:Object.assign(Object.assign({},i),e)})}});(await ce()).dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e,action:r,duration:o,dismissable:n}}))}break;case"close_popup":this.closePopup();break;case"navigate":this.browser_navigate(t.path);break;case"refresh":window.location.href=window.location.href;break;case"set_theme":{const e=Object.assign({},t);if("auto"===e.theme&&(e.theme=void 0),"auto"===e.dark&&(e.dark=void 0),"light"===e.dark&&(e.dark=!1),"dark"===e.dark&&(e.dark=!0),e.primaryColor&&Array.isArray(e.primaryColor)){const[t,i,s]=e.primaryColor;e.primaryColor="#"+((1<<24)+(t<<16)+(i<<8)+s).toString(16).slice(1)}if(e.accentColor&&Array.isArray(e.accentColor)){const[t,i,s]=e.accentColor;e.accentColor="#"+((1<<24)+(t<<16)+(i<<8)+s).toString(16).slice(1)}(await ce()).dispatchEvent(new CustomEvent("settheme",{detail:e}))}break;case"console":Object.keys(t).length>1||t&&void 0===t.message?console.dir(t):console.log(t.message);break;case"javascript":const a=async()=>{let e=await le(document,"home-assistant$home-assistant-main$ha-panel-lovelace$hui-root");e||(e=await le(document,"hc-main $ hc-lovelace $ hui-view")),e||(e=await le(document,"hc-main $ hc-lovelace $ hui-panel-view")),e&&e.dispatchEvent(new CustomEvent("config-refresh"))},d=async e=>this.connection.sendMessage({type:"browser_mod/log",message:e}),l=`\n          "use strict";\n          ${t.code}\n          `;new Function("hass","data","service","log","lovelace_reload",l)(this.hass,t,window.browser_mod.service,d,a)}}},Se=e=>class extends e{constructor(){super(),this.activityTriggered=!1,this._activityCooldown=15e3;for(const e of["pointerdown","pointermove","keydown"])window.addEventListener(e,(()=>this.activityTrigger(!0)));this.addEventListener("fully-update",(()=>{this.activityTrigger()}))}activityTrigger(e=!1){this.activityTriggered||this.sendUpdate({activity:!0}),this.activityTriggered=!0,e&&this.fireEvent("browser-mod-activity"),clearTimeout(this._activityTimeout),this._activityTimeout=setTimeout((()=>this.activityReset()),this._activityCooldown)}activityReset(){clearTimeout(this._activityTimeout),this.activityTriggered&&this.sendUpdate({activity:!1}),this.activityTriggered=!1}},Ae=2;class xe extends class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(e){if(super(e),this.it=U,e.type!==Ae)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===U||null==e)return this._t=void 0,this.it=e;if(e===L)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}xe.directiveName="unsafeHTML",xe.resultType=1;const Te=(e=>(...t)=>({_$litDirective$:e,values:t}))(xe);class Ce extends X{async closeDialog(){var e,t,i;this.open=!1,this.card=void 0,clearInterval(this._timeoutTimer),this._autocloseListener&&(window.browser_mod.removeEventListener("browser-mod-activity",this._autocloseListener),this._autocloseListener=void 0),null===(t=null===(e=this._actions)||void 0===e?void 0:e.dismiss_action)||void 0===t||t.call(e),(null===(i=this._cardMod)||void 0===i?void 0:i[0])&&(this._cardMod[0].styles="")}openDialog(){var e;this.open=!0,null===(e=this.dialog)||void 0===e||e.show(),this.timeout&&(this._timeoutStart=(new Date).getTime(),this._timeoutTimer=setInterval((()=>{const e=(new Date).getTime()-this._timeoutStart,t=e/this.timeout*100;this.style.setProperty("--progress",`${t}%`),e>=this.timeout&&(clearInterval(this._timeoutTimer),this._timeout())}),10)),this._autocloseListener=void 0,this._autoclose&&(this._autocloseListener=()=>this.dialog.close(),window.browser_mod.addEventListener("browser-mod-activity",this._autocloseListener,{once:!0})),customElements.whenDefined("card-mod").then((()=>{var e,t,i,s;null===(t=null===(e=customElements.get("card-mod"))||void 0===e?void 0:e.applyToElement)||void 0===t||t.call(e,this,"more-info",null!==(s=null===(i=this.card_mod)||void 0===i?void 0:i.style)&&void 0!==s?s:"")}))}async _build_card(e){const t=await window.loadCardHelpers(),i=await t.createCardElement(e);i.hass=window.browser_mod.hass,ue(i),this.content=i,customElements.get(i.localName)||customElements.whenDefined(i.localName).then((()=>{this._build_card(e)})),i.addEventListener("ll-rebuild",(()=>{this._build_card(e)}))}async setupDialog(e,t,{right_button:i,right_button_action:s,left_button:o,left_button_action:n,dismissable:r=!0,dismiss_action:a,timeout:d,timeout_action:l,size:c,style:h,autoclose:u=!1,card_mod:p}={}){if(this._formdata=void 0,this.title=e,this.card=void 0,this.card_mod=p,t&&t instanceof HTMLElement)this.content=t;else if(t&&Array.isArray(t)){ve();const e=document.createElement("ha-form");e.schema=t,e.computeLabel=e=>{var t;return null!==(t=e.label)&&void 0!==t?t:e.name},e.hass=window.browser_mod.hass,this._formdata={};for(const e of t)e.name&&void 0!==e.default&&(this._formdata[e.name]=e.default);e.data=this._formdata,ue(e),e.addEventListener("value-changed",(t=>{this._formdata=Object.assign({},t.detail.value),e.data=this._formdata})),e.addEventListener("closing",(e=>{e.stopPropagation(),e.preventDefault()})),this.content=e}else t&&"object"==typeof t?(this.card=!0,this._build_card(t)):this.content=Te(t);this.right_button=i,this.left_button=o,this.actions=void 0===i?void 0:"",this.dismissable=r,this.timeout=d,this._actions={right_button_action:s,left_button_action:n,dismiss_action:a,timeout_action:l},this.wide="wide"===c?"":void 0,this.fullscreen="fullscreen"===c?"":void 0,this._style=h,this._autoclose=u}async do_close(){var e,t,i;const s=null===(e=this._actions)||void 0===e?void 0:e.dismiss_action;(null===(t=this._actions)||void 0===t?void 0:t.dismiss_action)&&(this._actions.dismiss_action=void 0),await(null===(i=this.dialog)||void 0===i?void 0:i.close()),null==s||s(this._formdata)}async _primary(){var e,t,i;(null===(e=this._actions)||void 0===e?void 0:e.dismiss_action)&&(this._actions.dismiss_action=void 0),await this.do_close(),null===(i=null===(t=this._actions)||void 0===t?void 0:t.right_button_action)||void 0===i||i.call(t,this._formdata)}async _secondary(){var e,t,i;(null===(e=this._actions)||void 0===e?void 0:e.dismiss_action)&&(this._actions.dismiss_action=void 0),await this.do_close(),null===(i=null===(t=this._actions)||void 0===t?void 0:t.left_button_action)||void 0===i||i.call(t,this._formdata)}async _timeout(){var e,t,i;(null===(e=this._actions)||void 0===e?void 0:e.dismiss_action)&&(this._actions.dismiss_action=void 0),await this.do_close(),null===(i=null===(t=this._actions)||void 0===t?void 0:t.timeout_action)||void 0===i||i.call(t)}render(){return this.open?I`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        .heading=${void 0!==this.title}
        ?hideActions=${void 0===this.actions}
        .scrimClickAction=${this.dismissable?"close":""}
        .escapeKeyAction=${this.dismissable?"close":""}
      >
        ${this.timeout?I` <div slot="heading" class="progress"></div> `:""}
        ${this.title?I`
              <div slot="heading">
                <ha-header-bar>
                  ${this.dismissable?I`
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
            `:I``}

        <div class="content">${this.content}</div>

        ${void 0!==this.right_button?I`
              <mwc-button
                slot="primaryAction"
                .label=${this.right_button}
                @click=${this._primary}
                class="action-button"
              ></mwc-button>
            `:""}
        ${void 0!==this.left_button?I`
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
    `:I``}static get styles(){return r`
      ha-dialog {
        z-index: 10;
        --mdc-dialog-min-width: var(--popup-min-width, 400px);
        --mdc-dialog-max-width: var(--popup-max-width, 600px);
        --mdc-dialog-heading-ink-color: var(--primary-text-color);
        --mdc-dialog-content-ink-color: var(--primary-text-color);
        --ha-dialog-border-radius: var(--popup-border-radius, 28px);
        --padding-x: var(--popup-padding-x, 24px);
        --padding-y: var(--popup-padding-y, 20px);
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
        margin: -20px -24px;
        padding: var(--padding-y) var(--padding-x);
        --header-height: 64px;
        --footer-height: 0px;
      }
      .content:first-child {
        --header-height: 0px;
      }

      :host([card]) .content {
        --padding-x: var(--popup-padding-x, 0px);
        --padding-y: var(--popup-padding-y, 0px);
        --ha-card-box-shadow: none;
      }
      :host([actions]) .content {
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
          --mdc-dialog-min-width: 97vw;
          --mdc-dialog-max-width: 97vw;
          --mdc-shape-medium: 0px;
        }
        :host([wide]) .content {
          width: 100vw;
        }
      }
    `}}t([te()],Ce.prototype,"open",void 0),t([te()],Ce.prototype,"content",void 0),t([te()],Ce.prototype,"title",void 0),t([te({reflect:!0})],Ce.prototype,"actions",void 0),t([te({reflect:!0})],Ce.prototype,"card",void 0),t([te()],Ce.prototype,"right_button",void 0),t([te()],Ce.prototype,"left_button",void 0),t([te()],Ce.prototype,"dismissable",void 0),t([te({reflect:!0})],Ce.prototype,"wide",void 0),t([te({reflect:!0})],Ce.prototype,"fullscreen",void 0),t([te()],Ce.prototype,"_style",void 0),t([se("ha-dialog")],Ce.prototype,"dialog",void 0),customElements.get("browser-mod-popup")||customElements.define("browser-mod-popup",Ce);const ke=e=>class extends e{constructor(){super(),pe(),this._popupEl=document.createElement("browser-mod-popup"),document.body.append(this._popupEl),this._popupEl.addEventListener("hass-more-info",(async e=>{e.stopPropagation();const t=await ce();this._popupEl.do_close(),t.dispatchEvent(e)}));window.addEventListener("popstate",(async e=>{var t,i,s;const o=null===(t=e.state)||void 0===t?void 0:t.browserModPopup;o&&(o.open||(null===(i=this._popupEl)||void 0===i?void 0:i.open)&&(null===(s=this._popupEl)||void 0===s?void 0:s.dismissable)&&this._popupEl.do_close())}))}showPopup(...e){(async()=>{var t;this._popupEl.open&&await this._popupEl.do_close(),void 0===(null===(t=history.state)||void 0===t?void 0:t.browserModPopup)&&history.replaceState({browserModPopup:{open:!1}},""),history.pushState({browserModPopup:{open:!0}},""),await this._popupEl.setupDialog(...e),this._popupEl.openDialog()})()}closePopup(...e){this._popupEl.closeDialog(),this.showMoreInfo("")}async showMoreInfo(e,t=!1,i){const s=await ce();if(s.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:e,ignore_popup_card:i}})),t){await new Promise((e=>setTimeout(e,50)));const e=s.shadowRoot.querySelector("ha-more-info-dialog");e&&(e.large=!0)}}};var Pe="2.1.3";const Me=[{name:"entity",label:"Entity",selector:{entity:{}}},{name:"title",label:"Title",selector:{text:{}}},{name:"size",selector:{select:{mode:"dropdown",options:["normal","wide","fullscreen"]}}},{type:"grid",schema:[{name:"right_button",label:"Right button",selector:{text:{}}},{name:"left_button",label:"Left button",selector:{text:{}}}]},{type:"grid",schema:[{name:"right_button_action",label:"Right button action",selector:{object:{}}},{name:"left_button_action",label:"Left button action",selector:{object:{}}}]},{type:"grid",schema:[{name:"dismissable",label:"User dismissable",selector:{boolean:{}}},{name:"timeout",label:"Auto close timeout (ms)",selector:{number:{mode:"box"}}}]},{type:"grid",schema:[{name:"dismiss_action",label:"Dismiss action",selector:{object:{}}},{name:"timeout_action",label:"Timeout action",selector:{object:{}}}]},{name:"style",label:"CSS style",selector:{text:{multiline:!0}}}];class Oe extends X{constructor(){super(...arguments),this._selectedTab=0,this._cardGUIMode=!0,this._cardGUIModeAvailable=!0}setConfig(e){this._config=e}connectedCallback(){super.connectedCallback(),ve()}_handleSwitchTab(e){this._selectedTab=parseInt(e.detail.index,10)}_configChanged(e){e.stopPropagation(),this._config&&(this._config=Object.assign({},e.detail.value),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}})))}_cardConfigChanged(e){if(e.stopPropagation(),!this._config)return;const t=Object.assign({},e.detail.config);this._config=Object.assign(Object.assign({},this._config),{card:t}),this._cardGUIModeAvailable=e.detail.guiModeAvailable,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_toggleCardMode(e){var t;null===(t=this._cardEditorEl)||void 0===t||t.toggleMode()}_deleteCard(e){this._config&&(this._config=Object.assign({},this._config),delete this._config.card,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}})))}_cardGUIModeChanged(e){e.stopPropagation(),this._cardGUIMode=e.detail.guiMode,this._cardGUIModeAvailable=e.detail.guiModeAvailable}render(){return this.hass&&this._config?I`
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
    `:I``}_renderSettingsEditor(){return I`<div class="box">
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Me}
        .computeLabel=${e=>{var t;return null!==(t=e.label)&&void 0!==t?t:e.name}}
        @value-changed=${this._configChanged}
      ></ha-form>
    </div>`}_renderCardEditor(){return I`
      <div class="box cards">
        ${this._config.card?I`
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
            `:I`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardConfigChanged}
              ></hui-card-picker>
            `}
      </div>
    `}static get styles(){return r`
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
    `}}t([ie()],Oe.prototype,"_config",void 0),t([te()],Oe.prototype,"lovelace",void 0),t([te()],Oe.prototype,"hass",void 0),t([ie()],Oe.prototype,"_selectedTab",void 0),t([ie()],Oe.prototype,"_cardGUIMode",void 0),t([ie()],Oe.prototype,"_cardGUIModeAvailable",void 0),t([se("hui-card-element-editor")],Oe.prototype,"_cardEditorEl",void 0),(async()=>{for(;!window.browser_mod;)await new Promise((e=>setTimeout(e,1e3)));await window.browser_mod.connectionPromise,customElements.get("popup-card-editor")||(customElements.define("popup-card-editor",Oe),window.customCards=window.customCards||[],window.customCards.push({type:"popup-card",name:"Popup card",preview:!1,description:"Replace the more-info dialog for a given entity in the view that includes this card. (Browser Mod)"}))})();class Ie extends X{constructor(){super(),this.popup=this.popup.bind(this)}static getConfigElement(){return document.createElement("popup-card-editor")}static getStubConfig(e,t){return{entity:t[0],title:"Custom popup",dismissable:!0,card:{type:"markdown",content:"This replaces the more-info dialog"}}}setConfig(e){this._config=e,(async()=>{const t=await window.loadCardHelpers();this._element=await t.createCardElement(e.card),this._element.hass=this.hass})()}async connectedCallback(){super.connectedCallback(),window.addEventListener("hass-more-info",this.popup),"hui-card-preview"===this.parentElement.localName?(this.editMode=!0,this.removeAttribute("hidden")):this.setAttribute("hidden","")}async disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hass-more-info",this.popup)}popup(e){var t,i,s;if((null===(t=e.detail)||void 0===t?void 0:t.entityId)===this._config.entity&&!(null===(i=e.detail)||void 0===i?void 0:i.ignore_popup_card)){e.stopPropagation(),e.preventDefault();delete Object.assign({},this._config).card,null===(s=window.browser_mod)||void 0===s||s.service("popup",Object.assign({content:this._config.card},this._config)),setTimeout((()=>this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,cancelable:!1,detail:{entityId:""}}))),10)}}updated(e){super.updated(e),e.has("hass")&&this._element&&(this._element.hass=this.hass)}getCardSize(){return 0}render(){return this.editMode?I` <ha-card>
      <div class="app-toolbar">
        ${this._config.dismissable?I`
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
      ${void 0!==this._config.right_button||void 0!==this._config.left_button?I`
            <footer class="mdc-dialog__actions">
              <span>
                ${void 0!==this._config.left_button?I`
                      <mwc-button
                        .label=${this._config.left_button}
                      ></mwc-button>
                    `:""}
              </span>
              <span>
                ${void 0!==this._config.right_button?I`
                      <mwc-button
                        .label=${this._config.right_button}
                      ></mwc-button>
                    `:""}
              </span>
            </footer>
          `:""}
    </ha-card>`:I``}static get styles(){return r`
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
    `}}t([te()],Ie.prototype,"hass",void 0),t([ie()],Ie.prototype,"_config",void 0),t([te({attribute:"edit-mode",reflect:!0})],Ie.prototype,"editMode",void 0),t([ie()],Ie.prototype,"_element",void 0),(async()=>{for(;!window.browser_mod;)await new Promise((e=>setTimeout(e,1e3)));await window.browser_mod.connectionPromise,customElements.get("popup-card")||customElements.define("popup-card",Ie)})();const Le=e=>{class i extends e{constructor(){super(),this.__currentTitle=void 0;const e=async()=>{this.runUpdateTitle(),this.runHideHeader()};this._auto_settings_setup(),this.addEventListener("browser-mod-config-update",(()=>{this._auto_settings_setup(),e()})),window.addEventListener("location-changed",e)}async runHideHeader(){for(;!await this._hideHeader();)await new Promise((e=>setTimeout(e,500)))}async runUpdateTitle(){await async function(e,t,i){for(;t--;)await e(),await new Promise((e=>setTimeout(e,i)))}((()=>this._updateTitle()),3,500)}async _auto_settings_setup(){await this.connectionPromise;const e=this.settings;e.sidebarPanelOrder&&localStorage.setItem("sidebarPanelOrder",e.sidebarPanelOrder),e.sidebarHiddenPanels&&localStorage.setItem("sidebarHiddenPanels",e.sidebarHiddenPanels),e.defaultPanel&&localStorage.setItem("defaultPanel",`"${e.defaultPanel}"`),!0===e.hideSidebar&&(le(document.body,"home-assistant$home-assistant-main$app-drawer-layout").then((e=>{var t;return null===(t=null==e?void 0:e.style)||void 0===t?void 0:t.setProperty("--app-drawer-width","0px")})),le(document.body,"home-assistant$home-assistant-main$app-drawer-layout app-drawer").then((e=>{var t;return null===(t=null==e?void 0:e.remove)||void 0===t?void 0:t.call(e)}))),e.sidebarTitle&&(async()=>{this._sidebarTitleSubscription&&this._sidebarTitleSubscription(),this._sidebarTitleSubscription=void 0,this._sidebarTitleSubscription=await this.connection.subscribeMessage(this._updateSidebarTitle,{type:"render_template",template:e.sidebarTitle,variables:{}})})(),void 0!==e.faviconTemplate&&(async()=>{this._faviconTemplateSubscription&&this._faviconTemplateSubscription(),this._faviconTemplateSubscription=void 0,this._faviconTemplateSubscription=await this.connection.subscribeMessage(this._updateFavicon,{type:"render_template",template:e.faviconTemplate,variables:{}})})(),void 0!==e.titleTemplate&&(async()=>{this._titleTemplateSubscription&&this._titleTemplateSubscription(),this._titleTemplateSubscription=void 0,this._titleTemplateSubscription=await this.connection.subscribeMessage(this._updateTitle.bind(this),{type:"render_template",template:e.titleTemplate,variables:{}})})()}async _updateSidebarTitle({result:e}){let t,i=0;for(;!t&&i++<5;)t=await le(document,"home-assistant $ home-assistant-main $ app-drawer-layout app-drawer ha-sidebar $ .title"),t||await new Promise((e=>setTimeout(e,500)));t&&(t.innerHTML=e)}get _currentFavicon(){const e=document.head.querySelector("link[rel~='icon']");return null==e?void 0:e.href}_updateFavicon({result:e}){document.head.querySelector("link[rel~='icon']").href=e}get _currentTitle(){return this.__currentTitle}_updateTitle(e){e&&(this.__currentTitle=e.result),this.__currentTitle&&(document.title=this.__currentTitle)}async _hideHeader(){var e,t,i;if(!0!==this.settings.hideHeader&&!0!==this.settings.hideSidebar)return!0;let s=await le(document,"home-assistant $ home-assistant-main $ app-drawer-layout partial-panel-resolver");if(!s)return!1;let o=0;for(;s&&"ha-app-layout"!==s.localName&&o++<5;){await ae(s,!0);const i=null!==(t=null!==(e=s.querySelector("ha-app-layout"))&&void 0!==e?e:s.firstElementChild)&&void 0!==t?t:s.shadowRoot;s=i}if("ha-app-layout"!==(null==s?void 0:s.localName))return!1;if(!0===this.settings.hideHeader){if(s.header)return s.header.style.setProperty("display","none"),setTimeout((()=>s._updateLayoutStates()),0),!0}else!0===this.settings.hideSidebar&&(s=await le(s,"ha-menu-button"),null===(i=null==s?void 0:s.remove)||void 0===i||i.call(s));return!1}getSetting(e){var t,i,s,o;const n={global:void 0,browser:{},user:{}};n.global=null===(t=this._data.settings)||void 0===t?void 0:t[e];for(const[t,o]of Object.entries(null!==(i=this._data.browsers)&&void 0!==i?i:{}))null!=(null===(s=o.settings)||void 0===s?void 0:s[e])&&(n.browser[t]=o.settings[e]);for(const[t,i]of Object.entries(null!==(o=this._data.user_settings)&&void 0!==o?o:{}))null!=i[e]&&(n.user[t]=i[e]);return n}setSetting(e,t,i){if("global"===e)for(const[e,t]of Object.entries(i))this.connection.sendMessage({type:"browser_mod/settings",key:e,value:t});else if("browser"===e){const e=this._data.browsers[t],s=Object.assign(Object.assign({},e.settings),i);this.connection.sendMessage({type:"browser_mod/register",browserID:t,data:Object.assign(Object.assign({},e),{settings:s})})}else if("user"===e){const e=t;for(const[t,s]of Object.entries(i))this.connection.sendMessage({type:"browser_mod/settings",user:e,key:t,value:s})}}}return t([me()],i.prototype,"runHideHeader",null),t([me(!0)],i.prototype,"runUpdateTitle",null),i},Ue="browser_mod-browser-id",De=e=>class extends e{constructor(){if(super(),Storage&&!Storage.prototype.browser_mod_patched){const e=Storage.prototype.clear;Storage.prototype.clear=function(){const t=this.getItem(Ue),i=this.getItem("suspendWhenHidden");e.apply(this),this.setItem(Ue,t),this.setItem("suspendWhenHidden",i)},Storage.prototype.browser_mod_patched=!0}}async recall_id(){if(!this.connection)return;const e=await this.connection.sendMessagePromise({type:"browser_mod/recall_id"});e&&(localStorage[Ue]=e)}get browserID(){return document.querySelector("hc-main")?"CAST":localStorage[Ue]?localStorage[Ue]:(this.browserID="",this.recall_id(),this.browserID)}set browserID(e){""===e&&(e=function(){var e,t;const i=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);return null!==(t=null===(e=window.fully)||void 0===e?void 0:e.getDeviceId())&&void 0!==t?t:`${i()}${i()}-${i()}${i()}`}());const t=localStorage[Ue];localStorage[Ue]=e,this.browserIDChanged(t,e)}browserIDChanged(e,t){}};class je extends(Ee(ke(Se($e(be(we(ge(Le(fe(ye(_e(De(EventTarget))))))))))))){constructor(){super(),this.connect(),console.info(`%cBROWSER_MOD ${Pe} IS INSTALLED\n    %cBrowserID: ${this.browserID}`,"color: green; font-weight: bold","")}}window.browser_mod||(window.browser_mod=new je);export{je as BrowserMod};
