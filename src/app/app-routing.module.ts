import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }       from './pages/home/home.component';
import { AboutComponent }       from './pages/about/about.component';
import { PrivacyComponent }       from './pages/privacy/privacy.component';
import { TermsComponent }       from './pages/terms/terms.component';
import { PricingComponent }       from './pages/pricing/pricing.component';

import { SignUpComponent }       from './pages/sign-up/sign-up.component';

import { DashboardComponent }       from './pages/dashboard/dashboard.component';
import { RegionsComponent }       from './pages/dashboard/regions/regions.component';
import { RegionFormComponent }       from './pages/dashboard/region-form/region-form.component';

import { ProductsComponent }       from './pages/dashboard/products/products.component';
import { PaymentsComponent }       from './pages/dashboard/payments/payments.component';

const routes: Routes = [
	{path​ : ​ ​ ''​ , component​: HomeComponent},
	{path​ : ​ ​ 'privacy'​ , component​: PrivacyComponent},
	{path​ : ​ ​ 'terms'​ , component​: TermsComponent},
	{path​ : ​ ​ 'about'​ , component​: AboutComponent},
	{path​ : ​ ​ 'pricing'​ , component​: PricingComponent},
	{path :	  'sign-up', component: SignUpComponent},

	{path​ : ​ ​ 'dashboard'​ , component​: DashboardComponent},
	{path​ : ​ ​ 'dashboard/regions'​ , component​: RegionsComponent},
	{path :   'dashboard/regions/:code', component: ProductsComponent},
	{path :   'dashboard/add-region', component: RegionFormComponent},
	{path :   'dashboard/edit-region/:code', component: RegionFormComponent},
	{path​ : ​ ​ 'dashboard/payments'​ , component​: PaymentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
