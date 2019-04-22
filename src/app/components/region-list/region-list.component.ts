import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

  private regions: Array<object> = [];
  private loading: boolean;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    timer(0, 15000).subscribe( t => {
      this.getRegions();
    });
	
  }

  public getRegions(){
    this.loading = true;
    let params = {}
    this.apiService.get(environment.endpoints.regions, {}, params).subscribe(
      response => {
        console.log(response.results)
        this.regions = response.results.features;
        this.loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  public deleteRegion(code){
    window.alert(code)
  }

}
