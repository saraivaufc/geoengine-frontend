import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTimeseriesComponent } from './field-timeseries.component';

describe('FieldTimeseriesComponent', () => {
  let component: FieldTimeseriesComponent;
  let fixture: ComponentFixture<FieldTimeseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldTimeseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTimeseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
