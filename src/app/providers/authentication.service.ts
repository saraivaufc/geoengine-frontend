import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
        console.log(User);
    }

    public login(code) {
        // return this.apiService.postUrlEncoded(environment.endpoints.token, {}, {
        //     'grant_type': 'authorization_code',
        //     'code': code,
        //     'client_id': environment.auth.client_id,
        //     'redirect_uri': environment.auth.redirectUrl,
        // }).subscribe(
        //     response => {
        //         console.log(response);
        //     },
        //     error => {
        //         console.log(error);
        //     }
        // );
    }

    public isAuthenticated() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            return false;
        }
    }
}
