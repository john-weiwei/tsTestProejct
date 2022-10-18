"use strict";
exports.__esModule = true;
var redis = require("redis");
var host = "127.0.0.1"; // redis服务地址
var port = '6379'; // redis服务端口
// 连接 Redis
var client = redis.createClient({ url: 'localhost:6379' });
// 创建连接，是个 promise
client.connect()
    .then(function () {
    client.set('name', 'zhangsan')
        .then(function (val) {
        console.log(val);
    });
});
// console.log(client.get('name'))
// const client = redis.createClient();
// client.on('error', (err) => console.log('Redis Client Error', err));
// await client.connect();
// await client.set('key', 'value');
// const value = await client.get('key');
