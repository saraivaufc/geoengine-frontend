import { Component, OnInit, Input, HostBinding} from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {
	@HostBinding('attr.class') cssClass = "carousel-item";
	@Input() label: string;
	@Input() description: string;
	@Input() image: string;
	@Input() active: boolean = false;

	constructor() {}

	ngOnInit() {
		if(this.active){
			this.cssClass = this.cssClass + " active";
		}
	}
}
