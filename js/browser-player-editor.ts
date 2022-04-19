import { LitElement, html } from "lit";
import { hass_loaded } from "card-tools/src/hass";

class BrowserPlayerEditor extends LitElement {
  setConfig(config) {}
  render() {
    return html` <div>Nothing to configure.</div> `;
  }
}

(async () => {
  await hass_loaded();

  if (!customElements.get("browser-player-editor")) {
    customElements.define("browser-player-editor", BrowserPlayerEditor);
    window.customCards = window.customCards || [];
    window.customCards.push({
      type: "browser-player",
      name: "Browser Player",
      preview: true,
    });
  }
})();
