import { TestBed } from '@angular/core/testing';

import { ImplicitLoginService } from './implicit-login.service';

describe('ImplicitLoginService', () => {
  let service: ImplicitLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImplicitLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
