# Express 快速入门

## 1. 安装

```bash
npm init -y
npm install express
```

## 2. 基础服务

```javascript
// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());  // 解析 JSON
app.use(express.urlencoded({ extended: true }));  // 解析表单

// GET 请求
app.get('/api/user', (req, res) => {
  res.json({ id: 1, name: 'Tom' });
});

// POST 请求
app.post('/api/user', (req, res) => {
  console.log(req.body);  // 获取请求体
  res.json({ success: true });
});

// 启动
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## 3. 路由参数

```javascript
// 路径参数
app.get('/user/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// 查询参数
app.get('/search', (req, res) => {
  res.json({ q: req.query.q });
});
```

## 4. CORS 跨域配置

```javascript
// 方式1：手动设置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 方式2：使用 cors 中间件
// npm install cors
const cors = require('cors');
app.use(cors());
```

## 5. 静态文件

```javascript
app.use(express.static('public'));  // public 目录下的文件直接访问
```

## 6. 启动

```bash
node server.js
```

---

## 常用 API 对照

| Express | 说明 |
|---------|------|
| `app.get()` | 处理 GET |
| `app.post()` | 处理 POST |
| `app.put()` | 处理 PUT |
| `app.delete()` | 处理 DELETE |
| `app.use()` | 使用中间件 |
| `req.params` | 路径参数 |
| `req.query` | 查询参数 |
| `req.body` | 请求体 |
| `res.json()` | 返回 JSON |
| `res.send()` | 返回文本 |
| `res.status()` | 设置状态码 |
