import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Keycloak from 'keycloak-js';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const keycloak = inject(Keycloak);
  // se autenticato, carica il componente
  if (keycloak.authenticated) return true;

  // altrimenti manda al login
  keycloak.login({
    redirectUri: window.location.origin + state.url,
  });
  return false;
};

const roleGuard = (role: string): CanActivateFn => (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const keycloak = inject(Keycloak);

  // se non autenticato, facciamo redirect al login
  if (!authService.isLoggedIn()) {
    keycloak.login({
      redirectUri: window.location.origin + state.url,
    });
    return false;
  }

  if (authService.hasRole(role)) return true;

  router.navigate(['/accesso-negato']);
  return false;
};

export const docenteGuard = roleGuard('docente');
export const studenteGuard = roleGuard('studente');

// kept for backward-compatibility with older examples
export const userPlusGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasRole('user_plus')) return true;
  router.navigate(['/']);
  return false;
};
