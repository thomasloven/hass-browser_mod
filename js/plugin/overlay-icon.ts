import { LitElement, html, css } from "lit";
import { property, query, state } from "lit/decorators.js";

export class OverlayIcon extends LitElement {
  @property({reflect: true}) show: string;

  @state() icon: string;
  @state() title: string;
  @state() top: number;
  @state() left: number;
  @state() bottom: number;
  @state() right: number;
  @state() class: string;
  @state() userStyle: string;

  private action: object;
  private _actionCallback: (action: object) => void;

  constructor(
    settings: object, 
    actionCallback: (action: object) => void) 
  {
    super();

    this.settings = settings;
    this._actionCallback = actionCallback;
    this.show = "";
  }

  set settings(value) {
    this.icon = value?.icon ?? "";
    this.title = value?.title ?? "";
    this.action = value.action;
    this.top = value.top;
    this.left = value.left;
    this.bottom = value.bottom;
    this.right = value.right;
    this.class = value.class ?? "";
    this.userStyle = value.style ?? "";
  }

  actionCallback(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();
    this.blur();
    this._actionCallback?.(this.action);
  }

  async connectedCallback() {
    super.connectedCallback();

    await Promise.all(
      [
        customElements.whenDefined("ha-icon-button"),
        customElements.whenDefined("ha-icon")
      ]
    )
  }

  _renderDynamicStyles() {
    let styles = ":host {\n";
    if (this.top !== undefined) styles += `  top: ${this.top}px;\n`;
    if (this.left !== undefined) styles += `  left: ${this.left}px;\n`;
    if (this.bottom !== undefined) styles += `  bottom: ${this.bottom}px;\n`;
    if (this.right !== undefined) styles += `  right: ${this.right}px;\n`;
    styles += "}\n\n"
    if (this.userStyle) styles += `\n${this.userStyle}`;
    return styles;
  }

  render() {
    if (!this.show === undefined) 
      return html``;

    return html`
      <div class="browser-mod-overlay-icon">
        <ha-icon-button
          class=${this.class}
          .title=${this.title}
          @click=${this.actionCallback}
        >
          <ha-icon
            icon=${this.icon}
          ></ha-icon>
        </ha-icon-button>
        </ha-icon>
      </div>
      <style>
        ${this._renderDynamicStyles()}
      </style>
    `;
  }

  static get styles() {
    return css`
      :host([show]) {
        display: block;
        position: fixed;
        z-index: 9999;
      }
      
      :host {
        display: none;
      }

      ha-icon {
        display: grid;
      }
    `;
  }
}

if (!customElements.get("browser-mod-overlay-icon"))
  customElements.define("browser-mod-overlay-icon", OverlayIcon);