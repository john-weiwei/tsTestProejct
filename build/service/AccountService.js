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
exports.AccountService = void 0;
const RequestResult_1 = require("../common/RequestResult");
const CommonUtil_1 = require("../utils/CommonUtil");
const DBUtil_1 = require("../utils/DBUtil");
const EmailUtil_1 = require("../utils/EmailUtil");
// 用户业务类
class AccountService {
    constructor() { }
    addAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            // 参数校验
            if (account.getName() == null || account.getEmail() == null || account.getIdCard() == null) {
                const errMsg = '用户名-邮箱-身份证号为必填项';
                return RequestResult_1.RequestResult.fail(errMsg);
            }
            if (!CommonUtil_1.CommonUtil.validateIdCard(account.getIdCard())) {
                const errMsg = '身份证格式为：字母+6位数字+括号内1位数字,例如:A123456(7)';
                return RequestResult_1.RequestResult.fail(errMsg);
            }
            if (!EmailUtil_1.EmailUtil.validateEmail(account.getEmail())) {
                const errMsg = '邮箱格式不正确,例如:xxx@qq.com.cn或xxx@qq.com';
                return RequestResult_1.RequestResult.fail(errMsg);
            }
            const sql = 'insert into t_account (fname, femail, fid_card, fis_manager, fcreate_time, fupdate_time)' +
                'values (?,?,?,?,?,?)';
            const params = [account.getName(), account.getEmail(), account.getIdCard(), account.isManager(), account.getCreateTime(), account.getUpdateTime()];
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
    isManager(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            if (userId == null) {
                const errMsg = 'useId is null';
                return RequestResult_1.RequestResult.fail(errMsg);
            }
            const sql = 'select fid,fname, femail, fid_card, fis_manager, fcreate_time, fupdate_time t_account ' +
                'from t_account' +
                'where fid = ?';
            const params = [userId];
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
}
exports.AccountService = AccountService;
