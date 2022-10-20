"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRecordSearchForm = void 0;
const PageInfo_1 = require("../common/PageInfo");
// 投票记录查询form
class VoteRecordSearchForm extends PageInfo_1.PageInfo {
    constructor() {
        super();
    }
    setCandidataUserId(candidataUserId) {
        this.candidataUserId = candidataUserId;
    }
    getCandidataUserId() {
        return this.candidataUserId;
    }
    setStartDate(startDate) {
        this.startDate = startDate;
    }
    getStartDate() {
        return this.startDate;
    }
    setEndDate(endDate) {
        this.endDate = endDate;
    }
    getEndDate() {
        return this.endDate;
    }
}
exports.VoteRecordSearchForm = VoteRecordSearchForm;
