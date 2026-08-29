import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../../core/services/movie.service';
import { CategoryService } from '../../../core/services/category.service';
import { AdminService, AdminUser } from '../../../core/services/admin.service';
import { MovieDraft, MovieSummary, Category } from '../../../core/models/movie.model';

type AdminTab = 'movies' | 'categories' | 'users';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  activeTab: AdminTab = 'movies';

  movies: MovieSummary[] = [];
  categories: Category[] = [];
  users: AdminUser[] = [];

  isEditorOpen = false;
  editingMovieId: number | null = null;
  draft: MovieDraft = this.emptyDraft();
  formError = '';

  newCategoryName = '';

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.refreshMovies();
    this.refreshCategories();
    this.refreshUsers();
  }

  setTab(tab: AdminTab): void {
    this.activeTab = tab;
  }

  // ---- Movies ----

  refreshMovies(): void {
    this.movieService.list().subscribe((data) => (this.movies = data));
  }

  openNewMovie(): void {
    this.editingMovieId = null;
    this.draft = this.emptyDraft();
    this.formError = '';
    this.isEditorOpen = true;
  }

  openEditMovie(movie: MovieSummary): void {
    this.movieService.getById(movie.id).subscribe((detail) => {
      this.editingMovieId = detail.id;
      this.draft = {
        title: detail.title,
        description: detail.description,
        posterUrl: detail.posterUrl,
        bannerUrl: detail.bannerUrl,
        trailerUrl: detail.trailerUrl,
        videoUrl: detail.videoUrl,
        releaseYear: detail.releaseYear,
        duration: detail.duration,
        isFeatured: false,
        categoryIds: this.categories
          .filter((c) => detail.categories.includes(c.name))
          .map((c) => c.id)
      };
      this.formError = '';
      this.isEditorOpen = true;
    });
  }

  closeEditor(): void {
    this.isEditorOpen = false;
  }

  toggleCategory(categoryId: number): void {
    const index = this.draft.categoryIds.indexOf(categoryId);
    if (index >= 0) {
      this.draft.categoryIds.splice(index, 1);
    } else {
      this.draft.categoryIds.push(categoryId);
    }
  }

  saveMovie(): void {
    if (!this.draft.title.trim() || !this.draft.videoUrl.trim()) {
      this.formError = 'Title and video URL are required.';
      return;
    }

    if (this.editingMovieId !== null) {
      this.movieService.update(this.editingMovieId, this.draft).subscribe({
        next: () => {
          this.closeEditor();
          this.refreshMovies();
        },
        error: () => (this.formError = 'Saving failed. Please check the fields and try again.')
      });
      return;
    }

    this.movieService.create(this.draft).subscribe({
      next: () => {
        this.closeEditor();
        this.refreshMovies();
      },
      error: () => (this.formError = 'Saving failed. Please check the fields and try again.')
    });
  }

  deleteMovie(movie: MovieSummary): void {
    this.movieService.remove(movie.id).subscribe(() => this.refreshMovies());
  }

  private emptyDraft(): MovieDraft {
    return {
      title: '',
      description: '',
      posterUrl: '',
      bannerUrl: '',
      trailerUrl: '',
      videoUrl: '',
      releaseYear: new Date().getFullYear(),
      duration: 90,
      isFeatured: false,
      categoryIds: []
    };
  }

  // ---- Categories ----

  refreshCategories(): void {
    this.categoryService.list().subscribe((data) => (this.categories = data));
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;

    this.categoryService.create(this.newCategoryName.trim()).subscribe(() => {
      this.newCategoryName = '';
      this.refreshCategories();
    });
  }

  removeCategory(category: Category): void {
    this.categoryService.remove(category.id).subscribe(() => this.refreshCategories());
  }

  // ---- Users ----

  refreshUsers(): void {
    this.adminService.listUsers().subscribe((data) => (this.users = data));
  }

  promote(user: AdminUser): void {
    this.adminService.promoteUser(user.id).subscribe(() => this.refreshUsers());
  }

  deleteUser(user: AdminUser): void {
    this.adminService.deleteUser(user.id).subscribe(() => this.refreshUsers());
  }
}
