import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FormaterService} from './formater.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public testTime = 500;
    public errorObserver = new Subject();

    constructor(
        public formaterService: FormaterService,
        public router: Router,
        public http: HttpClient,
    ) {
    }

    public getHeader(type = '') {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Basic YWRtaW5AYWRtaW4uY29tOkBkbWluMTIz',
                'Content-Type': 'application/json',
            })
        };
    }

    public getUrl(endpoint, urlParams, getParams = {}) {
        let url = window['Urls'][endpoint](urlParams);
        if (Object.keys(getParams).length > 0) {
            const querystring = this.formaterService.dictParamsToQuerystring(getParams);
            url += `?${querystring}`;
        }
        return environment.base_endpoint + url;
    }

    public get(endpoint, urlParams, getParams = {}) {
        const url = this.getUrl(endpoint, urlParams, getParams);
        console.log(url);
        return this.http.get<any>(url, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    }

    public post(endpoint, urlParams, object) {
        const url = this.getUrl(endpoint, urlParams);
        console.log(endpoint);
        console.log(urlParams);
        console.log(url);
        return this.http.post<any>(url, object, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    }

    public postUrlEncoded(endpoint, urlParams, object) {
        const url = this.getUrl(endpoint, urlParams);
        const headers = new HttpHeaders({'Content-Type': 'application/X-www-form-urlencoded'});

        console.log(headers);

        return this.http.post(url, object, {headers: headers}).pipe(catchError(this.handleError(endpoint)));
    }

    public patch(endpoint, urlParams, object) {
        const url = this.getUrl(endpoint, urlParams);
        console.log(url);
        return this.http.patch<any>(url, object, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    }

    public delete(endpoint, urlParams = {}) {
        const url = this.getUrl(endpoint, urlParams);
        console.log(url);
        return this.http.delete<any>(url, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    }

    // error handle
    public handleError<T>(endpoint, result?: T) {
        return (error: any): Observable<T> => {
            this.errorObserver.next(error);
            return throwError(error); // Let the app keep running by returning an empty result.
        };
    }
}
