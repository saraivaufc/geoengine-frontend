import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'app-region-weath-forecast',
    templateUrl: './region-weath-forecast.component.html',
    styleUrls: ['./region-weath-forecast.component.css'],
})
export class RegionWeathForecastComponent implements OnInit {
    @Input()    lat: any;
    @Input() lon: any;

    private url: any;

    constructor() {
    }

    ngOnInit() {
    }

}
