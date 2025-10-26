import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestModalComponent } from './create-request-modal.component';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateRequestModalComponent', () => {
  let component: CreateRequestModalComponent;
  let fixture: ComponentFixture<CreateRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateRequestModalComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        provideHttpClient(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CreateRequestModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
