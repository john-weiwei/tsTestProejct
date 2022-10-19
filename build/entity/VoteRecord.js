"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRecord = void 0;
// 投票记录
// id!: string 主键ID
// candidataUserId!: string 候选人id
// voteUserId!: string 投票人id
// createTime!: Date 创建时间
// updateTime!: Date 更新时间
class VoteRecord {
    constructor() {
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setCandidataUserId(candidataUserId) {
        this.candidataUserId = candidataUserId;
    }
    getCandidataUserId() {
        return this.candidataUserId;
    }
    setVoteUserId(voteUserId) {
        this.voteUserId = voteUserId;
    }
    getVoteUserId() {
        return this.voteUserId;
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
exports.VoteRecord = VoteRecord;
