import { Component } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog/change-password-dialog.component'; // Ajusta la ruta a tu diálogo
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import Swal from 'sweetalert2';
import { get } from 'http';

@Component({
  selector: 'app-profile',
  imports: [materialImports()],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any = null;
  userDocument: any;
  constructor(
    private loginservice: LoginService,
    private userService: LoginService, // Asegúrate de importar tu servicio
    private dialog: MatDialog // Inyecta MatDialog
  ) {
    this.user = loginservice.getUser();
    this.userDocument = this.user.document;
  }
}
