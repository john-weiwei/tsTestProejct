import { describe, it } from "node:test";
import { RequestResult } from "./common/RequestResult";
import { Order } from "./entity/Order";
import { DataSource } from "./config/DataSource";
import { DBUtil } from "../src/utils/DBUtil";
import { EmailUtil } from "../src/utils/EmailUtil";
import { PageInfo } from "./common/PageInfo";
import { AddOrderForm } from "./form/AddOrderForm";
import { UdpateOrderForm } from "./form/UpdateOrderForm";
export class Test {
    testQuery(): RequestResult<Order[]> {
        const sql: string = 'SELECT * from t_order'
        let reqResult: RequestResult<Order[]> = new RequestResult();
        DBUtil.doExec(sql, function (error: any, results: { [x: string]: any; }, fields: any) {
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
            DBUtil.doExec(sql, (error: any, results: unknown) => {
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
    
    async testQueryAsyncPage(page: PageInfo): Promise<RequestResult<Order[]>> {
        let reqResult: RequestResult<Order[]> = new RequestResult()
        let orders: Order[] = []
        const sql: string = 'SELECT * from t_order limit ?,?'
        const params: any[] = [(page.currentPage - 1) * page.pageSize, page.pageSize]
        let promise = new Promise((res, rej) => {
            DBUtil.doExec(sql, (error: any, results: unknown) => {
                if (error) {
                    return rej(error)
                }
                return res(results)
            }, params)
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

    async testQueryAsyncInsert(form: AddOrderForm): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        const sql: string = 'insert into t_order(order_content) values(?)'
        const params: any[] = [form.getContent()]
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

    async testQueryAsyncUpdate(form: UdpateOrderForm): Promise<RequestResult<boolean>> {
        let reqResult: RequestResult<boolean> = new RequestResult()
        const sql: string = 'update t_order set order_content = ? where order_id = ?'
        console.log(form)
        const params: any[] = [form.getOrderContent(), form.getOrderId()]
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
}

// 引用了Test就会执行
let test: Test = new Test()
// unit test
// it('method testQuery test', () => {
//     test.testQuery
//     test.testSendEmail
// })

let form: AddOrderForm = new AddOrderForm()
form.setContent("rongyao")
console.log(form)
// test.testSendEmail()
// test.testQueryAsyncInsert(form).then((data: any) => {
//     console.log("outside invoke exec\n",data)
// })

// let form: UdpateOrderForm = new UdpateOrderForm()
// form.setOrderId(25).setOrderContent("rongyao1")
// test.testQueryAsyncUpdate(form).then((data: any) => {
//     console.log(data)
// })

test.testQueryAsyncDelete(27).then((data: any) => {
    // console.log(data)
})


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






