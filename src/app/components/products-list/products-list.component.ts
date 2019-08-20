import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../providers/api.service';
import {timer} from 'rxjs';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    @Input() id: number;
    private products: any = new Map();
    private tags: Array<any> = [
        {label: 'Natural Color', value: 'NATURAL_COLOR', checked: true},
        {label: 'False Color', value: 'FALSE_COLOR', checked: true},
        {label: 'NDVI', value: 'NDVI', checked: true},
        {label: 'NDWI', value: 'NDWI', checked: true},
    ];

    private loading: boolean;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.loading = true;
        timer(0, 15000).subscribe(t => {
            this.getProductsByRegion(this.id);
        });
    }

    public getProductsByRegion(id) {
        const tags = this.tags.filter(tag => tag.checked).reduce((acc, tag) => acc + ',' + tag.value, '');

        this.apiService.get(environment.endpoints.products, {'region_pk': id}, {'tags': tags}).subscribe(
            response => {
                const groupedProducts: any = this.groupProducts(response.results.filter(product => product.image !== null));
                this.products = groupedProducts;
                console.log(this.products);
                this.loading = false;
            },
            error => {
                console.log(error);
            }
        );
    }

    public groupProducts(products) {
        const groupedProducts: any = new Map();
        products.forEach(function (product) {
            if (groupedProducts.get(product.image.code) === undefined) {
                groupedProducts.set(product.image.code, []);
            }
            groupedProducts.get(product.image.code).push(product);
        });
        return groupedProducts;
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
