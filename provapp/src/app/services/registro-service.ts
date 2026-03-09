import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Voto {
  id: number;
  studente: string;
  materia: string;
  voto: number;
  created_at: string;
}

export interface VotiResponse {
  voti: Voto[];
}

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private http = inject(HttpClient);
  private keycloak = inject(Keycloak);

  private baseUrl = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.keycloak.token}`,
    });
  }

  getVoti(): Observable<VotiResponse> {
    return this.http.get<VotiResponse>(`${this.baseUrl}/voti`, {
      headers: this.getHeaders(),
    });
  }

  aggiungiVoto(studente: string, materia: string, voto: number) {
    return this.http.post(`${this.baseUrl}/voti`,
      { studente, materia, voto },
      { headers: this.getHeaders() }
    );
  }
}
