import cdnurl from "js/cdnurl";

const NAMESPACE = "[js/lib/language]";

let _language = false;

export async function loadLanguage(code, cb) {
  console.log(NAMESPACE, "loadLanguage", code);

  let url = `${cdnurl}data/${code}.json`;

  return fetch(url, {credentials: "same-origin"})
    .then(response => response.json())
    .then(data => {
      _language = data;

      if (cb) {
        cb(language);
      }
    });
}
