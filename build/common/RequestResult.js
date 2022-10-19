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
    setSuccess(success) {
        this.success = success;
    }
    isSuccess() {
        return this.success;
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
    static fail(errMsg) {
        const result = new RequestResult();
        result.setSuccess(false);
        result.setErrCode('00001');
        result.setErrMsg(errMsg);
        return result;
    }
    static ok(data) {
        const result = new RequestResult();
        result.setErrCode('00000');
        result.setData(data);
        return result;
    }
}
exports.RequestResult = RequestResult;
