import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../providers/api.service';
import {environment} from 'src/environments/environment';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Circle, Fill, Stroke, Style} from 'ol/style.js';
import {GeoJSON} from 'ol/format.js';
import {getCenter} from 'ol/extent.js';

declare const ol;

@Component({
    selector: 'app-field-details',
    templateUrl: './field-details.component.html',
    styleUrls: ['./field-details.component.css']
})
export class FieldDetailsComponent implements OnInit {

    @Input() id: string;

    private region: any;
    private map: any;
    private source: any;
    private vector: any;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.loadRegion(this.id);
    }

    public loadRegion(id) {
        this.apiService.get(environment.endpoints.regions_details, {'pk': id}, {}).subscribe(
            response => {
                this.region = response;
                this.addRegionMap(this.region);
            },
            error => {
                console.log('Error:', error);
            }
        );
    }

    addRegionMap(region) {
        const format = new GeoJSON();

        const feature = format.readFeature(region.geometry, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });

        this.source = new VectorSource({});
        this.source.addFeature(feature);

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
                this.vector,
            ],
            target: 'map-' + this.id,
            view: new View({
                center: getCenter(feature.getGeometry().getExtent()),
                zoom: 13,
            })
        });

        let layerSwitcher = new ol.control.LayerSwitcher();

        this.map.addControl(layerSwitcher);
    }

    public deleteRegion(id) {
        window.alert(id);
    }

}
