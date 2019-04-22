import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Tile, Vector as VectorLayer} from 'ol/layer.js';
import {Vector as VectorSource, XYZ} from 'ol/source.js';
import {Circle, Fill, Stroke, Style} from 'ol/style.js';
import {GeoJSON, WKT} from 'ol/format.js';
import {Draw, Modify} from 'ol/interaction.js';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
    currentInput;

    @Input() inputField;
    @Output() outputField = new EventEmitter();

    private types: Array<object> = [
        {label: 'Point', value: 'Point'},
        {label: 'LineString', value: 'LineString'},
        {label: 'Polygon', value: 'Polygon'},
        {label: 'Circle', value: 'Circle'}
    ];
    private typeSelect = 'Polygon';
    private map: any;
    private raster: any;
    private source: any;
    private vector: any;
    private draw: any;
    private snap: any;

    constructor() {
    }

    ngOnInit() {
        this.raster = new Tile({
            source: new XYZ({
                url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
            })
        });

        this.source = new VectorSource();

        this.vector = new VectorLayer({
            source: this.source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });


        let map_target = 'map';
        let map_center = [-5601471, -1525532];
        let map_zoom = 4;

        this.map = new Map({
            layers: [this.raster, this.vector],
            target: map_target,
            view: new View({
                center: map_center,
                zoom: map_zoom,
            })
        });

        var modify = new Modify({source: this.source});

        this.map.addInteraction(modify);

        this.addInteractions();

        this.source.on('addfeature', (event) => {
            let feature = event.feature;

            // geometry.transform("EPSG:3857", "EPSG:4326");

            // if(geometry.getType() === "Circle"){
            // 	let center = geometry.getCenter()
            // 	let radius = geometry.getRadius()
            // 	let edgeCoordinate = [center[0] + radius, center[1]];
            // 	let wgs84Sphere = new ol.Sphere(6378137);
            // 	let groundRadius = wgs84Sphere.haversineDistance(
            // 		ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326'),
            // 		ol.proj.transform(edgeCoordinate, 'EPSG:3857', 'EPSG:4326')
            // 	);
            // 	geometry = ol.geom.Polygon.circular(new ol.Sphere(6378137), geometry.getCenter(), groundRadius)
            // }

            let format = new WKT();

            let wkt = format.writeGeometry(feature.getGeometry());

            let geometry = format.readGeometry(wkt);

            this.addGeometryInTextArea(geometry);

            // delete features
            let features = this.source.getFeatures();

            let featuresToRemove = [];

            if (features.length > 1) {
                featuresToRemove = features.slice(0, features.length - 1);
            } else {
                featuresToRemove = [];
            }

            featuresToRemove.forEach((feature) => {
                this.source.removeFeature(feature);
            });
        });
    }

    ngOnChanges() {
        try {
            if (this.inputField !== undefined && this.inputField) {
                const formatFrom = new GeoJSON();
                const formatTo = new WKT();

                const geometry = formatFrom.readGeometry(this.inputField);
                geometry.transform('EPSG:4326', 'EPSG:3857');
                const wkt = formatTo.writeGeometry(geometry);
                this.loadGeometry(wkt);
            }
        } catch (err) {
            console.log(err);
        }
    }

    loadGeometry(geometry) {
        if (geometry !== '') {
            let w = geometry.split(';');
            let wkt = null;
            if (w.length > 1) {
                wkt = w[1];
            } else {
                wkt = w[0];
            }

            console.log(wkt);

            let format = new WKT();
            let feature = format.readFeature(wkt, {
                dataProjection: 'EPSG:3857',
                featureProjection: 'EPSG:3857'
            });

            console.log(feature);

            let map_center = this.getCenterOfExtent(feature.getGeometry().getExtent());

            this.source.addFeatures([feature]);

            //ol.proj.transform(map_center, 'EPSG:4326', 'EPSG:3857')

            this.map.getView().setCenter(map_center);
            this.map.getView().setZoom(13);
        }
    }

    onUpdateType(event) {
        this.typeSelect = event.target.value;
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.snap);
        this.addInteractions();
    }

    addInteractions() {
        let value = this.typeSelect;
        if (value !== 'None') {
            let geometryFunction;
            if (value === 'Square') {
                value = 'Circle';
                geometryFunction = Draw.createRegularPolygon(4);
            } else if (value === 'Box') {
                value = 'Circle';
                geometryFunction = Draw.createBox();
            }

            this.draw = new Draw({
                source: this.source,
                type: value,
                geometryFunction: geometryFunction
            });

            this.map.addInteraction(this.draw);
        }
    }

    addGeometryInTextArea(geometry) {
        const format = new GeoJSON();
        const reprojectedGeometry = geometry.transform('EPSG:3857', 'EPSG:4326');
        const geojson = format.writeGeometry(reprojectedGeometry);
        this.outputField.emit(geojson);
    }

    getCenterOfExtent(Extent) {
        const x = Extent[0] + (Extent[2] - Extent[0]) / 2;
        const y = Extent[1] + (Extent[3] - Extent[1]) / 2;
        return [x, y];
    }

}
