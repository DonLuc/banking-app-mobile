import { TestBed } from '@angular/core/testing';

import { SpinLoadingService } from './spin-loading.service';

describe('SpinLoadingService', () => {
  let service: SpinLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
