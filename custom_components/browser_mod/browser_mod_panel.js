function e(e,t,s,i){var o,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,s,r):o(t,s))||r);return n>3&&r&&Object.defineProperty(t,s,r),r}const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;class o{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const s=this.t;if(t&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=i.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(s,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1]),e[0]);return new o(i,e,s)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e;var a;const l=window.trustedTypes,d=l?l.emptyScript:"",h=window.reactiveElementPolyfillSupport,c={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},u=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:u};class w extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;null!==(t=this.h)&&void 0!==t||(this.h=[]),this.h.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,s)=>{const i=this._$Ep(s,t);void 0!==i&&(this._$Ev.set(i,s),e.push(i))})),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const o=this[e];this[t]=i,this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of t)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Ep(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,s;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(s=e.hostConnected)||void 0===s||s.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{t?e.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):s.forEach((t=>{const s=document.createElement("style"),i=window.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=t.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=p){var i,o;const n=this.constructor._$Ep(e,s);if(void 0!==n&&!0===s.reflect){const r=(null!==(o=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==o?o:c.toAttribute)(t,s.type);this._$El=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(e,t){var s,i;const o=this.constructor,n=o._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=o.getPropertyOptions(n),r=e.converter,a=null!==(i=null!==(s=null==r?void 0:r.fromAttribute)&&void 0!==s?s:"function"==typeof r?r:null)&&void 0!==i?i:c.fromAttribute;this._$El=n,this[n]=a(t,e.type),this._$El=null}}requestUpdate(e,t,s){let i=!0;void 0!==e&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===s.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(s)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var g;w.finalized=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:w}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.3.4");const v=globalThis.trustedTypes,b=v?v.createPolicy("lit-html",{createHTML:e=>e}):void 0,m=`lit$${(Math.random()+"").slice(9)}$`,f="?"+m,y=`<${f}>`,_=document,$=(e="")=>_.createComment(e),S=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,x=/-->/g,P=/>/g,C=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),O=/'/g,T=/"/g,U=/^(?:script|style|textarea|title)$/i,k=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),H=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),D=new WeakMap,B=_.createTreeWalker(_,129,null,!1),M=(e,t)=>{const s=e.length-1,i=[];let o,n=2===t?"<svg>":"",r=E;for(let t=0;t<s;t++){const s=e[t];let a,l,d=-1,h=0;for(;h<s.length&&(r.lastIndex=h,l=r.exec(s),null!==l);)h=r.lastIndex,r===E?"!--"===l[1]?r=x:void 0!==l[1]?r=P:void 0!==l[2]?(U.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=C):void 0!==l[3]&&(r=C):r===C?">"===l[0]?(r=null!=o?o:E,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?C:'"'===l[3]?T:O):r===T||r===O?r=C:r===x||r===P?r=E:(r=C,o=void 0);const c=r===C&&e[t+1].startsWith("/>")?" ":"";n+=r===E?s+y:d>=0?(i.push(a),s.slice(0,d)+"$lit$"+s.slice(d)+m+c):s+m+(-2===d?(i.push(void 0),t):c)}const a=n+(e[s]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(a):a,i]};class N{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,d]=M(e,t);if(this.el=N.createElement(l,s),B.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=B.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(m)){const s=d[n++];if(e.push(t),void 0!==s){const e=i.getAttribute(s.toLowerCase()+"$lit$").split(m),t=/([.?@])?(.*)/.exec(s);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?z:"?"===t[1]?W:"@"===t[1]?V:j})}else a.push({type:6,index:o})}for(const t of e)i.removeAttribute(t)}if(U.test(i.tagName)){const e=i.textContent.split(m),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],$()),B.nextNode(),a.push({type:2,index:++o});i.append(e[t],$())}}}else if(8===i.nodeType)if(i.data===f)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(m,e+1));)a.push({type:7,index:o}),e+=m.length-1}o++}}static createElement(e,t){const s=_.createElement("template");return s.innerHTML=e,s}}function I(e,t,s=e,i){var o,n,r,a;if(t===H)return t;let l=void 0!==i?null===(o=s._$Cl)||void 0===o?void 0:o[i]:s._$Cu;const d=S(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,s,i)),void 0!==i?(null!==(r=(a=s)._$Cl)&&void 0!==r?r:a._$Cl=[])[i]=l:s._$Cu=l),void 0!==l&&(t=I(e,l._$AS(e,t.values),l,i)),t}class L{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:s},parts:i}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:_).importNode(s,!0);B.currentNode=o;let n=B.nextNode(),r=0,a=0,l=i[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new K(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new q(n,this,e)),this.v.push(t),l=i[++a]}r!==(null==l?void 0:l.index)&&(n=B.nextNode(),r++)}return o}m(e){let t=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class K{constructor(e,t,s,i){var o;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$C_=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$C_}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),S(e)?e===R||null==e||""===e?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==H&&this.T(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.k(e):(e=>A(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.S(e):this.T(e)}j(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.j(e))}T(e){this._$AH!==R&&S(this._$AH)?this._$AA.nextSibling.data=e:this.k(_.createTextNode(e)),this._$AH=e}$(e){var t;const{values:s,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=N.createElement(i.h,this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.m(s);else{const e=new L(o,this),t=e.p(this.options);e.m(s),this.k(t),this._$AH=e}}_$AC(e){let t=D.get(e.strings);return void 0===t&&D.set(e.strings,t=new N(e)),t}S(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new K(this.j($()),this.j($()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$C_=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class j{constructor(e,t,s,i,o){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(void 0===o)e=I(this,e,t,0),n=!S(e)||e!==this._$AH&&e!==H,n&&(this._$AH=e);else{const i=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=I(this,i[s+r],t,r),a===H&&(a=this._$AH[r]),n||(n=!S(a)||a!==this._$AH[r]),a===R?e=R:e!==R&&(e+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.P(e)}P(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class z extends j{constructor(){super(...arguments),this.type=3}P(e){this.element[this.name]=e===R?void 0:e}}const F=v?v.emptyScript:"";class W extends j{constructor(){super(...arguments),this.type=4}P(e){e&&e!==R?this.element.setAttribute(this.name,F):this.element.removeAttribute(this.name)}}class V extends j{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){var s;if((e=null!==(s=I(this,e,t,0))&&void 0!==s?s:R)===H)return;const i=this._$AH,o=e===R&&i!==R||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==R&&(i===R||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==s?s:this.element,e):this._$AH.handleEvent(e)}}class q{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}}const J=window.litHtmlPolyfillSupport;var Y,G;null==J||J(N,K),(null!==(g=globalThis.litHtmlVersions)&&void 0!==g?g:globalThis.litHtmlVersions=[]).push("2.2.7");class Z extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:t;let r=n._$litPart$;if(void 0===r){const e=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new K(t.insertBefore($(),e),e,void 0,null!=s?s:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return H}}Z.finalized=!0,Z._$litElement$=!0,null===(Y=globalThis.litElementHydrateSupport)||void 0===Y||Y.call(globalThis,{LitElement:Z});const Q=globalThis.litElementPolyfillSupport;null==Q||Q({LitElement:Z}),(null!==(G=globalThis.litElementVersions)&&void 0!==G?G:globalThis.litElementVersions=[]).push("3.2.2");const X=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(s){s.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(s){s.createProperty(t.key,e)}};function ee(e){return(t,s)=>void 0!==s?((e,t,s)=>{t.constructor.createProperty(s,e)})(e,t,s):X(e,t)}function te(e){return ee({...e,state:!0})}var se;null===(se=window.HTMLSlotElement)||void 0===se||se.prototype.assignedElements;async function ie(e,t=!1){var s;if((null===(s=e.localName)||void 0===s?void 0:s.includes("-"))&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise((e=>setTimeout(e,100)))}}async function oe(e,t,s=!1){let i=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,s]of t.entries()){const e=i[0];if(!e)return null;s.trim().length&&(ie(e),i="$"===s?[e.shadowRoot]:e.querySelectorAll(s))}return s?i:i[0]}async function ne(e,t,s=!1,i=1e4){return Promise.race([oe(e,t,s),new Promise(((e,t)=>setTimeout((()=>t(new Error("SELECTTREE-TIMEOUT"))),i)))]).catch((e=>{if(!e.message||"SELECTTREE-TIMEOUT"!==e.message)throw e;return null}))}class re extends Z{constructor(){super(...arguments),this.dirty=!1}toggleRegister(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.connected)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}changeBrowserID(e){window.browser_mod.browserID=e.target.value,this.dirty=!0}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){var e,t,s,i,o,n;return k`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${(null===(e=window.browser_mod)||void 0===e?void 0:e.connected)?k`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:check-circle-outline"}
                  style="color: var(--success-color, green);"
                ></ha-icon>
              `:k`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:circle-outline"}
                  style="color: var(--error-color, red);"
                ></ha-icon>
              `}
        </h1>
        <div class="card-content">
          ${this.dirty?k`
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
            ></ha-switch>
          </ha-settings-row>

          <ha-settings-row>
            <span slot="heading">Browser ID</span>
            <span slot="description"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-textfield
              .value=${null===(s=window.browser_mod)||void 0===s?void 0:s.browserID}
              @change=${this.changeBrowserID}
            ></ha-textfield>
          </ha-settings-row>

          ${(null===(i=window.browser_mod)||void 0===i?void 0:i.registered)?k`
                ${this._renderSuspensionAlert()}
                <ha-settings-row>
                  <span slot="heading">Enable camera</span>
                  <span slot="description"
                    >Get camera input from this browser (hardware
                    dependent)</span
                  >
                  <ha-switch
                    .checked=${null===(o=window.browser_mod)||void 0===o?void 0:o.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                  ></ha-switch>
                </ha-settings-row>
                ${(null===(n=window.browser_mod)||void 0===n?void 0:n.cameraError)?k`
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
    `}_renderSuspensionAlert(){return this.hass.suspendWhenHidden?k`
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
    `:k``}_renderInteractionAlert(){return k`
      <ha-alert title="Interaction requirement">
        For privacy reasons many browsers require the user to interact with a
        webpage before allowing audio playback or video capture. This may affect
        the
        <code>media_player</code> and <code>camera</code> components of Browser
        Mod. <br /><br />

        If you ever see a
        <ha-icon icon="mdi:gesture-tap"></ha-icon> symbol at the bottom right
        corner of the screen, please tap or click anywhere on the page. This
        should allow Browser Mod to work again.
      </ha-alert>
    `}_renderFKBSettingsInfo(){var e,t;return(null===(e=window.browser_mod)||void 0===e?void 0:e.fully)&&this.getFullySettings()?k`
      ${(null===(t=window.browser_mod)||void 0===t?void 0:t.fully)&&this.getFullySettings()?k` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`:""}
    `:k``}getFullySettings(){if(!window.browser_mod.fully)return null;const e=[],t=[];"true"!==window.fully.getBooleanSetting("autoplayVideos")&&t.push(k`<li>Autoplay Videos</li>`),"true"!==window.fully.getBooleanSetting("autoplayAudio")&&t.push(k`<li>Autoplay Audio</li>`),"true"!==window.fully.getBooleanSetting("webcamAccess")&&t.push(k`<li>Enable Webcam Access (PLUS)</li>`),0!==t.length&&e.push(k`<li>Web Content Settings</li>
        <ul>
          ${t}
        </ul>`),"true"!==window.fully.getBooleanSetting("websiteIntegration")&&e.push(k`<li>Advanced Web Settings</li>
        <ul>
          <li>Enable JavaScript Interface (PLUS)</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("keepScreenOn")&&e.push(k`<li>Device Management</li>
        <ul>
          <li>Keep Screen On</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("preventSleepWhileScreenOff")&&e.push(k`<li>Power Settings</li>
        <ul>
          <li>Prevent from Sleep while Screen Off</li>
        </ul>`);const s=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&s.push(k`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&s.push(k`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&s.push(k`<li>Exit Screensaver on Motion</li>`),0!==s.length&&e.push(k`<li>Motion Detection (PLUS)</li>
        <ul>
          ${s}
        </ul>`),"true"!==window.fully.getBooleanSetting("remoteAdmin")&&e.push(k`<li>Remote Administration (PLUS)</li>
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
    `}}e([ee()],re.prototype,"hass",void 0),e([ee()],re.prototype,"dirty",void 0),customElements.define("browser-mod-browser-settings-card",re);class ae extends Z{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup("Unregister browser",`Are you sure you want to unregister Browser ${t}?`,{right_button:"Yes",right_button_action:()=>{t===window.browser_mod.browserID?window.browser_mod.registered=!1:window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"No"})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){return k`
      <ha-card header="Registered Browsers" outlined>
        <div class="card-content">
          ${Object.keys(window.browser_mod.browsers).map((e=>k` <ha-settings-row>
              <span slot="heading"> ${e} </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${window.browser_mod.browsers[e].last_seen}
                ></ha-relative-time>
              </span>
              <ha-icon-button .browserID=${e} @click=${this.unregister_browser}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </ha-icon-button>
            </ha-settings-row>`))}
        </div>
        ${void 0===window.browser_mod.browsers.CAST?k`
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
      }
    `}}e([ee()],ae.prototype,"hass",void 0),customElements.define("browser-mod-registered-browsers-card",ae);class le extends Z{constructor(){super(...arguments),this.settingSelector={template:{}},this.tableData=[],this._users=void 0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.updateTable()))}updated(e){e.has("settingKey")&&this.updateTable(),e.has("hass")&&void 0===e.get("hass")&&this.updateTable()}async fetchUsers(){return void 0===this._users&&(this._users=await this.hass.callWS({type:"config/auth/list"})),this._users}clearSetting(e,t){var s;null===(s=window.browser_mod)||void 0===s||s.showPopup("Are you sure","Do you wish to clear this setting?",{right_button:"Yes",right_button_action:async()=>{if("sidebarPanelOrder"===this.settingKey)return await ne(document,"home-assistant $ home-assistant-main $ app-drawer-layout app-drawer ha-sidebar"),window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:"[]",sidebarPanelOrder:"[]"}),void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:void 0,sidebarPanelOrder:void 0});this.default&&window.browser_mod.setSetting(e,t,{[this.settingKey]:this.default}),window.browser_mod.setSetting(e,t,{[this.settingKey]:void 0})},left_button:"No"})}changeSetting(e,t){var s,i,o,n,r,a;const l=null===(i=null===(s=window.browser_mod)||void 0===s?void 0:s.getSetting)||void 0===i?void 0:i.call(s,this.settingKey),d=null!==(o="global"===e?l.global:l[e][t])&&void 0!==o?o:this.default;null===(n=window.browser_mod)||void 0===n||n.showPopup("Change value",null!==(r=this.settingSelector.plaintext)&&void 0!==r?r:[{name:"value",label:null!==(a=this.settingSelector.label)&&void 0!==a?a:"",default:d,selector:this.settingSelector}],{right_button:"OK",right_button_action:async s=>{if("sidebarPanelOrder"===this.settingKey){const s=await ne(document,"home-assistant $ home-assistant-main $ app-drawer-layout app-drawer ha-sidebar");return window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:JSON.stringify(s._hiddenPanels),sidebarPanelOrder:JSON.stringify(s._panelOrder)}),void console.log(s._hiddenPanels,s._panelOrder)}let i=s.value;window.browser_mod.setSetting(e,t,{[this.settingKey]:i})},left_button:"Cancel"})}addBrowserSetting(){var e,t;const s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),i=window.browser_mod._data.browsers,o=[];for(const e of Object.keys(i))null==s.browser[e]&&o.push(e);0!==o.length?window.browser_mod.showPopup("Select browser to configure",[{name:"browser",label:"",selector:{select:{options:o}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("browser",e.browser),left_button:"Cancel"}):window.browser_mod.showPopup("No browsers to configure","All registered browsers have already been configured.",{right_button:"OK"})}async addUserSetting(){var e,t;const s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),i=await this.fetchUsers(),o=[];for(const e of i)e.username&&null==s.user[e.id]&&o.push({label:e.name,value:e.id});0!==o.length?window.browser_mod.showPopup("Select user to configure",[{name:"user",label:"",selector:{select:{options:o}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("user",e.user),left_button:"Cancel"}):window.browser_mod.showPopup("No users to configure","All users have already been configured.",{right_button:"OK"})}async updateTable(){var e,t;if(void 0===this.hass)return;const s=await this.fetchUsers(),i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),o=[];for(const[e,t]of Object.entries(i.user)){const i=s.find((t=>t.id===e));o.push({name:`User: ${i.name}`,value:String(t),controls:k`
          <ha-icon-button @click=${()=>this.changeSetting("user",e)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${()=>this.clearSetting("user",e)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        `})}o.push({name:"",value:k`
        <mwc-button @click=${()=>this.addUserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add user setting
        </mwc-button>
      `});for(const[e,t]of Object.entries(i.browser))o.push({name:`Browser: ${e}`,value:String(t),controls:k`
          <ha-icon-button @click=${()=>this.changeSetting("browser",e)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${()=>this.clearSetting("browser",e)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        `});o.push({name:"",value:k`
        <mwc-button @click=${()=>this.addBrowserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add browser setting
        </mwc-button>
      `}),o.push({name:"GLOBAL",value:null!=i.global?String(i.global):k`<span style="color: var(--warning-color);">DEFAULT</span>`,controls:k`
        <ha-icon-button @click=${()=>this.changeSetting("global",null)}>
          <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
        </ha-icon-button>
        <ha-icon-button @click=${()=>this.clearSetting("global",null)}>
          <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
        </ha-icon-button>
      `}),this.tableData=o}render(){var e,t;null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.global_settings)||void 0===t||t[this.settingKey];return k`
      <ha-data-table .columns=${{name:{title:"Name",grows:!0},value:{title:"Value",grows:!0},controls:{}}} .data=${this.tableData} auto-height>
      </ha-data-table>
    `}static get styles(){return n`
      :host {
        display: block;
      }
    `}}e([ee()],le.prototype,"settingKey",void 0),e([ee()],le.prototype,"settingSelector",void 0),e([ee()],le.prototype,"hass",void 0),e([ee()],le.prototype,"default",void 0),e([ee()],le.prototype,"tableData",void 0),customElements.define("browser-mod-settings-table",le),(async()=>{var e,t,s,i,o,n,r;await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver").getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(s=null===(t=null===(e=null==a?void 0:a.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===s?void 0:s.call(t));const l=document.createElement("developer-tools-router");await(null===(r=null===(n=null===(o=null===(i=null==l?void 0:l.routerOptions)||void 0===i?void 0:i.routes)||void 0===o?void 0:o.template)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await customElements.whenDefined("developer-tools-template")})();class de extends Z{constructor(){super(...arguments),this._dashboards=[],this._editSidebar=!1,this._savedSidebar={panelOrder:[],hiddenPanels:[]}}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}updated(e){e.has("hass")&&void 0===e.get("hass")&&(async()=>{this._dashboards=await this.hass.callWS({type:"lovelace/dashboards/list"})})()}async toggleEditSidebar(){var e,t;const s=await ne(document,"home-assistant $ home-assistant-main $ app-drawer-layout app-drawer ha-sidebar");s.editMode=!s.editMode,this._editSidebar=s.editMode,this._editSidebar?this._savedSidebar={panelOrder:s._panelOrder,hiddenPanels:s._hiddenPanels}:(s._panelOrder=null!==(e=this._savedSidebar.panelOrder)&&void 0!==e?e:[],s._hiddenPanels=null!==(t=this._savedSidebar.hiddenPanels)&&void 0!==t?t:[],this._savedSidebar={panelOrder:[],hiddenPanels:[]})}render(){const e=this._dashboards.map((e=>({value:e.url_path,label:e.title}))),t={select:{options:[{value:"lovelace",label:"lovelace (default)"},...e],custom_value:!0}};return k`
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

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Title template</span>
            <span slot="description">
              Jinja template for the browser window/tab title
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"titleTemplate"}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Favicon template</span>
            <span slot="description">
              Jinja template for the browser favicon
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"faviconTemplate"}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Hide sidebar</span>
            <span slot="description">
              Completely remove the sidebar from all panels
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"hideSidebar"}
            .settingSelector=${{boolean:{},label:"Hide sidebar"}}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Hide header</span>
            <span slot="description">
              Completely remove the header from all panels
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"hideHeader"}
            .settingSelector=${{boolean:{},label:"Hide header"}}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Default dashboard</span>
            <span slot="description">
              The dashboard that is showed when navigating to
              ${location.origin}/
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"defaultPanel"}
            .settingSelector=${t}
            .default=${"lovelace"}
          ></browser-mod-settings-table>

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Sidebar order</span>
            <span slot="description">
              Order and visibility of sidebar items. <br />Click EDIT and set
              the sidebar up as you want. Then save the settings and finally
              click RESTORE.
            </span>
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

          <div class="separator"></div>

          <ha-settings-row>
            <span slot="heading">Sidebar title</span>
            <span slot="description">
              The title at the top of the sidebar
            </span>
          </ha-settings-row>
          <browser-mod-settings-table
            .hass=${this.hass}
            .settingKey=${"sidebarTitle"}
            .settingSelector=${{text:{}}}
          ></browser-mod-settings-table>
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
    `}}e([ee()],de.prototype,"hass",void 0),e([te()],de.prototype,"_dashboards",void 0),e([te()],de.prototype,"_editSidebar",void 0),customElements.define("browser-mod-frontend-settings-card",de),(async()=>{var e,t,s,i,o,n,r,a,l,d,h,c,u,p,w;await customElements.whenDefined("partial-panel-resolver");const g=document.createElement("partial-panel-resolver").getRoutes([{component_name:"config",url_path:"a"}]);await(null===(s=null===(t=null===(e=null==g?void 0:g.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===s?void 0:s.call(t)),await customElements.whenDefined("ha-panel-config");const v=document.createElement("ha-panel-config");await(null===(r=null===(n=null===(o=null===(i=null==v?void 0:v.routerOptions)||void 0===i?void 0:i.routes)||void 0===o?void 0:o.dashboard)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await(null===(h=null===(d=null===(l=null===(a=null==v?void 0:v.routerOptions)||void 0===a?void 0:a.routes)||void 0===l?void 0:l.cloud)||void 0===d?void 0:d.load)||void 0===h?void 0:h.call(d)),await(null===(w=null===(p=null===(u=null===(c=null==v?void 0:v.routerOptions)||void 0===c?void 0:c.routes)||void 0===u?void 0:u.entities)||void 0===p?void 0:p.load)||void 0===w?void 0:w.call(p)),await customElements.whenDefined("ha-config-dashboard")})().then((()=>{class t extends Z{firstUpdated(){window.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){return window.browser_mod?k`
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
            <browser-mod-browser-settings-card
              .hass=${this.hass}
            ></browser-mod-browser-settings-card>

            <browser-mod-registered-browsers-card
              .hass=${this.hass}
            ></browser-mod-registered-browsers-card>

            <browser-mod-frontend-settings-card
              .hass=${this.hass}
            ></browser-mod-frontend-settings-card>
          </ha-config-section>
        </ha-app-layout>
      `:k``}static get styles(){var e,t;return[...null!==(t=null===(e=customElements.get("ha-config-dashboard"))||void 0===e?void 0:e.styles)&&void 0!==t?t:[],n`
          :host {
            --app-header-background-color: var(--sidebar-background-color);
            --app-header-text-color: var(--sidebar-text-color);
            --app-header-border-bottom: 1px solid var(--divider-color);
            --ha-card-border-radius: var(--ha-config-card-border-radius, 8px);
          }
          ha-config-section {
            padding: 16px 0;
          }
        `]}}e([ee()],t.prototype,"hass",void 0),e([ee()],t.prototype,"narrow",void 0),e([ee()],t.prototype,"connection",void 0),customElements.define("browser-mod-panel",t)}));
