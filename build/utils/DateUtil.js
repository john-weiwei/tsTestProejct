"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
class DateUtil {
    constructor() { }
    static convertDateToStr(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }
    static nextFewDay(date, days) {
        let newDate = date.setDate(date.getDate() + days);
        return DateUtil.convertDateToStr(new Date(newDate));
    }
    static currentMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
    }
    static convertStartDate(date) {
        return date + ' 00:00:00';
    }
    static convertEndDate(date) {
        return date + ' 23:59:59';
    }
}
exports.DateUtil = DateUtil;
