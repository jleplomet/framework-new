import {searchUA} from "./common";

let system = false;
let webGLDetector = {};

detectSystem();

/**
 * Determine if on high resolution device
 * @return {bool}
 */
export function isRetina() {
  return system.type.retina;
}

/**
 * Determine if current device is phone
 * @return {bool}
 */
export function isPhone() {
  return system.type.phone;
}

/**
 * Determine if current device is tablet
 * @return {bool}
 */
export function isTablet() {
  return system.type.tablet;
}

/**
 * Determine if current device is desktop
 * @return {bool}
 */
export function isDesktop() {
  return system.type.desktop;
}

/**
 * Determin current OS of device
 * @return {string}
 */
export function os() {
  return system.os;
}

function detectSystem() {
  const iOSDevices = ["ios", "iphone", "ipad", "ipod"];

  system = {
    type: (() => {
      let type = {
        tablet: false,
        phone: false,
        desktop: true,
        device: "",
        retina: false,
      };

      if (
        !!("ontouchstart" in window || "onpointerdown" in window) &&
        searchUA([...iOSDevices, "windows", "android", "blackberry"])
      ) {
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
      if (searchUA("mac os") && !searchUA(iOSDevices)) {
        return "Mac";
      } else if (searchUA(iOSDevices)) {
        return "iOS";
      } else if (searchUA("android")) {
        return "Android";
      } else if (searchUA("windows")) {
        return "Windows";
      }

      return "Unknown";
    })(),
    osVersion: (() => {
      if (system.os === "iOS") {
        let version = USER_AGENT.split("os ")[1].split("_");
        let major = version[0];
        let minor = version[1].split(" ")[0];

        return Number(major + "." + minor);
      } else if (system.os === "Android") {
        let version = USER_AGENT.split("android ")[1].split(";")[0];

        if (version.length > 3) {
          version = version.slice(0, -2);
        }

        return Number(version);
      }

      return "unknown";
    })(),
    webcam: !!(navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia),
  };
}
