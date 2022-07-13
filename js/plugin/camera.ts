export const CameraMixin = (SuperClass) => {
  return class CameraMixinClass extends SuperClass {
    private _video;
    private _canvas;
    private _framerate;

    constructor() {
      super();
      this._framerate = 2;

      window.addEventListener(
        "pointerdown",
        () => {
          this._setup_camera();
        },
        { once: true }
      );
    }

    async _setup_camera() {
      if (this._video) return;
      await this.connectionPromise;
      if (!this.cameraEnabled) return;
      const video = (this._video = document.createElement("video"));
      video.autoplay = true;
      video.playsInline = true;
      video.style.display = "none";

      const canvas = (this._canvas = document.createElement("canvas"));
      canvas.style.display = "none";

      document.body.appendChild(video);
      document.body.appendChild(canvas);

      if (!navigator.mediaDevices) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      video.srcObject = stream;
      video.play();
      this.update_camera();
    }

    async update_camera() {
      if (!this.cameraEnabled) {
        const stream = this._video?.srcObject;
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
          this._video.scrObject = undefined;
        }
        return;
      }
      const video = this._video;
      const width = video.videoWidth;
      const height = video.videoHeight;
      this._canvas.width = width;
      this._canvas.height = height;
      const context = this._canvas.getContext("2d");
      context.drawImage(video, 0, 0, width, height);

      this.sendUpdate({
        camera: this._canvas.toDataURL("image/jpeg"),
      });

      const interval = Math.round(1000 / this._framerate);
      setTimeout(() => this.update_camera(), interval);
    }
  };
};
