export class UdpateOrderForm {
    private orderId: number
    private orderContent: string
    constructor() {

    }

    setOrderId(orderId: number) {
        this.orderId = orderId
        return this
    }

    getOrderId() {
        return this.orderId
    }

    setOrderContent(orderContent: string) {
        this.orderContent = orderContent
        return this
    }

    getOrderContent() {
        return this.orderContent
    }
}