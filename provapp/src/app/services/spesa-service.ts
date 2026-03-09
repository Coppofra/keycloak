import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpesaService {
  private http = inject(HttpClient);
  private keycloak = inject(Keycloak);

  private baseUrl = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.keycloak.token}`,
    });
  }

  getItems(): Observable<{ items: { id: number; nome: string }[] }> {
    return this.http.get<{ items: { id: number; nome: string }[] }>(
      `${this.baseUrl}/items`,
      { headers: this.getHeaders() }
    );
  }

  addItem(item: string): Observable<{ items: { id: number; nome: string }[] }> {
    return this.http.post<{ items: { id: number; nome: string }[] }>(
      `${this.baseUrl}/items`,
      { item },
      { headers: this.getHeaders() }
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/items/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
