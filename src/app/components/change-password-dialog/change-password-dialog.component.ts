import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { LoginService } from '../../services/login.service';
import { materialImports } from '../../material.imports';

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
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  passwordForm: FormGroup;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.user = data.user;
    this.passwordForm = this.fb.group(
      {
        currentPassword: [''],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.loginService.changePassword(this.passwordForm.value.currentPassword, this.passwordForm.value.newPassword).subscribe(
        (response) => {
          console.log('Contraseña cambiada con éxito', response);
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cambiar la contraseña. Por favor, inténtalo de nuevo.',
          });
        }
      );

      this.dialogRef.close({
        newPassword: this.passwordForm.value.newPassword,
      });

    } else {
      console.log('Formulario de contraseña inválido');
    }
  }
}
