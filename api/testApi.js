"use strict";
exports.__esModule = true;
var express = require("express");
var PageInfo_1 = require("../common/PageInfo");
var HelloWorld_1 = require("../HelloWorld");
var app = express();
var port = 3000;
// 网络请求
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
// 分页查询列表
app.get('/listOrder', function (req, res) {
    var test = new HelloWorld_1.Test();
    console.log(req.query.currentPage, req.query.pageSize);
    var currentPage = req.query.currentPage;
    var pageSize = req.query.pageSize;
    var page = new PageInfo_1.PageInfo();
    page.currentPage = parseInt(currentPage);
    page.pageSize = parseInt(pageSize);
    test.testQueryAsyncPage(page).then(function (data) {
        res.send(data);
    });
});
