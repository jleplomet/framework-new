let requestAnimationID = 0;
let requestAnimationActive = false;

let lastRender = false;
let FPS = 0;

// functions that should fire on every animation frame
let renderQueue = [];
// function that shoulf fire on the next frame. once.
let nextFrameQueue = [];

enableRender();

export function enableRender() {
  if (!requestAnimationActive) {
    requestAnimationID = requestAnimationFrame(render);

    requestAnimationActive = true;
  }
}

export function disableRender() {
  cancelAnimationFrame(requestAnimationID);

  requestAnimationActive = false;
}

export function startRender(cb) {
  if (renderQueue.indexOf(cb) === -1) {
    renderQueue.push(cb);
  }
}

export function stopRender(cb) {
  let index = renderQueue.indexOf(cb);

  if (index > -1) {
    renderQueue.splice(index, 1);
  }
}

export function nextFrame(cb) {
  let args = [arguments.length - 1];

  if (arguments.length > 1) {
    let l = arguments.length;
    let i = 1;

    for (; i < l; i++) {
      args[i - 1] = arguments[i];
    }
  }

  nextFrameQueue.push(() => cb.apply(null, args));
}

export function getFPS() {
  return FPS;
}

function render(now) {
  // schedule next frame as soon as possible.
  requestAnimationID = requestAnimationFrame(render);

  let currentFPS = 60;
  let renderDiff = 0;

  if (lastRender) {
    renderDiff = now - lastRender;
    currentFPS = 1000 / renderDiff;
  }

  lastRender = now;

  // store current FPS to access
  FPS = currentFPS;

  for (let i = renderQueue.length - 1; i > -1; i--) {
    let cb = renderQueue[i];

    cb(now, renderDiff, currentFPS);
  }

  if (nextFrameQueue.length) {
    fireNextFrame();
  }
}

function fireNextFrame() {
  let cb = nextFrameQueue[0];

  cb();

  // remove cb from queue as its a one time fire.
  nextFrameQueue.splice(0, 1);
}
