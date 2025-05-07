import { Component } from '@angular/core';
import { materialImports } from '../../material.imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [materialImports()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snak: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

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
              case 'ADMIN':
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
                this.snak.open('Welcome Admin', 'OK', { duration: 3000 });
                break;
              case 'USER':
                this.router.navigate(['user']);
                this.loginService.loginStatusSubject.next(true);
                this.snak.open('Welcome User', 'OK', { duration: 3000 });
                break;
              case 'PROFESSOR':
                this.router.navigate(['professor']);
                this.loginService.loginStatusSubject.next(true);
                this.snak.open('Welcome Professor', 'OK', { duration: 3000 });
                break;
              default:
                this.loginService.logout();
                console.log('Invalid Details');
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
