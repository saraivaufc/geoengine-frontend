import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TermsComponent} from './components/terms/terms.component';

import {SignUpComponent} from './components/sign-up/sign-up.component';
import {FieldListComponent} from './components/fields/field-list/field-list.component';
import {FieldFormComponent} from './components/fields/field-form/field-form.component';
import {FieldViewComponent} from './components/fields/field-view/field-view.component';

const routes: Routes = [
    {path​: ''​, component​: HomeComponent},
    {path​: 'privacy'​, component​: PrivacyComponent},
    {path​: 'terms'​, component​: TermsComponent},
    {path: 'about'​, component​: AboutComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path​: 'fields'​, component​: FieldListComponent},
    {path: 'fields/view/:id', component: FieldViewComponent},
    {path: 'fields/add', component: FieldFormComponent},
    {path: 'fields/edit/:id', component: FieldFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
