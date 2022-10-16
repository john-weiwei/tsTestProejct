"use strict";
exports.__esModule = true;
exports.DataSource = void 0;
var mysql = require("mysql");
var ConnectionProperty_1 = require("./ConnectionProperty");
var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    DataSource.prototype.createConn = function () {
        return mysql.createConnection(new ConnectionProperty_1.ConnectionProperty('localhost', 'root', 'root', 'enjoydb'));
    };
    return DataSource;
}());
exports.DataSource = DataSource;
