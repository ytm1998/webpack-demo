# Demo2-1 项目 Loader 配置参考文档

> 本项目为 React + TypeScript + Webpack 完整配置示例

## 项目结构

```
demo2-1/
├── webpack.config.js      # 入口配置（环境判断 + 环境变量注入）
├── webpack.common.js      # 通用配置（基础 Loader）
├── webpack.dev.js         # 开发环境配置（样式 Loader）
├── webpack.prod.js        # 生产环境配置（CSS 提取 Loader）
├── package.json
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── public/
│   └── index.html         # HTML 模板
└── src/
    ├── index.tsx          # 入口文件
    ├── components/        # 组件目录
    ├── assets/            # 静态资源
    └── styles/            # 样式文件
```

---

## 1. webpack.common.js - 通用配置

**作用**：处理所有环境通用的资源文件（JS、TS、JSX、TSX、图片等）

```javascript
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
    rules: [
      // ============================================
      // 图片资源：小于 10KB 转 base64
      // ============================================
      {
        test: /\.(png|jpe?g|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024  // 10KB 阈值
          }
        }
      },
      // ============================================
      // SVG 资源：输出到 icons/ 目录
      // ============================================
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "icons/[name][ext]"
        }
      },
      // ============================================
      // JS 文件：Babel 转译
      // ============================================
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      // ============================================
      // TS 文件：Babel + TypeScript 双 Loader
      // 执行顺序：从右到左（ts-loader → babel-loader）
      // ============================================
      {
        test: /\.ts/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/
      },
      // ============================================
      // JSX 文件：Babel 转译（React 语法）
      // ============================================
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      // ============================================
      // TSX 文件：Babel + TypeScript 双 Loader
      // ============================================
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
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
```

### 关键 Loader 说明

| 文件类型 | Loader 链 | 执行顺序 | 说明 |
|---------|----------|---------|------|
| `.js` | `babel-loader` | 单一 | ES6+ 转译，排除 node_modules |
| `.ts` | `babel-loader` ← `ts-loader` | 从右到左 | 先 TS 编译，再 Babel 转译 |
| `.tsx` | `babel-loader` ← `ts-loader` | 从右到左 | React + TypeScript 支持 |
| 图片 | `asset` (Webpack5 内置) | - | 小于 10KB 自动转 base64 |
| SVG | `asset/resource` | - | 输出到 icons/ 目录 |

---

## 2. webpack.dev.js - 开发环境配置

**作用**：使用 `style-loader` 将 CSS 注入到 DOM（热更新友好）

```javascript
const { merge } = require('webpack-merge');
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

  module: {
    rules: [
      ...common.module.rules,
      // ============================================
      // CSS：直接注入 DOM（开发环境）
      // 执行顺序：css-loader → style-loader
      // ============================================
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // ============================================
      // SCSS：编译后注入 DOM
      // 执行顺序：sass-loader → css-loader → style-loader
      // ============================================
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // ============================================
      // LESS：编译后注入 DOM
      // 执行顺序：less-loader → css-loader → style-loader
      // ============================================
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
    ]
  }
});
```

### Loader 执行链（从右到左）

```
.scss 文件 → sass-loader (编译 SCSS 为 CSS)
          → css-loader (解析 @import 和 url())
          → style-loader (注入 DOM)
```

---

## 3. webpack.prod.js - 生产环境配置

**作用**：使用 `MiniCssExtractPlugin` 提取 CSS 为独立文件（缓存优化）

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  module: {
    rules: [
      ...common.module.rules,
      // ============================================
      // CSS：提取为独立文件（生产环境）
      // 执行顺序：postcss-loader → css-loader → MiniCssExtractPlugin.loader
      // ============================================
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,  // 提取 CSS 为独立文件
          'css-loader',
          'postcss-loader'               // 添加浏览器前缀
        ]
      },
      // ============================================
      // SCSS：提取为独立文件
      // ============================================
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // ============================================
      // LESS：提取为独立文件
      // ============================================
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin()  // 必须配合插件使用
  ]
});
```

### 为什么同时使用 Loader 和 Plugin？

| | **MiniCssExtractPlugin.loader** | **MiniCssExtractPlugin** (plugin) |
|---|---|---|
| **作用** | 将 CSS 从 JS 中提取出来 | 将提取的 CSS 保存为独立文件 |
| **阶段** | 编译阶段（处理模块） | 生成阶段（输出文件） |
| **类比** | 工厂的生产线工人 | 工厂的打包出货部门 |

**执行流程：**

```
less-loader → postcss-loader → css-loader → MiniCssExtractPlugin.loader → MiniCssExtractPlugin(plugin)
    ↓               ↓                ↓                  ↓                           ↓
 编译 Less      添加前缀      解析 @import       从 JS 提取 CSS            写入 .css 文件
```

**⚠️ 注意：** 两者必须同时使用！
- 只用 loader：CSS 被提取但无法输出到文件，会报错
- 只用 plugin：CSS 还在 JS 里，plugin 没有东西可处理

### 关键区别

| 环境 | 样式 Loader | CSS 处理方式 | 适用场景 |
|-----|------------|-------------|---------|
| 开发 | `style-loader` | 注入 DOM | 热更新快，无独立文件 |
| 生产 | `MiniCssExtractPlugin.loader` | 提取独立文件 | 缓存、并行加载 |

---

## 4. webpack.config.js - 入口配置

**作用**：根据环境动态加载配置，并注入环境变量

```javascript
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  // 根据环境加载对应配置
  const config = isDev
    ? require('./webpack.dev.js')
    : require('./webpack.prod.js');

  // 加载环境变量
  const envConfig = require('dotenv').config({
    path: isDev ? '.env.development' : '.env.production'
  });

  if (envConfig?.parsed) {
    console.log('✅ .env 加载成功', envConfig.parsed);
  } else {
    console.log('❌ .env 加载失败:', envConfig.error);
  }

  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      // 使用 DefinePlugin 注入环境变量
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL': JSON.stringify(envConfig?.parsed?.API_BASE_URL),
        'process.env.MOCK_ENABLE': JSON.stringify(envConfig?.parsed?.MOCK_ENABLE),
        'process.env.LOG_LEVEL': JSON.stringify(envConfig?.parsed?.LOG_LEVEL),
      }),
    ]
  }
}
```

---

## 5. package.json - 依赖清单

```json
{
  "name": "demo2-1-react-webpack",
  "version": "1.0.0",
  "description": "React + TypeScript + Webpack 项目配置示例",
  "scripts": {
    "dev": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "start": "webpack serve --mode development"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@babel/preset-react": "^7.23.0",
    "@babel/preset-typescript": "^7.23.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "babel-loader": "^9.1.3",
    "css-loader": "^6.8.1",
    "dotenv": "^17.3.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.3",
    "mini-css-extract-plugin": "^2.10.1",
    "postcss": "^8.5.8",
    "postcss-loader": "^8.2.1",
    "sass": "^1.69.0",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "ts-loader": "^9.5.4",
    "typescript": "^5.2.2",
    "url-loader": "^4.1.1",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "webpack-merge": "^5.10.0"
  }
}
```

---

## 6. Babel 配置（babel.config.js）

```javascript
module.exports = {
  presets: [
    // 预设环境转换
    ['@babel/preset-env', {
      targets: {
        browsers: ['> 1%', 'last 2 versions']
      },
      useBuiltIns: 'usage',
      corejs: 3
    }],
    // React 支持（JSX 转换）
    ['@babel/preset-react', {
      runtime: 'automatic'  // React 17+ 自动 runtime
    }],
    // TypeScript 支持
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true
    }]
  ]
};
```

---

## Loader 配置总览表

| 文件类型 | 开发环境 Loader | 生产环境 Loader | 所在文件 |
|---------|---------------|---------------|---------|
| JS/JSX | `babel-loader` | `babel-loader` | `webpack.common.js` |
| TS/TSX | `babel-loader` ← `ts-loader` | `babel-loader` ← `ts-loader` | `webpack.common.js` |
| CSS | `style-loader` ← `css-loader` | `MiniCssExtractPlugin.loader` ← `css-loader` ← `postcss-loader` | `webpack.dev.js` / `webpack.prod.js` |
| SCSS | `style-loader` ← `css-loader` ← `sass-loader` | `MiniCssExtractPlugin.loader` ← `css-loader` ← `postcss-loader` ← `sass-loader` | `webpack.dev.js` / `webpack.prod.js` |
| LESS | `style-loader` ← `css-loader` ← `less-loader` | `MiniCssExtractPlugin.loader` ← `css-loader` ← `postcss-loader` ← `less-loader` | `webpack.dev.js` / `webpack.prod.js` |
| 图片 | `asset` (内置) | `asset` (内置) | `webpack.common.js` |
| SVG | `asset/resource` | `asset/resource` | `webpack.common.js` |

---

## 核心设计要点

### 1. 配置分离原则

```
webpack.common.js  # 通用配置（entry、output、resolve、基础 Loader）
webpack.dev.js     # 开发配置（devServer、style-loader）
webpack.prod.js    # 生产配置（MiniCssExtractPlugin、postcss-loader）
webpack.config.js  # 入口配置（环境判断、环境变量注入）
```

### 2. 样式处理差异

```
开发环境：style-loader（快，热更新友好，CSS 在 JS 中）
生产环境：MiniCssExtractPlugin（缓存优化，CSS 独立文件）
```

### 3. Loader 执行顺序

```
use: [loaderA, loaderB, loaderC]
执行顺序：loaderC → loaderB → loaderA（从右到左）
```

### 4. TypeScript 双 Loader 设计

```
ts-loader: 负责 TypeScript 类型检查和编译
babel-loader: 负责 ES6+ 语法转译和 polyfill 注入
```

---

## 参考链接

- [webpack-merge 文档](https://github.com/survivejs/webpack-merge)
- [MiniCssExtractPlugin 文档](https://webpack.js.org/plugins/mini-css-extract-plugin/)
- [Babel Loader 文档](https://github.com/babel/babel-loader)
- [TypeScript Loader 文档](https://github.com/TypeStrong/ts-loader)
