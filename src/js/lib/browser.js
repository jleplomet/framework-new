
import "./common";

var userAgent = navigator.userAgent.toLowerCase();
var browser = {};

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
 * @type {bool}
 */
export function isSafari() {
  return browser.vendor.safari;
}

/**
 * Determine if current browser vendor is Firefox
 * @type {bool}
 */
export function isFirefox() {
  return browser.vendor.firefox;
}

/**
 * Determine if current browser vendor is Microsoft Edge
 * @type {bool}
 */
export function isEdge() {
  return browser.vendor.edge;
}

/**
 * Determine if current browser vendor is IE
 * @type {bool}
 */
export function isIE() {
  return browser.vendor.ie;
}

/**
 * Determine if current browser vendor is IE 11
 * @type {bool}
 */
export function isIE11() {
  return browser.vendor.ie11;
}

/**
 * Determine if current browser supports service workers
 * @type {bool}
 */
export function serviceWorker() {
  return browser.features.serviceWorker;
}

/**
 * Determine if current browser supports Web Workers
 * @type {bool}
 */
export function webWorker() {
  return browser.features.webWorker;
}

/**
 * Determine if current browser supports touch events
 * @type {bool}
 */
export function touchEvent() {
  return browser.supports.touchEvents;
}

/**
 * Determine if current browser supports WebGL
 * @type {bool}
 */
export function webGL() {
  return browser.supports.webGL;
}

/**
 * Determine video extension browser supports
 * @type {string}
 */
export function videoExtension() {
  return browser.supports.videoExtension;
}

/**
 * Test only function
 */
export function setUserAgent(ua) {
  userAgent = ua.toLowerCase();

  detectBrowser();
}

function detectBrowser() {
  browser = {
    vendor: {
      chrome:  searchUA('chrome'),
      safari:  searchUA('safari') && !searchUA('chrome'),
      firefox: searchUA('firefox'),
      edge: searchUA('windows') && searchUA('edge'),
      ie: searchUA('msie') || (searchUA('trident') && searchUA('rv:')),
      ie11: searchUA('msie') && searchUA('11.0')
    },
    features: {
      serviceWorker: 'serviceWorker' in navigator &&
        (location.protocol === 'https' ||
         location.hostname === 'localhost' ||
         location.hostname.indexOf('127.') === 0),
      webWorker: typeof window.Worker !== 'undefined'
    },
    supports: {
      touchEvents: 'ontouchstart' in window,
      videoExtension: (() => {
        let videoElement = document.createElement('video');

        if (!videoElement.canPlayType) {
          return false;
        }

        if (searchUA('chrome')) {
          return 'webm';
        }

        if (searchUA('firefox')) {
          if (videoElement.canPlayType('video/webm; codecs="vorbis,vp8"')) {
            return 'webm';
          }

          return 'ogv';
        }

        return 'mp4';
      })(),
      webGL: (() => {
        try {
          const canvas = document.createElement('canvas');

          return !!(window.WebGLRenderingContext &&
            (canvas.getContext('webgl') ||
             canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      })()
    }
  }
}

function searchUA(val) {
  if (typeof val === 'string') {
    val = [val];
  }

  var i = 0;
  var l = val.length;

  for (; i < l; i++) {
    if (userAgent.strpos(val[i])) {
      return true;
    }
  }

  return false;
}