import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RegistroService, Voto } from '../../services/registro-service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-studente',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './studente.html',
  styleUrl: './studente.css',
})
export class Studente implements OnInit {
  private registroService = inject(RegistroService);
  auth = inject(AuthService);

  voti = signal<Voto[]>([]);
  error = signal('');

  ngOnInit(): void {
    this.loadVoti();
  }

  loadVoti(): void {
    this.registroService.getVoti().subscribe({
      next: (res) => {
        this.voti.set(res.voti);
        this.error.set('');
      },
      error: () => {
        this.error.set('Impossibile caricare i voti.');
      },
    });
  }
}
