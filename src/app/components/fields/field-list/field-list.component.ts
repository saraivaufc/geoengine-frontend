import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../providers/api.service';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-field-list',
    templateUrl: './field-list.component.html',
    styleUrls: ['./field-list.component.css']
})
export class FieldListComponent implements OnInit {

    fields: Array<object> = [];
    loading: boolean;

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
        this.apiService.get(environment.endpoints.fields, {}).subscribe(
            response => {
                console.log(response.results);
                this.fields = response.results.features;
                this.loading = false;
            },
            error => {
                console.log(error);
            }
        );
    }

}
