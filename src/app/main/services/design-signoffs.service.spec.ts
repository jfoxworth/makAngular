import { TestBed } from '@angular/core/testing';

import { DesignSignoffsService } from './design-signoffs.service';

describe('DesignSignoffsService', () => {
  let service: DesignSignoffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignSignoffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
