// 账号信息
// id!: string 主键ID
// name!: string 用户名
// email!: string 邮箱
// idCard!: string 身份证
// manager: boolean = false 管理员标识 
// createTime!: Date 创建时间
// updateTime!: Date 更新时间
export class Account {
    id!: string
    name!: string
    email!: string
    idCard!: string
    managerFlag: boolean = false
    createTime!: Date
    updateTime!: Date
    constructor() {

    }

    setId(id: string) {
        this.id = id
    }

    getId() {
        return this.id
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

    setIdCard(idCard: string) {
        this.idCard = idCard
    }

    getIdCard() {
        return this.idCard
    }

    setManagerFlag(managerFlag: boolean) {
        this.managerFlag = managerFlag
    }

    isManager() {
        return this.managerFlag
    }

    setCreateTime(createTime: Date) {
        this.createTime = createTime
    }

    getCreateTime() {
        return this.createTime
    }

    setUpdateTime(updateTime: Date) {
        this.updateTime = updateTime
    }

    getUpdateTime() {
        return this.updateTime
    }

}