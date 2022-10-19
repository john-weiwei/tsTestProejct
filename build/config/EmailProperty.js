"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailProperty = void 0;
class EmailProperty {
    constructor(host, port, secure, account, password) {
        this.secure = false;
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.account = account;
        this.password = password;
    }
}
exports.EmailProperty = EmailProperty;
