import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm = '';

  constructor(public auth: AuthService, private router: Router) {}

  submitSearch(): void {
    if (!this.searchTerm.trim()) return;
    this.router.navigate(['/movies'], { queryParams: { search: this.searchTerm.trim() } });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
