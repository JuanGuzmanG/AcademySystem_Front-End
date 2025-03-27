import { CanActivateFn,Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const teacherGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.getUserRole() === 'TEACHER') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
