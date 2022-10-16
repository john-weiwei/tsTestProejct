"use strict";
exports.__esModule = true;
exports.DBUtil = void 0;
var mysql = require("mysql");
var ConnectionProperty_1 = require("../config/ConnectionProperty");
var DBUtil = /** @class */ (function () {
    function DBUtil() {
    }
    DBUtil.createConn = function () {
        return mysql.createConnection(new ConnectionProperty_1.ConnectionProperty('localhost', 'root', 'root', 'enjoydb'));
    };
    DBUtil.doExec = function (sql, callback, values) {
        var conn = this.createConn();
        conn.connect;
        try {
            conn.query(sql, values, callback);
        }
        catch (error) {
            throw error;
        }
        finally {
            conn.destroy;
        }
    };
    return DBUtil;
}());
exports.DBUtil = DBUtil;
