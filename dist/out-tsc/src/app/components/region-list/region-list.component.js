import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';
var RegionListComponent = /** @class */ (function () {
    function RegionListComponent(apiService) {
        this.apiService = apiService;
        this.regions = [];
    }
    RegionListComponent.prototype.ngOnInit = function () {
        var _this = this;
        timer(0, 15000).subscribe(function (t) {
            _this.getRegions();
        });
    };
    RegionListComponent.prototype.getRegions = function () {
        var _this = this;
        this.loading = true;
        var params = {};
        this.apiService.get(environment.endpoints.regions, {}, params).subscribe(function (response) {
            console.log(response.results);
            _this.regions = response.results.features;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    RegionListComponent.prototype.deleteRegion = function (code) {
        window.alert(code);
    };
    RegionListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-region-list',
            templateUrl: './region-list.component.html',
            styleUrls: ['./region-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], RegionListComponent);
    return RegionListComponent;
}());
export { RegionListComponent };
//# sourceMappingURL=region-list.component.js.map