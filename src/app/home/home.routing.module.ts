import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AboutComponent} from '../home/pages/about/about.component';
import {PrivacyComponent} from '../home/pages/privacy/privacy.component';
import {TermsComponent} from '../home/pages/terms/terms.component';
import {SignUpComponent} from '../home/pages/sign-up/sign-up.component';
import {AuthComponent} from './pages/auth/auth.component';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import {AuthGuardService} from '../core/services/auth-guard.service';

const routes: Routes = [
    {path​: ''​, component​: HomeComponent},
    {path​: 'dashboard'​, component​: DashboardComponent, canActivate: [AuthGuardService]},
    {path​: 'privacy'​, component​: PrivacyComponent},
    {path​: 'terms'​, component​: TermsComponent},
    {path: 'about'​, component​: AboutComponent},
    {path: 'auth'​, component​: AuthComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'contact-us', component: ContactUsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
