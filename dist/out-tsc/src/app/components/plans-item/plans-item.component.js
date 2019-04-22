import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
var PlansItemComponent = /** @class */ (function () {
    function PlansItemComponent() {
        this.cssClass = 'card mb-4 shadow-sm';
    }
    PlansItemComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        HostBinding('attr.class'),
        tslib_1.__metadata("design:type", Object)
    ], PlansItemComponent.prototype, "cssClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], PlansItemComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], PlansItemComponent.prototype, "prefix", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], PlansItemComponent.prototype, "pricing", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], PlansItemComponent.prototype, "period", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], PlansItemComponent.prototype, "features", void 0);
    PlansItemComponent = tslib_1.__decorate([
        Component({
            selector: 'app-plans-item',
            templateUrl: './plans-item.component.html',
            styleUrls: ['./plans-item.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PlansItemComponent);
    return PlansItemComponent;
}());
export { PlansItemComponent };
//# sourceMappingURL=plans-item.component.js.map