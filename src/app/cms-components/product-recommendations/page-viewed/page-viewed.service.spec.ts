import { TestBed } from '@angular/core/testing';

import { PageViewedService } from './page-viewed.service';

describe('PageViewedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageViewedService = TestBed.get(PageViewedService);
    expect(service).toBeTruthy();
  });
});
