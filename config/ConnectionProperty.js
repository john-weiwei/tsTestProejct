"use strict";
exports.__esModule = true;
exports.ConnectionProperty = void 0;
var ConnectionProperty = /** @class */ (function () {
    function ConnectionProperty(host, port, user, password, database) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
    }
    return ConnectionProperty;
}());
exports.ConnectionProperty = ConnectionProperty;
