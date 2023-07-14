function e(e,t,i,o){var s,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(n<3?s(r):n>3?s(t,i,r):s(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1]),e[0]);return new n(i,e,o)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,o))(t)})(e):e;var l;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>t!==e&&(t==t||e==e),w={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:g};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const o=this._$Ep(i,t);void 0!==o&&(this._$Ev.set(o,i),e.push(o))})),e}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||w}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const o=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{i?e.adoptedStyleSheets=o.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):o.forEach((i=>{const o=document.createElement("style"),s=t.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,e.appendChild(o)}))})(o,this.constructor.elementStyles),o}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=w){var o;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,s=o._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=o.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=s,this[s]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var b;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.1");const m=window,_=m.trustedTypes,f=_?_.createPolicy("lit-html",{createHTML:e=>e}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,$="?"+y,S=`<${$}>`,A=document,E=()=>A.createComment(""),x=e=>null===e||"object"!=typeof e&&"function"!=typeof e,k=Array.isArray,C="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,T=/>/g,U=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,D=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),M=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),I=new WeakMap,L=A.createTreeWalker(A,129,null,!1),K=(e,t)=>{const i=e.length-1,o=[];let s,n=2===t?"<svg>":"",r=O;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===O?"!--"===l[1]?r=P:void 0!==l[1]?r=T:void 0!==l[2]?(D.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=null!=s?s:O,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?U:'"'===l[3]?H:R):r===H||r===R?r=U:r===P||r===T?r=O:(r=U,s=void 0);const c=r===U&&e[t+1].startsWith("/>")?" ":"";n+=r===O?i+S:d>=0?(o.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+y+c):i+y+(-2===d?(o.push(void 0),t):c)}const a=n+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==f?f.createHTML(a):a,o]};class j{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,n=0;const r=e.length-1,a=this.parts,[l,d]=K(e,t);if(this.el=j.createElement(l,i),L.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=L.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(y)){const i=d[n++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+"$lit$").split(y),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?q:"?"===t[1]?Y:"@"===t[1]?G:F})}else a.push({type:6,index:s})}for(const t of e)o.removeAttribute(t)}if(D.test(o.tagName)){const e=o.textContent.split(y),t=e.length-1;if(t>0){o.textContent=_?_.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],E()),L.nextNode(),a.push({type:2,index:++s});o.append(e[t],E())}}}else if(8===o.nodeType)if(o.data===$)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(y,e+1));)a.push({type:7,index:s}),e+=y.length-1}s++}}static createElement(e,t){const i=A.createElement("template");return i.innerHTML=e,i}}function z(e,t,i=e,o){var s,n,r,a;if(t===M)return t;let l=void 0!==o?null===(s=i._$Co)||void 0===s?void 0:s[o]:i._$Cl;const d=x(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,o)),void 0!==o?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=z(e,l._$AS(e,t.values),l,o)),t}class V{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:A).importNode(i,!0);L.currentNode=s;let n=L.nextNode(),r=0,a=0,l=o[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new W(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new Z(n,this,e)),this._$AV.push(t),l=o[++a]}r!==(null==l?void 0:l.index)&&(n=L.nextNode(),r++)}return s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class W{constructor(e,t,i,o){var s;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(s=null==o?void 0:o.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),x(e)?e===N||null==e||""===e?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==M&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>k(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==N&&x(this._$AH)?this._$AA.nextSibling.data=e:this.$(A.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,s="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=j.createElement(o.h,this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new V(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=I.get(e.strings);return void 0===t&&I.set(e.strings,t=new j(e)),t}T(e){k(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new W(this.k(E()),this.k(E()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class F{constructor(e,t,i,o,s){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const s=this.strings;let n=!1;if(void 0===s)e=z(this,e,t,0),n=!x(e)||e!==this._$AH&&e!==M,n&&(this._$AH=e);else{const o=e;let r,a;for(e=s[0],r=0;r<s.length-1;r++)a=z(this,o[i+r],t,r),a===M&&(a=this._$AH[r]),n||(n=!x(a)||a!==this._$AH[r]),a===N?e=N:e!==N&&(e+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class q extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}}const J=_?_.emptyScript:"";class Y extends F{constructor(){super(...arguments),this.type=4}j(e){e&&e!==N?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class G extends F{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=z(this,e,t,0))&&void 0!==i?i:N)===M)return;const o=this._$AH,s=e===N&&o!==N||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==N&&(o===N||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}}const Q=m.litHtmlPolyfillSupport;null==Q||Q(j,W),(null!==(b=m.litHtmlVersions)&&void 0!==b?b:m.litHtmlVersions=[]).push("2.7.2");var X,ee;class te extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,s;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let r=n._$litPart$;if(void 0===r){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;n._$litPart$=r=new W(t.insertBefore(E(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return M}}te.finalized=!0,te._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:te});const ie=globalThis.litElementPolyfillSupport;null==ie||ie({LitElement:te}),(null!==(ee=globalThis.litElementVersions)&&void 0!==ee?ee:globalThis.litElementVersions=[]).push("3.3.1");const oe=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function se(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):oe(e,t)}function ne(e){return se({...e,state:!0})}var re;null===(re=window.HTMLSlotElement)||void 0===re||re.prototype.assignedElements;async function ae(e,t=!1){var i;if((null===(i=e.localName)||void 0===i?void 0:i.includes("-"))&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise((e=>setTimeout(e,100)))}}async function le(e,t,i=!1){let o=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,i]of t.entries()){const e=o[0];if(!e)return null;i.trim().length&&(ae(e),o="$"===i?[e.shadowRoot]:e.querySelectorAll(i))}return i?o:o[0]}async function de(e,t,i=!1,o=1e4){return Promise.race([le(e,t,i),new Promise(((e,t)=>setTimeout((()=>t(new Error("SELECTTREE-TIMEOUT"))),o)))]).catch((e=>{if(!e.message||"SELECTTREE-TIMEOUT"!==e.message)throw e;return null}))}class he extends te{constructor(){super(...arguments),this.dirty=!1}toggleRegister(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.connected)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}changeBrowserID(e){window.browser_mod.browserID=e.target.value,this.dirty=!0}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){var e,t,i,o,s,n,r,a,l,d,h;return B`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${(null===(e=window.browser_mod)||void 0===e?void 0:e.connected)?B`
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
              .disabled=${(null===(i=window.browser_mod)||void 0===i?void 0:i.browser_locked)||(null===(o=window.browser_mod)||void 0===o?void 0:o.global_settings.autoRegister)||(null===(s=window.browser_mod)||void 0===s?void 0:s.global_settings.lockRegister)}
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
    `}}e([se()],he.prototype,"hass",void 0),e([se()],he.prototype,"dirty",void 0),customElements.define("browser-mod-browser-settings-card",he);class ce extends te{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate())),this._fetch_entity_registry()}async _fetch_entity_registry(){this._entity_registry||(this._entity_registry=await this.hass.callWS({type:"config/device_registry/list"}))}_find_entity(e){if(this._entity_registry)return this._entity_registry.find((t=>{var i;return JSON.stringify(null===(i=null==t?void 0:t.identifiers)||void 0===i?void 0:i[0])===JSON.stringify(["browser_mod",e])}))}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup("Unregister browser",`Are you sure you want to unregister Browser ${t}?`,{right_button:"Yes",right_button_action:()=>{t===window.browser_mod.browserID?window.browser_mod.registered=!1:window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"No"})}toggle_lock_browser(e){const t=e.currentTarget.browserID,i=window.browser_mod.browsers[t];window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:t,data:Object.assign(Object.assign({},i),{locked:!i.locked})})}toggle_auto_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.autoRegister)?window.browser_mod.setSetting("global",null,{autoRegister:void 0}):window.browser_mod.setSetting("global",null,{autoRegister:!0})}toggle_lock_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.lockRegister)?window.browser_mod.setSetting("global",null,{lockRegister:void 0}):window.browser_mod.setSetting("global",null,{lockRegister:!0,autoRegister:void 0})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){var e,t;return B`
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
    `}}let ue;e([se()],ce.prototype,"hass",void 0),e([se()],ce.prototype,"_entity_registry",void 0),customElements.define("browser-mod-registered-browsers-card",ce);class pe extends te{constructor(){super(...arguments),this.settingSelector={template:{}},this.tableData=[]}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.updateTable()))}updated(e){e.has("settingKey")&&this.updateTable(),e.has("hass")&&void 0===e.get("hass")&&this.updateTable()}async fetchUsers(){return void 0===ue&&(ue=await this.hass.callWS({type:"config/auth/list"})),ue}clearSetting(e,t){var i;null===(i=window.browser_mod)||void 0===i||i.showPopup("Are you sure","Do you wish to clear this setting?",{right_button:"Yes",right_button_action:async()=>{if("sidebarPanelOrder"===this.settingKey)return await de(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"),window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:"[]",sidebarPanelOrder:"[]"}),void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:void 0,sidebarPanelOrder:void 0});this.default&&window.browser_mod.setSetting(e,t,{[this.settingKey]:this.default}),window.browser_mod.setSetting(e,t,{[this.settingKey]:void 0})},left_button:"No"})}changeSetting(e,t){var i,o,s,n,r,a;const l=null===(o=null===(i=window.browser_mod)||void 0===i?void 0:i.getSetting)||void 0===o?void 0:o.call(i,this.settingKey),d=null!==(s="global"===e?l.global:l[e][t])&&void 0!==s?s:this.default;null===(n=window.browser_mod)||void 0===n||n.showPopup("Change value",null!==(r=this.settingSelector.plaintext)&&void 0!==r?r:[{name:"value",label:null!==(a=this.settingSelector.label)&&void 0!==a?a:"",default:d,selector:this.settingSelector}],{right_button:"OK",right_button_action:async i=>{if("sidebarPanelOrder"===this.settingKey){const i=await de(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");return void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:JSON.stringify(i._hiddenPanels),sidebarPanelOrder:JSON.stringify(i._panelOrder)})}let o=i.value;window.browser_mod.setSetting(e,t,{[this.settingKey]:o})},left_button:"Cancel"})}addBrowserSetting(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),o=window.browser_mod._data.browsers,s=[];for(const e of Object.keys(o))null==i.browser[e]&&s.push(e);0!==s.length?window.browser_mod.showPopup("Select browser to configure",[{name:"browser",label:"",selector:{select:{options:s}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("browser",e.browser),left_button:"Cancel"}):window.browser_mod.showPopup("No browsers to configure","All registered browsers have already been configured.",{right_button:"OK"})}async addUserSetting(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),o=await this.fetchUsers(),s=[];for(const e of o)e.username&&null==i.user[e.id]&&s.push({label:e.name,value:e.id});0!==s.length?window.browser_mod.showPopup("Select user to configure",[{name:"user",label:"",selector:{select:{options:s}}}],{right_button:"Next",right_button_action:e=>this.changeSetting("user",e.user),left_button:"Cancel"}):window.browser_mod.showPopup("No users to configure","All users have already been configured.",{right_button:"OK"})}async updateTable(){var e,t;if(void 0===this.hass)return;const i=await this.fetchUsers(),o=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),s=[];for(const[e,t]of Object.entries(o.user)){const o=i.find((t=>t.id===e));if(!o)continue;let n=String(t);n.length>=20&&(n=n.slice(0,20)+"..."),s.push({name:`User: ${o.name}`,value:n,controls:B`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("user",e)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("user",e)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}s.push({name:"",value:B`
        <mwc-button @click=${()=>this.addUserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add user setting
        </mwc-button>
      `});for(const[e,t]of Object.entries(o.browser)){let i=String(t);i.length>=20&&(i=i.slice(0,20)+"..."),s.push({name:`Browser: ${e}`,value:i,controls:B`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("browser",e)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("browser",e)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}s.push({name:"",value:B`
        <mwc-button @click=${()=>this.addBrowserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add browser setting
        </mwc-button>
      `}),s.push({name:"GLOBAL",value:null!=o.global?String(o.global):B`<span style="color: var(--warning-color);">DEFAULT</span>`,controls:B`
        <div>
          <ha-icon-button @click=${()=>this.changeSetting("global",null)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${()=>this.clearSetting("global",null)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        </div>
      `}),this.tableData=s}render(){var e,t;null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.global_settings)||void 0===t||t[this.settingKey];return B`
      <ha-data-table .columns=${{name:{title:"Name",grows:!0},value:{title:"Value",grows:!0},controls:{}}} .data=${this.tableData} auto-height>
      </ha-data-table>
    `}static get styles(){return r`
      :host {
        display: block;
      }
    `}}e([se()],pe.prototype,"settingKey",void 0),e([se()],pe.prototype,"settingSelector",void 0),e([se()],pe.prototype,"hass",void 0),e([se()],pe.prototype,"default",void 0),e([se()],pe.prototype,"tableData",void 0),customElements.define("browser-mod-settings-table",pe),(async()=>{var e,t,i,o,s,n,r;await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver").getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==a?void 0:a.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t));const l=document.createElement("developer-tools-router");await(null===(r=null===(n=null===(s=null===(o=null==l?void 0:l.routerOptions)||void 0===o?void 0:o.routes)||void 0===s?void 0:s.template)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await customElements.whenDefined("developer-tools-template")})();class ge extends te{constructor(){super(...arguments),this._dashboards=[],this._editSidebar=!1,this._savedSidebar={panelOrder:[],hiddenPanels:[]}}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}updated(e){e.has("hass")&&void 0===e.get("hass")&&(async()=>{this._dashboards=await this.hass.callWS({type:"lovelace/dashboards/list"})})()}async toggleEditSidebar(){var e,t;const i=await de(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");i.editMode=!i.editMode,this._editSidebar=i.editMode,this._editSidebar?this._savedSidebar={panelOrder:i._panelOrder,hiddenPanels:i._hiddenPanels}:(i._panelOrder=null!==(e=this._savedSidebar.panelOrder)&&void 0!==e?e:[],i._hiddenPanels=null!==(t=this._savedSidebar.hiddenPanels)&&void 0!==t?t:[],this._savedSidebar={panelOrder:[],hiddenPanels:[]})}render(){const e=this._dashboards.map((e=>({value:e.url_path,label:e.title}))),t={select:{options:[{value:"lovelace",label:"lovelace (default)"},...e],custom_value:!0}};return B`
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
    `}}e([se()],ge.prototype,"hass",void 0),e([ne()],ge.prototype,"_dashboards",void 0),e([ne()],ge.prototype,"_editSidebar",void 0),customElements.define("browser-mod-frontend-settings-card",ge);var we="2.3.0";(async()=>{var e,t,i,o,s,n,r,a,l,d,h,c,u,p,g;await customElements.whenDefined("partial-panel-resolver");const w=document.createElement("partial-panel-resolver").getRoutes([{component_name:"config",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==w?void 0:w.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t)),await customElements.whenDefined("ha-panel-config");const v=document.createElement("ha-panel-config");await(null===(r=null===(n=null===(s=null===(o=null==v?void 0:v.routerOptions)||void 0===o?void 0:o.routes)||void 0===s?void 0:s.dashboard)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await(null===(h=null===(d=null===(l=null===(a=null==v?void 0:v.routerOptions)||void 0===a?void 0:a.routes)||void 0===l?void 0:l.general)||void 0===d?void 0:d.load)||void 0===h?void 0:h.call(d)),await(null===(g=null===(p=null===(u=null===(c=null==v?void 0:v.routerOptions)||void 0===c?void 0:c.routes)||void 0===u?void 0:u.entities)||void 0===p?void 0:p.load)||void 0===g?void 0:g.call(p)),await customElements.whenDefined("ha-config-dashboard")})().then((()=>{class t extends te{firstUpdated(){window.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){var e;return window.browser_mod?B`
        <ha-top-app-bar-fixed>
          <ha-menu-button
            slot="navigationIcon"
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${we})
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
        `]}}e([se()],t.prototype,"hass",void 0),e([se()],t.prototype,"narrow",void 0),e([se()],t.prototype,"connection",void 0),customElements.define("browser-mod-panel",t)}));
