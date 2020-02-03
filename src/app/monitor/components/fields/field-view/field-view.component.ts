import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../../core/services/api.service';
import {environment} from '../../../../../environments/environment';
import {GeoJSON} from 'ol/format';

@Component({
    selector: 'app-field-view',
    templateUrl: './field-view.component.html',
    styleUrls: ['./field-view.component.css']
})
export class FieldViewComponent implements OnInit {
    id: number;
    region: any;
    centroid: any = [0, 0];

    constructor(
        private route: ActivatedRoute,
        public apiService: ApiService,
        private router: Router
    ) {
        route.params.subscribe(params => {
            this.id = this.id ? this.id : Number(params['id']);
        });
    }

    ngOnInit() {
        this.apiService.get(environment.endpoints.regions_details, {'pk': this.id}, {}).subscribe(
            response => {
                this.region = response;

                const format = new GeoJSON();

                const feature = format.readFeature(response['geometry'], {dataProjection: 'EPSG:4326'});

                this.centroid = this.getCenterOfExtent(feature.getGeometry().getExtent());
            },
            error => {
                console.log('Error:', error);
            }
        );
    }

    getCenterOfExtent(Extent) {
        const X = Extent[0] + (Extent[2] - Extent[0]) / 2;
        const Y = Extent[1] + (Extent[3] - Extent[1]) / 2;
        return [X, Y];
    }


}
