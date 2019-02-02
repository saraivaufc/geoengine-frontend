import{Component, OnInit, Input}from '@angular/core';
import {RegionService}from '../../providers/region.service';
import {timer}from 'rxjs';

@Component({
selector: 'app-products-list',
templateUrl: './products-list.component.html',
styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

	@Input() code: string;
	private products: any = new Map();
	private tags: any = [
	{label: "Natural Color", value: "NATURAL_COLOR", checked: true},
	{label: "False Color", value: "FALSE_COLOR", checked: true},
	{label: "NDVI", value: "NDVI", checked: true},
	{label: "NDWI", value: "NDWI", checked: true},
	{label: "DEM", value: "DEM", checked: true},
	]

	private loading: boolean;

	constructor(private regionService: RegionService) {}

	ngOnInit() {
		this.loading = true;
		timer(0, 15000).subscribe( t => {
	        this.getProductsByRegion(this.code);
	    });
	}

	public getProductsByRegion(code){
		let tagsSelected = this.tags.filter(tag => tag.checked);
		this.regionService.getProductsByRegionAndTags(code, tagsSelected).subscribe(
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

	public groupProducts(products){
		var products_grouped: any = new Map();
		products.forEach(function(product){
			if(products_grouped.get(product.image.code) == undefined){
				products_grouped.set(product.image.code, [])
			}
			products_grouped.get(product.image.code).push(product)
		})
		return products_grouped
	}

	public getSelectedTags(){
		let tagsSelected = this.tags.filter(tag => tag.checked == true);
		return tagsSelected;
	}

	public updateTags(event){
		let tagClicked = this.tags.filter(tag => tag.value === event.target.name)[0];
		let indexTagOnList = this.tags.indexOf(tagClicked);
		tagClicked.checked = event.target.checked
		this.tags[indexTagOnList] = tagClicked;
		this.getProductsByRegion(this.code);
	}

}
