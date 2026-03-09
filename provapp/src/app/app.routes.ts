import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Docente } from './pages/docente/docente';
import { Studente } from './pages/studente/studente';
import { AccessoNegato } from './pages/accesso-negato/accesso-negato';
import { ListaSpesa } from './pages/lista-spesa/lista-spesa';
import { Plus } from './pages/plus/plus';
import { Profile } from './pages/profile/profile';
import { authGuard, docenteGuard, studenteGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'docente', component: Docente, canActivate: [docenteGuard] },
  { path: 'studente', component: Studente, canActivate: [studenteGuard] },
  { path: 'lista-spesa', component: ListaSpesa, canActivate: [authGuard] },
  { path: 'plus', component: Plus, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'accesso-negato', component: AccessoNegato },
  { path: '**', redirectTo: '' },
];
