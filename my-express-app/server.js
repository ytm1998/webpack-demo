// server.js
const express = require('express');
const app = express();
const PORT = 9096;

app.use(express.static('public'));

// GET 请求
app.get('/user', (req, res) => {
  res.json(
    {
      status: 200,
      data: [
        {
          id: 1,
          name: 'John',
          email: '<EMAIL>'
        },
        {
          id: 2,
          name: 'Jane',
          email: '<EMAIL>'
        }
      ]
    }
  )
});


app.post('/other', (req, res) => {
  res.json(
    {
      status: 200,
      data: {
        id: 1,
        name: 'John',
        email: '<EMAIL>'
      }
    }
  )
});


// 启动服务
app.listen(PORT, () => {
  console.log(`服务运行在 http://localhost:${PORT}`);
});