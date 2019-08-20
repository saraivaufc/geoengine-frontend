import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../providers/api.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    private id: number;

    constructor(private route: ActivatedRoute, private apiService: ApiService) {
        route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {

    }
}
