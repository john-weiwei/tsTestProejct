import { RequestResult } from "../common/RequestResult"
import { Candidata } from "../entity/Candidata"
import { StatusEnum } from "../enum/StatusEnum"
import { DBUtil } from "../utils/DBUtil"

export class CandidataService {
    constructor() {}

    // 添加候选人
    async addCandidata(userId: string): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        const nowDate: Date = new Date()
        const sql: string = 'insert into t_candidata (fkuser_id, fstatus, fvotes, fcreate_time, fupdate_time)' +
            'values (?,?,?,?,?)'
        const params: any = [userId, StatusEnum.NOT_STARTED, 0, nowDate, nowDate]
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

    // 新增票数
    async addVotes(candidata: Candidata): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        const nowDate: Date = new Date()
        const sql: string = 'update t_candidata set fvotes = fvotes + 1, fupdate_time = ?)' +
            'where fkuser_id = ?'
        const params: any = [candidata.getStatus(), nowDate, candidata.getUserId()]
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

    // 开启或关闭投票
    async startOrEndCandidata(status: StatusEnum): Promise<RequestResult<boolean>> {
        if (status == null) {
            const errMsg: string = 'status is null'
            return RequestResult.fail(errMsg)
        }

        const nowDate: Date = new Date()
        let sql: string = 'update t_candidata set fstatus = ?, fupdate_time = ?)' +
            'where fstatus = ?'
        let params: any
        if (status == StatusEnum.START) {
            params = [StatusEnum.PROCESSING, nowDate, StatusEnum.NOT_STARTED]
        }

        if (status == StatusEnum.ENDED) {
            params = [StatusEnum.ENDED, nowDate, StatusEnum.PROCESSING]
        }  
        
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, result: any) => {
                if (error) {
                    return rej(error)
                }
                res(result)
            }, params)
        })

        let reqResult: RequestResult<boolean> = new RequestResult()
        await promise.then((result: any) => {
            if (result.serverStatus == 2) {
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }


}