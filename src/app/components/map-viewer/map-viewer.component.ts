import {AfterViewInit, Component, Input} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';

declare var ol: any;

@Component({
    selector: 'app-map-viewer',
    templateUrl: './map-viewer.component.html',
    styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements AfterViewInit {
    @Input() id;
    @Input() geometry;
    @Input() zoom;

    map: any;
    editLayer: any;
    source: any;

    constructor() {
    }

    ngAfterViewInit() {
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
            target: 'map-' + this.id,
            view: new View({
                center: [-5601471, -1525532],
                zoom: 4,
            }),
            controls: ol.control.defaults({
                attribution: false,
                zoom: false,
            }),
        });

        // Create a LayerSwitcher instance and add it to the map
        const layerSwitcher = new ol.control.LayerSwitcher();

        this.map.addControl(layerSwitcher);

        const format = new ol.format.GeoJSON();
        const feature = format.readFeature(this.geometry, {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});

        const center = this.getCenterOfExtent(feature.getGeometry().getExtent());

        this.source.addFeatures([feature]);

        this.map.getView().setCenter(center);
        this.map.getView().setZoom(this.zoom);

    }

    getCenterOfExtent(Extent) {
        const x = Extent[0] + (Extent[2] - Extent[0]) / 2;
        const y = Extent[1] + (Extent[3] - Extent[1]) / 2;
        return [x, y];
    }

}
