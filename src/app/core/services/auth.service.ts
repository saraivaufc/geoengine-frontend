import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient,
                private router: Router,
                private http: HttpClient) {
    }

    public login() {
        const state = '1';

        localStorage.setItem('state', state);

        const url = environment.auth.api +
            '/o/authorize/?client_id=' + environment.auth.clientId +
            '&response_type=code' +
            '&redirect_uri=' + window.location.origin + '/app/auth' +
            '&state=' + state;

        window.location.href = url;
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('me');
        const url = environment.auth.api + '/accounts/logout?next=' + window.location.origin + '/app/auth';
        window.location.href = url;
    }

    public async getToken(code, state) {
        const lastState = localStorage.getItem('state');

        if (lastState !== null && lastState === state) {
            const url = environment.base_endpoint + window['Urls'][environment.endpoints.token]();

            const formData = new FormData();
            const object = {
                'grant_type': 'authorization_code',
                'code': code,
                'client_id': environment.auth.clientId,
                'redirect_uri': window.location.origin + '/app/auth',
            };

            for (const key of Object.keys(object)) {
                formData.append(key, object[key]);
            }

            const token = await this.http.post(url, formData).subscribe(
                response => {
                    localStorage.setItem('token', JSON.stringify(response));
                    this.router.navigate(['/']);
                    return true;
                },
                error => {
                    console.log(error);
                    return false;
                }
            );
            return token;
        } else {
            return null;
        }
    }

    public async me() {
        const token = JSON.parse(localStorage.getItem('token'));

        const url = environment.base_endpoint + window['Urls'][environment.endpoints.me]();
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token.access_token,
            'Content-Type': 'application/json',
        });

        // @ts-ignore
        await this.http.get<any>(url, {headers: headers}).subscribe(
            response => {
                localStorage.setItem('me', JSON.stringify(response));
            },
            error => {
                console.log(error);
                return false;
            }
        );
        const me = JSON.parse(localStorage.getItem('me'));
        return me;
    }

    public async refreshToken() {
        const token = JSON.parse(localStorage.getItem('token'));

        const url = environment.base_endpoint + window['Urls'][environment.endpoints.token]();

        const formData = new FormData();
        const object = {
            'grant_type': 'refresh_token',
            'client_id': environment.auth.clientId,
            'refresh_token': token.refresh_token,
        };

        for (const key of Object.keys(object)) {
            formData.append(key, object[key]);
        }

        const result = await this.http.post(url, formData).subscribe(
            response => {
                localStorage.setItem('token', JSON.stringify(response));
                this.router.navigate(['/']);
                return true;
            },
            error => {
                console.log(error);
                return false;
            }
        );
        return result;
    }

    public isAuthenticated() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            return false;
        }
    }
}
