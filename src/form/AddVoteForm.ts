// 投票form
export class AddVoteForm {
    candidataUserId!: string
    voteUserId!: string
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
}