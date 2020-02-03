import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regionsCount: Number = null;

  constructor(
      private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.loadRegionsCount();
  }

  public loadRegionsCount() {
    this.apiService.get(environment.endpoints.fields, {}).subscribe(
        response => {
          console.log(response.results);
          this.regionsCount = response.count;
        },
        error => {
          console.log(error);
        }
    );
  }

}
