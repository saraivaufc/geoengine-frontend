import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../providers/api.service';
import {timer} from 'rxjs';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-region-list',
    templateUrl: './region-list.component.html',
    styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

    private regions: Array<object> = [];
    private loading: boolean;

    constructor(
        private apiService: ApiService
    ) {
    }

    async ngOnInit() {
        this.getRegions();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public getRegions() {
        this.loading = true;
        this.apiService.get(environment.endpoints.regions, {}).subscribe(
            response => {
                console.log(response.results);
                this.regions = response.results.features;
                this.loading = false;
            },
            error => {
                console.log(error);
            }
        );
    }

}
