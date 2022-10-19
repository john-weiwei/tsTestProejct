// 用户dto信息
export class AccountDto {
    name!: string
    constructor() {}

    setName(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }
}