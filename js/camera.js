export const BrowserModCameraMixin = (C) =>
  class extends C {
    setup_camera() {
      console.log("Starting camera");

      if (this._video) return;
      this._video = document.createElement("video");
      this._video.autoplay = true;
      this._video.playsInline = true;
      this._video.style.display = "none";

      this._canvas = document.createElement("canvas");
      this._canvas.style.display = "none";

      document.body.appendChild(this._video);
      document.body.appendChild(this._canvas);

      if (!navigator.mediaDevices) return;

      console.log("Starting devices");
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this._video.srcObject = stream;
          this._video.play();
          this.update_camera();
        });

      this._camera_framerate = 2;

      window.addEventListener(
        "click",
        () => {
          if (this._video.ended || this._video.paused) this._video.play();
        },
        {
          once: true,
        }
      );
    }

    update_camera() {
      this._canvas.width = this._video.videoWidth;
      this._canvas.height = this._video.videoHeight;

      const context = this._canvas.getContext("2d");
      context.drawImage(
        this._video,
        0,
        0,
        this._video.videoWidth,
        this._video.videoHeight
      );

      this.sendUpdate({
        camera: this._canvas.toDataURL("image/jpeg"),
      });
      setTimeout(
        () => this.update_camera(),
        Math.round(1000 / this._camera_framerate)
      );
    }
  };
