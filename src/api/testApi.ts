import * as express from 'express'
import { PageInfo } from '../common/PageInfo'
import { Test } from '../HelloWorld'
const app = express.default()
const port = 3000

// 网络请求
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// 分页查询列表
app.get('/listOrder', (req, res) => {
  let test:Test = new Test()
  console.log(req.query.currentPage, req.query.pageSize)
  let currentPage: any = req.query.currentPage
  let pageSize: any = req.query.pageSize
  let page: PageInfo = new PageInfo();
  page.currentPage = parseInt(currentPage)
  page.pageSize = parseInt(pageSize)
  test.testQueryAsyncPage(page).then((data: any) => {
    res.send(data)
  })
})




