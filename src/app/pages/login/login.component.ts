import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy{
  loginData = {
    username: '',
    password: '',
  };

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly snak: MatSnackBar=inject(MatSnackBar),
    private readonly loginService: LoginService=inject(LoginService),
    private readonly router: Router=inject(Router)
  ) {}
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clear() {
    this.loginData.username = '';
    this.loginData.password = '';
  }

  forSubmit() {
    if (this.loginData.username == '' || this.loginData.username == null) {
      this.snak.open('username empty', 'OK', {
        duration: 3000,
      });
      return;
    } else if (
      this.loginData.password == '' ||
      this.loginData.password == null
    ) {
      this.snak.open('password empty', 'OK', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
    
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            switch (this.loginService.getUserRole()) {
              case 'admin':
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
                this.snak.open('Welcome Admin', 'OK', { duration: 3000 });
                break;
              case 'user':
                this.router.navigate(['user']);
                this.loginService.loginStatusSubject.next(true);
                this.snak.open('Welcome User', 'OK', { duration: 3000 });
                break;
              case 'professor':
                this.router.navigate(['professor']);
                this.loginService.loginStatusSubject.next(true);
                this.snak.open('Welcome Professor', 'OK', { duration: 3000 });
                break;
              default:
                this.loginService.logout();
                console.log('Invalid Details rols');
            }
          },
          (error) => {
            this.snak.open('Error retrieving user data', 'Try again', {
              duration: 3000,
            });
          }
        );
      },
      (error) => {
        this.snak.open('Invalid Details', 'Try again', {
          duration: 3000,
        });
      }
    );    
  }
}
