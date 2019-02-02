import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionItemComponent } from './region-item.component';

describe('RegionItemComponent', () => {
  let component: RegionItemComponent;
  let fixture: ComponentFixture<RegionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
