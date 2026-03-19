
const webpack = require('webpack');


/**
 * 
 */
module.exports = (env, argv)=>{
  const isDev = argv.mode === 'development';
  const config = isDev? require('./webpack.dev.js'):require('./webpack.prod.js');
  const envConfig = require('dotenv').config({ path: isDev ? '.env.development' : '.env.production' });
  if(envConfig?.parsed){
    console.log('✅ .env 加载成功', envConfig.parsed);
  }else{
    console.log('❌ .env 加载失败:', envConfig.error);
  }

  return {
    ...config,
    plugins: [
      ...(config.plugins||[]),
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL': JSON.stringify(envConfig?.parsed?.API_BASE_URL),
        'process.env.MOCK_ENABLE': JSON.stringify(envConfig?.parsed?.MOCK_ENABLE),
        'process.env.LOG_LEVEL': JSON.stringify(envConfig?.parsed?.LOG_LEVEL),
      }),
    ]

  }
}
