import { Component, OnInit } from '@angular/core';
import { Accommodation, ConvenieceType, PriceType } from '../../../models/accommodation';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationService } from '../../../services/accommodation-service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-search-accommodation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatTableModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatProgressSpinnerModule, MatNativeDateModule],
  templateUrl: './search-accommodation.component.html',
  styleUrl: './search-accommodation.component.css'
})
export class SearchAccommodationComponent implements OnInit {
  form!: FormGroup;
  results: Accommodation[] = [];
  loading = false;
  PriceType = PriceType;
  displayedColumns: string[] = ['name', 'location', 'guests', 'conveniences', 'unitPrice', 'totalPrice'];

  constructor(
    private fb: FormBuilder,
    private service: AccommodationService
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
    this.service.getAll().subscribe(r => this.results = r);
  }

  onSearch() {
  const loc = this.form.value.location || '';
  const guests = this.form.value.guests || 1;
  const start = this.form.value.start || '';
  const end = this.form.value.end || '';

  if ((start && !end) || (!start && end)) {
    alert('Please provide both start and end dates or neither.');
    return;
  }
  if (start && end) {
    const s = new Date(start);
    const e = new Date(end);
    if (e < s) {
      alert('End date must be after start date.');
      return;
    }
  }

  this.loading = true;
  this.service.search(loc, guests, start, end)
    .subscribe(res => {
      this.results = res;
      this.loading = false;
    }, () => this.loading = false);
  }

  showConveniences(acc: Accommodation) {
    return (acc.conveniences || []).join(', ');
  }

  calculatePrices(acc: Accommodation, startDate: string, endDate: string, guests: number) {
    return { 'total': 100, 'unitPrice': 50, 'priceType': 'per night'};
  }
}
