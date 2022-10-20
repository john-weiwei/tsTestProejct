import express = require('express')
import { PageInfo } from '../common/PageInfo'
import { Account } from '../entity/Account'
import { StatusEnum } from '../enum/StatusEnum'
import { AddVoteForm } from '../form/AddVoteForm'
import { CandidataSearchForm } from '../form/CandidataSearchForm'
import { StartVoteForm } from '../form/StartVoteForm'
import { VoteRecordSearchForm } from '../form/VoteRecordSearchForm'
import { Test } from '../HelloWorld'
import { AccountService } from '../service/AccountService'
import { CandidateService } from '../service/CandidateService'
import { VoteRecordService } from '../service/VoteRecordService'
const app = express()
const port = 3000

// 网络请求
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// 分页查询列表
app.get('/listOrder', (req, res) => {
  let test: Test = new Test()
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

/**
 * http://localhost:3000/addAccount
  {
  "name":"liusan",
    "email":"812072735@qq.com",
    "idCard":"A123456(9)",
    "managerFlag":true
}
 */
// 第一步：新增账户
// 参数： name——用户名,email——邮箱,idCard——身份证,managerFlag——是否管理员 true-是，false-否)
app.post('/addAccount', (req, res) => {
  let account: Account = new Account()
  account.setName(req.body.name)
  account.setEmail(req.body.email)
  account.setIdCard(req.body.idCard)
  account.setManagerFlag(req.body.managerFlag)
  const accountService: AccountService = new AccountService()
  accountService.addAccount(account).then((result) => {
    res.send(result)
  })
})

/**
 * http://localhost:3000/addCandidate
 * {
    "userId":5
}
 */
// 第二步：添加候选人
// 参数： userId——用户id
app.post('/addCandidate', (req, res) => {
  const userId: string = req.body.userId
  const candidateService: CandidateService = new CandidateService()
  candidateService.addCandidata(userId).then((result) => {
    res.send(result)
  })
})


/**
 * http://localhost:3000/startOrEndCandidata
 * {
    "operatorId":11,
    "status":"START"
}
 */
// 第三步：开始或结束投票
// 参数： operatorId——操作人id,status——选择状态START:开始,ENDED:结束
app.post('/startOrEndCandidata', (req, res) => {
  let form: StartVoteForm = new StartVoteForm()
  const operatorId: string = req.body.operatorId
  const status: StatusEnum = req.body.status
  form.setOperatorId(operatorId)
  form.setStatus(status)
  const candidateService: CandidateService = new CandidateService()
  candidateService.startOrEndCandidata(form).then((result) => {
    res.send(result)
  })
})

/**
 * http://localhost:3000/addVoteRecord
 * {
	"candidataUserId":3,
    "voteUserId":7
}
 */
// 第四步：投票
// 参数：candidataUserId——候选人id，voteUserId——投票人id
app.post('/addVoteRecord', async (req, res) => {
  let form: AddVoteForm = new AddVoteForm()
  const candidataUserId: string = req.body.candidataUserId
  const voteUserId: string = req.body.voteUserId
  form.setCandidataUserId(candidataUserId)
  form.setVoteUserId(voteUserId)

  const voteRecordService: VoteRecordService = new VoteRecordService()
  await voteRecordService.addVoteRecord(form).then((result) => { console.log(result) })

  let searchForm: VoteRecordSearchForm = new VoteRecordSearchForm()
  await voteRecordService.pageVoteRecords(searchForm).then((result) => {
    res.send(result)
  })
})

/**
 * http://localhost:3000/pageCandidates?currentPage=1&pageSize=10&startDate=2022-10-19&endDate=2022-10-20
 */
// 第五步：分页查询候选人信息
// 参数：startDate——开始时间，endDate——结束时间
// status——选举状态
// NOT_STARTED = 'NOT_STARTED', // 未开始
// START = 'START', // 开始
// PROCESSING = 'POCESSING', // 进行中
// ENDED = 'ENDED' // 已结束
app.get('/pageCandidates', async (req, res) => {
  let form: CandidataSearchForm = new CandidataSearchForm()
  const startDate: any = req.query.startDate
  const endDate: any = req.query.endDate
  const status: any = req.query.status
  form.setStartDate(startDate)
  form.setEndDate(endDate)
  form.setStatus(status)

  const candidateService: CandidateService = new CandidateService()
  candidateService.pageCandidates(form).then((result) => {
    res.send(result)
  })
})

/**
 * http://localhost:3000/pageVoteRecords?candidataUserId=3
 */
// 第六步：分页查询指定候选人投票记录
app.get('/pageVoteRecords', async (req, res) => {
  let form: VoteRecordSearchForm = new VoteRecordSearchForm()
  const startDate: any = req.query.startDate
  const endDate: any = req.query.endDate
  const candidataUserId: any = req.query.candidataUserId
  form.setStartDate(startDate)
  form.setEndDate(endDate)
  form.setCandidataUserId(candidataUserId)

  const voteRecordService: VoteRecordService = new VoteRecordService()
  voteRecordService.pageVoteRecords(form).then((result) => {
    res.send(result)
  })
})


