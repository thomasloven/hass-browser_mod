export const FullyMixin = (C) => {
  return class FullyMixinClass extends C {
    private _fully_screensaver = false;

    get fully() {
      return window.fully !== undefined;
    }

    constructor() {
      super();

      if (!this.fully) return;

      for (const ev of [
        "screenOn",
        "screenOff",
        "pluggedAC",
        "pluggedUSB",
        "onBatteryLevelChanged",
        "unplugged",
        "networkReconnect",
        "onMotion",
        "onDaydreamStart",
        "onDaydreamStop",
      ]) {
        window.fully.bind(ev, `window.browser_mod.fullyEvent("${ev}");`);
      }

      window.fully.bind(
        "onScreensaverStart",
        `window.browser_mod._fully_screensaver = true; window.browser_mod.fullyEvent();`
      );
      window.fully.bind(
        "onScreensaverStop",
        `window.browser_mod._fully_screensaver = false; window.browser_mod.fullyEvent();`
      );

      return;
    }

    get fully_screen() {
      return this._fully_screensaver === false && window.fully?.getScreenOn();
    }
    set fully_screen(state) {
      if (state) {
        window.fully?.turnScreenOn();
        window.fully?.stopScreensaver();
      } else {
        window.fully?.turnScreenOff();
      }
    }

    get fully_brightness() {
      return window.fully?.getScreenBrightness();
    }
    set fully_brightness(br) {
      window.fully?.setScreenBrightness(br);
    }

    get fully_camera() {
      return window.fully?.getCamshotJpgBase64();
    }

    get fully_data() {
      const f = window.fully;
      if (f === undefined) return "undefined";
      try {
        return {
          ip4Address: f.getIp4Address(),
          ip6Address: f.getIp6Address(),
          hostname: f.getHostname(),
          hostname6: f.getHostname6(),
          macAddress: f.getMacAddress(),
          wifiSsid: f.getWifiSsid(),
          wifiBssid: f.getWifiBssid(),
          wifiSignalLevel: f.getWifiSignalLevel(),
          serialNumber: f.getSerialNumber(),
          androidId: f.getAndroidId(),
          deviceId: f.getDeviceId(),
          deviceName: f.getDeviceName(),
          imei: f.getImei(),
          simSerialNumber: f.getSimSerialNumber(),
          batteryLevel: f.getBatteryLevel(),
          screenBrightness: f.getScreenBrightness(),
          screenOrientation: f.getScreenOrientation(),
          displayWidth: f.getDisplayWidth(),
          displayHeight: f.getDisplayHeight(),
          screenOn: f.getScreenOn(),
          plugged: f.isPlugged(),
          keyboardVisible: f.isKeyboardVisible(),
          wifiEnabled: f.isWifiEnabled(),
          wifiConnected: f.isWifiConnected(),
          networkConnected: f.isNetworkConnected(),
          bluetoothEnabled: f.isBluetoothEnabled(),
          screenRotationLocked: f.isScreenRotationLocked(),
          fullyVersion: f.getFullyVersion(),
          fullyVersionCode: f.getFullyVersionCode(),
          webViewVersion: f.getWebviewVersion(),
          androidVersion: f.getAndroidVersion(),
          androidSdk: f.getAndroidSdk(),
          deviceModel: f.getDeviceModel(),

          internalStorageTotalSpace: f.getInternalStorageTotalSpace(),
          internalStorageFreeSpace: f.getInternalStorageFreeSpace(),
          externalStorageTotalSpace: f.getExternalStorageTotalSpace(),
          externalStorageFreeSpace: f.getExternalStorageFreeSpace(),

          sensorInfo: f.getSensorInfo(),
          //getSensorValue: f.getSensorValue(),
          //getSensorValues: f.getSensorValues(),

          allRxBytesMobile: f.getAllRxBytesMobile(),
          allTxBytesMobile: f.getAllTxBytesMobile(),
          allRxBytesWifi: f.getAllRxBytesWifi(),
          allTxBytesWifi: f.getAllTxBytesWifi(),
        };
      } catch (error) {
        return String(error);
      }
    }

    fullyEvent(event = undefined) {
      this.fireEvent("fully-update", { event });
    }
  };
};
