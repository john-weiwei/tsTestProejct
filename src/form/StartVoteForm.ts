import { StatusEnum } from "../enum/StatusEnum";

// 开始或结束投票表单
export class StartVoteForm {
    status!: StatusEnum
    operatorId!: string
    constructor() {}
    
    setOperatorId(operatorId: string) {
        this.operatorId = operatorId
    }

    getOperatorId() {
        return this.operatorId
    }

    setStatus(status: StatusEnum) {
        this.status = status
    }

    getStatus() {
        return this.status
    }
}