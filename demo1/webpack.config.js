

module.exports=(env, argv) =>{
  const isDev = argv.mode === 'development';
  return isDev? require('./webpack.dev.js'):require('./webpack.prod.js');
}




























