export class CommonUtil {

    static validateIdCard(idCard: string): boolean {
        let reg = /[a-zA-Z]{1}\d{6}\(\d{1}\)/
        return reg.test(idCard)
    }
}