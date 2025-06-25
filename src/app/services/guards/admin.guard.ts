import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../login.service';

export const adminGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isLoggedIn() &&
  loginService.getUserRole() === 'admin') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
