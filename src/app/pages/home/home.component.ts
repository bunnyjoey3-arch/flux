import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxContent } from '../../models/content.model';
import { ContentService } from '../../services/content.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContentRowComponent } from '../../components/content-row/content-row.component';
import { ContentModalComponent } from '../../components/content-modal/content-modal.component';

@Component({
  selector: 'flux-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, ContentRowComponent, ContentModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featured: FluxContent | null = null;
  trending: FluxContent[] = [];
  newReleases: FluxContent[] = [];
  movies: FluxContent[] = [];
  series: FluxContent[] = [];
  anime: FluxContent[] = [];
  documentaries: FluxContent[] = [];

  activeItem: FluxContent | null = null;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.featured = this.contentService.getFeatured();
    this.trending = this.contentService.getTrending();
    this.newReleases = this.contentService.getNewReleases();
    this.movies = this.contentService.getByCategory('Movie');
    this.series = this.contentService.getByCategory('Series');
    this.anime = this.contentService.getByCategory('Anime');
    this.documentaries = this.contentService.getByCategory('Documentary');
  }

  openDetails(item: FluxContent): void {
    this.activeItem = item;
  }

  closeDetails(): void {
    this.activeItem = null;
  }
}
