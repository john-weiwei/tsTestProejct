export class Order {
    orderId: string
    orderContent: string
    constructor(orderId: string, orderContent: string) {
        this.orderId = orderId;
        this.orderContent = orderContent;
    }
}