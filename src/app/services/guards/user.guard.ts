import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isLoggedIn() && 
  loginService.getUserRole() === 'user') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
