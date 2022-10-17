"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 3000;
// 网络请求
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
app.get('/index', function (req, res) {
    res.send('Hello Index!');
});
