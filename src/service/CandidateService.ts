import { format } from "mysql"
import { RedisKeyConstants } from "../common/RedisKeyConstants"
import { RequestResult } from "../common/RequestResult"
import { CandidataDto } from "../dto/CandidataDto"
import { Candidata } from "../entity/Candidata"
import { StatusEnum } from "../enum/StatusEnum"
import { CandidataSearchForm } from "../form/CandidataSearchForm"
import { StartVoteForm } from "../form/StartVoteForm"
import { DateUtil } from "../utils/DateUtil"
import { DBUtil } from "../utils/DBUtil"
import { RedisUtil } from "../utils/RedisUtil"
import { AccountService } from "./AccountService"

export class CandidateService {
    constructor() {}
    private redis: RedisUtil = new RedisUtil()
    private accountService: AccountService = new AccountService()

    // 添加候选人
    async addCandidata(userId: string): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        const nowDate: Date = new Date()
        const sql: string = 'insert into t_candidate (fkuser_id, fstatus, fvotes, fcreate_time, fupdate_time) ' +
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
        const sql: string = 'update t_candidate set fvotes = fvotes + 1, fupdate_time = ? ' +
            'where fkuser_id = ?'
        const params: any = [nowDate, candidata.getUserId()]
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, result: any) => {
                if (error) {
                    return rej(error)
                }
                res(result)
            }, params)
        })

        await promise.then((result: any) => {
            if (result.affectedRows >= 0) {
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }

    // 开始或结束投票
    async startOrEndCandidata(form: StartVoteForm): Promise<RequestResult<boolean>> {
        if (form.getStatus() == null || form.getOperatorId() == null) {
            return RequestResult.fail('参数不能为空')
        }

        const isManagerFlag = await this.accountService.isManager(form.getOperatorId()).then((result: any) => {
            return result.data
        }).catch((err) => {console.error(err)})

        if (!isManagerFlag) {
            return RequestResult.fail('只有管理员能开始或结束投票')
        }
        
        const status: StatusEnum = form.getStatus()
        const nowDate: Date = new Date()
        let sql: string = 'update t_candidate set fstatus = ?, fupdate_time = ? ' +
            ' where fstatus = ?'
        let params: any
        if (status == StatusEnum.START) {
            params = [StatusEnum.PROCESSING, nowDate, StatusEnum.NOT_STARTED]
            const searchForm: CandidataSearchForm = new CandidataSearchForm()
            searchForm.setStatus(StatusEnum.NOT_STARTED)
            let candidates: any = await this.pageCandidates(searchForm).then((result: any) => {
                return result.data
            }).catch((err) => {console.error(err)})

            if (candidates != null && candidates.length < 2) {
                return RequestResult.fail('一场选举至少2个候选人')
            }
        }

        if (status == StatusEnum.ENDED) {
            params = [StatusEnum.ENDED, nowDate, StatusEnum.PROCESSING]
            // 清空缓存，发邮件
            this.redis.remove(RedisKeyConstants.VOTED_USER)
            
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
            console.log(result)
            if (result.affectedRows >= 0) {
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }

    // 分页查询选举记录
    async pageCandidates(form: CandidataSearchForm): Promise<RequestResult<CandidataDto[]>> {
        let reqResult: RequestResult<CandidataDto[]> = new RequestResult()
        let candidataDtos: CandidataDto[] = []
        let params: any[] = []
        let sql: string = 'select account.fname,account.fid,candidate.fvotes ' +
        'from t_candidate candidate inner join t_account account on candidate.fkuser_id = account.fid ' + 
        'where 1=1 '
        if (form.getStartDate() != null && form.getEndDate() != null) {
            sql = sql + ' and candidate.fcreate_time >= ? and candidate.fcreate_time <= ? '
            params.push(DateUtil.convertStartDate(form.getStartDate()))
            params.push(DateUtil.convertEndDate(form.getEndDate()))
        }

        if (typeof(form.getStatus()) != 'undefined') {
            sql = sql + ' and candidate.fstatus = ? '
            params.push(form.getStatus())
        }

        sql = sql + ' limit ?,?'
        params.push((form.currentPage - 1) * form.pageSize)
        params.push(form.pageSize)
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
                candidata.setUserId(element.fid)
                candidataDtos.push(candidata)
            }
            reqResult.setData(candidataDtos)
        })
        return reqResult
    }


}