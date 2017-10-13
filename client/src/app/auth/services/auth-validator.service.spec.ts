import { TestBed, inject } from '@angular/core/testing';

import { AuthValidatorService } from './auth-validator.service';

describe('AuthValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthValidatorService]
    });
  });

  it('should be created', inject([AuthValidatorService], (service: AuthValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
