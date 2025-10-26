import { inject, Injectable } from '@angular/core';
import { booking, environment } from '../env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
