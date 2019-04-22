import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
describe('PaymentService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PaymentService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=payment.service.spec.js.map