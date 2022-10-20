import { StatusEnum } from "../enum/StatusEnum"

// 候选人得票信息
// id!: string    主键id
// userId!: string 用户ID
// status!: StatusEnum  选举状态
// votes!: number 票数
// isNew!: number 是否最新候选信息
// createTime!: Date 创建时间
// updateTime!: Date 更新时间
export class Candidata {
    id!: string
    userId!: string
    status!: StatusEnum
    votes!: number
    isNew!: number
    createTime!: Date
    updateTime!: Date

    constructor(){

    }

    setId(id: string) {
        this.id = id
    }

    getId() {
        return this.id
    }

    setUserId(userId: string) {
        this.userId = userId
    }

    getUserId() {
        return this.userId
    }

    setStatus(status: StatusEnum) {
        this.status = status
    }

    getStatus() {
        return this.status
    }

    setVotes(votes: number) {
        this.votes = votes
    }
    
    getVotes() {
        return this.votes
    }
    
    setIsNew(isNew: number) {
        this.isNew = isNew
    }
    
    getIsNew() {
        return this.isNew
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