"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDto = void 0;
// 用户dto信息
class AccountDto {
    constructor() { }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
exports.AccountDto = AccountDto;
