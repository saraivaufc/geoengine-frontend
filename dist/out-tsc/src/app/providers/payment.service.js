import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var PaymentService = /** @class */ (function () {
    function PaymentService(httpClient) {
        this.httpClient = httpClient;
        this.API_URL = 'http://localhost:8000/api/v1';
    }
    PaymentService.prototype.getPlans = function () {
        return this.httpClient.get(this.API_URL + "/plans");
    };
    PaymentService.prototype.getPayments = function () {
        return this.httpClient.get(this.API_URL + "/payments");
    };
    PaymentService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PaymentService);
    return PaymentService;
}());
export { PaymentService };
//# sourceMappingURL=payment.service.js.map