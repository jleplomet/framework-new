import "js/plugins";

import "css/main";

import {MEMORY_HISTORY, setSettings, boot} from "js/lib/core";
import {nextFrame} from "js/lib/render";
// import {imageAsset, loadAssets} from 'js/lib/assets';

// first to load is code that only deals with asset loading and stuff. once thats done, we will demand code to boot up site.
// that way, initial bundle will be tiny and only do one thing. load assets :-)

let settings = {
  languageFile: true,
  useReact: false,
  useRouter: MEMORY_HISTORY,
};

setSettings(settings);

async function start() {
  await boot();

  // at this point, its pretty much guarenteed that react is up and running and
  // rendered. although, if there is animation, not sure how that will tie in.
  console.log("all done.");
}

nextFrame(start);
