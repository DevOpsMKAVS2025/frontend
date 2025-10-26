import { TestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RatingService]
    });
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
