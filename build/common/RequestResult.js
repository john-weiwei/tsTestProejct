"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResult = void 0;
class RequestResult {
    constructor() {
        this.success = true;
    }
    setMsg(msg) {
        this.msg = msg;
    }
    getMsg() {
        return this.msg;
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    setErrCode(errCode) {
        this.errCode = errCode;
    }
    getErrCode() {
        return this.errCode;
    }
    setErrMsg(errMsg) {
        this.errMsg = errMsg;
    }
    getErrMsg() {
        return this.errMsg;
    }
}
exports.RequestResult = RequestResult;
