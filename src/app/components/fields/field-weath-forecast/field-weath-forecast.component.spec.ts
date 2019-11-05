import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldWeathForecastComponent } from './field-weath-forecast.component';

describe('FieldWeathForecastComponent', () => {
  let component: FieldWeathForecastComponent;
  let fixture: ComponentFixture<FieldWeathForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldWeathForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldWeathForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
