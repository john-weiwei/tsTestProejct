import { PageInfo } from "../common/PageInfo"
import { RequestResult } from "../common/RequestResult"
import { AccountDto } from "../dto/AccountDto"
import { Account } from "../entity/Account"
import { VoteRecord } from "../entity/VoteRecord"
import { VoteRecordSearchForm } from "../form/VoteRecordSearchForm"
import { DBUtil } from "../utils/DBUtil"

export class VoteRecordService {
    constructor (){}

    // 添加投票记录
    async addVoteRecord(voteRecord: VoteRecord): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        let nowDate: Date = new Date()
        const sql: string = 'insert into t_vote_record (fkcandidate_user_id, fkvote_user_id, fcreate_time, fupdate_time)' +
            'values (?,?,?,?)'
        const params: any = [voteRecord.getCandidataUserId(), voteRecord.getVoteUserId(), nowDate, nowDate]
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

    // 分页查询投票记录
    async pageVoteRecords(form: VoteRecordSearchForm): Promise<RequestResult<AccountDto[]>> {
        let reqResult: RequestResult<AccountDto[]> = new RequestResult()
        let accounts: AccountDto[] = []
        let sql: string = 'SELECT account.fname ' +
        'from t_vote_record record inner join t_account account on record.fkvote_user_id = account.fid ' 
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
                let account: AccountDto = new AccountDto()
                account.setName(element.fname)
                accounts.push(account)
            }
            reqResult.setData(accounts)
        })
        return reqResult
    }
}