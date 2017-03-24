import {EventEmitter} from "fbemitter";

/**
 * Event Emitter uitility based off of fbemitter.
 *
 * Documentation https://github.com/facebook/emitter
 *
 * Simple wrapper for fbemitter so we can have one global emitter
 */

const _emitter = new EventEmitter();

export function addListener(type, callback, cache) {
  const listener = _emitter.addListener(type, callback);

  if (cache) {
    cache.push(listener);
  }

  return listener;
}

export function addListenerOnce(type, callback) {
  return _emitter.once(type, callback);
}

export function emitListener(type, ...args) {
  _emitter.emit(type, ...args);
}

export function removeAllListeners(type) {
  _emitter.removeAllListeners(type);
}

export function removeAllListenersFromCache(cache) {
  cache.forEach(listener => listener.remove());

  cache.splice(0, cache.length);
}
