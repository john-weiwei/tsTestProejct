"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidataDto = void 0;
// 选举详情信息dto
class CandidataDto {
    constructor() { }
    setUserId(userId) {
        this.userId = userId;
    }
    getUserId() {
        return this.userId;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setVotes(votes) {
        this.votes = votes;
    }
    getVotes() {
        return this.votes;
    }
}
exports.CandidataDto = CandidataDto;
