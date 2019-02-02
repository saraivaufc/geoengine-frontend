import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../providers/payment.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit {
	private payments: Array<object> = [];
	private loading: boolean;
	
	constructor(private paymentService: PaymentService) { }

	ngOnInit() {
		this.getPayments();
	}

	public getPayments(){
	    this.loading = true;

	  	this.paymentService.getPayments().subscribe((data: any) => {
	      console.log(data)
	      try{
	        this.payments = data.results;
	        this.loading = false;
	      }catch(e){
	        console.log(e)
	      }
	    });
	}

}
