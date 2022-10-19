"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const PageInfo_1 = require("../common/PageInfo");
const HelloWorld_1 = require("../HelloWorld");
const app = express();
const port = 3000;
// 网络请求
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// 分页查询列表
app.get('/listOrder', (req, res) => {
    let test = new HelloWorld_1.Test();
    console.log(req.query.currentPage, req.query.pageSize);
    let currentPage = req.query.currentPage;
    let pageSize = req.query.pageSize;
    let page = new PageInfo_1.PageInfo();
    page.currentPage = parseInt(currentPage);
    page.pageSize = parseInt(pageSize);
    test.testQueryAsyncPage(page).then((data) => {
        res.send(data);
    });
});
