"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionProperty = void 0;
class ConnectionProperty {
    constructor(host, port, user, password, database) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
    }
}
exports.ConnectionProperty = ConnectionProperty;
