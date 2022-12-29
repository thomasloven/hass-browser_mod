const a = {};

import { BrowserMod } from "./main";

interface FullyKiosk {
  // Types from https://www.fully-kiosk.com/de/#websiteintegration

  // Get device info
  getIp4Address: { (): String };
  getIp6Address: { (): String };
  getHostname: { (): String };
  getHostname6: { (): String };
  getMacAddress: { (): String };
  getMacAddressForInterface: { (_interface: String): String };
  getWifiSsid: { (): String };
  getWifiBssid: { (): String };
  getWifiSignalLevel: { (): String };
  getSerialNumber: { (): String };
  getAndroidId: { (): String };
  getDeviceId: { (): String };
  getDeviceName: { (): String };
  getImei: { (): String };
  getSimSerialNumber: { (): String };
  getBatteryLevel: { (): Number };
  getScreenBrightness: { (): Number };
  getScreenOrientation: { (): Number };
  getDisplayWidth: { (): Number };
  getDisplayHeight: { (): Number };
  getScreenOn: { (): Boolean };
  isPlugged: { (): Boolean };
  isKeyboardVisible: { (): Boolean };
  isWifiEnabled: { (): Boolean };
  isWifiConnected: { (): Boolean };
  isNetworkConnected: { (): Boolean };
  isBluetoothEnabled: { (): Boolean };
  isScreenRotationLocked: { (): Boolean };
  getFullyVersion: { (): String };
  getFullyVersionCode: { (): Number };
  getWebviewVersion: { (): String };
  getAndroidVersion: { (): String };
  getAndroidSdk: { (): Number };
  getDeviceModel: { (): String };

  getInternalStorageTotalSpace: { (): Number };
  getInternalStorageFreeSpace: { (): Number };
  getExternalStorageTotalSpace: { (): Number };
  getExternalStorageFreeSpace: { (): Number };

  getSensorInfo: { (): String };
  getSensorValue: { (type: Number): Number };
  getSensorValues: { (type: Number): String };

  getAllRxBytesMobile: { (): Number };
  getAllTxBytesMobile: { (): Number };
  getAllRxBytesWifi: { (): Number };
  getAllTxBytesWifi: { (): Number };

  // Controll device, show notifications, send network data etc.
  turnScreenOn: { () };
  turnScreenOff: { (keepAlive?: Boolean) };
  forceSleep: { () };
  showToast: { (text: String) };
  setScreenBrightness: { (level: Number) };
  enableWifi: { () };
  disableWifi: { () };
  enableBluetooth: { () };
  disableBluetooth: { () };
  showKeyboard: { () };
  hideKeyboard: { () };
  openWifiSettings: { () };
  openBluetoothSettings: { () };
  vibrate: { (millis: Number) };
  sendHexDataToTcpPort: { (hexData: String, host: String, port: Number) };
  showNotification: {
    (title: String, text: String, url: String, highPriority: Boolean);
  };
  log: { (type: Number, tag: String, message: String) };

  copyTextToClipboard: { (text: String) };
  getClipboardText: { (): String };
  getClipboardHtmlText: { (): String };

  // Download and manage files
  deleteFile: { (path: String) };
  deleteFolder: { (path: String) };
  emptyFolder: { (path: String) };
  createFolder: { (path: String) };
  getFileList: { (folder: String): String };
  downloadFile: { (url: String, dirName: String) };
  unzipFile: { (fileName: String) };
  downloadAndUnzipFile: { (url: String, dirName: String) };

  // Use TTS, multimedia and PDF
  textToSpeech: {
    (text: String, locale?: String, engine?: String, queue?: boolean);
  };
  stopTextToSpeech: { () };

  playVideo: {
    (
      url: String,
      loop: Boolean,
      showControls: Boolean,
      exitOnTouc: Boolean,
      exitOnCompletion: Boolean
    );
  };
  stopVideo: { () };

  setAudioVolume: { (level: Number, stream: Number) };
  playSound: { (url: String, loop: Boolean, stream?: Number) };
  stopSound: { () };
  showPdf: { (url: String) };
  getAudioVolume: { (stream: String): Number };
  isWiredHeadsetOn: { (): Boolean };
  isMusicActive: { (): Boolean };

  // Control fully and browsing
  loadStartUrl: { () };
  setActionBarTitle: { (text: String) };
  startScreensaver: { () };
  stopScreensaver: { () };
  startDaydream: { () };
  stopDaydream: { () };
  addToHomeScreen: { () };
  print: { () };
  exit: { () };
  restartApp: { () };
  getScreenshotPngBase64: { (): String };
  loadStatsCSV: { (): String };
  clearCache: { () };
  clearFormData: { () };
  clearHistory: { () };
  clearCookies: { () };
  clearCookiesForUrl: { (url: String) };
  focusNextTab: { () };
  focusPrevTab: { () };
  focusTabByIndex: { (index: Number) };
  getCurrentTabIndex: { (): Number };
  shareUrl: { () };
  closeTabByIndex: { (index: Number) };
  closeThisTab: { () };
  getTabList: { (): String };
  loadUrlInTabByIndex: { (index: Number, url: String) };
  loadUrlInNewTab: { (url: String, focus: Boolean) };
  getThisTabIndex: { (): Number };
  focusThisTab: { () };

  // Barcode Scanner
  scanQrCode: {
    (
      prompt: String,
      resultUrl: String,
      cameraId?: Number,
      timeout?: Number,
      beepEnabled?: Boolean,
      showCancelButton?: Boolean,
      useFlashlight?: Boolean
    );
  };

  // Bluetooth Interface
  btOpenByMac: { (mac: String): Boolean };
  btOpenByUuid: { (uuid: String): Boolean };
  btOpenByName: { (name: String): Boolean };

  btIsConnected: { (): Boolean };
  btGetDeviceInfoJson: { (): String };
  btClose: { () };

  btSendStringData: { (stringData: String): Boolean };
  btSendHexData: { (hexData: String): Boolean };
  btSendByteData: { (data: Number[]): Boolean };

  // Read NFC Tags
  nfcScanStart: { (flags?: Number, debounceMs?: Number): Boolean };
  nfcScanStop: { (): Boolean };

  // Respond to events
  bind: { (event: String, action: String) };
  // Events:
  //    screenOn
  //    screenOff
  //    showKeyboard
  //    hideKeyboard
  //    networkDisconnect
  //    networkReconnect
  //    internetDisconnect
  //    internetReconnect
  //    unplugged
  //    pluggedAC
  //    pluggedUSB
  //    pluggedWireless
  //    onScreensaverStart
  //    onScreensaverStop
  //    onDaydreamStart
  //    onDaydreamStop
  //    onBatteryLevelChanged
  //    onVolumeUp
  //    onVolueDown
  //    onMotion
  //    onDarkness
  //    onMovement
  //    onIBeacon
  //    broadcastReceived

  //    onQrScanSuccess
  //    onQrScanCancelled

  //    onBtConnectSuccess
  //    onBtConnectFailure
  //    onBtDataRead

  //    onNdefDiscovered
  //    onNfcTagDiscovered
  //    onNfcTagRemoved

  // Manage Apps, Activities, Intents etc.
  startApplication: { (packageName: String, action?: String, url?: String) };
  startIntent: { (url: String) };
  broadcastIntent: { (url: String) };
  isInForeground: { (): Boolean };
  bringToForeground: { (millis?: Number) };
  bringToBackground: { () };
  installApkFile: { (url: String) };
  enableMaintenanceMode: { () };
  disableMaintenanceMode: { () };
  setMessageOverlay: { (text: String) };
  registerBroadcastReceiver: { (action: String) };
  unregisterBroadcastReceiver: { (action: String) };

  // Motion detection
  startMotionDetection: { () };
  stopMotionDetection: { () };
  isMotionDetectionRunning: { (): Boolean };
  getCamshotJpgBase64: { (): String };
  triggerMotion: { () };

  // Manage all Fully settings
  getStartUrl: { (): String };
  setStartUrl: { (url: String) };

  getBooleanSetting: { (key: String): String };
  getStringSetting: { (key: String): String };

  setBooleanSetting: { (key: String, value: Boolean) };
  setStringSetting: { (key: String, value: String) };
  importSettingsFile: { (url: String) };
}

declare global {
  interface Window {
    browser_mod?: BrowserMod;
    browser_mod_log?: any;
    fully?: FullyKiosk;
    hassConnection?: Promise<any>;
    customCards?: [{}?];
    loadCardHelpers?: { () };
  }
}
