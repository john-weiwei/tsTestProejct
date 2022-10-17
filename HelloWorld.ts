import { describe, it } from "node:test";
import { RequestResult } from "./common/RequestResult";
import { Order } from "./entity/Order";
import { DataSource } from "./config/DataSource";
import { DBUtil } from "./utils/DBUtil";
import { EmailUtil } from "./utils/EmailUtil";
export class Test {
    testQuery(): RequestResult<Order[]> {
        const sql: string = 'SELECT * from t_order'
        let reqResult: RequestResult<Order[]> = new RequestResult();
        DBUtil.doExec(sql, function (error, results, fields) {
            if (error) throw error;
            let orders: Order[] = []
            for (const item in results) {
                if (Object.prototype.hasOwnProperty.call(results, item)) {
                    const element = results[item];
                    let order: Order = new Order(element.order_id, element.order_content)
                    orders.push(order)
                }
            }
            reqResult.setData(orders)
        });
        console.log(reqResult)
        return reqResult
    }

    async testQueryAsync(): Promise<RequestResult<Order[]>> {
        let reqResult: RequestResult<Order[]> = new RequestResult()
        let orders: Order[] = []
        const sql: string = 'SELECT * from t_order'
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error, results) => {
                if (error) {
                    return rej(error)
                }
                return res(results)
            })
        })

        await promise.then((results: any) => {
            for (const item in results) {
                const element = results[item];
                let order: Order = new Order(element.order_id, element.order_content)
                orders.push(order)
            }
            reqResult.setData(orders)
        })
        return reqResult
    }

    testSendEmail(): void {
        EmailUtil.send('投票详情', '张三:10票;李四:20票', '812072775@qq.com')
    }
}

// unit test
// it('method testQuery test', () => {
//     let test: Test = new Test()
//     test.testQuery
//     test.testSendEmail
// })

let test: Test = new Test()
console.log("aaa")
test.testQuery
let asyncValue = test.testQueryAsync()
console.log(asyncValue)


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






