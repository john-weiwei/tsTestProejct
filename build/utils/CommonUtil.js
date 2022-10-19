"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUtil = void 0;
class CommonUtil {
    static validateIdCard(idCard) {
        let reg = /[a-zA-Z]{1}\d{6}\(\d{1}\)/;
        return reg.test(idCard);
    }
}
exports.CommonUtil = CommonUtil;
