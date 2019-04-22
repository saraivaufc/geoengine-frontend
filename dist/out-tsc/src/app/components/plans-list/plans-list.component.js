import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../providers/api.service';
var PlansListComponent = /** @class */ (function () {
    function PlansListComponent(apiService) {
        this.apiService = apiService;
        this.plans = [];
    }
    PlansListComponent.prototype.ngOnInit = function () {
        this.getPlans();
    };
    PlansListComponent.prototype.getPlans = function () {
        var _this = this;
        this.loading = true;
        this.apiService.get(environment.endpoints.plans, {}, {}).subscribe(function (response) {
            _this.plans = response.results;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    PlansListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-plans-list',
            templateUrl: './plans-list.component.html',
            styleUrls: ['./plans-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], PlansListComponent);
    return PlansListComponent;
}());
export { PlansListComponent };
//# sourceMappingURL=plans-list.component.js.map