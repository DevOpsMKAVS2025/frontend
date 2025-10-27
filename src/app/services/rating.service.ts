import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewRatingDto } from '../models/rating';
import { booking } from '../env/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private bookingServiceUrl: string = booking.apiHost;

  constructor(private http: HttpClient) { }

  getRatings(): Observable<any> {
    return this.http.get(`${this.bookingServiceUrl}rating`);
  }

  getCanRate(guestId: string): Observable<any> {
    return this.http.get(`${this.bookingServiceUrl}rating/canRate/${guestId}`);
  }

  addRating(ratingDto: NewRatingDto): Observable<any> {
    return this.http.post(`${this.bookingServiceUrl}rating/`, ratingDto);
  }

  updateRating(ratingId: string, newEvaluation: number): Observable<any> {
    return this.http.put(`${this.bookingServiceUrl}rating/${ratingId}`, newEvaluation);
  }

  deleteRating(ratingId: string): Observable<any> {
    return this.http.delete(`${this.bookingServiceUrl}rating/${ratingId}`);
  }
}
