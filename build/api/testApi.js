"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Account_1 = require("../entity/Account");
const AddVoteForm_1 = require("../form/AddVoteForm");
const CandidataSearchForm_1 = require("../form/CandidataSearchForm");
const StartVoteForm_1 = require("../form/StartVoteForm");
const VoteRecordSearchForm_1 = require("../form/VoteRecordSearchForm");
const AccountService_1 = require("../service/AccountService");
const CandidateService_1 = require("../service/CandidateService");
const VoteRecordService_1 = require("../service/VoteRecordService");
const app = express();
const port = 3000;
// 网络请求
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
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
    let account = new Account_1.Account();
    account.setName(req.body.name);
    account.setEmail(req.body.email);
    account.setIdCard(req.body.idCard);
    account.setManagerFlag(req.body.managerFlag);
    const accountService = new AccountService_1.AccountService();
    accountService.addAccount(account).then((result) => {
        res.send(result);
    });
});
/**
 * http://localhost:3000/addCandidate
 * {
    "userId":5
}
 */
// 第二步：添加候选人
// 参数： userId——用户id
app.post('/addCandidate', (req, res) => {
    const userId = req.body.userId;
    const candidateService = new CandidateService_1.CandidateService();
    candidateService.addCandidata(userId).then((result) => {
        res.send(result);
    });
});
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
    let form = new StartVoteForm_1.StartVoteForm();
    const operatorId = req.body.operatorId;
    const status = req.body.status;
    form.setOperatorId(operatorId);
    form.setStatus(status);
    const candidateService = new CandidateService_1.CandidateService();
    candidateService.startOrEndCandidata(form).then((result) => {
        res.send(result);
    });
});
/**
 * http://localhost:3000/addVoteRecord
 * {
    "candidataUserId":3,
    "voteUserId":7
}
 */
// 第四步：投票
// 参数：candidataUserId——候选人id，voteUserId——投票人id
app.post('/addVoteRecord', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let form = new AddVoteForm_1.AddVoteForm();
    const candidataUserId = req.body.candidataUserId;
    const voteUserId = req.body.voteUserId;
    form.setCandidataUserId(candidataUserId);
    form.setVoteUserId(voteUserId);
    const voteRecordService = new VoteRecordService_1.VoteRecordService();
    yield voteRecordService.addVoteRecord(form).then((result) => { console.log(result); });
    let searchForm = new VoteRecordSearchForm_1.VoteRecordSearchForm();
    yield voteRecordService.pageVoteRecords(searchForm).then((result) => {
        res.send(result);
    });
}));
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
app.get('/pageCandidates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let form = new CandidataSearchForm_1.CandidataSearchForm();
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const status = req.query.status;
    form.setStartDate(startDate);
    form.setEndDate(endDate);
    form.setStatus(status);
    const candidateService = new CandidateService_1.CandidateService();
    candidateService.pageCandidates(form).then((result) => {
        res.send(result);
    });
}));
/**
 * http://localhost:3000/pageVoteRecords?candidataUserId=3
 */
// 第六步：分页查询指定候选人投票记录
app.get('/pageVoteRecords', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let form = new VoteRecordSearchForm_1.VoteRecordSearchForm();
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const candidataUserId = req.query.candidataUserId;
    form.setStartDate(startDate);
    form.setEndDate(endDate);
    form.setCandidataUserId(candidataUserId);
    const voteRecordService = new VoteRecordService_1.VoteRecordService();
    voteRecordService.pageVoteRecords(form).then((result) => {
        res.send(result);
    });
}));
