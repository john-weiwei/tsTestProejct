import * as mysql from "mysql";
import { ConnectionProperty } from "./ConnectionProperty";

export class DataSource {
    createConn(): mysql.Connection {
        return mysql.createConnection(new ConnectionProperty('localhost',3306, 'root','root','enjoydb'));
    }
}
