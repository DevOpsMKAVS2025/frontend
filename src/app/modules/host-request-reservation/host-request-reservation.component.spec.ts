import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRequestReservationComponent } from './host-request-reservation.component';
import { provideHttpClient } from '@angular/common/http';

describe('HostRequestReservationComponent', () => {
  let component: HostRequestReservationComponent;
  let fixture: ComponentFixture<HostRequestReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostRequestReservationComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostRequestReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
