
const NAMESPACE = '[lib/core]';

var _settings = {
  assets: [],
  assetsLoadProgress: false,
  assetsMaxConnections: 10,
  cdnurl: 'files/',
  phpurl: 'files/php/'
};

var _bootMethods = [];

/**
 * Get default core settings.
 * 
 * @returns {Object}
 */
export function getSettings() {
  return _settings;
}

/**
 * Update default core settings.
 * 
 * @param {Object} settings - The object to merge with default core settings
 */
export function setSettings(settings) {
  _settings = Object.assign(_settings, settings);
}

export function setBootMethod(method) {
  if (!_bootMethods.indexOf(method)) {
    _bootMethods.push(method);
  }
}