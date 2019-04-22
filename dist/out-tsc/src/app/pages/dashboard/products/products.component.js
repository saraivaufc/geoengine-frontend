import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../providers/api.service';
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(route, apiService) {
        var _this = this;
        this.route = route;
        this.apiService = apiService;
        route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    }
    ProductsComponent.prototype.ngOnInit = function () {
    };
    ProductsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, ApiService])
    ], ProductsComponent);
    return ProductsComponent;
}());
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map