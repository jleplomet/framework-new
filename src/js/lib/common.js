
String.prototype.strpos = function(str) {
  return this.indexOf(str) !== -1;
}

var userAgent = navigator.userAgent.toLowerCase();

export function searchUA(val) {
  if (typeof val === 'string') {
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