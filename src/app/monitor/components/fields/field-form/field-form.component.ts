import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {ApiService} from '../../../../core/services/api.service';

@Component({
    selector: 'app-field-form',
    templateUrl: './field-form.component.html',
    styleUrls: ['./field-form.component.css'],
})
export class FieldFormComponent implements OnInit {
    id: number;

    form = new FormGroup({
        crop_type: new FormControl('', [Validators.required]),
        planting_date: new FormControl('', [Validators.required]),
        harvest_date: new FormControl('', [Validators.required]),
        geometry: new FormControl('', [Validators.required]),
    });

    geometry: any;

    constructor(
        private route: ActivatedRoute,
        public apiService: ApiService,
        private router: Router
    ) {
        route.params.subscribe(params => {
            this.id = this.id ? this.id : params['id'];
            if (this.id !== undefined) {
                this.loadRegion(this.id);
            } else {
                this.id = null;
            }
        });
    }

    ngOnInit() {
    }

    loadRegion(id) {
        this.apiService.get(environment.endpoints.regions_details, {'pk': id}, {}).subscribe(
            response => {
                this.form.controls['crop_type'].patchValue(response.properties.crop_type);
                this.form.controls['planting_date'].patchValue(response.properties.planting_date);
                this.form.controls['harvest_date'].patchValue(response.properties.harvest_date);
                this.geometry = JSON.stringify(response.geometry);
            },
            error => {
                console.log(error);
            }
        );
    }

    reciverGeometry(input) {
        this.form.controls['geometry'].patchValue(input);
    }

    onSubmit() {
        const formObj = this.form.getRawValue();

        const region = JSON.stringify(formObj);

        if (this.id) {
            this.apiService.patch(environment.endpoints.regions_details, {pk: this.id}, region).subscribe(
                response => {
                    console.log(response);
                    this.router.navigate([`/dashboard/fields/view/${response.id}`]);
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            this.apiService.post(environment.endpoints.fields, {}, region).subscribe(
                response => {
                    console.log(response);
                    this.router.navigate([`/dashboard/fields/view/${response.id}`]);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
}

