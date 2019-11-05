import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../providers/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private regionsCount: Number = null;

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit() {
        this.loadRegionsCount();
    }

    public loadRegionsCount() {
        this.apiService.get(environment.endpoints.fields, {}).subscribe(
            response => {
                console.log(response.results);
                this.regionsCount = response.count;
            },
            error => {
                console.log(error);
            }
        );
    }

}
