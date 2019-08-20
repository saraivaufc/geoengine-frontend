import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	API_URL = 'http://localhost:8000/api/v1';
	constructor(private httpClient:HttpClient) {
	console.log(User)
	}

	createUser(){
		return this.httpClient.get(`${this.API_URL}/plans`)
	}
}
