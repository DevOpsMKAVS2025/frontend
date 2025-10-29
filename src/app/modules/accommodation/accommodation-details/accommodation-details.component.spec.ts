import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailsComponent } from './accommodation-details.component';

xdescribe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
