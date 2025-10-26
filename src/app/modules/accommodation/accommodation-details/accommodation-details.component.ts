import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../../../services/accommodation-service';
import { MatDialog } from '@angular/material/dialog';
import { Accommodation } from '../../../models/accommodation';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddAvailabilityDialogComponent } from '../dialogs/add-availability-dialog/add-availability-dialog.component';
import { AddPriceDialogComponent } from '../dialogs/add-price-dialog/add-price-dialog.component';

@Component({
  selector: 'app-accommodation-details',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css'
})
export class AccommodationDetailsComponent implements OnInit {

  accommodation: Accommodation = {
    name: '',
    location: '',
    conveniences: [],
    photos: [],
    minGuestNumber: 0,
    maxGuestNumber: 0,
    availability: [],
    prices: [],
    globalPrice: 0
  };

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accommodationService.getAccommodationById(id)
        .subscribe(a => this.accommodation = a);
    }
  }

  addAvailability() {
    const dialogRef = this.dialog.open(AddAvailabilityDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.accommodation.availability.push(result);
    });
  }

  addPrice() {
    const dialogRef = this.dialog.open(AddPriceDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.accommodation.prices.push(result);
    });
  }

}
