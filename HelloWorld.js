"use strict";
exports.__esModule = true;
exports.Test = void 0;
var node_test_1 = require("node:test");
var RequestResult_1 = require("./common/RequestResult");
var Order_1 = require("./entity/Order");
var DBUtil_1 = require("./utils/DBUtil");
var EmailUtil_1 = require("./utils/EmailUtil");
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.testQuery = function () {
        var sql = 'SELECT * from t_order';
        var reqResult = DBUtil_1.DBUtil.doExec(sql, function (error, results, fields) {
            if (error)
                throw error;
            var orders = [];
            for (var item in results) {
                if (Object.prototype.hasOwnProperty.call(results, item)) {
                    var element = results[item];
                    var order = new Order_1.Order(element.order_id, element.order_content);
                    orders.push(order);
                }
            }
            return new RequestResult_1.RequestResult(orders);
        });
        console.log(reqResult);
    };
    Test.prototype.testSendEmail = function () {
        EmailUtil_1.EmailUtil.send('投票详情', '张三:10票;李四:20票', '812072775@qq.com');
    };
    return Test;
}());
exports.Test = Test;
// unit test
(0, node_test_1.it)('method testQuery test', function () {
    var test = new Test();
    test.testQuery;
    console.log("dddddd");
    test.testSendEmail;
});
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
