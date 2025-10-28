import { Component, OnInit, ViewChild } from '@angular/core';
import { Accommodation, AccommodationAndPrice, ConvenieceType, PriceType } from '../../../models/accommodation';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationService } from '../../../services/accommodation-service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-accommodation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatSortModule
  ],
  templateUrl: './search-accommodation.component.html',
  styleUrls: ['./search-accommodation.component.css']
})

export class SearchAccommodationComponent implements OnInit {
  form!: FormGroup;
  results: AccommodationAndPrice[] = [];
  loading = false;
  PriceType = PriceType;
  displayedColumns: string[] = ['name', 'location', 'guests', 'conveniences', 'unitPrice', 'totalPrice'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private service: AccommodationService,
    private snackBar: MatSnackBar
  ) {
    try {
      this.form = this.fb.group({
        location: [''],
        guests: [1],
        start: [''],
        end: [''],
      });

    } catch (err) {
      console.error('Constructor error: ', err);
    }
  }

  ngOnInit(): void {
    this.loading = false;

    this.service.getPaged().subscribe({
      next: (data) => {
        this.results = data.results;

        this.dataSource = new MatTableDataSource(this.results);

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching accommodations:', err);
        this.loading = false;
      }
    });
  }

  onSearch() {
    const loc = this.form.value.location || '';
    const guests = this.form.value.guests || 1;
    const start = this.form.value.start;
    const end = this.form.value.end;

    const isEmpty = (v: any) =>
      v === null || v === undefined || (typeof v === 'string' && v.trim() === '');
    if (isEmpty(start) || isEmpty(end)) {
      this.snackBar.open('Please provide both start and end dates or neither.', 'Close', {
        duration: 5000,
      });
      return;
    }

    if (start && end) {
      const s = new Date(start);
      const e = new Date(end);
      if (e <= s) {
        this.snackBar.open('End date must be after start date.', 'Close', {
        duration: 5000,
        });
        return;
      }
    }

    this.loading = true;
    this.service.getByFilters(loc, guests, start, end).subscribe({
      next: (data) => {
        this.results = data.results;

        this.dataSource = new MatTableDataSource(this.results);

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching accommodations:', err);
        this.loading = false;
      }
    });
  }

  showConveniences(acc: Accommodation): string {
    if (!acc.conveniences || acc.conveniences.length === 0) return '-';
    return acc.conveniences.map(c => this.ConvenieceTypeMap[c]).join(', ');
  }

  calculatePrices(acc: Accommodation, startDate: string, endDate: string, guests: number) {
    return { 'total': 100, 'unitPrice': 50, 'priceType': 'per night' };
  }

  ConvenieceTypeMap: { [key: number]: string } = {
    [ConvenieceType.WIFI]: 'Wi-Fi',
    [ConvenieceType.KITCHEN]: 'Kitchen',
    [ConvenieceType.AIR_CONDITION]: 'Air Condition',
    [ConvenieceType.FREE_PARKING]: 'Free Parking'
  };
}
