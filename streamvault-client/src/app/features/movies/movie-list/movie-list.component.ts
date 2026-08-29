import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../core/services/movie.service';
import { CategoryService } from '../../../core/services/category.service';
import { MovieSummary, Category } from '../../../core/models/movie.model';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: MovieSummary[] = [];
  categories: Category[] = [];

  searchTerm = '';
  selectedCategoryId: number | null = null;
  selectedYear: number | null = null;
  sort: 'trending' | 'latest' | 'popular' = 'latest';

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.list().subscribe((data) => (this.categories = data));

    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] ?? '';
      this.refresh();
    });
  }

  refresh(): void {
    this.movieService.list({
      search: this.searchTerm || undefined,
      categoryId: this.selectedCategoryId ?? undefined,
      year: this.selectedYear ?? undefined,
      sort: this.sort
    }).subscribe((data) => (this.movies = data));
  }
}
