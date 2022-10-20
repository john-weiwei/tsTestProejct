import { PageInfo } from "../common/PageInfo";
import { StatusEnum } from "../enum/StatusEnum";

// 选举信息查询form
export class CandidataSearchForm extends PageInfo {
    startDate!: string
    endDate!: string
    status!: StatusEnum
    constructor() {
        super();
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

    setStatus(status: StatusEnum) {
        this.status = status
    }

    getStatus() {
        return this.status
    }
}