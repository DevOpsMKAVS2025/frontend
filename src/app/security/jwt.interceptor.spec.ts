import { TestBed } from '@angular/core/testing';
import { JwtInterceptor } from './jwt.interceptor';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        { provide: UserService, useValue: {} }, // mock or stub if needed
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    });
    interceptor = TestBed.inject(JwtInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
