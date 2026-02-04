function e(e,t,i,s){var o,a=arguments.length,n=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new a(i,e,s)},r=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,b=globalThis,g=b.trustedTypes,m=g?g.emptyScript:"",_=b.reactiveElementPolyfillSupport,w=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>!l(e,t),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&d(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const a=s?.call(this);o?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const a=o.fromAttribute(t,e.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const s=this.constructor,o=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??f)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==o||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[w("elementProperties")]=new Map,$[w("finalized")]=new Map,_?.({ReactiveElement:$}),(b.reactiveElementVersions??=[]).push("2.1.1");const S=globalThis,x=S.trustedTypes,A=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,O=document,U=()=>O.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,R="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,j=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,B=/"/g,L=/^(?:script|style|textarea|title)$/i,K=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),z=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),q=new WeakMap,W=O.createTreeWalker(O,129);function J(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,s=[];let o,a=2===t?"<svg>":3===t?"<math>":"",n=H;for(let t=0;t<i;t++){const i=e[t];let r,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===H?"!--"===l[1]?n=M:void 0!==l[1]?n=j:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=I):void 0!==l[3]&&(n=I):n===I?">"===l[0]?(n=o??H,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?I:'"'===l[3]?B:N):n===B||n===N?n=I:n===M||n===j?n=H:(n=I,o=void 0);const h=n===I&&e[t+1].startsWith("/>")?" ":"";a+=n===H?i+P:d>=0?(s.push(r),i.slice(0,d)+E+i.slice(d)+C+h):i+C+(-2===d?t:h)}return[J(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Y{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,a=0;const n=e.length-1,r=this.parts,[l,d]=V(e,t);if(this.el=Y.createElement(l,i),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=W.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(E)){const t=d[a++],i=s.getAttribute(e).split(C),n=/([.?@])?(.*)/.exec(t);r.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?ee:"?"===n[1]?te:"@"===n[1]?ie:Q}),s.removeAttribute(e)}else e.startsWith(C)&&(r.push({type:6,index:o}),s.removeAttribute(e));if(L.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],U()),W.nextNode(),r.push({type:2,index:++o});s.append(e[t],U())}}}else if(8===s.nodeType)if(s.data===k)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)r.push({type:7,index:o}),e+=C.length-1}o++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,s){if(t===z)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const a=T(t)?void 0:t._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=G(e,o._$AS(e,t.values),o,s)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??O).importNode(t,!0);W.currentNode=s;let o=W.nextNode(),a=0,n=0,r=i[0];for(;void 0!==r;){if(a===r.index){let t;2===r.type?t=new X(o,o.nextSibling,this,e):1===r.type?t=new r.ctor(o,r.name,r.strings,this,e):6===r.type&&(t=new se(o,this,e)),this._$AV.push(t),r=i[++n]}a!==r?.index&&(o=W.nextNode(),a++)}return W.currentNode=O,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),T(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==z&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Z(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Y(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new X(this.O(U()),this.O(U()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,s){const o=this.strings;let a=!1;if(void 0===o)e=G(this,e,t,0),a=!T(e)||e!==this._$AH&&e!==z,a&&(this._$AH=e);else{const s=e;let n,r;for(e=o[0],n=0;n<o.length-1;n++)r=G(this,s[i+n],t,n),r===z&&(r=this._$AH[n]),a||=!T(r)||r!==this._$AH[n],r===F?e=F:e!==F&&(e+=(r??"")+o[n+1]),this._$AH[n]=r}a&&!s&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class ie extends Q{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??F)===z)return;const i=this._$AH,s=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const oe=S.litHtmlPolyfillSupport;oe?.(Y,X),(S.litHtmlVersions??=[]).push("3.3.1");const ae=globalThis;let ne=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new X(t.insertBefore(U(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};ne._$litElement$=!0,ne.finalized=!0,ae.litElementHydrateSupport?.({LitElement:ne});const re=ae.litElementPolyfillSupport;re?.({LitElement:ne}),(ae.litElementVersions??=[]).push("4.2.1");const le={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:f},de=(e=le,t,i)=>{const{kind:s,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e)}}throw Error("Unsupported decorator location: "+s)};function ce(e){return(t,i)=>"object"==typeof i?de(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return ce({...e,state:!0,attribute:!1})}var ue;const pe=new WeakMap,be=()=>{};ue=Symbol.toStringTag;let ge=class e{constructor(e){this.subscribers=[],this.settlement=null,this[ue]="Unpromise",this.promise="function"==typeof e?new Promise(e):e;const t=this.promise.then(e=>{const{subscribers:t}=this;this.subscribers=null,this.settlement={status:"fulfilled",value:e},null==t||t.forEach(({resolve:t})=>{t(e)})});"catch"in t&&t.catch(e=>{const{subscribers:t}=this;this.subscribers=null,this.settlement={status:"rejected",reason:e},null==t||t.forEach(({reject:t})=>{t(e)})})}subscribe(){let e,t;const{settlement:i}=this;if(null===i){if(null===this.subscribers)throw new Error("Unpromise settled but still has subscribers");const i=function(){let e,t;return{promise:new Promise((i,s)=>{e=i,t=s}),resolve:e,reject:t}}();this.subscribers=function(e,t){return[...e,t]}(this.subscribers,i),e=i.promise,t=()=>{null!==this.subscribers&&(this.subscribers=function(e,t){const i=e.indexOf(t);return-1!==i?function(e,t){return[...e.slice(0,t),...e.slice(t+1)]}(e,i):e}(this.subscribers,i))}}else{const{status:s}=i;e="fulfilled"===s?Promise.resolve(i.value):Promise.reject(i.reason),t=be}return Object.assign(e,{unsubscribe:t})}then(e,t){const i=this.subscribe(),{unsubscribe:s}=i;return Object.assign(i.then(e,t),{unsubscribe:s})}catch(e){const t=this.subscribe(),{unsubscribe:i}=t;return Object.assign(t.catch(e),{unsubscribe:i})}finally(e){const t=this.subscribe(),{unsubscribe:i}=t;return Object.assign(t.finally(e),{unsubscribe:i})}static proxy(t){const i=e.getSubscribablePromise(t);return typeof i<"u"?i:e.createSubscribablePromise(t)}static createSubscribablePromise(t){const i=new e(t);return pe.set(t,i),pe.set(i,i),i}static getSubscribablePromise(e){return pe.get(e)}static resolve(t){const i="object"==typeof t&&null!==t&&"then"in t&&"function"==typeof t.then?t:Promise.resolve(t);return e.proxy(i).subscribe()}static async any(t){const i=(Array.isArray(t)?t:[...t]).map(e.resolve);try{return await Promise.any(i)}finally{i.forEach(({unsubscribe:e})=>{e()})}}static async race(t){const i=(Array.isArray(t)?t:[...t]).map(e.resolve);try{return await Promise.race(i)}finally{i.forEach(({unsubscribe:e})=>{e()})}}static async raceReferences(e){const t=e.map(me);try{return await Promise.race(t)}finally{for(const e of t)e.unsubscribe()}}};function me(e){return ge.proxy(e).then(()=>[e])}const _e="SELECTTREE-TIMEOUT";async function we(e,t=!1){var i;if((null===(i=e.localName)||void 0===i?void 0:i.includes("-"))&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise(e=>setTimeout(e,100))}}async function ve(e,t,i=!1){let s=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,i]of t.entries()){const e=s[0];if(!e)return null;i.trim().length&&(we(e),s="$"===i?[e.shadowRoot]:e.querySelectorAll(i))}return i?s:s[0]}async function fe(e,t,i=!1,s=1e4){return ge.race([ve(e,t,i),new Promise((e,t)=>setTimeout(()=>t(new Error(_e)),s))]).catch(e=>{if(!e.message||e.message!==_e)throw e;return null})}async function ye(){var e;void 0===(null!==(e=customElements.get("home-assistant"))&&void 0!==e?e:customElements.get("hc-main"))&&await ge.race([customElements.whenDefined("home-assistant"),customElements.whenDefined("hc-main")]);const t=customElements.get("home-assistant")?"home-assistant":"hc-main";for(;!document.querySelector(t);)await new Promise(e=>window.setTimeout(e,100));return document.querySelector(t)}function $e(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(!(e instanceof Object&&t instanceof Object))return!1;for(const i in e)if(e.hasOwnProperty(i)){if(!t.hasOwnProperty(i))return!1;if(e[i]!==t[i]){if("object"!=typeof e[i])return!1;if(!$e(e[i],t[i]))return!1}}for(const i in t)if(t.hasOwnProperty(i)&&!e.hasOwnProperty(i))return!1;return!0}let Se=class extends ne{constructor(){super(...arguments),this.dirty=!1,this.narrow=!1}toggleRegister(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.ready)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>this.requestUpdate())}render(){var e,t,i,s,o,a,n,r,l,d,c,h,u,p,b;return K`
      <ha-card outlined>
        <h1 class="card-header">
          <div class="name">This Browser</div>
          ${(null===(e=window.browser_mod)||void 0===e?void 0:e.ready)?K`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:check-circle-outline"}
                  style="color: var(--success-color, green);"
                ></ha-icon>
              `:K`
                <ha-icon
                  class="icon"
                  .icon=${"mdi:circle-outline"}
                  style="color: var(--error-color, red);"
                ></ha-icon>
              `}
        </h1>
        <div class="card-content">
          ${this.dirty?K`
                <ha-alert alert-type="warning">
                  It is strongly recommended to refresh your browser window
                  after changing any of the settings in this box.
                </ha-alert>
              `:""}
        </div>
        <div class="card-content">
          ${(null===(t=this.hass.user)||void 0===t?void 0:t.is_admin)?"":K`
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
          <ha-settings-row>
            <span slot="heading">Register</span>
            <span slot="description"
              >Enable this browser as a Device in Home Assistant</span
            >
            <ha-switch
              .checked=${null===(i=window.browser_mod)||void 0===i?void 0:i.registered}
              @change=${this.toggleRegister}
              .disabled=${(null===(s=window.browser_mod)||void 0===s?void 0:s.browser_locked)||(null===(o=window.browser_mod)||void 0===o?void 0:o.global_settings.autoRegister)||(null===(a=window.browser_mod)||void 0===a?void 0:a.global_settings.lockRegister)||!(null===(n=this.hass.user)||void 0===n?void 0:n.is_admin)}
            ></ha-switch>
          </ha-settings-row>

          <ha-settings-row .narrow=${this.narrow}>
            <span slot="heading">Browser ID</span>
            <span slot="description"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-form
              .hass=${this.hass}
              .schema=${[{name:"browser_id",label:"Browser ID",helper:"Select an existing known Browser ID or enter new",required:!0,selector:{select:{sort:!0,custom_value:!0,mode:"dropdown",options:Object.keys(null===(r=window.browser_mod)||void 0===r?void 0:r.browsers)||[]}}}]}
              .computeLabel=${e=>{var t;return null!==(t=e.label)&&void 0!==t?t:e.name}}
              .computeHelper=${e=>{var t;return null!==(t=e.helper)&&void 0!==t?t:""}}
              .data=${{browser_id:null===(l=window.browser_mod)||void 0===l?void 0:l.browserID}}
              .disabled=${(null===(d=window.browser_mod)||void 0===d?void 0:d.browser_locked)||!(null===(c=this.hass.user)||void 0===c?void 0:c.is_admin)}
              @value-changed=${e=>{var t;const i=e.detail.value.browser_id;i&&i!==(null===(t=window.browser_mod)||void 0===t?void 0:t.browserID)&&(window.browser_mod.browserID=i,this.dirty=!0)}}
            >
            </ha-form>
          </ha-settings-row>

          ${(null===(h=window.browser_mod)||void 0===h?void 0:h.registered)?K`
                ${this._renderSuspensionAlert()}
                <ha-settings-row>
                  <span slot="heading">Enable camera</span>
                  <span slot="description"
                    >Get camera input from this browser (hardware
                    dependent)</span
                  >
                  <ha-switch
                    .checked=${null===(u=window.browser_mod)||void 0===u?void 0:u.cameraEnabled}
                    @change=${this.toggleCameraEnabled}
                    .disabled=${null===(p=window.browser_mod)||void 0===p?void 0:p.browser_locked}
                  ></ha-switch>
                </ha-settings-row>
                ${(null===(b=window.browser_mod)||void 0===b?void 0:b.cameraError)?K`
                      <ha-alert alert-type="error">
                        Setting up the device camera failed. Make sure you are browsing
                        in a secure (https://) context and have
                        allowed use of the camera in your browser.
                      </ha-alert>
                    `:""}
                ${this._renderInteractionAlert()}
                ${this._renderFKBSettingsInfo()}
              `:""}
        </div>
      </ha-card>
    `}_renderSuspensionAlert(){return this.hass.suspendWhenHidden?K`
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
    `:K``}_renderInteractionAlert(){return K`
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
    `}_renderFKBSettingsInfo(){var e,t;return(null===(e=window.browser_mod)||void 0===e?void 0:e.fully)&&this.getFullySettings()?K`
      ${(null===(t=window.browser_mod)||void 0===t?void 0:t.fully)&&this.getFullySettings()?K` <ha-alert title="FullyKiosk Browser">
            You are using FullyKiosk Browser. It is recommended to enable the
            following settings:
            <ul>
              ${this.getFullySettings()}
            </ul>
          </ha-alert>`:""}
    `:K``}getFullySettings(){if(!window.browser_mod.fully)return null;const e=[],t=[];"true"!==window.fully.getBooleanSetting("autoplayVideos")&&t.push(K`<li>Autoplay Videos</li>`),"true"!==window.fully.getBooleanSetting("autoplayAudio")&&t.push(K`<li>Autoplay Audio</li>`),"true"!==window.fully.getBooleanSetting("webcamAccess")&&t.push(K`<li>Enable Webcam Access (PLUS)</li>`),0!==t.length&&e.push(K`<li>Web Content Settings</li>
        <ul>
          ${t}
        </ul>`),"true"!==window.fully.getBooleanSetting("websiteIntegration")&&e.push(K`<li>Advanced Web Settings</li>
        <ul>
          <li>Enable JavaScript Interface (PLUS)</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("keepScreenOn")&&e.push(K`<li>Device Management</li>
        <ul>
          <li>Keep Screen On</li>
        </ul>`),"true"!==window.fully.getBooleanSetting("preventSleepWhileScreenOff")&&e.push(K`<li>Power Settings</li>
        <ul>
          <li>Prevent from Sleep while Screen Off</li>
        </ul>`);const i=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&i.push(K`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&i.push(K`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&i.push(K`<li>Exit Screensaver on Motion</li>`),0!==i.length&&e.push(K`<li>Motion Detection (PLUS)</li>
        <ul>
          ${i}
        </ul>`),"true"!==window.fully.getBooleanSetting("remoteAdmin")&&e.push(K`<li>Remote Administration (PLUS)</li>
        <ul>
          <li>Enable Remote Administration</li>
        </ul>`),e.length?e:null}static get styles(){return n`
      .card-header {
        display: flex;
        justify-content: space-between;
      }
      ha-textfield {
        display: block;
        margin-top: 8px;
      }
    `}};e([ce()],Se.prototype,"hass",void 0),e([ce()],Se.prototype,"dirty",void 0),e([ce({type:Boolean})],Se.prototype,"narrow",void 0),customElements.define("browser-mod-browser-settings-card",Se);class xe extends ne{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>this.requestUpdate()),this._fetch_entity_registry()}async _fetch_entity_registry(){this._entity_registry||(this._entity_registry=await this.hass.callWS({type:"config/device_registry/list"}))}_find_entity(e){if(this._entity_registry)return this._entity_registry.find(t=>{var i;return JSON.stringify(null===(i=null==t?void 0:t.identifiers)||void 0===i?void 0:i[0])===JSON.stringify(["browser_mod",e])})}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup({title:"Unregister browser",content:`Are you sure you want to unregister Browser ${t}?`,right_button:"Unregister",right_button_variant:"danger",right_button_appearance:"accent",right_button_action:()=>{t===window.browser_mod.browserID?window.browser_mod.registered=!1:window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}toggle_lock_browser(e){const t=e.currentTarget.browserID,i=window.browser_mod.browsers[t];window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:t,data:Object.assign(Object.assign({},i),{locked:!i.locked})})}toggle_auto_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.autoRegister)?window.browser_mod.setSetting("global",null,{autoRegister:void 0}):window.browser_mod.setSetting("global",null,{autoRegister:!0})}toggle_lock_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.lockRegister)?window.browser_mod.setSetting("global",null,{lockRegister:void 0}):window.browser_mod.setSetting("global",null,{lockRegister:!0,autoRegister:void 0})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){var e,t;return K`
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

          ${Object.keys(window.browser_mod.browsers).map(e=>{const t=window.browser_mod.browsers[e],i=this._find_entity(e);return K` <ha-settings-row>
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
              ${i?K`
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
            </ha-settings-row>`})}
        </div>
        ${void 0===window.browser_mod.browsers.CAST?K`
              <div class="card-actions">
                <ha-button
                  appearance="plain"
                  @click=${this.register_cast}  
                >
                  Register CAST Browser
                </ha-button>
              </div>
            `:""}
      </ha-card>
    `}static get styles(){return n`
      ha-icon-button > * {
        display: flex;
        color: var(--primary-text-color);
      }
    `}}e([ce()],xe.prototype,"hass",void 0),e([ce()],xe.prototype,"_entity_registry",void 0),customElements.define("browser-mod-registered-browsers-card",xe);class Ae{constructor(e){this._element=e,customElements.get("dialog-edit-sidebar")?this._dialogAvaliable=!0:(this._dialogAvaliable=!1,fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar").then(e=>{if(e&&void 0===e.editMode){const t=e.shadowRoot.querySelector("div.menu");t&&(e.addEventListener("show-dialog",e=>{var t,i,s;"dialog-edit-sidebar"===(null===(t=e.detail)||void 0===t?void 0:t.dialogTag)&&(e.stopPropagation(),null===(s=null===(i=e.detail)||void 0===i?void 0:i.dialogImport)||void 0===s||s.call(i))},{once:!0}),t.dispatchEvent(new CustomEvent("action",{detail:{action:"hold"}})))}}),customElements.whenDefined("dialog-edit-sidebar").then(async()=>{this._dialogAvaliable=!0,await this._element.updateComplete.then(()=>this._element.requestUpdate())}))}get dialogAvaliable(){return this._dialogAvaliable}get order(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,"sidebarPanelOrder");return"global"===this._type?i.global||"[]":i[this._type][this._target]||"[]"}get hidden(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,"sidebarHiddenPanels");return"global"===this._type?i.global||"[]":i[this._type][this._target]||"[]"}async setupDialog(){var e;if(!this._dialogAvaliable)return;this._dialogEditSidebar=document.createElement("dialog-edit-sidebar");const t=await ye();t&&this._dialogEditSidebar&&(await async function(e){(await ye()).provideHass(e)}(this._dialogEditSidebar),this._dialogEditSidebar._order=JSON.parse(this.order),this._dialogEditSidebar._hidden=JSON.parse(this.hidden),t.shadowRoot.appendChild(this._dialogEditSidebar),this._dialogEditSidebar._open=!0,this._dialogEditSidebar.focus(),window.addEventListener("popstate",async e=>{var t,i;const s=null===(t=e.state)||void 0===t?void 0:t.sidebarSettingsCustomSelector;s&&(s.open||(null===(i=this._dialogEditSidebar)||void 0===i?void 0:i._open)&&await this._dialogEditSidebar.closeDialog())}),void 0===(null===(e=history.state)||void 0===e?void 0:e.sidebarSettingsCustomSelector)&&history.replaceState({sidebarSettingsCustomSelector:{open:!1}},""),history.pushState({sidebarSettingsCustomSelector:{open:!0}},""),this._dialogEditSidebar.addEventListener("dialog-closed",e=>{var t;"dialog-edit-sidebar"==(null===(t=e.detail)||void 0===t?void 0:t.dialog)&&this._dialogEditSidebar&&(this._dialogEditSidebar.remove(),this._dialogEditSidebar=void 0)}))}async customiseDialog(){var e;if(!this._dialogEditSidebar)return;let t,i=0;for(;!t&&i++<5;)t=this._dialogEditSidebar.shadowRoot.querySelector("ha-wa-dialog"),t||await new Promise(e=>setTimeout(e,500));await(null==t?void 0:t.updateComplete);const s=await fe(this._dialogEditSidebar.shadowRoot,"ha-wa-dialog $ ha-dialog-header");if(s){const t=document.createElement("style");s.append(t);const i="global"===this._type?"Global":this._type.charAt(0).toUpperCase()+this._type.slice(1)+" - ";let o="";if("user"===this._type){for(const e of this._allUsers)if(e.id===this._target){o=e.name;break}}else o=null!==(e=this._target)&&void 0!==e?e:"";t.innerHTML=`\n        slot[name="headerActionItems"] {\n          display: none;\n        }\n        span[slot="subtitle"] {\n          display: none;\n        }\n        .title::after {\n          content: "- ${i}${o}";\n        }\n      `}}async setupSaveHandler(){if(!this._dialogEditSidebar)return;let e,t=0;for(;!e&&t++<5;)e=this._dialogEditSidebar.shadowRoot.querySelector("ha-wa-dialog"),e||await new Promise(e=>setTimeout(e,500));await(null==e?void 0:e.updateComplete);const i=this._dialogEditSidebar.shadowRoot.querySelector('ha-wa-dialog > ha-dialog-footer > ha-button[slot="primaryAction"]');if(i){const e=i.shadowRoot.querySelector("button");e&&e.addEventListener("click",e=>{e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),this._dialogEditSidebar.dispatchEvent(new CustomEvent("sidebar-settings-save"))})}}async saveSettings(){if(!this._dialogEditSidebar)return;const e=this._dialogEditSidebar._order,t=this._dialogEditSidebar._hidden;window.browser_mod.setSetting(this._type,this._target,{sidebarHiddenPanels:JSON.stringify(t),sidebarPanelOrder:JSON.stringify(e)}),this._dialogEditSidebar.closeDialog()}async changeSetting(e,t,i){var s,o;this.dialogAvaliable?(this._type=e,this._target=t,this._allUsers=i,await this.setupDialog(),await this.customiseDialog(),await this.setupSaveHandler(),this._dialogEditSidebar.addEventListener("sidebar-settings-save",async()=>{this.saveSettings()})):null===(o=null===(s=window.browser_mod)||void 0===s?void 0:s.showPopup)||void 0===o||o.call(s,{title:"ERROR!",content:"Sidebar settings dialog unavailable.",right_button:"OK"})}}const Ee=1,Ce=2,ke=e=>(...t)=>({_$litDirective$:e,values:t});let Pe=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const Oe=(e,t)=>{const i=e._$AN;if(void 0===i)return!1;for(const e of i)e._$AO?.(t,!1),Oe(e,t);return!0},Ue=e=>{let t,i;do{if(void 0===(t=e._$AM))break;i=t._$AN,i.delete(e),e=t}while(0===i?.size)},Te=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),He(t)}};function De(e){void 0!==this._$AN?(Ue(this),this._$AM=e,Te(this)):this._$AM=e}function Re(e,t=!1,i=0){const s=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(s))for(let e=i;e<s.length;e++)Oe(s[e],!1),Ue(s[e]);else null!=s&&(Oe(s,!1),Ue(s));else Oe(this,e)}const He=e=>{e.type==Ce&&(e._$AP??=Re,e._$AQ??=De)};class Me extends Pe{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),Te(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Oe(this,e),Ue(this))}setValue(e){if((e=>void 0===e.strings)(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class je{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class Ie{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}}const Ne=e=>!(e=>null===e||"object"!=typeof e&&"function"!=typeof e)(e)&&"function"==typeof e.then,Be=1073741823;const Le=ke(class extends Me{constructor(){super(...arguments),this._$Cwt=Be,this._$Cbt=[],this._$CK=new je(this),this._$CX=new Ie}render(...e){return e.find(e=>!Ne(e))??z}update(e,t){const i=this._$Cbt;let s=i.length;this._$Cbt=t;const o=this._$CK,a=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){const n=t[e];if(!Ne(n))return this._$Cwt=e,n;e<s&&n===i[e]||(this._$Cwt=Be,s=0,Promise.resolve(n).then(async e=>{for(;a.get();)await a.get();const t=o.deref();if(void 0!==t){const i=t._$Cbt.indexOf(n);i>-1&&i<t._$Cwt&&(t._$Cwt=i,t.setValue(e))}}))}return z}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}),Ke=ke(class extends Pe{constructor(e){if(super(e),e.type!==Ee||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const s=!!t[e];s===this.st.has(e)||this.nt?.has(e)||(s?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return z}});let ze;class Fe extends ne{constructor(){super(...arguments),this.settingSelector={template:{}},this.tableData=[],this._tableFirstUpdate=null,this._tableUpdate=new Promise(e=>{this._tableFirstUpdate=e}),this._tableFirstDisplay=null,this._tableDisplay=new Promise(e=>{this._tableFirstDisplay=e}),this.updateTableDebounced=((e,t,i=!1)=>{let s;const o=(...o)=>{const a=i&&!s;clearTimeout(s),s=window.setTimeout(()=>{s=void 0,e(...o)},t),a&&e(...o)};return o.cancel=()=>{clearTimeout(s)},o})(()=>this.updateTable(),1e3)}showTable(){var e;null===(e=this._tableFirstDisplay)||void 0===e||e.call(this),this._tableFirstDisplay=null}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>{this.updateTableDebounced()})}shouldUpdate(e){if(e.has("settingKey"))return!0;if(e.has("tableData")){const t=e.get("tableData");if(void 0===t&&void 0!==this.tableData&&this.tableData.length>0)return!0;if(Array.isArray(t)&&Array.isArray(this.tableData)&&!$e(t,this.tableData))return!0}return!1}updated(e){(e.has("settingKey")||e.has("hass")&&void 0===e.get("hass"))&&this.updateTableDebounced()}async fetchUsers(){return void 0===ze&&(ze=this.hass.callWS({type:"config/auth/list"})),ze}clearSetting(e,t){var i;null===(i=window.browser_mod)||void 0===i||i.showPopup({title:"Are you sure",content:"Do you wish to clear this setting?",right_button:"Clear",right_button_variant:"danger",right_button_appearance:"accent",right_button_action:async()=>{if("sidebarPanelOrder"===this.settingKey)return await fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"),window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:"[]",sidebarPanelOrder:"[]"}),void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:void 0,sidebarPanelOrder:void 0});this.default&&window.browser_mod.setSetting(e,t,{[this.settingKey]:this.default}),window.browser_mod.setSetting(e,t,{[this.settingKey]:void 0})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}async changeSetting(e,t){var i;if(this.settingSelector.custom){const s=await this.fetchUsers();null===(i=this.settingSelector.custom)||void 0===i||i.changeSetting(e,t,s)}else this.changeSettingForm(e,t)}changeSettingForm(e,t){var i,s,o,a,n,r,l;const d=null===(s=null===(i=window.browser_mod)||void 0===i?void 0:i.getSetting)||void 0===s?void 0:s.call(i,this.settingKey),c=null!==(o="global"===e?d.global:d[e][t])&&void 0!==o?o:this.default,h=null!==(n=null!==(a=this.settingSelector.plaintext)&&void 0!==a?a:this.settingSelector.schema)&&void 0!==n?n:[{name:"value",label:null!==(r=this.settingSelector.label)&&void 0!==r?r:"",default:c,selector:this.settingSelector}];if(this.settingSelector.schema&&void 0!==c){function u(e,t){for(const i of e)i.schema?u(i.schema,t):void 0!==t[i.name]&&(i.default=t[i.name])}u(h,c)}null===(l=window.browser_mod)||void 0===l||l.showPopup({title:"Change setting",content:h,right_button:"Save",right_button_variant:"brand",right_button_appearance:"accent",right_button_action:async i=>{var s;if("sidebarPanelOrder"===this.settingKey){const i=await fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");return void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:JSON.stringify(i._hiddenPanels),sidebarPanelOrder:JSON.stringify(i._panelOrder)})}let o=null!==(s=i.value)&&void 0!==s?s:i;window.browser_mod.setSetting(e,t,{[this.settingKey]:o})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}addBrowserSetting(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),s=window.browser_mod._data.browsers,o=[];for(const e of Object.keys(s))null==i.browser[e]&&o.push(e);0!==o.length?window.browser_mod.showPopup({title:"Select browser to configure",content:[{name:"browser",label:"",selector:{select:{options:o}}}],right_button:"Next",right_button_action:e=>this.changeSetting("browser",e.browser),right_button_variant:"brand",right_button_appearance:"filled",left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"}):window.browser_mod.showPopup({title:"No browsers to configure",content:"All registered browsers have already been configured.",right_button:"OK"})}async addUserSetting(){var e,t;const i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),s=await this.fetchUsers(),o=[];for(const e of s)e.system_generated||null!=i.user[e.id]||o.push({label:e.name,value:e.id});0!==o.length?window.browser_mod.showPopup({title:"Select user to configure",content:[{name:"user",label:"",selector:{select:{options:o}}}],right_button:"Next",right_button_variant:"brand",right_button_appearance:"filled",right_button_action:e=>this.changeSetting("user",e.user),left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"}):window.browser_mod.showPopup({title:"No users to configure",content:"All users have already been configured.",right_button:"OK"})}async updateTable(){var e,t,i,s,o,a;if(void 0===this.hass)return;const n=await this.fetchUsers(),r=null!==(i=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey))&&void 0!==i?i:{global:void 0,browser:{},user:{}},l=[];for(const[e,t]of Object.entries(null!==(s=r.user)&&void 0!==s?s:{})){const i=n.find(t=>t.id===e);if(!i)continue;let s="object"==typeof t?"Config":String(t);s.length>=20&&(s=s.slice(0,20)+"..."),l.push({name:`User: ${i.name}`,value:s,controls:K`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("user",e)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("user",e)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}l.push({name:"",value:K`
        <ha-button 
          appearance="plain"
          @click=${()=>this.addUserSetting()}>
            <ha-icon 
              slot="start" 
              .icon=${"mdi:plus"}>
            </ha-icon>
            Add user setting
        </ha-button>
      `});for(const[e,t]of Object.entries(null!==(o=r.browser)&&void 0!==o?o:{})){let i="object"==typeof t?"Config":String(t);i.length>=20&&(i=i.slice(0,20)+"..."),l.push({name:`Browser: ${e}`,value:i,controls:K`
          <div>
            <ha-icon-button @click=${()=>this.changeSetting("browser",e)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${()=>this.clearSetting("browser",e)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `})}l.push({name:"",value:K`
        <ha-button
          appearance="plain" 
          @click=${()=>this.addBrowserSetting()}>
            <ha-icon 
              slot="start" 
              .icon=${"mdi:plus"}>
            </ha-icon>
            Add browser setting
        </ha-button>
      `});let d=r.global;null!=d&&("object"==typeof r.global?d="Config":(d=String(r.global),d.length>=20&&(d=d.slice(0,20)+"..."))),l.push({name:"GLOBAL",value:null!=d?d:K`<span style="color: var(--warning-color);">DEFAULT</span>`,controls:K`
        <div>
          <ha-icon-button @click=${()=>this.changeSetting("global",null)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${()=>this.clearSetting("global",null)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        </div>
      `}),this.tableData=l,null===(a=this._tableFirstUpdate)||void 0===a||a.call(this),this._tableFirstUpdate=null}_renderTable(){return Promise.all([this._tableUpdate,this._tableDisplay]).then(()=>this._render())}_renderRow(e,t,i){return K`
      <div
        aria-rowindex=${t+2}
        role="row"
        class="mdc-data-table__row"
      >
      ${Object.entries(i).map(([t,i])=>K`
          <div
            role="cell"
            class="mdc-data-table__cell ${Ke({"mdc-data-table__cell--flex":"flex"===i.type,"mdc-data-table__cell--numeric":"numeric"===i.type,"mdc-data-table__cell--icon":"icon"===i.type,"mdc-data-table__cell--icon-button":"icon-button"===i.type,"mdc-data-table__cell--overflow-menu":"overflow-menu"===i.type,"mdc-data-table__cell--overflow":"overflow"===i.type})}"
          >
            ${e[t]}
          </div>
        `)}
      </div>
    `}_render(){const e={name:{title:"Name",grows:!0},value:{title:"Value",grows:!0,type:"overflow"},controls:{}};return K`
      <div class="table-container">
        <div class="mdc-data-table">
          <div
            role="table"
            aria-rowcount=${this.tableData.length+1}
          >
            <div
              class="mdc-data-table__header-row"
              role="row"
              aria-rowindex="1"
            >
            ${Object.entries(e).map(([e,t])=>{const i={"mdc-data-table__header-cell--numeric":"numeric"===t.type,"mdc-data-table__header-cell--icon":"icon"===t.type,"mdc-data-table__header-cell--icon-button":"icon-button"===t.type,"mdc-data-table__header-cell--overflow-menu":"overflow-menu"===t.type,"mdc-data-table__header-cell--overflow":"overflow"===t.type};return K`
                <div
                  class="mdc-data-table__header-cell ${Ke(i)}"
                  role="columnheader"
                  .columnId=${e}
                  title=${(e=>e??F)(t.title)}
                >
                  <span>${t.title}</span>
                </div>
              `})}
            </div>
            ${this.tableData.map((t,i)=>this._renderRow(t,i,e))}
          </div>
        </div>
      </div>
    `}render(){return K`${Le(this._renderTable(),K`Loading...`)}`}static get styles(){return n`
      .table-container {
        height: 100%;
      }
      .mdc-data-table__content {
        font-family: var(--ha-font-family-body);
        -moz-osx-font-smoothing: var(--ha-moz-osx-font-smoothing);
        -webkit-font-smoothing: var(--ha-font-smoothing);
        font-size: 0.875rem;
        line-height: var(--ha-line-height-condensed);
        font-weight: var(--ha-font-weight-normal);
        letter-spacing: 0.0178571429em;
        text-decoration: inherit;
        text-transform: inherit;
      }

      .mdc-data-table {
        background-color: var(--data-table-background-color);
        border-radius: var(--ha-border-radius-sm);
        border-width: 1px;
        border-style: solid;
        border-color: var(--divider-color);
        display: inline-flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
      }

      .mdc-data-table__row--selected {
        background-color: rgba(var(--rgb-primary-color), 0.04);
      }

      .mdc-data-table__row {
        display: flex;
        height: var(--data-table-row-height, 52px);
        width: var(--table-row-width, 100%);
      }

      .mdc-data-table__row.empty-row {
        height: var(
          --data-table-empty-row-height,
          var(--data-table-row-height, 52px)
        );
      }

      .mdc-data-table__row ~ .mdc-data-table__row {
        border-top: 1px solid var(--divider-color);
      }

      .mdc-data-table__row.clickable:not(
          .mdc-data-table__row--selected
        ):hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.04);
      }

      .mdc-data-table__header-cell {
        color: var(--primary-text-color);
      }

      .mdc-data-table__cell {
        color: var(--primary-text-color);
      }

      .mdc-data-table__header-row {
        height: 56px;
        display: flex;
        border-bottom: 1px solid var(--divider-color);
        overflow: auto;
      }

      /* Hide scrollbar for Chrome, Safari and Opera */
      .mdc-data-table__header-row::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbar for IE, Edge and Firefox */
      .mdc-data-table__header-row {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }

      .mdc-data-table__cell,
      .mdc-data-table__header-cell {
        padding-right: 16px;
        padding-left: 16px;
        min-width: 150px;
        align-self: center;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 0;
        box-sizing: border-box;
      }

      .mdc-data-table__cell.mdc-data-table__cell--flex {
        display: flex;
        overflow: initial;
      }

      .mdc-data-table__cell.mdc-data-table__cell--icon {
        overflow: initial;
      }

      .mdc-data-table__header-cell--checkbox,
      .mdc-data-table__cell--checkbox {
        /* @noflip */
        padding-left: 16px;
        /* @noflip */
        padding-right: 0;
        /* @noflip */
        padding-inline-start: 16px;
        /* @noflip */
        padding-inline-end: initial;
        width: 60px;
        min-width: 60px;
      }

      .mdc-data-table__table {
        height: 100%;
        width: 100%;
        border: 0;
        white-space: nowrap;
        position: relative;
      }

      .mdc-data-table__cell {
        font-family: var(--ha-font-family-body);
        -moz-osx-font-smoothing: var(--ha-moz-osx-font-smoothing);
        -webkit-font-smoothing: var(--ha-font-smoothing);
        font-size: 0.875rem;
        line-height: var(--ha-line-height-condensed);
        font-weight: var(--ha-font-weight-normal);
        letter-spacing: 0.0178571429em;
        text-decoration: inherit;
        text-transform: inherit;
        flex-grow: 0;
        flex-shrink: 0;
      }

      .mdc-data-table__cell a {
        color: inherit;
        text-decoration: none;
      }

      .mdc-data-table__cell--numeric {
        text-align: var(--float-end);
      }

      .mdc-data-table__cell--icon {
        color: var(--secondary-text-color);
        text-align: center;
      }

      .mdc-data-table__header-cell--icon,
      .mdc-data-table__cell--icon {
        min-width: 64px;
        flex: 0 0 64px !important;
      }

      .mdc-data-table__cell--icon img {
        width: 24px;
        height: 24px;
      }

      .mdc-data-table__header-cell.mdc-data-table__header-cell--icon {
        text-align: center;
      }

      .mdc-data-table__header-cell.sortable.mdc-data-table__header-cell--icon:hover,
      .mdc-data-table__header-cell.sortable.mdc-data-table__header-cell--icon:not(
          .not-sorted
        ) {
        text-align: var(--float-start);
      }

      .mdc-data-table__cell--icon:first-child img,
      .mdc-data-table__cell--icon:first-child ha-icon,
      .mdc-data-table__cell--icon:first-child ha-svg-icon,
      .mdc-data-table__cell--icon:first-child ha-state-icon,
      .mdc-data-table__cell--icon:first-child ha-domain-icon,
      .mdc-data-table__cell--icon:first-child ha-service-icon {
        margin-left: 8px;
        margin-inline-start: 8px;
        margin-inline-end: initial;
      }

      .mdc-data-table__cell--icon:first-child state-badge {
        margin-right: -8px;
        margin-inline-end: -8px;
        margin-inline-start: initial;
      }

      .mdc-data-table__cell--overflow-menu,
      .mdc-data-table__header-cell--overflow-menu,
      .mdc-data-table__header-cell--icon-button,
      .mdc-data-table__cell--icon-button {
        min-width: 64px;
        flex: 0 0 64px !important;
        padding: 8px;
      }

      .mdc-data-table__header-cell--icon-button,
      .mdc-data-table__cell--icon-button {
        min-width: 56px;
        width: 56px;
      }

      .mdc-data-table__cell--overflow-menu,
      .mdc-data-table__cell--icon-button {
        color: var(--secondary-text-color);
        text-overflow: clip;
      }

      .mdc-data-table__header-cell--icon-button:first-child,
      .mdc-data-table__cell--icon-button:first-child,
      .mdc-data-table__header-cell--icon-button:last-child,
      .mdc-data-table__cell--icon-button:last-child {
        width: 64px;
      }

      .mdc-data-table__cell--overflow-menu:first-child,
      .mdc-data-table__header-cell--overflow-menu:first-child,
      .mdc-data-table__header-cell--icon-button:first-child,
      .mdc-data-table__cell--icon-button:first-child {
        padding-left: 16px;
        padding-inline-start: 16px;
        padding-inline-end: initial;
      }

      .mdc-data-table__cell--overflow-menu:last-child,
      .mdc-data-table__header-cell--overflow-menu:last-child,
      .mdc-data-table__header-cell--icon-button:last-child,
      .mdc-data-table__cell--icon-button:last-child {
        padding-right: 16px;
        padding-inline-end: 16px;
        padding-inline-start: initial;
      }
      .mdc-data-table__cell--overflow-menu,
      .mdc-data-table__cell--overflow,
      .mdc-data-table__header-cell--overflow-menu,
      .mdc-data-table__header-cell--overflow {
        overflow: initial;
      }
      .mdc-data-table__cell--icon-button a {
        color: var(--secondary-text-color);
      }

      .mdc-data-table__header-cell {
        font-family: var(--ha-font-family-body);
        -moz-osx-font-smoothing: var(--ha-moz-osx-font-smoothing);
        -webkit-font-smoothing: var(--ha-font-smoothing);
        font-size: var(--ha-font-size-s);
        line-height: var(--ha-line-height-normal);
        font-weight: var(--ha-font-weight-medium);
        letter-spacing: 0.0071428571em;
        text-decoration: inherit;
        text-transform: inherit;
        text-align: var(--float-start);
      }

      .mdc-data-table__header-cell--numeric {
        text-align: var(--float-end);
      }
      .mdc-data-table__header-cell--numeric.sortable:hover,
      .mdc-data-table__header-cell--numeric.sortable:not(.not-sorted) {
        text-align: var(--float-start);
      }

      /* custom from here */

      .group-header {
        padding-top: 12px;
        height: var(--data-table-row-height, 52px);
        padding-left: 12px;
        padding-inline-start: 12px;
        padding-inline-end: initial;
        width: 100%;
        font-weight: var(--ha-font-weight-medium);
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color: var(--primary-background-color);
      }

      .group-header ha-icon-button {
        transition: transform 0.2s ease;
      }

      .group-header ha-icon-button.collapsed {
        transform: rotate(180deg);
      }

      .table-container {
        display: block;
      }

      .mdc-data-table {
        display: block;
        border-width: var(--data-table-border-width, 1px);
        height: 100%;
      }
      .mdc-data-table__header-cell {
        overflow: hidden;
        position: relative;
      }
      .mdc-data-table__header-cell span {
        position: relative;
        left: 0px;
        inset-inline-start: 0px;
        inset-inline-end: initial;
      }

      .mdc-data-table__header-cell.sortable {
        cursor: pointer;
      }
      .mdc-data-table__header-cell > * {
        transition: var(--float-start) 0.2s ease;
      }
      .mdc-data-table__header-cell--numeric > span {
        transition: none;
      }
      .mdc-data-table__header-cell ha-svg-icon {
        top: -3px;
        position: absolute;
      }
      .mdc-data-table__header-cell.not-sorted ha-svg-icon {
        left: -20px;
        inset-inline-start: -20px;
        inset-inline-end: initial;
      }
      .mdc-data-table__header-cell.sortable:not(.not-sorted) span,
      .mdc-data-table__header-cell.sortable.not-sorted:hover span {
        left: 24px;
        inset-inline-start: 24px;
        inset-inline-end: initial;
      }
      .mdc-data-table__header-cell.sortable:not(.not-sorted) ha-svg-icon,
      .mdc-data-table__header-cell.sortable:hover.not-sorted ha-svg-icon {
        left: 12px;
        inset-inline-start: 12px;
        inset-inline-end: initial;
      }
      .table-header {
        border-bottom: 1px solid var(--divider-color);
      }
      search-input {
        display: block;
        flex: 1;
        --mdc-text-field-fill-color: var(--sidebar-background-color);
        --mdc-text-field-idle-line-color: transparent;
      }
      slot[name="header"] {
        display: block;
      }
      .center {
        text-align: center;
      }
      .secondary {
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .scroller {
        height: calc(100% - 57px);
        overflow: overlay !important;
      }

      .mdc-data-table__table.auto-height .scroller {
        overflow-y: hidden !important;
      }
      .grows {
        flex-grow: 1;
        flex-shrink: 1;
      }
      .forceLTR {
        direction: ltr;
      }
      .clickable {
        cursor: pointer;
      }
      lit-virtualizer {
        contain: size layout !important;
        overscroll-behavior: contain;
      }
    `}}e([ce()],Fe.prototype,"settingKey",void 0),e([ce()],Fe.prototype,"settingSelector",void 0),e([ce()],Fe.prototype,"hass",void 0),e([ce()],Fe.prototype,"default",void 0),e([ce()],Fe.prototype,"tableData",void 0),customElements.define("browser-mod-settings-table",Fe),(async()=>{var e,t,i,s,o,a,n;await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const r=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==r?void 0:r.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t));const l=document.createElement("developer-tools-router");await(null===(n=null===(a=null===(o=null===(s=null==l?void 0:l.routerOptions)||void 0===s?void 0:s.routes)||void 0===o?void 0:o.template)||void 0===a?void 0:a.load)||void 0===n?void 0:n.call(a)),await customElements.whenDefined("developer-tools-template")})();class qe extends ne{constructor(){super(...arguments),this._dashboards=[],this._panels={},this._editSidebar=!1,this._hassUserHasSidebarSettings=!1,this._savedSidebar={panelOrder:[],hiddenPanels:[]}}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>this.requestUpdate()),this._sidebarSettingsCustomSelector=new Ae(this)}updated(e){e.has("hass")&&void 0===e.get("hass")&&(async()=>{this._dashboards=await this.hass.callWS({type:"lovelace/dashboards/list"}),this._panels=this.hass.panels,this.checkHassUserSidebarSettings()})()}expandedChanged(e){if(e.detail.expanded){const t=e.target;null==t||t.updateComplete.then(()=>{const e=null==t?void 0:t.querySelector("browser-mod-settings-table");null==e||e.showTable()})}}async checkHassUserSidebarSettings(){var e,t;const i=await(null===(e=this.hass)||void 0===e?void 0:e.callWS({type:"frontend/get_user_data",key:"sidebar"}));this._hassUserHasSidebarSettings=i&&(null===(t=i.value)||void 0===t?void 0:t.panelOrder)}async clearHassUserSidebarSettings(){var e;null===(e=window.browser_mod)||void 0===e||e.showPopup({title:"Sidebar settings",content:"Clear sidebar settings synced in this user's Home Assistant profile?",right_button:"Clear",right_button_variant:"danger",right_button_appearance:"accent",right_button_action:()=>{var e;this.hass.callWS({type:"frontend/set_user_data",key:"sidebar",value:{}}),this.checkHassUserSidebarSettings(),null===(e=window.browser_mod)||void 0===e||e.showPopup({title:"Sidebar settings",content:"Sidebar settings cleared",right_button:"OK"})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}async toggleEditSidebar(){var e,t;const i=await fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");i.editMode=!i.editMode,this._editSidebar=i.editMode,this._editSidebar?this._savedSidebar={panelOrder:i._panelOrder,hiddenPanels:i._hiddenPanels}:(i._panelOrder=null!==(e=this._savedSidebar.panelOrder)&&void 0!==e?e:[],i._hiddenPanels=null!==(t=this._savedSidebar.hiddenPanels)&&void 0!==t?t:[],this._savedSidebar={panelOrder:[],hiddenPanels:[]})}_toggle_afj(){window.setTimeout(()=>{var e;const t=this.shadowRoot.querySelector("#afj");if(t.checked=!0,t.count=(null!==(e=t.count)&&void 0!==e?e:0)+1,t.count&&t.count>5){t.disabled=!0,this.shadowRoot.querySelector("#afj_heading");this.shadowRoot.querySelector("#afj_description").innerHTML="Something went wrong. Please try again later."}},500+2500*Math.random())}render(){var e,t,i;const s=this._dashboards.map(e=>({value:e.url_path,label:e.title})),o={select:{options:[{value:"lovelace",label:"lovelace (default)"},...s],custom_value:!0}},a=Object.values(this._panels).filter(e=>!!e.title).map(e=>{var t,i;return{value:e.url_path,label:(null===(i=(t=this.hass).localize)||void 0===i?void 0:i.call(t,`panel.${e.title}`))||e.title}}),n=[{value:"lovelace",label:(null===(t=(e=this.hass).localize)||void 0===t?void 0:t.call(e,"panel.states"))||"lovelace (default)"},...a];return K`
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

          ${3==(new Date).getMonth()&&(new Date).getDate()<8?K`
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
            @expanded-changed=${this.expandedChanged}
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
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"faviconTemplate"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Kiosk mode"}
            .secondary=${"Use Home Assistant in kiosk mode."}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"kioskMode"}
              .settingSelector=${{boolean:{},label:"Kiosk mode"}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Hide sidebar"}
            .secondary=${"Hide sidebar and remove sidebar menu icon from all panels."}
            @expanded-changed=${this.expandedChanged}
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
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideHeader"}
              .settingSelector=${{boolean:{},label:"Hide header"}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Overlay icon"}
            .secondary=${"An overlay icon with action to show on selected panels."}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"overlayIcon"}
              .settingSelector=${{schema:[{name:"icon",label:"Icon",selector:{icon:{}}},{name:"title",label:"Title",selector:{text:{}}},{name:"action",label:"Action",selector:{object:{}}},{name:"panels",label:"Show on panels",selector:{select:{multiple:!0,options:n,mode:"dropdown"}}},{type:"grid",schema:[{name:"top",label:"Top (px)",selector:{number:{}}},{name:"left",label:"Left (px)",selector:{number:{}}},{name:"bottom",label:"Bottom (px)",selector:{number:{}}},{name:"right",label:"Right (px)",selector:{number:{}}}]},{name:"class",label:"Class",selector:{text:{}}},{name:"style",label:"CSS style",selector:{text:{multiline:!0}}}]}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default dashboard"}
            .secondary=${`The dashboard that is shown when navigating to ${location.origin}`}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultPanel"}
              .settingSelector=${o}
              .default=${"lovelace"}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default action"}
            .secondary=${"Home Assistant action that executes when browser is opened or refreshed."}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultAction"}
              .settingSelector=${{object:{}}}
              .default=${{}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          ${(null===(i=this._sidebarSettingsCustomSelector)||void 0===i?void 0:i.dialogAvaliable)?K`
            <ha-expansion-panel
              .header=${"Sidebar order"}
              .secondary=${"Order and visibility of sidebar items."}
              @expanded-changed=${this.expandedChanged}
              leftChevron
            >
              ${this._hassUserHasSidebarSettings?K`
                <ha-settings-row>
                  <span slot="heading">Sidebar user settings</span>
                  <div slot="description" style="display: flex;">
                    <span>
                    This user has sidebar settings synced to Home Assistant user profile. 
                    It is recommend to clear these settings to allow Browser Mod settings to 
                    take precedence. To check other Home Assistant users, login as that user
                    and check back at this panel.
                    </span>
                    <ha-button
                      variant="danger"
                      appearance="filled"
                      @click=${()=>this.clearHassUserSidebarSettings()}
                    >Clear</ha-button>
                  </div>
                </ha-settings-row>`:""}
              <browser-mod-settings-table
                .hass=${this.hass}
                .settingKey=${"sidebarPanelOrder"}
                .settingSelector=${{custom:this._sidebarSettingsCustomSelector}}
                .default=${"lovelace"}
              ></browser-mod-settings-table>
            </ha-expansion-panel>`:K`
          <ha-expansion-panel
            .header=${"Sidebar order"}
            .secondary=${"Order and visibility of sidebar items."}
            @expanded-changed=${this.expandedChanged}
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
              <ha-button
                appearance="plain"
                @click=${()=>this.toggleEditSidebar()}>
                  ${this._editSidebar?"Restore":"Edit"}
              </ha-button>
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
            @expanded-changed=${this.expandedChanged}
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
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"hideInteractIcon"}
              .settingSelector=${{boolean:{},label:"Hide interaction icon"}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Full user interaction"}
            .secondary=${"Use full user interaction if required."}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"fullInteraction"}
              .settingSelector=${{boolean:{},label:"Use full user interaction"}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Save screen state"}
            .secondary=${"Save screen state when browser is disconnected"}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"saveScreenState"}
              .settingSelector=${{boolean:{},label:"Save screen state"}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>
          <ha-expansion-panel
            .header=${"Camera resolution"}
            .secondary=${"Set the resolution for the camera. Format: width x height (e.g., 1920 x 1080)"}
            @expanded-changed=${this.expandedChanged}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"cameraResolution"}
              .settingSelector=${{text:{}}}
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
    `}}e([ce()],qe.prototype,"hass",void 0),e([he()],qe.prototype,"_dashboards",void 0),e([he()],qe.prototype,"_panels",void 0),e([he()],qe.prototype,"_editSidebar",void 0),e([he()],qe.prototype,"_hassUserHasSidebarSettings",void 0),customElements.define("browser-mod-frontend-settings-card",qe);var We="2.7.2";(async()=>{var e,t,i,s,o,a,n,r,l,d,c,h,u,p,b;await customElements.whenDefined("partial-panel-resolver");const g=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==g?void 0:g.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t)),await customElements.whenDefined("ha-panel-config");const m=document.createElement("ha-panel-config");await(null===(n=null===(a=null===(o=null===(s=null==m?void 0:m.routerOptions)||void 0===s?void 0:s.routes)||void 0===o?void 0:o.dashboard)||void 0===a?void 0:a.load)||void 0===n?void 0:n.call(a)),await(null===(c=null===(d=null===(l=null===(r=null==m?void 0:m.routerOptions)||void 0===r?void 0:r.routes)||void 0===l?void 0:l.general)||void 0===d?void 0:d.load)||void 0===c?void 0:c.call(d)),await(null===(b=null===(p=null===(u=null===(h=null==m?void 0:m.routerOptions)||void 0===h?void 0:h.routes)||void 0===u?void 0:u.entities)||void 0===p?void 0:p.load)||void 0===b?void 0:b.call(p)),await customElements.whenDefined("ha-config-dashboard")})().then(()=>{class t extends ne{firstUpdated(){window.addEventListener("browser-mod-config-update",()=>this.requestUpdate())}render(){var e;return window.browser_mod?K`
        <ha-top-app-bar-fixed>
          <ha-menu-button
            slot="navigationIcon"
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${We})
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
              .narrow=${this.narrow}
            ></browser-mod-browser-settings-card>

            ${(null===(e=this.hass.user)||void 0===e?void 0:e.is_admin)?K`
                  <browser-mod-registered-browsers-card
                    .hass=${this.hass}
                  ></browser-mod-registered-browsers-card>

                  <browser-mod-frontend-settings-card
                    .hass=${this.hass}
                  ></browser-mod-frontend-settings-card>
                `:""}
          </ha-config-section>
        </ha-top-app-bar-fixed>
      `:K``}static get styles(){var e,t;return[...null!==(t=null===(e=customElements.get("ha-config-dashboard"))||void 0===e?void 0:e.styles)&&void 0!==t?t:[],n`
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
        `]}}e([ce()],t.prototype,"hass",void 0),e([ce()],t.prototype,"narrow",void 0),e([ce()],t.prototype,"connection",void 0),customElements.define("browser-mod-panel",t)});
