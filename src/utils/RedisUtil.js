"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Redis = void 0;
var redis = require("redis");
var host = "127.0.0.1"; // redis服务地址
var port = '6379'; // redis服务端口
var Redis = /** @class */ (function () {
    function Redis() {
        this.redisClient = redis.createClient({
            url: "redis://".concat(host, ":").concat(port),
            legacyMode: true
        });
        // 配置redis的监听事件
        this.redisClient.on('ready', function () {
            console.log('Redis Client: ready');
        });
        // 连接到redis-server回调事件
        this.redisClient.on('connect', function () {
            console.log(new Date(), 'redis is now connected!');
        });
        // 判断redis是否连接
        if (this.redisClient.isOpen) {
            console.log('rredis is now connected!');
        }
        else {
            this.redisClient.connect()["catch"](function (error) { return console.log(error); });
        }
    }
    Redis.prototype.createConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redisClient.connect()["catch"](function (error) { return console.log(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Redis.prototype.quit = function () {
        this.redisClient.quit();
    };
    Redis.prototype.exists = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.redisClient.exists(key, function (err, result) {
                            if (err) {
                                console.log(err);
                                reject(false);
                            }
                            resolve(result);
                        });
                    })];
            });
        });
    };
    Redis.prototype.set = function (key, value, exprires) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.redisClient.set(key, value, function (err, result) {
                            if (err) {
                                reject(false);
                            }
                            if (exprires != undefined && !isNaN(exprires)) {
                                _this.redisClient.expire(key, exprires);
                            }
                            resolve(result);
                        });
                    })];
            });
        });
    };
    Redis.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.redisClient.get(key, function (err, result) {
                            if (err) {
                                reject(false);
                            }
                            resolve(result);
                        });
                    })];
            });
        });
    };
    Redis.prototype.remove = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.redisClient.del(key, function (err, result) {
                            if (err) {
                                reject(false);
                            }
                            resolve(result);
                        });
                    })];
            });
        });
    };
    // push 将给定值推入列表的右端 返回值 当前列表长度
    Redis.prototype.rPush = function (key, list, exprires) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.redisClient.rPush(key, list, function (err, length) {
                            if (err) {
                                reject(false);
                            }
                            if (!isNaN(exprires)) {
                                _this.redisClient.exports(key, exprires);
                            }
                            resolve(length);
                        });
                    })];
            });
        });
    };
    // 查询list的值
    Redis.prototype.lrange = function (key, startIndex, stopIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (stopIndex === void 0) { stopIndex = -1; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.redisClient.lRange(key, startIndex, stopIndex, function (err, result) {
                            if (err) {
                                reject(false);
                            }
                            resolve(result);
                        });
                    })];
            });
        });
    };
    // 清除list中n个值为value的项
    Redis.prototype.lrem = function (key, n, value) {
        if (n === void 0) { n = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.redisClient.lrem(key, n, value, function (err, result) {
                            if (err) {
                                return false;
                            }
                            resolve(result);
                        });
                    })];
            });
        });
    };
    return Redis;
}());
exports.Redis = Redis;
