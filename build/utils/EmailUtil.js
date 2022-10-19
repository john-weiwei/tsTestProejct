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
exports.EmailUtil = void 0;
const nodemailer = __importStar(require("nodemailer"));
const SymbolConstants_1 = require("../common/SymbolConstants");
class EmailUtil {
    static send(title, content, receiver) {
        let config = {
            host: EmailUtil.host,
            port: EmailUtil.port,
            secure: false,
            auth: {
                user: EmailUtil.sender,
                pass: EmailUtil.pass,
            },
        };
        // 根据配置创建服务 
        let server = nodemailer.createTransport(config);
        const mail = {
            from: EmailUtil.sender,
            to: receiver,
            html: SymbolConstants_1.SymbolConstants.leftDiv + content + SymbolConstants_1.SymbolConstants.rightDiv,
            subject: title
        };
        //回调函数
        const callback = function (err, msg) {
            if (err) {
                console.log("发送失败", err);
            }
            else {
                console.log("发送成功", msg);
            }
        };
        //开始发送邮件
        server.sendMail(mail, callback);
    }
    static validateEmail(email) {
        let reg = /[a-zA-Z0-9]+\@{1}\w+\.{1}[a-z]+\.?[a-z]+?/;
        return reg.test(email);
    }
}
exports.EmailUtil = EmailUtil;
EmailUtil.sender = '2128093477@qq.com'; // 发送者邮箱
EmailUtil.pass = 'mglwmnnqjmycegdg'; // 授权码或密码
EmailUtil.host = 'smtp.qq.com';
EmailUtil.port = 587;
