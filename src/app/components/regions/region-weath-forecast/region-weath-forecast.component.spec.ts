import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionWeathForecastComponent } from './region-weath-forecast.component';

describe('RegionWeathForecastComponent', () => {
  let component: RegionWeathForecastComponent;
  let fixture: ComponentFixture<RegionWeathForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionWeathForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionWeathForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
