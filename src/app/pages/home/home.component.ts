import { Component, OnDestroy } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnDestroy {
  user: any;
  rol: any;
  private readonly destroy$ = new Subject<void>();

  constructor(private login: LoginService, private router: Router) {
    this.user = this.login.getUser();
    this.rol = this.login.getUserRole();
  }

  isLogin() {
    const login = this.login.isLoggedIn();
    const role = this.login.getUserRole();
    console.log('User role:', role);
    console.log('User login status:', login);
    if(login) {
      this.router.navigate(['/'+role]);
    }else{
      this.router.navigate(['/register']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
