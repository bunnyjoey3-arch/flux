import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieSummary } from '../../core/models/movie.model';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  trending: MovieSummary[] = [];
  popular: MovieSummary[] = [];
  latest: MovieSummary[] = [];
  featuredBanner: MovieSummary | null = null;

  constructor(private movies: MovieService) {}

  ngOnInit(): void {
    this.movies.list({ sort: 'trending' }).subscribe((data) => {
      this.trending = data;
      this.featuredBanner = data[0] ?? null;
    });

    this.movies.list({ sort: 'popular' }).subscribe((data) => (this.popular = data));
    this.movies.list({ sort: 'latest' }).subscribe((data) => (this.latest = data));
  }
}
