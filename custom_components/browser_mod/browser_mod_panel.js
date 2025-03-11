function e(e,t,s,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,s,n):o(t,s))||n);return r>3&&n&&Object.defineProperty(t,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=window,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class r{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(t,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce(((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1]),e[0]);return new r(s,e,i)},a=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var l;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},g=(e,t)=>t!==e&&(t==t||e==e),w={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:g},b="finalized";class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,s)=>{const i=this._$Ep(s,t);void 0!==i&&(this._$Ev.set(i,s),e.push(i))})),e}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const o=this[e];this[t]=i,this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||w}static finalize(){if(this.hasOwnProperty(b))return!1;this[b]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of t)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,s;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(s=e.hostConnected)||void 0===s||s.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{s?e.adoptedStyleSheets=i.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):i.forEach((s=>{const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,e.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=w){var i;const o=this.constructor._$Ep(e,s);if(void 0!==o&&!0===s.reflect){const r=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:p).toAttribute(t,s.type);this._$El=e,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(e,t){var s;const i=this.constructor,o=i._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=i.getPropertyOptions(o),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(s=e.converter)||void 0===s?void 0:s.fromAttribute)?e.converter:p;this._$El=o,this[o]=r.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,s){let i=!0;void 0!==e&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===s.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(s)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var _;m[b]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:m}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const f=window,v=f.trustedTypes,y=v?v.createPolicy("lit-html",{createHTML:e=>e}):void 0,$="$lit$",S=`lit$${(Math.random()+"").slice(9)}$`,A="?"+S,E=`<${A}>`,x=document,k=()=>x.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,P="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,R=/>/g,D=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,N=/"/g,B=/^(?:script|style|textarea|title)$/i,M=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),I=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),j=new WeakMap,K=x.createTreeWalker(x,129,null,!1);function z(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==y?y.createHTML(t):t}const W=(e,t)=>{const s=e.length-1,i=[];let o,r=2===t?"<svg>":"",n=T;for(let t=0;t<s;t++){const s=e[t];let a,l,d=-1,h=0;for(;h<s.length&&(n.lastIndex=h,l=n.exec(s),null!==l);)h=n.lastIndex,n===T?"!--"===l[1]?n=U:void 0!==l[1]?n=R:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=null!=o?o:T,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?D:'"'===l[3]?N:H):n===N||n===H?n=D:n===U||n===R?n=T:(n=D,o=void 0);const c=n===D&&e[t+1].startsWith("/>")?" ":"";r+=n===T?s+E:d>=0?(i.push(a),s.slice(0,d)+$+s.slice(d)+S+c):s+S+(-2===d?(i.push(void 0),t):c)}return[z(e,r+(e[s]||"<?>")+(2===t?"</svg>":"")),i]};class F{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,r=0;const n=e.length-1,a=this.parts,[l,d]=W(e,t);if(this.el=F.createElement(l,s),K.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith($)||t.startsWith(S)){const s=d[r++];if(e.push(t),void 0!==s){const e=i.getAttribute(s.toLowerCase()+$).split(S),t=/([.?@])?(.*)/.exec(s);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?Q:"@"===t[1]?X:Y})}else a.push({type:6,index:o})}for(const t of e)i.removeAttribute(t)}if(B.test(i.tagName)){const e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],k()),K.nextNode(),a.push({type:2,index:++o});i.append(e[t],k())}}}else if(8===i.nodeType)if(i.data===A)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(S,e+1));)a.push({type:7,index:o}),e+=S.length-1}o++}}static createElement(e,t){const s=x.createElement("template");return s.innerHTML=e,s}}function V(e,t,s=e,i){var o,r,n,a;if(t===I)return t;let l=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const d=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,s,i)),void 0!==i?(null!==(n=(a=s)._$Co)&&void 0!==n?n:a._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(t=V(e,l._$AS(e,t.values),l,i)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:i}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:x).importNode(s,!0);K.currentNode=o;let r=K.nextNode(),n=0,a=0,l=i[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new J(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new ee(r,this,e)),this._$AV.push(t),l=i[++a]}n!==(null==l?void 0:l.index)&&(r=K.nextNode(),n++)}return K.currentNode=x,o}v(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class J{constructor(e,t,s,i){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),C(e)?e===L||null==e||""===e?(this._$AH!==L&&this._$AR(),this._$AH=L):e!==this._$AH&&e!==I&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>O(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==L&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(x.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=F.createElement(z(i.h,i.h[0]),this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(s);else{const e=new q(o,this),t=e.u(this.options);e.v(s),this.$(t),this._$AH=e}}_$AC(e){let t=j.get(e.strings);return void 0===t&&j.set(e.strings,t=new F(e)),t}T(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new J(this.k(k()),this.k(k()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Y{constructor(e,t,s,i,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,i){const o=this.strings;let r=!1;if(void 0===o)e=V(this,e,t,0),r=!C(e)||e!==this._$AH&&e!==I,r&&(this._$AH=e);else{const i=e;let n,a;for(e=o[0],n=0;n<o.length-1;n++)a=V(this,i[s+n],t,n),a===I&&(a=this._$AH[n]),r||(r=!C(a)||a!==this._$AH[n]),a===L?e=L:e!==L&&(e+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(e)}j(e){e===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===L?void 0:e}}const Z=v?v.emptyScript:"";class Q extends Y{constructor(){super(...arguments),this.type=4}j(e){e&&e!==L?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class X extends Y{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){var s;if((e=null!==(s=V(this,e,t,0))&&void 0!==s?s:L)===I)return;const i=this._$AH,o=e===L&&i!==L||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==L&&(i===L||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==s?s:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}}const te=f.litHtmlPolyfillSupport;null==te||te(F,J),(null!==(_=f.litHtmlVersions)&&void 0!==_?_:f.litHtmlVersions=[]).push("2.8.0");var se,ie;class oe extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{var i,o;const r=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:t;let n=r._$litPart$;if(void 0===n){const e=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new J(t.insertBefore(k(),e),e,void 0,null!=s?s:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return I}}oe.finalized=!0,oe._$litElement$=!0,null===(se=globalThis.litElementHydrateSupport)||void 0===se||se.call(globalThis,{LitElement:oe});const re=globalThis.litElementPolyfillSupport;null==re||re({LitElement:oe}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");const ne=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(s){s.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(s){s.createProperty(t.key,e)}},ae=(e,t,s)=>{t.constructor.createProperty(s,e)};function le(e){return(t,s)=>void 0!==s?ae(e,t,s):ne(e,t)}function de(e){return le({...e,state:!0})}var he;null===(he=window.HTMLSlotElement)||void 0===he||he.prototype.assignedElements;const ce="SELECTTREE-TIMEOUT";async function ue(e,t=!1){if(e.localName?.includes("-")&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise((e=>setTimeout(e,100)))}}async function pe(e,t,s=!1){let i=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,s]of t.entries()){const e=i[0];if(!e)return null;s.trim().length&&(ue(e),i="$"===s?[e.shadowRoot]:e.querySelectorAll(s))}return s?i:i[0]}async function ge(e,t,s=!1,i=1e4){return Promise.race([pe(e,t,s),new Promise(((e,t)=>setTimeout((()=>t(new Error(ce))),i)))]).catch((e=>{if(!e.message||e.message!==ce)throw e;return null}))}class we extends oe{constructor(){super(...arguments),this.dirty=!1}toggleRegister(){window.browser_mod?.connected&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}changeBrowserID(e){window.browser_mod.browserID=e.target.value,this.dirty=!0}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){return M`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${window.browser_mod?.connected?M`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:check-circle-outline"}
                  style="color: var(--success-color, green);"
                ></ha-icon>
              `:M`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:circle-outline"}
                  style="color: var(--error-color, red);"
                ></ha-icon>
              `}
        </h1>
        <div class="card-content">
          ${this.dirty?M`
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
              .checked=${window.browser_mod?.registered}
              @change=${this.toggleRegister}
              .disabled=${window.browser_mod?.browser_locked||window.browser_mod?.global_settings.autoRegister||window.browser_mod?.global_settings.lockRegister}
            ></ha-switch>
          </ha-settings-row>

          <ha-settings-row>
            <span slot="heading">Browser ID</span>
            <span slot="description"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-textfield
              .value=${window.browser_mod?.browserID}
              @change=${this.changeBrowserID}
              .disabled=${window.browser_mod?.browser_locked}
            ></ha-textfield>
          </ha-settings-row>

          ${window.browser_mod?.registered?M`
                ${this._renderSuspensionAlert()}
                <ha-settings-row>
                  <span slot="heading">Enable camera</span>
                  <span slot="description"
                    >Get camera input from this browser (hardware
                    dependent)</span
                  >
                  <ha-switch
                    .checked=${window.browser_mod?.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                    .disabled=${window.browser_mod?.browser_locked}
                  ></ha-switch>
                </ha-settings-row>
                ${window.browser_mod?.cameraError?M`
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
    `}_renderSuspensionAlert(){return this.hass.suspendWhenHidden?M`
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
    `:M``}_renderInteractionAlert(){return M`
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
    `}_renderFKBSettingsInfo(){return window.browser_mod?.fully&&this.getFullySettings()?M`
      ${window.browser_mod?.fully&&this.getFullySettings()?M` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`:""}
    `:M``}getFullySettings(){if(!window.browser_mod.fully)return null;const e=[],t=[];"true"!==window.fully.getBooleanSetting("autoplayVideos")&&t.push(M`<li>Autoplay Videos</li>`),"true"!==window.fully.getBooleanSetting("autoplayAudio")&&t.push(M`<li>Autoplay Audio</li>`),"true"!==window.fully.getBooleanSetting("webcamAccess")&&t.push(M`<li>Enable Webcam Access (PLUS)</li>`),0!==t.length&&e.push(M`<li>Web Content Settings</li>
        <ul>
          ${t}
        </ul>`),"true"!==window.fully.getBooleanSetting("websiteIntegration")&&e.push(M`<li>Advanced Web Settings</li>
        <ul>
          <li>Enable JavaScript Interface (PLUS)</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("keepScreenOn")&&e.push(M`<li>Device Management</li>
        <ul>
          <li>Keep Screen On</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("preventSleepWhileScreenOff")&&e.push(M`<li>Power Settings</li>
        <ul>
          <li>Prevent from Sleep while Screen Off</li>
        </ul>`);const s=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&s.push(M`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&s.push(M`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&s.push(M`<li>Exit Screensaver on Motion</li>`),0!==s.length&&e.push(M`<li>Motion Detection (PLUS)</li>
        <ul>
          ${s}
        </ul>`),"true"!==window.fully.getBooleanSetting("remoteAdmin")&&e.push(M`<li>Remote Administration (PLUS)</li>
        <ul>
          <li>Enable Remote Administration</li>
        </ul>`),e.length?e:null}static get styles(){return n`
      .card-header {
        display: flex;
        justify-content: space-between;
      }
      ha-textfield {
        width: 250px;
        display: block;
        margin-top: 8px;
      }
    `}}e([le()],we.prototype,"hass",void 0),e([le()],we.prototype,"dirty",void 0),customElements.define("browser-mod-browser-settings-card",we);class be extends oe{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate())),this._fetch_entity_registry()}async _fetch_entity_registry(){this._entity_registry||(this._entity_registry=await this.hass.callWS({type:"config/device_registry/list"}))}_find_entity(e){if(this._entity_registry)return this._entity_registry.find((t=>JSON.stringify(t?.identifiers?.[0])===JSON.stringify(["browser_mod",e])))}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup("Unregister browser",`Are you sure you want to unregister Browser ${t}?`,{right_button:"Yes",right_button_action:()=>{t===window.browser_mod.browserID?window.browser_mod.registered=!1:window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"No"})}toggle_lock_browser(e){const t=e.currentTarget.browserID,s=window.browser_mod.browsers[t];window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:t,data:{...s,locked:!s.locked}})}toggle_auto_register(e){window.browser_mod?.global_settings.autoRegister?window.browser_mod.setSetting("global",null,{autoRegister:void 0}):window.browser_mod.setSetting("global",null,{autoRegister:!0})}toggle_lock_register(e){window.browser_mod?.global_settings.lockRegister?window.browser_mod.setSetting("global",null,{lockRegister:void 0}):window.browser_mod.setSetting("global",null,{lockRegister:!0,autoRegister:void 0})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){return M`
      <ha-card header="Registered Browsers" outlined>
        <div class="card-content">
          <ha-settings-row>
            <span slot="heading">Auto-register</span>
            <span slot="description">
              Automatically register all new Browsers
            </span>
            <ha-switch
              .checked=${!0===window.browser_mod?.global_settings.autoRegister}
              @change=${this.toggle_auto_register}
            ></ha-switch>
          </ha-settings-row>
          <ha-settings-row>
            <span slot="heading">Lock register</span>
            <span slot="description">
              Disable registering or unregistering of all Browsers
            </span>
            <ha-switch
              .checked=${!0===window.browser_mod?.global_settings.lockRegister}
              @change=${this.toggle_lock_register}
            ></ha-switch>
          </ha-settings-row>

          ${Object.keys(window.browser_mod.browsers).map((e=>{const t=window.browser_mod.browsers[e],s=this._find_entity(e);return M` <ha-settings-row>
              <span slot="heading">
                ${e} ${s?.name_by_user?`(${s.name_by_user})`:""}
              </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${t.last_seen}
                ></ha-relative-time>
              </span>
              ${s?M`
                    <a href="config/devices/device/${s.id}">
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
        ${void 0===window.browser_mod.browsers.CAST?M`
              <div class="card-actions">
                <mwc-button @click=${this.register_cast}>
                  Register CAST Browser
                </mwc-button>
              </div>
            `:""}
      </ha-card>
    `}static get styles(){return n`
      ha-icon-button > * {
        display: flex;
        color: var(--primary-text-color);
      }
    `}}let me;e([le()],be.prototype,"hass",void 0),e([le()],be.prototype,"_entity_registry",void 0),customElements.define("browser-mod-registered-browsers-card",be);class _e extends oe{constructor(){super(...arguments),this.settingSelector={template:{}},this.tableData=[]}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.updateTable()))}updated(e){e.has("settingKey")&&this.updateTable(),e.has("hass")&&void 0===e.get("hass")&&this.updateTable()}async fetchUsers(){return void 0===me&&(me=await this.hass.callWS({type:"config/auth/list"})),me}clearSetting(e,t){window.browser_mod?.showPopup("Are you sure","Do you wish to clear this setting?",{right_button:"Yes",right_button_action:async()=>{if("sidebarPanelOrder"===this.settingKey)return await ge(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"),window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:"[]",sidebarPanelOrder:"[]"}),void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:void 0,sidebarPanelOrder:void 0});this.default&&window.browser_mod.setSetting(e,t,{[this.settingKey]:this.default}),window.browser_mod.setSetting(e,t,{[this.settingKey]:void 0})},left_button:"No"})}changeSetting(e,t){const s=window.browser_mod?.getSetting?.(this.settingKey),i=("global"===e?s.global:s[e][t])??this.default;window.browser_mod?.showPopup("Change value",this.settingSelector.plaintext??[{name:"value",label:this.settingSelector.label??"",default:i,selector:this.settingSelector}],{right_button:"OK",right_button_action:async s=>{if("sidebarPanelOrder"===this.settingKey){const s=await ge(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");return void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:JSON.stringify(s._hiddenPanels),sidebarPanelOrder:JSON.stringify(s._panelOrder)})}let i=s.value;window.browser_mod.setSetting(e,t,{[this.settingKey]:i})},left_button:"Cancel"})}addBrowserSetting(){const e=window.browser_mod?.getSetting?.(this.settingKey),t=window.browser_mod._data.browsers,s=[];for(const i of Object.keys(t))null==e.browser[i]&&s.push(i);0!==s.length?window.browser_mod.showPopup("Select browser to configure",[{name:"browser",label:"",selector:{select:{options:s}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("browser",e.browser),left_button:"Cancel"}):window.browser_mod.showPopup("No browsers to configure","All registered browsers have already been configured.",{right_button:"OK"})}async addUserSetting(){const e=window.browser_mod?.getSetting?.(this.settingKey),t=await this.fetchUsers(),s=[];for(const i of t)i.username&&null==e.user[i.id]&&s.push({label:i.name,value:i.id});0!==s.length?window.browser_mod.showPopup("Select user to configure",[{name:"user",label:"",selector:{select:{options:s}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("user",e.user),left_button:"Cancel"}):window.browser_mod.showPopup("No users to configure","All users have already been configured.",{right_button:"OK"})}async updateTable(){if(void 0===this.hass)return;const e=await this.fetchUsers(),t=window.browser_mod?.getSetting?.(this.settingKey),s=[];for(const[i,o]of Object.entries(t.user)){const t=e.find((e=>e.id===i));if(!t)continue;let r=String(o);r.length>=20&&(r=r.slice(0,20)+"..."),s.push({name:`User: ${t.name}`,value:r,controls:M`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("user",i)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("user",i)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}s.push({name:"",value:M`
        <mwc-button @click=${()=>this.addUserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add user setting
        </mwc-button>
      `});for(const[e,i]of Object.entries(t.browser)){let t=String(i);t.length>=20&&(t=t.slice(0,20)+"..."),s.push({name:`Browser: ${e}`,value:t,controls:M`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("browser",e)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("browser",e)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}s.push({name:"",value:M`
        <mwc-button @click=${()=>this.addBrowserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add browser setting
        </mwc-button>
      `}),s.push({name:"GLOBAL",value:null!=t.global?String(t.global):M`<span style="color: var(--warning-color);">DEFAULT</span>`,controls:M`
        <div>
          <ha-icon-button @click=${()=>this.changeSetting("global",null)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${()=>this.clearSetting("global",null)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        </div>
      `}),this.tableData=s}render(){window.browser_mod?.global_settings?.[this.settingKey];return M`
      <ha-data-table
        .hass=${this.hass}
        .columns=${{name:{title:"Name",grows:!0},value:{title:"Value",grows:!0},controls:{}}}
        .data=${this.tableData}
        auto-height
      >
      </ha-data-table>
    `}static get styles(){return n`
      :host {
        display: block;
      }
    `}}e([le()],_e.prototype,"settingKey",void 0),e([le()],_e.prototype,"settingSelector",void 0),e([le()],_e.prototype,"hass",void 0),e([le()],_e.prototype,"default",void 0),e([le()],_e.prototype,"tableData",void 0),customElements.define("browser-mod-settings-table",_e),(async()=>{await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(e?.routes?.a?.load?.());const t=document.createElement("developer-tools-router");await(t?.routerOptions?.routes?.template?.load?.()),await customElements.whenDefined("developer-tools-template")})();class fe extends oe{constructor(){super(...arguments),this._dashboards=[],this._editSidebar=!1,this._savedSidebar={panelOrder:[],hiddenPanels:[]}}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}updated(e){e.has("hass")&&void 0===e.get("hass")&&(async()=>{this._dashboards=await this.hass.callWS({type:"lovelace/dashboards/list"})})()}async toggleEditSidebar(){const e=await ge(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");e.editMode=!e.editMode,this._editSidebar=e.editMode,this._editSidebar?this._savedSidebar={panelOrder:e._panelOrder,hiddenPanels:e._hiddenPanels}:(e._panelOrder=this._savedSidebar.panelOrder??[],e._hiddenPanels=this._savedSidebar.hiddenPanels??[],this._savedSidebar={panelOrder:[],hiddenPanels:[]})}_toggle_afj(){window.setTimeout((()=>{const e=this.shadowRoot.querySelector("#afj");if(e.checked=!0,e.count=(e.count??0)+1,e.count&&e.count>5){e.disabled=!0,this.shadowRoot.querySelector("#afj_heading");this.shadowRoot.querySelector("#afj_description").innerHTML="Something went wrong. Please try again later."}}),500+2500*Math.random())}render(){const e=this._dashboards.map((e=>({value:e.url_path,label:e.title}))),t={select:{options:[{value:"lovelace",label:"lovelace (default)"},...e],custom_value:!0}};return M`
      <ha-card header="Frontend Settings" outlined>
        <div class="card-content">
          <ha-alert alert-type="warning" title="Please note:">
            The settings in this section severely change the way the Home
            Assistant frontend works and looks. It is very easy to forget that
            you made a setting here when you switch devices or user.
            <p>
              Do not report any issues to Home Assistant before clearing
              <b>EVERY</b> setting here and thouroghly clearing all your browser
              caches. Failure to do so means you risk wasting a lot of peoples
              time, and you will be severly and rightfully ridiculed.
            </p>
          </ha-alert>
          <p>
            Settings below are applied by first match. I.e. if a matching User
            setting exists, it will be applied. Otherwise any matching Browser
            setting and otherwise the GLOBAL setting if that differs from
            DEFAULT.
          </p>

          ${3==(new Date).getMonth()&&(new Date).getDate()<8?M`
                <ha-expansion-panel
                  .header=${"Extra boring settings"}
                  .secondary=${"Nothing to see here"}
                  leftChevron
                >
                  <ha-settings-row>
                    <span slot="heading" id="afj_heading"
                      >Allow April fools jokes</span
                    >
                    <span slot="description" id="afj_description">
                      By enabling this, I consent to any April Fools Jokes
                      messing with my frontend.
                    </span>
                    <span
                      explanation="Oh hi!
                      You found my April fools joke! Well done!
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
            .secondary=${`The dashboard that is showed when navigating to ${location.origin}`}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultPanel"}
              .settingSelector=${t}
              .default=${"lovelace"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

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
        </div>
      </ha-card>
    `}static get styles(){return n`
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
    `}}e([le()],fe.prototype,"hass",void 0),e([de()],fe.prototype,"_dashboards",void 0),e([de()],fe.prototype,"_editSidebar",void 0),customElements.define("browser-mod-frontend-settings-card",fe);var ve="2.3.3";(async()=>{await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}]);await(e?.routes?.a?.load?.()),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await(t?.routerOptions?.routes?.dashboard?.load?.()),await(t?.routerOptions?.routes?.general?.load?.()),await(t?.routerOptions?.routes?.entities?.load?.()),await customElements.whenDefined("ha-config-dashboard")})().then((()=>{class t extends oe{firstUpdated(){window.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){return window.browser_mod?M`
        <ha-top-app-bar-fixed>
          <ha-menu-button
            slot="navigationIcon"
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${ve})
            <a
              href="https://github.com/dcapslock/hass-browser_mod/blob/2.3.4/README.md"
              target="_blank"
            >
              <ha-icon class="icon" .icon=${"mdi:help-circle"}></ha-icon>
            </a>
          </div>

          <ha-config-section .narrow=${this.narrow} full-width>
            <browser-mod-browser-settings-card
              .hass=${this.hass}
            ></browser-mod-browser-settings-card>

            ${this.hass.user?.is_admin?M`
                  <browser-mod-registered-browsers-card
                    .hass=${this.hass}
                  ></browser-mod-registered-browsers-card>

                  <browser-mod-frontend-settings-card
                    .hass=${this.hass}
                  ></browser-mod-frontend-settings-card>
                `:""}
          </ha-config-section>
        </ha-top-app-bar-fixed>
      `:M``}static get styles(){return[...customElements.get("ha-config-dashboard")?.styles??[],n`
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
        `]}}e([ae()],t.prototype,"hass",void 0),e([ae()],t.prototype,"narrow",void 0),e([ae()],t.prototype,"connection",void 0),customElements.define("browser-mod-panel",t)}));
