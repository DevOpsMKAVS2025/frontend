import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Accommodation, ConvenieceType, Price, PriceType } from '../../../../models/accommodation';
import { ImageService } from '../../../../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    { name: 'WIFI', value: 0 },
    { name: "Kitchen", value: 1 },
    { name: "Air Condition", value: 2 },
    { name: "Free Parking", value: 3 },
  ];
  photos: { name: string; data: File }[] = [];
  photosPreview: { name: string; data: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAccommodationDialogComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
    }, { validators: this.maxGreaterThanMin });
  }

  maxGreaterThanMin(group: FormGroup) {
    const min = group.get('minGuestNumber')?.value;
    const max = group.get('maxGuestNumber')?.value;
    return max >= min ? null : { maxLessThanMin: true };
  }
  get conveniencesArray() {
    return this.form.get('conveniences') as FormArray;
  }

  toggleConvenience(event: any, convenience: number) {
    if (event.checked) {
      this.conveniencesArray.push(this.fb.control(convenience));
    } else {
      const index = this.conveniencesArray.controls.findIndex(x => x.value === convenience);
      if (index >= 0) this.conveniencesArray.removeAt(index);
    }
  }

  removePhoto(name: string) {  
    const index = this.photos.findIndex(p => p.name === name);
    if (index >= 0) this.photos.splice(index, 1);
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.photos.push({ name: file.name, data: file });
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;;
        this.photosPreview.push({ name: file.name, data: base64String });
      };

      reader.readAsDataURL(file);
    }
  }

  save() {

    if (this.form.invalid) return;
    const accommodation = {
      ...this.form.value,
      photos: this.photos,
      prices: [],
      availability: []
    };

    this.dialogRef.close(accommodation);
  }

  cancel() {
    this.dialogRef.close();
  }
}
