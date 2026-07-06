function t(t,e,o,s){var i,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(r<3?i(n):r>3?i(e,o,n):i(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new r(o,t,s)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,w=globalThis,g=w.trustedTypes,m=g?g.emptyScript:"",f=w.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},$=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),w.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:i}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);i?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...c(t),...u(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(o)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of s){const s=document.createElement("style"),i=e.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=o.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:_).toAttribute(e,o.type);this._$Em=t,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const r=i.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){const s=this.constructor,i=this[t];if(o??=s.getPropertyOptions(t),!((o.hasChanged??$)(i,e)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:i},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==i||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,o,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,f?.({ReactiveElement:y}),(w.reactiveElementVersions??=[]).push("2.1.1");const A=globalThis,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+P,U=`<${C}>`,O=document,M=()=>O.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,R="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,D=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,V=O.createTreeWalker(O,129);function K(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const o=t.length-1,s=[];let i,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<o;e++){const o=t[e];let a,l,d=-1,h=0;for(;h<o.length&&(n.lastIndex=h,l=n.exec(o),null!==l);)h=n.lastIndex,n===H?"!--"===l[1]?n=T:void 0!==l[1]?n=D:void 0!==l[2]?(j.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=I):void 0!==l[3]&&(n=I):n===I?">"===l[0]?(n=i??H,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?I:'"'===l[3]?L:N):n===L||n===N?n=I:n===T||n===D?n=H:(n=I,i=void 0);const c=n===I&&t[e+1].startsWith("/>")?" ":"";r+=n===H?o+U:d>=0?(s.push(a),o.slice(0,d)+x+o.slice(d)+P+c):o+P+(-2===d?e:c)}return[K(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let i=0,r=0;const n=t.length-1,a=this.parts,[l,d]=G(t,e);if(this.el=J.createElement(l,o),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(x)){const e=d[r++],o=s.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?ot:X}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:i}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],M()),V.nextNode(),a.push({type:2,index:++i});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:i}),t+=P.length-1}i++}}static createElement(t,e){const o=O.createElement("template");return o.innerHTML=t,o}}function Y(t,e,o=t,s){if(e===z)return e;let i=void 0!==s?o._$Co?.[s]:o._$Cl;const r=k(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(t),i._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=i:o._$Cl=i),void 0!==i&&(e=Y(t,i._$AS(t,e.values),i,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);V.currentNode=s;let i=V.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new st(i,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(i=V.nextNode(),r++)}return V.currentNode=O,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),k(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(K(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new J(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const i of t)s===e.length?e.push(o=new Q(this.O(M()),this.O(M()),this,this.options)):o=e[s],o._$AI(i),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=W}_$AI(t,e=this,o,s){const i=this.strings;let r=!1;if(void 0===i)t=Y(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==z,r&&(this._$AH=t);else{const s=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=Y(this,s[o+n],e,n),a===z&&(a=this._$AH[n]),r||=!k(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class ot extends X{constructor(t,e,o,s,i){super(t,e,o,s,i),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===z)return;const o=this._$AH,s=t===W&&o!==W||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==W&&(o===W||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const it=A.litHtmlPolyfillSupport;it?.(J,Q),(A.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const s=o?.renderBefore??e;let i=s._$litPart$;if(void 0===i){const t=o?.renderBefore??null;s._$litPart$=i=new Q(e.insertBefore(M(),t),t,void 0,o??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},dt=(t=lt,e,o)=>{const{kind:s,metadata:i}=o;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===s){const{name:s}=o;return{set(o){const i=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,i,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=o;return function(o){const i=this[s];e.call(this,o),this.requestUpdate(s,i,t)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,o)=>"object"==typeof o?dt(t,e,o):((t,e,o)=>{const s=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),s?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}class ct extends nt{constructor(){super(...arguments),this.dirty=!1,this.narrow=!1}toggleRegister(){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.ready)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}toggleGo2rtcEnabled(){window.browser_mod.go2rtcEnabled=!window.browser_mod.go2rtcEnabled,this.dirty=!0}toggleSyncSession(){window.browser_mod.syncSession=!window.browser_mod.syncSession,this.requestUpdate()}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>this.requestUpdate())}render(){var t,e,o,s,i,r,n,a,l,d,h,c,u,p,w,g,m,f,v,_,$;return q`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${(null===(t=window.browser_mod)||void 0===t?void 0:t.ready)?q`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:check-circle-outline"}
                  style="color: var(--success-color, green);"
                ></ha-icon>
              `:q`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:circle-outline"}
                  style="color: var(--error-color, red);"
                ></ha-icon>
              `}
        </h1>
        <div class="card-content">
          ${this.dirty?q`
                <ha-alert alert-type="warning">
                  It is strongly recommended to refresh your browser window
                  after changing any of the settings in this box.
                </ha-alert>
              `:""}
        </div>
        <div class="card-content">
          ${(null===(e=this.hass.user)||void 0===e?void 0:e.is_admin)?"":q`
                <ha-alert alert-type="info" title="Login as admin to edit">
                  Login as admin to change the settings of this Browser.
                  <br /><br />
                  You can set auto-register as admin on another Browser
                  to register this Browser automatically. You can then either
                  use <i>browser_mod.change_browser_id</i> service or login 
                  as admin on this Browser to change the Browser ID.
                </ha-alert>
              `}
        </div>
        <div class="card-content">
          <ha-row-item>
            <span slot="headline">Register</span>
            <span slot="supporting-text"
              >Enable this browser as a Device in Home Assistant</span
            >
            <ha-switch
              slot="end"
              .checked=${null===(o=window.browser_mod)||void 0===o?void 0:o.registered}
              @change=${this.toggleRegister}
              .disabled=${(null===(s=window.browser_mod)||void 0===s?void 0:s.browser_locked)||(null===(i=window.browser_mod)||void 0===i?void 0:i.global_settings.autoRegister)||(null===(r=window.browser_mod)||void 0===r?void 0:r.global_settings.lockRegister)||!(null===(n=this.hass.user)||void 0===n?void 0:n.is_admin)}
            ></ha-switch>
          </ha-row-item>

          <ha-row-item ?narrow=${this.narrow}>
            <span slot="headline">Browser ID</span>
            <span slot="supporting-text"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-form
              slot="end"
              .hass=${this.hass}
              .schema=${[{name:"browser_id",label:"Browser ID",helper:"Select an existing known Browser ID or enter new",required:!0,selector:{select:{sort:!0,custom_value:!0,mode:"dropdown",options:Object.keys(null===(a=window.browser_mod)||void 0===a?void 0:a.browsers)||[]}}}]}
              .computeLabel=${t=>{var e;return null!==(e=t.label)&&void 0!==e?e:t.name}}
              .computeHelper=${t=>{var e;return null!==(e=t.helper)&&void 0!==e?e:""}}
              .data=${{browser_id:null===(l=window.browser_mod)||void 0===l?void 0:l.browserID}}
              .disabled=${(null===(d=window.browser_mod)||void 0===d?void 0:d.browser_locked)||!(null===(h=this.hass.user)||void 0===h?void 0:h.is_admin)}
              @value-changed=${t=>{var e;const o=t.detail.value.browser_id;o&&o!==(null===(e=window.browser_mod)||void 0===e?void 0:e.browserID)&&(window.browser_mod.browserID=o,this.dirty=!0)}}
            >
            </ha-form>
          </ha-row-item>

          <ha-row-item>
            <span slot="headline">Sync Browser ID to login session</span>
            <span slot="supporting-text"
              >Store this Browser ID against your current login session.
              Allows the Browser ID to be recalled if local storage is
              cleared.</span
            >
            <ha-switch
              slot="end"
              .checked=${null===(c=window.browser_mod)||void 0===c?void 0:c.syncSession}
              @change=${this.toggleSyncSession}
              .disabled=${null===(u=window.browser_mod)||void 0===u?void 0:u.browser_locked}
            ></ha-switch>
          </ha-row-item>

          ${(null===(p=window.browser_mod)||void 0===p?void 0:p.registered)?q`
                ${this._renderSuspensionAlert()}
                <ha-row-item>
                  <span slot="headline">Enable camera entity</span>
                  <span slot="supporting-text"
                    >Expose this browser camera as a Home Assistant camera
                    entity</span
                  >
                  <ha-switch
                    slot="end"
                    .checked=${null===(w=window.browser_mod)||void 0===w?void 0:w.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                    .disabled=${null===(g=window.browser_mod)||void 0===g?void 0:g.browser_locked}
                  ></ha-switch>
                </ha-row-item>
                <ha-row-item>
                  <span slot="headline">Enable go2rtc publishing</span>
                  <span slot="supporting-text"
                    >Publish this browser camera to go2rtc using WHIP</span
                  >
                  <ha-switch
                    slot="end"
                    .checked=${null===(m=window.browser_mod)||void 0===m?void 0:m.go2rtcEnabled}
                    @change=${this.toggleGo2rtcEnabled}
                    .disabled=${null===(f=window.browser_mod)||void 0===f?void 0:f.browser_locked}
                  ></ha-switch>
                </ha-row-item>
                ${(null===(v=window.browser_mod)||void 0===v?void 0:v.cameraError)?q`
                      <ha-alert alert-type="error">
                        Setting up the device camera failed. Make sure you are browsing
                        in a secure (https://) context and have
                        allowed use of the camera in your browser.
                      </ha-alert>
                    `:""}
                ${(null===(_=window.browser_mod)||void 0===_?void 0:_.go2rtcError)?q`
                      <ha-alert alert-type="error">
                        Setting up go2rtc publishing failed. Make sure go2rtc
                        is reachable, you are browsing in a secure (https://)
                        context, and camera access is allowed.
                      </ha-alert>
                    `:""}
                ${this._renderInteractionAlert()}
                ${this._renderFKBSettingsInfo()}
              `:""}
        </div>
      </ha-card>
      ${(null===($=this.hass.user)||void 0===$?void 0:$.is_admin)?q`
          <ha-card outlined class="integration-alert">
            <div class="card-content">
              <ha-alert alert-type="info">
                Browser Mod integration settings are now found in Browser Mod integration entry in 
                Devices & services. Use the config/settings cog to access global Browser Mod settings.
          </ha-alert>
          <ha-button
            appearance="accent"
            @click=${()=>{window.browser_mod.browser_navigate("/config/integrations/integration/browser_mod")}}
            class="navigate-button"
          >
            Go to Browser Mod Integration
          </ha-button>
        </div>
      </ha-card>
    `:W}
    `}_renderSuspensionAlert(){return this.hass.suspendWhenHidden?q`
      <ha-alert alert-type="warning" title="Auto closing connection">
        Home Assistant will close the websocket connection to the server
        automatically after 5 minutes of inactivity.<br /><br />
        While decreasing network traffic and memory usage, this may cause
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
    `:q``}_renderInteractionAlert(){return q`
      <ha-alert title="Interaction requirement">
        For privacy reasons many browsers require the user to interact with a
        webpage before allowing audio playback or video capture. This may affect
        the
        <code>media_player</code>, <code>camera</code>, and go2rtc publishing
        features of Browser Mod. <br /><br />

        If you ever see a
        <ha-icon
          icon="mdi:gesture-tap"
          style="color: var(--warning-color);"
        ></ha-icon>
        symbol at the bottom right corner of the screen, please tap or click
        anywhere on the page. This should allow Browser Mod to work again.
      </ha-alert>
    `}_renderFKBSettingsInfo(){var t,e;return(null===(t=window.browser_mod)||void 0===t?void 0:t.fully)&&this.getFullySettings()?q`
      ${(null===(e=window.browser_mod)||void 0===e?void 0:e.fully)&&this.getFullySettings()?q` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`:""}
    `:q``}getFullySettings(){if(!window.browser_mod.fully)return null;const t=[],e=[];"true"!==window.fully.getBooleanSetting("autoplayVideos")&&e.push(q`<li>Autoplay Videos</li>`),"true"!==window.fully.getBooleanSetting("autoplayAudio")&&e.push(q`<li>Autoplay Audio</li>`),"true"!==window.fully.getBooleanSetting("webcamAccess")&&e.push(q`<li>Enable Webcam Access (PLUS)</li>`),0!==e.length&&t.push(q`<li>Web Content Settings</li>
        <ul>
          ${e}
        </ul>`),"true"!==window.fully.getBooleanSetting("websiteIntegration")&&t.push(q`<li>Advanced Web Settings</li>
        <ul>
          <li>Enable JavaScript Interface (PLUS)</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("keepScreenOn")&&t.push(q`<li>Device Management</li>
        <ul>
          <li>Keep Screen On</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("preventSleepWhileScreenOff")&&t.push(q`<li>Power Settings</li>
        <ul>
          <li>Prevent from Sleep while Screen Off</li>
        </ul>`);const o=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&o.push(q`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&o.push(q`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&o.push(q`<li>Exit Screensaver on Motion</li>`),0!==o.length&&t.push(q`<li>Motion Detection (PLUS)</li>
        <ul>
          ${o}
        </ul>`),"true"!==window.fully.getBooleanSetting("remoteAdmin")&&t.push(q`<li>Remote Administration (PLUS)</li>
        <ul>
          <li>Enable Remote Administration</li>
        </ul>`),t.length?t:null}static get styles(){return n`
      .card-header {
        display: flex;
        justify-content: space-between;
      }
      ha-row-item span[slot="supporting-text"] {
        white-space: normal;
      }
      ha-row-item[narrow] > ha-form {
        flex: 2;
      }
      .integration-alert {
        margin-top: 16px;
      }
      .integration-alert .card-content {
        display: flex;
        flex-direction: column;
      }
      .navigate-button {
        margin-top: 8px;
        align-self: flex-end;
      }
    `}}t([ht()],ct.prototype,"hass",void 0),t([ht({type:Boolean})],ct.prototype,"dirty",void 0),t([ht({type:Boolean})],ct.prototype,"narrow",void 0),customElements.define("browser-mod-browser-settings-card",ct);var ut="3.0.1-beta.2";(async()=>{var t,e,o,s,i,r,n;await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}]);await(null===(o=null===(e=null===(t=null==a?void 0:a.routes)||void 0===t?void 0:t.a)||void 0===e?void 0:e.load)||void 0===o?void 0:o.call(e)),await customElements.whenDefined("ha-panel-config");const l=document.createElement("ha-panel-config");await(null===(n=null===(r=null===(i=null===(s=null==l?void 0:l.routerOptions)||void 0===s?void 0:s.routes)||void 0===i?void 0:i.dashboard)||void 0===r?void 0:r.load)||void 0===n?void 0:n.call(r)),await customElements.whenDefined("ha-config-dashboard")})().then(()=>{class e extends nt{firstUpdated(){window.addEventListener("browser-mod-config-update",()=>this.requestUpdate())}render(){return window.browser_mod?q`
        <ha-top-app-bar-fixed>
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${ut})
            <a
              href="https://github.com/thomasloven/hass-browser_mod/blob/master/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ha-icon class="icon" .icon=${"mdi:help-circle"}></ha-icon>
            </a>
          </div>
          <div class="content ha-scrollbar">
            <ha-config-section .narrow=${this.narrow} full-width>
              <browser-mod-browser-settings-card
                .hass=${this.hass}
                .narrow=${this.narrow}
              ></browser-mod-browser-settings-card>
            </ha-config-section>
          </div>
        </ha-top-app-bar-fixed>
      `:q``}static get styles(){var t,e;return[...null!==(e=null===(t=customElements.get("ha-config-dashboard"))||void 0===t?void 0:t.styles)&&void 0!==e?e:[],n`
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
        `]}}t([ht()],e.prototype,"hass",void 0),t([ht()],e.prototype,"narrow",void 0),t([ht()],e.prototype,"connection",void 0),customElements.define("browser-mod-browser-panel",e)});
