import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { ChangePasswordDialogComponent } from '../../components/change-password-dialog/change-password-dialog.component';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { materialImports } from '../../material.imports';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  userForm!: FormGroup;
  userId: any;
  user: any;
  countries: string[] = [];
  types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];
  BT = ['-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  genders = ['Male', 'Female', "I'd rather not say"];
  customGender = '';
  rols: any[] = [];
  selectedRols: any[] = [];
  rolCurrentUser: any;

  selectedFile: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private rolservice: RolService,
    private dialog: MatDialog,
    private loginService: LoginService
  ) {
    this.getCountries();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.rolCurrentUser = this.loginService.getUserRole();
    this.userForm = this.fb.group({
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      customGender: [''],
      countryBirth: ['', Validators.required],
      bloodType: [''],
      birthDate: ['', Validators.required],
      rols: [[], Validators.required],
      username: [''],
    });

    this.applyFieldsPermissions();
    this.CurrentUser();
  }

  private applyFieldsPermissions() {
    const isAdmin = this.rolCurrentUser === 'ADMIN';

    this.userForm.get('documentType')?.setErrors(null)
    this.userForm.get('documentType')?.[isAdmin ? 'enable' : 'disable']();
    
    this.userForm.get('document')?.setErrors(null)
    this.userForm.get('document')?.[isAdmin ? 'enable' : 'disable']();

    this.userForm.get('birthDate')?.setErrors(null)
    this.userForm.get('birthDate')?.[isAdmin ? 'enable' : 'disable']();

    this.userForm.get('rols')?.setErrors(null);
    this.userForm.get('rols')?.[isAdmin ? 'enable' : 'disable']();
  }

  CurrentUser() {
    this.rolservice.getAllRols().subscribe(
      (rolData: any) => {
        this.rols = rolData;

        this.userService.get(this.userId).subscribe((user: any) => {
          user.rols = user.rols ?? [];
          this.user = user;
          if (!this.genders.includes(user.gender)) {
            this.customGender = user.gender;
            user.gender = 'Other';
          }

          const selectedRols = this.rols.filter((rol: any) =>
            user.rols.some((r: any) => r.idRol === rol.idRol)
          );

          this.rolCurrentUser = this.loginService.getUserRole();
          this.userForm.patchValue({
            documentType: user.documentType,
            document: user.document,
            username: user.username,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            secondLastName: user.secondLastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            customGender: this.customGender,
            countryBirth: user.countryBirth,
            bloodType: user.bloodType,
            birthDate: user.birthDate,
            rols: selectedRols,
          });
        });
      },
      (error) => console.error(error)
    );
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.photoPreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.photoPreview = null;
    }
  }

  getCountries() {
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all?fields=name')
      .subscribe(
        (data) => {
          this.countries = data.map((c) => c.name.common).sort();
        },
        (error) => {
          console.error('Error fetching countries');
        }
      );
  }

  updateUser() {
    if (this.userForm.invalid) {
      Swal.fire('Error', 'Fill out the required fields', 'error');
      return;
    }

    const formValue = this.userForm.value;
    console.log('formValue', formValue);
    if (formValue.gender === 'Other' && formValue.customGender?.trim()) {
      formValue.gender = formValue.customGender.trim();
    }
    delete formValue.customGender;

    const userData = { ...this.userForm.getRawValue() };
    this.userService
      .updateUser(userData, this.selectedFile ?? undefined)
      .subscribe(
        (data) => {
          this.loginService.setUser(data);
          this.user = data;
          this.router.navigate([
            '/' +
              this.loginService.getUserRole()?.toLocaleLowerCase() +
              '/profile',
          ]);
          Swal.fire('Success', 'User updated successfully', 'success');
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      );
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '450px', // Ajusta el ancho según necesites
      panelClass: 'custom-dialog-panel', // Clase CSS personalizada para el diálogo
      disableClose: true, // Evita que se cierre al hacer clic fuera o presionar ESC (opcional)
      data: { user: this.user }, // Pasa el userId al diálogo
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo de cambiar contraseña se cerró');
      if (result && result.newPassword) {
        // Aquí 'result' es lo que devolvió el diálogo al cerrarse con éxito (ej. { newPassword: '...' })
        // Ahora puedes llamar al servicio para actualizar la contraseña del usuario en el backend
        // this.userService.updateUserPassword(this.userId, result.newPassword).subscribe(...);
        Swal.fire(
          'Success',
          'Password change data received (implement actual update).',
          'success'
        );
      } else {
        console.log('Cambio de contraseña cancelado o sin datos.');
      }
    });
  }
}
