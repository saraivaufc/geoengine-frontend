import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FormaterService} from './formater.service';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public testTime = 500;
    public errorObserver = new Subject();

    constructor(
        private formaterService: FormaterService,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) {
    }

    public getHeader() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            return {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + token.access_token,
                    'Content-Type': 'application/json',
                })
            };
        } else {
            return null;
        }
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
        const formData = new FormData();
        for (const key of Object.keys(object)) {
            formData.append(key, object[key]);
        }
        return this.http.post(url, formData).pipe(catchError(this.handleError(endpoint)));
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
            if (error.status === 401) {
                if (localStorage.getItem('token')) {
                    const token = this.authService.refreshToken();
                } else {
                    const token = this.authService.login();
                }
            }
            return throwError(error); // Let the app keep running by returning an empty result.
        };
    }
}
