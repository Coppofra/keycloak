import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpesaService } from '../../services/spesa-service';
import { AuthService } from '../../core/auth.service';
export interface ElementoSpesa {
id: number;
nome: string;
}
@Component({
selector: 'app-lista-spesa',
imports: [FormsModule],
templateUrl: './lista-spesa.html',
styleUrl: './lista-spesa.css',
})
export class ListaSpesa implements OnInit {
private spesaService = inject(SpesaService);
authService = inject(AuthService);
items = signal<ElementoSpesa[]>([]);
newItem = signal('');
error = signal('');
ngOnInit(): void {
this.spesaService.getItems().subscribe({
next: (res) => this.items.set(res.items),
error: () => this.error.set('Errore nel caricamento della lista'),
});
}
addItem(): void {
if (!this.newItem().trim()) return;
this.spesaService.addItem(this.newItem().trim()).subscribe({
next: (res) => {
this.items.set(res.items);

this.newItem.set('');
this.error.set('');
},
error: () => this.error.set("Errore durante l'aggiunta"),
});
}
deleteItem(id: number): void {
this.spesaService.deleteItem(id).subscribe({
next: () => this.items.update(items => items.filter(i => i.id !== id)),
error: () => this.error.set("Errore durante l'eliminazione"),
});
}
}