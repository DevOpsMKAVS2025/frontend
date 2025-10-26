import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-accommodation-dialog',
  standalone: true,
  imports: [MatInputModule, MatDialogModule, ReactiveFormsModule, MatCheckboxModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './create-accommodation-dialog.component.html',
  styleUrl: './create-accommodation-dialog.component.css'
})
export class CreateAccommodationDialogComponent {
  form: FormGroup;
  conveniences = [
    { name: 'WIFI', value: "WIFI" },
    { name: "Kitchen", value: "KITCHEN" },
    { name: "Air Condition", value: "AIR_CONDITION" },
    { name: "Free Parking", value: "FREE_PARKING" },
  ];
  photos: { name: string; data: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAccommodationDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      globalPrice: [0, [Validators.required, Validators.min(1)]],
      minGuestNumber: [1, [Validators.required, Validators.min(1)]],
      maxGuestNumber: [1, [Validators.required, Validators.min(1)]],
      isAutoReservation: [false],
      conveniences: this.fb.array([]),
    })
  }

  get conveniencesArray() {
    return this.form.get('conveniences') as FormArray;
  }

  toggleConvenience(event: any, convenience: string) {
    if (event.checked) {
      this.conveniencesArray.push(this.fb.control(convenience));
    } else {
      const index = this.conveniencesArray.controls.findIndex(x => x.value === convenience);
      if (index >= 0) this.conveniencesArray.removeAt(index);
    }
  }

  removePhoto(photo: { name: string; data: string }) {
    const index = this.photos.indexOf(photo);
    if (index >= 0) this.photos.splice(index, 1);
  }

  // openAvailabilityDialog() {
  //   const dialogRef = this.dialog.open(AddAvailabilityDialogComponent, { width: '400px' });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) this.availability.push(result);
  //   });
  // }

  // openPriceDialog() {
  //   const dialogRef = this.dialog.open(AddPriceDialogComponent, { width: '400px' });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) this.globalPrice = result;
  //   });
  // }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        // reader.result is a base64 string
        const base64String = reader.result as string;;
        this.photos.push({ name: file.name, data: base64String });
      };

      reader.readAsDataURL(file);
    }
  }

  save() {
    if (this.form.invalid) return;

    const accommodation = {
      ...this.form.value,
      photos: this.photos,
    };

    this.dialogRef.close(accommodation);
  }

  cancel() {
    this.dialogRef.close();
  }
}
