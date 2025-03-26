import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from 'express';

export const userGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isLoggedIn() && 
  loginService.getUserRole() === 'USER') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};