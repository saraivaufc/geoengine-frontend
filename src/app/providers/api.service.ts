import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FormaterService } from './formater.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	public testTime: number = 500;
	public errorObserver = new Subject();

	constructor(
		public formaterService: FormaterService,
		public router: Router,
		public http: HttpClient,
	) {
	}

	public login(email, password): Observable<any> {
		let url = this.getUrl(environment.endpoints.auth, {});
		return this.http.post<any>(url, {
			username: email,
			password: password
		});
	}

	public getHeader(type = '') {
		return {
			headers: new HttpHeaders({
				'Authorization': 'Basic YWRtaW5AYWRtaW4uY29tOkBkbWluMTIz',
				'Content-Type': 'application/json',
			})
		}
	}

	private applyUrlParams(url, urlParams){
		if (urlParams !== null) {
			for (let key in urlParams) {
				let value = urlParams[key];
				url = url.replace("{"+key+"}", value);
			};	
		}
		return url;
	}

	public getUrl(endpoint, urlParams, getParams={}){
		let url = window['Urls'][endpoint](urlParams);
		if (Object.keys(getParams).length > 0) {
			let querystring = this.formaterService.dictParamsToQuerystring(getParams);
			url += `?${querystring}`;
		}
		return environment.base_endpoint+url;
	}

	public get(endpoint, urlParams, getParams={}) {
		let url = this.getUrl(endpoint, urlParams, getParams);
		console.log(url)
		let args = arguments;
		return this.http.get<any>(url, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
	}

	public post(endpoint, urlParams, object) {
		let url = this.getUrl(endpoint, urlParams);
		console.log(url)
		let args = arguments;
		return this.http.post<any>(url, object, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
	}

	public patch(endpoint, urlParams, object) {
		let url = this.getUrl(endpoint, urlParams);
		console.log(url)
		let args = arguments;
		return this.http.patch<any>(url, object, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
	}

	public delete(endpoint, urlParams = {}) {
		let url = this.getUrl(endpoint, urlParams);
		console.log(url)
		let args = arguments;
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
