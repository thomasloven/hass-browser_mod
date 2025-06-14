import { LitElement } from "lit";
import { selectTree, provideHass, hass_base_el } from "../helpers";

export class SidebarSettingsCustomSelector {
  _element: LitElement;
  _dialogAvaliable: boolean;
  _dialogEditSidebar: any;
  _type: string;
  _target: string;
  _allUsers: Array<any>;
  
  constructor(element) {
    this._element = element;
    if (customElements.get("dialog-edit-sidebar")) {
        this._dialogAvaliable = true;
        return;
    }
    this._dialogAvaliable = false;
    selectTree(
      document.body,
      "home-assistant $ home-assistant-main $ ha-drawer ha-sidebar"
    ).then((sidebar) => {
      // Home Assistant 2025.6 removed editMode from sidebar
      // so this is the best check to see if sidebar settings dialog is available
      if (sidebar && sidebar.editMode === undefined) {
        const menu = sidebar.shadowRoot.querySelector("div.menu");
        if (menu) {
          // Simulate hold press on the menu to open the sidebar settings dialog.
          // Listen once and stop propagation of the show-dialog event
          // so the dialogImport can be called to make <dialog-edit-sidebar> available
          // An event method would be nice HA Team!
          sidebar.addEventListener("show-dialog", (ev) => {
            if (ev.detail?.dialogTag === "dialog-edit-sidebar") {
              ev.stopPropagation();
              ev.detail?.dialogImport?.();
            }
          }, {once: true});
          menu.dispatchEvent(new CustomEvent("action", { detail: { action: "hold" } }));
        }
      }
    });
    customElements.whenDefined("dialog-edit-sidebar").then(async () => {
      this._dialogAvaliable = true;
      await this._element.updateComplete.then(() => this._element.requestUpdate());
    });
  }
    
  get dialogAvaliable() {
    return this._dialogAvaliable;
  }

  get order() {
    const sidebarPanelOrder = window.browser_mod?.getSetting?.('sidebarPanelOrder');
    const order =
      (this._type === "global" ? sidebarPanelOrder.global || '[]' : sidebarPanelOrder[this._type][this._target] || '[]'); 
    return order;
  }

  get hidden() {
    const sidebarHiddenPanels = window.browser_mod?.getSetting?.('sidebarHiddenPanels');
    const hidden =
      (this._type === "global" ? sidebarHiddenPanels.global || '[]': sidebarHiddenPanels[this._type][this._target] || '[]'); 
    return hidden;
  }   

  async setupDialog() {
    if (!this._dialogAvaliable) return;
    this._dialogEditSidebar = document.createElement("dialog-edit-sidebar");
    const base = await hass_base_el();
    if (base && this._dialogEditSidebar) {
      await provideHass(this._dialogEditSidebar);
      this._dialogEditSidebar._order = JSON.parse(this.order);
      this._dialogEditSidebar._hidden = JSON.parse(this.hidden);
      base.shadowRoot.appendChild(this._dialogEditSidebar);
      this._dialogEditSidebar._open = true;
      this._dialogEditSidebar.focus();
      window.addEventListener("popstate", async (ev) => {
        const sidebarSettingsCustomSelectorState = ev.state?.sidebarSettingsCustomSelector;
        if (sidebarSettingsCustomSelectorState) {
          if (!sidebarSettingsCustomSelectorState.open) {
            if (this._dialogEditSidebar?._open)
              await this._dialogEditSidebar.closeDialog();
          }
        }
      });
      if (history.state?.sidebarSettingsCustomSelector === undefined) {
        history.replaceState(
          {
            sidebarSettingsCustomSelector: {
              open: false,
            },
          },
          ""
        );
      }
      history.pushState(
        {
          sidebarSettingsCustomSelector: {
            open: true,
          },
        },
        ""
      );
      this._dialogEditSidebar.addEventListener("dialog-closed", (ev) => {
        if (ev.detail?.dialog == "dialog-edit-sidebar" && this._dialogEditSidebar) {
          this._dialogEditSidebar.remove();
          this._dialogEditSidebar = undefined;
        }
      });
    }
  }

  async customiseDialog() {
    if (!this._dialogEditSidebar) return;
    let haMdDialog;
    let cnt = 0;
    while (!haMdDialog && cnt++ < 5) {
      haMdDialog = this._dialogEditSidebar.shadowRoot.querySelector("ha-md-dialog");
      if (!haMdDialog) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    const dialogHeader = await selectTree(
      this._dialogEditSidebar.shadowRoot,
      "ha-md-dialog ha-dialog-header",
    );
    if (dialogHeader) {
      const styleEl = document.createElement("style");
      dialogHeader.shadowRoot.append(styleEl);
      const typeText = (this._type === "global") ? "Global" : this._type.charAt(0).toUpperCase() + this._type.slice(1) + " - ";
      let targetText = "";
      if (this._type === "user") {
        for (const user of this._allUsers) {
          if (user.id === this._target) {
            targetText = user.name;
            break;
          }
        }
      } else {
        targetText = this._target ?? "";
      }
      // Hide subtitle message about sync
      // Append Browser Mod details using ::after CSS styling
      styleEl.innerHTML = `
        .header-subtitle {
          display: none;
        }
        .header-title::after {
          content: "- ${typeText}${targetText}";
        }
      `;
    }
  }

  async setupSaveHandler() {
    if (!this._dialogEditSidebar) return;
    const haButtonSave = this._dialogEditSidebar.shadowRoot.querySelector(
        '[slot="actions"] > ha-button:nth-child(2)');   
    if (haButtonSave) {
      const buttonSave = haButtonSave.shadowRoot.querySelector("button");
      if (buttonSave) {
        buttonSave.addEventListener("click", (ev) => {
          ev.stopImmediatePropagation();
          ev.stopPropagation();
          ev.preventDefault();
          this._dialogEditSidebar.dispatchEvent(new CustomEvent("sidebar-settings-save"));
        });
      }
    } 
  }

  async saveSettings() {
    if (!this._dialogEditSidebar) return;

    const order = this._dialogEditSidebar._order;
    const hidden = this._dialogEditSidebar._hidden;

    window.browser_mod.setSetting(this._type, this._target, {
        sidebarHiddenPanels: JSON.stringify(hidden),
        sidebarPanelOrder: JSON.stringify(order),
    });

    this._dialogEditSidebar.closeDialog();
  }

  async changeSetting(type, target, allUsers) {
    if (!this.dialogAvaliable) {
      window.browser_mod?.showPopup?.(
        "ERROR!",
        "Sidebar settings dialog unavailable.",
        {
            right_button: "OK",
        }
      );
      return;
    }
    this._type = type;
    this._target = target;
    this._allUsers = allUsers;

    await this.setupDialog();
    await this.customiseDialog();
    await this.setupSaveHandler();
    this._dialogEditSidebar.addEventListener("sidebar-settings-save", async () => {
        this.saveSettings();
    });
  }
}

