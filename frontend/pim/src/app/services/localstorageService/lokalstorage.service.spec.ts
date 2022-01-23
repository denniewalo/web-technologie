import { TestBed } from '@angular/core/testing';

import { LokalstorageService } from './lokalstorage.service';

describe('LokalstorageService', () => {
  let service: LokalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
