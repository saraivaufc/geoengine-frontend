import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent() {
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], BreadcrumbComponent.prototype, "items", void 0);
    BreadcrumbComponent = tslib_1.__decorate([
        Component({
            selector: 'app-breadcrumb',
            templateUrl: './breadcrumb.component.html',
            styleUrls: ['./breadcrumb.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());
export { BreadcrumbComponent };
//# sourceMappingURL=breadcrumb.component.js.map