import "js/plugins";

import "css/main";

import {setSettings, boot} from "js/lib/core";
// import {imageAsset, loadAssets} from 'js/lib/assets';

// first to load is code that only deals with asset loading and stuff. once thats done, we will demand code to boot up site.
// that way, initial bundle will be tiny and only do one thing. load assets :-)

let settings = {
  languageFile: true,
  useReact: true,
};

setSettings(settings);

boot();
