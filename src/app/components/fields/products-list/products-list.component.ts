import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../providers/api.service';
import {environment} from 'src/environments/environment';
import {timer} from 'rxjs';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    @Input() id: number;

    private products: any = new Map();
    private tags: Array<any> = [
        {label: 'Natural Color', value: 'NATURAL_COLOR', checked: false},
        {label: 'False Color', value: 'FALSE_COLOR', checked: false},
        {label: 'NDVI', value: 'NDVI', checked: true},
        {label: 'NDWI', value: 'NDWI', checked: false},
        {label: 'Surface Temperature', value: 'SURFACE_TEMPERATURE', checked: false}
    ];

    private loading: boolean;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.loading = true;
        this.getProductsByRegion(this.id);
        timer(0, 10000).subscribe(t => {
            this.getProductsByRegion(this.id);
        });
    }

    public getProductsByRegion(id) {
        const tags = this.tags.filter(tag => tag.checked).reduce((acc, tag) => acc + ',' + tag.value, '');

        this.apiService.get(environment.endpoints.products, {'field_pk': id}, {'tags': tags}).subscribe(
            response => {
                this.products = this.groupProducts(response.results.filter(product => product.image !== null));
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

        products.forEach(function (product) {
            if (groupedProducts[product.image.code] === undefined) {
                groupedProducts[product.image.code] = {};
            }
            groupedProducts[product.image.code][product.tag] = product;
            groupedProducts[product.image.code]['image'] = product['image'];
        });

        console.log(groupedProducts);

        const sorted = [];
        // tslint:disable-next-line:forin
        for (const key in groupedProducts) {
            if (sorted[groupedProducts[key]['date_acquired']] === undefined) {
                sorted[groupedProducts[key]['date_acquired']] = [];
            }
            sorted[groupedProducts[key]['date_acquired']].push(groupedProducts[key]);
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
