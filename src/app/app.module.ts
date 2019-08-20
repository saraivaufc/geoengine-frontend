import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// translate
// https://github.com/ngx-translate/core
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'; 

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


import {HomeComponent} from './pages/home/home.component';

import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {RegionListComponent} from './components/region-list/region-list.component';
import {RegionFormComponent} from './components/region-form/region-form.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {MarketingComponent} from './components/marketing/marketing.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {TermsComponent} from './pages/terms/terms.component';
import {AboutComponent} from './pages/about/about.component';
import {MarketingCardComponent} from './components/marketing-card/marketing-card.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsItemComponent} from './components/products-item/products-item.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {SignUpFormComponent} from './components/sign-up-form/sign-up-form.component';

import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {RegionsComponent} from './pages/dashboard/regions/regions.component';
import {ProductsComponent} from './pages/dashboard/products/products.component';
import {PageRegionFormComponent} from './pages/dashboard/page-region-form/page-region-form.component';
import {RegionDetailsComponent} from './components/region-details/region-details.component';
import {MapComponent} from './components/map/map.component';


// translate
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,

        // pages
        HomeComponent,
        PrivacyComponent,
        AboutComponent,
        TermsComponent,

        // pages - Dashboard
        DashboardComponent,
        RegionsComponent,
        ProductsComponent,

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
        PageRegionFormComponent,
        RegionDetailsComponent,
        MapComponent,

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
