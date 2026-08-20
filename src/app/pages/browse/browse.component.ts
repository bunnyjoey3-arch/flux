import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FluxContent, ContentCategory } from '../../models/content.model';
import { ContentService } from '../../services/content.service';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { ContentModalComponent } from '../../components/content-modal/content-modal.component';

type CategoryFilter = ContentCategory | 'All';

@Component({
  selector: 'flux-browse',
  standalone: true,
  imports: [CommonModule, ContentCardComponent, ContentModalComponent],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  readonly tabs: CategoryFilter[] = ['All', 'Movie', 'Series', 'Anime', 'Documentary'];
  active: CategoryFilter = 'All';
  searchTerm = '';
  activeItem: FluxContent | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category') as CategoryFilter | null;
      this.active = category ?? 'All';
    });
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('q') ?? '';
    });
  }

  get results(): FluxContent[] {
    if (this.searchTerm) {
      return this.contentService.search(this.searchTerm);
    }
    if (this.active === 'All') {
      return this.contentService.getAll();
    }
    return this.contentService.getByCategory(this.active);
  }

  setTab(tab: CategoryFilter): void {
    this.searchTerm = '';
    this.router.navigate(['/browse', tab]);
  }

  openDetails(item: FluxContent): void {
    this.activeItem = item;
  }

  closeDetails(): void {
    this.activeItem = null;
  }
}
