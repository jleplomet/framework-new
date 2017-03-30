import "js/plugins";

import "css/main";

import {
  startRender,
  stopRender,
  disableRender,
  enableRender,
  nextFrame,
} from "js/lib/render";

function render(time, diff, fps) {
  console.log("FPS", fps);
}

// run your local render function in the global requestAnimationFrame loop
startRender(render);

// do you need to stop only your loop?
// stopRender(render);

// do you need to stop the global requestAnimationFrame loop?
// disableRender();

// do you need to restart the global requestionFrame loop?
// enableRender();

// do you need to fire a function once, on the next frame?
function fire() {
  console.log("FIRE");
}
nextFrame(() => fire());
