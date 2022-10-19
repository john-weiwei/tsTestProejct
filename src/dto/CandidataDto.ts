// 选举详情信息dto
export class CandidataDto {
    name!: string
    votes!: number
    constructor() {}

    setName(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setVotes(votes: number) {
        this.votes = votes
    }

    getVotes() {
        return this.votes
    }
}