import {loadLanguage} from "./language";
import {loadAssets} from "./assets";
import {nextFrame} from "./render";
import element from "./element";

const NAMESPACE = "[lib/core]";

/**
 * Default history type. Routing does not persist state across sessions.
 *
 * @type {string}
 */
export const MEMORY_HISTORY = "createMemoryHistory";
/**
 * Routing with hashtag support.
 *
 * @type {string}
 */
export const HASH_HISTORY = "createHashHistory";
/**
 * Routing with HTML5 History API support.
 *
 * @type {string}
 */
export const BROWSER_HISTORY = "createBrowserHistory";

let _settings = {
  assets: [],
  assetsLoadProgress: false,
  assetsMaxConnections: 10,
  languageCode: false,
  useReact: false,
  useRouter: MEMORY_HISTORY,
  reactMountSelector: "[data-app]",
};

let _bootMethods = [];
let _stateMethods = [];
let _defaultReducers = {};

export function boot() {
  console.log(NAMESPACE, "boot");

  const {
    assets,
    assetsLoadProgress,
    assetsMaxConnections,
    languageCode,
    useReact,
  } = getSettings();

  if (languageCode) {
    addBootMethod(() => loadLanguage(languageCode));
  }

  if (assets.length) {
    addBootMethod(() =>
      loadAssets(assets, assetsLoadProgress, assetsMaxConnections)
    );
  }

  return new Promise(async resolve => {
    await Promise.all(_bootMethods.map(method => method()));

    console.log(NAMESPACE, "bootMethods complete");

    if (useReact) {
      let {store, navigate} = await loadReact();

      console.log(NAMESPACE, "loadReact complete");

      await Promise.all(_stateMethods.map(method => method(store.dispatch)));

      console.log(NAMESPACE, "stateMethods complete");

      console.log(NAMESPACE, "boot complete");

      return nextFrame(() => resolve({store, navigate}));
    }

    console.log(NAMESPACE, "boot complete");

    nextFrame(() => resolve());
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
 * Add reducers for redux store.
 *
 * @param {string}   key     Identifier to repersent a piece of the store.
 * @param {function} reducer A pure function with (state, action) => state signature. It describes how an action transforms the state into the next state;
 */
export function addReducer(key, reducer) {
  Object.assign(_defaultReducers, {[key]: reducer});
}

/**
 * Function that lets us express reducers as an object mapping from action types to handlers.
 *
 * @param  {object} initialState
 * @param  {object} handlers
 * @return [object]
 */
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    // always return current state if no handler exists for action.type
    return state;
  };
}

/**
 * Add additional boot methods.
 */
export function addBootMethod(method) {
  _bootMethods.push(method);
}

export function addStateMethod(method) {
  _stateMethods.push(method);
}

async function loadReact() {
  console.log(NAMESPACE, "loadReact");

  let {reactMountSelector, useRouter} = getSettings();
  let reactEnvironment = await import("js/lib/react");
  let reactMountElement = element(reactMountSelector);

  return reactEnvironment.renderReact(
    reactMountElement,
    useRouter,
    _defaultReducers
  );
}
