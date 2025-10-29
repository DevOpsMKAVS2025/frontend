import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailabilityDialogComponent } from './add-availability-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

xdescribe('AddAvailabilityDialogComponent', () => {
  let component: AddAvailabilityDialogComponent;
  let fixture: ComponentFixture<AddAvailabilityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAvailabilityDialogComponent, MatDialogModule]
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
