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

        // 查询是否有正在进行的投票
        const searchForm: CandidataSearchForm = new CandidataSearchForm()
        searchForm.setStatus(StatusEnum.PROCESSING)
        let processingCandidates: any = await this.pageCandidates(searchForm).then((result: any) => { return result.data }).catch((err) => { console.error(err) })
        if (processingCandidates != null && processingCandidates.length > 1) {
            return RequestResult.fail('有正在进行的选举，待结束投票后，再添加候选人')
        }

        // 添加候选人
        let reqResult: RequestResult<boolean> = new RequestResult()
        const nowDate: Date = new Date()
        const sql: string = 'insert into t_candidate (fkuser_id, fstatus, fvotes, fis_new, fcreate_time, fupdate_time) ' +
            'values (?,?,?,?,?,?)'
        const params: any = [userId, StatusEnum.NOT_STARTED, 0, 0, nowDate, nowDate]
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
        if (candidata == null) return RequestResult.fail('参数不能为空')
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
        }).catch((err) => { console.error(err) })

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
            let searchForm: CandidataSearchForm = new CandidataSearchForm()

            // 是否有正在进行的选举
            searchForm.setStatus(StatusEnum.PROCESSING)
            let processingCandidates: any = await this.pageCandidates(searchForm).then((result: any) => { return result.data }).catch((err) => { console.error(err) })
            if (processingCandidates != null && processingCandidates.length > 1) {
                return RequestResult.fail('有正在进行的选举，待结束投票后，再开始新的投票选举')
            }

            // 一场选举至少2个候选人
            searchForm.setStatus(StatusEnum.NOT_STARTED)
            let candidates: any = await this.pageCandidates(searchForm).then((result: any) => { return result.data }).catch((err) => { console.error(err) })
            if (candidates != null && candidates.length < 2) {
                return RequestResult.fail('一场选举至少2个候选人')
            }
        }

        if (status == StatusEnum.ENDED) {
            params = [StatusEnum.ENDED, nowDate, StatusEnum.PROCESSING]

            // 清空缓存，发邮件
            this.redis.remove(RedisKeyConstants.VOTED_USER)
            this.sendEmail()
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

    // 将投票结果通过邮件发送给参与选举投票的候选人
    private async sendEmail() {
        let title: string = '投票详情'

        // 查询最新参与选举的候选人
        let form: CandidataSearchForm = new CandidataSearchForm()
        form.setPageSize(100)
        form.setIsNew(1)
        let pageData: any = await this.pageCandidates(form).then((result) => { return result.data }).catch((err) => { console.log(err) })
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
    async pageCandidates(form: CandidataSearchForm): Promise<RequestResult<CandidataDto[]>> {
        let reqResult: RequestResult<CandidataDto[]> = new RequestResult()
        let candidataDtos: CandidataDto[] = []
        let params: any[] = []
        let sql: string = 'select account.femail,account.fname,account.fid,candidate.fvotes ' +
            'from t_candidate candidate inner join t_account account on candidate.fkuser_id = account.fid ' +
            'where 1=1 '
        if (form.getStartDate() != null && form.getEndDate() != null) {
            sql = sql + ' and candidate.fcreate_time >= ? and candidate.fcreate_time <= ? '
            params.push(DateUtil.convertStartDate(form.getStartDate()))
            params.push(DateUtil.convertEndDate(form.getEndDate()))
        }

        if (form.getIsNew() != null) {
            sql = sql + ' and fis_new = ? '
            params.push(form.getIsNew())
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
            reqResult.setData(candidataDtos)
        })
        return reqResult
    }


}