
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name][contenthash:8].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles/*": path.resolve(__dirname, "src/styles"),
    },
  },
  module: {
    rules:[
      {
        test: /\.(png|jpe?g|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "icons/[name][ext]"
        }
      },
      {
        test:/\.js$/,
        use: [
          "babel-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.ts/,
        use: [
          "babel-loader",
          "ts-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: [
          "babel-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          "ts-loader"
        ],
        exclude: /node_modules/
      }
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      
    })
  ],
}