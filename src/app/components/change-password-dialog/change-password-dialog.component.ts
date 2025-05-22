import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { materialImports } from '../../material.imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');
  if (
    newPassword &&
    confirmPassword &&
    newPassword.value !== confirmPassword.value
  ) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-change-password-dialog',
  imports: [materialImports()],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  passwordForm: FormGroup;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }, // Recibes datos, como el userId
    private fb: FormBuilder,
    private loginService: LoginService // Asegúrate de importar tu servicio de login
  ) {
    this.user = data.user;
    this.passwordForm = this.fb.group(
      {
        currentPassword: [''], // Opcional, puedes añadir Validators.required si es necesario
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  onNoClick(): void {
    this.dialogRef.close(); // Cierra el diálogo sin devolver nada
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      // Aquí es donde llamarías a tu servicio para cambiar la contraseña
      // Por ejemplo: this.userService.changePassword(this.userId, this.passwordForm.value)...
      this.loginService.changePassword(this.passwordForm.value.currentPassword, this.passwordForm.value.newPassword).subscribe(
        (response) => {
          console.log('Contraseña cambiada con éxito', response);
          // Aquí puedes manejar la respuesta del servicio, como mostrar un mensaje de éxito
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cambiar la contraseña. Por favor, inténtalo de nuevo.',});
          // Aquí puedes manejar el error, como mostrar un mensaje de error
        });
      this.dialogRef.close({
        newPassword: this.passwordForm.value.newPassword,
        // No envíes currentPassword a menos que el componente padre lo necesite específicamente
      });

    } else {
      console.log('Formulario de contraseña inválido');
    }
  }
}
