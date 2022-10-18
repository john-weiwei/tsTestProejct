"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const PageInfo_1 = require("../common/PageInfo");
const HelloWorld_1 = require("../HelloWorld");
const app = express.default();
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
