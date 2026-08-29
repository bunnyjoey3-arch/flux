import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'movies',
    loadComponent: () => import('./features/movies/movie-list/movie-list.component').then((m) => m.MovieListComponent)
  },
  {
    path: 'movies/:id',
    loadComponent: () => import('./features/movies/movie-detail/movie-detail.component').then((m) => m.MovieDetailComponent)
  },
  {
    path: 'watchlist',
    canActivate: [authGuard],
    loadComponent: () => import('./features/watchlist/watchlist.component').then((m) => m.WatchlistComponent)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
  },
  { path: '**', redirectTo: '' }
];
