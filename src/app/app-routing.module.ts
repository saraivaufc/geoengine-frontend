import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TermsComponent} from './components/terms/terms.component';

import {SignUpComponent} from './components/sign-up/sign-up.component';
import {RegionListComponent} from './components/regions/region-list/region-list.component';
import {RegionFormComponent} from './components/regions/region-form/region-form.component';
import {RegionViewComponent} from './components/regions/region-view/region-view.component';

const routes: Routes = [
    {path​: ''​, component​: HomeComponent},
    {path​: 'privacy'​, component​: PrivacyComponent},
    {path​: 'terms'​, component​: TermsComponent},
    {path: 'about'​, component​: AboutComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path​: 'regions'​, component​: RegionListComponent},
    {path: 'regions/:id', component: RegionViewComponent},
    {path: 'add-region', component: RegionFormComponent},
    {path: 'edit-region/:id', component: RegionFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
