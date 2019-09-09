import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMonitoringComponent } from './region-monitoring.component';

describe('RegionMonitoringComponent', () => {
  let component: RegionMonitoringComponent;
  let fixture: ComponentFixture<RegionMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
