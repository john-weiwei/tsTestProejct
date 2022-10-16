"use strict";
exports.__esModule = true;
exports.EmailUtil = void 0;
var nodemailer = require("nodemailer");
var EmailUtil = /** @class */ (function () {
    function EmailUtil() {
    }
    EmailUtil.send = function (title, content, receiver) {
        var config = {
            host: EmailUtil.host,
            port: EmailUtil.port,
            secure: false,
            auth: {
                user: EmailUtil.sender,
                pass: EmailUtil.pass
            }
        };
        // 根据配置创建服务 
        var server = nodemailer.createTransport(config);
        var mail = {
            from: EmailUtil.sender,
            to: receiver,
            html: '<div>' + content + '</div>',
            subject: title
        };
        //回调函数
        var callback = function (err, msg) {
            if (err) {
                console.log("发送失败", err);
            }
            else {
                console.log("发送成功", msg);
            }
        };
        //开始发送邮件
        server.sendMail(mail, callback);
    };
    EmailUtil.sender = '2128093477@qq.com'; // 发送者邮箱
    EmailUtil.pass = 'mglwmnnqjmycegdg'; // 授权码或密码
    EmailUtil.host = 'smtp.qq.com';
    EmailUtil.port = 587;
    return EmailUtil;
}());
exports.EmailUtil = EmailUtil;
