import * as nodemailer from "nodemailer";
import { SymbolConstants } from "../common/SymbolConstants";
export class EmailUtil {
    private static sender: string = '2128093477@qq.com' // 发送者邮箱
    private static pass: string = 'mglwmnnqjmycegdg' // 授权码或密码
    private static host: string = 'smtp.qq.com' 
    private static port: number = 587 

    static send(title: string, content: any, receiver: string): void {
        let config: any = {
            host: EmailUtil.host,
            port: EmailUtil.port,
            secure: false, // true for 465, false for other ports
            auth: {
              user: EmailUtil.sender, 
              pass: EmailUtil.pass, 
            },
          };
        
        // 根据配置创建服务 
        let server = nodemailer.createTransport(config)
        const mail = {
            from: EmailUtil.sender,
            to: receiver,
            html: SymbolConstants.leftDiv + content + SymbolConstants.rightDiv, 
            subject: title          
        }

        //回调函数
        const callback = function(err: any, msg: any) {
            if (err) {
                console.log("发送失败", err)
            } else {
                console.log("发送成功", msg)
            }
        }
        
        //开始发送邮件
        server.sendMail(mail, callback)
    }
}




