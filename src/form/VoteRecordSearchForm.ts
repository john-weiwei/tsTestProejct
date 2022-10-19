import { PageInfo } from "../common/PageInfo";
// 投票记录查询form
export class VoteRecordSearchForm extends PageInfo {
    startDate!: Date
    endDate!: Date
    constructor() {
        super();
    }

    setStartDate(startDate: Date) {
        this.startDate = startDate
    }

    getStartDate() {
        return this.startDate
    }

    setEndDate(endDate: Date) {
        this.endDate = endDate
    }

    getEndDate() {
        return this.endDate
    }
}