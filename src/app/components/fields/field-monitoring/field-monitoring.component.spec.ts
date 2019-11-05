import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMonitoringComponent } from './field-monitoring.component';

describe('FieldMonitoringComponent', () => {
  let component: FieldMonitoringComponent;
  let fixture: ComponentFixture<FieldMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
