import { response } from "express"
import { RedisKeyConstants } from "../common/RedisKeyConstants"
import { RequestResult } from "../common/RequestResult"
import { AccountDto } from "../dto/AccountDto"
import { PageDto } from "../dto/PageDto"
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
        if (form == null) return RequestResult.fail('参数不能为空')

        // 是否存在未开始的选举投票
        const isExistNotStartCadidateFlag = await this.candidateService.isExistNotStartCadidate().then((result) => {return result}).catch((err) => { console.error(err) })
        if (isExistNotStartCadidateFlag) return RequestResult.fail('选举未开始，无法投票')

        // 判断是否投过票
        let res = await this.redis.sismember(RedisKeyConstants.VOTED_USER, form.getVoteUserId()).then((result: any) => { return result }).catch((err: any) => { console.log(err) })
        if (res == 1) return RequestResult.fail('每个用户只能投一次票')

        // 最新选举批次
        let newestNumberElection: any = await this.candidateService.newestNumberOfElection().then((result) => { return result}).catch((err) => { console.error(err) })
        form.setNumberElection(parseInt(newestNumberElection))
        let nowDate: Date = new Date()
        const sql: string = 'insert into t_vote_record (fkcandidate_user_id, fkvote_user_id, fnumber_election, fcreate_time, fupdate_time)' +
            'values (?,?,?,?,?)'
        const params: any = [form.getCandidataUserId(), form.getVoteUserId(), parseInt(newestNumberElection), nowDate, nowDate]
        let promise = new Promise(async (res, rej) => {
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
                // 缓存已投票的用户id到redis
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
        candidata.setNumberElection(form.getNumberElection())
        await this.candidateService.addVotes(candidata)
    }

    // 分页查询投票记录
    async pageVoteRecords(form: VoteRecordSearchForm): Promise<RequestResult<PageDto<AccountDto[]>>> {
        if (form == null) return RequestResult.fail('参数不能为空')
        let reqResult: RequestResult<PageDto<AccountDto[]>> = new RequestResult()
        let accounts: AccountDto[] = []
        let params: any[] = []
        let sql: string = 'SELECT account.fname '
        let fromSql: string = 'from t_vote_record record inner join t_account account on record.fkvote_user_id = account.fid ' + 
            ' where 1=1 '
        sql = sql + fromSql
        if (form.getStartDate() != null && form.getEndDate() != null) {
            sql = sql + ' and record.fcreate_time >= ? and record.fcreate_time <= ? '
            params.push(DateUtil.convertStartDate(form.getStartDate()))
            params.push(DateUtil.convertEndDate(form.getEndDate()))
        }

        if (form.getCandidataUserId() != null) {
            sql = sql + ' and record.fkcandidate_user_id = ? '
            params.push(form.getCandidataUserId())
        }

        if (form.getNumberElection() != null) {
            sql = sql + ' and record.fnumber_election = ? '
            params.push(form.getNumberElection())
        }

        sql = sql + ' limit ?,?'
        params.push((form.currentPage - 1) * form.pageSize)
        params.push(form.pageSize)
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, results: any) => {
                if (error) {
                    return rej(error)
                }
                res(results)
            }, params)
        })


        let countRecords = await DBUtil.countRecordSql(fromSql).then((result: any) => { return result }).catch((err: any) => { console.log(err) })
        let pageDto: PageDto<AccountDto[]> = new PageDto()
        pageDto.setCurrentPage(form.currentPage)
        pageDto.setPageSize(form.pageSize)
        pageDto.setTotalSize(countRecords)
        await promise.then((results: any) => {
            for (const item in results) {
                const element = results[item];
                let account: AccountDto = new AccountDto()
                account.setName(element.fname)
                accounts.push(account)
            }
            pageDto.setData(accounts)
        })
        reqResult.setData(pageDto)
        return reqResult
    }
}