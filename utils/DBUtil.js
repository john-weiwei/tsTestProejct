"use strict";
exports.__esModule = true;
exports.DBUtil = void 0;
var mysql = require("mysql");
var ConnectionProperty_1 = require("../config/ConnectionProperty");
var DBUtil = /** @class */ (function () {
    function DBUtil() {
    }
    DBUtil.createConn = function () {
        return mysql.createConnection(new ConnectionProperty_1.ConnectionProperty(this.host, this.userName, this.password, this.dbName));
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
    DBUtil.host = 'localhost';
    DBUtil.userName = 'root';
    DBUtil.password = 'root';
    DBUtil.dbName = 'enjoydb';
    return DBUtil;
}());
exports.DBUtil = DBUtil;
