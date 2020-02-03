import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldListComponent} from './components/fields/field-list/field-list.component';
import {FieldFormComponent} from './components/fields/field-form/field-form.component';
import {ProductsListComponent} from './components/fields/products-list/products-list.component';
import {ProductsItemComponent} from './components/fields/products-item/products-item.component';
import {FieldDetailsComponent} from './components/fields/field-details/field-details.component';
import {FieldViewComponent} from './components/fields/field-view/field-view.component';
import {MapComponent} from './components/map/map.component';
import {FieldTimeseriesComponent} from './components/fields/field-timeseries/field-timeseries.component';
import {FieldWeathForecastComponent} from './components/fields/field-weath-forecast/field-weath-forecast.component';
import {FieldMonitoringComponent} from './components/fields/field-monitoring/field-monitoring.component';
import {MapViewerComponent} from './components/map-viewer/map-viewer.component';
import {AuthComponent} from '../home/pages/auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MonitorComponent} from './monitor.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SafePipe} from '../core/pipes/safe.pipe';
import {MonitorRoutingModule} from './monitor.routing.module';
import {CoreModule} from '../core/core.module';

// translate
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        MonitorComponent,
        SafePipe,

        // components - fields

        FieldListComponent,
        FieldFormComponent,
        ProductsListComponent,
        ProductsItemComponent,

        FieldListComponent,
        FieldDetailsComponent,
        FieldFormComponent,
        FieldViewComponent,

        MapComponent,

        FieldTimeseriesComponent,

        FieldWeathForecastComponent,

        FieldMonitoringComponent,

        MapViewerComponent,

        AuthComponent,

        MonitorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        CoreModule,

        // translate
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MonitorRoutingModule,
    ],
    exports: [
        MonitorComponent,
    ],
    bootstrap: [MonitorComponent]
})
export class MonitorModule {
}
