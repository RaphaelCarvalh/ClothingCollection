import { TestBed } from '@angular/core/testing';

import { GetHelpService } from './get-help.service';

describe('GetHelpService', () => {
  let service: GetHelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
