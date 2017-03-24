import {searchUA, setUserAgent} from "./common";

let browser = {};

detectBrowser();

/**
 * Determine if current browser vendor is Google Chrome
 * @type {bool}
 */
export function isChrome() {
  return browser.vendor.chrome;
}

/**
 * Determine if current browser vendor is Safari
 * @return {bool}
 */
export function isSafari() {
  return browser.vendor.safari;
}

/**
 * Determine if current browser vendor is Firefox
 * @return {bool}
 */
export function isFirefox() {
  return browser.vendor.firefox;
}

/**
 * Determine if current browser vendor is Microsoft Edge
 * @return {bool}
 */
export function isEdge() {
  return browser.vendor.edge;
}

/**
 * Determine if current browser vendor is IE
 * @return {bool}
 */
export function isIE() {
  return browser.vendor.ie;
}

/**
 * Determine if current browser vendor is IE 11
 * @return {bool}
 */
export function isIE11() {
  return browser.vendor.ie11;
}

/**
 * Determine if current browser supports service workers
 * @return {bool}
 */
export function serviceWorker() {
  return browser.features.serviceWorker;
}

/**
 * Determine if current browser supports Web Workers
 * @return {bool}
 */
export function webWorker() {
  return browser.features.webWorker;
}

/**
 * Determine if current browser supports touch events
 * @return {bool}
 */
export function touchEvent() {
  return browser.supports.touchEvents;
}

/**
 * Determine if current browser supports WebGL
 * @return {bool}
 */
export function webGL() {
  return browser.supports.webGL;
}

/**
 * Determine video extension browser supports
 * @return {string}
 */
export function videoExtension() {
  return browser.supports.videoExtension;
}

/**
 * Test only function
 *
 * @param {string} ua User Agent to switch out for testing
 */
export function setUA(ua) {
  setUserAgent(ua.toLowerCase());

  detectBrowser();
}

function detectBrowser() {
  browser = {
    vendor: {
      chrome: searchUA("chrome"),
      safari: searchUA("safari") && !searchUA("chrome"),
      firefox: searchUA("firefox"),
      edge: searchUA("windows") && searchUA("edge"),
      ie: searchUA("msie") || (searchUA("trident") && searchUA("rv:")),
      ie11: searchUA("msie") && searchUA("11.0"),
    },
    features: {
      serviceWorker: "serviceWorker" in navigator &&
        (location.protocol === "https" ||
          location.hostname === "localhost" ||
          location.hostname.indexOf("127.") === 0),
      webWorker: typeof window.Worker !== "undefined",
    },
    supports: {
      touchEvents: "ontouchstart" in window,
      videoExtension: (() => {
        let videoElement = document.createElement("video");

        if (!videoElement.canPlayType) {
          return false;
        }

        if (searchUA("chrome")) {
          return "webm";
        }

        if (searchUA("firefox")) {
          if (videoElement.canPlayType("video/webm; codecs='vorbis,vp8'")) {
            return "webm";
          }

          return "ogv";
        }

        return "mp4";
      })(),
      webGL: (() => {
        try {
          const canvas = document.createElement("canvas");

          return !!(window.WebGLRenderingContext &&
            (canvas.getContext("webgl") ||
              canvas.getContext("experimental-webgl")));
        } catch (e) {
          return false;
        }
      })(),
    },
  };
}
