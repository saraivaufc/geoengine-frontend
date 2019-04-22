import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
var AppComponent = /** @class */ (function () {
    function AppComponent(translate) {
        this.translate = translate;
        this.title = 'site';
        this.lang = 'pt-br';
        translate.setDefaultLang('pt-br');
        this.setLang(localStorage.CONFIG_LANG ? localStorage.CONFIG_LANG : this.lang);
    }
    AppComponent.prototype.setLang = function (lang) {
        this.lang = lang;
        this.translate.use(lang);
        localStorage.CONFIG_LANG = lang;
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map