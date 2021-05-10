const bases = [
  customElements.whenDefined("home-assistant-main"),
  customElements.whenDefined("hui-view"),
];
Promise.race(bases).then(() => {
  const LitElement = customElements.get("home-assistant-main")
    ? Object.getPrototypeOf(customElements.get("home-assistant-main"))
    : Object.getPrototypeOf(customElements.get("hui-view"));
  const html = LitElement.prototype.html;
  const css = LitElement.prototype.css;

  class BrowserPlayerEditor extends LitElement {
    setConfig(config) {}
    render() {
      return html` <div>Nothing to configure.</div> `;
    }
  }

  if (!customElements.get("browser-player-editor")) {
    customElements.define("browser-player-editor", BrowserPlayerEditor);
    window.customCards = window.customCards || [];
    window.customCards.push({
      type: "browser-player",
      name: "Browser Player",
      preview: true,
    });
  }
});
