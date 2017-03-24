const NAMESPACE = "[js/lib/assets]";

/**
 * Get HTTP url path for image asset. This will include the cdnurl defined for
 * the project. If cache busting filenames is enabled in Webpack config, the
 * filename will be changed to avoid cache.
 *
 * @param {string} path
 */
// export function imageAsset(path) {
//   return require(`./../../images/${path}`);
// }

/**
 * Get HTTP url path for data asset. This will include the cdnurl defined for
 * the project. If cache busting filenames is enabled in Webpack config, the
 * filename will be changed to avoid cache.
 *
 * @param {string} path
 */
// export function dataAsset(path) {
//   return require(`./../../data/${path}`);
// }

/**
 * Get HTTP url path for sound asset. This will include the cdnurl defined for
 * the project. If cache busting filenames is enabled in Webpack config, the
 * filename will be changed to avoid cache.
 *
 * @param {string} path
 */
// export function soundAsset(path) {
//   return require(`./../../sounds/${path}`);
// }

/**
 * Load a manifest of assets. This function depends on preloadjs.
 *
 * @param {Object[]} assets - createjs.LoadQueue manifest to load.
 * @param {string} assets[].id - The id of an asset
 * @param {string} assets[].src - The asset path
 * @param  {function} progress - optional callback to display load progress
 * @param  {number} [maxConnections] - the number of concurrent loads to allow.
 * @return {Promise}
 */
export function loadAssets(assets, progress, maxConnections = 10) {
  console.log(NAMESPACE, "loadAssets");

  return new Promise(resolve => {
    if (!assets.length) {
      return resolve();
    }

    console.log(NAMESPACE, `loading ${assets.length} asset(s)`);

    let queue = new createjs.LoadQueue(false);
    queue.setMaxConnections(maxConnections);

    createjs.Sound.alternateExtensions = ["ogg"];

    queue.installPlugin(createjs.Sound);

    if (progress) {
      queue.addEventListener("progress", progress);
    }

    queue.addEventListener("complete", resolve);

    queue.loadManifest(assets);
  });
}
