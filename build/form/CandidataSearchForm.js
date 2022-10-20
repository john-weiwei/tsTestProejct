"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidataSearchForm = void 0;
const PageInfo_1 = require("../common/PageInfo");
// 选举信息查询form
class CandidataSearchForm extends PageInfo_1.PageInfo {
    constructor() {
        super();
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
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}
exports.CandidataSearchForm = CandidataSearchForm;
