import { TestBed } from '@angular/core/testing';
import { AdminAuthGuard } from './adminauthguard.service';

describe('AdminauthguardService', () => {
  let service: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
