export class RequestResult<T> {
    msg: string
    data: T
    success: boolean = true
    errCode: string
    errMsg: string
    constructor(data: T) {
        this.data = data
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
    
}




