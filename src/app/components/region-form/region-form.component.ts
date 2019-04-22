import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../providers/api.service';


@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css'],
})
export class RegionFormComponent implements OnInit {
	private id: number;

	form = new FormGroup({
		crop_type: new FormControl("", [Validators.required]),
		planting_date: new FormControl("", [Validators.required]),
		harvest_date: new FormControl("", [Validators.required]),
		geometry: new FormControl("", [Validators.required]),
	});

	geometry: any; 

	constructor(
		private route: ActivatedRoute, 
		public apiService: ApiService,
		private router: Router) {
		route.params.subscribe(params => {
			this.id = params['id']; 
			if(this.id !== undefined){
				this.loadRegion(this.id)
			}
		});
	}

	ngOnInit() {

	}

	loadRegion(id){
		this.apiService.get(environment.endpoints.regions_details, {"pk": id}, {}).subscribe(
			response => {
				this.form.controls['crop_type'].patchValue(response.properties.crop_type)
				this.form.controls['planting_date'].patchValue(response.properties.planting_date)
				this.form.controls['harvest_date'].patchValue(response.properties.harvest_date)
				this.geometry = JSON.stringify(response.geometry)
			},
			error => {
				console.log(error)
			}
		)		
	}

	reciverGeometry(input) {
	    this.form.controls['geometry'].patchValue(input);
	 }

	onSubmit(){
		let formObj = this.form.getRawValue();

        let region = JSON.stringify(formObj);

		this.apiService.post(environment.endpoints.regions, {}, region).subscribe(
			response => {
				console.log(response)
			},
			error => {
				console.log(error)
			}
		)
	}
}

