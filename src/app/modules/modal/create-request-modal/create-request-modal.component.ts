import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-request-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-request-modal.component.html',
  styleUrls: ['./create-request-modal.component.css']
})
export class CreateRequestModalComponent {
  dialogRef = inject(MatDialogRef<CreateRequestModalComponent>);

  accommodations = ['Apartment 1', 'Studio 2', 'Villa Sunset'];

  selectedAccommodation = '';
  guests: number | null = null;
  isSaving = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (!this.isFormValid) return;

    this.isSaving = true;

    setTimeout(() => {
      this.dialogRef.close({
        accommodation: this.selectedAccommodation,
        startDate: this.range.value.start,
        endDate: this.range.value.end,
        guests: this.guests
      });
      this.isSaving = false;
    }, 1000);
  }

  get isFormValid(): boolean {
    const { start, end } = this.range.value;
    return !!(this.selectedAccommodation && start && end && this.guests && this.guests > 0);
  }
}
