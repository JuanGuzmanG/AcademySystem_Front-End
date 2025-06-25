import { LoginService } from '../../services/login.service';
import { materialImports } from '../../material.imports';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, materialImports()],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any = null;
  userDocument: any;
  userRol: string | null = null;
  constructor(private loginservice: LoginService = inject(LoginService)) {
    this.user = loginservice.getUser();
    this.userDocument = this.user.document;
    this.userRol = loginservice.getUserRole();
  }
}
