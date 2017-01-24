
import "./common";

const userAgent = navigator.userAgent.toLowerCase();

let system = false;
let webGLDetector = {};

detectSystem();

/**
 * Determine if on high resolution device
 * @type {bool}
 */
export function isRetina() {
  return system.type.retina;
}

/**
 * Determine if current device is phone
 * @type {bool}
 */
export function isPhone() {
  return system.type.phone;
}

/**
 * Determine if current device is tablet
 * @type {bool}
 */
export function isTablet() {
  return system.type.tablet;
}

/**
 * Determine device type.
 * @type {string}
 */
export function device() {
  return system.type.device;
}

/**
 * Determine if current device is desktop
 * @type {bool}
 */
export function isDesktop() {
  return system.type.desktop;
}

/**
 * Determin current OS of device
 * @type {string}
 */
export function os() {
  return system.os;
}

function detectSystem() {
  const iOSDevices = ["ios", "iphone", "ipad", "ipod"];

  system = {
    type: (() => {
      let type = {tablet: false, phone: false, desktop: true, device: '', retina: false};

      if (!!(("ontouchstart"in window) || ("onpointerdown"in window)) && searchUA([...iOSDevices, "windows", "android", "blackberry"])) {
        type.tablet = Math.max(screen.width, screen.height) > 800;
        type.phone = !type.tablet;
        type.desktop = false;
      }

      if (window.devicePixelRatio > 1) {
        type.retina = true;
      }

      return type;
    })(),
    os: (() => {
      if (searchUA('mac os') && !searchUA(iOSDevices)) {
        return 'Mac';
      } else if (searchUA(iOSDevices)) {
        return 'iOS';
      } else if (searchUA('android')) {
        return 'Android';
      }
      else if (searchUA('windows')) {
        return 'Windows';
      }

      return 'Unknown';
    })(),
    osVersion: (() => {
      if (system.os === 'iOS') {
        let version = USER_AGENT.split("os ")[1].split("_");
        let major = version[0];
        let minor = version[1].split(" ")[0];

        return Number(major + "." + minor);
      } else if (system.os === 'Android') {
        let version = USER_AGENT.split("android ")[1].split(";")[0];

        if (version.length > 3) {
          version = version.slice(0, -2);
        }

        return Number(version);
      }

      return "unknown";
    })(),
    webcam: !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
  }

  // detect actual iPhone type.
  // todo: figure out how to figure out android type
  if ((system.type.phone || system.type.tablet) && system.os === 'iOS') {
    system.type.device = detectDevice(userAgent, 'iOS', system.osVersion);
  }
}

function searchUA(val) {
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

// https://github.com/uupaa/Spec.js
function detectDevice(ua, os, osVersion) {
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const dpr = window.devicePixelRatio;
  const long_ = Math.max(screenWidth, screenHeight);
  const short_ = Math.min(screenWidth, screenHeight);
  const retina = dpr >= 2;
  const longEdge = Math.max(long_, short_); // iPhone 4s: 480, iPhone 5: 568

  initWebGLDetector();

  switch (os) {
    case 'iOS':
      return detectIOSDevice(ua.toLowerCase(), retina, longEdge, osVersion);
  }
}

function detectIOSDevice(ua, retina, longEdge, osVersion) {
  const glVersion = webGLDetector["WEBGL_VERSION"] || "";
  const glRenderer = webGLDetector["WEBGL_RENDERER"] || "";

  const SGX543 = /543/.test(glVersion); // iPhone 4s/5/5c, iPad 2/3, iPad mini
  const SGX554 = /554/.test(glVersion); // iPad 4
  const A7     = /A7/.test(glVersion);  // iPhone 5s, iPad mini 2/3, iPad Air
  const A8X    = /A8X/.test(glVersion); // A8X, iPad Air 2
  const A8     = /A8/.test(glVersion);  // A8,  iPhone 6/6+, iPad mini 4, iPod touch 6
  const A9X    = /A9X/.test(glVersion); // A9X, iPad Pro, iPad Pro 9.7
  const A9     = /A9/.test(glVersion);  // A9,  iPhone 6s/6s+/SE
  const Metal  = /Metal/.test(glVersion); // A10, iPhone 7/7+
  const simulator = /Software/.test(glRenderer); // Simulator: "Apple Software Renderer"

  //
  // | Device                     | zoomed | longEdge | width x height |
  // |----------------------------|--------|----------|----------------|
  // | iPhone 3/3GS               |        | 480      |   320 x 480    |
  // | iPhone 4/4s/5/5c/5s/SE     |        | 568      |   320 x 568    |
  // | iPhone 6/6s/7              | YES    | 568      |   320 x 568    |
  // | iPhone 6/6s/7              |        | 667      |   375 x 667    |
  // | iPhone (6/6s/7) Plus       | YES    | 667      |   375 x 667    |
  // | iPhone (6/6s/7) Plus       |        | 736      |   414 x 736    |
  // | iPad 1/2/mini              |        | 1024     |   768 x 1024   |
  // | iPad 3/4/Air/mini2/Pro 9.7 |        | 1024     |   768 x 1024   |
  // | iPad Pro                   |        | 1366     |  1024 x 1366   |

  if (/iphone/.test(ua)) {
    if (simulator) {
      return "iPhone Simulator";
    }

    return !retina ? "iPhone 3GS" :
      longEdge <= 480 ? (SGX543 || osVersion >= 8 ? "iPhone 4s" : "iPhone4") :
      longEdge <= 568 ? (Metal ? "iPhone 7" :
                         A9 ? "iPhone SE" :
                         A8 ? "iPhone 6"  :
                         A7 ? "iPhone 5s" :
                         SGX543 ? "iPhone 5" : "Unknown") :
      longEdge <= 667 ? (Metal ? "iPhone 7" :
                         A9 ? "iPhone 6s" :
                         A8 ? "iPhone 6"  : "Unknown") :
      longEdge <= 736 ? (Metal ? "iPhone 7 Plus" :
                         A9 ? "iPhone 6s Plus": "iPhone 6 Plus") : "Unknown";
  } else if (/ipad/.test(ua)) {
    return !retina ? "iPad 2" :
      SGX543 ? "iPad 3" :
      SGX554 ? "iPad 4" :
      A7 ? "iPad Air" :
      A8X ? "iPad Air 2" :
      A8 ? "iPad Mini 4" :
      A9X ? (longEdge <= 1024 ? "iPad Pro 9.7" : "iPad Pro") : "Unknown";
  }
}

function initWebGLDetector() {
  const canvas = document.createElement("canvas");
  const idents = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];

  idents.forEach(ctx => {
    const gl = canvas.getContext(ctx);

    if (gl) {
      webGLDetector["WEBGL_CONTEXT"] = ctx;
      webGLDetector["WEBGL_VERSION"] = gl["getParameter"](gl["VERSION"]);
      // webGLDetector["WEBGL_VENDOR"] = gl["getParameter"](gl["UNMASKED_VENDOR_WEBGL"]);
      // webGLDetector["WEBGL_RENDERER"] = gl["getParameter"](gl["UNMASKED_RENDERER_WEBGL"]);
      // webGLDetector["WEBGL_SL_VERSION"] = gl["getParameter"](gl["SHADING_LANGUAGE_VERSION"]);
      // webGLDetector["MAX_TEXTURE_SIZE"] = gl["getParameter"](gl["MAX_TEXTURE_SIZE"]);
      webGLDetector["DETECTED"] = true;
    }
  });
}

function initwebGLDetector() {
  const canvas = document.createElement("canvas");
  const idents = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];

  idents.forEach(ctx => {
    const gl = canvas.getContext(ctx);

    if (gl) {
      webGLDetector["WEBGL_CONTEXT"] = ctx;
      webGLDetector["WEBGL_VERSION"] = gl["getParameter"](gl["VERSION"]);
      // webGLDetector["WEBGL_VENDOR"] = gl["getParameter"](gl["UNMASKED_VENDOR_WEBGL"]);
      // webGLDetector["WEBGL_RENDERER"] = gl["getParameter"](gl["UNMASKED_RENDERER_WEBGL"]);
      // webGLDetector["WEBGL_SL_VERSION"] = gl["getParameter"](gl["SHADING_LANGUAGE_VERSION"]);
      // webGLDetector["MAX_TEXTURE_SIZE"] = gl["getParameter"](gl["MAX_TEXTURE_SIZE"]);
      webGLDetector["DETECTED"] = true;
    }
  });
}