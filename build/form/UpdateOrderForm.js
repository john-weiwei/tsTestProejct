"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UdpateOrderForm = void 0;
class UdpateOrderForm {
    constructor() {
    }
    setOrderId(orderId) {
        this.orderId = orderId;
        return this;
    }
    getOrderId() {
        return this.orderId;
    }
    setOrderContent(orderContent) {
        this.orderContent = orderContent;
        return this;
    }
    getOrderContent() {
        return this.orderContent;
    }
}
exports.UdpateOrderForm = UdpateOrderForm;
