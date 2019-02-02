import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
	API_URL = 'http://localhost:8000/api/v1';

	constructor(private httpClient:HttpClient) {}

	getPlans(): Observable<any> {
		return this.httpClient.get(`${this.API_URL}/plans`)
	}

	getPayments(): Observable<any> {
		return this.httpClient.get(`${this.API_URL}/payments`)
	}
}
