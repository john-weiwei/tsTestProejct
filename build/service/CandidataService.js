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
exports.CandidataService = void 0;
const RequestResult_1 = require("../common/RequestResult");
const StatusEnum_1 = require("../enum/StatusEnum");
const DBUtil_1 = require("../utils/DBUtil");
class CandidataService {
    constructor() { }
    // 添加候选人
    addCandidata(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            const nowDate = new Date();
            const sql = 'insert into t_candidata (fkuser_id, fstatus, fvotes, fcreate_time, fupdate_time)' +
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
            const sql = 'update t_candidata set fvotes = fvotes + 1, fupdate_time = ?)' +
                'where fkuser_id = ?';
            const params = [candidata.getStatus(), nowDate, candidata.getUserId()];
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
    // 开启或关闭投票
    startOrEndCandidata(status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status == null) {
                const errMsg = 'status is null';
                return RequestResult_1.RequestResult.fail(errMsg);
            }
            const nowDate = new Date();
            let sql = 'update t_candidata set fstatus = ?, fupdate_time = ?)' +
                'where fstatus = ?';
            let params;
            if (status == StatusEnum_1.StatusEnum.START) {
                params = [StatusEnum_1.StatusEnum.PROCESSING, nowDate, StatusEnum_1.StatusEnum.NOT_STARTED];
            }
            if (status == StatusEnum_1.StatusEnum.ENDED) {
                params = [StatusEnum_1.StatusEnum.ENDED, nowDate, StatusEnum_1.StatusEnum.PROCESSING];
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
                if (result.serverStatus == 2) {
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
}
exports.CandidataService = CandidataService;
