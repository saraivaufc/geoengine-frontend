import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../providers/api.service';
var RegionFormComponent = /** @class */ (function () {
    function RegionFormComponent(route, apiService, router) {
        var _this = this;
        this.route = route;
        this.apiService = apiService;
        this.router = router;
        this.form = new FormGroup({
            crop_type: new FormControl("", [Validators.required]),
            planting_date: new FormControl("", [Validators.required]),
            harvest_date: new FormControl("", [Validators.required]),
            geometry: new FormControl("", [Validators.required]),
        });
        route.params.subscribe(function (params) {
            _this.id = params['id'];
            if (_this.id !== undefined) {
                _this.loadRegion(_this.id);
            }
        });
    }
    RegionFormComponent.prototype.ngOnInit = function () {
    };
    RegionFormComponent.prototype.loadRegion = function (id) {
        var _this = this;
        this.apiService.get(environment.endpoints.regions_details, { "pk": id }, {}).subscribe(function (response) {
            _this.form.controls['crop_type'].patchValue(response.properties.crop_type);
            _this.form.controls['planting_date'].patchValue(response.properties.planting_date);
            _this.form.controls['harvest_date'].patchValue(response.properties.harvest_date);
            _this.form.controls['geometry'].patchValue();
            _this.geometry =
            ;
        }, function (error) {
            console.log(error);
        });
    };
    RegionFormComponent.prototype.reciverGeometry = function (input) {
        this.form.controls['geometry'].patchValue(input.geometry);
    };
    RegionFormComponent.prototype.onSubmit = function () {
        var formObj = this.form.getRawValue();
        var region = JSON.stringify(formObj);
        this.apiService.post(environment.endpoints.regions, {}, region).subscribe(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
    };
    RegionFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-region-form',
            templateUrl: './region-form.component.html',
            styleUrls: ['./region-form.component.css'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            ApiService,
            Router])
    ], RegionFormComponent);
    return RegionFormComponent;
}());
export { RegionFormComponent };
//# sourceMappingURL=region-form.component.js.map