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

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

<<<<<<< HEAD
  if (loginService.isLoggedIn() && 
=======
  if(loginService.isLoggedIn() && 
>>>>>>> deaf74b192d32f52e31c005f93b3ebc60f73aa6a
  loginService.getUserRole() === 'ADMIN') {
    return true;
  }

<<<<<<< HEAD
  router.navigate(['login']);
=======
  router.navigate(['/login']);
>>>>>>> deaf74b192d32f52e31c005f93b3ebc60f73aa6a
  return false;
};
