import { TestBed } from '@angular/core/testing';

import { Plugin1Service } from './plugin1.service';

describe('Plugin1Service', () => {
  let service: Plugin1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Plugin1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
