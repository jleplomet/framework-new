/**
 * Development Webpack Configuration
 */

const path = require("path");
const webpack = require("webpack");

// webpack plugins
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

// stuff
var autoprefixer = require("autoprefixer");

module.exports = require("./base")({
  entry: {
    common: ["whatwg-fetch", "js/plugins/soundjs", "js/plugins/preloadjs"],

    // react: ["react", "react-dom"],

    main: "js/main",
  },

  output: {
    path: "./dist/files/",

    publicPath: "files/",

    filename: "chunk.[name].[chunkhash:8].js",
  },

  cssLoaders: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
      },
      {
        loader: "postcss-loader",
      },
      {
        loader: "sass-loader",
      },
    ],
    publicPath: "../",
  }),

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new BundleAnalyzerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ["common"],
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "main",
      async: true,
    }),

    // split css to its own file
    new ExtractTextPlugin({
      filename: "main.css",
      disable: false,
      allChunks: true,
    }),

    // minify js fils
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),

    new HtmlWebpackPlugin({
      filename: "../index.html",
      template: "layout/index.html",
      excludeChunks: ["react"],
    }),

    // new SWPrecacheWebpackPlugin({
    //   cacheId: "cache",
    //   filename: "../service-worker.js",
    //   staticFileGlobs: [
    //     "./dist/files/**/*.js",
    //     "./dist/files/**/*.css",
    //     "./dist/files/**/*.{png,jpg,gif,svg}",
    //     "./dist/*.html",
    //   ],
    //   stripPrefix: "./dist/",
    // }),
  ],

  performance: {
    hints: "warning",
    maxEntrypointSize: 400000,
  },
});
