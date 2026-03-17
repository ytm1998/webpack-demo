
// entry output plugin mode module
const {merge} = require("webpack-merge");

const common = require("./webpack.common");




module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    hot: true,
    port: 8080,
    open: true,
    historyApiFallback: { // devServer 没有配置 historyApiFallback 来支持多页面访问。当访问 `/` 时，默认找不到 index.html，就会显示 "Cannot GET /"
      rewrites: [
        { from: /^\/$/, to: '/home.html' },      // 访问 / 返回 home.html
        { from: /^\/home/, to: '/home.html' },   // 访问 /home 返回 home.html
        { from: /^\/about/, to: '/about.html' }, // 访问 /about 返回 about.html
      ],
    },

  },
  output: {
    filename: "[name].bundle.js",
  }


})