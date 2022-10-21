// 投票form
export class AddVoteForm {
    candidataUserId!: string
    voteUserId!: string
    numberElection!: number
    constructor() {}

    setCandidataUserId(candidataUserId: string) {
        this.candidataUserId = candidataUserId
    }

    getCandidataUserId() {
        return this.candidataUserId
    }

    setVoteUserId(voteUserId: string) {
        this.voteUserId = voteUserId
    }

    getVoteUserId() {
        return this.voteUserId
    }
    
    setNumberElection(numberElection: number) {
        this.numberElection = numberElection
    }
    
    getNumberElection() {
        return this.numberElection
    }
    
}