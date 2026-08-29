import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchlistItem } from '../models/review.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private readonly baseUrl = `${environment.apiUrl}/watchlist`;

  constructor(private http: HttpClient) {}

  list(): Observable<WatchlistItem[]> {
    return this.http.get<WatchlistItem[]>(this.baseUrl);
  }

  add(movieId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/${movieId}`, {});
  }

  remove(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${movieId}`);
  }
}
