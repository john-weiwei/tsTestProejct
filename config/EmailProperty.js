"use strict";
exports.__esModule = true;
exports.EmailProperty = void 0;
var EmailProperty = /** @class */ (function () {
    function EmailProperty(host, port, secure, account, password) {
        this.secure = false;
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.account = account;
        this.password = password;
    }
    return EmailProperty;
}());
exports.EmailProperty = EmailProperty;
