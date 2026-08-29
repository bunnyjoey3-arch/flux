import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  displayName = '';
  email = '';
  password = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.displayName || !this.email || !this.password) {
      this.errorMessage = 'Fill in all fields.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.auth.register({
      displayName: this.displayName,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message ?? err?.error?.errors?.[0] ?? 'Registration failed.';
      }
    });
  }
}
