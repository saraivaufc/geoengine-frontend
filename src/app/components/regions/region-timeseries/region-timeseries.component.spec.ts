import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionTimeseriesComponent } from './region-timeseries.component';

describe('RegionTimeseriesComponent', () => {
  let component: RegionTimeseriesComponent;
  let fixture: ComponentFixture<RegionTimeseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionTimeseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionTimeseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
