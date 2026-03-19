
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports=(env, argv) =>{
  const isDev = argv.mode === 'development';

  // 加载对应的环境变量文件
  const envFile = isDev ? '.env.development' : '.env.production'; 
  const envConfig = dotenv.config({ path: envFile }); 
  // 调试：直接打印结果
if (!envConfig.error) {
  console.log('✅ .env 加载成功');
  console.log(envConfig.parsed);
} else {
  console.log('❌ .env 加载失败:', envConfig.error);
}

  // require() 加载模块，返回该模块 module.exports 导出的对象。
  const config = isDev? require('./webpack.dev.js'):require('./webpack.prod.js');


  return {
    ...config,
    plugins: [
      ...config.plugins,
      // 方式1：通过 DefinePlugin 注入
       new webpack.DefinePlugin({
        // 正确：使用 envConfig.parsed 中的值
        'process.env.API_BASE_URL': JSON.stringify(envConfig.parsed?.API_BASE_URL || ''),
        'process.env.MOCK_ENABLE': JSON.stringify(envConfig.parsed?.MOCK_ENABLE || 'false'),
        'process.env.LOG_LEVEL': JSON.stringify(envConfig.parsed?.LOG_LEVEL || 'info'),
      }),
    ]
  }
}




























