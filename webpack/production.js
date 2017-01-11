
/**
 * Development Webpack Configuration
 */

 const path = require('path');
 const webpack = require('webpack');
//  const cdnurl = require('../src/js/cdnurl');

 // webpack plugins
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');

// stuff
 var autoprefixer = require('autoprefixer');

 module.exports = require('./base')({
   entry: {
     main: 'js/main',

     common: [
      //  'immutable',
       'whatwg-fetch',
       'es6-promise' // is this needed now with the babel polyfill? need to check
     ],

    //  react: [
    //    'react',
    //    'react-dom',
    //    'react-addons-css-transition-group',
    //    'react-addons-transition-group'
    //  ],

    //  reactrouter: [
    //    'react-router/es',
    //    'history'
    //  ],
     
     // this should be imported dynamically if being used.
    //  redux: [
    //    'redux',
    //    'redux-thunk',
    //    'react-redux',
    //    'react-router-redux',
    //  ]
   },

   output: {
     path: './dist/files/',

     publicPath: 'files/',

     filename: '[name].[chunkhash].js'
   },

   cssLoaders: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader'),

   plugins: [
     new webpack.LoaderOptionsPlugin({
       minimize: true,
       debug: false
     }),

     // split css to its own file
     new ExtractTextPlugin({filename: 'main.css', disable: false, allChunks: true}),

     new webpack.optimize.CommonsChunkPlugin({
       name: ['common', 'manifest']
     }),

     // minify js fils
     new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
     }),

     new HtmlWebpackPlugin({
       filename: '../index.html',
       template: 'layout/index.html',
       chunksSortMode: 'dependency',
      //  minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
      // inject: true
     })
   ]
 })
