import { TestBed } from '@angular/core/testing';

import { EgPlugin1Service } from './eg-plugin1.service';

describe('EgPlugin1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EgPlugin1Service = TestBed.get(EgPlugin1Service);
    expect(service).toBeTruthy();
  });
});
