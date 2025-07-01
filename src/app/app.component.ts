import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { materialImports } from './material.imports';
import { LoginService } from './services/login.service';
import { Subject } from './interfaces/Subject.interface';
import { SubjectService } from './services/subject.service';

export type MenuItem = {
  name: string;
  icon: string;
  route?: string;
  action?: () => void;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, materialImports(), CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SystemAcademy_FE';
  isLoggedIn = false;
  user: any = null;
  rols: any = null;
  collapsed = signal(false);
  sideNavWidth = computed(() => (this.collapsed() ? '58px' : '250px'));

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
    if (!this.isLoggedIn) {
      this.collapsed.set(true);
    }
    this.rols = this.login.getUserRole();
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
