/**
 * Common Webpack Configuration
 */

const webpack = require("webpack");
const {resolve} = require("path");
const cdnurl = require("../src/js/cdnurl");

// webpack plugins
const CopyWebPackPlugin = require("copy-webpack-plugin");

module.exports = options => ({
  entry: options.entry,

  context: resolve(__dirname, "../src"),

  output: Object.assign(
    {
      path: resolve(__dirname, "../dist"),

      publicPath: cdnurl,

      filename: "[name].js",
    },
    options.output
  ),

  module: {
    rules: [
      // JS FILES
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // CSS FILES
      {
        test: /\.(scss|css)$/,
        use: options.cssLoaders,
        exclude: /node_modules/,
      },
      // FONT FILES
      {
        test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)$/,
        use: "file-loader?name=fonts/[name].[ext]",
        exclude: /node_modules/,
      },
      // IMAGE FILES
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: "file-loader?name=images/[path][name].[ext]&context=src/images",
        exclude: /node_modules/,
      },
      // SOUND FILES
      {
        test: /\.(mp3|ogg)$/,
        use: "file-loader?name=sounds/[name].[ext]",
        exclude: /node_modules/,
      },
      // DATA FILES
      {
        test: /\.(json)$/,
        use: "file-loader?name=data/[name].[ext]",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".js", ".scss", ".css"],

    modules: [resolve(__dirname, "../src"), "node_modules"],
  },

  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      "process.env": {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
    }),

    new webpack.NamedModulesPlugin(),

    new CopyWebPackPlugin([{from: "data", to: "data"}]),

    new CopyWebPackPlugin([{from: "images", to: "images"}]),

    new CopyWebPackPlugin([{from: "images", to: "sounds"}]),

    new CopyWebPackPlugin([{from: "js/worker.js"}]),
  ]),

  target: "web",

  stats: true,

  performance: Object.assign({}, options.performance),

  devtool: options.devtool,
});
