import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { selectTree } from "../helpers";

let _users = undefined;

class BrowserModSettingsTable extends LitElement {
  @property() settingKey;
  @property() settingSelector: any = {
    template: {}
  };

  @property() hass;
  @property() default;

  @property() tableData = <any>[];

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () =>
      this.updateTable()
    );
  }

  updated(changedProperties) {
    if (changedProperties.has("settingKey")) this.updateTable();
    if (
      changedProperties.has("hass") &&
      changedProperties.get("hass") === undefined
    )
      this.updateTable();
  }

  async fetchUsers(): Promise<any[]> {
    if (_users === undefined)
      _users = await this.hass.callWS({ type: "config/auth/list" });
    return _users;
  }

  clearSetting(type, target) {
    const clearSettingCallback = async () => {
      if (this.settingKey === "sidebarPanelOrder") {
        const sideBar: any = await selectTree(
          document.body,
          "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"
        );
        window.browser_mod.setSetting(type, target, {
          sidebarHiddenPanels: "[]",
          sidebarPanelOrder: "[]",
        });
        window.browser_mod.setSetting(type, target, {
          sidebarHiddenPanels: undefined,
          sidebarPanelOrder: undefined,
        });
        return;
      }
      if (this.default)
        window.browser_mod.setSetting(type, target, {
          [this.settingKey]: this.default,
        });
      window.browser_mod.setSetting(type, target, {
        [this.settingKey]: undefined,
      });
    };
    window.browser_mod?.showPopup(
      {
        title: "Are you sure",
        content: "Do you wish to clear this setting?",
        right_button: "Clear",
        right_button_variant: "danger",
        right_button_appearance: "accent",
        right_button_action: clearSettingCallback,
        left_button: "Cancel",
        left_button_variant: "neutral",
        left_button_appearance: "plain",
      }
    );
  }

  async changeSetting(type, target) {
    if ((this.settingSelector as any).custom) {
      const allUsers = await this.fetchUsers();
      (this.settingSelector as any).custom?.changeSetting(type, target, allUsers);
    } else {
      this.changeSettingForm(type, target);
    }
  }

  changeSettingForm(type, target) {
    const changeSettingCallback = async (newValue) => {
      if (this.settingKey === "sidebarPanelOrder") {
        const sideBar: any = await selectTree(
          document.body,
          "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"
        );

        window.browser_mod.setSetting(type, target, {
          sidebarHiddenPanels: JSON.stringify(sideBar._hiddenPanels),
          sidebarPanelOrder: JSON.stringify(sideBar._panelOrder),
        });

        return;
      }
      let value = newValue.value ?? newValue;
      window.browser_mod.setSetting(type, target, { [this.settingKey]: value });
    };

    const settings = window.browser_mod?.getSetting?.(this.settingKey);
    const value =
      (type === "global" ? settings.global : settings[type][target]) ??
      this.default;
    const content = 
      (this.settingSelector as any).plaintext ?? 
      (this.settingSelector as any).schema ??
      [
        {
          name: "value",
          label: (this.settingSelector as any).label ?? "",
          default: value,
          selector: this.settingSelector,
        },
      ]
    if ((this.settingSelector as any).schema && value !== undefined) {
      _setDefaults(content, value);

      function _setDefaults(schema, data) {
        for (const i of schema) {
          if (i["schema"]) { 
            _setDefaults(i["schema"], data);
          } else if (data[i.name] !== undefined) {
            i.default = data[i.name];
          }
        }
      }
    }
    window.browser_mod?.showPopup(
      {
        title: "Change setting",
        content,
        right_button: "Save",
        right_button_variant: "brand",
        right_button_appearance: "accent",
        right_button_action: changeSettingCallback,
        left_button: "Cancel",
        left_button_variant: "neutral",
        left_button_appearance: "plain",
      }
    );
  }

  addBrowserSetting() {
    const settings = window.browser_mod?.getSetting?.(this.settingKey);
    const allBrowsers = window.browser_mod._data.browsers;
    const browsers = [];
    for (const target of Object.keys(allBrowsers)) {
      if (settings.browser[target] == null) browsers.push(target);
    }

    if (browsers.length === 0) {
      window.browser_mod.showPopup(
        {
          title: "No browsers to configure",
          content: "All registered browsers have already been configured.",
          right_button: "OK"
        }
      );
      return;
    }

    window.browser_mod.showPopup(
      {
        title: "Select browser to configure",
        content: [
          {
            name: "browser",
            label: "",
            selector: {
              select: { options: browsers },
            },
          },
        ],
        right_button: "Next",
        right_button_action: (value) =>
          this.changeSetting("browser", value.browser),
        right_button_variant: "brand",
        right_button_appearance: "filled",
        left_button: "Cancel",
        left_button_variant: "neutral",
        left_button_appearance: "plain",
      }
    );
  }

  async addUserSetting() {
    const settings = window.browser_mod?.getSetting?.(this.settingKey);
    const allUsers = await this.fetchUsers();
    const users = [];
    for (const target of allUsers) {
      if (!target.system_generated && settings.user[target.id] == null)
        users.push({ label: target.name, value: target.id });
    }

    if (users.length === 0) {
      window.browser_mod.showPopup(
        {
          title: "No users to configure",
          content: "All users have already been configured.",
          right_button: "OK"
        }
      );
      return;
    }

    window.browser_mod.showPopup(
      {
        title: "Select user to configure",
        content: [
          {
            name: "user",
            label: "",
            selector: {
              select: { options: users },
            },
          },
        ],
        right_button: "Next",
        right_button_variant: "brand",
        right_button_appearance: "filled",
        right_button_action: (value) => this.changeSetting("user", value.user),
        left_button: "Cancel",
        left_button_variant: "neutral",
        left_button_appearance: "plain",
      }
    );
  }

  async updateTable() {
    if (this.hass === undefined) return;
    const users = await this.fetchUsers();
    const settings = window.browser_mod?.getSetting?.(this.settingKey) ?? { global: undefined, browser: {}, user: {} };
    const data = [];
    for (const [k, v] of Object.entries(settings.user ?? {})) {
      const user = users.find((usr) => usr.id === k);
      if (!user) continue;
      let val = (typeof(v) === "object") ? "Config" : String(v);
      if (val.length >= 20) val = val.slice(0, 20) + "...";
      data.push({
        name: `User: ${user.name}`,
        value: val,
        controls: html`
          <div>
            <ha-icon-button @click=${() => this.changeSetting("user", k)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${() => this.clearSetting("user", k)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `,
      });
    }

    data.push({
      name: "",
      value: html`
        <ha-button 
          appearance="plain"
          @click=${() => this.addUserSetting()}>
            <ha-icon 
              slot="start" 
              .icon=${"mdi:plus"}>
            </ha-icon>
            Add user setting
        </ha-button>
      `,
    });

    for (const [k, v] of Object.entries(settings.browser ?? {})) {
      let val = (typeof(v) === "object") ? "Config" : String(v);
      if (val.length >= 20) val = val.slice(0, 20) + "...";
      data.push({
        name: `Browser: ${k}`,
        value: val,
        controls: html`
          <div>
            <ha-icon-button @click=${() => this.changeSetting("browser", k)}>
              <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${() => this.clearSetting("browser", k)}>
              <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
            </ha-icon-button>
          </div>
        `,
      });
    }

    data.push({
      name: "",
      value: html`
        <ha-button
          appearance="plain" 
          @click=${() => this.addBrowserSetting()}>
            <ha-icon 
              slot="start" 
              .icon=${"mdi:plus"}>
            </ha-icon>
            Add browser setting
        </ha-button>
      `,
    });

    let globalSetting = settings.global;
    if (globalSetting != null) {
      if (typeof(settings.global) === "object") {
        globalSetting = "Config";
      } else {
        globalSetting = String(settings.global);
        if (globalSetting.length >= 20) globalSetting = globalSetting.slice(0, 20) + "...";
      }
    }
    data.push({
      name: "GLOBAL",
      value:
        globalSetting ?? html`<span style="color: var(--warning-color);">DEFAULT</span>`,
      controls: html`
        <div>
          <ha-icon-button @click=${() => this.changeSetting("global", null)}>
            <ha-icon .icon=${"mdi:pencil"} style="display:flex;"></ha-icon>
          </ha-icon-button>
          <ha-icon-button @click=${() => this.clearSetting("global", null)}>
            <ha-icon .icon=${"mdi:delete"} style="display:flex;"></ha-icon>
          </ha-icon-button>
        </div>
      `,
    });
    this.tableData = data;
  }

  render() {
    const global = window.browser_mod?.global_settings?.[this.settingKey];
    const columns = {
      name: {
        title: "Name",
        grows: true,
      },
      value: {
        title: "Value",
        grows: true,
        type: "overflow",
      },
      controls: {},
    };

    return html`
      <ha-data-table
        .hass=${this.hass}
        .columns=${columns}
        .data=${this.tableData}
        auto-height
      >
      </ha-data-table>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
}

customElements.define("browser-mod-settings-table", BrowserModSettingsTable);

