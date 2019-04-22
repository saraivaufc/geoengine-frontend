import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var MarketingCardComponent = /** @class */ (function () {
    function MarketingCardComponent() {
    }
    MarketingCardComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MarketingCardComponent.prototype, "image", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MarketingCardComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MarketingCardComponent.prototype, "description", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MarketingCardComponent.prototype, "link", void 0);
    MarketingCardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-marketing-card',
            templateUrl: './marketing-card.component.html',
            styleUrls: ['./marketing-card.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MarketingCardComponent);
    return MarketingCardComponent;
}());
export { MarketingCardComponent };
//# sourceMappingURL=marketing-card.component.js.map