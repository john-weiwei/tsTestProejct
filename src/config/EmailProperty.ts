export class EmailProperty {
    host: string
    port: number
    secure: boolean = false
    account: string
    password: string
    constructor(host: string, port: number, secure: boolean, 
        account: string, password: string) {
        this.host = host
        this.port = port
        this.secure = secure
        this.account = account
        this.password = password
    }
}