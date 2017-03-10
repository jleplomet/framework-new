
import {loadLanguage} from './language';
import {loadAssets} from './assets';
import loadReactEnvironment from './react';

const NAMESPACE = '[lib/core]';

var _settings = {
  assets: [],
  assetsLoadProgress: false,
  assetsMaxConnections: 10,
  cdnurl: 'files/',
  phpurl: 'files/php/',
  languageFile: false,
  languageCode: 'en_us',
  useReact: false
};

var _bootMethods = [];

export function boot() {
  console.log(NAMESPACE, 'boot');

  return new Promise(resolve => {
    const { 
      assets,
      assetsLoadProgress,
      assetsMaxConnections,
      languageCode,
      languageFile,
      useReact
    } = getSettings();

    if (languageFile) {
      setBootMethod(() => loadLanguage(languageCode));
    }

    setBootMethod(() => loadAssets(assets, assetsLoadProgress, assetsMaxConnections));

    if (useReact) {
      setBootMethod(() => loadReactEnvironment());
    }

    _bootMethods.reduce((sequence, bootMethod) => {
      return sequence.then(() => bootMethod());
    }, Promise.resolve())
      .then(() => {
        console.log(NAMESPACE, 'boot complete');

        resolve();
      });
  });
}

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

/**
 * Add additional boot methods. 
 */
export function setBootMethod(method) {
  _bootMethods.push(method);
}