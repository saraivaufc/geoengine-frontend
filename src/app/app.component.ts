import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router/src/utils/preactivation';

declare var ol: any;
declare var jsts: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'site';
    lang = 'pt-br';

    constructor(private translate: TranslateService, private router: Router) {
        translate.setDefaultLang('pt-br');
        this.setLang(localStorage.CONFIG_LANG ? localStorage.CONFIG_LANG : this.lang);
    }

    public setLang(lang) {
        this.lang = lang;
        this.translate.use(lang);
        localStorage.CONFIG_LANG = lang;
    }
}
