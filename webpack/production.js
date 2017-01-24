
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
       'whatwg-fetch'
     ],

     react: [
       'react',
       'react-dom'
     ],
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

     new webpack.optimize.AggressiveMergingPlugin(),
     
     new webpack.optimize.CommonsChunkPlugin({
       name: ['common', 'react', 'manifest']
     }),

     // split css to its own file
     new ExtractTextPlugin({filename: 'main.css', disable: false, allChunks: true}),

     // minify js fils
    //  new webpack.optimize.UglifyJsPlugin({
        // compress: {
        //   warnings: false,
        //   screw_ie8: true,
        //   conditionals: true,
        //   unused: true,
        //   comparisons: true,
        //   sequences: true,
        //   dead_code: true,
        //   evaluate: true,
        //   if_return: true,
        //   join_vars: true,
        // },
        // output: {
        //   comments: false
        // },
    //  }),

     new HtmlWebpackPlugin({
       filename: '../index.html',
       template: 'layout/index.html',
       chunksSortMode: 'dependency'
     })
   ]
 })
