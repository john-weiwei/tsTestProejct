import { response } from "express"
import { RedisKeyConstants } from "../common/RedisKeyConstants"
import { RequestResult } from "../common/RequestResult"
import { AccountDto } from "../dto/AccountDto"
import { Candidata } from "../entity/Candidata"
import { VoteRecord } from "../entity/VoteRecord"
import { AddVoteForm } from "../form/AddVoteForm"
import { VoteRecordSearchForm } from "../form/VoteRecordSearchForm"
import { DateUtil } from "../utils/DateUtil"
import { DBUtil } from "../utils/DBUtil"
import { RedisUtil } from "../utils/RedisUtil"
import { CandidateService } from "./CandidateService"

export class VoteRecordService {
    constructor() { }
    private redis: RedisUtil = new RedisUtil()
    private candidateService: CandidateService = new CandidateService()

    // 添加投票记录
    async addVoteRecord(form: AddVoteForm): Promise<RequestResult<boolean>> {
        // 判断是否投过票
        let res = await this.redis.sismember(RedisKeyConstants.VOTED_USER, form.getVoteUserId()).then((result: any) => {
            return result
        }).catch((err: any) => {
            console.log(err)
        })
        if (res == 1) return RequestResult.fail('每个用户只能投一次票')
        console.log("cache value",res)
        let reqResult: RequestResult<boolean> = new RequestResult()
        let nowDate: Date = new Date()
        const sql: string = 'insert into t_vote_record (fkcandidate_user_id, fkvote_user_id, fcreate_time, fupdate_time)' +
            'values (?,?,?,?)'
        const params: any = [form.getCandidataUserId(), form.getVoteUserId(), nowDate, nowDate]
        let promise = new Promise(async (res, rej) => {
            DBUtil.doExec(sql, (error: any, result: any) => {
                if (error) {
                    return rej(error)
                }
                res(result)
            }, params)
        })

        await promise.then((result: any) => {
            if (result.serverStatus == 2) {
                // 增加票数
                this.redis.sadd(RedisKeyConstants.VOTED_USER, form.getVoteUserId())
                this.addVotesByUserId(form)
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }

    private async addVotesByUserId(form: AddVoteForm) {
        let candidata: Candidata = new Candidata()
        candidata.setUserId(form.getCandidataUserId())
        await this.candidateService.addVotes(candidata)
    }

    // 分页查询投票记录
    async pageVoteRecords(form: VoteRecordSearchForm): Promise<RequestResult<AccountDto[]>> {
        let reqResult: RequestResult<AccountDto[]> = new RequestResult()
        let accounts: AccountDto[] = []
        let params: any[] = []
        let sql: string = 'SELECT account.fname ' +
            'from t_vote_record record inner join t_account account on record.fkvote_user_id = account.fid ' + 
            ' where 1=1'
        if (form.getStartDate() != null && form.getEndDate() != null) {
            sql = sql + ' and record.fcreate_time >= ? and record.fcreate_time <= ? '
            params.push(DateUtil.convertStartDate(form.getStartDate()))
            params.push(DateUtil.convertEndDate(form.getEndDate()))
        }

        if (form.getCandidataUserId() != null) {
            sql = sql + ' and record.fkcandidate_user_id = ? '
            params.push(form.getCandidataUserId())
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
                let account: AccountDto = new AccountDto()
                account.setName(element.fname)
                accounts.push(account)
            }
            reqResult.setData(accounts)
        })
        return reqResult
    }
}