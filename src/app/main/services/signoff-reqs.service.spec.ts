import { TestBed } from '@angular/core/testing';

import { SignoffReqsService } from './signoff-reqs.service';

describe('SignoffReqsService', () => {
  let service: SignoffReqsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignoffReqsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
