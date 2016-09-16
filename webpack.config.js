/**
 * Created by axetroy on 16-9-15.
 */

var webpack = require('webpack');
var path = require('path');

// webpack.config.js
module.exports = {
  entry: [
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'sql-query.js',
    library: 'sql-query',
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
  plugins: []
};