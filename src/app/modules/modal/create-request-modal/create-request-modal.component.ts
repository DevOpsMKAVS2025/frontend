import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationService } from '../../../services/accommodation.service';
import { Accommodation } from '../../../models/accommodation';

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
export class CreateRequestModalComponent implements OnInit {
  dialogRef = inject(MatDialogRef<CreateRequestModalComponent>);
  readonly #accommodationService = inject(AccommodationService);

  accommodations: Accommodation[] = [];
  accommodationNames: string[] = [];

  ngOnInit(): void {
    this.getAccommodations();
  }

  selectedAccommodation = '';
  guests: number | null = null;
  isSaving = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  getAccommodations(): void {
    this.#accommodationService.getAll().subscribe((data) => {
      this.accommodations = data?.results || [];
      this.accommodationNames = this.accommodations.map(element => element.name);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (!this.isFormValid) return;

    this.isSaving = true;
    const selected = this.accommodations.find(a => a.name === this.selectedAccommodation);

    setTimeout(() => {
      this.dialogRef.close({
        accommodationId: selected?.id,
        accommodation: this.selectedAccommodation,
        guestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // todo
        startDate: this.range.value.start,
        endDate: this.range.value.end,
        guestNum: this.guests
      });
      this.isSaving = false;
    }, 1000);
  }

  get isFormValid(): boolean {
    const { start, end } = this.range.value;
    return !!(this.selectedAccommodation && start && end && this.guests && this.guests > 0);
  }
}
