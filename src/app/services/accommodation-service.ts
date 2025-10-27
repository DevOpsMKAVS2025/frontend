import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation, Availability, Price } from '../models/accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private apiUrl = 'https://localhost:7056/api/accommodation';

  constructor(private http: HttpClient) {}

  // ====== ACCOMMODATION ======

  getPaged(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(accommodation: Accommodation): Observable<any> {
    return this.http.post(`${this.apiUrl}`, accommodation);
  }

  update(accommodation: Accommodation): Observable<any> {
    return this.http.put(`${this.apiUrl}`, accommodation);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ====== PRICE ======

  createPrice(price: Price): Observable<any> {
    return this.http.post(`${this.apiUrl}/price`, price);
  }

  getPrice(accommodationId: string, priceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/price/${accommodationId}/${priceId}`);
  }

  updatePrice(price: Price): Observable<any> {
    return this.http.put(`${this.apiUrl}/price`, price);
  }

  // ====== AVAILABILITY ======

  createAvailability(availability: Availability): Observable<any> {
    return this.http.post(`${this.apiUrl}/availability`, availability);
  }

  getAvailability(accommodationId: string, availabilityId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/availability/${accommodationId}/${availabilityId}`);
  }

  updateAvailability(availability: Availability): Observable<any> {
    return this.http.put(`${this.apiUrl}/availability`, availability);
  }

  // ====== FILTER ======

  getByFilters(
    location?: string,
    guestNumber?: number,
    from?: Date,
    to?: Date
  ): Observable<any> {
    let params = new HttpParams();
    if (location) params = params.set('location', location);
    if (guestNumber) params = params.set('guestNumber', guestNumber);
    if (from) params = params.set('from', from.toISOString());
    if (to) params = params.set('to', to.toISOString());

    return this.http.get(`${this.apiUrl}/filter`, { params });
  }
}
