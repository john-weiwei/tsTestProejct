import { PageInfo } from "../common/PageInfo";

// 选举信息查询form
export class CandidataSearchForm extends PageInfo {
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