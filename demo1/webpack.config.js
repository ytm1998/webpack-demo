
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports=(env, argv) =>{
  const isDev = argv.mode === 'development';

  // 加载对应的环境变量文件
  const envFile = isDev ? '.env.development' : '.env.production'; 
  const envConfig = dotenv.config({ path: envFile }); 
  
  // require() 加载模块，返回该模块 module.exports 导出的对象。
  const config = isDev? require('./webpack.dev.js'):require('./webpack.prod.js');


  return {
    ...config,
    plugins: [
      ...config.plugins,
      // 方式1：通过 DefinePlugin 注入
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
        'process.env.MOCK_ENABLE': JSON.stringify(process.env.MOCK_ENABLE),
        'process.env.LOG_LEVEL': JSON.stringify(process.env.LOG_LEVEL),
      }),
    ]
  }
}




























