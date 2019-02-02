import { Component, OnInit, Input} from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-region-item',
  templateUrl: './region-item.component.html',
  styleUrls: ['./region-item.component.css']
})
export class RegionItemComponent implements OnInit {

	​@Input()​ region: any;

	constructor() { }

	ngOnInit() {

	}
}
