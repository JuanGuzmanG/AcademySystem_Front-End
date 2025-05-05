import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private ngx: NgxUiLoaderService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ngx.start();

    let authReq = req;
    const token = this.loginService.getToken();

    if (token != null) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            Swal.fire('error', 'Session expired', 'error')
            this.loginService.logout();
            this.router.navigate(['/login']);
            window.location.reload();
          }
          return throwError(()=> error)
        }),
        finalize(() => {
          this.ngx.stop();
        })
      );
    }
    return next.handle(authReq).pipe(
      finalize(() => {
        this.ngx.stop();
      })
    );
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
