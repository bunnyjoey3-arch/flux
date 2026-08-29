import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../core/services/watchlist.service';
import { WatchlistItem } from '../../core/models/review.model';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit {
  items: WatchlistItem[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.watchlistService.list().subscribe((data) => (this.items = data));
  }

  remove(item: WatchlistItem): void {
    this.watchlistService.remove(item.movieId).subscribe(() => this.refresh());
  }
}
