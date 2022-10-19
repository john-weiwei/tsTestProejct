export class RequestResult<T> {
    msg!: string
    data!: T
    success: boolean = true
    errCode!: string
    errMsg!: string
    constructor() {
        
    }
    setMsg(msg: string): void {
        this.msg = msg
    }

    getMsg(): string {
        return this.msg;
    }

    setData(data: T): void {
        this.data = data
    }

    getData(): T {
        return this.data;
    }
    
    setSuccess(success: boolean): void {
        this.success = success
    }

    isSuccess(): boolean {
        return this.success;
    }

    setErrCode(errCode: string): void {
        this.errCode = errCode
    }

    getErrCode(): string {
        return this.errCode;
    }

    setErrMsg(errMsg: string): void {
        this.errMsg = errMsg
    }

    getErrMsg(): string {
        return this.errMsg;
    }

    static fail<T>(errMsg: string): RequestResult<T> {
        const result: RequestResult<T> = new RequestResult()
        result.setSuccess(false)
        result.setErrCode('00001')
        result.setErrMsg(errMsg)
        return result
    }
    
    static ok<T>(data: T): RequestResult<T> {
        const result: RequestResult<T> = new RequestResult()
        result.setErrCode('00000')
        result.setData(data)
        return result
    }
    
}




