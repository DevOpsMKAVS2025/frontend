import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationComponent } from './host-accommodation.component';

describe('HostAccommodationComponent', () => {
  let component: HostAccommodationComponent;
  let fixture: ComponentFixture<HostAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostAccommodationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
