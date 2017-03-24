const NAMESPACE = "[js/lib/thread]";

import cdnurl from "js/cdnurl";

/**
 * Utility for working with Web Workers.
 *
 * Threads are created on an as needed basis.
 *
 * Example
 *
 *   const thread = new Thread();
 *   thread.extend({
 *     hello(name) {
 *       // some complex processing?
 *
 *       self.emit('hello', {name})
 *     }
 *   });
 *   thread.on('hello', data => console.log('hello', data.name));
 *   thread.execute('hello', 'world!');
 */
export default class Thread {
  constructor() {
    const worker = `${cdnurl}/worker.js`;

    this._callbacks = {};
    this._onMessage = this._onMessage.bind(this);

    this._worker = new Worker(worker);
    this._worker.addEventListener("message", this._onMessage);
  }

  /**
   * Extend the Web Worker to include custom methods for the active thread only.
   * This is the same as importScripts but allows us to send an object of
   * methods vs creating external scripts to import.
   * @param  {object} methods The Object containing functions to execute
   * @return {void}
   */
  extend(...methods) {
    methods.forEach(method =>
      this._send("extend", {methods: _stringify(method)}));
  }

  /**
   * Execute function to be handled by the Web Worker
   *
   * @param  {string} method  The function name to execute
   * @param  {array} args Arguments if any, to be applied to the function
   * @return {void}
   */
  execute(method, ...args) {
    this._send("execute", {method, args});
  }

  /**
   * Execute function to send large data structures with the Web Worker
   * Transferable option.
   *
   * @param  {string} method       The function name to execute
   * @param  {[type]} payload      Data to send over
   * @param  {[type]} transferable Transferable data to send over
   */
  executeTransferable(method, payload, transferable) {
    this._sendTransferable(
      "executeTransferable",
      {method, ...payload},
      transferable
    );
  }

  remove(method) {
    this.execute("remove", method);
  }

  /**
   * Listen to callback for when the Web Worker function completes and emits an
   * event.
   *
   * @param  {string}   type     The type of event
   * @param  {Function} callback Event handler
   */
  on(type, callback) {
    this._callbacks[type] = callback;
  }

  /**
   * Delete registered callback for given type.
   *
   * @param  {string} type Callback to remove
   */
  off(type) {
    delete this._callbacks[type];
  }

  /**
   * Send instructions to Web Worker
   *
   * @param  {string} action Type of task Web Worker should handle
   * @param  {[type]} payload Data if any.
   */
  _send(action, payload) {
    this._worker.postMessage({action, payload});
  }

  _sendTransferable(action, payload, transferable) {
    this._worker.postMessage(
      {action, transferable: true, ...payload},
      transferable
    );
  }

  _onLog(event) {
    console.log.apply(console, event);
  }

  _onMessage(event) {
    const data = event.data;
    const type = data.type;
    const transferable = data.hasOwnProperty("transferable");
    const payload = !transferable ? data.payload : data;

    if (transferable) {
      // remove type and transferable from returned payload, avoid clutter.
      delete payload.type;
      delete payload.transferable;
    }

    if (type === "log") {
      return this._onLog(payload);
    }

    if (this._callbacks.hasOwnProperty(type)) {
      this._callbacks[type](payload);
    }
  }

  /**
   * Destroy the created thread and Web Worker.
   *
   */
  destroy() {
    try {
      this._worker.removeEventListener("message", this._onMessage);
      this._worker.terminate();
    } catch (e) {
      console.error(NAMESPACE, e.getMessage());
    }
  }
}

function _stringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Function || typeof value == "function") {
      return value.toString();
    }

    if (value instanceof RegExp) {
      return "_PxEgEr_" + value;
    }

    return value;
  });
}
