import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { RatingService } from '../../services/rating.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, CommonModule, RatingComponent],
      providers: [RatingService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
