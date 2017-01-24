
// import "babel-polyfill";

import "css/main";

import {getSettings, setSettings} from 'js/lib/core';

let settings = {
  assets: []
};

setSettings(settings);

console.log(getSettings());
