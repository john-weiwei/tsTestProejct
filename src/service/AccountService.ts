import { RequestResult } from "../common/RequestResult";
import { Account } from "../entity/Account";
import { CommonUtil } from "../utils/CommonUtil";
import { DBUtil } from "../utils/DBUtil";
import { EmailUtil } from "../utils/EmailUtil";

// 用户业务类
export class AccountService {
    constructor() { }

    // 添加账户
    async addAccount(account: Account): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        // 参数校验
        if (account.getName() == null || account.getEmail() == null || account.getIdCard() == null) {
            const errMsg = '用户名-邮箱-身份证号为必填项'
            return RequestResult.fail(errMsg)
        }

        if (!CommonUtil.validateIdCard(account.getIdCard())) {
            const errMsg = '身份证格式为：字母+6位数字+括号内1位数字,例如:A123456(7)'
            return RequestResult.fail(errMsg)
        }

        if (!EmailUtil.validateEmail(account.getEmail())) {
            const errMsg = '邮箱格式不正确,例如:xxx@qq.com.cn或xxx@qq.com'
            return RequestResult.fail(errMsg)
        }

        let nowDate: Date = new Date()
        const sql: string = 'insert into t_account (fname, femail, fid_card, fis_manager, fcreate_time, fupdate_time)' +
            'values (?,?,?,?,?,?)'
        const params: any = [account.getName(), account.getEmail(), account.getIdCard(), account.isManager(), nowDate, nowDate]
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, result: any) => {
                if (error) {
                    return rej(error)
                }
                res(result)
            }, params)
        })

        await promise.then((result: any) => {
            if (result.serverStatus == 2) {
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }

    // 是否管理员
    async isManager(userId: string): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        if (userId == null) {
            const errMsg = 'useId is null'
            return RequestResult.fail(errMsg)
        }
        const sql: string = 'select fid,fname, femail, fid_card, fis_manager, fcreate_time, fupdate_time t_account ' +
            ' from t_account' +
            ' where fid = ?'
        const params: any = [userId]
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, result: any) => {
                if (error) {
                    return rej(error)
                }
                res(result)
            }, params)
        })

        await promise.then((result: any) => {
            if (result != null && result[0].fis_manager == 1) {
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }
}