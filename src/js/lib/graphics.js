
import "./common";

let graphics = false;

detectGraphics();

/**
 * Get GPU type
 * 
 * @returns {false|string}
 */
export function gpu() {
  return graphics ? graphics.gpu : false;
}

/**
 * Search GPU type
 * 
 * @returns {Boolean}
 */
export function detectGpu(needle) {
  return (graphics && graphics.gpu && graphics.gpu.strpos(needle))
}

function detectGraphics() {
  try {
    var gl;
    var types = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var canvas = document.createElement("canvas");

    for (var i = 0, l = types.length; i < l; i++) {
      gl = canvas.getContext(types[i]);

      if (gl) {
        break;
      }
    }

    graphics = {};
    
    var rendererInfo = gl.getExtension('WEBGL_debug_renderer_info');

    if (rendererInfo) {
      graphics.gpu = gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
    }

    graphics.renderer   = gl.getParameter(gl.RENDERER).toLowerCase();
    graphics.version    = gl.getParameter(gl.VERSION).toLowerCase(); 
    graphics.glsl       = gl.getParameter(gl.SHADING_LANGUAGE_VERSION).toLowerCase();
    graphics.extensions = gl.getSupportedExtensions();
  } catch (e) {/* webgl not supported */}
}