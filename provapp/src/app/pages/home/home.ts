import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) return;

    if (this.auth.hasRole('docente')) {
      this.router.navigate(['/docente']);
      return;
    }

    if (this.auth.hasRole('studente')) {
      this.router.navigate(['/studente']);
    }
  }
}
