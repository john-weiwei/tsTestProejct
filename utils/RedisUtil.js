"use strict";
exports.__esModule = true;
var redis_1 = require("redis");
var host = "127.0.0.1"; // redis服务地址
var port = '6379'; // redis服务端口
// 连接 Redis
var client = redis_1["default"].createClient();
// 使用事件发射器，检测错误
client.on("error", function (error) {
    console.error(error);
});
// console 来验证 Redis 的 API 是异步
console.log("🦋🦋🦋🦋");
// 存储一个 key value
client.set("name", "Condor Hero");
console.log("🐥🐥🐥🐥");
// 读取 name 这个 key 的值
client.get("name");
