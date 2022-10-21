import { RequestResult } from "../common/RequestResult";
import { DBUtil } from "../utils/DBUtil";
import { EmailUtil } from "../utils/EmailUtil";
import { RedisUtil } from "../utils/RedisUtil";
export class Test {
    async testQueryAsyncDelete(orderId: number): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        const sql: string = 'delete from t_order where order_id = ?'
        const params: any[] = [orderId]
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, result: unknown) => {
                if (error) {
                    return rej(error)
                }
                res(result)
            }, params)
        })

        await promise.then((result: any) => {
            if (result.serverStatus == 2) {
                return reqResult.setData(true)
            }
            reqResult.setData(false)
        })
        return reqResult
    }

    testSendEmail(): void {
        EmailUtil.send('投票详情', '张三:10票;李四:20票', '812072775@qq.com')
    }

    // redis test
    testRedisSave() {
        let redis: RedisUtil = new RedisUtil()
        // redis.set("", 1).then((result: any) => {
        //     // console.log(result)
        // })

        redis.sadd("accounts", 2).then((result: any) => {
            console.log(result)
        }).catch((err: any) => {
            console.log(err)
        })


        // redis.get("name").then((result: any) => {
        //     console.log(result)
        // })

        redis.sismember("accounts", 3).then((result: any) => {
            console.log(result)
        }).catch((err: any) => {
            console.log(err) 
        })

        redis.smembers("accounts").then((result: any) => {
            console.log(result)
        }).catch((err: any) => {
            console.log(err) 
        })
    }

    testRegExp(exp: any, str: string) {
        let flag: any = exp.test(str)
        console.log(flag)
    }

    testSymbo() {
        console.log(20 % 10)
        console.log(20 / 10)
        let a: any = 11 / 10
        console.log(parseInt(a))
    }
}

// 引用了Test就会执行
let test: Test = new Test()
// unit test
// it('method testQuery test', () => {
//     test.testQuery
//     test.testSendEmail
// })

// 发送邮件
// test.testSendEmail()
// test.testQueryAsyncInsert(form).then((data: any) => {
//     console.log("outside invoke exec\n",data)
// })

// 数据库crud
// let form: UdpateOrderForm = new UdpateOrderForm()
// form.setOrderId(25).setOrderContent("rongyao1")
// test.testQueryAsyncUpdate(form).then((data: any) => {
//     console.log(data)
// })

// redis
// test.testRedisSave()

// 正则表达式
// let reg = /[a-zA-Z0-9]+\@{1}\w+\.{1}[a-z]+\.?[a-z]+?/
// let reg = /[a-zA-Z]{1}\d{6}\(/
// let str: string = 'A123456@qq.com.cn'
// DateUtil.nextFewDay(new Date(), 2)
// test.testRegExp(reg, str)

test.testSymbo()

// const insertSql = 'insert into t_order(order_content) values(?)';
// let values = ['oppo']
// DBUtil.doExec(insertSql, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The insert reuslt is: ', results);
// }, values);

// const updateSql = 'update t_order set order_content = ? where order_id = ?';
// let uValues = ['huawei', '1']
// DBUtil.doExec(updateSql, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The update reuslt is: ', results);
// }, uValues);

// const deleteSql = 'delete from t_order where order_id = ?';
// let dValues = ['1']
// DBUtil.doExec(deleteSql, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The delete reuslt is: ', results);
// }, dValues);






