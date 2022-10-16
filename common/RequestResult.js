"use strict";
exports.__esModule = true;
exports.RequestResult = void 0;
var RequestResult = /** @class */ (function () {
    function RequestResult(data) {
        this.success = true;
        this.data = data;
    }
    RequestResult.prototype.setMsg = function (msg) {
        this.msg = msg;
    };
    RequestResult.prototype.getMsg = function () {
        return this.msg;
    };
    RequestResult.prototype.setData = function (data) {
        this.data = data;
    };
    RequestResult.prototype.getData = function () {
        return this.data;
    };
    RequestResult.prototype.setErrCode = function (errCode) {
        this.errCode = errCode;
    };
    RequestResult.prototype.getErrCode = function () {
        return this.errCode;
    };
    RequestResult.prototype.setErrMsg = function (errMsg) {
        this.errMsg = errMsg;
    };
    RequestResult.prototype.getErrMsg = function () {
        return this.errMsg;
    };
    return RequestResult;
}());
exports.RequestResult = RequestResult;
