import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var MapComponent = /** @class */ (function () {
    function MapComponent() {
        this.outputField = new EventEmitter();
        this.types = [
            { label: "Point", value: "Point" },
            { label: "LineString", value: "LineString" },
            { label: "Polygon", value: "Polygon" },
            { label: "Circle", value: "Circle" }
        ];
        this.typeSelect = "Polygon";
    }
    Object.defineProperty(MapComponent.prototype, "inputField", {
        set: function (input) {
            if (input !== undefined) {
                console.log(input.value);
                this.loadGeometry(input.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.raster = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
            })
        });
        this.source = new ol.source.Vector();
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
        var map_target = "map";
        var map_center = [-5601471, -1525532];
        var map_zoom = 4;
        this.map = new ol.Map({
            layers: [this.raster, this.vector],
            target: map_target,
            view: new ol.View({
                center: map_center,
                zoom: map_zoom,
            })
        });
        var modify = new ol.interaction.Modify({ source: this.source });
        this.map.addInteraction(modify);
        this.addInteractions();
        this.source.on('addfeature', function (event) {
            var feature = event.feature;
            var geometry = feature.getGeometry();
            console.log(geometry);
            var format = new ol.format.WKT();
            geometry.transform("EPSG:3857", "EPSG:4326");
            if (geometry.getType() === "Circle") {
                var center = geometry.getCenter();
                var radius = geometry.getRadius();
                var edgeCoordinate = [center[0] + radius, center[1]];
                var wgs84Sphere = new ol.Sphere(6378137);
                var groundRadius = wgs84Sphere.haversineDistance(ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326'), ol.proj.transform(edgeCoordinate, 'EPSG:3857', 'EPSG:4326'));
                console.log(groundRadius);
                geometry = ol.geom.Polygon.circular(new ol.Sphere(6378137), geometry.getCenter(), groundRadius);
            }
            var wkt = format.writeGeometry(geometry);
            geometry.transform("EPSG:4326", "EPSG:3857");
            _this.inputField = wkt;
            var features = _this.source.getFeatures();
            var featuresToRemove = features.slice(0, features.length - 1);
            featuresToRemove.forEach(function (feature) {
                _this.source.removeFeature(feature);
            });
        });
    };
    MapComponent.prototype.loadGeometry = function (geometry) {
        var feature = this.getFeature(geometry);
        var map_target = "map";
        var map_center = this.getCenterOfExtent(feature.getGeometry().getExtent());
        var map_zoom = 13;
        this.source.addFeatures([feature]);
        this.map = new ol.Map({
            layers: [this.raster, this.vector],
            target: map_target,
            view: new ol.View({
                center: map_center,
                zoom: map_zoom,
            })
        });
    };
    MapComponent.prototype.onUpdateType = function (event) {
        this.typeSelect = event.target.value;
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.snap);
        this.addInteractions();
    };
    MapComponent.prototype.addInteractions = function () {
        var value = this.typeSelect;
        if (value !== 'None') {
            var geometryFunction;
            if (value === 'Square') {
                value = 'Circle';
                geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
            }
            else if (value === 'Box') {
                value = 'Circle';
                geometryFunction = ol.interaction.Draw.createBox();
            }
            this.draw = new ol.interaction.Draw({
                source: this.source,
                type: value,
                geometryFunction: geometryFunction
            });
            this.map.addInteraction(this.draw);
        }
    };
    MapComponent.prototype.addGeometryInTextArea = function (feature) {
        var format = new ol.format.WKT();
        var geometry_reprojected = feature.getGeometry().transform("EPSG:3857", "EPSG:4326");
        var wkt = format.writeGeometry(geometry_reprojected);
        this.outputField.emit({ "geometry": wkt });
    };
    MapComponent.prototype.getFeature = function (geometryText) {
        if (geometryText.value !== '') {
            var wkt = geometryText.value.split(";")[1];
            var format = new ol.format.WKT();
            var feature = format.readFeature(wkt, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            return feature;
        }
        else {
            return null;
        }
    };
    MapComponent.prototype.getCenterOfExtent = function (Extent) {
        var X = Extent[0] + (Extent[2] - Extent[0]) / 2;
        var Y = Extent[1] + (Extent[3] - Extent[1]) / 2;
        return [X, Y];
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], MapComponent.prototype, "inputField", null);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], MapComponent.prototype, "outputField", void 0);
    MapComponent = tslib_1.__decorate([
        Component({
            selector: 'app-map',
            templateUrl: './map.component.html',
            styleUrls: ['./map.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MapComponent);
    return MapComponent;
}());
export { MapComponent };
//# sourceMappingURL=map.component.js.map