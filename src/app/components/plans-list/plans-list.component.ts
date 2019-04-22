import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {
	private plans: Array<object> = [];
	private loading: boolean;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.getPlans();
	}

	public getPlans(){
	    this.loading = true;
	  	this.apiService.get(environment.endpoints.plans, {}, {}).subscribe(
	      response => {
	        this.plans = response.results;
	        this.loading = false;
	      },
	      error => {
	        console.log(error);
	      }
	    );
	}

}
