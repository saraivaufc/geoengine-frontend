import { TestBed } from '@angular/core/testing';

import { RegionCreateService } from './region-create.service';

describe('RegionCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionCreateService = TestBed.get(RegionCreateService);
    expect(service).toBeTruthy();
  });
});
