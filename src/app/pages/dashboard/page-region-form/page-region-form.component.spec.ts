import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegionFormComponent } from './page-region-form.component';

describe('PageRegionFormComponent', () => {
  let component: PageRegionFormComponent;
  let fixture: ComponentFixture<PageRegionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRegionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRegionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
