function e(e,t,i,s){var o,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,i,n):o(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const s=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new o(s,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var a;const l=window.trustedTypes,d=l?l.emptyScript:"",h=window.reactiveElementPolyfillSupport,c={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:u};class w extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;null!==(t=this.h)&&void 0!==t||(this.h=[]),this.h.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{t?e.adoptedStyleSheets=i.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):i.forEach((t=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=t.cssText,e.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=p){var s,o;const r=this.constructor._$Ep(e,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:c.toAttribute)(t,i.type);this._$El=e,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(e,t){var i,s;const o=this.constructor,r=o._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=o.getPropertyOptions(r),n=e.converter,a=null!==(s=null!==(i=null==n?void 0:n.fromAttribute)&&void 0!==i?i:"function"==typeof n?n:null)&&void 0!==s?s:c.fromAttribute;this._$El=r,this[r]=a(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var v;w.finalized=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:w}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.3.4");const g=globalThis.trustedTypes,b=g?g.createPolicy("lit-html",{createHTML:e=>e}):void 0,m=`lit$${(Math.random()+"").slice(9)}$`,_="?"+m,$=`<${_}>`,f=document,y=(e="")=>f.createComment(e),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,C=/-->/g,x=/>/g,P=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),T=/'/g,k=/"/g,U=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),O=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),R=new WeakMap,D=f.createTreeWalker(f,129,null,!1),I=(e,t)=>{const i=e.length-1,s=[];let o,r=2===t?"<svg>":"",n=E;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===E?"!--"===l[1]?n=C:void 0!==l[1]?n=x:void 0!==l[2]?(U.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=P):void 0!==l[3]&&(n=P):n===P?">"===l[0]?(n=null!=o?o:E,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?P:'"'===l[3]?k:T):n===k||n===T?n=P:n===C||n===x?n=E:(n=P,o=void 0);const c=n===P&&e[t+1].startsWith("/>")?" ":"";r+=n===E?i+$:d>=0?(s.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+m+c):i+m+(-2===d?(s.push(void 0),t):c)}const a=r+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(a):a,s]};class M{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const n=e.length-1,a=this.parts,[l,d]=I(e,t);if(this.el=M.createElement(l,i),D.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=D.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(m)){const i=d[r++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split(m),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?F:"?"===t[1]?q:"@"===t[1]?V:z})}else a.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(U.test(s.tagName)){const e=s.textContent.split(m),t=e.length-1;if(t>0){s.textContent=g?g.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],y()),D.nextNode(),a.push({type:2,index:++o});s.append(e[t],y())}}}else if(8===s.nodeType)if(s.data===_)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(m,e+1));)a.push({type:7,index:o}),e+=m.length-1}o++}}static createElement(e,t){const i=f.createElement("template");return i.innerHTML=e,i}}function N(e,t,i=e,s){var o,r,n,a;if(t===O)return t;let l=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=A(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,s)),void 0!==s?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(t=N(e,l._$AS(e,t.values),l,s)),t}class L{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:f).importNode(i,!0);D.currentNode=o;let r=D.nextNode(),n=0,a=0,l=s[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new j(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new K(r,this,e)),this.v.push(t),l=s[++a]}n!==(null==l?void 0:l.index)&&(r=D.nextNode(),n++)}return o}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class j{constructor(e,t,i,s){var o;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$C_=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$C_}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),A(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==O&&this.T(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.k(e):(e=>S(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.S(e):this.T(e)}j(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.j(e))}T(e){this._$AH!==B&&A(this._$AH)?this._$AA.nextSibling.data=e:this.k(f.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=M.createElement(s.h,this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.m(i);else{const e=new L(o,this),t=e.p(this.options);e.m(i),this.k(t),this._$AH=e}}_$AC(e){let t=R.get(e.strings);return void 0===t&&R.set(e.strings,t=new M(e)),t}S(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new j(this.j(y()),this.j(y()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$C_=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class z{constructor(e,t,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(void 0===o)e=N(this,e,t,0),r=!A(e)||e!==this._$AH&&e!==O,r&&(this._$AH=e);else{const s=e;let n,a;for(e=o[0],n=0;n<o.length-1;n++)a=N(this,s[i+n],t,n),a===O&&(a=this._$AH[n]),r||(r=!A(a)||a!==this._$AH[n]),a===B?e=B:e!==B&&(e+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.P(e)}P(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class F extends z{constructor(){super(...arguments),this.type=3}P(e){this.element[this.name]=e===B?void 0:e}}const W=g?g.emptyScript:"";class q extends z{constructor(){super(...arguments),this.type=4}P(e){e&&e!==B?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class V extends z{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=N(this,e,t,0))&&void 0!==i?i:B)===O)return;const s=this._$AH,o=e===B&&s!==B||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==B&&(s===B||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class K{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}}const G=window.litHtmlPolyfillSupport;var J,Y;null==G||G(M,j),(null!==(v=globalThis.litHtmlVersions)&&void 0!==v?v:globalThis.litHtmlVersions=[]).push("2.2.7");class Z extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let n=r._$litPart$;if(void 0===n){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new j(t.insertBefore(y(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return O}}Z.finalized=!0,Z._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Z});const Q=globalThis.litElementPolyfillSupport;null==Q||Q({LitElement:Z}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.2");const X=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function ee(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):X(e,t)}var te;null===(te=window.HTMLSlotElement)||void 0===te||te.prototype.assignedElements;class ie extends Z{constructor(){super(...arguments),this.dirty=!1}toggleRegister(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.connected)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}changeBrowserID(e){window.browser_mod.browserID=e.target.value,this.dirty=!0}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){var e,t,i,s,o;return H`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${(null===(e=window.browser_mod)||void 0===e?void 0:e.connected)?H`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:check-circle-outline"}
                  style="color: var(--success-color, green);"
                ></ha-icon>
              `:H`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:circle-outline"}
                  style="color: var(--error-color, red);"
                ></ha-icon>
              `}
        </h1>
        <div class="card-content">
          ${this.dirty?H`
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
              .value=${null===(i=window.browser_mod)||void 0===i?void 0:i.browserID}
              @change=${this.changeBrowserID}
            ></ha-textfield>
          </ha-settings-row>

          ${(null===(s=window.browser_mod)||void 0===s?void 0:s.registered)?H`
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
                ${this._renderInteractionAlert()}
                ${this._renderFKBSettingsInfo()}
              `:""}
        </div>
      </ha-card>
    `}_renderSuspensionAlert(){return this.hass.suspendWhenHidden?H`
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
    `:H``}_renderInteractionAlert(){return H`
      <ha-alert title="Interaction requirement">
        For security reasons many browsers require the user to interact with a
        webpage before allowing audio playback or video capture. This may affect
        the
        <code>media_player</code> and <code>camera</code> components of Browser
        Mod. <br /><br />

        If you ever see a
        <ha-icon icon="mdi:gesture-tap"></ha-icon> symbol at the bottom right
        corner of the screen, please tap or click anywhere on the page. This
        should allow Browser Mod to work again.
      </ha-alert>
    `}_renderFKBSettingsInfo(){var e,t;return(null===(e=window.browser_mod)||void 0===e?void 0:e.fully)&&this.getFullySettings()?H`
      ${(null===(t=window.browser_mod)||void 0===t?void 0:t.fully)&&this.getFullySettings()?H` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`:""}
    `:H``}getFullySettings(){if(!window.browser_mod.fully)return null;const e=[],t=[];"true"!==window.fully.getBooleanSetting("autoplayVideos")&&t.push(H`<li>Autoplay Videos</li>`),"true"!==window.fully.getBooleanSetting("autoplayAudio")&&t.push(H`<li>Autoplay Audio</li>`),"true"!==window.fully.getBooleanSetting("webcamAccess")&&t.push(H`<li>Enable Webcam Access (PLUS)</li>`),0!==t.length&&e.push(H`<li>Web Content Settings</li>
        <ul>
          ${t}
        </ul>`),"true"!==window.fully.getBooleanSetting("websiteIntegration")&&e.push(H`<li>Advanced Web Settings</li>
        <ul>
          <li>Enable JavaScript Interface (PLUS)</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("keepScreenOn")&&e.push(H`<li>Device Management</li>
        <ul>
          <li>Keep Screen On</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("preventSleepWhileScreenOff")&&e.push(H`<li>Power Settings</li>
        <ul>
          <li>Prevent from Sleep while Screen Off</li>
        </ul>`);const i=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&i.push(H`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&i.push(H`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&i.push(H`<li>Exit Screensaver on Motion</li>`),0!==i.length&&e.push(H`<li>Motion Detection (PLUS)</li>
        <ul>
          ${i}
        </ul>`),"true"!==window.fully.getBooleanSetting("remoteAdmin")&&e.push(H`<li>Remote Administration (PLUS)</li>
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
    `}}e([ee()],ie.prototype,"hass",void 0),e([ee()],ie.prototype,"dirty",void 0),customElements.define("browser-mod-browser-settings-card",ie);class se extends Z{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup("Unregister browser",`Are you sure you want to unregister Browser ${t}?`,{right_button:"Yes",right_button_action:()=>{t===window.browser_mod.browserID?window.browser_mod.registered=!1:window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"No"})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){return H`
      <ha-card header="Registered Browsers" outlined>
        <div class="card-content">
          ${Object.keys(window.browser_mod.browsers).map((e=>H` <ha-settings-row>
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
        ${void 0===window.browser_mod.browsers.CAST?H`
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
      }
    `}}e([ee()],se.prototype,"hass",void 0),customElements.define("browser-mod-registered-browsers-card",se),(async()=>{var e,t,i,s,o,r,n;await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver").getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==a?void 0:a.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t));const l=document.createElement("developer-tools-router");await(null===(n=null===(r=null===(o=null===(s=null==l?void 0:l.routerOptions)||void 0===s?void 0:s.routes)||void 0===o?void 0:o.template)||void 0===r?void 0:r.load)||void 0===n?void 0:n.call(r)),await customElements.whenDefined("developer-tools-template")})();class oe extends Z{constructor(){super(...arguments),this._selectedTab=0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate())),window.browser_mod.addEventListener("browser-mod-favicon-update",(()=>this.requestUpdate()))}_handleSwitchTab(e){this._selectedTab=parseInt(e.detail.index,10)}render(){const e=["user","browser","global"][this._selectedTab];return H`
      <ha-card header="Frontend Settings" outlined>
        <div class="card-content">
        <ha-alert alert-type="warning">
          <p>
            Please note: The settings in this section severely change the way the Home
            Assistant frontend works and looks. It is very easy to forget that
            you made a setting here when you switch devices or user.
          </p>
          <p>
            Do not report any issues to Home Assistant before clearing
            <b>EVERY</b> setting here and thouroghly clearing all your browser
            caches. Failure to do so means you risk wasting a lot of peoples
            time, and you will be severly and rightfully ridiculed.
          </p>
          </ha-alert>
          <p>
          Global settings are applied for all users and browsers.</br>
          User settings are applied to the current user and overrides any Global settings.</br>
          Browser settings are applied for the current browser and overrides any User or Global settings.
          </p>
          <mwc-tab-bar
            .activeIndex=${this._selectedTab}
            @MDCTabBar:activated=${this._handleSwitchTab}
          >
            <mwc-tab .label=${"User ("+this.hass.user.name+")"}></mwc-tab>
            <ha-icon .icon=${"mdi:chevron-double-right"}></ha-icon>
            <mwc-tab .label=${"Browser"}></mwc-tab>
            <ha-icon .icon=${"mdi:chevron-double-right"}></ha-icon>
            <mwc-tab .label=${"Global"}></mwc-tab>
          </mwc-tab-bar>

          ${this._render_settings(e)}
        </div>
      </ha-card>
    `}_render_settings(e){const t=window.browser_mod.global_settings,i=window.browser_mod.browser_settings,s=window.browser_mod.user_settings,o={global:t,browser:i,user:s}[e],r=e=>({true:"Enabled",false:"Disabled",undefined:"Unset"}[String(e)]),n=e=>void 0===e?"Unset":"Set",a=t=>"browser"!==e&&void 0!==i[t]?H`<br />Overridden by browser setting`:"global"===e&&void 0!==s[t]?H`<br />Overridden by user setting`:void 0;return H`
      <div class="box">
        <ha-settings-row>
          <span slot="heading">Favicon template</span>
          ${a("faviconTemplate")}
          <img src="${window.browser_mod._currentFavicon}" class="favicon" />
        </ha-settings-row>
        <ha-code-editor
          .hass=${this.hass}
          .value=${o.faviconTemplate}
          @value-changed=${t=>{const i=t.detail.value||void 0;window.browser_mod.set_setting("faviconTemplate",i,e)}}
        ></ha-code-editor>
        <ha-settings-row>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("faviconTemplate",void 0,e)}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Title template</span>
          ${a("titleTemplate")}
        </ha-settings-row>
        <ha-code-editor
          .hass=${this.hass}
          .value=${o.titleTemplate}
          @value-changed=${t=>{const i=t.detail.value||void 0;window.browser_mod.set_setting("titleTemplate",i,e)}}
        ></ha-code-editor>
        <ha-settings-row>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("titleTemplate",void 0,e)}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Hide Sidebar</span>
          <span slot="description">Hide the sidebar and hamburger menu</span>
          Currently: ${r(o.hideSidebar)}
          ${a("hideSidebar")}
        </ha-settings-row>
        <ha-settings-row>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("hideSidebar",!0,e)}
          >
            Enable
          </mwc-button>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("hideSidebar",!1,e)}
          >
            Disable
          </mwc-button>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("hideSidebar",void 0,e)}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Hide Header</span>
          <span slot="description">Hide the header on all pages</span>
          Currently: ${r(o.hideHeader)}
          ${a("hideHeader")}
        </ha-settings-row>
        <ha-settings-row>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("hideHeader",!0,e)}
          >
            Enable
          </mwc-button>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("hideHeader",!1,e)}
          >
            Disable
          </mwc-button>
          <mwc-button
            @click=${()=>window.browser_mod.set_setting("hideHeader",void 0,e)}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Sidebar order</span>
          <span slot="description">
            Order and visibility of sidebar buttons
          </span>
          Currently: ${n(o.sidebarPanelOrder)}
          ${a("sidebarPanelOrder")}
        </ha-settings-row>
        <ha-settings-row>
          <span slot="description">
            Clearing this does NOT restore the original default order.
          </span>
          <mwc-button
            @click=${()=>{window.browser_mod.set_setting("sidebarPanelOrder",localStorage.getItem("sidebarPanelOrder"),e),window.browser_mod.set_setting("sidebarHiddenPanels",localStorage.getItem("sidebarHiddenPanels"),e)}}
          >
            Set
          </mwc-button>
          <mwc-button
            @click=${()=>{window.browser_mod.set_setting("sidebarPanelOrder",void 0,e),window.browser_mod.set_setting("sidebarHiddenPanels",void 0,e)}}
          >
            Clear
          </mwc-button>
        </ha-settings-row>

        <div class="separator"></div>

        <ha-settings-row>
          <span slot="heading">Default dashboard</span>
          <span slot="description"
            >The dashboard that's displayed by default</span
          >
          Currently: ${n(o.defaultPanel)}
          ${a("defaultPanel")}
        </ha-settings-row>
        <ha-settings-row>
          <span slot="description">
            Clearing this does NOT restore the original default dashboard.
          </span>
          <mwc-button
            @click=${()=>{window.browser_mod.set_setting("defaultPanel",localStorage.getItem("defaultPanel"),e)}}
          >
            Set
          </mwc-button>
          <mwc-button
            @click=${()=>{window.browser_mod.set_setting("defaultPanel",void 0,e)}}
          >
            Clear
          </mwc-button>
        </ha-settings-row>
      </div>
    `}static get styles(){return r`
      .box {
        border: 1px solid var(--divider-color);
        padding: 8px;
      }
      .separator {
        border-bottom: 1px solid var(--divider-color);
        margin: 0 -8px;
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
    `}}e([ee()],oe.prototype,"hass",void 0),e([function(e){return ee({...e,state:!0})}()],oe.prototype,"_selectedTab",void 0),customElements.define("browser-mod-frontend-settings-card",oe),(async()=>{var e,t,i,s,o,r,n,a,l,d,h;await customElements.whenDefined("partial-panel-resolver");const c=document.createElement("partial-panel-resolver").getRoutes([{component_name:"config",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==c?void 0:c.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t)),await customElements.whenDefined("ha-panel-config");const u=document.createElement("ha-panel-config");await(null===(n=null===(r=null===(o=null===(s=null==u?void 0:u.routerOptions)||void 0===s?void 0:s.routes)||void 0===o?void 0:o.dashboard)||void 0===r?void 0:r.load)||void 0===n?void 0:n.call(r)),await(null===(h=null===(d=null===(l=null===(a=null==u?void 0:u.routerOptions)||void 0===a?void 0:a.routes)||void 0===l?void 0:l.cloud)||void 0===d?void 0:d.load)||void 0===h?void 0:h.call(d)),await customElements.whenDefined("ha-config-dashboard")})().then((()=>{class t extends Z{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){return H`
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
      `}static get styles(){var e,t;return[...null!==(t=null===(e=customElements.get("ha-config-dashboard"))||void 0===e?void 0:e.styles)&&void 0!==t?t:[],r`
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
