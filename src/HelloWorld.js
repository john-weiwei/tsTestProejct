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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Test = void 0;
var RequestResult_1 = require("./common/RequestResult");
var Order_1 = require("./entity/Order");
var DBUtil_1 = require("../src/utils/DBUtil");
var EmailUtil_1 = require("../src/utils/EmailUtil");
var AddOrderForm_1 = require("./form/AddOrderForm");
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.testQuery = function () {
        var sql = 'SELECT * from t_order';
        var reqResult = new RequestResult_1.RequestResult();
        DBUtil_1.DBUtil.doExec(sql, function (error, results, fields) {
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
            reqResult.setData(orders);
        });
        console.log(reqResult);
        return reqResult;
    };
    Test.prototype.testQueryAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reqResult, orders, sql, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqResult = new RequestResult_1.RequestResult();
                        orders = [];
                        sql = 'SELECT * from t_order';
                        promise = new Promise(function (res, rej) {
                            DBUtil_1.DBUtil.doExec(sql, function (error, results) {
                                if (error) {
                                    return rej(error);
                                }
                                return res(results);
                            });
                        });
                        return [4 /*yield*/, promise.then(function (results) {
                                for (var item in results) {
                                    var element = results[item];
                                    var order = new Order_1.Order(element.order_id, element.order_content);
                                    orders.push(order);
                                }
                                reqResult.setData(orders);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reqResult];
                }
            });
        });
    };
    Test.prototype.testQueryAsyncPage = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var reqResult, orders, sql, params, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqResult = new RequestResult_1.RequestResult();
                        orders = [];
                        sql = 'SELECT * from t_order limit ?,?';
                        params = [(page.currentPage - 1) * page.pageSize, page.pageSize];
                        promise = new Promise(function (res, rej) {
                            DBUtil_1.DBUtil.doExec(sql, function (error, results) {
                                if (error) {
                                    return rej(error);
                                }
                                return res(results);
                            }, params);
                        });
                        return [4 /*yield*/, promise.then(function (results) {
                                for (var item in results) {
                                    var element = results[item];
                                    var order = new Order_1.Order(element.order_id, element.order_content);
                                    orders.push(order);
                                }
                                reqResult.setData(orders);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reqResult];
                }
            });
        });
    };
    Test.prototype.testQueryAsyncInsert = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var reqResult, sql, params, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqResult = new RequestResult_1.RequestResult();
                        sql = 'insert into t_order(order_content) values(?)';
                        params = [form.getContent()];
                        promise = new Promise(function (res, rej) {
                            DBUtil_1.DBUtil.doExec(sql, function (error, result) {
                                if (error) {
                                    return rej(error);
                                }
                                res(result);
                            }, params);
                        });
                        return [4 /*yield*/, promise.then(function (result) {
                                if (result.serverStatus == 2) {
                                    return reqResult.setData(true);
                                }
                                reqResult.setData(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reqResult];
                }
            });
        });
    };
    Test.prototype.testQueryAsyncUpdate = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var reqResult, sql, params, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqResult = new RequestResult_1.RequestResult();
                        sql = 'update t_order set order_content = ? where order_id = ?';
                        console.log(form);
                        params = [form.getOrderContent(), form.getOrderId()];
                        promise = new Promise(function (res, rej) {
                            DBUtil_1.DBUtil.doExec(sql, function (error, result) {
                                if (error) {
                                    return rej(error);
                                }
                                res(result);
                            }, params);
                        });
                        return [4 /*yield*/, promise.then(function (result) {
                                if (result.serverStatus == 2) {
                                    return reqResult.setData(true);
                                }
                                reqResult.setData(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reqResult];
                }
            });
        });
    };
    Test.prototype.testQueryAsyncDelete = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var reqResult, sql, params, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqResult = new RequestResult_1.RequestResult();
                        sql = 'delete from t_order where order_id = ?';
                        params = [orderId];
                        promise = new Promise(function (res, rej) {
                            DBUtil_1.DBUtil.doExec(sql, function (error, result) {
                                if (error) {
                                    return rej(error);
                                }
                                res(result);
                            }, params);
                        });
                        return [4 /*yield*/, promise.then(function (result) {
                                if (result.serverStatus == 2) {
                                    return reqResult.setData(true);
                                }
                                reqResult.setData(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reqResult];
                }
            });
        });
    };
    Test.prototype.testSendEmail = function () {
        EmailUtil_1.EmailUtil.send('投票详情', '张三:10票;李四:20票', '812072775@qq.com');
    };
    return Test;
}());
exports.Test = Test;
// 引用了Test就会执行
var test = new Test();
// unit test
// it('method testQuery test', () => {
//     test.testQuery
//     test.testSendEmail
// })
var form = new AddOrderForm_1.AddOrderForm();
form.setContent("rongyao");
console.log(form);
// test.testSendEmail()
// test.testQueryAsyncInsert(form).then((data: any) => {
//     console.log("outside invoke exec\n",data)
// })
// let form: UdpateOrderForm = new UdpateOrderForm()
// form.setOrderId(25).setOrderContent("rongyao1")
// test.testQueryAsyncUpdate(form).then((data: any) => {
//     console.log(data)
// })
test.testQueryAsyncDelete(27).then(function (data) {
    // console.log(data)
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
