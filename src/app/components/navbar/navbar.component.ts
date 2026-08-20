import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'flux-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  scrolled = false;
  searchOpen = false;
  menuOpen = false;
  query = '';

  readonly links = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/browse/Movie' },
    { label: 'Series', path: '/browse/Series' },
    { label: 'Anime', path: '/browse/Anime' },
    { label: 'Documentaries', path: '/browse/Documentary' },
  ];

  constructor(private router: Router, private contentService: ContentService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

  submitSearch(): void {
    if (!this.query.trim()) return;
    this.router.navigate(['/browse', 'All'], { queryParams: { q: this.query.trim() } });
    this.searchOpen = false;
  }

  get resultCount(): number {
    return this.contentService.search(this.query).length;
  }
}
