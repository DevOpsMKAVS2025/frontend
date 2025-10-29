import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceDialogComponent } from './add-price-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

xdescribe('AddPriceDialogComponent', () => {
  let component: AddPriceDialogComponent;
  let fixture: ComponentFixture<AddPriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPriceDialogComponent, MatDialogModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
