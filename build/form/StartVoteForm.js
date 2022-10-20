"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartVoteForm = void 0;
// 开始或结束投票表单
class StartVoteForm {
    constructor() { }
    setOperatorId(operatorId) {
        this.operatorId = operatorId;
    }
    getOperatorId() {
        return this.operatorId;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}
exports.StartVoteForm = StartVoteForm;
