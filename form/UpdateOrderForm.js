"use strict";
exports.__esModule = true;
exports.UdpateOrderForm = void 0;
var UdpateOrderForm = /** @class */ (function () {
    function UdpateOrderForm() {
    }
    UdpateOrderForm.prototype.setOrderId = function (orderId) {
        this.orderId = orderId;
        return this;
    };
    UdpateOrderForm.prototype.getOrderId = function () {
        return this.orderId;
    };
    UdpateOrderForm.prototype.setOrderContent = function (orderContent) {
        this.orderContent = orderContent;
        return this;
    };
    UdpateOrderForm.prototype.getOrderContent = function () {
        return this.orderContent;
    };
    return UdpateOrderForm;
}());
exports.UdpateOrderForm = UdpateOrderForm;
