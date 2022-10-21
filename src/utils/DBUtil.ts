import * as mysql from "mysql";
import { ConnectionProperty } from "../config/ConnectionProperty";
export class DBUtil {
    private static host: string = '192.168.255.129'
    // private static host: string = '127.0.0.1'
    private static port: number = 3312
    // private static port: number = 3306
    private static userName: string = 'root'
    // private static password: string = 'root'
    private static password: string = '123456'
    // private static dbName: string = 'enjoydb'
    private static dbName: string = 'enjoy'
    private static createConn(): mysql.Connection {
        return mysql.createConnection(new ConnectionProperty(this.host, this.port, this.userName, this.password, this.dbName));
    }
    
    // 执行SQL
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

    // 统计总数的sql
    static async countRecordSql(sql: string): Promise<number> {
        const countSql = 'select count(*) as countRecord '
        const finalSql = countSql + sql
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(finalSql, (error: any, results: any) => {
                if (error) {
                    return rej(error)
                }
                res(results)
            })
        })

        let result: number = 0
        await promise.then((results: any) => {
            result = results[0].countRecord
        })
        return result
    }

}

