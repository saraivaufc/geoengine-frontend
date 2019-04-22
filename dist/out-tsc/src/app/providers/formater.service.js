import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
var FormaterService = /** @class */ (function () {
    function FormaterService(translate) {
        this.translate = translate;
    }
    FormaterService.prototype.textToKeyLang = function (text) {
        var arr = text.split(' ');
        return arr.map(this.onlyLetters).map(function (item) { return item.toUpperCase(); }).join('_');
    };
    FormaterService.prototype.onlyLetters = function (text) {
        return text.replace(/[^a-zA-Z ]/g, "");
    };
    FormaterService.prototype.dictParamsToQuerystring = function (dict) {
        return Object.keys(dict).map(function (key) { return key + "=" + dict[key]; }).join('&');
    };
    FormaterService.prototype.querystringToJson = function (url) {
        var params = url.split('?')[1].split('&').map(function (item) { return item.split('='); });
        var json = {};
        params.forEach(function (param) {
            json[param[0]] = param[1];
        });
        return json;
    };
    FormaterService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], FormaterService);
    return FormaterService;
}());
export { FormaterService };
//# sourceMappingURL=formater.service.js.map