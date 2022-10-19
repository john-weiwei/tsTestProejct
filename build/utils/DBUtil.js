"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUtil = void 0;
const mysql = __importStar(require("mysql"));
const ConnectionProperty_1 = require("../config/ConnectionProperty");
class DBUtil {
    static createConn() {
        return mysql.createConnection(new ConnectionProperty_1.ConnectionProperty(this.host, this.port, this.userName, this.password, this.dbName));
    }
    static doExec(sql, callback, values) {
        const conn = this.createConn();
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
    }
}
exports.DBUtil = DBUtil;
DBUtil.host = '192.168.255.129';
DBUtil.port = 3312;
DBUtil.userName = 'root';
DBUtil.password = '123456';
DBUtil.dbName = 'enjoy';
