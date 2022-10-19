"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidata = void 0;
// 候选人得票信息
// id!: string    主键id
// userId!: string 用户ID
// status!: StatusEnum  选举状态
// votes!: number 票数
// createTime!: Date 创建时间
// updateTime!: Date 更新时间
class Candidata {
    constructor() {
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getUserId() {
        return this.userId;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    setVotes(votes) {
        this.votes = votes;
    }
    getVotes() {
        return this.votes;
    }
    setCreateTime(createTime) {
        this.createTime = createTime;
    }
    getCreateTime() {
        return this.createTime;
    }
    setUpdateTime(updateTime) {
        this.updateTime = updateTime;
    }
    getUpdateTime() {
        return this.updateTime;
    }
}
exports.Candidata = Candidata;
