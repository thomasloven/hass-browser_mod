import { LitElement, html } from "lit";

class BrowserPlayerEditor extends LitElement {
  setConfig(config) {}
  render() {
    return html` <div>Nothing to configure.</div> `;
  }
}

(async () => {
  while (
    (customElements.get("home-assistant") ?? customElements.get("hc-main")) ===
    undefined
  )
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  if (!customElements.get("browser-player-editor")) {
    customElements.define("browser-player-editor", BrowserPlayerEditor);
    (window as any).customCards = (window as any).customCards || [];
    (window as any).customCards.push({
      type: "browser-player",
      name: "Browser Player",
      preview: true,
    });
  }
})();
