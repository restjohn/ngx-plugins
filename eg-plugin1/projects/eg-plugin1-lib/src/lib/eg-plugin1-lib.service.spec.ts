import { TestBed } from '@angular/core/testing';

import { EgPlugin1LibService } from './eg-plugin1-lib.service';

describe('EgPlugin1LibService', () => {
  let service: EgPlugin1LibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgPlugin1LibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
