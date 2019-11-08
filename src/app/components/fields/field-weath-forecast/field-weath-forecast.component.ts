import {Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'app-field-weath-forecast',
    templateUrl: './field-weath-forecast.component.html',
    styleUrls: ['./field-weath-forecast.component.css'],
})
export class FieldWeathForecastComponent implements OnInit {
    @Input() lat: any;
    @Input() lon: any;

    url: any;

    constructor() {
    }

    ngOnInit() {
    }

}
