import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDetail, MovieDraft, MovieSummary } from '../models/movie.model';
import { environment } from '../../../environments/environment';

export interface MovieFilters {
  search?: string;
  categoryId?: number;
  year?: number;
  sort?: 'trending' | 'latest' | 'popular';
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly baseUrl = `${environment.apiUrl}/movies`;
  private readonly adminUrl = `${environment.apiUrl}/admin/movies`;

  constructor(private http: HttpClient) {}

  list(filters?: MovieFilters): Observable<MovieSummary[]> {
    let params = new HttpParams();

    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters?.year) params = params.set('year', filters.year);
    if (filters?.sort) params = params.set('sort', filters.sort);

    return this.http.get<MovieSummary[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${id}`);
  }

  create(draft: MovieDraft): Observable<MovieDetail> {
    return this.http.post<MovieDetail>(this.adminUrl, draft);
  }

  update(id: number, draft: MovieDraft): Observable<void> {
    return this.http.put<void>(`${this.adminUrl}/${id}`, draft);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }
}
