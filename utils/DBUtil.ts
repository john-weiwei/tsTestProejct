import * as mysql from "mysql";
import { ConnectionProperty } from "../config/ConnectionProperty";
export class DBUtil {
    private static host: string = '192.168.255.129'
    private static port: number = 3312
    private static userName: string = 'root'
    private static password: string = '123456'
    private static dbName: string = 'enjoy'
    private static createConn(): mysql.Connection {
        return mysql.createConnection(new ConnectionProperty(this.host, this.port, this.userName, this.password, this.dbName));
    }
    
    static doExec(sql: string, callback?: mysql.queryCallback, values?: any | null): any {
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

