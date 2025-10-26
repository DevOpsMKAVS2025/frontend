import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailabilityDialogComponent } from './add-availability-dialog.component';

describe('AddAvailabilityDialogComponent', () => {
  let component: AddAvailabilityDialogComponent;
  let fixture: ComponentFixture<AddAvailabilityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAvailabilityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAvailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
