"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
// 账号信息
// id!: string 主键ID
// name!: string 用户名
// email!: string 邮箱
// idCard!: string 身份证
// manager: boolean = false 管理员标识 
// createTime!: Date 创建时间
// updateTime!: Date 更新时间
class Account {
    constructor() {
        this.managerFlag = false;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setEmail(email) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    setIdCard(idCard) {
        this.idCard = idCard;
    }
    getIdCard() {
        return this.idCard;
    }
    setManagerFlag(managerFlag) {
        this.managerFlag = managerFlag;
    }
    isManager() {
        return this.managerFlag;
    }
    setCreateTime(createTime) {
        this.createTime = createTime;
    }
    getCreateTime() {
        return this.createTime;
    }
    setUpdateTime(updateTime) {
        this.updateTime = updateTime;
    }
    getUpdateTime() {
        return this.updateTime;
    }
}
exports.Account = Account;
