import { inject, Injectable } from '@angular/core';
import { booking } from '../env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationPagedResponse } from '../models/accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private apiUrl = `${booking.apiHost}accommodation`;
  readonly #http = inject(HttpClient);

  getAll(): Observable<AccommodationPagedResponse> {
    return this.#http.get<AccommodationPagedResponse>(`${this.apiUrl}`);
  }
}
