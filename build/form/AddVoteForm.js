"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVoteForm = void 0;
// 投票form
class AddVoteForm {
    constructor() { }
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
}
exports.AddVoteForm = AddVoteForm;
