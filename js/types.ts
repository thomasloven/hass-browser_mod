const a = {};

import { BrowserMod } from "./browser_mod";

interface FullyKiosk {
  // Get device info
  getIp4Address: { (): String };
  getDeviceId: { (): String };
  getBatteryLevel: { (): Number };
  getScreenBrightness: { (): Number };
  getScreenOn: { (): Boolean };
  isPlugged: { (): Boolean };

  // Controll device, show notifications, send network data etc.
  turnScreenOn: { () };
  turnScreenOff: { (keepAlive?: Boolean) };

  // Control fully and browsing
  startScreensaver: { () };
  stopScreensaver: { () };

  // Respond to events
  bind: { (event: String, action: String) };

  // Motion detection
  getCamshotJpgBase64: { (): String };
}

declare global {
  interface Window {
    browser_mod?: BrowserMod;
    fully?: FullyKiosk;
    hassConnection?: Promise<any>;
    customCards?: [{}?];
  }
}
