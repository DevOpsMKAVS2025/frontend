import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccommodationDialogComponent } from './create-accommodation-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('CreateAccommodationDialogComponent', () => {
  let component: CreateAccommodationDialogComponent;
  let fixture: ComponentFixture<CreateAccommodationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateAccommodationDialogComponent,  // ✅ standalone component goes here
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccommodationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
