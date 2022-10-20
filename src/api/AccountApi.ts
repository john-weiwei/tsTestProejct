import express = require('express')
const app = express()
// 网络请求
app.get('/index', (req, res) => {
    res.send('Hello index!')
  })