import { PageInfo } from "../common/PageInfo"
import { RequestResult } from "../common/RequestResult"
import { CandidataDto } from "../dto/CandidataDto"
import { Candidata } from "../entity/Candidata"
import { StatusEnum } from "../enum/StatusEnum"
import { CandidataSearchForm } from "../form/CandidataSearchForm"
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

    // 分页查询选举记录
    async pageCandidatas(form: CandidataSearchForm): Promise<RequestResult<CandidataDto[]>> {
        let reqResult: RequestResult<CandidataDto[]> = new RequestResult()
        let candidataDtos: CandidataDto[] = []
        let sql: string = 'SELECT account.fname ' +
        'from t_candidata candidata inner join t_account account on candidata.fkuser_id = account.fid '
        if (form.getStartDate() != null && form.getEndDate() != null) {
            sql = sql + 'where fcreate_time >= ' + form.getStartDate() + ' and fcreate_time <= ' + form.getEndDate()
        }
        sql = sql + 'limit ?,?'
        const params: any[] = [(form.currentPage - 1) * form.pageSize, form.pageSize]
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, results: unknown) => {
                if (error) {
                    return rej(error)
                }
                res(results)
            }, params)
        })

        await promise.then((results: any) => {
            for (const item in results) {
                const element = results[item];
                let candidata: CandidataDto = new CandidataDto()
                candidata.setName(element.fname)
                candidata.setVotes(element.fvotes)
                candidataDtos.push(candidata)
            }
            reqResult.setData(candidataDtos)
        })
        return reqResult
    }


}