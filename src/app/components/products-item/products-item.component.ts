import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {
	@Input() product: any;
	
	constructor() { }

	ngOnInit() {
	}

}
