
/**
 * Development Webpack Configuration
 */

const webpack = require('webpack');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// stuff
const autoprefixer = require('autoprefixer');

module.exports = require('./base')({
 entry: [
  //  'react-hot-loader/patch',

   require.resolve('webpack-dev-server/client') + '?/',

   require.resolve('webpack/hot/dev-server'),

   'js/main.js'
 ],

 cssLoaders: [
   {
     loader: 'style-loader'
   },
   {
     loader: 'css-loader',
     options: {
       sourceMap: true
     }
   },
   {
     loader: 'postcss-loader',
     options: {
       sourceMap: true
     }
   },
   {
     loader: 'sass-loader',
     options: {
       sourceMap: true
     }
   }
 ],

 performance: {
   hints: false
 },

 plugins: [
   new webpack.HotModuleReplacementPlugin(),

   new HtmlWebpackPlugin({
     template: 'layout/index.html',

     inject: true
   })
 ],

 devtool: 'source-map'
});
