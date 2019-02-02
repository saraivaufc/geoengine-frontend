import { BrowserModule }     from '@angular/platform-browser';
import { NgModule }          from '@angular/core';
import  { FormsModule }      from  '@angular/forms';

// translate
// https://github.com/ngx-translate/core
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';


import { HomeComponent }     from './pages/home/home.component';

import { FooterComponent }   from './components/footer/footer.component';
import { HeaderComponent }   from './components/header/header.component';
import { RegionListComponent } from './components/region-list/region-list.component';
import { RegionItemComponent } from './components/region-item/region-item.component';
import { RegionCreateComponent } from './components/region-create/region-create.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { MarketingCardComponent } from './components/marketing-card/marketing-card.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';
import { PlansItemComponent } from './components/plans-item/plans-item.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegionsComponent } from './pages/dashboard/regions/regions.component';
import { PaymentsComponent } from './pages/dashboard/payments/payments.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { RegionFormComponent } from './pages/dashboard/region-form/region-form.component';
import { ProductsComponent } from './pages/dashboard/products/products.component';


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
	PricingComponent,
	TermsComponent,

	// pages - Dashboard
	DashboardComponent,
	DashboardSidebarComponent,
	PaymentsComponent,
	PaymentsListComponent,
	RegionsComponent,
	ProductsComponent,

	// components
	HeaderComponent,
	FooterComponent,
	CarouselComponent,

	// components - regions

	RegionListComponent,
	RegionItemComponent,
	RegionCreateComponent,

	// components - home page

	MarketingComponent,
	MarketingCardComponent,    
	CarouselItemComponent,
		
	PlansItemComponent,
	BreadcrumbComponent,	
	ProductsListComponent,
	ProductsItemComponent,
	PlansListComponent,
	SignUpComponent,
	SignUpFormComponent,
	RegionFormComponent,
	

  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	FormsModule,
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
export class AppModule { }
