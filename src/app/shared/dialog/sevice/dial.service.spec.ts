import { TestBed } from '@angular/core/testing';

import { DialService } from './dial.service';

describe('DialService', () => {
  let service: DialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
