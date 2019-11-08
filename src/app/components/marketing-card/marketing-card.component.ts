import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-marketing-card',
	templateUrl: './marketing-card.component.html',
	styleUrls: ['./marketing-card.component.css']
})
export class MarketingCardComponent implements OnInit {
	@Input()​
	image: string;

	@Input()​
	title: string;
	@Input()​
	description: string;
	@Input()​
	link: string;

	constructor() {
	}

	ngOnInit() {
	}

}
