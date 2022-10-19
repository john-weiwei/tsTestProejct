"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const RequestResult_1 = require("./common/RequestResult");
const Order_1 = require("./entity/Order");
const DBUtil_1 = require("../src/utils/DBUtil");
const EmailUtil_1 = require("../src/utils/EmailUtil");
const RedisUtil_1 = require("./utils/RedisUtil");
class Test {
    testQuery() {
        const sql = 'SELECT * from t_order';
        let reqResult = new RequestResult_1.RequestResult();
        DBUtil_1.DBUtil.doExec(sql, function (error, results, fields) {
            if (error)
                throw error;
            let orders = [];
            for (const item in results) {
                if (Object.prototype.hasOwnProperty.call(results, item)) {
                    const element = results[item];
                    let order = new Order_1.Order(element.order_id, element.order_content);
                    orders.push(order);
                }
            }
            reqResult.setData(orders);
        });
        console.log(reqResult);
        return reqResult;
    }
    testQueryAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            let orders = [];
            const sql = 'SELECT * from t_order';
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, results) => {
                    if (error) {
                        return rej(error);
                    }
                    res(results);
                });
            });
            yield promise.then((results) => {
                for (const item in results) {
                    const element = results[item];
                    let order = new Order_1.Order(element.order_id, element.order_content);
                    orders.push(order);
                }
                reqResult.setData(orders);
            });
            return reqResult;
        });
    }
    testQueryAsyncPage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            let orders = [];
            const sql = 'SELECT * from t_order limit ?,?';
            const params = [(page.currentPage - 1) * page.pageSize, page.pageSize];
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, results) => {
                    if (error) {
                        return rej(error);
                    }
                    res(results);
                }, params);
            });
            yield promise.then((results) => {
                for (const item in results) {
                    const element = results[item];
                    let order = new Order_1.Order(element.order_id, element.order_content);
                    orders.push(order);
                }
                reqResult.setData(orders);
            });
            return reqResult;
        });
    }
    testQueryAsyncInsert(form) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            const sql = 'insert into t_order(order_content) values(?)';
            const params = [form.getContent()];
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }, params);
            });
            yield promise.then((result) => {
                if (result.serverStatus == 2) {
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
    testQueryAsyncUpdate(form) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            const sql = 'update t_order set order_content = ? where order_id = ?';
            console.log(form);
            const params = [form.getOrderContent(), form.getOrderId()];
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }, params);
            });
            yield promise.then((result) => {
                if (result.serverStatus == 2) {
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
    testQueryAsyncDelete(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqResult = new RequestResult_1.RequestResult();
            const sql = 'delete from t_order where order_id = ?';
            const params = [orderId];
            let promise = new Promise((res, rej) => {
                DBUtil_1.DBUtil.doExec(sql, (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }, params);
            });
            yield promise.then((result) => {
                if (result.serverStatus == 2) {
                    return reqResult.setData(true);
                }
                reqResult.setData(false);
            });
            return reqResult;
        });
    }
    testSendEmail() {
        EmailUtil_1.EmailUtil.send('投票详情', '张三:10票;李四:20票', '812072775@qq.com');
    }
    // redis test
    testRedisSave() {
        let redis = new RedisUtil_1.Redis();
        redis.set("name", "zhangsan").then((result) => {
            // console.log(result)
        });
        redis.get("name").then((result) => {
            console.log(result);
        });
    }
    testRegExp(exp, str) {
        let flag = exp.test(str);
        console.log(flag);
    }
}
exports.Test = Test;
// 引用了Test就会执行
let test = new Test();
// unit test
// it('method testQuery test', () => {
//     test.testQuery
//     test.testSendEmail
// })
// 发送邮件
// test.testSendEmail()
// test.testQueryAsyncInsert(form).then((data: any) => {
//     console.log("outside invoke exec\n",data)
// })
// 数据库crud
// let form: UdpateOrderForm = new UdpateOrderForm()
// form.setOrderId(25).setOrderContent("rongyao1")
// test.testQueryAsyncUpdate(form).then((data: any) => {
//     console.log(data)
// })
// redis
// test.testRedisSave()
// 正则表达式
let reg = /[a-zA-Z0-9]+\@{1}\w+\.{1}[a-z]+\.?[a-z]+?/;
// let reg = /[a-zA-Z]{1}\d{6}\(/
let str = 'A123456@qq.com.cn';
test.testRegExp(reg, str);
// const insertSql = 'insert into t_order(order_content) values(?)';
// let values = ['oppo']
// DBUtil.doExec(insertSql, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The insert reuslt is: ', results);
// }, values);
// const updateSql = 'update t_order set order_content = ? where order_id = ?';
// let uValues = ['huawei', '1']
// DBUtil.doExec(updateSql, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The update reuslt is: ', results);
// }, uValues);
// const deleteSql = 'delete from t_order where order_id = ?';
// let dValues = ['1']
// DBUtil.doExec(deleteSql, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The delete reuslt is: ', results);
// }, dValues);
