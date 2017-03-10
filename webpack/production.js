
/**
 * Development Webpack Configuration
 */

 const path = require('path');
 const webpack = require('webpack');
//  const cdnurl = require('../src/js/cdnurl');

 // webpack plugins
 const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');

// stuff
 var autoprefixer = require('autoprefixer');

 module.exports = require('./base')({
   entry: {
     main: 'js/main',

     common: [
       'whatwg-fetch',
       'js/plugins/soundjs',
       'js/plugins/preloadjs'
     ],
   },

   output: {
     path: './dist/files/',

     publicPath: 'files/',

     filename: 'chunk.[name].[chunkhash:8].js'
   },

   cssLoaders: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader'),

   plugins: [
     new webpack.LoaderOptionsPlugin({
       minimize: true,
       debug: false
     }),

    //  new BundleAnalyzerPlugin(),
     
     new webpack.optimize.CommonsChunkPlugin({
       name: ['common', 'manifest']
     }),

     // split css to its own file
     new ExtractTextPlugin({filename: 'main.css', disable: false, allChunks: true}),

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
          comments: false
        },
     }),

     new HtmlWebpackPlugin({
       filename: '../index.html',
       template: 'layout/index.html',
     })
   ],

   performance: {
     hints: "warning",
     maxEntrypointSize: 400000
   }
 })
