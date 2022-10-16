import * as mysql from "mysql";
import { ConnectionProperty } from "../config/ConnectionProperty";
export class DBUtil {
    private static host: string = 'localhost'
    private static userName: string = 'root'
    private static password: string = 'root'
    private static dbName: string = 'enjoydb'
    private static createConn(): mysql.Connection {
        return mysql.createConnection(new ConnectionProperty(this.host, this.userName, this.password, this.dbName));
    }
    
    static doExec(sql: string, callback: mysql.queryCallback, values?: any | null): any {
        const conn = this.createConn();
        conn.connect
        try {
            conn.query(sql, values, callback)    
        } catch (error) {
            throw error
        } finally {
            conn.destroy
        }
    }

}

