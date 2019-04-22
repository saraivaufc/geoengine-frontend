import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
var CarouselItemComponent = /** @class */ (function () {
    function CarouselItemComponent() {
        this.cssClass = "carousel-item";
        this.active = false;
    }
    CarouselItemComponent.prototype.ngOnInit = function () {
        if (this.active) {
            this.cssClass = this.cssClass + " active";
        }
    };
    tslib_1.__decorate([
        HostBinding('attr.class'),
        tslib_1.__metadata("design:type", Object)
    ], CarouselItemComponent.prototype, "cssClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CarouselItemComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CarouselItemComponent.prototype, "description", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CarouselItemComponent.prototype, "image", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CarouselItemComponent.prototype, "active", void 0);
    CarouselItemComponent = tslib_1.__decorate([
        Component({
            selector: 'app-carousel-item',
            templateUrl: './carousel-item.component.html',
            styleUrls: ['./carousel-item.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CarouselItemComponent);
    return CarouselItemComponent;
}());
export { CarouselItemComponent };
//# sourceMappingURL=carousel-item.component.js.map