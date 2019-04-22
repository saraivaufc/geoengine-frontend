import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var ProductsItemComponent = /** @class */ (function () {
    function ProductsItemComponent() {
    }
    ProductsItemComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ProductsItemComponent.prototype, "product", void 0);
    ProductsItemComponent = tslib_1.__decorate([
        Component({
            selector: 'app-products-item',
            templateUrl: './products-item.component.html',
            styleUrls: ['./products-item.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ProductsItemComponent);
    return ProductsItemComponent;
}());
export { ProductsItemComponent };
//# sourceMappingURL=products-item.component.js.map