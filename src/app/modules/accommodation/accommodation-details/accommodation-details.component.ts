import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../../../services/accommodation-service';
import { MatDialog } from '@angular/material/dialog';
import { Accommodation, Availability, ConvenieceType, Price, PriceType } from '../../../models/accommodation';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddAvailabilityDialogComponent } from '../dialogs/add-availability-dialog/add-availability-dialog.component';
import { AddPriceDialogComponent } from '../dialogs/add-price-dialog/add-price-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatOption, MatOptionModule } from "@angular/material/core";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-accommodation-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
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
    globalPrice: 0,
    priceType: PriceType.PER_GUEST
  };

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private dialog: MatDialog,
    private service: AccommodationService
  ) { }

 
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.warn('Accommodation ID not provided in route');
      return;
    }

    this.accommodationService.getById(id)
      .pipe(take(1))
      .subscribe({
        next: (data) => this.accommodation = data,
        error: (err) => console.error('Error loading accommodation:', err)
      });
  }

  addAvailability() {
    const dialogRef = this.dialog.open(AddAvailabilityDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.accommodationId = this.accommodation.id
        this.service.createAvailability(result)
          .pipe(take(1))
          .subscribe({
            next: (createdAvailability: Availability) => {
              this.accommodation.availability.push(createdAvailability);
                      this.accommodation.availability = [...this.accommodation.availability]; 
            },
            error: (err) => {
                console.error('Greška prilikom kreiranja dostupnosti:', err);
            }  
          });
      }
    });
  }

  addPrice() {
    const dialogRef = this.dialog.open(AddPriceDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(newPriceData => {
      if (newPriceData) {
      newPriceData.accommodationId = this.accommodation.id
      this.service.createPrice(newPriceData)
        .pipe(take(1))
        .subscribe({
          next: (createdPrice: Price) => {
            this.accommodation.prices.push(createdPrice);
            this.accommodation.prices = [...this.accommodation.prices]; 
          },
          error: (err) => {
              console.error('Greška prilikom kreiranja cene:', err);
          }  
        });
      }
    });
  }
  updateAccommodation()
  {
       if (!this.accommodation?.id) return; 

  this.service.update(this.accommodation)
    .pipe(take(1))
    .subscribe({
      next: (updated: Accommodation) => {
        console.log('Accommodation updated successfully', updated);
      },
      error: (err) => {
        console.error('Error updating accommodation', err);
      }
    });
  }

  showConveniences(acc: Accommodation): string {
    if (!acc.conveniences || acc.conveniences.length === 0) return '-';
      return acc.conveniences.map(c => this.ConvenieceTypeMap[c]).join(', ');
  }
  showPriceType(key: number): string {
      return this.PriceTypeMap[key];
  }

  isChecked(value: number): boolean {
    return this.accommodation.conveniences?.includes(value) ?? false;
  }

  toggleConvenience(event: any, convenience: number) {
    if (!this.accommodation.conveniences) {
      this.accommodation.conveniences = [];
    }

    if (event.checked) {
      this.accommodation.conveniences.push(convenience);
    } else {
      const index = this.accommodation.conveniences.indexOf(convenience);
      if (index >= 0) this.accommodation.conveniences.splice(index, 1);
    }
  }
  
  ConvenieceTypeMap: { [key: number]: string } = {
    [ConvenieceType.WIFI]: 'Wi-Fi',
    [ConvenieceType.KITCHEN]: 'Kitchen',
    [ConvenieceType.AIR_CONDITION]: 'Air Condition',
    [ConvenieceType.FREE_PARKING]: 'Free Parking'
  };

  PriceTypeMap: { [key: number]: string } = {
    [PriceType.PER_GUEST]: 'Per Guest',
    [PriceType.PER_UNIT]: 'Per Unit',
  };

  allConveniences = [
    { name: 'Wi-Fi', value: ConvenieceType.WIFI },
    { name: 'Kitchen', value: ConvenieceType.KITCHEN },
    { name: 'Air Condition', value: ConvenieceType.AIR_CONDITION },
    { name: 'Free Parking', value: ConvenieceType.FREE_PARKING }
  ];
}
