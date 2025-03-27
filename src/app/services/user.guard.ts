<<<<<<< HEAD
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
=======
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from 'express';
>>>>>>> deaf74b192d32f52e31c005f93b3ebc60f73aa6a

export const userGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

<<<<<<< HEAD
  if (loginService.isLoggedIn() && loginService.getUserRole() === 'USER') {
    return true;
  }

  router.navigate(['login']);
  return false;
};
=======
  if(loginService.isLoggedIn() && 
  loginService.getUserRole() === 'USER') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
>>>>>>> deaf74b192d32f52e31c005f93b3ebc60f73aa6a
