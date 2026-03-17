const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: '[name].[contenthash:8].bundle.js',
    chunkFilename: '[name].[contenthash:8].chunk.js'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    }
  }
})