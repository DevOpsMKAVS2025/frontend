import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { NewRatingDto } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatings(): Observable<any> {
    return this.http.get(`${environment.bookingService}rating`);
  }

  getCanRate(guestId: string): Observable<any> {
    return this.http.get(`${environment.bookingService}rating/canRate/${guestId}`);
  }

  addRating(ratingDto: NewRatingDto): Observable<any> {
    return this.http.post(`${environment.bookingService}rating/`, ratingDto);
  }

  updateRating(ratingId: string, newEvaluation: number): Observable<any> {
    return this.http.put(`${environment.bookingService}rating/${ratingId}`, newEvaluation);
  }

  deleteRating(ratingId: string): Observable<any> {
    return this.http.delete(`${environment.bookingService}rating/${ratingId}`);
  }
}
