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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
const redis = require("redis");
const host = "127.0.0.1"; // redis服务地址
const port = '6379'; // redis服务端口
class Redis {
    constructor() {
        this.redisClient = redis.createClient({
            url: `redis://${host}:${port}`,
            legacyMode: true
        });
        // 配置redis的监听事件
        this.redisClient.on('ready', () => {
            console.log('Redis Client: ready');
        });
        // 连接到redis-server回调事件
        this.redisClient.on('connect', () => {
            console.log(new Date(), 'redis is now connected!');
        });
        // 判断redis是否连接
        if (this.redisClient.isOpen) {
            console.log('rredis is now connected!');
        }
        else {
            this.redisClient.connect().catch((error) => console.log(error));
        }
    }
    createConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.connect().catch((error) => console.log(error));
        });
    }
    quit() {
        this.redisClient.quit();
    }
    exists(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.exists(key, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(false);
                    }
                    resolve(result);
                });
            });
        });
    }
    set(key, value, exprires) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            return new Promise((resolve, reject) => {
                this.redisClient.set(key, value, (err, result) => {
                    if (err) {
                        reject(false);
                    }
                    if (exprires != undefined && !isNaN(exprires)) {
                        this.redisClient.expire(key, exprires);
                    }
                    resolve(result);
                });
            });
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.get(key, (err, result) => {
                    if (err) {
                        reject(false);
                    }
                    resolve(result);
                });
            });
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.del(key, (err, result) => {
                    if (err) {
                        reject(false);
                    }
                    resolve(result);
                });
            });
        });
    }
    // push 将给定值推入列表的右端 返回值 当前列表长度
    rPush(key, list, exprires) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.rPush(key, list, (err, length) => {
                    if (err) {
                        reject(false);
                    }
                    if (!isNaN(exprires)) {
                        this.redisClient.exports(key, exprires);
                    }
                    resolve(length);
                });
            });
        });
    }
    // 查询list的值
    lrange(key, startIndex = 0, stopIndex = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.lRange(key, startIndex, stopIndex, (err, result) => {
                    if (err) {
                        reject(false);
                    }
                    resolve(result);
                });
            });
        });
    }
    // 清除list中n个值为value的项
    lrem(key, n = 1, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.lrem(key, n, value, (err, result) => {
                    if (err) {
                        return false;
                    }
                    resolve(result);
                });
            });
        });
    }
}
exports.Redis = Redis;
