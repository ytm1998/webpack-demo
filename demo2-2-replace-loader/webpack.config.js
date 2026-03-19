const replaceLoader = require('./loaders/replace-loader')


module.exports = (env, argv)=> {
  return {
    "entry": './src/index.js',
    "output": {
      "path": path.resolve(__dirname, 'dist'),
      "filename":"[name][contenthash:8].js",

    },
    "mode": argv.mode,
    module: {
      rules: [
        {
          test: /.txt$/,
          use:[
            replaceLoader,
          ]
        }
      ]
    }
  }

}