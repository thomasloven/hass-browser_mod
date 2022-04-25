import { LitElement, html, css } from "lit";
import { deviceID } from "card-tools/src/deviceID";

class BrowserModPanel extends LitElement {
  hass;
  narrow;
  render() {
    return html`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>Browser Mod Settingss</div>
          </app-toolbar>
        </app-header>

        <ha-config-section .narrow=${this.narrow} full-width>
          <ha-card header="Device ID">
            <div class="card-content">
              The device ID is a unique identifier for your browser/device
              combination.
              <ha-textfield .value=${deviceID}> </ha-textfield>
            </div>
            <div class="card-actions">
              <div class="spacer"></div>
              <mwc-button>Update</mwc-button>
            </div>
          </ha-card>

          <ha-card header="Tweaks">
            <div class="card-content">
              <div class="option">
                <h3>Cool function</h3>
                <ha-switch> </ha-switch>
              </div>
              Enabling this will cause cool stuff to happen.
              <div class="option">
                <h3>Another function</h3>
                <ha-switch> </ha-switch>
              </div>
              Enabling this will cause less cool stuff to happen.
            </div>
          </ha-card>
        </ha-config-section>
      </ha-app-layout>
    `;
  }

  static get styles() {
    return [
      ...(customElements.get("ha-config-dashboard") as any).styles,
      css`
        :host {
          --app-header-background-color: var(--sidebar-background-color);
          --app-header-text-color: var(--sidebar-text-color);
          --app-header-border-bottom: 1px solid var(--divider-color);
        }
        .card-actions {
          display: flex;
        }
        .spacer {
          flex-grow: 1;
        }
        ha-textfield {
          width: 250px;
          display: block;
          margin-top: 8px;
        }
        .option {
          display: flex;
          margin-top: 16px;
        }
        .option h3 {
          flex-grow: 1;
          margin: 0;
        }
        .option ha-switch {
          margin-top: 0.25em;
          margin-right: 7px;
          margin-left: 0.5em;
        }
      `,
    ];
  }
}

const loadDevTools = async () => {
  if (customElements.get("ha-config-dashboard")) return;
  const ppResolver = document.createElement("partial-panel-resolver");
  const routes = (ppResolver as any).getRoutes([
    {
      component_name: "config",
      url_path: "a",
    },
  ]);
  await routes?.routes?.a?.load?.();
  const configRouter = document.createElement("ha-panel-config");
  await (configRouter as any)?.routerOptions?.routes?.dashboard?.load?.();
  await customElements.whenDefined("ha-config-dashboard");
};

loadDevTools().then(() => {
  customElements.define("browser-mod-panel", BrowserModPanel);
});
