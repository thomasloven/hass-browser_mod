function e(e,t,s,i){var o,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,s,r):o(t,s))||r);return n>3&&r&&Object.defineProperty(t,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new n(s,e,i)},a=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,b=g.trustedTypes,w=b?b.emptyScript:"",m=g.reactiveElementPolyfillSupport,v=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?w:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},f=(e,t)=>!l(e,t),y={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);o?.call(this,t),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...c(e),...u(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(t,s.type);this._$Em=e,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=i;const n=o.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,s){if(void 0!==e){const i=this.constructor,o=this[e];if(s??=i.getPropertyOptions(e),!((s.hasChanged??f)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,m?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.1");const S=globalThis,A=S.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+x,O=`<${P}>`,k=document,U=()=>k.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,H="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,N=/>/g,I=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,L=/^(?:script|style|textarea|title)$/i,K=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,z=k.createTreeWalker(k,129);function J(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const V=(e,t)=>{const s=e.length-1,i=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=R;for(let t=0;t<s;t++){const s=e[t];let a,l,d=-1,h=0;for(;h<s.length&&(r.lastIndex=h,l=r.exec(s),null!==l);)h=r.lastIndex,r===R?"!--"===l[1]?r=M:void 0!==l[1]?r=N:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=I):void 0!==l[3]&&(r=I):r===I?">"===l[0]?(r=o??R,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?I:'"'===l[3]?B:j):r===B||r===j?r=I:r===M||r===N?r=R:(r=I,o=void 0);const c=r===I&&e[t+1].startsWith("/>")?" ":"";n+=r===R?s+O:d>=0?(i.push(a),s.slice(0,d)+C+s.slice(d)+x+c):s+x+(-2===d?t:c)}return[J(e,n+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Y{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,d]=V(e,t);if(this.el=Y.createElement(l,s),z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=z.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(C)){const t=d[n++],s=i.getAttribute(e).split(x),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?ee:"?"===r[1]?te:"@"===r[1]?se:Q}),i.removeAttribute(e)}else e.startsWith(x)&&(a.push({type:6,index:o}),i.removeAttribute(e));if(L.test(i.tagName)){const e=i.textContent.split(x),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],U()),z.nextNode(),a.push({type:2,index:++o});i.append(e[t],U())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(x,e+1));)a.push({type:7,index:o}),e+=x.length-1}o++}}static createElement(e,t){const s=k.createElement("template");return s.innerHTML=e,s}}function G(e,t,s=e,i){if(t===q)return t;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=T(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(t=G(e,o._$AS(e,t.values),o,i)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??k).importNode(t,!0);z.currentNode=i;let o=z.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new X(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new ie(o,this,e)),this._$AV.push(t),a=s[++r]}n!==a?.index&&(o=z.nextNode(),n++)}return z.currentNode=k,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),T(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Y.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Z(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new Y(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new X(this.O(U()),this.O(U()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=F}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(void 0===o)e=G(this,e,t,0),n=!T(e)||e!==this._$AH&&e!==q,n&&(this._$AH=e);else{const i=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=G(this,i[s+r],t,r),a===q&&(a=this._$AH[r]),n||=!T(a)||a!==this._$AH[r],a===F?e=F:e!==F&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class se extends Q{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??F)===q)return;const s=this._$AH,i=e===F&&s!==F||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==F&&(s===F||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const oe=S.litHtmlPolyfillSupport;oe?.(Y,X),(S.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;let re=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let o=i._$litPart$;if(void 0===o){const e=s?.renderBefore??null;i._$litPart$=o=new X(t.insertBefore(U(),e),e,void 0,s??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};re._$litElement$=!0,re.finalized=!0,ne.litElementHydrateSupport?.({LitElement:re});const ae=ne.litElementPolyfillSupport;ae?.({LitElement:re}),(ne.litElementVersions??=[]).push("4.2.1");const le={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:f},de=(e=le,t,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const o=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,o,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];t.call(this,s),this.requestUpdate(i,o,e)}}throw Error("Unsupported decorator location: "+i)};function he(e){return(t,s)=>"object"==typeof s?de(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function ce(e){return he({...e,state:!0,attribute:!1})}var ue;const pe=new WeakMap,ge=()=>{};ue=Symbol.toStringTag;let be=class e{constructor(e){this.subscribers=[],this.settlement=null,this[ue]="Unpromise",this.promise="function"==typeof e?new Promise(e):e;const t=this.promise.then(e=>{const{subscribers:t}=this;this.subscribers=null,this.settlement={status:"fulfilled",value:e},null==t||t.forEach(({resolve:t})=>{t(e)})});"catch"in t&&t.catch(e=>{const{subscribers:t}=this;this.subscribers=null,this.settlement={status:"rejected",reason:e},null==t||t.forEach(({reject:t})=>{t(e)})})}subscribe(){let e,t;const{settlement:s}=this;if(null===s){if(null===this.subscribers)throw new Error("Unpromise settled but still has subscribers");const s=function(){let e,t;return{promise:new Promise((s,i)=>{e=s,t=i}),resolve:e,reject:t}}();this.subscribers=function(e,t){return[...e,t]}(this.subscribers,s),e=s.promise,t=()=>{null!==this.subscribers&&(this.subscribers=function(e,t){const s=e.indexOf(t);return-1!==s?function(e,t){return[...e.slice(0,t),...e.slice(t+1)]}(e,s):e}(this.subscribers,s))}}else{const{status:i}=s;e="fulfilled"===i?Promise.resolve(s.value):Promise.reject(s.reason),t=ge}return Object.assign(e,{unsubscribe:t})}then(e,t){const s=this.subscribe(),{unsubscribe:i}=s;return Object.assign(s.then(e,t),{unsubscribe:i})}catch(e){const t=this.subscribe(),{unsubscribe:s}=t;return Object.assign(t.catch(e),{unsubscribe:s})}finally(e){const t=this.subscribe(),{unsubscribe:s}=t;return Object.assign(t.finally(e),{unsubscribe:s})}static proxy(t){const s=e.getSubscribablePromise(t);return typeof s<"u"?s:e.createSubscribablePromise(t)}static createSubscribablePromise(t){const s=new e(t);return pe.set(t,s),pe.set(s,s),s}static getSubscribablePromise(e){return pe.get(e)}static resolve(t){const s="object"==typeof t&&null!==t&&"then"in t&&"function"==typeof t.then?t:Promise.resolve(t);return e.proxy(s).subscribe()}static async any(t){const s=(Array.isArray(t)?t:[...t]).map(e.resolve);try{return await Promise.any(s)}finally{s.forEach(({unsubscribe:e})=>{e()})}}static async race(t){const s=(Array.isArray(t)?t:[...t]).map(e.resolve);try{return await Promise.race(s)}finally{s.forEach(({unsubscribe:e})=>{e()})}}static async raceReferences(e){const t=e.map(we);try{return await Promise.race(t)}finally{for(const e of t)e.unsubscribe()}}};function we(e){return be.proxy(e).then(()=>[e])}const me="SELECTTREE-TIMEOUT";async function ve(e,t=!1){var s;if((null===(s=e.localName)||void 0===s?void 0:s.includes("-"))&&await customElements.whenDefined(e.localName),e.updateComplete&&await e.updateComplete,t&&(e.pageRendered&&await e.pageRendered,e._panelState)){let t=0;for(;"loaded"!==e._panelState&&t++<5;)await new Promise(e=>setTimeout(e,100))}}async function _e(e,t,s=!1){let i=[e];for("string"==typeof t&&(t=t.split(/(\$| )/));""===t[t.length-1];)t.pop();for(const[e,s]of t.entries()){const e=i[0];if(!e)return null;s.trim().length&&(ve(e),i="$"===s?[e.shadowRoot]:e.querySelectorAll(s))}return s?i:i[0]}async function fe(e,t,s=!1,i=1e4){return be.race([_e(e,t,s),new Promise((e,t)=>setTimeout(()=>t(new Error(me)),i))]).catch(e=>{if(!e.message||e.message!==me)throw e;return null})}async function ye(){var e;void 0===(null!==(e=customElements.get("home-assistant"))&&void 0!==e?e:customElements.get("hc-main"))&&await be.race([customElements.whenDefined("home-assistant"),customElements.whenDefined("hc-main")]);const t=customElements.get("home-assistant")?"home-assistant":"hc-main";for(;!document.querySelector(t);)await new Promise(e=>window.setTimeout(e,100));return document.querySelector(t)}let $e=class extends re{constructor(){super(...arguments),this.dirty=!1,this.narrow=!1}toggleRegister(){var e;(null===(e=window.browser_mod)||void 0===e?void 0:e.ready)&&(window.browser_mod.registered=!window.browser_mod.registered,this.dirty=!0)}toggleCameraEnabled(){window.browser_mod.cameraEnabled=!window.browser_mod.cameraEnabled,this.dirty=!0}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>this.requestUpdate())}render(){var e,t,s,i,o,n,r,a,l,d,h,c,u,p,g;return K`
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
              .checked=${null===(s=window.browser_mod)||void 0===s?void 0:s.registered}
              @change=${this.toggleRegister}
              .disabled=${(null===(i=window.browser_mod)||void 0===i?void 0:i.browser_locked)||(null===(o=window.browser_mod)||void 0===o?void 0:o.global_settings.autoRegister)||(null===(n=window.browser_mod)||void 0===n?void 0:n.global_settings.lockRegister)||!(null===(r=this.hass.user)||void 0===r?void 0:r.is_admin)}
            ></ha-switch>
          </ha-settings-row>

          <ha-settings-row .narrow=${this.narrow}>
            <span slot="heading">Browser ID</span>
            <span slot="description"
              >A unique identifier for this browser-device combination.</span
            >
            <ha-form
              .hass=${this.hass}
              .schema=${[{name:"browser_id",label:"Browser ID",helper:"Select an existing known Browser ID or enter new",required:!0,selector:{select:{sort:!0,custom_value:!0,mode:"dropdown",options:Object.keys(null===(a=window.browser_mod)||void 0===a?void 0:a.browsers)||[]}}}]}
              .computeLabel=${e=>{var t;return null!==(t=e.label)&&void 0!==t?t:e.name}}
              .computeHelper=${e=>{var t;return null!==(t=e.helper)&&void 0!==t?t:""}}
              .data=${{browser_id:null===(l=window.browser_mod)||void 0===l?void 0:l.browserID}}
              .disabled=${(null===(d=window.browser_mod)||void 0===d?void 0:d.browser_locked)||!(null===(h=this.hass.user)||void 0===h?void 0:h.is_admin)}
              @value-changed=${e=>{var t;const s=e.detail.value.browser_id;s&&s!==(null===(t=window.browser_mod)||void 0===t?void 0:t.browserID)&&(window.browser_mod.browserID=s,this.dirty=!0)}}
            >
            </ha-form>
          </ha-settings-row>

          ${(null===(c=window.browser_mod)||void 0===c?void 0:c.registered)?K`
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
                ${(null===(g=window.browser_mod)||void 0===g?void 0:g.cameraError)?K`
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
        </ul>`);const s=[];return"true"!==window.fully.getBooleanSetting("motionDetection")&&s.push(K`<li>Enable Visual Motion Detection</li>`),"true"!==window.fully.getBooleanSetting("screenOnOnMotion")&&s.push(K`<li>Turn Screen On on Motion</li>`),"true"!==window.fully.getBooleanSetting("stopScreensaverOnMotion")&&s.push(K`<li>Exit Screensaver on Motion</li>`),0!==s.length&&e.push(K`<li>Motion Detection (PLUS)</li>
        <ul>
          ${s}
        </ul>`),"true"!==window.fully.getBooleanSetting("remoteAdmin")&&e.push(K`<li>Remote Administration (PLUS)</li>
        <ul>
          <li>Enable Remote Administration</li>
        </ul>`),e.length?e:null}static get styles(){return r`
      .card-header {
        display: flex;
        justify-content: space-between;
      }
      ha-textfield {
        display: block;
        margin-top: 8px;
      }
    `}};e([he()],$e.prototype,"hass",void 0),e([he()],$e.prototype,"dirty",void 0),e([he({type:Boolean})],$e.prototype,"narrow",void 0),customElements.define("browser-mod-browser-settings-card",$e);class Se extends re{firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>this.requestUpdate()),this._fetch_entity_registry()}async _fetch_entity_registry(){this._entity_registry||(this._entity_registry=await this.hass.callWS({type:"config/device_registry/list"}))}_find_entity(e){if(this._entity_registry)return this._entity_registry.find(t=>{var s;return JSON.stringify(null===(s=null==t?void 0:t.identifiers)||void 0===s?void 0:s[0])===JSON.stringify(["browser_mod",e])})}unregister_browser(e){const t=e.currentTarget.browserID;window.browser_mod.showPopup({title:"Unregister browser",content:`Are you sure you want to unregister Browser ${t}?`,right_button:"Unregister",right_button_variant:"danger",right_button_appearance:"accent",right_button_action:()=>{t===window.browser_mod.browserID?window.browser_mod.registered=!1:window.browser_mod.connection.sendMessage({type:"browser_mod/unregister",browserID:t})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}toggle_lock_browser(e){const t=e.currentTarget.browserID,s=window.browser_mod.browsers[t];window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:t,data:Object.assign(Object.assign({},s),{locked:!s.locked})})}toggle_auto_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.autoRegister)?window.browser_mod.setSetting("global",null,{autoRegister:void 0}):window.browser_mod.setSetting("global",null,{autoRegister:!0})}toggle_lock_register(e){var t;(null===(t=window.browser_mod)||void 0===t?void 0:t.global_settings.lockRegister)?window.browser_mod.setSetting("global",null,{lockRegister:void 0}):window.browser_mod.setSetting("global",null,{lockRegister:!0,autoRegister:void 0})}register_cast(){window.browser_mod.connection.sendMessage({type:"browser_mod/register",browserID:"CAST"})}render(){var e,t;return K`
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

          ${Object.keys(window.browser_mod.browsers).map(e=>{const t=window.browser_mod.browsers[e],s=this._find_entity(e);return K` <ha-settings-row>
              <span slot="heading">
                ${e} ${(null==s?void 0:s.name_by_user)?`(${s.name_by_user})`:""}
              </span>
              <span slot="description">
                Last connected:
                <ha-relative-time
                  .hass=${this.hass}
                  .datetime=${t.last_seen}
                ></ha-relative-time>
              </span>
              ${s?K`
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
    `}static get styles(){return r`
      ha-icon-button > * {
        display: flex;
        color: var(--primary-text-color);
      }
    `}}e([he()],Se.prototype,"hass",void 0),e([he()],Se.prototype,"_entity_registry",void 0),customElements.define("browser-mod-registered-browsers-card",Se);class Ae{constructor(e){this._element=e,customElements.get("dialog-edit-sidebar")?this._dialogAvaliable=!0:(this._dialogAvaliable=!1,fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar").then(e=>{if(e&&void 0===e.editMode){const t=e.shadowRoot.querySelector("div.menu");t&&(e.addEventListener("show-dialog",e=>{var t,s,i;"dialog-edit-sidebar"===(null===(t=e.detail)||void 0===t?void 0:t.dialogTag)&&(e.stopPropagation(),null===(i=null===(s=e.detail)||void 0===s?void 0:s.dialogImport)||void 0===i||i.call(s))},{once:!0}),t.dispatchEvent(new CustomEvent("action",{detail:{action:"hold"}})))}}),customElements.whenDefined("dialog-edit-sidebar").then(async()=>{this._dialogAvaliable=!0,await this._element.updateComplete.then(()=>this._element.requestUpdate())}))}get dialogAvaliable(){return this._dialogAvaliable}get order(){var e,t;const s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,"sidebarPanelOrder");return"global"===this._type?s.global||"[]":s[this._type][this._target]||"[]"}get hidden(){var e,t;const s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,"sidebarHiddenPanels");return"global"===this._type?s.global||"[]":s[this._type][this._target]||"[]"}async setupDialog(){var e;if(!this._dialogAvaliable)return;this._dialogEditSidebar=document.createElement("dialog-edit-sidebar");const t=await ye();t&&this._dialogEditSidebar&&(await async function(e){(await ye()).provideHass(e)}(this._dialogEditSidebar),this._dialogEditSidebar._order=JSON.parse(this.order),this._dialogEditSidebar._hidden=JSON.parse(this.hidden),t.shadowRoot.appendChild(this._dialogEditSidebar),this._dialogEditSidebar._open=!0,this._dialogEditSidebar.focus(),window.addEventListener("popstate",async e=>{var t,s;const i=null===(t=e.state)||void 0===t?void 0:t.sidebarSettingsCustomSelector;i&&(i.open||(null===(s=this._dialogEditSidebar)||void 0===s?void 0:s._open)&&await this._dialogEditSidebar.closeDialog())}),void 0===(null===(e=history.state)||void 0===e?void 0:e.sidebarSettingsCustomSelector)&&history.replaceState({sidebarSettingsCustomSelector:{open:!1}},""),history.pushState({sidebarSettingsCustomSelector:{open:!0}},""),this._dialogEditSidebar.addEventListener("dialog-closed",e=>{var t;"dialog-edit-sidebar"==(null===(t=e.detail)||void 0===t?void 0:t.dialog)&&this._dialogEditSidebar&&(this._dialogEditSidebar.remove(),this._dialogEditSidebar=void 0)}))}async customiseDialog(){var e;if(!this._dialogEditSidebar)return;let t,s=0;for(;!t&&s++<5;)t=this._dialogEditSidebar.shadowRoot.querySelector("ha-wa-dialog"),t||await new Promise(e=>setTimeout(e,500));await(null==t?void 0:t.updateComplete);const i=await fe(this._dialogEditSidebar.shadowRoot,"ha-wa-dialog $ ha-dialog-header");if(i){const t=document.createElement("style");i.append(t);const s="global"===this._type?"Global":this._type.charAt(0).toUpperCase()+this._type.slice(1)+" - ";let o="";if("user"===this._type){for(const e of this._allUsers)if(e.id===this._target){o=e.name;break}}else o=null!==(e=this._target)&&void 0!==e?e:"";t.innerHTML=`\n        slot[name="headerActionItems"] {\n          display: none;\n        }\n        span[slot="subtitle"] {\n          display: none;\n        }\n        .title::after {\n          content: "- ${s}${o}";\n        }\n      `}}async setupSaveHandler(){if(!this._dialogEditSidebar)return;let e,t=0;for(;!e&&t++<5;)e=this._dialogEditSidebar.shadowRoot.querySelector("ha-wa-dialog"),e||await new Promise(e=>setTimeout(e,500));await(null==e?void 0:e.updateComplete);const s=this._dialogEditSidebar.shadowRoot.querySelector('ha-wa-dialog > ha-dialog-footer > ha-button[slot="primaryAction"]');if(s){const e=s.shadowRoot.querySelector("button");e&&e.addEventListener("click",e=>{e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),this._dialogEditSidebar.dispatchEvent(new CustomEvent("sidebar-settings-save"))})}}async saveSettings(){if(!this._dialogEditSidebar)return;const e=this._dialogEditSidebar._order,t=this._dialogEditSidebar._hidden;window.browser_mod.setSetting(this._type,this._target,{sidebarHiddenPanels:JSON.stringify(t),sidebarPanelOrder:JSON.stringify(e)}),this._dialogEditSidebar.closeDialog()}async changeSetting(e,t,s){var i,o;this.dialogAvaliable?(this._type=e,this._target=t,this._allUsers=s,await this.setupDialog(),await this.customiseDialog(),await this.setupSaveHandler(),this._dialogEditSidebar.addEventListener("sidebar-settings-save",async()=>{this.saveSettings()})):null===(o=null===(i=window.browser_mod)||void 0===i?void 0:i.showPopup)||void 0===o||o.call(i,{title:"ERROR!",content:"Sidebar settings dialog unavailable.",right_button:"OK"})}}const Ee=2;let Ce=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const xe=(e,t)=>{const s=e._$AN;if(void 0===s)return!1;for(const e of s)e._$AO?.(t,!1),xe(e,t);return!0},Pe=e=>{let t,s;do{if(void 0===(t=e._$AM))break;s=t._$AN,s.delete(e),e=t}while(0===s?.size)},Oe=e=>{for(let t;t=e._$AM;e=t){let s=t._$AN;if(void 0===s)t._$AN=s=new Set;else if(s.has(e))break;s.add(e),Te(t)}};function ke(e){void 0!==this._$AN?(Pe(this),this._$AM=e,Oe(this)):this._$AM=e}function Ue(e,t=!1,s=0){const i=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(i))for(let e=s;e<i.length;e++)xe(i[e],!1),Pe(i[e]);else null!=i&&(xe(i,!1),Pe(i));else xe(this,e)}const Te=e=>{e.type==Ee&&(e._$AP??=Ue,e._$AQ??=ke)};class De extends Ce{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),Oe(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(xe(this,e),Pe(this))}setValue(e){if((e=>void 0===e.strings)(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class He{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class Re{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}}const Me=e=>!(e=>null===e||"object"!=typeof e&&"function"!=typeof e)(e)&&"function"==typeof e.then,Ne=1073741823;const Ie=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends De{constructor(){super(...arguments),this._$Cwt=Ne,this._$Cbt=[],this._$CK=new He(this),this._$CX=new Re}render(...e){return e.find(e=>!Me(e))??q}update(e,t){const s=this._$Cbt;let i=s.length;this._$Cbt=t;const o=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){const r=t[e];if(!Me(r))return this._$Cwt=e,r;e<i&&r===s[e]||(this._$Cwt=Ne,i=0,Promise.resolve(r).then(async e=>{for(;n.get();)await n.get();const t=o.deref();if(void 0!==t){const s=t._$Cbt.indexOf(r);s>-1&&s<t._$Cwt&&(t._$Cwt=s,t.setValue(e))}}))}return q}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}});let je;class Be extends re{constructor(){super(...arguments),this.settingSelector={template:{}},this.tableData=[],this._firstUpdatedTimestamp=0,this._tableFirstUpdate=null,this._tableUpdate=new Promise(e=>{this._tableFirstUpdate=e})}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>{((e,t,s=!1)=>{let i;const o=(...o)=>{const n=s&&!i;clearTimeout(i),i=window.setTimeout(()=>{i=void 0,e(...o)},t),n&&e(...o)};return o.cancel=()=>{clearTimeout(i)},o})(()=>this.updateTable(),1e3)()}),this._firstUpdatedTimestamp=Date.now()}shouldUpdate(e){return!(!e.has("settingKey")&&!e.has("tableData"))||!(!e.has("hass")||void 0===e.get("hass")||void 0===this.hass)&&Date.now()-this._firstUpdatedTimestamp<1e3}updated(e){(e.has("settingKey")||e.has("hass")&&void 0===e.get("hass"))&&this.updateTable()}async fetchUsers(){return void 0===je&&(je=await this.hass.callWS({type:"config/auth/list"})),je}clearSetting(e,t){var s;null===(s=window.browser_mod)||void 0===s||s.showPopup({title:"Are you sure",content:"Do you wish to clear this setting?",right_button:"Clear",right_button_variant:"danger",right_button_appearance:"accent",right_button_action:async()=>{if("sidebarPanelOrder"===this.settingKey)return await fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"),window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:"[]",sidebarPanelOrder:"[]"}),void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:void 0,sidebarPanelOrder:void 0});this.default&&window.browser_mod.setSetting(e,t,{[this.settingKey]:this.default}),window.browser_mod.setSetting(e,t,{[this.settingKey]:void 0})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}async changeSetting(e,t){var s;if(this.settingSelector.custom){const i=await this.fetchUsers();null===(s=this.settingSelector.custom)||void 0===s||s.changeSetting(e,t,i)}else this.changeSettingForm(e,t)}changeSettingForm(e,t){var s,i,o,n,r,a,l;const d=null===(i=null===(s=window.browser_mod)||void 0===s?void 0:s.getSetting)||void 0===i?void 0:i.call(s,this.settingKey),h=null!==(o="global"===e?d.global:d[e][t])&&void 0!==o?o:this.default,c=null!==(r=null!==(n=this.settingSelector.plaintext)&&void 0!==n?n:this.settingSelector.schema)&&void 0!==r?r:[{name:"value",label:null!==(a=this.settingSelector.label)&&void 0!==a?a:"",default:h,selector:this.settingSelector}];if(this.settingSelector.schema&&void 0!==h){function u(e,t){for(const s of e)s.schema?u(s.schema,t):void 0!==t[s.name]&&(s.default=t[s.name])}u(c,h)}null===(l=window.browser_mod)||void 0===l||l.showPopup({title:"Change setting",content:c,right_button:"Save",right_button_variant:"brand",right_button_appearance:"accent",right_button_action:async s=>{var i;if("sidebarPanelOrder"===this.settingKey){const s=await fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");return void window.browser_mod.setSetting(e,t,{sidebarHiddenPanels:JSON.stringify(s._hiddenPanels),sidebarPanelOrder:JSON.stringify(s._panelOrder)})}let o=null!==(i=s.value)&&void 0!==i?i:s;window.browser_mod.setSetting(e,t,{[this.settingKey]:o})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}addBrowserSetting(){var e,t;const s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),i=window.browser_mod._data.browsers,o=[];for(const e of Object.keys(i))null==s.browser[e]&&o.push(e);0!==o.length?window.browser_mod.showPopup({title:"Select browser to configure",content:[{name:"browser",label:"",selector:{select:{options:o}}}],right_button:"Next",right_button_action:e=>this.changeSetting("browser",e.browser),right_button_variant:"brand",right_button_appearance:"filled",left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"}):window.browser_mod.showPopup({title:"No browsers to configure",content:"All registered browsers have already been configured.",right_button:"OK"})}async addUserSetting(){var e,t;const s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey),i=await this.fetchUsers(),o=[];for(const e of i)e.system_generated||null!=s.user[e.id]||o.push({label:e.name,value:e.id});0!==o.length?window.browser_mod.showPopup({title:"Select user to configure",content:[{name:"user",label:"",selector:{select:{options:o}}}],right_button:"Next",right_button_variant:"brand",right_button_appearance:"filled",right_button_action:e=>this.changeSetting("user",e.user),left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"}):window.browser_mod.showPopup({title:"No users to configure",content:"All users have already been configured.",right_button:"OK"})}async updateTable(){var e,t,s,i,o,n;if(void 0===this.hass)return;const r=await this.fetchUsers(),a=null!==(s=null===(t=null===(e=window.browser_mod)||void 0===e?void 0:e.getSetting)||void 0===t?void 0:t.call(e,this.settingKey))&&void 0!==s?s:{global:void 0,browser:{},user:{}},l=[];for(const[e,t]of Object.entries(null!==(i=a.user)&&void 0!==i?i:{})){const s=r.find(t=>t.id===e);if(!s)continue;let i="object"==typeof t?"Config":String(t);i.length>=20&&(i=i.slice(0,20)+"..."),l.push({name:`User: ${s.name}`,value:i,controls:K`
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
      `});for(const[e,t]of Object.entries(null!==(o=a.browser)&&void 0!==o?o:{})){let s="object"==typeof t?"Config":String(t);s.length>=20&&(s=s.slice(0,20)+"..."),l.push({name:`Browser: ${e}`,value:s,controls:K`
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
      `});let d=a.global;null!=d&&("object"==typeof a.global?d="Config":(d=String(a.global),d.length>=20&&(d=d.slice(0,20)+"..."))),l.push({name:"GLOBAL",value:null!=d?d:K`<span style="color: var(--warning-color);">DEFAULT</span>`,controls:K`
        <div>
          <ha-icon-button @click=${()=>this.changeSetting("global",null)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${()=>this.clearSetting("global",null)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        </div>
      `}),this.tableData=l,null===(n=this._tableFirstUpdate)||void 0===n||n.call(this)}_renderTable(){return this._tableUpdate.then(()=>(this._tableFirstUpdate=null,this._render()))}_render(){return K`
      <ha-data-table
        .hass=${this.hass}
        .columns=${{name:{title:"Name",grows:!0},value:{title:"Value",grows:!0,type:"overflow"},controls:{}}}
        .data=${this.tableData}
        auto-height
      >
      </ha-data-table>
    `}render(){return K`${Ie(this._renderTable(),K`Loading...`)}`}static get styles(){return r`
      :host {
        display: block;
      }
    `}}e([he()],Be.prototype,"settingKey",void 0),e([he()],Be.prototype,"settingSelector",void 0),e([he()],Be.prototype,"hass",void 0),e([he()],Be.prototype,"default",void 0),e([he()],Be.prototype,"tableData",void 0),customElements.define("browser-mod-settings-table",Be),(async()=>{var e,t,s,i,o,n,r;await customElements.whenDefined("partial-panel-resolver"),await customElements.whenDefined("partial-panel-resolver");const a=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(s=null===(t=null===(e=null==a?void 0:a.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===s?void 0:s.call(t));const l=document.createElement("developer-tools-router");await(null===(r=null===(n=null===(o=null===(i=null==l?void 0:l.routerOptions)||void 0===i?void 0:i.routes)||void 0===o?void 0:o.template)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await customElements.whenDefined("developer-tools-template")})();class Le extends re{constructor(){super(...arguments),this._dashboards=[],this._panels={},this._editSidebar=!1,this._hassUserHasSidebarSettings=!1,this._savedSidebar={panelOrder:[],hiddenPanels:[]}}firstUpdated(){window.browser_mod.addEventListener("browser-mod-config-update",()=>this.requestUpdate()),this._sidebarSettingsCustomSelector=new Ae(this)}updated(e){e.has("hass")&&void 0===e.get("hass")&&(async()=>{this._dashboards=await this.hass.callWS({type:"lovelace/dashboards/list"}),this._panels=this.hass.panels,this.checkHassUserSidebarSettings()})()}async checkHassUserSidebarSettings(){var e,t;const s=await(null===(e=this.hass)||void 0===e?void 0:e.callWS({type:"frontend/get_user_data",key:"sidebar"}));this._hassUserHasSidebarSettings=s&&(null===(t=s.value)||void 0===t?void 0:t.panelOrder)}async clearHassUserSidebarSettings(){var e;null===(e=window.browser_mod)||void 0===e||e.showPopup({title:"Sidebar settings",content:"Clear sidebar settings synced in this user's Home Assistant profile?",right_button:"Clear",right_button_variant:"danger",right_button_appearance:"accent",right_button_action:()=>{var e;this.hass.callWS({type:"frontend/set_user_data",key:"sidebar",value:{}}),this.checkHassUserSidebarSettings(),null===(e=window.browser_mod)||void 0===e||e.showPopup({title:"Sidebar settings",content:"Sidebar settings cleared",right_button:"OK"})},left_button:"Cancel",left_button_variant:"neutral",left_button_appearance:"plain"})}async toggleEditSidebar(){var e,t;const s=await fe(document.body,"home-assistant $ home-assistant-main $ ha-drawer ha-sidebar");s.editMode=!s.editMode,this._editSidebar=s.editMode,this._editSidebar?this._savedSidebar={panelOrder:s._panelOrder,hiddenPanels:s._hiddenPanels}:(s._panelOrder=null!==(e=this._savedSidebar.panelOrder)&&void 0!==e?e:[],s._hiddenPanels=null!==(t=this._savedSidebar.hiddenPanels)&&void 0!==t?t:[],this._savedSidebar={panelOrder:[],hiddenPanels:[]})}_toggle_afj(){window.setTimeout(()=>{var e;const t=this.shadowRoot.querySelector("#afj");if(t.checked=!0,t.count=(null!==(e=t.count)&&void 0!==e?e:0)+1,t.count&&t.count>5){t.disabled=!0,this.shadowRoot.querySelector("#afj_heading");this.shadowRoot.querySelector("#afj_description").innerHTML="Something went wrong. Please try again later."}},500+2500*Math.random())}render(){var e,t,s;const i=this._dashboards.map(e=>({value:e.url_path,label:e.title})),o={select:{options:[{value:"lovelace",label:"lovelace (default)"},...i],custom_value:!0}},n=Object.values(this._panels).filter(e=>!!e.title).map(e=>{var t,s;return{value:e.url_path,label:(null===(s=(t=this.hass).localize)||void 0===s?void 0:s.call(t,`panel.${e.title}`))||e.title}}),r=[{value:"lovelace",label:(null===(t=(e=this.hass).localize)||void 0===t?void 0:t.call(e,"panel.states"))||"lovelace (default)"},...n];return K`
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
            .header=${"Kiosk mode"}
            .secondary=${"Use Home Assistant in kiosk mode."}
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
            .header=${"Overlay icon"}
            .secondary=${"An overlay icon with action to show on selected panels."}
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"overlayIcon"}
              .settingSelector=${{schema:[{name:"icon",label:"Icon",selector:{icon:{}}},{name:"title",label:"Title",selector:{text:{}}},{name:"action",label:"Action",selector:{object:{}}},{name:"panels",label:"Show on panels",selector:{select:{multiple:!0,options:r,mode:"dropdown"}}},{type:"grid",schema:[{name:"top",label:"Top (px)",selector:{number:{}}},{name:"left",label:"Left (px)",selector:{number:{}}},{name:"bottom",label:"Bottom (px)",selector:{number:{}}},{name:"right",label:"Right (px)",selector:{number:{}}}]},{name:"class",label:"Class",selector:{text:{}}},{name:"style",label:"CSS style",selector:{text:{multiline:!0}}}]}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          <ha-expansion-panel
            .header=${"Default dashboard"}
            .secondary=${`The dashboard that is shown when navigating to ${location.origin}`}
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
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"defaultAction"}
              .settingSelector=${{object:{}}}
              .default=${{}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>

          ${(null===(s=this._sidebarSettingsCustomSelector)||void 0===s?void 0:s.dialogAvaliable)?K`
            <ha-expansion-panel
              .header=${"Sidebar order"}
              .secondary=${"Order and visibility of sidebar items."}
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
          <ha-expansion-panel
            .header=${"Full user interaction"}
            .secondary=${"Use full user interaction if required."}
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
            leftChevron
          >
            <browser-mod-settings-table
              .hass=${this.hass}
              .settingKey=${"saveScreenState"}
              .settingSelector=${{boolean:{},label:"Save screen state"}}
            ></browser-mod-settings-table>
          </ha-expansion-panel>        </div>
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
    `}}e([he()],Le.prototype,"hass",void 0),e([ce()],Le.prototype,"_dashboards",void 0),e([ce()],Le.prototype,"_panels",void 0),e([ce()],Le.prototype,"_editSidebar",void 0),e([ce()],Le.prototype,"_hassUserHasSidebarSettings",void 0),customElements.define("browser-mod-frontend-settings-card",Le);var Ke="2.7.0";(async()=>{var e,t,s,i,o,n,r,a,l,d,h,c,u,p,g;await customElements.whenDefined("partial-panel-resolver");const b=document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}]);await(null===(s=null===(t=null===(e=null==b?void 0:b.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===s?void 0:s.call(t)),await customElements.whenDefined("ha-panel-config");const w=document.createElement("ha-panel-config");await(null===(r=null===(n=null===(o=null===(i=null==w?void 0:w.routerOptions)||void 0===i?void 0:i.routes)||void 0===o?void 0:o.dashboard)||void 0===n?void 0:n.load)||void 0===r?void 0:r.call(n)),await(null===(h=null===(d=null===(l=null===(a=null==w?void 0:w.routerOptions)||void 0===a?void 0:a.routes)||void 0===l?void 0:l.general)||void 0===d?void 0:d.load)||void 0===h?void 0:h.call(d)),await(null===(g=null===(p=null===(u=null===(c=null==w?void 0:w.routerOptions)||void 0===c?void 0:c.routes)||void 0===u?void 0:u.entities)||void 0===p?void 0:p.load)||void 0===g?void 0:g.call(p)),await customElements.whenDefined("ha-config-dashboard")})().then(()=>{class t extends re{firstUpdated(){window.addEventListener("browser-mod-config-update",()=>this.requestUpdate())}render(){var e;return window.browser_mod?K`
        <ha-top-app-bar-fixed>
          <ha-menu-button
            slot="navigationIcon"
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div slot="title">Browser Mod Settings</div>
          <div slot="actionItems">
            (${Ke})
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
      `:K``}static get styles(){var e,t;return[...null!==(t=null===(e=customElements.get("ha-config-dashboard"))||void 0===e?void 0:e.styles)&&void 0!==t?t:[],r`
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
        `]}}e([he()],t.prototype,"hass",void 0),e([he()],t.prototype,"narrow",void 0),e([he()],t.prototype,"connection",void 0),customElements.define("browser-mod-panel",t)});
