import { Component, inject } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule si es necesario

@Component({
  selector: 'app-profile',
  imports: [CommonModule, materialImports()],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any = null;
  userDocument: any;
  constructor(
    private loginservice: LoginService = inject(LoginService),
  ) {
    this.user = loginservice.getUser();
    this.userDocument = this.user.document;
  }
}
