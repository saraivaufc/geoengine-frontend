import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {delay, map, retryWhen, take} from 'rxjs/operators';
import {ApiService} from '../../../providers/api.service';
import Plotly from 'plotly.js-dist';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-field-timeseries',
    templateUrl: './field-timeseries.component.html',
    styleUrls: ['./field-timeseries.component.css']
})
export class FieldTimeseriesComponent implements OnInit {
    @Input() id: string;
    @Input() title: string;
    @Input() params: any;

    @Input() startDate = '2016-01-01';
    @Input() endDate = new Date().toISOString().slice(0, 10);

    private region: any;

    private vegetationIndexParams = {
        collection: 'MODIS/006/MOD13Q1',
        bands: ['NDVI'],
        reducers: ['median'],
    };
    private vegetationIndexSeries = null;

    private precipitationParams = {
        collection: 'UCSB-CHG/CHIRPS/DAILY',
        start_date: this.startDate,
        end_date: this.endDate,
        bands: ['precipitation'],
        reducers: ['median'],
    };
    private precipitationSeries = null;

    private chartLoaded = false;

    constructor(public apiService: ApiService,
                public translate: TranslateService) {
    }

    ngOnInit() {
        this.loadRegion();
    }

    public loadRegion() {
        this.apiService.get(environment.endpoints.regions_details, {'pk': this.id}, {}).subscribe(
            response => {
                this.region = response;
                this.vegetationIndexParams['geometry'] = this.region.geometry;
                this.precipitationParams['geometry'] = this.region.geometry;
                this.loadTimeSeries();
            }
        );
    }

    public loadTimeSeries() {
        this.vegetationIndexParams['start_date'] = this.startDate;
        this.vegetationIndexParams['end_date'] = this.endDate;

        this.precipitationParams['start_date'] = this.startDate;
        this.precipitationParams['end_date'] = this.endDate;


        this.apiService.post(environment.endpoints.tasks, {}, {
            product: 'TIME_SERIES',
            params: this.vegetationIndexParams
        }).subscribe(
            response2 => {
                this.apiService.get(environment.endpoints.tasks_details, {'task_id': response2.task_id}, {})
                    .pipe(
                        map((response: Response) => {
                            // @ts-ignore
                            if (response.status === 'COMPLETED') {
                                return response;
                            } else {
                                throw response;
                            }
                        })
                    )
                    .pipe(retryWhen(errors => errors.pipe(delay(3000), take(10))))
                    .subscribe(response3 => {
                        this.vegetationIndexSeries = response3['result'];
                        this.loadCharts();
                    });
            },
            error => {
                console.log(error);
            }
        );

        this.apiService.post(environment.endpoints.tasks, {}, {
            product: 'TIME_SERIES',
            params: this.precipitationParams
        }).subscribe(
            response2 => {
                this.apiService.get(environment.endpoints.tasks_details, {'task_id': response2.task_id}, {})
                    .pipe(
                        map((response: Response) => {
                            // @ts-ignore
                            if (response.status === 'COMPLETED') {
                                return response;
                            } else {
                                throw response;
                            }
                        })
                    )
                    .pipe(retryWhen(errors => errors.pipe(delay(3000), take(10))))
                    .subscribe(response3 => {
                        this.precipitationSeries = response3['result'];
                        this.loadCharts();
                    });
            },
            error => {
                console.log(error);
            }
        );
    }

    public loadCharts() {
        const data = [];

        console.log('************************************');

        if (this.vegetationIndexSeries !== null) {

            const dates = [];
            const ndvi = [];

            this.vegetationIndexSeries.forEach(function (row) {
                const date = new Date(row['DATE']);
                const median = row['NDVI'] / 10000;

                dates.push(date);
                ndvi.push(median);
            });

            const trace = {
                x: dates,
                y: ndvi,
                type: 'scatter',
                name: 'NDVI',
                marker: {
                    color: 'rgb(0, 255, 0)',
                    size: 12,
                    line: {
                        color: 'white',
                        width: 3
                    },
                }
            };

            data.push(trace);
        }

        if (this.precipitationSeries !== null) {

            const dates = [];
            const precipitation = [];

            this.precipitationSeries.forEach(function (row) {
                const date = new Date(row['DATE']);
                const median = row['precipitation'];

                dates.push(date);
                precipitation.push(median);
            });

            for (let i = 0; i < precipitation.length; i++) {
                if (i >= 1 && i < (precipitation.length - 1)) {
                    const before = precipitation[i - 1];
                    const after = precipitation[i + 1];
                    const center = precipitation[i];

                    precipitation[i] = Math.round(((before + center + after) / 3));
                }
            }

            const trace = {
                name: 'PRECIPITATION (mm)',
                x: dates,
                y: precipitation,
                type: 'lines',
                line: {
                    color: 'rgb(0, 0, 255)',
                    shape: 'linear'
                },
                connectgaps: true,
                yaxis: 'y2',
            };

            data.push(trace);
        }

        if (this.vegetationIndexSeries !== null && this.precipitationSeries !== null) {
            const layout = {
                autosize: true,
                margin: {
                    l: 10,
                    r: 10,
                    b: 10,
                    t: 10,
                    pad: 4
                },
                showlegend: true,
                legend: {'orientation': 'h'},
                yaxis: {
                    title: this.translate.get('Vegetation Index (NDVI)')['value'],
                    automargin: true,
                    titlefont: {color: 'rgb(0, 0, 0)'},
                    tickfont: {color: 'rgb(0, 255, 0)'},
                },
                yaxis2: {
                    title: this.translate.get('Precipitation (mm/day)')['value'],
                    automargin: true,
                    titlefont: {color: 'rgb(0, 0, 0)'},
                    tickfont: {color: 'rgb(0, 0, 255)'},
                    overlaying: 'y',
                    side: 'right'
                }
            };

            Plotly.newPlot('chart', data, layout);

            this.chartLoaded = true;
        }
    }

}
