import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService, Voto } from '../../services/registro-service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './docente.html',
  styleUrl: './docente.css',
})
export class Docente implements OnInit {
  private registroService = inject(RegistroService);
  auth = inject(AuthService);

  voti = signal<Voto[]>([]);
  studente = signal('');
  materia = signal('');
  voto = signal<number | null>(null);
  error = signal('');
  success = signal('');

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

  addVoto(): void {
    const studente = this.studente().trim();
    const materia = this.materia().trim();
    const voto = this.voto();

    if (!studente || !materia || voto == null) {
      this.error.set('Compila tutti i campi');
      this.success.set('');
      return;
    }

    this.registroService.aggiungiVoto(studente, materia, voto).subscribe({
      next: () => {
        this.success.set('Voto inserito con successo');
        this.error.set('');
        this.studente.set('');
        this.materia.set('');
        this.voto.set(null);
        this.loadVoti();
      },
      error: () => {
        this.error.set('Errore durante l\'inserimento del voto');
        this.success.set('');
      },
    });
  }
}
