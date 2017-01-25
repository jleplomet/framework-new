
import {dataAsset} from './assets';

const NAMESPACE = '[lib/language]';

let _language = false;

export function loadLanguage(code, cb) {
  console.log(NAMESPACE, 'loadLanguage', code);
  
  return new Promise(resolve => {
    let url = dataAsset(`${code}.json`);

    fetch(url, {credentials:'same-origin'})
      .then(response => response.json())
      .then(data => {
        _language = data;

        if (cb) {
          cb(language);
        }

        resolve();
      })
  })
}