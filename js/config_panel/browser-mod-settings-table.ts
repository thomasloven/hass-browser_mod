import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { until } from 'lit/directives/until.js';
import { property } from "lit/decorators.js";
import { compare_deep, debounce, selectTree } from "../helpers";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from 'lit/directives/class-map.js';

let _users = undefined;

type Columns = { 
  [key: string]: {
    title?: string;
    type?: string;
    grows?: boolean;
  };
};

class BrowserModSettingsTable extends LitElement {
  @property() settingKey;
  @property() settingSelector: any = {
    template: {}
  };

  @property() hass;
  @property() default;

  @property() tableData = <any>[];

  private _tableFirstUpdate: (() => void) | null = null;
  private _tableUpdate = new Promise<void>((resolve) => {
    this._tableFirstUpdate = resolve;
  });

  private _tableFirstDisplay: (() => void) | null = null;
  private _tableDisplay = new Promise<void>((resolve) => {
    this._tableFirstDisplay = resolve;
  })

  showTable() {
    this._tableFirstDisplay?.();
    this._tableFirstDisplay = null;
  }

  firstUpdated() {
    window.browser_mod.addEventListener("browser-mod-config-update", () => {
      this.updateTableDebounced();
    }
    );
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    if ((changedProperties).has("settingKey")) {
      return true;
    } else if (changedProperties.has("tableData")) {
      const oldTableData = changedProperties.get("tableData");
      if (oldTableData === undefined && this.tableData !== undefined && this.tableData.length > 0) {
        return true;
      } else if (Array.isArray(oldTableData) && Array.isArray(this.tableData)) {
        if (!compare_deep(oldTableData, this.tableData)) {
          return true;
        }
      }
    }
    return false;
  }

  updated(changedProperties) {
    if (changedProperties.has("settingKey")) {
      this.updateTableDebounced();
    } else if (
      changedProperties.has("hass") &&
      changedProperties.get("hass") === undefined
    ) {
      this.updateTableDebounced();
    }
  }

  async fetchUsers(): Promise<any[]> {
    if (_users === undefined)
      _users = this.hass.callWS({ type: "config/auth/list" });
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

  updateTableDebounced = debounce(() => this.updateTable(), 1000);

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
    this._tableFirstUpdate?.();
    this._tableFirstUpdate = null;
  }

  private _renderTable() {
    return Promise.all([this._tableUpdate, this._tableDisplay]).then(() => {
      return this._render();
    });
  }

  private _renderRow(row, index, columns: Columns) {
    return html`
      <div
        aria-rowindex=${index + 2}
        role="row"
        class="mdc-data-table__row"
      >
      ${Object.entries(columns).map(([key, column]) => {
        return html`
          <div
            role="cell"
            class="mdc-data-table__cell ${classMap({
              "mdc-data-table__cell--flex": column.type === "flex",
              "mdc-data-table__cell--numeric": column.type === "numeric",
              "mdc-data-table__cell--icon": column.type === "icon",
              "mdc-data-table__cell--icon-button":
                column.type === "icon-button",
              "mdc-data-table__cell--overflow-menu":
                column.type === "overflow-menu",
              "mdc-data-table__cell--overflow": column.type === "overflow",
            })}"
          >
            ${row[key]}
          </div>
        `;
      })}
      </div>
    `;
  }

  private _render() {
    const columns: Columns = {
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
      <div class="table-container">
        <div class="mdc-data-table">
          <div
            role="table"
            aria-rowcount=${this.tableData.length + 1}
          >
            <div
              class="mdc-data-table__header-row"
              role="row"
              aria-rowindex="1"
            >
            ${Object.entries(columns).map(([key, column]) => {
              const classes = {
                "mdc-data-table__header-cell--numeric":
                  column.type === "numeric",
                "mdc-data-table__header-cell--icon": column.type === "icon",
                "mdc-data-table__header-cell--icon-button":
                  column.type === "icon-button",
                "mdc-data-table__header-cell--overflow-menu":
                  column.type === "overflow-menu",
                "mdc-data-table__header-cell--overflow":
                  column.type === "overflow",
              };
              return html`
                <div
                  class="mdc-data-table__header-cell ${classMap(classes)}"
                  role="columnheader"
                  .columnId=${key}
                  title=${ifDefined(column.title)}
                >
                  <span>${column.title}</span>
                </div>
              `;
            })}
            </div>
            ${this.tableData.map((row, index) => this._renderRow(row, index, columns))}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`${until(this._renderTable(), html`Loading...`)}`;
  }

  static get styles() {
    // table styles from ha-data-table
    return css`
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
    `;
  }
}

customElements.define("browser-mod-settings-table", BrowserModSettingsTable);

