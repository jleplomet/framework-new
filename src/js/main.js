import "js/plugins";

import "scss/main";

import {setSettings, boot} from "js/lib/core";
import {nextFrame} from "js/lib/render";

// first to load is code that only deals with asset loading and stuff. once thats done, we will demand code to boot up site.
// that way, initial bundle will be tiny and only do one thing. load assets :-)

let settings = {
  languageCode: "text",
  useReact: true,
};

setSettings(settings);

async function start() {
  // we are using react so we will recieve store, and a navigate function for the router
  let {store, navigate} = await boot();

  // at this point, its pretty much guarenteed that react is up and running and
  // rendered.
  console.log("all done.");

  navigate("/landing");
}

nextFrame(start);
