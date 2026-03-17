const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    about: './about.js',
    home: './home.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'about',
      filename: 'about.html',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: './home.html',
      chunks: ['home'],
    }),
  ],



}