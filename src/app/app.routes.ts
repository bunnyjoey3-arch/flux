import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Flux — All your movies, series & anime',
  },
  {
    path: 'browse/:category',
    loadComponent: () =>
      import('./pages/browse/browse.component').then((m) => m.BrowseComponent),
    title: 'Browse — Flux',
  },
  { path: '**', redirectTo: '' },
];
