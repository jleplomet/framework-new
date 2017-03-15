import {loadLanguage} from "./language";
import {loadAssets} from "./assets";
import element from "./element";

const NAMESPACE = "[lib/core]";

var _settings = {
  assets: [],
  assetsLoadProgress: false,
  assetsMaxConnections: 10,
  cdnurl: "files/",
  phpurl: "files/php/",
  languageFile: false,
  languageCode: "en_us",
  useReact: false,
  reactMountSelector: "[data-app]",
};

var _bootMethods = [];

export function boot() {
  console.log(NAMESPACE, "boot");

  const {
    assets,
    assetsLoadProgress,
    assetsMaxConnections,
    languageCode,
    languageFile,
    useReact,
  } = getSettings();

  if (languageFile) {
    setBootMethod(() => loadLanguage(languageCode));
  }

  setBootMethod(() =>
    loadAssets(assets, assetsLoadProgress, assetsMaxConnections));

  return _bootMethods
    .reduce(
      (sequence, bootMethod) => {
        return sequence.then(() => bootMethod());
      },
      Promise.resolve()
    )
    .then(async () => {
      if (useReact) {
        await loadReact();
      }

      console.log(NAMESPACE, "boot complete");
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

async function loadReact() {
  console.log(NAMESPACE, "loadReact");

  const {reactMountSelector} = getSettings();

  let reactEnvironment = await import("js/lib/react");
  let routes = await import("js/routes");

  let reactMountElement = element(reactMountSelector);

  return reactEnvironment.renderReact(reactMountElement, routes.default);
}
