// 选举详情信息dto
export class CandidataDto {
    userId!: string
    name!: string
    email!: string
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
    
    setEmail(email: string) {
        this.email = email
    }

    getEmail() {
        return this.email
    }

    setVotes(votes: number) {
        this.votes = votes
    }

    getVotes() {
        return this.votes
    }
}