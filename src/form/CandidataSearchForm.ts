import { PageForm } from "./PageForm";
import { StatusEnum } from "../enum/StatusEnum";

// 选举信息查询form
export class CandidataSearchForm extends PageForm {
    startDate!: string
    endDate!: string
    status!: StatusEnum
    numberElection!: number
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
    
    setNumberElection(numberElection: number) {
        this.numberElection = numberElection
    }
    
    getNumberElection() {
        return this.numberElection
    }
}