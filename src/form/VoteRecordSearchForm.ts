import { PageInfo } from "../common/PageInfo";

// 投票记录查询form
export class VoteRecordSearchForm extends PageInfo {
    candidataUserId!: string
    startDate!: string
    endDate!: string
    constructor() {
        super();
    }

    setCandidataUserId(candidataUserId: string) {
        this.candidataUserId = candidataUserId
    }

    getCandidataUserId() {
        return this.candidataUserId
    }

    setStartDate(startDate: string) {
        this.startDate = startDate
    }

    getStartDate() {
        return this.startDate
    }

    setEndDate(endDate: string) {
        this.endDate = endDate
    }

    getEndDate() {
        return this.endDate
    }
}