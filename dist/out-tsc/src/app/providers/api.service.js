import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormaterService } from './formater.service';
var ApiService = /** @class */ (function () {
    function ApiService(formaterService, router, http) {
        this.formaterService = formaterService;
        this.router = router;
        this.http = http;
        this.testTime = 500;
        this.errorObserver = new Subject();
    }
    ApiService.prototype.login = function (email, password) {
        var url = this.getUrl(environment.endpoints.auth, {});
        return this.http.post(url, {
            username: email,
            password: password
        });
    };
    ApiService.prototype.getHeader = function (type) {
        if (type === void 0) { type = ''; }
        return {
            headers: new HttpHeaders({
                'Authorization': 'Basic YWRtaW5AYWRtaW4uY29tOkBkbWluMTIz',
                'Content-Type': 'application/json',
            })
        };
    };
    ApiService.prototype.applyUrlParams = function (url, urlParams) {
        if (urlParams !== null) {
            for (var key in urlParams) {
                var value = urlParams[key];
                url = url.replace("{" + key + "}", value);
            }
            ;
        }
        return url;
    };
    ApiService.prototype.getUrl = function (endpoint, urlParams, getParams) {
        if (getParams === void 0) { getParams = {}; }
        var url = window['Urls'][endpoint](urlParams);
        if (Object.keys(getParams).length > 0) {
            var querystring = this.formaterService.dictParamsToQuerystring(getParams);
            url += "?" + querystring;
        }
        return environment.base_endpoint + url;
    };
    ApiService.prototype.get = function (endpoint, urlParams, getParams) {
        if (getParams === void 0) { getParams = {}; }
        var url = this.getUrl(endpoint, urlParams, getParams);
        console.log(url);
        var args = arguments;
        return this.http.get(url, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    };
    ApiService.prototype.post = function (endpoint, urlParams, object) {
        var url = this.getUrl(endpoint, urlParams);
        console.log(url);
        var args = arguments;
        return this.http.post(url, object, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    };
    ApiService.prototype.patch = function (endpoint, urlParams, object) {
        var url = this.getUrl(endpoint, urlParams);
        console.log(url);
        var args = arguments;
        return this.http.patch(url, object, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    };
    ApiService.prototype.delete = function (endpoint, urlParams) {
        if (urlParams === void 0) { urlParams = {}; }
        var url = this.getUrl(endpoint, urlParams);
        console.log(url);
        var args = arguments;
        return this.http.delete(url, this.getHeader()).pipe(catchError(this.handleError(endpoint)));
    };
    // error handle
    ApiService.prototype.handleError = function (endpoint, result) {
        var _this = this;
        return function (error) {
            _this.errorObserver.next(error);
            return throwError(error); // Let the app keep running by returning an empty result.
        };
    };
    ApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [FormaterService,
            Router,
            HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map