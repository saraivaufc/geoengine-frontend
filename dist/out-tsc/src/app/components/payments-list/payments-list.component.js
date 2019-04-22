import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PaymentService } from '../../providers/payment.service';
var PaymentsListComponent = /** @class */ (function () {
    function PaymentsListComponent(paymentService) {
        this.paymentService = paymentService;
        this.payments = [];
    }
    PaymentsListComponent.prototype.ngOnInit = function () {
        this.getPayments();
    };
    PaymentsListComponent.prototype.getPayments = function () {
        var _this = this;
        this.loading = true;
        this.paymentService.getPayments().subscribe(function (data) {
            console.log(data);
            try {
                _this.payments = data.results;
                _this.loading = false;
            }
            catch (e) {
                console.log(e);
            }
        });
    };
    PaymentsListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-payments-list',
            templateUrl: './payments-list.component.html',
            styleUrls: ['./payments-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [PaymentService])
    ], PaymentsListComponent);
    return PaymentsListComponent;
}());
export { PaymentsListComponent };
//# sourceMappingURL=payments-list.component.js.map