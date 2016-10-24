/**
 * Created by axetroy on 16-9-15.
 */

var webpack = require('webpack');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
var path = require('path');

// webpack.config.js
module.exports = {
  entry: {
    "sql-kit": path.join(__dirname, 'index.js'),
    "sql-kit.min": path.join(__dirname, 'index.js')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: 'sqlKit',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.coffee', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: []
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      test: /\.min\.js$/
    })
  ]
};