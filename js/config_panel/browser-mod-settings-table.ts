import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { selectTree } from "../helpers";

let _users = undefined;

class BrowserModSettingsTable extends LitElement {
  @property() settingKey;
  @property() settingSelector = {
    template: {},
  };

  @property() hass;
  @property() default;

  @property() tableData = [];

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
      "Are you sure",
      "Do you wish to clear this setting?",
      {
        right_button: "Yes",
        right_button_action: clearSettingCallback,
        left_button: "No",
      }
    );
  }

  changeSetting(type, target) {
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
      let value = newValue.value;
      window.browser_mod.setSetting(type, target, { [this.settingKey]: value });
    };

    const settings = window.browser_mod?.getSetting?.(this.settingKey);
    const def =
      (type === "global" ? settings.global : settings[type][target]) ??
      this.default;
    window.browser_mod?.showPopup(
      "Change value",
      (this.settingSelector as any).plaintext ?? [
        {
          name: "value",
          label: (this.settingSelector as any).label ?? "",
          default: def,
          selector: this.settingSelector,
        },
      ],
      {
        right_button: "OK",
        right_button_action: changeSettingCallback,
        left_button: "Cancel",
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
        "No browsers to configure",
        "All registered browsers have already been configured.",
        { right_button: "OK" }
      );
      return;
    }

    window.browser_mod.showPopup(
      "Select browser to configure",
      [
        {
          name: "browser",
          label: "",
          selector: {
            select: { options: browsers },
          },
        },
      ],
      {
        right_button: "Next",
        right_button_action: (value) =>
          this.changeSetting("browser", value.browser),
        left_button: "Cancel",
      }
    );
  }

  async addUserSetting() {
    const settings = window.browser_mod?.getSetting?.(this.settingKey);
    const allUsers = await this.fetchUsers();
    const users = [];
    for (const target of allUsers) {
      if (target.username && settings.user[target.id] == null)
        users.push({ label: target.name, value: target.id });
    }

    if (users.length === 0) {
      window.browser_mod.showPopup(
        "No users to configure",
        "All users have already been configured.",
        { right_button: "OK" }
      );
      return;
    }

    window.browser_mod.showPopup(
      "Select user to configure",
      [
        {
          name: "user",
          label: "",
          selector: {
            select: { options: users },
          },
        },
      ],
      {
        right_button: "Next",
        right_button_action: (value) => this.changeSetting("user", value.user),
        left_button: "Cancel",
      }
    );
  }

  async updateTable() {
    if (this.hass === undefined) return;
    const users = await this.fetchUsers();
    const settings = window.browser_mod?.getSetting?.(this.settingKey);
    const data = [];
    for (const [k, v] of Object.entries(settings.user)) {
      const user = users.find((usr) => usr.id === k);
      if (!user) continue;
      let val = String(v);
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
        <mwc-button @click=${() => this.addUserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add user setting
        </mwc-button>
      `,
    });

    for (const [k, v] of Object.entries(settings.browser)) {
      let val = String(v);
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
        <mwc-button @click=${() => this.addBrowserSetting()}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          Add browser setting
        </mwc-button>
      `,
    });

    data.push({
      name: "GLOBAL",
      value:
        settings.global != null
          ? String(settings.global)
          : html`<span style="color: var(--warning-color);">DEFAULT</span>`,
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
