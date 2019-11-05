import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// translate
// https://github.com/ngx-translate/core
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


import {HomeComponent} from './components/home/home.component';

import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {MarketingComponent} from './components/marketing/marketing.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TermsComponent} from './components/terms/terms.component';
import {AboutComponent} from './components/about/about.component';
import {MarketingCardComponent} from './components/marketing-card/marketing-card.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';

import {FieldListComponent} from './components/fields/field-list/field-list.component';
import {FieldFormComponent} from './components/fields/field-form/field-form.component';
import {FieldDetailsComponent} from './components/fields/field-details/field-details.component';
import {FieldViewComponent} from './components/fields/field-view/field-view.component';

import {ProductsListComponent} from './components/fields/products-list/products-list.component';
import {ProductsItemComponent} from './components/fields/products-item/products-item.component';

import {MapComponent} from './components/map/map.component';
import {FieldTimeseriesComponent} from './components/fields/field-timeseries/field-timeseries.component';
import {FieldWeathForecastComponent} from './components/fields/field-weath-forecast/field-weath-forecast.component';
import {FieldMonitoringComponent} from './components/fields/field-monitoring/field-monitoring.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { MapViewerComponent } from './components/map-viewer/map-viewer.component';

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}


// translate
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,

        SafePipe,

        // pages
        HomeComponent,
        PrivacyComponent,
        AboutComponent,
        TermsComponent,

        // components
        HeaderComponent,
        FooterComponent,
        CarouselComponent,
        SidebarComponent,

        // components - fields

        FieldListComponent,
        FieldFormComponent,

        // components - home page

        MarketingComponent,
        MarketingCardComponent,

        BreadcrumbComponent,
        ProductsListComponent,
        ProductsItemComponent,
        SignUpComponent,

        FieldListComponent,
        FieldDetailsComponent,
        FieldFormComponent,
        FieldViewComponent,

        MapComponent,

        FieldTimeseriesComponent,

        FieldWeathForecastComponent,

        FieldMonitoringComponent,

        MapViewerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        // translate
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
