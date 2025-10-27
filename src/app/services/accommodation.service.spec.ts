import { TestBed } from '@angular/core/testing';
import { AccommodationService } from './accommodation.service';
import { provideHttpClient } from '@angular/common/http';

describe('AccommodationService', () => {
  let service: AccommodationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccommodationService, provideHttpClient()]
    });
    service = TestBed.inject(AccommodationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
