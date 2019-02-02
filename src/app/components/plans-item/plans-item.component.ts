import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-plans-item',
  templateUrl: './plans-item.component.html',
  styleUrls: ['./plans-item.component.css']
})
export class PlansItemComponent implements OnInit {
	@HostBinding('attr.class') cssClass = 'card mb-4 shadow-sm';
	@Input()​ title: string;
	@Input()​ prefix: string;
	@Input()​ pricing: string;
	@Input()​ period: string;
	@Input()​ features: Array<string>;

	constructor() { }

	ngOnInit() {
	}

}
