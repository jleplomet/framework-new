
let _cache = {};

export default function element(selector) {
  if (!has(selector)) {
    set(selector);
  }

  return get(selector);
}

function has(selector) {
  return _cache.hasOwnProperty(selector);
}

function set(selector) {
  let results = document.querySelectorAll(selector);

  if (!results || !results.length) {
    throw new Error(`Could not find element(s) with selector ${selector}`);
  }

  _cache[selector] = results.length > 1 ? results : results[0];
}

function get(selector) {
  return _cache[selector];
}