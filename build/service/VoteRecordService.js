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
exports.VoteRecordService = void 0;
const RedisKeyConstants_1 = require("../common/RedisKeyConstants");
const RequestResult_1 = require("../common/RequestResult");
const AccountDto_1 = require("../dto/AccountDto");
const Candidata_1 = require("../entity/Candidata");
const DateUtil_1 = require("../utils/DateUtil");
const DBUtil_1 = require("../utils/DBUtil");
const RedisUtil_1 = require("../utils/RedisUtil");
const CandidateService_1 = require("./CandidateService");
class VoteRecordService {
    constructor() {
        this.redis = new RedisUtil_1.RedisUtil();
        this.candidateService = new CandidateService_1.CandidateService();
    }
    // 添加投票记录
    addVoteRecord(form) {
        return __awaiter(this, void 0, void 0, function* () {
            // 判断是否投过票
            let res = yield this.redis.sismember(RedisKeyConstants_1.RedisKeyConstants.VOTED_USER, form.getVoteUserId()).then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
            });
            if (res == 1)
                return RequestResult_1.RequestResult.fail('每个用户只能投一次票');
            console.log("cache value", res);
            let reqResult = new RequestResult_1.RequestResult();
            let nowDate = new Date();
            const sql = 'insert into t_vote_record (fkcandidate_user_id, fkvote_user_id, fcreate_time, fupdate_time)' +
                'values (?,?,?,?)';
            const params = [form.getCandidataUserId(), form.getVoteUserId(), nowDate, nowDate];
            let promise = new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                DBUtil_1.DBUtil.doExec(sql, (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }, params);
            }));
            yield promise.then((result) => {
                if (result.serverStatus == 2) {
                    // 增加票数
                    this.redis.sadd(RedisKeyConstants_1.RedisKeyConstants.VOTED_USER, form.getVoteUserId());
                    this.addVotesByUserId(form);
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
    addVotesByUserId(form) {
        return __awaiter(this, void 0, void 0, function* () {
            let candidata = new Candidata_1.Candidata();
            candidata.setUserId(form.getCandidataUserId());
            yield this.candidateService.addVotes(candidata);
        });
    }
    // 分页查询投票记录
    pageVoteRecords(form) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            let accounts = [];
            let params = [];
            let sql = 'SELECT account.fname ' +
                'from t_vote_record record inner join t_account account on record.fkvote_user_id = account.fid ' +
                ' where 1=1';
            if (form.getStartDate() != null && form.getEndDate() != null) {
                sql = sql + ' and record.fcreate_time >= ? and record.fcreate_time <= ? ';
                params.push(DateUtil_1.DateUtil.convertStartDate(form.getStartDate()));
                params.push(DateUtil_1.DateUtil.convertEndDate(form.getEndDate()));
            }
            if (form.getCandidataUserId() != null) {
                sql = sql + ' and record.fkcandidate_user_id = ? ';
                params.push(form.getCandidataUserId());
            }
            sql = sql + ' limit ?,?';
            params.push((form.currentPage - 1) * form.pageSize);
            params.push(form.pageSize);
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, results) => {
                    if (error) {
                        return rej(error);
                    }
                    res(results);
                }, params);
            });
            yield promise.then((results) => {
                for (const item in results) {
                    const element = results[item];
                    let account = new AccountDto_1.AccountDto();
                    account.setName(element.fname);
                    accounts.push(account);
                }
                reqResult.setData(accounts);
            });
            return reqResult;
        });
    }
}
exports.VoteRecordService = VoteRecordService;
