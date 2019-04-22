import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';
var ProductsListComponent = /** @class */ (function () {
    function ProductsListComponent(apiService) {
        this.apiService = apiService;
        this.products = new Map();
        this.tags = [
            { label: "Natural Color", value: "NATURAL_COLOR", checked: true },
            { label: "False Color", value: "FALSE_COLOR", checked: true },
            { label: "NDVI", value: "NDVI", checked: true },
            { label: "NDWI", value: "NDWI", checked: true },
        ];
    }
    ProductsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        timer(0, 15000).subscribe(function (t) {
            _this.getProductsByRegion(_this.id);
        });
    };
    ProductsListComponent.prototype.getProductsByRegion = function (id) {
        var _this = this;
        var tagsSelected = this.tags.filter(function (tag) { return tag.checked; }).map(function (tag) { return "TAG=" + tag.value; });
        this.apiService.get(environment.endpoints.products, { "region_pk": id }, tagsSelected).subscribe(function (response) {
            console.log(response);
            _this.products = _this.groupProducts(response.results.filter(function (product) { return product.image !== null; }));
            console.log(_this.products);
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    ProductsListComponent.prototype.groupProducts = function (products) {
        var products_grouped = new Map();
        products.forEach(function (product) {
            if (products_grouped.get(product.image.code) == undefined) {
                products_grouped.set(product.image.code, []);
            }
            products_grouped.get(product.image.code).push(product);
        });
        return products_grouped;
    };
    ProductsListComponent.prototype.getSelectedTags = function () {
        var tagsSelected = this.tags.filter(function (tag) { return tag.checked == true; });
        return tagsSelected;
    };
    ProductsListComponent.prototype.updateTags = function (event) {
        var tagClicked = this.tags.filter(function (tag) { return tag.value === event.target.name; })[0];
        var indexTagOnList = this.tags.indexOf(tagClicked);
        tagClicked.checked = event.target.checked;
        this.tags[indexTagOnList] = tagClicked;
        this.getProductsByRegion(this.id);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ProductsListComponent.prototype, "id", void 0);
    ProductsListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-products-list',
            templateUrl: './products-list.component.html',
            styleUrls: ['./products-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], ProductsListComponent);
    return ProductsListComponent;
}());
export { ProductsListComponent };
//# sourceMappingURL=products-list.component.js.map