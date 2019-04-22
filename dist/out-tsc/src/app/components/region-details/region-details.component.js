import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { environment } from 'src/environments/environment';
var RegionDetailsComponent = /** @class */ (function () {
    function RegionDetailsComponent(apiService) {
        this.apiService = apiService;
    }
    RegionDetailsComponent.prototype.ngOnInit = function () {
        this.loadRegion(this.id);
    };
    RegionDetailsComponent.prototype.loadRegion = function (id) {
        var _this = this;
        this.apiService.get(environment.endpoints.regions_details, { "pk": id }, {}).subscribe(function (response) {
            _this.region = response;
            console.log("Region: ", _this.region);
            _this.addRegionMap();
        }, function (error) {
            console.log("Error:", error);
        });
    };
    RegionDetailsComponent.prototype.addRegionMap = function () {
        this.raster = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
            })
        });
        var format = new ol.format.GeoJSON();
        var features = format.readFeatures(this.region.geometry);
        console.log("Features: ", features);
        var features_reprojected = [];
        features.forEach(function (feature) {
            var geometry_reprojected = feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
            feature.setGeometry(geometry_reprojected);
            features_reprojected.push(feature);
        });
        // {
        // 	features:format.readFeatures(this.region.geometry)
        // }
        this.source = new ol.source.Vector({ features: features_reprojected });
        this.vector = new ol.layer.Vector({
            source: this.source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        this.map = new ol.Map({
            layers: [this.raster, this.vector],
            target: "map",
            view: new ol.View({
                center: ol.extent.getCenter(features_reprojected[0].getGeometry().getExtent()),
                zoom: 13,
            })
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], RegionDetailsComponent.prototype, "id", void 0);
    RegionDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-region-details',
            templateUrl: './region-details.component.html',
            styleUrls: ['./region-details.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], RegionDetailsComponent);
    return RegionDetailsComponent;
}());
export { RegionDetailsComponent };
//# sourceMappingURL=region-details.component.js.map