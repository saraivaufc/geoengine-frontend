import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
	API_URL = 'http://localhost:8000/api/v1';

	constructor(private httpClient:HttpClient) {}

	private getHeader() {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Basic c2FyYWl2YS51ZmNAZ21haWwuY29tOlRlcm1pbmFsUk9TQTY2Ng=='
			})
		}
	}

	getRegions(): Observable<any> {
		return this.httpClient.get(`${this.API_URL}/regions`);
	}

	getRegion(code): Observable<any> {
		return this.httpClient.get(`${this.API_URL}/regions/${code}`);
	}

	getProductsByRegionAndTags(code, tags): Observable<any>{
		let tags_field = "";
		tags.forEach(function(tag){
			tags_field = tags_field+`tag=${tag.value}&`
		})
		return this.httpClient.get(`${this.API_URL}/regions/${code}/products?${tags_field}`);
	}

	public postRegion(region): Observable<any> {
		console.log(region)
		return this.httpClient.post(environment.region_url, region, this.getHeader());
	}
}
