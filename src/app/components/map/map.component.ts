import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {GeoJSON, WKT} from 'ol/format.js';
import * as ole from '../ole/index.js';

declare var ol: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: [
        './map.component.css',
        '../ole/style/ole.css'
    ],
    encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnChanges {
    @Input() inputField;
    @Output() outputField = new EventEmitter();

    private map: any;
    private editLayer: any;
    private source: any;
    private vector: any;
    private draw: any;
    private snap: any;

    constructor() {
    }

    ngOnInit() {
        this.source = new ol.source.Vector();

        this.editLayer = new ol.layer.Vector({
            source: this.source,
        });

        this.map = new Map({
            layers: [
                new ol.layer.Tile({
                    title: 'OpenStreetMap',
                    type: 'base',
                    source: new ol.source.TileImage({
                        url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    })
                }),
                new ol.layer.Tile({
                    title: 'Google Satellite',
                    visible: false,
                    source: new ol.source.TileImage({
                        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                    })
                }),
                new ol.layer.Tile({
                    title: 'Google Hybrid',
                    visible: true,
                    source: new ol.source.TileImage({
                        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
                    })
                }),
                this.editLayer
            ],
            target: 'map',
            view: new View({
                center: [-5601471, -1525532],
                zoom: 4,
            })
        });

        // Create a LayerSwitcher instance and add it to the map
        const layerSwitcher = new ol.control.LayerSwitcher();

        this.map.addControl(layerSwitcher);

        const editor = new ole.Editor(this.map);

        const cad = new ole.control.CAD({
            source: this.editLayer.getSource()
        });

        const draw = new ole.control.Draw({
            source: this.editLayer.getSource()
        });

        const drawLine = new ole.control.Draw({
            type: 'LineString',
            source: this.editLayer.getSource()
        });

        const rotate = new ole.control.Rotate({
            source: this.editLayer.getSource()
        });

        const drawPoly = new ole.control.Draw({
            type: 'Polygon',
            source: this.editLayer.getSource()
        });

        const move = new ole.control.Move({
            type: 'Polygon',
            source: this.editLayer.getSource()
        });
        const fill = new ol.style.Fill({
            color: 'rgba(255,255,255,0.4)'
        });

        const stroke = new ol.style.Stroke({
            color: '#3399CC',
            width: 1.25
        });
        const style = new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 5
            }),
            fill: fill,
            stroke: stroke
        });

        const modify = new ole.control.Modify({
            source: this.editLayer.getSource(),
            style: style
        });

        const deleteC = new ole.control.Delete({
            source: this.editLayer.getSource()
        });

        const buffer = new ole.control.Buffer({
            source: this.editLayer.getSource()
        });

        const union = new ole.control.Union({
            source: this.editLayer.getSource()
        });

        const intersection = new ole.control.Intersection({
            source: this.editLayer.getSource()
        });

        const difference = new ole.control.Difference({
            source: this.editLayer.getSource()
        });

        editor.addControls([
            cad,
            draw,
            drawLine,
            drawPoly,
            modify,
            move,
            rotate,
            deleteC,
            buffer,
            union,
            intersection,
            difference
        ]);

        const ls = new ole.service.LocalStorage();

        editor.addService(ls);

        this.source.on('addfeature', (event) => {
            let feature = event.feature;

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

            const center = this.getCenterOfExtent(feature.getGeometry().getExtent());

            this.source.addFeatures([feature]);

            this.map.getView().setCenter(center);
            this.map.getView().setZoom(13);
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
