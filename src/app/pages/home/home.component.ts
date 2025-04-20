import { Component } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-home',
  imports: [materialImports()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: any;
  constructor(private login: LoginService) {
    this.user = this.login.getUser();
  }
}
