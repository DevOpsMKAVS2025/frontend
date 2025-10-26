import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRequestReservationComponent } from './guest-request-reservation.component';
import { provideHttpClient } from '@angular/common/http';

describe('GuestRequestReservationComponent', () => {
  let component: GuestRequestReservationComponent;
  let fixture: ComponentFixture<GuestRequestReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestRequestReservationComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestRequestReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
