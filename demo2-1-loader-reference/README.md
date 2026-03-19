# Demo2-1 React 项目

基于 Webpack + React + TypeScript 的项目示例，集成了 Sass 样式和图片资源支持。

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型支持
- **Webpack 5** - 模块打包
- **Sass** - CSS 预处理器
- **Babel** - JavaScript 编译器

## 项目结构

```
demo2-1/
├── public/                 # 静态资源
│   └── index.html         # HTML 模板
├── src/                    # 源代码
│   ├── assets/            # 静态资源
│   │   └── logo.svg      # 示例图片
│   ├── components/        # React 组件
│   │   ├── Counter.tsx   # 计数器组件
│   │   ├── Counter.scss
│   │   ├── ImageGallery.tsx  # 图片展示组件
│   │   └── ImageGallery.scss
│   ├── styles/           # 全局样式
│   │   └── global.scss   # 全局样式变量
│   ├── App.tsx           # 主应用组件
│   ├── App.scss
│   └── index.tsx         # 入口文件
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── webpack.config.js     # Webpack 配置
└── README.md
```

## 功能特性

- ✅ React + TypeScript 集成
- ✅ Sass/Scss 样式支持
- ✅ 图片资源导入（SVG、PNG、JPG 等）
- ✅ 路径别名支持（@、@components、@assets）
- ✅ 开发服务器热重载
- ✅ 生产环境构建优化
- ✅ Source Map 支持

## 安装依赖

```bash
npm install
```

## 开发模式

启动开发服务器，支持热重载：

```bash
npm run dev
# 或
npm start
```

访问 http://localhost:3000

## 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## Webpack 配置说明

### Loader 配置

1. **Babel Loader** - 处理 TS/TSX 文件
   - `@babel/preset-env` - 转换现代 JavaScript
   - `@babel/preset-react` - React JSX 支持
   - `@babel/preset-typescript` - TypeScript 支持

2. **Sass Loader** - 处理 Sass/Scss 文件
   - 链式调用：`sass-loader` → `css-loader` → `style-loader`

3. **Asset Modules** - 处理静态资源
   - 图片文件：小于 8KB 转 Base64，否则输出文件
   - 字体文件：直接输出到 `fonts/` 目录

### 路径别名

在 `tsconfig.json` 和 `webpack.config.js` 中配置：

| 别名 | 实际路径 |
|------|---------|
| `@` | `src/` |
| `@components` | `src/components/` |
| `@assets` | `src/assets/` |

### 开发服务器

- 端口：3000
- 热模块替换（HMR）已启用
- 自动打开浏览器
- 支持 SPA 历史路由回退

## 自定义配置

### 添加新的 Loader

在 `webpack.config.js` 的 `module.rules` 中添加规则：

```javascript
{
  test: /\.your-extension$/,
  use: 'your-loader',
}
```

### 修改构建输出

修改 `webpack.config.js` 中的 `output` 配置：

```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js',
  clean: true,
}
```

## 常见问题

### Q: 图片导入失败？
A: 确保图片路径正确，或检查 `webpack.config.js` 中的 `asset` 模块配置。

### Q: Sass 样式不生效？
A: 确认已安装 `sass` 和 `sass-loader`，并且文件扩展名为 `.scss` 或 `.sass`。

### Q: TypeScript 类型错误？
A: 检查 `tsconfig.json` 配置，确保 `jsx` 选项设置为 `react-jsx`。

## License

MIT
