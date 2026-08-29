import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, ReviewDraft } from '../models/review.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  listForMovie(movieId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/movies/${movieId}/reviews`);
  }

  post(movieId: number, draft: ReviewDraft): Observable<Review> {
    return this.http.post<Review>(`${environment.apiUrl}/movies/${movieId}/reviews`, draft);
  }

  remove(movieId: number, reviewId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/movies/${movieId}/reviews/${reviewId}`);
  }
}
