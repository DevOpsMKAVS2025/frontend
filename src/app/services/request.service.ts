import { inject, Injectable } from '@angular/core';
import { booking, environment } from '../env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestCancelation } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${booking.apiHost}request`;
  readonly #http = inject(HttpClient);

  getAllGuestRequests(guestId: string): Observable<Request[]> {
    return this.#http.get<Request[]>(`${this.apiUrl}/guest/${guestId}`);
  }

  getAllGuestReservations(guestId: string): Observable<Request[]> {
    return this.#http.get<Request[]>(`${this.apiUrl}/accepted/guest/${guestId}`);
  }

  createRequest(requestData: Request): Observable<Request> {
    return this.#http.post<Request>(this.apiUrl, requestData);
  }

  deleteRequest(requestId: string): Observable<void> {
    return this.#http.delete<void>(`${this.apiUrl}/${requestId}`);
  }

  rejectReservation(reservationId: string): Observable<void> {
    return this.#http.post<void>(`${this.apiUrl}/reject/${reservationId}`, {});
  }

  getAccommodationRequests(accommodationId: string): Observable<RequestCancelation[]> {
    return this.#http.get<RequestCancelation[]>(`${this.apiUrl}/accommodation/${accommodationId}/with-cancel-count`);
  }

  getAccommodationReservations(accommodationId: string): Observable<Request[]> {
    return this.#http.get<Request[]>(`${this.apiUrl}/accepted/accommodation/${accommodationId}`);
  }

  approveRequest(requestId: string): Observable<void> {
    return this.#http.post<void>(`${this.apiUrl}/approve/${requestId}`, {});
  }
}
