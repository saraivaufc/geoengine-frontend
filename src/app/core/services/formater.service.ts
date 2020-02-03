import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class FormaterService {

    constructor(
        public translate: TranslateService
    ) {
    }

    public textToKeyLang(text: string) {
        const arr = text.split(' ');
        return arr.map(this.onlyLetters).map(item => item.toUpperCase()).join('_');
    }

    public onlyLetters(text: string) {
        return text.replace(/[^a-zA-Z ]/g, '');
    }

    public dictParamsToQuerystring(dict) {
        return Object.keys(dict).map(key => `${key}=${dict[key]}`).join('&');
    }

    public querystringToJson(url) {
        const params = url.split('?')[1].split('&').map(item => {
            return item.split('=');
        });
        const json = {};
        params.forEach(param => {
            json[param[0]] = param[1];
        });
        return json;
    }
}
