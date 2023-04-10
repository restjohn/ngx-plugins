import { TestBed } from '@angular/core/testing';

import { EgCoreLibService } from './eg-core-lib.service';

describe('EgCoreLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EgCoreLibService = TestBed.inject(EgCoreLibService);
    expect(service).toBeTruthy();
  });
});
