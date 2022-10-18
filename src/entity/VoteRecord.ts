// 投票记录
// id!: string 主键ID
// candidataUserId!: string 候选人id
// voteUserId!: string 投票人id
// createTime!: Date 创建时间
// updateTime!: Date 更新时间
export class VoteRecord {
    id!: string
    candidataUserId!: string
    voteUserId!: string
    createTime!: Date
    updateTime!: Date

    constructor() {

    }

    setId(id: string) {
        this.id = id
    }

    getId() {
        return this.id
    }

    setCandidataUserId(candidataUserId: string) {
        this.candidataUserId = candidataUserId
    }

    getCandidataUserId() {
        return this.candidataUserId
    }
    
    setVoteUserId(voteUserId: string) {
        this.voteUserId = voteUserId
    }

    getVoteUserId() {
        return this.voteUserId
    }

    setCreateTime(createTime: Date) {
        this.createTime = createTime
    }

    getCreateTime() {
        return this.createTime
    }
    
    setUpdateTime(updateTime: Date) {
        this.updateTime = updateTime
    }

    getUpdateTime() {
        return this.updateTime
    }
}