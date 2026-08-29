import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthUser, LoginRequest, RegisterRequest } from '../models/user.model';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'streamvault.auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  // A signal so components can react to login/logout without subscribing manually.
  currentUser = signal<AuthUser | null>(this.readFromStorage());

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.baseUrl}/register`, request).pipe(
      tap((user) => this.persist(user))
    );
  }

  login(request: LoginRequest): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.baseUrl}/login`, request).pipe(
      tap((user) => this.persist(user))
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.currentUser.set(null);
  }

  get isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  get isAdmin(): boolean {
    return this.currentUser()?.roles.includes('Admin') ?? false;
  }

  get token(): string | null {
    return this.currentUser()?.token ?? null;
  }

  private persist(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  private readFromStorage(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      const user = JSON.parse(raw) as AuthUser;
      if (new Date(user.expiresOn) < new Date()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return user;
    } catch {
      return null;
    }
  }
}
