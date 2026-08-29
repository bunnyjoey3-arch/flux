import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../core/services/movie.service';
import { ReviewService } from '../../../core/services/review.service';
import { WatchlistService } from '../../../core/services/watchlist.service';
import { AuthService } from '../../../core/services/auth.service';
import { MovieDetail } from '../../../core/models/movie.model';
import { Review } from '../../../core/models/review.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDetail | null = null;
  reviews: Review[] = [];

  isPlaying = false;
  isInWatchlist = false;
  watchlistMessage = '';

  newStars = 5;
  newComment = '';
  reviewError = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private watchlistService: WatchlistService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.movieService.getById(id).subscribe((data) => (this.movie = data));
    this.reviewService.listForMovie(id).subscribe((data) => (this.reviews = data));

    if (this.auth.isLoggedIn) {
      this.watchlistService.list().subscribe((items) => {
        this.isInWatchlist = items.some((item) => item.movieId === id);
      });
    }
  }

  play(): void {
    this.isPlaying = true;
  }

  toggleWatchlist(): void {
    if (!this.movie) return;

    if (this.isInWatchlist) {
      this.watchlistService.remove(this.movie.id).subscribe(() => {
        this.isInWatchlist = false;
        this.watchlistMessage = 'Removed from your watchlist.';
      });
    } else {
      this.watchlistService.add(this.movie.id).subscribe(() => {
        this.isInWatchlist = true;
        this.watchlistMessage = 'Added to your watchlist.';
      });
    }
  }

  submitReview(): void {
    if (!this.movie) return;

    if (this.newStars < 1 || this.newStars > 5) {
      this.reviewError = 'Rating must be between 1 and 5 stars.';
      return;
    }

    this.reviewError = '';

    this.reviewService.post(this.movie.id, { stars: this.newStars, comment: this.newComment || undefined })
      .subscribe({
        next: (review) => {
          this.reviews = [review, ...this.reviews.filter((r) => r.userId !== review.userId)];
          this.newComment = '';
        },
        error: () => (this.reviewError = 'Could not submit your review. Please try again.')
      });
  }

  deleteReview(review: Review): void {
    if (!this.movie) return;

    this.reviewService.remove(this.movie.id, review.id).subscribe(() => {
      this.reviews = this.reviews.filter((r) => r.id !== review.id);
    });
  }

  canDelete(review: Review): boolean {
    const user = this.auth.currentUser();
    if (!user) return false;
    return review.userId === user.userId || this.auth.isAdmin;
  }

  starsArray(count: number): number[] {
    return Array.from({ length: count });
  }
}
