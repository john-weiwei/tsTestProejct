// 选举详情信息dto
export class CandidataDto {
    userId!: string
    name!: string
    votes!: number
    constructor() {}

    setUserId(userId: string) {
        this.userId = userId
    }

    getUserId() {
        return this.userId
    }
    
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