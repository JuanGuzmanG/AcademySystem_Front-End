import { Component } from '@angular/core';
import { materialModule } from '../../../material.imports';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  imports: [materialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private loginService: LoginService,
  ) {}
  
  logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
