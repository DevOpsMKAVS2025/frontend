import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-availability-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-availability-dialog.component.html',
  styleUrl: './add-availability-dialog.component.css'
})
export class AddAvailabilityDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAvailabilityDialogComponent>
  ) {
    this.form = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;

    const availability = {
      duration: {
        start: this.form.value.start,
        end: this.form.value.end
      }
    };
    this.dialogRef.close(availability);
  }

  cancel() {
    this.dialogRef.close();
  }
}
