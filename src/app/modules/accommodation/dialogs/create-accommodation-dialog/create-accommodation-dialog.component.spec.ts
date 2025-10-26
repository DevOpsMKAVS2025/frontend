import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccommodationDialogComponent } from './create-accommodation-dialog.component';

describe('CreateAccommodationDialogComponent', () => {
  let component: CreateAccommodationDialogComponent;
  let fixture: ComponentFixture<CreateAccommodationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccommodationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccommodationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
