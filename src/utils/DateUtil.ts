export class DateUtil {
    constructor() { }

    static convertDateToStr(date: Date): string {
        let year: any = date.getFullYear()
        let month: any = date.getMonth() + 1
        let day: any = date.getDate()
        if (month < 10) {
            month = '0' + month
        }

        if (day < 10) {
            day = '0' + day
        }

        return year + '-' + month + '-' + day
    }

    static nextFewDay(date: Date, days: number): string {
        let newDate: any = date.setDate(date.getDate() + days)
        return DateUtil.convertDateToStr(new Date(newDate))
    }

    static currentMonthDays(year: number, month: number): number {
        return new Date(year, month, 0).getDate()
    }

    static convertStartDate(date: string): string {
        return date + ' 00:00:00'
    }
    
    static convertEndDate(date: string): string {
        return date + ' 23:59:59'
    }
}