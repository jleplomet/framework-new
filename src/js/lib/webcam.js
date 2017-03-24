const NAMESPACE = "[js/lib/webcam]";

let CANVAS, VIDEO, STREAM = false;
let rId = false;

navigator.getUserMedia = getUserMedia();

export function requestWebcamAccess(options) {
  console.log(NAMESPACE, "requestWebcamAccess");

  return new Promise((resolve, reject) =>
    navigator.getUserMedia(options, resolve, reject));
}

export function displayWebcamStreamToCanvas(stream, canvas) {
  console.log(NAMESPACE, "displayWebcamStreamToCanvas");

  CANVAS = canvas;
  STREAM = stream;

  addStopToStream();
  createVideoElementWithStream(stream);
}

export function captureImageFromCanvas() {
  console.log(NAMESPACE, "captureImageFromCanvas");

  VIDEO.pause();
  STREAM.stop();

  return CANVAS.toDataURL("image/jpeg");
}

export function destroyWebcamToCanvas() {
  console.log(NAMESPACE, "destroyWebcamToCanvas");

  try {
    VIDEO.pause();
    STREAM.stop();

    cancelAnimationFrame(rId);

    CANVAS = null;
    STREAM = null;

    VIDEO.removeEventListener("playing", videoPlaying);

    VIDEO = null;
  } catch (e) {
    console.warn(
      NAMESPACE,
      "destroyWebcamToCanvas",
      "something happend. maybe already destroyed?"
    );
    console.error(e);
  }
}

function createVideoElementWithStream(stream) {
  VIDEO = document.createElement("video");

  VIDEO.addEventListener("playing", videoPlaying);

  VIDEO.src = window.URL.createObjectURL(stream);

  VIDEO.play();
}

function videoPlaying() {
  console.log(NAMESPACE, "videoPlaying");

  setTimeout(initCanvas, 250);
}

function initCanvas() {
  console.log(NAMESPACE, "initCanvas");

  const ctx = CANVAS.getContext("2d");
  const dWidth = VIDEO.videoWidth * (CANVAS.height / VIDEO.videoHeight);
  const dHeight = CANVAS.height;
  const dX = CANVAS.width / 2 - dWidth / 2;
  const dY = CANVAS.height / 2 - dHeight / 2;

  // flip the context so it looks right
  ctx.translate(CANVAS.width, 0);
  ctx.scale(-1, 1);

  console.log(NAMESPACE, "ctx.drawImage", dX, dY, dWidth, dHeight);

  function renderCanvas() {
    rId = requestAnimationFrame(renderCanvas);

    ctx.drawImage(VIDEO, dX, dY, dWidth, dHeight);
  }

  renderCanvas();
}

function addStopToStream() {
  if (!STREAM.stop && STREAM.getTracks) {
    STREAM.stop = function() {
      this.getTracks().forEach(track => track.stop());
    };
  }
}

function getUserMedia() {
  return navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
}
