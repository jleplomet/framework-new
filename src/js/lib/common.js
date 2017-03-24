String.prototype.strpos = function(str) {
  return this.indexOf(str) !== -1;
};

let userAgent = navigator.userAgent.toLowerCase();

export function searchUA(val) {
  if (typeof val === "string") {
    val = [val];
  }

  let i = 0;
  let l = val.length;

  for (; i < l; i++) {
    if (userAgent.strpos(val[i])) {
      return true;
    }
  }

  return false;
}

/**
 * For testing purposes only.
 */
export function setUserAgent(val) {
  userAgent = val;
}

export function withoutKey(key, obj) {
  let o = {};

  Object.keys(obj).forEach(k => {
    if (k !== key) {
      o[k] = obj[k];
    }
  });

  return o;
}
