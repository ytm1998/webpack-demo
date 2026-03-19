const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  
  devServer: {
    static: "./dist",
    port: 8080,
    hot: true,
    open: true,
  },
  module:{
    rules: [
      ...common.module.rules,
      {
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use:[
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ]
  }



})

