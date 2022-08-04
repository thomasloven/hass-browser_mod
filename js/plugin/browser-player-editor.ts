import { LitElement, html } from "lit";

class BrowserPlayerEditor extends LitElement {
  setConfig(config) {}
  render() {
    return html` <div>Nothing to configure.</div> `;
  }
}

// (async () => {
//   while (!window.browser_mod) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   await window.browser_mod.connectionPromise;

if (!customElements.get("browser-player-editor")) {
  customElements.define("browser-player-editor", BrowserPlayerEditor);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "browser-player",
    name: "Browser Player",
    preview: true,
  });
}
// })();
