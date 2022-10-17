import * as express from 'express'
const app = express()
const port = 3000

// 网络请求
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/index', (req, res) => {
    res.send('Hello Index!')
})