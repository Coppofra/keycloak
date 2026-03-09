import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Docente } from './pages/docente/docente';
import { Studente } from './pages/studente/studente';
import { AccessoNegato } from './pages/accesso-negato/accesso-negato';
import { authGuard, docenteGuard, studenteGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'docente', component: Docente, canActivate: [docenteGuard] },
  { path: 'studente', component: Studente, canActivate: [studenteGuard] },
  { path: 'accesso-negato', component: AccessoNegato },
  { path: '**', redirectTo: '' },
];
