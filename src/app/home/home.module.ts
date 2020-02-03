import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home.routing.module';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {AboutComponent} from './pages/about/about.component';
import {TermsComponent} from './pages/terms/terms.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {CoreModule} from '../core/core.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';

// translate
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent,
        PrivacyComponent,
        AboutComponent,
        TermsComponent,
        SignUpComponent,
        ContactUsComponent
    ],
    imports: [
        CommonModule,
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

        HomeRoutingModule,
    ]
})
export class HomeModule {
}
