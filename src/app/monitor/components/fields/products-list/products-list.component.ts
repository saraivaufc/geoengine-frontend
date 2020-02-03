import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../core/services/api.service';
import {environment} from 'src/environments/environment';
import {timer} from 'rxjs';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    @Input() id: number;

    products: any = new Map();
    tags: Array<any> = [
        {label: 'Natural Color', value: 'NATURAL_COLOR', checked: false},
        {label: 'False Color', value: 'FALSE_COLOR', checked: false},
        {label: 'NDVI', value: 'NDVI', checked: true},
        {label: 'NDWI', value: 'NDWI', checked: false},
        {label: 'Surface Temperature', value: 'SURFACE_TEMPERATURE', checked: false}
    ];

    loading: boolean;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.loading = true;
        this.getProductsByRegion(this.id);
        timer(0, 60000).subscribe(t => {
            this.getProductsByRegion(this.id);
        });
    }

    public getProductsByRegion(id) {
        const tags = this.tags.filter(tag => tag.checked).reduce((acc, tag) => acc + ',' + tag.value, '');

        this.apiService.get(environment.endpoints.products, {'field_pk': id}, {'tags': tags}).subscribe(
            response => {
                this.products = this.groupProducts(response.results);
                console.log(this.products);
                this.loading = false;
            },
            error => {
                console.log(error);
            }
        );
    }

    public groupProducts(products) {
        const groupedProducts = {};

        const dateToUTC = function(date) {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        };

        products.forEach(function (product) {
            if (groupedProducts[product.source_date] === undefined) {
                groupedProducts[product.source_date] = {};
            }
            groupedProducts[product.source_date][product.tag] = product;
            groupedProducts[product.source_date]['source_date'] = dateToUTC(new Date(product['source_date'])).toLocaleDateString();
            groupedProducts[product.source_date]['properties'] = product['properties'];
        });

        const sorted = [];
        // tslint:disable-next-line:forin
        for (const key in groupedProducts) {
            if (sorted[groupedProducts[key]['source_date']] === undefined) {
                sorted[groupedProducts[key]['source_date']] = [];
            }
            sorted[groupedProducts[key]['source_date']].push(groupedProducts[key]);
        }
        sorted.sort();

        return sorted;
    }

    public getSelectedTags() {
        return this.tags.filter(tag => tag.checked === true);
    }

    public updateTags(event) {
        const tagClicked = this.tags.filter(tag => tag.value === event.target.name)[0];
        const indexTagOnList = this.tags.indexOf(tagClicked);
        tagClicked.checked = event.target.checked;
        this.tags[indexTagOnList] = tagClicked;
        this.getProductsByRegion(this.id);
    }

}
