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
import {SignUpFormComponent} from './components/sign-up-form/sign-up-form.component';

import {RegionListComponent} from './components/regions/region-list/region-list.component';
import {RegionFormComponent} from './components/regions/region-form/region-form.component';
import {RegionDetailsComponent} from './components/regions/region-details/region-details.component';
import {RegionViewComponent} from './components/regions/region-view/region-view.component';

import {ProductsListComponent} from './components/regions/products-list/products-list.component';
import {ProductsItemComponent} from './components/regions/products-item/products-item.component';

import {MapComponent} from './components/map/map.component';
import {RegionTimeseriesComponent} from './components/regions/region-timeseries/region-timeseries.component';
import {RegionWeathForecastComponent} from './components/regions/region-weath-forecast/region-weath-forecast.component';
import {RegionMonitoringComponent} from './components/regions/region-monitoring/region-monitoring.component';

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

        // components - regions

        RegionListComponent,
        RegionFormComponent,

        // components - home page

        MarketingComponent,
        MarketingCardComponent,

        BreadcrumbComponent,
        ProductsListComponent,
        ProductsItemComponent,
        SignUpComponent,
        SignUpFormComponent,

        RegionListComponent,
        RegionDetailsComponent,
        RegionFormComponent,
        RegionViewComponent,

        MapComponent,

        RegionTimeseriesComponent,

        RegionWeathForecastComponent,

        RegionMonitoringComponent,
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
