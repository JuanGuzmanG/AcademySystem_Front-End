import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { materialImports } from '../../material.imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    private fb: FormBuilder
  ) {
    this.user = data.user;
    console.log(this.user);
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
      if (this.passwordForm.value.currentPassword !== this.user.password) {
        console.error('La contraseña actual no coincide');
        return;
      }
      console.log('Formulario de contraseña válido:', this.passwordForm.value);
      // Devuelve los datos relevantes (o un indicador de éxito) al componente que abrió el diálogo
      this.dialogRef.close({
        newPassword: this.passwordForm.value.newPassword,
        // No envíes currentPassword a menos que el componente padre lo necesite específicamente
      });
    } else {
      console.log('Formulario de contraseña inválido');
    }
  }
}
