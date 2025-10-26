import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtInterceptor } from '@auth0/angular-jwt';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, JwtInterceptor],
    });
    service = TestBed.inject(UserService); // ✅ assign service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
