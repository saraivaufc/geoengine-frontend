import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../providers/region.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

  private regions: Array<object> = [];
  private loading: boolean;

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    timer(0, 15000).subscribe( t => {
      this.getRegions();
    });
	
  }

  public getRegions(){
    this.loading = true;

    this.regionService.getRegions().subscribe(
      response => {
        this.regions = response.results.features;
        this.loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

}
