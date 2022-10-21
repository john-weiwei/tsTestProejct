import { RedisKeyConstants } from "../common/RedisKeyConstants"
import { RequestResult } from "../common/RequestResult"
import { CandidataDto } from "../dto/CandidataDto"
import { PageDto } from "../dto/PageDto"
import { Candidata } from "../entity/Candidata"
import { StatusEnum } from "../enum/StatusEnum"
import { CandidataSearchForm } from "../form/CandidataSearchForm"
import { StartVoteForm } from "../form/StartVoteForm"
import { DateUtil } from "../utils/DateUtil"
import { DBUtil } from "../utils/DBUtil"
import { EmailUtil } from "../utils/EmailUtil"
import { RedisUtil } from "../utils/RedisUtil"
import { AccountService } from "./AccountService"

export class CandidateService {
    constructor() { }
    private redis: RedisUtil = new RedisUtil()
    private accountService: AccountService = new AccountService()

    // 添加候选人
    async addCandidata(userId: string): Promise<RequestResult<boolean>> {
        if (userId == null) return RequestResult.fail('参数不能为空')

        // 同一个候选人不能重复添加
        let res = await this.redis.sismember(RedisKeyConstants.CANDIDATE_USER, userId).then((result: any) => { return result }).catch((err: any) => { console.error(err) })
        if (res == 1) return RequestResult.fail('同一个候选人不能重复添加')

        // 查询是否有正在进行的投票
        const searchForm: CandidataSearchForm = new CandidataSearchForm()
        searchForm.setStatus(StatusEnum.PROCESSING)
        let processingCandidates: any = await this.pageCandidates(searchForm).then((result: any) => { return result.data.data }).catch((err) => { console.error(err) })
        if (processingCandidates != null && processingCandidates.length > 1) {
            return RequestResult.fail('有正在进行的选举，待结束投票后，再添加新的候选人')
        }

        // 查询最新选举批次
        let nextNumberOfElection: number = 0
        let newestNubmerElection: any = await this.redis.get(RedisKeyConstants.NEWEST_NUMBER_ELECTION).then((result) => {return result}).catch((err) => { console.error(err) })
        if (isNaN(newestNubmerElection) || newestNubmerElection == null) {
            let numberOfElection: any = await this.newestNumberOfElection().then((result) => { return result }).catch((err) => { console.error(err) })
            if (typeof(numberOfElection) != 'undefined') { nextNumberOfElection = parseInt(numberOfElection) + 1 }
        } else {
            nextNumberOfElection = parseInt(newestNubmerElection) + 1
        }

        // 是否存在未开始的选举投票
        const isExistNotStartCadidateFlag = await this.isExistNotStartCadidate().then((result) => {return result}).catch((err) => { console.error(err) })
        if (isExistNotStartCadidateFlag) {
            nextNumberOfElection = parseInt(newestNubmerElection)
        } else {
            // 更新缓存
            await this.redis.set(RedisKeyConstants.NEWEST_NUMBER_ELECTION, nextNumberOfElection)
        }

        // 添加候选人
        let reqResult: RequestResult<boolean> = new RequestResult()
        const nowDate: Date = new Date()
        const sql: string = 'insert into t_candidate (fkuser_id, fstatus, fvotes, fnumber_election, fcreate_time, fupdate_time) ' +
            'values (?,?,?,?,?,?)'
        const params: any = [userId, StatusEnum.NOT_STARTED, 0, nextNumberOfElection, nowDate, nowDate]
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
                this.redis.sadd(RedisKeyConstants.CANDIDATE_USER, userId)
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }

    // 新增票数
    async addVotes(candidata: Candidata): Promise<RequestResult<boolean>> {
        if (candidata == null) return RequestResult.fail('参数不能为空')
        const nowDate: Date = new Date()
        const sql: string = 'update t_candidate set fvotes = fvotes + 1, fupdate_time = ? ' +
            'where fkuser_id = ? and fnumber_election = ? '
        const params: any = [nowDate, candidata.getUserId(), candidata.getNumberElection()]
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
        }).catch((err) => { console.error(err) })

        if (!isManagerFlag) {
            return RequestResult.fail('只有管理员能开始或结束投票')
        }

        const status: StatusEnum = form.getStatus()
        const nowDate: Date = new Date()
        let sql: string = 'update t_candidate set fstatus = ?, fupdate_time = ? ' +
            ' where fnumber_election = ?'
        let params: any[] = []
        if (status == StatusEnum.START) {
            params.push(StatusEnum.PROCESSING)
            let searchForm: CandidataSearchForm = new CandidataSearchForm()

            // 是否有正在进行的选举
            searchForm.setStatus(StatusEnum.PROCESSING)
            let processingCandidates: any = await this.pageCandidates(searchForm).then((result: any) => { return result.data.data }).catch((err) => { console.error(err) })
            if (processingCandidates != null && processingCandidates.length > 1) {
                return RequestResult.fail('有正在进行的选举，待结束投票后，再开始新的投票选举')
            }

            // 一场选举至少2个候选人
            searchForm.setStatus(StatusEnum.NOT_STARTED)
            let candidates: any = await this.pageCandidates(searchForm).then((result: any) => { return result.data.data }).catch((err) => { console.error(err) })
            if (candidates != null && candidates.length < 2) {
                return RequestResult.fail('一场选举至少2个候选人')
            }
        }

        if (status == StatusEnum.END) {
            params.push(StatusEnum.END)
            // 清空缓存，发邮件
            this.redis.remove(RedisKeyConstants.VOTED_USER)
            this.redis.remove(RedisKeyConstants.CANDIDATE_USER)
            this.sendEmail()
        }

        // 最新选举批次
        let newestNumberElection: any = await this.newestNumberOfElection().then((result) => { return result}).catch((err) => { console.error(err) })
        params.push(nowDate)
        params.push(parseInt(newestNumberElection))
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
            if (result.affectedRows >= 0) {
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }

    // 将投票结果通过邮件发送给参与选举投票的候选人
    private async sendEmail() {
        let title: string = '投票详情'

        // 查询最新选举批次
        let numberOfElection: any = await this.newestNumberOfElection().then((result) => { return result }).catch((err) => { console.error(err) })

        // 查询最新参与选举的候选人
        let form: CandidataSearchForm = new CandidataSearchForm()
        form.setPageSize(100)
        form.setNumberElection(parseInt(numberOfElection))
        let pageData: any = await this.pageCandidates(form).then((result) => { return result.data.data }).catch((err) => { console.log(err) })
        let content: string = '本轮选举最终结果为 \n'
        for (const item in pageData) {
            if (Object.prototype.hasOwnProperty.call(pageData, item)) {
                const element = pageData[item];
                content = content + element.getName() + ': ' + element.getVotes() + '票 \n'
            }
        }

        for (const item in pageData) {
            if (Object.prototype.hasOwnProperty.call(pageData, item)) {
                const element = pageData[item];
                EmailUtil.send(title, content, element.getEmail())
            }
        }
    }

    // 分页查询选举记录
    async pageCandidates(form: CandidataSearchForm): Promise<RequestResult<PageDto<CandidataDto[]>>> {
        let reqResult: RequestResult<PageDto<CandidataDto[]>> = new RequestResult()
        let candidataDtos: CandidataDto[] = []
        let params: any[] = []
        let sql: string = 'select account.femail,account.fname,account.fid,candidate.fvotes '
        let fromSql: string = 'from t_candidate candidate inner join t_account account on candidate.fkuser_id = account.fid ' +
            'where 1=1 '
        sql = sql + fromSql
        if (form.getStartDate() != null && form.getEndDate() != null) {
            sql = sql + ' and candidate.fcreate_time >= ? and candidate.fcreate_time <= ? '
            params.push(DateUtil.convertStartDate(form.getStartDate()))
            params.push(DateUtil.convertEndDate(form.getEndDate()))
        }

        if (form.getNumberElection() != null) {
            sql = sql + ' and fnumber_election = ? '
            params.push(form.getNumberElection())
        }

        if (typeof (form.getStatus()) != 'undefined') {
            sql = sql + ' and candidate.fstatus = ? '
            params.push(form.getStatus())
        }

        sql = sql + ' order by candidate.fcreate_time desc limit ?,?'
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
        let pageDto: PageDto<CandidataDto[]> = new PageDto()
        pageDto.setCurrentPage(form.currentPage)
        pageDto.setPageSize(form.pageSize)
        pageDto.setTotalSize(countRecords)
        await promise.then((results: any) => {
            for (const item in results) {
                const element = results[item];
                let candidata: CandidataDto = new CandidataDto()
                candidata.setName(element.fname)
                candidata.setEmail(element.femail)
                candidata.setVotes(element.fvotes)
                candidata.setUserId(element.fid)
                candidataDtos.push(candidata)
            }
            pageDto.setData(candidataDtos)
        })
        reqResult.setData(pageDto)
        return reqResult
    }

    // 最新选举批次
    async newestNumberOfElection(): Promise<number> {
        let sql: string = 'select max(fnumber_election) as maxNumberElection ' +
            ' from t_candidate '
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, results: any) => {
                if (error) {
                    return rej(error)
                }
                res(results)
            })
        })

        let result: number = 0
        await promise.then((results: any) => {  result = results[0].maxNumberElection }).catch((err) => { console.error(err) })
        return result
    }

    // 是否存在未开始的选举投票
    async isExistNotStartCadidate(): Promise<boolean> {
        let params: any[] = []
        let sql: string = 'select count(*) as countNotStart ' +
            ' from t_candidate ' +
            ' where fstatus = ? '
        params.push(StatusEnum.NOT_STARTED)
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, results: any) => {
                if (error) {
                    return rej(error)
                }
                res(results)
            }, params)
        })

        let result: boolean = false
        await promise.then((results: any) => { 
            const value: any = results[0].countNotStart
            if (typeof(value) != 'undefined' && value > 0) {
                result = true
            } 
        }).catch((err) => { console.error(err) })
        return result
    }


}