function e(e,t,s,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,s,n):o(t,s))||n);return r>3&&n&&Object.defineProperty(t,s,n),n}const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new Map;class o{constructor(e,t){if(this._$cssResult$=!0,t!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=i.get(this.cssText);return t&&void 0===e&&(i.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1]),e[0]);return new o(i,s)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new o("string"==typeof e?e:e+"",s))(t)})(e):e;var a;const l=window.trustedTypes,d=l?l.emptyScript:"",h=window.reactiveElementPolyfillSupport,c={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},u=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:u};class w extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,s)=>{const i=this._$Eh(s,t);void 0!==i&&(this._$Eu.set(i,s),e.push(i))})),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const o=this[e];this[t]=i,this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of t)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eh(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,s;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(s=e.hostConnected)||void 0===s||s.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{t?e.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):s.forEach((t=>{const s=document.createElement("style"),i=window.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=t.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ES(e,t,s=p){var i,o;const r=this.constructor._$Eh(e,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(o=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==o?o:c.toAttribute)(t,s.type);this._$Ei=e,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(e,t){var s,i,o;const r=this.constructor,n=r._$Eu.get(e);if(void 0!==n&&this._$Ei!==n){const e=r.getPropertyOptions(n),a=e.converter,l=null!==(o=null!==(i=null===(s=a)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof a?a:null)&&void 0!==o?o:c.fromAttribute;this._$Ei=n,this[n]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,s){let i=!0;void 0!==e&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===s.reflect&&this._$Ei!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(s)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}var g;w.finalized=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:w}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.3.1");const v=globalThis.trustedTypes,b=v?v.createPolicy("lit-html",{createHTML:e=>e}):void 0,m=`lit$${(Math.random()+"").slice(9)}$`,_="?"+m,$=`<${_}>`,f=document,y=(e="")=>f.createComment(e),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,C=/-->/g,x=/>/g,T=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,U=/"/g,k=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),O=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),B=new WeakMap,D=f.createTreeWalker(f,129,null,!1),I=(e,t)=>{const s=e.length-1,i=[];let o,r=2===t?"<svg>":"",n=E;for(let t=0;t<s;t++){const s=e[t];let a,l,d=-1,h=0;for(;h<s.length&&(n.lastIndex=h,l=n.exec(s),null!==l);)h=n.lastIndex,n===E?"!--"===l[1]?n=C:void 0!==l[1]?n=x:void 0!==l[2]?(k.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=T):void 0!==l[3]&&(n=T):n===T?">"===l[0]?(n=null!=o?o:E,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?T:'"'===l[3]?U:P):n===U||n===P?n=T:n===C||n===x?n=E:(n=T,o=void 0);const c=n===T&&e[t+1].startsWith("/>")?" ":"";r+=n===E?s+$:d>=0?(i.push(a),s.slice(0,d)+"$lit$"+s.slice(d)+m+c):s+m+(-2===d?(i.push(void 0),t):c)}const a=r+(e[s]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(a):a,i]};class R{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,r=0;const n=e.length-1,a=this.parts,[l,d]=I(e,t);if(this.el=R.createElement(l,s),D.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=D.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(m)){const s=d[r++];if(e.push(t),void 0!==s){const e=i.getAttribute(s.toLowerCase()+"$lit$").split(m),t=/([.?@])?(.*)/.exec(s);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?F:"?"===t[1]?V:"@"===t[1]?W:j})}else a.push({type:6,index:o})}for(const t of e)i.removeAttribute(t)}if(k.test(i.tagName)){const e=i.textContent.split(m),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],y()),D.nextNode(),a.push({type:2,index:++o});i.append(e[t],y())}}}else if(8===i.nodeType)if(i.data===_)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(m,e+1));)a.push({type:7,index:o}),e+=m.length-1}o++}}static createElement(e,t){const s=f.createElement("template");return s.innerHTML=e,s}}function N(e,t,s=e,i){var o,r,n,a;if(t===O)return t;let l=void 0!==i?null===(o=s._$Cl)||void 0===o?void 0:o[i]:s._$Cu;const d=A(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,s,i)),void 0!==i?(null!==(n=(a=s)._$Cl)&&void 0!==n?n:a._$Cl=[])[i]=l:s._$Cu=l),void 0!==l&&(t=N(e,l._$AS(e,t.values),l,i)),t}class L{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:s},parts:i}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:f).importNode(s,!0);D.currentNode=o;let r=D.nextNode(),n=0,a=0,l=i[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new z(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new K(r,this,e)),this.v.push(t),l=i[++a]}n!==(null==l?void 0:l.index)&&(r=D.nextNode(),n++)}return o}m(e){let t=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class z{constructor(e,t,s,i){var o;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cg=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),A(e)?e===M||null==e||""===e?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==O&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.k(e):(e=>{var t;return S(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==M&&A(this._$AH)?this._$AA.nextSibling.data=e:this.k(f.createTextNode(e)),this._$AH=e}T(e){var t;const{values:s,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=R.createElement(i.h,this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.m(s);else{const e=new L(o,this),t=e.p(this.options);e.m(s),this.k(t),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new R(e)),t}S(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new z(this.M(y()),this.M(y()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class j{constructor(e,t,s,i,o){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,i){const o=this.strings;let r=!1;if(void 0===o)e=N(this,e,t,0),r=!A(e)||e!==this._$AH&&e!==O,r&&(this._$AH=e);else{const i=e;let n,a;for(e=o[0],n=0;n<o.length-1;n++)a=N(this,i[s+n],t,n),a===O&&(a=this._$AH[n]),r||(r=!A(a)||a!==this._$AH[n]),a===M?e=M:e!==M&&(e+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.C(e)}C(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class F extends j{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===M?void 0:e}}const q=v?v.emptyScript:"";class V extends j{constructor(){super(...arguments),this.type=4}C(e){e&&e!==M?this.element.setAttribute(this.name,q):this.element.removeAttribute(this.name)}}class W extends j{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){var s;if((e=null!==(s=N(this,e,t,0))&&void 0!==s?s:M)===O)return;const i=this._$AH,o=e===M&&i!==M||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==M&&(i===M||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==s?s:this.element,e):this._$AH.handleEvent(e)}}class K{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}}const G=window.litHtmlPolyfillSupport;var J,Y;null==G||G(R,z),(null!==(g=globalThis.litHtmlVersions)&&void 0!==g?g:globalThis.litHtmlVersions=[]).push("2.2.2");class Z extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,s)=>{var i,o;const r=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:t;let n=r._$litPart$;if(void 0===n){const e=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new z(t.insertBefore(y(),e),e,void 0,null!=s?s:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return O}}Z.finalized=!0,Z._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Z});const Q=globalThis.litElementPolyfillSupport;null==Q||Q({LitElement:Z}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.0");const X=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(s){s.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(s){s.createProperty(t.key,e)}};function ee(e){return(t,s)=>void 0!==s?((e,t,s)=>{t.constructor.createProperty(s,e)})(e,t,s):X(e,t)}var te;null===(te=window.HTMLSlotElement)||void 0===te||te.prototype.assignedElements;class se extends Z{constructor(){super(...arguments),this.dirty=!1}toggleRegister(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.connected)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}changeBrowserID(e){window.browser_mod.browserID=e.target.value,this.dirty=!0}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){var e,t,s,i,o;return H`
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
              .value=${null===(s=window.browser_mod)||void 0===s?void 0:s.browserID}
              @change=${this.changeBrowserID}
            ></ha-textfield>
          </ha-settings-row>

          ${(null===(i=window.browser_mod)||void 0===i?void 0:i.registered)?H`
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
        </ul>`);const s=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&s.push(H`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&s.push(H`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&s.push(H`<li>Exit Screensaver on Motion</li>`),0!==s.length&&e.push(H`<li>Motion Detection (PLUS)</li>
        <ul>
          ${s}
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
    `}}e([ee()],se.prototype,"hass",void 0),e([ee()],se.prototype,"dirty",void 0),customElements.define("browser-mod-browser-settings-card",se);class ie extends Z{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup("Unregister browser",`Are you sure you want to unregister Browser ${t}?`,{right_button:"Yes",right_button_action:()=>{console.log(t,window.browser_mod.browserID),t===window.browser_mod.browserID?(console.log("Unregister self"),window.browser_mod.registered=!1):window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"No"})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){return H`
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
    `}}e([ee()],ie.prototype,"hass",void 0),customElements.define("browser-mod-registered-browsers-card",ie),(async()=>{var e,t,s,i,o,r,n;await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver").getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(s=null===(t=null===(e=null==a?void 0:a.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===s?void 0:s.call(t));const l=document.createElement("developer-tools-router");await(null===(n=null===(r=null===(o=null===(i=null==l?void 0:l.routerOptions)||void 0===i?void 0:i.routes)||void 0===o?void 0:o.template)||void 0===r?void 0:r.load)||void 0===n?void 0:n.call(r)),await customElements.whenDefined("developer-tools-template")})();class oe extends Z{constructor(){super(...arguments),this._selectedTab=0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate())),window.browser_mod.addEventListener("browser-mod-favicon-update",(()=>this.requestUpdate()))}_handleSwitchTab(e){this._selectedTab=parseInt(e.detail.index,10)}render(){const e=["user","browser","global"][this._selectedTab];return H`
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
    `}_render_settings(e){const t=window.browser_mod.global_settings,s=window.browser_mod.browser_settings,i=window.browser_mod.user_settings,o={global:t,browser:s,user:i}[e],r=e=>({true:"Enabled",false:"Disabled",undefined:"Unset"}[String(e)]),n=e=>void 0===e?"Unset":"Set",a=t=>"browser"!==e&&void 0!==s[t]?H`<br />Overridden by browser setting`:"global"===e&&void 0!==i[t]?H`<br />Overridden by user setting`:void 0;return H`
      <div class="box">
        <ha-settings-row>
          <span slot="heading">Favicon template</span>
          ${a("faviconTemplate")}
          <img src="${window.browser_mod._currentFavicon}" class="favicon" />
        </ha-settings-row>
        <ha-code-editor
          .hass=${this.hass}
          .value=${o.faviconTemplate}
          @value-changed=${t=>{const s=t.detail.value||void 0;window.browser_mod.set_setting("faviconTemplate",s,e)}}
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
          @value-changed=${t=>{const s=t.detail.value||void 0;window.browser_mod.set_setting("titleTemplate",s,e)}}
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
    `}}e([ee()],oe.prototype,"hass",void 0),e([function(e){return ee({...e,state:!0})}()],oe.prototype,"_selectedTab",void 0),customElements.define("browser-mod-frontend-settings-card",oe),(async()=>{var e,t,s,i,o,r,n,a,l,d,h;await customElements.whenDefined("partial-panel-resolver");const c=document.createElement("partial-panel-resolver").getRoutes([{component_name:"config",url_path:"a"}]);await(null===(s=null===(t=null===(e=null==c?void 0:c.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===s?void 0:s.call(t)),await customElements.whenDefined("ha-panel-config");const u=document.createElement("ha-panel-config");await(null===(n=null===(r=null===(o=null===(i=null==u?void 0:u.routerOptions)||void 0===i?void 0:i.routes)||void 0===o?void 0:o.dashboard)||void 0===r?void 0:r.load)||void 0===n?void 0:n.call(r)),await(null===(h=null===(d=null===(l=null===(a=null==u?void 0:u.routerOptions)||void 0===a?void 0:a.routes)||void 0===l?void 0:l.cloud)||void 0===d?void 0:d.load)||void 0===h?void 0:h.call(d)),await customElements.whenDefined("ha-config-dashboard")})().then((()=>{class t extends Z{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",(()=>this.requestUpdate()))}render(){return H`
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
