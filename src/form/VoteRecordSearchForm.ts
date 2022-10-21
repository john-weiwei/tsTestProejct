import { PageForm } from "./PageForm";

// 投票记录查询form
export class VoteRecordSearchForm extends PageForm {
    candidataUserId!: string
    startDate!: string
    endDate!: string
    numberElection!: number
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
    
    setNumberElection(numberElection: number) {
        this.numberElection = numberElection
    }
    
    getNumberElection() {
        return this.numberElection
    }
}