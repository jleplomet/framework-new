
self.addEventListener('message', receiveMessage);

function receiveMessage(event) {
  var data         = event.data;
  var action       = data.action;
  var transferable = data.transferable;
  var payload      = !transferable ? data.payload : data;
  var method       = payload.method;

  switch (action) {
    case 'extend':
      Object.assign(self, _parse(payload.methods));
      break;
    case 'execute':
      if (self[method]) {
        self[method].apply(null, payload.args);
      }
      break;
    case 'executeTransferable':
      delete data.action;
      delete data.method;
      delete data.transferable;

      if (self[method]) {
        self[method].apply(null, convertObjToArray(payload));
      }
      break;
    case 'remove':
      delete self[method];
      break;
  }

}

function log() {
  emit("log", Array.prototype.slice.call(arguments));
}

function emit(type, payload) {
  self.postMessage({type: type, payload: payload});
}

function emitTransferable(type, payload, transferable) {
  self.postMessage(
    Object.assign({type: type, transferable: true}, payload),
    transferable
  );
}

function convertObjToArray(obj) {
  return Object.keys(obj).map(function(k) {return obj[k];});
}

function _parse(str, date2obj) {
  var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;

  return JSON.parse(str, function (key, value) {
    if (typeof value != 'string') return value;
    if (value.length < 8) return value;
    if (iso8061 && value.match(iso8061)) return new Date(value);
    if (value.substring(0, 8) === 'function') return eval('(' + value + ')');
    if (value.substring(0, 8) === '_PxEgEr_') return eval(value.slice(8));
    return value;
  });
}

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}
