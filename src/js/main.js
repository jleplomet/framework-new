
// import "babel-polyfill";
import "js/plugins";

import "css/main";

// import {setSettings, boot} from 'js/lib/core';
// import {imageAsset, loadAssets} from 'js/lib/assets';

// first to load is code that only deals with asset loading and stuff. once thats done, we will demand code to boot up site.
// that way, initial bundle will be tiny and only do one thing. load assets :-)

// let settings = {
//   assets: [{id: 'test', src: imageAsset('test.png')}],
//   languageFile: true,
//   useReact: true
// };

// setSettings(settings);

// boot();

console.log('Hello');

async function loadReact() {
  try {
    let React = await import('react');
    console.log('React loaded');
    let ReactDom = await import('react-dom');
    console.log('ReactDom loaded');
  } catch (e) {
    console.error("loadReact error");
    return new Error(e);
  }
}

loadReact();