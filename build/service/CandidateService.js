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
exports.CandidateService = void 0;
const RedisKeyConstants_1 = require("../common/RedisKeyConstants");
const RequestResult_1 = require("../common/RequestResult");
const CandidataDto_1 = require("../dto/CandidataDto");
const StatusEnum_1 = require("../enum/StatusEnum");
const CandidataSearchForm_1 = require("../form/CandidataSearchForm");
const DateUtil_1 = require("../utils/DateUtil");
const DBUtil_1 = require("../utils/DBUtil");
const RedisUtil_1 = require("../utils/RedisUtil");
const AccountService_1 = require("./AccountService");
class CandidateService {
    constructor() {
        this.redis = new RedisUtil_1.RedisUtil();
        this.accountService = new AccountService_1.AccountService();
    }
    // 添加候选人
    addCandidata(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            const nowDate = new Date();
            const sql = 'insert into t_candidate (fkuser_id, fstatus, fvotes, fcreate_time, fupdate_time) ' +
                'values (?,?,?,?,?)';
            const params = [userId, StatusEnum_1.StatusEnum.NOT_STARTED, 0, nowDate, nowDate];
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }, params);
            });
            yield promise.then((result) => {
                if (result.serverStatus == 2) {
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
    // 新增票数
    addVotes(candidata) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            const nowDate = new Date();
            const sql = 'update t_candidate set fvotes = fvotes + 1, fupdate_time = ? ' +
                'where fkuser_id = ?';
            const params = [nowDate, candidata.getUserId()];
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }, params);
            });
            yield promise.then((result) => {
                if (result.affectedRows >= 0) {
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
    // 开始或结束投票
    startOrEndCandidata(form) {
        return __awaiter(this, void 0, void 0, function* () {
            if (form.getStatus() == null || form.getOperatorId() == null) {
                return RequestResult_1.RequestResult.fail('参数不能为空');
            }
            const isManagerFlag = yield this.accountService.isManager(form.getOperatorId()).then((result) => {
                return result.data;
            }).catch((err) => { console.error(err); });
            if (!isManagerFlag) {
                return RequestResult_1.RequestResult.fail('只有管理员能开始或结束投票');
            }
            const status = form.getStatus();
            const nowDate = new Date();
            let sql = 'update t_candidate set fstatus = ?, fupdate_time = ? ' +
                ' where fstatus = ?';
            let params;
            if (status == StatusEnum_1.StatusEnum.START) {
                params = [StatusEnum_1.StatusEnum.PROCESSING, nowDate, StatusEnum_1.StatusEnum.NOT_STARTED];
                const searchForm = new CandidataSearchForm_1.CandidataSearchForm();
                searchForm.setStatus(StatusEnum_1.StatusEnum.NOT_STARTED);
                let candidates = yield this.pageCandidates(searchForm).then((result) => {
                    return result.data;
                }).catch((err) => { console.error(err); });
                if (candidates != null && candidates.length < 2) {
                    return RequestResult_1.RequestResult.fail('一场选举至少2个候选人');
                }
            }
            if (status == StatusEnum_1.StatusEnum.ENDED) {
                params = [StatusEnum_1.StatusEnum.ENDED, nowDate, StatusEnum_1.StatusEnum.PROCESSING];
                // 清空缓存，发邮件
                this.redis.remove(RedisKeyConstants_1.RedisKeyConstants.VOTED_USER);
            }
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }, params);
            });
            let reqResult = new RequestResult_1.RequestResult();
            yield promise.then((result) => {
                console.log(result);
                if (result.affectedRows >= 0) {
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
    // 分页查询选举记录
    pageCandidates(form) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            let candidataDtos = [];
            let params = [];
            let sql = 'select account.fname,account.fid,candidate.fvotes ' +
                'from t_candidate candidate inner join t_account account on candidate.fkuser_id = account.fid ' +
                'where 1=1 ';
            if (form.getStartDate() != null && form.getEndDate() != null) {
                sql = sql + ' and candidate.fcreate_time >= ? and candidate.fcreate_time <= ? ';
                params.push(DateUtil_1.DateUtil.convertStartDate(form.getStartDate()));
                params.push(DateUtil_1.DateUtil.convertEndDate(form.getEndDate()));
            }
            if (typeof (form.getStatus()) != 'undefined') {
                sql = sql + ' and candidate.fstatus = ? ';
                params.push(form.getStatus());
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
                    let candidata = new CandidataDto_1.CandidataDto();
                    candidata.setName(element.fname);
                    candidata.setVotes(element.fvotes);
                    candidata.setUserId(element.fid);
                    candidataDtos.push(candidata);
                }
                reqResult.setData(candidataDtos);
            });
            return reqResult;
        });
    }
}
exports.CandidateService = CandidateService;
