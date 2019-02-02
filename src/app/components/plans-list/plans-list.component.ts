import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../providers/payment.service';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {
	private plans: Array<object> = [];
	private loading: boolean;

	constructor(private paymentService: PaymentService) { }

	ngOnInit() {
		this.getPlans();
	}

	public getPlans(){
	    this.loading = true;

	  	this.paymentService.getPlans().subscribe(
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
